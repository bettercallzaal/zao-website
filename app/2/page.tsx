import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { IdeaBar, ideaMeta } from '@/components/IdeaBar'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'

// Idea 2, THE WALL: the home page is the people. Every member's face, edge to edge, before any
// words. The ZAO is who is in it, so that is the first thing you see. Tap a face to meet them.
export const metadata: Metadata = { title: 'Idea 2: The Wall - The ZAO', ...ideaMeta }

export default function WallIdea() {
  return (
    <main className="min-h-screen">
      <IdeaBar n={2} name="The Wall" />

      <section className="relative">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9">
          {WEBFLOW_MEMBERS.map((m) => (
            <Link key={m.slug} href={`/community/${m.slug}`} className="group relative aspect-square overflow-hidden">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                sizes="(min-width: 1024px) 11vw, (min-width: 640px) 17vw, 25vw"
                className="object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span
                className="absolute inset-x-0 bottom-0 translate-y-full p-2 text-[11px] font-bold transition group-hover:translate-y-0"
                style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
              >
                {m.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
          <div
            className="pointer-events-auto max-w-lg rounded p-8 text-center shadow-2xl"
            style={{ backgroundColor: 'var(--zao-dark)', border: '1px solid var(--zao-border)' }}
          >
            <h1 className="text-4xl font-black sm:text-6xl" style={{ color: 'var(--zao-cream)' }}>
              This is The ZAO.
            </h1>
            <p className="mt-4 text-lg" style={{ color: 'var(--zao-text)' }}>
              {WEBFLOW_MEMBERS.length} artists and builders who own their work. Every face here is a door.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/zao-token" className="rounded-full px-6 py-3 font-bold" style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}>
                Join the wall
              </Link>
              <Link href="/about" className="rounded-full px-6 py-3 font-bold" style={{ border: '1px solid var(--zao-border)' }}>
                What we do
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
