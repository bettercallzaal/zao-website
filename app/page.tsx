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
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Web3 music community & incubator
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
        </Container>
      </section>

      {/* Proof - WaveWarZ, live on-chain (real, verifiable) */}
      <Section heading="WaveWarZ, live on-chain">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Receipts, not vanity. WaveWarZ - the ecosystem's music-battle platform on Solana -
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
            <a href="https://wavewarz.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--zao-cream)' }}>
              wavewarz.com
            </a>
            .
          </p>
        )}

        {topArtists.length > 0 && (
          <div className="mt-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Top of the leaderboard right now
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {topArtists.map((a, i) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between rounded px-4 py-3"
                  style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-bold tabular-nums" style={{ color: 'var(--zao-cream-faint)' }}>
                      {i + 1}
                    </span>
                    <span style={{ color: 'var(--zao-text)' }}>{a.name}</span>
                  </span>
                  <span className="text-sm tabular-nums" style={{ color: 'var(--zao-cream-dim)' }}>
                    {a.wins}W - {a.losses}L
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Governance spine - the differentiator */}
      <Section heading="Earned, not bought">
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
      </Section>

      {/* Ecosystem */}
      <Section heading="What we build">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Everything under the umbrella serves the same idea. Each is its own project, built in
          the open. See them all in the <a href="/nexus" style={{ color: 'var(--zao-cream)' }}>Nexus</a>.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {ECOSYSTEM.map((p) => (
            <EcosystemCard key={p.name} name={p.name} blurb={p.blurb} href={p.href} />
          ))}
        </div>
      </Section>

      <Section heading="Notable artists & builders">
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
