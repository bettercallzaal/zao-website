import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Footer } from '@/components/Footer'
import { EcosystemCard } from '@/components/EcosystemCard'
import { LINK_GROUPS } from '@/lib/links'

// Projects: what The ZAO builds, from the one list the site already keeps (lib/links.ts).
// The Player lives at /projects/listen, switched off until music rights are cleared
// (LISTEN_CLEARED in components/listen/tracks.ts), so it is deliberately not listed here yet.

export const metadata: Metadata = {
  title: 'Projects - The ZAO',
  description:
    'What The ZAO builds: WaveWarZ, COC Concertz, ZAOstock, ZAO OS, ZABAL Gamez, FISHBOWLZ and more. Projects that started in the community and graduated to their own home.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects - The ZAO',
    description: 'What The ZAO builds, each project at its own home.',
    url: 'https://thezao.com/projects',
    images: ['https://thezao.com/og-image.png'],
  },
}

export default function ProjectsPage() {
  const group = LINK_GROUPS.find((g) => g.heading === 'What we build')
  const projects = group?.links ?? []

  return (
    <main className="min-h-screen">
      <Nav />
      <Section eyebrow="Projects" heading="What The ZAO builds" bordered={false}>
        {group?.note ? (
          <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
            {group.note}
          </p>
        ) : null}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <EcosystemCard key={p.name} name={p.name} blurb={p.blurb} href={p.href} />
          ))}
        </div>
      </Section>
      <Footer />
    </main>
  )
}
