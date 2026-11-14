import Link from 'next/link'
import { Fraunces } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { StatTile } from '@/components/StatTile'
import { ECOSYSTEM } from '@/lib/constants'
import { getWaveWarZStats, getTopArtists, fmtNum } from '@/lib/wavewarz'
import { BrandDoors } from '@/components/BrandDoors'
import { RoomRings } from '@/components/room/RoomRings'
import { getPulses } from '@/lib/frontdoor'

// The Room (concept C, PR 70) is the homepage. This is a proposal: it waits on Zaal and on
// Brian (design lead) before it ships. Copy is limited to what is already on the live site
// or on https://context.thezao.com/thezao.

const serif = Fraunces({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] })

export default async function Home() {
  const [ww, topArtists, pulses] = await Promise.all([getWaveWarZStats(), getTopArtists(5), getPulses()])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav />

      {/* The front door: every ZAO brand, one click to its own site (Zaal, 2026-10-28). */}
      <BrandDoors pulses={pulses} />

      {/* The Room: the thesis, then the people in it. */}
      <div className="mx-auto max-w-6xl px-4 pt-12 text-center sm:px-8 sm:pt-20">
        <p className="zao-eyebrow text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
          A decentralized impact network for artists
        </p>
        <h1 className={`${serif.className} mx-auto mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-7xl`}>
          A home where artists <em style={{ color: 'var(--zao-cream)' }}>own their work.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
          The ZAO hands artists back their profit margin, their data and their IP, and governs itself
          with a vote you earn, not one you buy. These are some of the people in the room.
        </p>
      </div>

      <RoomRings />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} max-w-3xl text-4xl leading-tight sm:text-5xl`}>
          How a room works. <em style={{ color: 'var(--zao-cream)' }}>Earned, not bought.</em>
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3" style={{ counterReset: 'zao-step' }}>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Show up</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              Weekly rooms where members rank each other&apos;s work.
            </p>
          </li>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Get ranked by peers</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              Reputation is built weekly by peers, based on real contribution.
            </p>
          </li>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Earn Respect</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              Respect is an onchain reputation on Optimism. It cannot be bought, sold, or transferred.
            </p>
          </li>
        </ol>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/papers" variant="primary">
            Read the whitepaper
          </Button>
          <Button href="/zao-leaderboard" variant="secondary">
            How Respect works
          </Button>
        </div>
      </section>

      {/* Luma events: reuse the calendar embed already used on /calendar. */}
      <Section eyebrow="Events" heading="Upcoming in the ZAO">
        <div
          className="overflow-hidden rounded"
          style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
        >
          <iframe
            src="https://luma.com/embed/calendar/cal-jPH4al7AMlXzdNN/events"
            title="Upcoming events in The ZAO"
            className="w-full"
            style={{ height: '520px', border: 'none' }}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button href="https://luma.com/zao" variant="secondary" external>
            See all ZAO events on Luma
          </Button>
        </div>
      </Section>

      {/* Proof - WaveWarZ, live on-chain (real, verifiable) */}
      <Section eyebrow="Live data" heading="WaveWarZ, live on-chain">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Receipts, not vanity. WaveWarZ - the ecosystem&apos;s music-battle platform on Solana -
          runs entirely on-chain. These figures are pulled live from its API.
        </p>
        {ww ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <StatTile value={fmtNum(ww.battles)} label="Music battles" />
            <StatTile value={`${fmtNum(ww.volumeSol)} SOL`} label="Traded on-chain" />
            <StatTile value={fmtNum(ww.artists)} label="Artists competing" />
            <StatTile value={fmtNum(ww.songs)} label="Songs battled" />
          </div>
        ) : (
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Live battle data at{' '}
            <a href="https://wavewarz.info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--zao-cream)' }}>
              wavewarz.info
            </a>
            .
          </p>
        )}

        {topArtists.length > 0 && (
          <div className="mt-10">
            {/* Ranked board: designed by IMan (ZAODEVZ/thezao.com-iman-ui), card 9407 */}
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6" style={{ borderBottom: '1px solid var(--zao-border)' }}>
                <p className="zao-eyebrow text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
                  Top of the leaderboard right now
                </p>
                <a
                  href="https://wavewarz.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm"
                  style={{ color: 'var(--zao-cream-dim)' }}
                >
                  Full board
                </a>
              </div>
              <ol>
                {topArtists.map((a, i) => {
                  const played = a.wins + a.losses
                  const share = played > 0 ? Math.round((a.wins / played) * 100) : 0
                  return (
                    <li
                      key={a.name}
                      className="flex items-center gap-4 px-4 py-4 sm:px-6"
                      style={i < topArtists.length - 1 ? { borderBottom: '1px solid var(--zao-border)' } : undefined}
                    >
                      <span className={`zao-rank${i < 3 ? ` zao-rank-${i + 1}` : ''}`}>{i + 1}</span>
                      <span className="min-w-0 flex-1 font-semibold [overflow-wrap:anywhere]" style={{ color: 'var(--zao-text)' }}>
                        {a.name}
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span
                          className="hidden h-1.5 w-16 overflow-hidden rounded sm:block"
                          style={{ backgroundColor: 'rgba(225, 87, 87, 0.35)' }}
                          aria-hidden="true"
                        >
                          <span className="block h-full rounded" style={{ width: `${share}%`, backgroundColor: '#3fbf7f' }} />
                        </span>
                        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--zao-cream-dim)' }}>
                          {a.wins}W - {a.losses}L
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        )}
      </Section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} text-4xl sm:text-5xl`}>What the rooms build</h2>
        <ul className="mt-10">
          {ECOSYSTEM.map((p) => (
            <li key={p.name} style={{ borderTop: '1px solid var(--zao-border)' }}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className={`${serif.className} text-3xl transition-colors group-hover:text-[var(--zao-cream)] sm:w-80 sm:shrink-0`}>
                  {p.name}
                </span>
                <span style={{ color: 'var(--zao-cream-dim)' }}>{p.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/projects" className="underline underline-offset-4" style={{ color: 'var(--zao-cream)' }}>
            All projects
          </Link>
        </p>
      </section>

      <section className="px-4 py-20 text-center sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl`}>
          There is a <em style={{ color: 'var(--zao-cream)' }}>seat</em> for you.
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://luma.com/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3 font-bold"
            style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
          >
            Join the next room
          </a>
          <a
            href="https://farcaster.xyz/~/channel/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3"
            style={{ border: '1px solid var(--zao-border)' }}
          >
            Say hi on /zao
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
