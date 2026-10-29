import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { ICM_BOXES, ICM_GROUPS, boxLlmUrl } from '@/lib/icm'

export const metadata: Metadata = {
  alternates: { canonical: '/ai' },
  title: 'AI Tools - The ZAO',
  description:
    'Grounded, AI-readable context on every part of the ZAO ecosystem. Each project has a permanent context box an AI can load to answer "what is X" correctly - no hallucination. Point any LLM or agent at these.',
  openGraph: {
    title: 'AI Tools - The ZAO',
    description: 'Grounded, AI-readable context boxes for every ZAO project. Point any AI here.',
    url: 'https://thezao.com/ai',
    siteName: 'The ZAO',
    type: 'website',
    images: ['https://thezao.com/og-image.png'],
  },
}

export default function AiTools() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              AI Tools
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              Grounded context for AI.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              Every part of the ZAO ecosystem has a permanent, AI-readable context box. Point any
              LLM or agent at one and it loads the real facts - so it answers &quot;what is
              this?&quot; correctly instead of guessing. Free, no login, always current.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--zao-text)' }}>
              Each link below is plain text an AI can read directly:{' '}
              <code style={{ color: 'var(--zao-cream)' }}>context.thezao.com/&lt;box&gt;</code>
            </p>
          </div>
        </Container>
      </section>

      {ICM_GROUPS.map((group) => {
        const boxes = ICM_BOXES.filter((b) => b.group === group.key)
        if (boxes.length === 0) return null
        return (
          <section key={group.key} className="py-12 sm:py-16" style={{ borderBottom: '1px solid var(--zao-border)' }}>
            <Container>
              <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
                {group.label}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {boxes.map((box) => (
                  <a
                    key={box.slug}
                    href={boxLlmUrl(box)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl p-5 transition-colors"
                    style={{ border: '1px solid var(--zao-border)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
                        {box.name}
                      </h2>
                      <span
                        aria-hidden
                        className="mt-1 text-sm transition-transform group-hover:translate-x-0.5"
                        style={{ color: 'var(--zao-text)' }}
                      >
                        &rarr;
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--zao-text)' }}>
                      {box.blurb}
                    </p>
                    <p className="mt-3 text-xs" style={{ color: 'var(--zao-text)', opacity: 0.7 }}>
                      AI context&nbsp;&middot;&nbsp;{box.slug}
                    </p>
                  </a>
                ))}
              </div>
            </Container>
          </section>
        )
      })}

      <Footer />
    </main>
  )
}
