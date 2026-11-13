'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from './tracks'

// The working player for concept E. Audio streams from Audius (the artist's own upload) and
// every track carries a visible credit: title, artist, Audius handle and a link to the
// track on Audius, as the credit rule asks. Nothing autoplays; the visitor presses play.

const streamUrl = (id: string) => `https://api.audius.co/v1/tracks/${id}/stream?app_name=thezao`

const clock = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export function Player({ tracks }: { tracks: Track[] }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(tracks[0]?.duration ?? 0)
  const [failed, setFailed] = useState<Set<string>>(() => new Set())
  const [cover, setCover] = useState(0)
  const wantPlay = useRef(false)
  const track = tracks[i]

  const go = useCallback(
    (n: number, play = true) => {
      const k = (n + tracks.length) % tracks.length
      wantPlay.current = play
      setI(k)
      setCover(0)
      setT(0)
      setDur(tracks[k].duration)
    },
    [tracks],
  )

  const toggle = useCallback(() => {
    const a = audio.current
    if (!a) return
    if (a.paused) {
      wantPlay.current = true
      a.play().catch(() => setPlaying(false))
    } else {
      wantPlay.current = false
      a.pause()
    }
  }, [])

  // A new track loads its stream; it starts on its own only if the visitor was already listening.
  useEffect(() => {
    const a = audio.current
    if (!a) return
    a.src = streamUrl(track.id)
    a.load()
    if (wantPlay.current) a.play().catch(() => setPlaying(false))
  }, [track.id])

  // Lock-screen and headphone controls, with the same credit the page shows.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: `${track.artist} (@${track.handle} on Audius)`,
      album: 'The ZAO rotation, from WaveWarZ',
      artwork: track.art[0] ? [{ src: track.art[0], sizes: '480x480', type: 'image/jpeg' }] : [],
    })
    navigator.mediaSession.setActionHandler('play', toggle)
    navigator.mediaSession.setActionHandler('pause', toggle)
    navigator.mediaSession.setActionHandler('nexttrack', () => go(i + 1))
    navigator.mediaSession.setActionHandler('previoustrack', () => go(i - 1))
  }, [track, i, go, toggle])

  // Space plays and pauses, arrows skip, unless the visitor is on a control of their own.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('button, a, input, [role="slider"]')) return
      if (e.code === 'Space') {
        e.preventDefault()
        toggle()
      } else if (e.code === 'ArrowRight') go(i + 1)
      else if (e.code === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [i, go, toggle])

  const seek = (frac: number) => {
    const a = audio.current
    if (!a || !dur) return
    a.currentTime = Math.max(0, Math.min(1, frac)) * dur
  }

  const pct = dur ? Math.min(100, (t / dur) * 100) : 0
  const winRate = track.battles ? Math.round((track.wins / track.battles) * 100) : 0

  return (
    <div className="pl-stage">
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setDur(e.currentTarget.duration)}
        onEnded={() => go(i + 1)}
        onError={() => {
          // A stream that will not load is marked and skipped, never left silent.
          if (!audio.current?.src) return
          setFailed((f) => new Set(f).add(track.id))
          if (wantPlay.current) go(i + 1)
        }}
      />

      <section className="pl-now" aria-label="Now playing">
        <div className={`pl-art ${playing ? 'is-playing' : ''}`}>
          {track.art[cover] ? (
            // The artist's own cover from Audius, credited below.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={track.art[cover]}
              src={track.art[cover]}
              alt={`Cover of ${track.title} by ${track.artist}`}
              width={480}
              height={480}
              onError={() => setCover((c) => c + 1)}
            />
          ) : (
            <div className="pl-art-blank" aria-hidden="true">
              {track.artist.slice(0, 1)}
            </div>
          )}
          <button type="button" className="pl-big" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            <span className={playing ? 'pl-ico-pause' : 'pl-ico-play'} aria-hidden="true" />
          </button>
        </div>

        <div className="pl-meta">
          <p className="pl-count" aria-live="polite">
            {String(i + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
            {failed.has(track.id) ? ' · this stream did not load' : playing ? ' · playing' : ''}
          </p>
          <h2 className="pl-title">{track.title}</h2>
          <p className="pl-credit">
            by{' '}
            <a href={`https://audius.co/${track.handle}`} target="_blank" rel="noopener noreferrer">
              {track.artist}
            </a>{' '}
            <span className="pl-handle">@{track.handle}</span>
          </p>

          <div
            className="pl-bar"
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(dur)}
            aria-valuenow={Math.round(t)}
            aria-valuetext={`${clock(t)} of ${clock(dur)}`}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              seek((e.clientX - r.left) / r.width)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') seek((t + 10) / dur)
              if (e.key === 'ArrowLeft') seek((t - 10) / dur)
            }}
          >
            <div className="pl-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="pl-times">
            <span>{clock(t)}</span>
            <span>{clock(dur)}</span>
          </div>

          <div className="pl-controls">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous track">
              Prev
            </button>
            <button type="button" className="pl-main" onClick={toggle}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next track">
              Next
            </button>
          </div>

          <dl className="pl-record">
            <div>
              <dt>WaveWarZ battles</dt>
              <dd>{track.battles}</dd>
            </div>
            <div>
              <dt>Won</dt>
              <dd>
                {track.wins}
                <small> ({winRate}%)</small>
              </dd>
            </div>
            <div>
              <dt>Lost</dt>
              <dd>{track.losses}</dd>
            </div>
          </dl>

          <p className="pl-source">
            Credit: &ldquo;{track.title}&rdquo; by {track.artist} (@{track.handle}).{' '}
            <a href={track.permalink} target="_blank" rel="noopener noreferrer">
              Streamed from Audius
            </a>
            , where the artist published it. Battle record from{' '}
            <a href="https://wavewarz.info" target="_blank" rel="noopener noreferrer">
              WaveWarZ
            </a>
            .
          </p>
        </div>
      </section>

      <section className="pl-queue" aria-label="Rotation">
        <h2 className="pl-queue-head">The rotation</h2>
        <ol>
          {tracks.map((q, k) => (
            <li key={q.id}>
              <button
                type="button"
                className={k === i ? 'is-current' : ''}
                aria-current={k === i ? 'true' : undefined}
                onClick={() => (k === i ? toggle() : go(k))}
              >
                <span className="pl-q-n">{k === i && playing ? <i className="pl-eq" aria-hidden="true" /> : String(k + 1).padStart(2, '0')}</span>
                <span className="pl-q-main">
                  <span className="pl-q-title">{q.title}</span>
                  <span className="pl-q-artist">
                    {q.artist}
                    {failed.has(q.id) ? ' · did not load' : ''}
                  </span>
                </span>
                <span className="pl-q-rec">
                  {q.wins}-{q.losses}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="pl-keys">Space plays and pauses. Arrow keys skip.</p>
      </section>
    </div>
  )
}
