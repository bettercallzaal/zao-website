import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { WEBFLOW_DROPS, dropBySlug } from '@/lib/webflowDrops'

// Only the 17 carried-over releases render; everything else 404s. This matters
// more than usual here: before the port these paths were redirects, and a
// catch-all would have quietly turned every mistyped /drops/* URL into a 200.
export const dynamicParams = false

export function generateStaticParams() {
  return WEBFLOW_DROPS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = dropBySlug(slug)
  if (!d) return {}
  const description =
    d.body[0] ?? `${d.title} - a release by Jango UU, ${d.date}.`
  return {
    alternates: { canonical: `/drops/${d.slug}` },
    title: `${d.title} - Jango UU - The ZAO`,
    description,
    openGraph: {
      title: `${d.title} - Jango UU`,
      description,
      url: `https://thezao.com/drops/${d.slug}`,
      siteName: 'The ZAO',
      type: 'article',
      images: [{ url: d.cover }],
    },
  }
}

export default async function DropPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = dropBySlug(slug)
  if (!d) notFound()

  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-12 sm:py-20" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <Link
            href="/music-releases"
            className="text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--zao-cream-dim)' }}
          >
            &larr; Releases
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-10">
            <div
              className="relative h-52 w-52 shrink-0 overflow-hidden rounded"
              style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
            >
              <Image
                src={d.cover}
                alt={d.title}
                fill
                sizes="13rem"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <div
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: 'var(--zao-cream-dim)' }}
              >
                {d.date}
                {d.category && ` · ${d.category}`}
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{d.title}</h1>
              <Link
                href="/community/jango-uu"
                className="inline-block text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: 'var(--zao-cream-dim)' }}
              >
                Jango UU
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {d.body.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="max-w-2xl space-y-5">
              {d.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed sm:text-lg"
                  style={{ color: 'var(--zao-cream-dim)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {d.links.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <Container>
            <h2
              className="mb-6 text-sm font-medium uppercase tracking-[0.18em]"
              style={{ color: 'var(--zao-cream)' }}
            >
              Listen
            </h2>
            <div className="flex flex-wrap gap-3">
              {d.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded px-4 py-2 text-sm transition-all hover:scale-105"
                  style={{
                    border: '1px solid var(--zao-border)',
                    backgroundColor: 'var(--zao-panel)',
                    color: 'var(--zao-cream)',
                  }}
                >
                  {l.platform}
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Footer />
    </main>
  )
}
