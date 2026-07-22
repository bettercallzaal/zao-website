import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Leaderboard - The ZAO',
  description:
    'Contribution in The ZAO is measured by Respect - an onchain reputation earned through weekly participation, not bought. How the leaderboard works and how to climb it.',
  openGraph: {
    title: 'Leaderboard - The ZAO',
    description: 'Respect is earned, not bought. How contribution is measured in The ZAO.',
    url: 'https://thezao.com/zao-leaderboard',
    siteName: 'The ZAO',
    type: 'website',
  },
}

export default function Leaderboard() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Leaderboard
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Respect is earned, not bought.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              Standing in The ZAO is not something you buy. It is Respect - a reputation earned
              through showing up and contributing, recorded onchain.
            </p>
          </div>
        </Container>
      </section>

      <Section heading="How it works">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Every week the community meets, and members share what they worked on. In small
            groups, people rank each other on who contributed most. Those rankings mint Respect
            onchain. Show up consistently, do the work, and your Respect - and your voice in
            how The ZAO is run - grows.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Respect is non-transferable. You cannot sell it or send it - it is a record of
            contribution, not a currency. That is the point: reputation that cannot be bought.
          </p>
        </div>
      </Section>

      <Section heading="Where the standings live">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The standings are settled onchain and in the weekly sessions. The most reliable way
            to see where things stand - and to start earning - is to show up to a session and
            follow along in the community.
          </p>
        </div>
      </Section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Start earning</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              The door is open. Come to a session, share what you are building, and start
              earning Respect.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="https://farcaster.xyz/~/channel/zao" variant="primary" external>
                Join on Farcaster
              </Button>
              <Button href="/calendar" variant="secondary">
                See the calendar
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
