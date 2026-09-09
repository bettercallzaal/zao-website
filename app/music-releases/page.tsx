import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { WEBFLOW_DROPS } from '@/lib/webflowDrops'

// /music-releases is a URL the Webflow site answers today, so this is parity as
// well as a new page. It replaces a redirect that sent this index to a single
// artist profile - correct as a soft landing, but the profile lists no releases.
export const metadata: Metadata = {
  alternates: { canonical: '/music-releases' },
  title: 'Releases - The ZAO',
  description:
    "Jango UU's release archive, carried over from the Webflow build of thezao.com - seventeen singles, EPs, albums and videos from 2020 to 2024.",
  openGraph: {
    title: 'Releases - The ZAO',
    description:
      "Jango UU's release archive, carried over from the Webflow build of thezao.com.",
    url: 'https://thezao.com/music-releases',
    siteName: 'The ZAO',
    type: 'website',
    images: [{ url: WEBFLOW_DROPS[0]?.cover ?? '/logo.png' }],
  },
}

export default function MusicReleases() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-12 sm:py-20" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">Releases</h1>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--zao-cream-dim)' }}
          >
            The release archive of{' '}
            <Link href="/community/jango-uu" className="underline underline-offset-4">
              Jango UU
            </Link>
            , carried over from the Webflow build of this site. {WEBFLOW_DROPS.length} releases,
            2020 to 2024, in the original words.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WEBFLOW_DROPS.map((d) => (
              <li key={d.slug}>
                <Link href={`/drops/${d.slug}`} className="group block">
                  <div
                    className="relative aspect-square w-full overflow-hidden rounded"
                    style={{
                      border: '1px solid var(--zao-border)',
                      backgroundColor: 'var(--zao-panel)',
                    }}
                  >
                    <Image
                      src={d.cover}
                      alt={d.title}
                      fill
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="mt-4 text-xs font-medium uppercase tracking-[0.18em]"
                    style={{ color: 'var(--zao-cream-dim)' }}
                  >
                    {d.date}
                    {d.category && ` · ${d.category}`}
                  </div>
                  <div className="mt-1 text-lg font-semibold">{d.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
