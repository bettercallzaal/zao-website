import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { WHAT_IS, BOILERPLATE, GLOSSARY, VOICE, PALETTE, HIERARCHY } from '@/lib/brand'

export const metadata: Metadata = {
  title: 'Brand - The ZAO',
  description:
    'The ZAO brand reference: what it is, the boilerplate, the naming glossary, voice, palette, and sub-brand hierarchy. One place to read the whole brand.',
  openGraph: {
    title: 'Brand - The ZAO',
    description: 'The ZAO brand reference - boilerplate, glossary, voice, palette, hierarchy.',
    url: 'https://thezao.com/brand',
    siteName: 'The ZAO',
    type: 'website',
  },
}

function Copyable({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg p-4" style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}>
      <div className="mb-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream-faint)' }}>
        {label}
      </div>
      <p className="leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
        {text}
      </p>
    </div>
  )
}

export default function Brand() {
  return (
    <main className="min-h-screen">
      <Nav />

      <section className="py-16 sm:py-24" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <Container>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--zao-cream)' }}>
              Brand
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              The ZAO brand, in one place.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--zao-text)' }}>
              {WHAT_IS.oneLine}
            </p>
          </div>
        </Container>
      </section>

      {/* What is The ZAO */}
      <Section heading="What it is">
        <div className="max-w-2xl space-y-5">
          <p style={{ color: 'var(--zao-cream-dim)' }}>{WHAT_IS.longer}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
                What it is
              </p>
              <ul className="space-y-2">
                {WHAT_IS.is.map((x) => (
                  <li key={x} className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream-faint)' }}>
                What it is not
              </p>
              <ul className="space-y-2">
                {WHAT_IS.isNot.map((x) => (
                  <li key={x} className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Boilerplate */}
      <Section heading="Boilerplate">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          The standard ways to describe The ZAO. Use verbatim or trim. No member counts or volume -
          those drift; pull the confirmed number at the moment of use.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Copyable label="One-liner" text={BOILERPLATE.oneLiner} />
          <Copyable label="Short (~40 words)" text={BOILERPLATE.short} />
          <div className="lg:col-span-2">
            <Copyable label="Medium (~75 words)" text={BOILERPLATE.medium} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
              Taglines (pick one per surface, do not mix)
            </p>
            <ul className="space-y-1">
              {BOILERPLATE.taglines.map((t) => (
                <li key={t} style={{ color: 'var(--zao-cream-dim)' }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
              Social bios
            </p>
            <ul className="space-y-1">
              {BOILERPLATE.bios.map((b) => (
                <li key={b} className="text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Naming glossary */}
      <Section heading="Naming glossary">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Exact spellings. Never autocorrect or fix capitalization. When you are about to write a
          brand name, check here first.
        </p>
        <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--zao-border)' }}>
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--zao-border)' }}>
                <th className="p-3 font-semibold" style={{ color: 'var(--zao-cream)' }}>Correct</th>
                <th className="p-3 font-semibold" style={{ color: 'var(--zao-cream-faint)' }}>Not</th>
                <th className="p-3 font-semibold" style={{ color: 'var(--zao-cream-dim)' }}>Note</th>
              </tr>
            </thead>
            <tbody>
              {GLOSSARY.map((g) => (
                <tr key={g.correct} style={{ borderTop: '1px solid var(--zao-border)' }}>
                  <td className="whitespace-nowrap p-3 font-bold" style={{ color: 'var(--zao-cream)' }}>{g.correct}</td>
                  <td className="p-3" style={{ color: 'var(--zao-cream-faint)' }}>{g.wrong}</td>
                  <td className="p-3" style={{ color: 'var(--zao-cream-dim)' }}>{g.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Voice */}
      <Section heading="Voice">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
              Hard rules
            </p>
            <ul className="space-y-2">
              {VOICE.hardRules.map((r) => (
                <li key={r} className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
              Register
            </p>
            <ul className="space-y-2">
              {VOICE.register.map((r) => (
                <li key={r} className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream-faint)' }}>
              Avoid
            </p>
            <ul className="space-y-2">
              {VOICE.avoid.map((r) => (
                <li key={r} className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 pl-4 italic" style={{ color: 'var(--zao-cream-dim)', borderColor: 'var(--zao-cream)' }}>
          {VOICE.test}
        </p>
      </Section>

      {/* Palette */}
      <Section heading="Palette">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          Navy and gold, from the ZAO logo. This is the current brand palette across the site.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PALETTE.map((c) => (
            <div key={c.hex} className="rounded-lg p-4" style={{ border: '1px solid var(--zao-border)' }}>
              <div className="mb-3 h-16 w-full rounded" style={{ backgroundColor: c.hex, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
              <div className="font-bold" style={{ color: 'var(--zao-cream)' }}>{c.role}</div>
              <div className="font-mono text-sm" style={{ color: 'var(--zao-cream-dim)' }}>{c.hex}</div>
              <div className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--zao-cream-faint)' }}>{c.use}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Hierarchy */}
      <Section heading="Sub-brand hierarchy">
        <p className="-mt-4 mb-8 max-w-2xl" style={{ color: 'var(--zao-cream-dim)' }}>
          The ZAO is the umbrella. Do not flatten the sub-brands together, and keep ZAO and ZABAL
          identity separate.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: 'The umbrella', items: HIERARCHY.umbrella },
            { title: 'Under The ZAO', items: HIERARCHY.under },
            { title: "Beside it (Zaal's brands)", items: HIERARCHY.beside },
          ].map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--zao-cream)' }}>
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.items.map((it) => (
                  <li key={it.name}>
                    <div className="font-bold" style={{ color: 'var(--zao-cream)' }}>{it.name}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>{it.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  )
}
