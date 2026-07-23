import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { ArtistCard } from '@/components/ArtistCard'
import { NOTABLE_ARTISTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Community - The ZAO',
  description:
    'The ZAO is a web3 music community and incubator - artists, builders, and creators who ship together and own their work. Meet some of the community and find the door in.',
  openGraph: {
    title: 'Community - The ZAO',
    description: 'Artists, builders, and creators who ship together and own their work.',
    url: 'https://thezao.com/community',
    siteName: 'The ZAO',
    type: 'website',
  },
}

export default function Community() {
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
              The Community
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              A home for artists and builders.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              The ZAO is community first. Everything we build - the tools, the events, the
              music - serves the same idea: artists and creators who own their work and grow on
              their own terms.
            </p>
          </div>
        </Container>
      </section>

      <Section heading="Some of the artists & builders">
        <p className="section-sub -mt-4 mb-8" style={{ color: 'var(--zao-cream-dim)' }}>
          A sample of the people building here. The community is bigger than any one list.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {NOTABLE_ARTISTS.map((artist) => (
            <ArtistCard key={artist} name={artist} />
          ))}
        </div>
      </Section>

      <Section heading="How it works">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The ZAO runs in the open. Members prototype projects side by side, and when
            something is ready it graduates - its own home, its own users. The community
            operates like a label and an incubator at once.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Governance is earned, not bought. Every week the community meets, shares what it
            worked on, and earns Respect through participation. Show up consistently and your
            voice grows.
          </p>
        </div>
      </Section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Find the door in</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              If you make music, build tools, or just want to be part of it, you are welcome.
              The door is open.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="https://farcaster.xyz/~/channel/zao" variant="primary" external>
                Join on Farcaster
              </Button>
              <Button href="https://paragraph.com/@thezao" variant="secondary" external>
                Read the newsletter
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
