import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'

// A ZAO 404 instead of the bare Next.js one. Matters once thezao.com moves off Webflow: old
// links people saved will land here, so it points them to the pages most people want.
export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="py-24 sm:py-32">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
            Page not found
          </p>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
            This page moved or never existed.
          </h1>
          <p className="mt-6 max-w-xl text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
            The ZAO has a new home. Here is where most people are headed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'The artists and builders', href: '/community' },
              { label: 'Calendar', href: '/calendar' },
              { label: '$ZAO', href: '/zao-token' },
              { label: 'All links', href: '/links' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-5 py-2.5 text-sm font-bold"
                style={{ border: '1px solid var(--zao-border)', color: 'var(--zao-cream)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  )
}
