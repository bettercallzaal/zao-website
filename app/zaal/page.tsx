import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { PROFILE, TIERS, FEATURED_REPOS } from '@/lib/zaal'

export const metadata: Metadata = {
  title: 'Zaal Panthaki (BetterCallZaal) - The ZAO',
  description:
    'Zaal Panthaki - open-source builder, founder of The ZAO, co-founder of WaveWarZ. Book a Build Session and browse the open-source work. A ZAO profile.',
  openGraph: {
    title: 'Zaal Panthaki (BetterCallZaal) - The ZAO',
    description: 'Open-source builder. Founder of The ZAO. Book a Build Session.',
    url: 'https://thezao.com/zaal',
    siteName: 'The ZAO',
    type: 'profile',
  },
}

export default function ZaalProfile() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Profile header - the ZAO interface frame */}
      <section className="py-12 sm:py-16" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-4xl font-bold sm:h-32 sm:w-32"
              style={{
                backgroundColor: 'var(--zao-navy)',
                color: 'var(--zao-cream)',
                boxShadow: '0 0 0 3px var(--zao-cream)',
              }}
              aria-label="Profile photo"
            >
              {PROFILE.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={PROFILE.avatar} alt={PROFILE.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                PROFILE.initials
              )}
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl">{PROFILE.name}</h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--zao-cream)' }}>
                  @{PROFILE.handle}
                </p>
              </div>
              <p className="max-w-2xl text-lg" style={{ color: 'var(--zao-text)' }}>
                {PROFILE.tagline}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {PROFILE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-[color:var(--zao-cream)]"
                    style={{ color: 'var(--zao-cream-dim)' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {PROFILE.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-4"
                style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
              >
                <div className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--zao-cream)' }}>
                  {s.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#work" variant="primary">
              Book a Build Session
            </Button>
            <Button href="#open-source" variant="secondary">
              See the open-source work
            </Button>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream-faint)' }}>
            A ZAO profile - scroll for the site below
          </p>
        </Container>
      </section>

      {/* The site: Work with me */}
      <div id="work" />
      <Section heading="Work with me: The Build Session">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          A working session where I sit with you, find one real problem in your business or your
          virtual-world presence, and leave you with something working by the end. Not a report -
          a fix you can use tomorrow, shipped open source, while your data stays yours.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-lg p-5"
              style={{
                backgroundColor: 'var(--zao-panel)',
                border: `1px solid ${t.featured ? 'var(--zao-cream)' : 'var(--zao-border)'}`,
              }}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream-faint)' }}>
                {t.name}
              </div>
              <div className="mt-3 text-2xl font-bold" style={{ color: t.free || t.featured ? 'var(--zao-cream)' : 'var(--zao-text)' }}>
                {t.price}
                {t.unit && (
                  <span className="text-sm font-normal" style={{ color: 'var(--zao-cream-dim)' }}>
                    {' '}
                    {t.unit}
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                {t.who}
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
                {t.get}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm" style={{ color: 'var(--zao-cream-faint)' }}>
          Inclusion at the floor, boost at the ceiling. Everyone gets in; capital accelerates - and
          pays for the free work. You always leave with something working.
        </p>
        <div className="mt-6">
          <Button href={PROFILE.bookUrl} variant="primary" external>
            Book a Build Session
          </Button>
        </div>
      </Section>

      {/* The site: Open source */}
      <div id="open-source" />
      <Section heading="Open-source work">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Everything is built in the open and kept forkable. A few of the {PROFILE.stats[0].value}{' '}
          repos - the full set is on{' '}
          <a href="https://github.com/bettercallzaal" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--zao-cream)' }}>
            GitHub
          </a>
          .
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_REPOS.map((r) => (
            <a
              key={r.name}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-5 transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
            >
              <div className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream-faint)' }}>
                {r.tag}
              </div>
              <h3 className="mt-2 text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
                {r.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
                {r.blurb}
              </p>
            </a>
          ))}
        </div>
      </Section>

      {/* The site: short story */}
      <Section heading="The short version">
        <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
          {PROFILE.bio}
        </p>
      </Section>

      {/* Convert */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Got a problem? BetterCallZaal.</h2>
            <p className="mb-8 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              Bring the one thing eating your time or blocking your virtual-world presence. Walk away
              with it working.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={PROFILE.bookUrl} external>
                Book a Build Session
              </Button>
              <Button href="https://farcaster.xyz/bettercallzaal" variant="secondary" external>
                DM on Farcaster
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
