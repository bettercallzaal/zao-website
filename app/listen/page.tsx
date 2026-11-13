import type { Metadata } from 'next'
import Link from 'next/link'
import { Space_Grotesk } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Player } from '@/components/listen/Player'
import { getRotation } from '@/components/listen/tracks'
import '@/components/listen/player.css'

// /listen: a working music player. Zaal, 2026-10-28, on homepage concept E (#73): "i like this
// as a side page". The rotation is the songs fans have traded most on WaveWarZ that are public
// on Audius, one per artist, each with its battle record and a visible credit (credit rule).
// Everything about The ZAO itself sits in one band under the player.

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Listen - The ZAO',
  description:
    'Press play on artists from The ZAO network: songs battled on WaveWarZ, streamed from the artists\' own Audius uploads, each credited with its battle record.',
  alternates: { canonical: '/listen' },
}

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default async function ListenPage() {
  const tracks = await getRotation()

  return (
    <main className={`pl ${grotesk.className}`}>
      <Nav />
      <header className="pl-top">
        <h1 className="pl-brand">
          The ZAO <span>is playing</span>
        </h1>
        <p>Songs artists have put up to battle on WaveWarZ, The ZAO&apos;s music battle platform. Ranked by how much SOL fans have traded on them, one song per artist.</p>
      </header>

      {tracks ? (
        <Player tracks={tracks} />
      ) : (
        <p className="pl-off">
          The rotation could not be loaded just now. The songs are all on{' '}
          <a href="https://wavewarz.info" target="_blank" rel="noopener noreferrer">
            WaveWarZ
          </a>
          .
        </p>
      )}

      <footer className="pl-band" aria-label="About The ZAO">
        <p className="pl-band-lead">
          The ZAO is a decentralized impact network that hands artists back their profit margin, their data and
          their IP. This is what it sounds like.
        </p>
        <nav className="pl-band-links">
          <Link href="/community">The artists</Link>
          <Link href="/calendar">Events</Link>
          <Link href="/about">About</Link>
          <a href="https://wavewarz.info" target="_blank" rel="noopener noreferrer">
            WaveWarZ
          </a>
          <a href="https://paragraph.com/@thezao" target="_blank" rel="noopener noreferrer">
            Newsletter
          </a>
          <Link href="/community" className="pl-join">
            Join the community
          </Link>
        </nav>
      </footer>
    </main>
  )
}
