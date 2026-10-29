import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Desk, type Channel } from '@/components/concepts/Desk'
import { ConceptStrip } from '@/components/concepts/ConceptStripB'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import { getWaveWarZStats, fmtNum } from '@/lib/wavewarz'

// Concept B, THE DESK: music first, so the home page is a mixing console. Each project is a
// channel strip; pick one and the display reads out what it is and one real figure for it.
// Everything is drawn in CSS: no images beyond the logo, no generated artwork.

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept B: The Desk - The ZAO',
  robots: { index: false, follow: false },
}

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '700'] })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default async function DeskConcept() {
  const ww = await getWaveWarZStats()

  const channels: Channel[] = [
    {
      label: 'WaveWarZ',
      readout: ww ? `${fmtNum(ww.battles)} battles, ${fmtNum(ww.volumeSol)} SOL` : 'Live music battles',
      blurb: 'Two artists, one stage, the crowd trades on who wins. Every battle settles on-chain and pays the artists automatically.',
      href: 'https://wavewarz.info',
      live: Boolean(ww),
    },
    {
      label: 'Respect',
      readout: '100+ weeks unbroken',
      blurb: 'The weekly Respect Game: small rooms of members rank each other’s contributions. That ranking is the vote, and it cannot be bought.',
      href: '/zao-leaderboard',
    },
    {
      label: 'People',
      readout: `${WEBFLOW_MEMBERS.length} artists and builders`,
      blurb: 'The ZAO is who is in it. Every member page carries their own words and their own links.',
      href: '/community',
    },
    {
      label: 'ZAOstock',
      readout: '7 acts, 3 October 2026',
      blurb: 'The ZAO festival, bridging a real place to an onchain community.',
      href: 'https://zaostock.com',
    },
    {
      label: 'COC Concertz',
      readout: 'Concerts in the metaverse',
      blurb: 'A recurring virtual concert series, open to everyone, showcasing ZAO artists.',
      href: 'https://cocconcertz.com',
    },
    {
      label: 'ZABAL Gamez',
      readout: 'A three-month build-a-thon',
      blurb: 'Artists and builders shipping together, in public, with workshops along the way.',
      href: 'https://zabalgamez.com',
    },
    {
      label: 'POIDH',
      readout: 'Bounties, pics or it didn’t happen',
      blurb: 'Open bounties for the community, read straight from the chain on the live board.',
      href: 'https://poidhz.com',
    },
    {
      label: 'Events',
      readout: 'Something on every week',
      blurb: 'Fractal rooms, listening sessions, workshops and shows. Everything is on the ZAO calendar.',
      href: 'https://luma.com/zao',
    },
  ]

  return (
    <main className={`${grotesk.className} min-h-screen`} style={{ backgroundColor: 'var(--zao-dark)' }}>
      <ConceptStrip name="B, The Desk" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="The ZAO" width={36} height={36} className="rounded" priority />
          <span className="font-bold">The ZAO</span>
        </Link>
        <nav className={`${mono.className} flex gap-5 text-[11px] uppercase tracking-[0.2em]`}>
          <Link href="/community" className="hover:underline">People</Link>
          <Link href="/calendar" className="hover:underline">Events</Link>
          <Link href="/papers" className="hidden hover:underline sm:inline">Papers</Link>
          <Link href="/nexus" className="hidden hover:underline sm:inline">Nexus</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-8 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Artists at the
            <br />
            <span style={{ color: 'var(--zao-cream)' }}>controls.</span>
          </h1>
          <p className="max-w-sm text-base leading-relaxed sm:text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
            The ZAO is a decentralized impact network that hands artists back their profit margin,
            their data and their IP. Every project is a channel. Pick one.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-2 pb-16 sm:px-8">
        <Desk channels={channels} monoClass={mono.className} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-8 lg:grid-cols-2">
        <p className="text-3xl font-bold leading-tight sm:text-4xl">
          A vote here is earned, never bought.
        </p>
        <div>
          <p className="leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
            Respect is an on-chain reputation, built by showing up and ranked by peers each week. It
            cannot be bought, sold or transferred, and it is how The ZAO decides things.
          </p>
          <div className={`${mono.className} mt-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.15em]`}>
            <a
              href="https://farcaster.xyz/~/channel/zao"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-5 py-3"
              style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
            >
              Join /zao
            </a>
            <Link href="/papers" className="rounded-md px-5 py-3" style={{ border: '1px solid var(--zao-border)' }}>
              Read the whitepaper
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
