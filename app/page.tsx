import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { ArtistCard } from '@/components/ArtistCard'
import { EcosystemCard } from '@/components/EcosystemCard'
import { NOTABLE_ARTISTS, ECOSYSTEM } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">The ZAO</h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              A web3 music community and incubator. We build tools, spaces, and systems for
              artists and creators who want to own their work and grow on their own terms.
            </p>
            <p className="max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              We build in the open. Everyone is welcome - artists, builders, and anyone who
              wants to help make it. The door is open.
            </p>
          </div>
        </Container>
      </section>

      <Section heading="What we build">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Everything under the umbrella serves the same idea - artists owning their work.
          Each of these is its own project, built in the open.
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

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Join the community</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              Whether you make music, build tools, or just like what we are doing, there is a
              place for you here. Come build with us.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/community">Explore Community</Button>
              <Button href="https://farcaster.xyz/~/channel/zao" variant="secondary" external>
                Follow on Farcaster
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
