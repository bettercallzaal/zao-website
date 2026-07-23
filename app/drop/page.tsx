import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { DropClient } from './DropClient'

export const metadata: Metadata = {
  title: 'Brand Drop - The ZAO',
  description: 'Drop brand assets from any device and organize them into folders.',
  robots: { index: false, follow: false },
}

// This route talks to Supabase at runtime; never prerender it.
export const dynamic = 'force-dynamic'

export default function Drop() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Brand Drop
            </p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Drop and organize brand assets</h1>
            <p className="mt-3 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
              Upload from any device, add a caption or dictate one, record a voice memo, and sort
              everything into folders. Files sync down for the build.
            </p>
          </div>
          <DropClient />
        </Container>
      </section>
      <Footer />
    </main>
  )
}
