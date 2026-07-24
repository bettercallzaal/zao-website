import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { NEXUS, ONBOARDING } from '@/lib/nexus'
import { MEMBERS } from '@/lib/members'

export const metadata: Metadata = {
  title: 'Nexus - The ZAO',
  description:
    'Every ZAO project in one place. Music, events, build tools, governance, and community - browse it all, or follow a path to what you came for.',
  openGraph: {
    title: 'Nexus - The ZAO',
    description: 'Every ZAO project in one place. Browse it all, or find your path in.',
    url: 'https://thezao.com/nexus',
    siteName: 'The ZAO',
    type: 'website',
  },
}

function CardLink({ href, external, children }: { href: string; external: boolean; children: React.ReactNode }) {
  const cls = 'block rounded p-5 transition-all hover:-translate-y-0.5 sm:p-6'
  const style = { border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  )
}

export default function Nexus() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              The Nexus
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Everything The ZAO builds, in one place.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              Scroll the whole ecosystem below, or start with what you came for.
            </p>
          </div>
        </Container>
      </section>

      {/* Onboarding - where do you want to go, step by step */}
      <Section heading="Where do you want to go?">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Pick what you came for. Each path is a real, do-it-now sequence.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {ONBOARDING.map((o) => (
            <div
              key={o.want}
              className="rounded p-5 sm:p-6"
              style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
            >
              <h3 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
                {o.want}
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                {o.blurb}
              </p>
              <ol className="mt-4 space-y-2">
                {o.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm sm:text-base">
                    <span
                      className="shrink-0 font-bold tabular-nums"
                      style={{ color: 'var(--zao-cream-faint)' }}
                    >
                      {i + 1}.
                    </span>
                    {s.external ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--zao-cream-dim)', borderBottom: '1px solid var(--zao-border)' }}>
                        {s.text}
                      </a>
                    ) : (
                      <Link href={s.href} style={{ color: 'var(--zao-cream-dim)', borderBottom: '1px solid var(--zao-border)' }}>
                        {s.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* The full directory */}
      {NEXUS.map((section) => (
        <Section key={section.id} heading={section.group}>
          <div id={section.id} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {section.projects.map((p) => (
              <CardLink key={p.name} href={p.href} external={p.external}>
                <h3 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--zao-cream-dim)' }}>
                  {p.blurb}
                </p>
              </CardLink>
            ))}
          </div>
        </Section>
      ))}

      {/* The people - living member profiles */}
      <Section heading="The people">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Living profiles of the community - Fractal Respect earners, refreshed with their work.
          Each one pulls straight from Farcaster.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <CardLink href="/zaal" external={false}>
            <h3 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
              Zaal Panthaki
            </h3>
            <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--zao-cream-dim)' }}>
              Open-source builder. Founder of The ZAO.
            </p>
          </CardLink>
          {MEMBERS.map((m) => (
            <CardLink key={m.handle} href={`/${m.handle}`} external={false}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
                {m.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--zao-cream-dim)' }}>
                {m.role}
              </p>
            </CardLink>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  )
}
