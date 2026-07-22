import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About - The ZAO',
  description:
    'The ZAO is a web3 music community and incubator, founded in 2024 - a home where members build, ship, and graduate real products together, and where artists own their margin, data, and IP.',
  openGraph: {
    title: 'About - The ZAO',
    description: 'A web3 music community and incubator. A home where members build, ship, and graduate real products together.',
    url: 'https://thezao.com/about',
    siteName: 'The ZAO',
    type: 'website',
  },
}

export default function About() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p
              className="text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--zao-cream)' }}
            >
              About
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              A home where music gets built and owned.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              The ZAO is a web3 music community and incubator - a home where members build,
              ship, and graduate real products together.
            </p>
          </div>
        </Container>
      </section>

      <Section heading="What The ZAO is">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            It started as a gated social client for its own community and grew into a lab.
            Members prototype ecosystem projects side by side; when a project is ready for
            production and new users, it graduates - its own repo, its own home. The pattern
            is a community that operates like a label and an incubator at once.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            A community first, a home for a specific group of people. A place that ships -
            real products, built in public, that leave the nest when ready. Web3-native and
            music-rooted, but not limited to either.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            It is not a platform play chasing generic scale, and it is not token-first - the
            community and the work come before any token.
          </p>
        </div>
      </Section>

      <Section heading="How it started">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Founder Zaal Panthaki met the artist JANGOUU FOREVER in 2017, crossed paths again
            in 2019, and started working with them in 2020. Around a song release that year,
            getting an artist heard for a room of friends was the moment it clicked - this was
            worth building around.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            That seed became The ZAO, founded in 2024 - a home where artists and builders ship
            together and keep what they make. The through-line has not changed: get the artist
            heard, and let them own their margin, data, and IP.
          </p>
        </div>
      </Section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Come build with us</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              Artists, builders, and creators are all welcome. The door is open.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/community" variant="primary">
                Meet the community
              </Button>
              <Button href="https://farcaster.xyz/~/channel/zao" variant="secondary" external>
                Join on Farcaster
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
