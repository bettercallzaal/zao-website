// The rotation behind concept E, The Player. Two public sources, no keys:
// - the WaveWarZ songs leaderboard (https://wavewarz.info/api-docs) says which songs the
//   ZAO's battle platform has run, with each song's on-chain battle record, and the Audius
//   link the artist entered when they put it up;
// - the Audius API (https://docs.audius.org, app_name required) resolves that link to the
//   artist's own Audius track, which is streamed from Audius with the artist credited.
// A song only goes in the rotation if Audius says it is public and streamable, so a
// deleted, gated or unlisted upload never plays here.

const SONGS = 'https://wavewarz.info/api/public/leaderboards/songs'
const AUDIUS = 'https://api.audius.co/v1'
export const APP_NAME = 'thezao'
const MAX = 10

export type Track = {
  id: string
  title: string
  artist: string
  handle: string
  permalink: string
  /** The cover at 480px from each Audius host that serves it, first that loads wins. */
  art: string[]
  duration: number
  genre: string
  battles: number
  wins: number
  losses: number
}

type Song = { songTitle?: unknown; musicLink?: unknown; battles?: unknown; wins?: unknown; losses?: unknown }
type AudiusTrack = {
  id?: string
  title?: string
  duration?: number
  genre?: string
  permalink?: string
  is_streamable?: boolean
  is_delete?: boolean
  is_stream_gated?: boolean
  is_unlisted?: boolean
  artwork?: ({ mirrors?: string[] } & Record<string, unknown>) | null
  user?: { name?: string; handle?: string }
}

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)
// Audius answers a default runtime user agent with 403, so name the caller.
const HEADERS = { 'User-Agent': 'thezao.com (Next.js)' }

// Audius content hosts come and go; the API lists mirrors for the same path, so the client
// can fall back instead of showing a broken cover.
function covers(a: AudiusTrack['artwork']): string[] {
  const main = a?.['480x480']
  if (typeof main !== 'string') return []
  const u = new URL(main)
  const mirrors = Array.isArray(a?.mirrors) ? a.mirrors : []
  return [main, ...mirrors.map((m) => `${m}${u.pathname}`)]
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Audius rate-limits the resolve endpoint: on 2026-10-28, 40 lookups in parallel got 24
// answers of 429. So lookups run one at a time, and a 429 is retried after a pause.
async function resolve(link: string): Promise<AudiusTrack | null> {
  const url = `${AUDIUS}/resolve?app_name=${APP_NAME}&url=${encodeURIComponent(link)}`
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS, next: { revalidate: 3600 } })
      if (res.status === 429) {
        await wait(1500 * (attempt + 1))
        continue
      }
      if (!res.ok) return null
      const d = (await res.json()) as { data?: AudiusTrack }
      return d.data ?? null
    } catch {
      return null
    }
  }
  return null
}

export async function getRotation(): Promise<Track[] | null> {
  let songs: Song[]
  try {
    const res = await fetch(SONGS, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const d = (await res.json()) as { songs?: Song[] }
    if (!Array.isArray(d.songs)) return null
    songs = d.songs
  } catch {
    return null
  }

  // The leaderboard is ordered by SOL traded on each song (checked 28 Oct). Walk it in that
  // order, one song per artist, so the rotation is a room of artists rather than one artist's
  // catalogue.
  const candidates = songs
    .filter((s) => typeof s.musicLink === 'string' && /^https:\/\/audius\.co\//.test(s.musicLink))
    .slice(0, 40)

  const seen = new Set<string>()
  const out: Track[] = []
  for (const s of candidates) {
    if (out.length >= MAX) break
    // The first path segment of an Audius link is the uploader's handle, so a second song by
    // an artist already in the rotation is skipped without a lookup.
    const linkHandle = new URL(s.musicLink as string).pathname.split('/')[1]?.toLowerCase()
    if (linkHandle && seen.has(linkHandle)) continue
    const t = await resolve(s.musicLink as string)
    if (!t || !t.id || !t.user?.handle) continue
    if (!t.is_streamable || t.is_delete || t.is_stream_gated || t.is_unlisted) continue
    const key = t.user.handle.toLowerCase()
    if (seen.has(key)) continue
    const battles = num(s.battles)
    const wins = num(s.wins)
    const losses = num(s.losses)
    if (battles === null || wins === null || losses === null) continue
    seen.add(key)
    out.push({
      id: t.id,
      title: (t.title ?? '').trim(),
      artist: (t.user.name ?? t.user.handle).trim(),
      handle: t.user.handle,
      permalink: `https://audius.co${t.permalink ?? `/${t.user.handle}`}`,
      art: covers(t.artwork),
      duration: t.duration ?? 0,
      genre: t.genre ?? '',
      battles,
      wins,
      losses,
    })
  }
  return out.length ? out : null
}
