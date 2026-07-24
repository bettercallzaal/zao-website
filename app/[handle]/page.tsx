import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { MEMBERS } from '@/lib/members'
import { getFarcasterUsers } from '@/lib/neynar'

// Only the registered members render; everything else 404s.
export const dynamicParams = false
export const revalidate = 86400 // refresh Farcaster data daily

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ handle: m.handle }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const m = MEMBERS.find((x) => x.handle === handle)
  if (!m) return {}
  return {
    title: `${m.name} - The ZAO`,
    description: `${m.name} - ${m.role} in The ZAO. A living profile of their work in the community.`,
    openGraph: {
      title: `${m.name} - The ZAO`,
      description: `${m.name} - ${m.role} in The ZAO.`,
      url: `https://thezao.com/${m.handle}`,
      siteName: 'The ZAO',
      type: 'profile',
    },
  }
}

export default async function MemberProfile({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const m = MEMBERS.find((x) => x.handle === handle)
  if (!m) notFound()

  const users = await getFarcasterUsers([m.fid])
  const fc = users[m.fid]
  const name = fc?.display_name || m.name
  const pfp = fc?.pfp_url || ''
  const bio = fc?.bio || ''
  const followers = fc?.follower_count || 0

  return (
    <main className="min-h-screen">
      <Nav />

      {/* Profile header */}
      <section className="py-12 sm:py-16" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div
              className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full text-4xl font-bold sm:h-32 sm:w-32"
              style={{ backgroundColor: 'var(--zao-navy)', color: 'var(--zao-cream)', boxShadow: '0 0 0 3px var(--zao-cream)' }}
            >
              {pfp ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pfp} alt={name} className="h-full w-full object-cover" />
              ) : (
                name.slice(0, 1)
              )}
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl">{name}</h1>
                <p className="mt-1 text-sm" style={{ color: 'var(--zao-cream)' }}>
                  @{m.handle}
                </p>
              </div>
              <p className="text-lg" style={{ color: 'var(--zao-text)' }}>
                {m.role}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                <a
                  href={`https://farcaster.xyz/${m.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[color:var(--zao-cream)]"
                >
                  Farcaster
                </a>
                {followers > 0 && <span>{followers.toLocaleString('en-US')} followers</span>}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Their own words (Farcaster bio) */}
      {bio && (
        <section className="py-10 sm:py-12" style={{ borderBottom: '1px solid var(--zao-border)' }}>
          <Container>
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream-faint)' }}>
              In their words
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              {bio}
            </p>
          </Container>
        </section>
      )}

      {/* Living article */}
      <section className="py-10 sm:py-14">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream-faint)' }}>
            The living article
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{name} in The ZAO</h2>
          {m.note ? (
            <div className="mt-5 max-w-2xl space-y-4 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              {m.note.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="mt-5 max-w-2xl leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              A ZAO community member and Fractal Respect earner. This is a living profile - it is
              republished each quarter with the newest work {name} has shipped in the community.
              The next update fills in the shows, releases, and contributions in full.
            </p>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  )
}
