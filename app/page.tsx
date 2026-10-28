import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { ArtistCard } from '@/components/ArtistCard'
import { EcosystemCard } from '@/components/EcosystemCard'
import { StatTile } from '@/components/StatTile'
import { NOTABLE_ARTISTS, ECOSYSTEM } from '@/lib/constants'
import { getWaveWarZStats, getTopArtists, fmtNum } from '@/lib/wavewarz'

export default async function Home() {
  const [ww, topArtists] = await Promise.all([getWaveWarZStats(), getTopArtists(5)])

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero - lead with the thesis */}
      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            {/* Record and equalizer: designed by IMan (ZAODEVZ/thezao.com-iman-ui), card 9407 */}
            <div className="zao-hero-visual lg:order-2" aria-hidden="true">
              <div className="zao-glow" />
              <div className="zao-vinyl" />
              <div className="zao-eq">
                <i /><i /><i /><i /><i /><i /><i />
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <p className="zao-eyebrow text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
                A decentralized impact network for artists
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
                A home where artists own their work.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
                The ZAO builds tools, spaces, and systems for artists and creators - and governs
                itself with a vote you earn, not one you buy. Built in the open, on Farcaster and Base.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/community">Explore the community</Button>
                <Button href="/papers" variant="secondary">
                  Read the whitepaper
                </Button>
              </div>
            </div>
          </div>
        </Container>
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

      {/* Governance spine - the differentiator */}
      <Section eyebrow="Governance" heading="Earned, not bought">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-2xl space-y-4">
            <p style={{ color: 'var(--zao-cream-dim)' }}>
              In most communities a vote is something you buy - hold the most tokens, hold the
              most power. The ZAO takes the opposite position. Here, a vote is something you earn,
              through Respect: an onchain reputation built by showing up and contributing, ranked
              by peers each week. It cannot be bought, sold, or transferred.
            </p>
            <p style={{ color: 'var(--zao-cream-dim)' }}>
              The whitepaper lays out the theory, the mechanics, and the verifiable on-chain
              architecture in full.
            </p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Button href="/papers" variant="primary">
                Read the whitepaper
              </Button>
              <Button href="/zao-leaderboard" variant="secondary">
                How Respect works
              </Button>
            </div>
          </div>
          {/* Buy vs earn comparison: designed by IMan (ZAODEVZ/thezao.com-iman-ui), card 9407 */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-5 opacity-60" style={{ border: '1px solid rgba(234, 240, 248, 0.09)', backgroundColor: 'var(--zao-dark-alt)' }}>
              <p className="mb-1 flex items-center gap-3 font-bold" style={{ color: 'var(--zao-text)' }}>
                <span
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: 'rgba(225, 87, 87, 0.18)', color: '#e15757' }}
                  aria-hidden="true"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                Buy tokens, buy power
              </p>
              <p className="text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                The usual model. Whoever holds the most tokens controls the vote.
              </p>
            </div>
            <p className="flex items-center gap-2 pl-2 text-sm" style={{ color: 'var(--zao-cream-faint)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              The ZAO way instead
            </p>
            <div
              className="rounded-xl p-5"
              style={{ border: '1px solid rgba(245, 197, 24, 0.32)', background: 'linear-gradient(180deg, var(--zao-panel-hover), transparent)' }}
            >
              <p className="mb-1 flex items-center gap-3 font-bold" style={{ color: 'var(--zao-text)' }}>
                <span
                  className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
                  aria-hidden="true"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
                Show up, earn Respect
              </p>
              <p className="text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                Reputation is built weekly by peers, based on real contribution. It cannot be bought,
                sold, or transferred.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Ecosystem */}
      <Section eyebrow="Ecosystem" heading="What we build">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Everything under the umbrella serves the same idea. Each is its own project, built in
          the open. See them all in the <Link href="/nexus" style={{ color: 'var(--zao-cream)' }}>Nexus</Link>.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {ECOSYSTEM.map((p) => (
            <EcosystemCard key={p.name} name={p.name} blurb={p.blurb} href={p.href} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Community" heading="Notable artists & builders">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {NOTABLE_ARTISTS.map((artist) => (
            <ArtistCard key={artist} name={artist} />
          ))}
        </div>
      </Section>

      {/* Convert */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Come build with us</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              Whether you make music, build tools, or just like what we are doing, there is a
              place for you here. Show up, contribute, and earn your standing.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="https://farcaster.xyz/~/channel/zao" external>
                Join on Farcaster
              </Button>
              <Button href="/nexus" variant="secondary">
                Browse the Nexus
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
