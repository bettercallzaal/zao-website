import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { WEBFLOW_MEMBERS, categorySlug } from '@/lib/webflowMembers'
import { WEBFLOW_DROPS, hasDrops } from '@/lib/webflowDrops'

// Only the 43 carried-over profiles render; everything else 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return WEBFLOW_MEMBERS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const m = WEBFLOW_MEMBERS.find((x) => x.slug === slug)
  if (!m) return {}
  const description = m.bio[0] ?? `${m.name} is part of The ZAO community.`
  return {
    alternates: { canonical: `/community/${m.slug}` },
    title: `${m.name} - The ZAO`,
    description,
    openGraph: {
      title: `${m.name} - The ZAO`,
      description,
      url: `https://thezao.com/community/${m.slug}`,
      siteName: 'The ZAO',
      type: 'profile',
      images: [{ url: m.photo }],
    },
  }
}

export default async function CommunityProfile({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const m = WEBFLOW_MEMBERS.find((x) => x.slug === slug)
  if (!m) notFound()

  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-12 sm:py-20" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <Link
            href="/community"
            className="text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--zao-cream-dim)' }}
          >
            &larr; Community
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-10">
            <div
              className="relative h-40 w-40 shrink-0 overflow-hidden rounded sm:h-52 sm:w-52"
              style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
            >
              <Image
                src={m.photo}
                alt={m.name}
                fill
                sizes="(min-width: 640px) 13rem, 10rem"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              {m.category && (
                <Link
                  href={`/artist-category/${categorySlug(m.category)}`}
                  className="inline-block text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--zao-cream)' }}
                >
                  {m.category}
                </Link>
              )}
              <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{m.name}</h1>
              {hasDrops(m.slug) && (
                <Link
                  href="/music-releases"
                  className="inline-block text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--zao-cream-dim)' }}
                >
                  {WEBFLOW_DROPS.length} releases
                </Link>
              )}
              {m.website && (
                <a
                  href={m.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
                  style={{ color: 'var(--zao-cream-dim)' }}
                >
                  {m.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      {m.bio.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="max-w-2xl space-y-5">
              {m.bio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {m.socials.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <Container>
            <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Listen &amp; follow
            </h2>
            <div className="flex flex-wrap gap-3">
              {m.socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded px-4 py-2 text-sm transition-all hover:scale-105"
                  style={{
                    border: '1px solid var(--zao-border)',
                    backgroundColor: 'var(--zao-panel)',
                    color: 'var(--zao-cream)',
                  }}
                >
                  {s.label}
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
