import type { Metadata } from 'next'
import Link from 'next/link'
import { IBM_Plex_Sans_Condensed } from 'next/font/google'
import { MapStrip } from '@/components/concepts/map/Strip'
import { EcoMap } from '@/components/concepts/map/EcoMap'
import '@/components/concepts/map/map.css'

// Concept F, THE MAP: the home page is a map of the ecosystem. Every ZAO project with an
// ICM box is a place; a line joins two places wherever one box's own text names the other
// (measured, see components/concepts/map/graph.ts). The visitor explores it: drag, zoom,
// tap a project to light its connections and open its card. Nothing animates on its own.

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept F: The Map - The ZAO',
  robots: { index: false, follow: false },
}

const plex = IBM_Plex_Sans_Condensed({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function MapConcept() {
  return (
    <main className={`mp ${plex.className}`}>
      <MapStrip />
      <header className="mp-head">
        <h1>
          The ZAO <span>is all of this.</span>
        </h1>
        <nav>
          <Link href="/community">People</Link>
          <Link href="/calendar">Events</Link>
          <Link href="/ai">For AI</Link>
          <Link href="/community" className="mp-join">
            Join
          </Link>
        </nav>
      </header>
      <EcoMap />
    </main>
  )
}
