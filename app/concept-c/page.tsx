import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Fraunces } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { ConceptStrip } from '@/components/concepts/ConceptStripC'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import { ECOSYSTEM } from '@/lib/constants'
import '@/components/concepts/room.css'

// Concept C, THE ROOM: The ZAO decides things in small rooms of peers, so the home page is a
// room. Real member faces sit on slow rings around the logo, six to the inner ring like a
// Respect Game room. The photos are the members' own, from /public/members; nothing generated.

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept C: The Room - The ZAO',
  robots: { index: false, follow: false },
}

const serif = Fraunces({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] })

// Inner to outer: seats, radius and face size in container widths, turn time, direction.
const RINGS = [
  { seats: 6, r: 20, size: 10, dur: 70, dir: 'normal' },
  { seats: 12, r: 32, size: 8.5, dur: 110, dir: 'reverse' },
  { seats: 18, r: 44, size: 7, dur: 150, dir: 'normal' },
] as const

export default function RoomConcept() {
  const rings = RINGS.map((ring, k) => {
    const start = RINGS.slice(0, k).reduce((n, r) => n + r.seats, 0)
    return { ...ring, people: WEBFLOW_MEMBERS.slice(start, start + ring.seats) }
  })

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--zao-dark)' }}>
      <ConceptStrip name="C, The Room" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className={`${serif.className} text-xl font-bold`}>
          The ZAO
        </Link>
        <nav className="flex gap-5 text-sm">
          <Link href="/community" className="hover:underline">People</Link>
          <Link href="/calendar" className="hover:underline">Events</Link>
          <Link href="/papers" className="hidden hover:underline sm:inline">Papers</Link>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-6 text-center sm:px-8 sm:pt-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>
          A decentralized impact network for artists
        </p>
        <h1 className={`${serif.className} mx-auto mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-7xl`}>
          Six people. One room.{' '}
          <em style={{ color: 'var(--zao-cream)' }}>Every week.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
          The ZAO hands artists back their profit margin, their data and their IP, and it decides
          what to do next the same way it has for 100+ weeks: small rooms of peers, ranking each
          other&apos;s work. These are some of the people in the room.
        </p>
      </div>

      <div className="zao-room my-10 sm:my-16">
        {rings.map((ring) => (
          <div
            key={ring.seats}
            className="zao-room-ring"
            style={
              {
                width: `${ring.r * 2}cqw`,
                height: `${ring.r * 2}cqw`,
                '--dur': `${ring.dur}s`,
                '--dir': ring.dir,
                '--undir': ring.dir === 'normal' ? 'reverse' : 'normal',
              } as CSSProperties
            }
          >
            {ring.people.map((m, i) => (
              <Link
                key={m.slug}
                href={`/community/${m.slug}`}
                className="zao-room-seat"
                title={m.name}
                style={
                  {
                    '--a': `${(360 / ring.seats) * i}deg`,
                    '--r': `${ring.r}cqw`,
                    '--size': `${ring.size}cqw`,
                  } as CSSProperties
                }
              >
                <span className="zao-room-face">
                  <Image src={m.photo} alt={m.name} width={96} height={96} className="h-full w-full object-cover" />
                </span>
              </Link>
            ))}
          </div>
        ))}
        <div className="zao-room-core">
          <Image src="/zao-logo-512.png" alt="The ZAO" fill sizes="160px" className="object-cover" priority />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} max-w-3xl text-4xl leading-tight sm:text-5xl`}>
          How a room decides. <em style={{ color: 'var(--zao-cream)' }}>No tokens required.</em>
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3" style={{ counterReset: 'zao-step' }}>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Show up</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              Each week members meet in small rooms and say what they built, played or organised.
            </p>
          </li>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Get ranked by peers</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              The room has to reach agreement on an order of contribution, together.
            </p>
          </li>
          <li className="zao-room-step">
            <p className="text-xl font-semibold">Earn Respect</p>
            <p className="mt-2 leading-relaxed" style={{ color: 'var(--zao-cream-dim)' }}>
              Respect lands on-chain on Optimism. It cannot be bought, sold or transferred, and it is
              the vote.
            </p>
          </li>
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} text-4xl sm:text-5xl`}>What the rooms build</h2>
        <ul className="mt-10">
          {ECOSYSTEM.map((p) => (
            <li key={p.name} style={{ borderTop: '1px solid var(--zao-border)' }}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className={`${serif.className} text-3xl transition-colors group-hover:text-[var(--zao-cream)] sm:w-80 sm:shrink-0`}>
                  {p.name}
                </span>
                <span style={{ color: 'var(--zao-cream-dim)' }}>{p.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 py-20 text-center sm:px-8" style={{ borderTop: '1px solid var(--zao-border)' }}>
        <h2 className={`${serif.className} mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl`}>
          There is a <em style={{ color: 'var(--zao-cream)' }}>seat</em> for you.
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://luma.com/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3 font-bold"
            style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
          >
            Join the next room
          </a>
          <a
            href="https://farcaster.xyz/~/channel/zao"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3"
            style={{ border: '1px solid var(--zao-border)' }}
          >
            Say hi on /zao
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
