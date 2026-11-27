import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'

// The ZAO Fractal: the weekly Respect Game, as a page on thezao.com.
// Facts come from ZAODEVZ/ZAOfractal (CLAUDE.md, dao/src/lib/constants.ts).
// No member data on this page: the people with Respect come in a later PR,
// after each of them has had a heads-up.

const AWARDS = [110, 68, 42, 26, 16, 10]

export const metadata: Metadata = {
  alternates: { canonical: '/fractal' },
  title: 'The Fractal - The ZAO',
  description:
    'Every Monday at 6pm Eastern, ZAO members meet in small rooms, share what they built, and rank each other. The rankings mint Respect on Optimism.',
  openGraph: {
    title: 'The Fractal - The ZAO',
    description: 'The weekly Respect Game of The ZAO, Mondays at 6pm Eastern.',
    url: 'https://thezao.com/fractal',
    siteName: 'The ZAO',
    type: 'website',
    images: ['https://thezao.com/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'The ZAO Fractal (weekly Respect Game)',
  description:
    'A weekly meeting where ZAO members share their work in rooms of up to six and rank each other. Rankings mint Respect on Optimism.',
  eventSchedule: {
    '@type': 'Schedule',
    repeatFrequency: 'P1W',
    byDay: 'https://schema.org/Monday',
    startTime: '18:00',
    scheduleTimezone: 'America/New_York',
  },
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: { '@type': 'VirtualLocation', url: 'https://discord.thezao.com' },
  organizer: { '@type': 'Organization', name: 'The ZAO', url: 'https://thezao.com' },
}

export default function Fractal() {
  return (
    <main className="min-h-screen">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              The Fractal
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Mondays at 6pm Eastern. Show what you built.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              The Fractal is the weekly Respect Game of The ZAO. Members meet in small rooms,
              share what they worked on, and rank each other. Those rankings mint Respect on
              Optimism, and Respect is the vote in how The ZAO is run.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="https://discord.thezao.com" variant="primary" external>
                Join on Discord
              </Button>
              <Button href="https://luma.com/zao" variant="secondary" external>
                See the next session
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section heading="How a session works">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            Everyone who shows up is split into breakout rooms of up to six people. In each room,
            every person gets a few minutes to share what they did for The ZAO and for their own
            work since the last session. Then the room agrees on a ranking from first to sixth.
          </p>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The rankings are submitted and minted onchain. Every rank earns Respect, so showing up
            and sharing always counts. A room of fewer than six uses the top awards only.
          </p>
        </div>
      </Section>

      <Section heading="What each rank earns">
        <div className="max-w-2xl space-y-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {AWARDS.map((respect, i) => (
              <div
                key={respect}
                className="rounded-lg p-4 text-center"
                style={{ border: '1px solid var(--zao-border)' }}
              >
                <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--zao-text)' }}>
                  Rank {i + 1}
                </div>
                <div className="mt-1 text-2xl font-bold" style={{ color: 'var(--zao-cream)' }}>
                  {respect}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The awards follow a doubled Fibonacci scale. Respect cannot be bought, sold or sent: it
            is a record of contribution, held on Optimism, and it weighs your vote on proposals.
          </p>
        </div>
      </Section>

      <Section heading="Go deeper">
        <div className="max-w-2xl space-y-4">
          <p style={{ color: 'var(--zao-cream-dim)' }}>
            The Fractal has run every week since 2024. The full record lives at{' '}
            <a href="https://fractal.thezao.com" className="underline" style={{ color: 'var(--zao-cream)' }}>
              fractal.thezao.com
            </a>
            : the whitepaper, the research behind fractal democracy, and every onchain run of the
            game. Standings are on the{' '}
            <Link href="/zao-leaderboard" className="underline" style={{ color: 'var(--zao-cream)' }}>
              leaderboard
            </Link>
            .
          </p>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
