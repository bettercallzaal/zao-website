import type { Metadata } from 'next'
import Link from 'next/link'
import { Space_Grotesk } from 'next/font/google'
import { PlayerStrip } from '@/components/concepts/player/Strip'
import { Player } from '@/components/concepts/player/Player'
import { getRotation } from '@/components/concepts/player/tracks'
import '@/components/concepts/player/player.css'

// Concept E, THE PLAYER: the home page is a music player. The first thing on screen is a
// play button and the first thing a visitor does is hear an artist. The rotation is the
// songs fans have traded most on WaveWarZ that are public on Audius, one per artist, each with its
// battle record and a visible credit. Everything about The ZAO itself sits in one band
// under the player.

export const revalidate = 3600

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept E: The Player - The ZAO',
  robots: { index: false, follow: false },
}

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default async function PlayerConcept() {
  const tracks = await getRotation()

  return (
    <main className={`pl ${grotesk.className}`}>
      <PlayerStrip />
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
