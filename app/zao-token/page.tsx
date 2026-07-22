import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Token - The ZAO',
  description:
    'The ZAO is community-first, not token-first. Standing is earned through Respect, not bought. How value and contribution work across the ecosystem.',
  openGraph: {
    title: 'Token - The ZAO',
    description: 'Community-first, not token-first. How value and contribution work in The ZAO.',
    url: 'https://thezao.com/zao-token',
    siteName: 'The ZAO',
    type: 'website',
  },
}

export default function Token() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Token
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Community first, not token first.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              The ZAO is not a token-first project. The community and the work come before any
              token. Standing is earned, not purchased.
            </p>
          </div>
        </Container>
      </section>

      <Section heading="How contribution is measured">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Inside The ZAO, what counts is Respect - an onchain reputation earned by showing up
            and contributing, ranked by peers each week. It cannot be bought or sold. It is how
            you earn a voice in how The ZAO is run.
          </p>
          <p>
            <a
              href="/zao-leaderboard"
              className="inline-block text-base font-medium"
              style={{ color: 'var(--zao-cream)', borderBottom: '1px solid var(--zao-border)' }}
            >
              See how Respect works
            </a>
          </p>
        </div>
      </Section>

      <Section heading="The ecosystem token">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The ecosystem token is ZABAL, on Base - closely linked to The ZAO and tied to the
            ZABAL Games builder program. It is distinct from Respect: Respect is earned
            reputation inside the community, while ZABAL is the tradable ecosystem token.
          </p>
        </div>
      </Section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Earn your standing</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              The way in is the same as it has always been: show up, build, and contribute.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/zao-leaderboard" variant="primary">
                How Respect works
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
