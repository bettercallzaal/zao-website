import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { CountUp } from '@/components/concepts/CountUp'
import { ConceptStrip } from '@/components/concepts/ConceptStripA'
import '@/components/concepts/index.css'
import { ECOSYSTEM } from '@/lib/constants'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import { getWaveWarZStats } from '@/lib/wavewarz'

// Concept A, THE INDEX: the home page is a numbered list of facts, set in very large type.
// No hero image, no cards. Every row is one true thing about The ZAO with the number first and
// a link to where it can be checked. Live rows come from the WaveWarZ public API; the dated
// rows carry their date. Built only from type and rules, no images beyond the logo.

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept A: The Index - The ZAO',
  robots: { index: false, follow: false },
}

const serif = Instrument_Serif({ weight: '400', subsets: ['latin'], style: ['normal', 'italic'] })
const mono = JetBrains_Mono({ weight: ['400', '700'], subsets: ['latin'] })

type Row = {
  n: number | string
  suffix?: string
  line: string
  note: string
  href: string
  live?: boolean
}

export default async function IndexConcept() {
  const ww = await getWaveWarZStats()

  const rows: Row[] = [
    ...(ww
      ? [
          {
            n: ww.battles,
            line: 'music battles fought on WaveWarZ.',
            note: 'Two artists, one stage, the crowd trades on who wins. Every battle settles on-chain.',
            href: 'https://wavewarz.info',
            live: true,
          },
          {
            n: ww.volumeSol,
            suffix: 'SOL',
            line: 'traded on those battles.',
            note: 'Read live from the WaveWarZ public API, not typed in by hand.',
            href: 'https://wavewarz.info',
            live: true,
          },
        ]
      : []),
    {
      n: '100+',
      line: 'weeks of the Respect Game, unbroken since 30 July 2024.',
      note: 'Every week, small rooms of members rank each other’s contributions. That ranking is the vote.',
      href: '/zao-leaderboard',
    },
    {
      n: 156,
      line: 'people hold Respect. Nobody bought it.',
      note: 'Respect is soulbound on Optimism. It cannot be bought, sold or transferred. Counted on-chain, 5 July 2026.',
      href: '/papers',
    },
    {
      n: WEBFLOW_MEMBERS.length,
      line: 'artists and builders with a page here.',
      note: 'Their bios and links are their own words.',
      href: '/community',
    },
    {
      n: ECOSYSTEM.length,
      line: 'projects under one roof, each built in the open.',
      note: ECOSYSTEM.map((p) => p.name).join(', ') + '.',
      href: '/nexus',
    },
    {
      n: 0,
      line: 'tokens needed to have a say.',
      note: 'A vote here is earned by showing up. The whitepaper has the full mechanics.',
      href: '/papers',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--zao-dark)' }}>
      <ConceptStrip name="A, The Index" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="The ZAO" width={36} height={36} className="rounded" priority />
          <span className={`${mono.className} text-xs uppercase tracking-[0.25em]`} style={{ color: 'var(--zao-cream-dim)' }}>
            Index
          </span>
        </Link>
        <nav className={`${mono.className} flex gap-5 text-xs uppercase tracking-[0.2em]`}>
          <Link href="/community" className="hover:underline">People</Link>
          <Link href="/calendar" className="hover:underline">Events</Link>
          <Link href="/papers" className="hidden hover:underline sm:inline">Papers</Link>
          <Link href="/nexus" className="hidden hover:underline sm:inline">Nexus</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-8 sm:pt-24">
        <p className={`${mono.className} text-xs uppercase tracking-[0.3em]`} style={{ color: 'var(--zao-cream)' }}>
          The ZAO, counted
        </p>
        <h1 className={`${serif.className} mt-6 text-[17vw] leading-[0.85] sm:text-[11rem]`} style={{ color: 'var(--zao-text)' }}>
          Artists <em style={{ color: 'var(--zao-cream)' }}>own</em>
          <br />
          the work here.
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
          A decentralized impact network that returns profit margin, data and IP rights to artists.
          Instead of telling you that, here is what it adds up to.
        </p>
      </div>

      <ol className="mx-auto max-w-7xl px-4 pb-16 sm:px-8">
        {rows.map((r, i) => {
          const external = r.href.startsWith('http')
          const inner = (
            <>
              <span className={`${mono.className} pt-3 text-xs sm:pt-6`} style={{ color: 'var(--zao-cream-faint)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`${serif.className} block text-6xl leading-none tabular-nums sm:text-8xl`} style={{ color: 'var(--zao-cream)' }}>
                {typeof r.n === 'number' ? <CountUp value={r.n} /> : r.n}
                {r.suffix && <span className="ml-3 text-3xl sm:text-5xl">{r.suffix}</span>}
              </span>
              <span className="block">
                <span className="block text-xl font-semibold leading-snug sm:text-2xl" style={{ color: 'var(--zao-text)' }}>
                  {r.line}
                </span>
                <span className="mt-2 block text-sm leading-relaxed sm:text-base" style={{ color: 'var(--zao-cream-dim)' }}>
                  {r.note}
                </span>
                <span className={`${mono.className} mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]`} style={{ color: 'var(--zao-cream-faint)' }}>
                  {r.live && <span className="zao-index-live inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#3fbf7f' }} aria-hidden="true" />}
                  {r.live ? 'Live' : 'Check it'} &rarr; {r.href.replace(/^https?:\/\//, '')}
                </span>
              </span>
            </>
          )
          const cls =
            'zao-index-row grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 py-10 sm:grid-cols-[3rem_minmax(0,26rem)_1fr] sm:items-start sm:gap-x-10'
          return (
            <li key={r.line} style={{ borderTop: '1px solid var(--zao-border)' }}>
              {external ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={r.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <p className={`${serif.className} pt-16 text-5xl leading-tight sm:text-7xl`} style={{ color: 'var(--zao-text)' }}>
          The next number is <em style={{ color: 'var(--zao-cream)' }}>you.</em>
        </p>
        <div className={`${mono.className} mt-10 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]`}>
          <a
            href="https://farcaster.xyz/~/channel/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-3 font-bold"
            style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
          >
            Join /zao on Farcaster
          </a>
          <a
            href="https://luma.com/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-3"
            style={{ border: '1px solid var(--zao-border)' }}
          >
            Come to an event
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
