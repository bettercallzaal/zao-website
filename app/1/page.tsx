import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { IdeaBar, ideaMeta } from '@/components/IdeaBar'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import { ECOSYSTEM } from '@/lib/constants'

// Idea 1, THE STATION: The ZAO as a radio station that never goes off air. The home page is
// the dial: what is on now, what is coming up, and the artists as the voices you hear.
export const metadata: Metadata = { title: 'Idea 1: The Station - The ZAO', ...ideaMeta }

const SHOWS = [
  { time: 'Every day', name: 'WaveWarZ battles', blurb: 'Two artists, one stage, the crowd trades on who wins.', href: 'https://wavewarz.com' },
  { time: 'Weekly', name: 'COC Concertz', blurb: 'Live concerts in the metaverse, open to everyone.', href: 'https://cocconcertz.com' },
  { time: 'Always on', name: 'ZAO MixZ', blurb: 'The ZAO catalogue, mixed live by DJ MixZ. Press play.', href: 'https://zaomixz.vercel.app' },
  { time: 'The big one', name: 'ZAOstock', blurb: 'The festival: a real place and an onchain crowd.', href: 'https://zaostock.com' },
]

export default function StationIdea() {
  const voices = WEBFLOW_MEMBERS.filter((m) => m.category).slice(0, 12)
  return (
    <main className="min-h-screen">
      <IdeaBar n={1} name="The Station" />

      <section className="px-4 py-16 sm:py-28" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <div className="mx-auto max-w-5xl">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" aria-hidden />
            On air, all day, everywhere
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-8xl">
            THE ZAO
            <br />
            <span style={{ color: 'var(--zao-cream)' }}>FM</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl" style={{ color: 'var(--zao-cream-dim)' }}>
            A station run by the artists on it. Tune in, find someone new, back them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://zaomixz.vercel.app" className="rounded-full px-7 py-3 font-bold" style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}>
              Tune in now
            </a>
            <Link href="/community" className="rounded-full px-7 py-3 font-bold" style={{ border: '1px solid var(--zao-border)' }}>
              Meet the voices
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>The schedule</h2>
          <ul className="mt-6">
            {SHOWS.map((s) => (
              <li key={s.name} style={{ borderTop: '1px solid var(--zao-border)' }}>
                <a href={s.href} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6">
                  <span className="font-mono text-sm" style={{ color: 'var(--zao-cream-dim)' }}>{s.time}</span>
                  <span>
                    <span className="block text-2xl font-bold">{s.name}</span>
                    <span className="block" style={{ color: 'var(--zao-cream-dim)' }}>{s.blurb}</span>
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--zao-cream)' }}>Listen</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-14" style={{ backgroundColor: 'var(--zao-panel)' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>The voices on this station</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
            {voices.map((m) => (
              <Link key={m.slug} href={`/community/${m.slug}`} className="w-36 shrink-0">
                <div className="relative aspect-square overflow-hidden rounded-full" style={{ border: '2px solid var(--zao-border)' }}>
                  <Image src={m.photo} alt={m.name} fill sizes="144px" className="object-cover" />
                </div>
                <p className="mt-3 text-center text-sm font-bold">{m.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>Built by the station</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM.map((e) => (
              <a key={e.name} href={e.href} className="rounded p-5" style={{ border: '1px solid var(--zao-border)' }}>
                <p className="font-bold" style={{ color: 'var(--zao-cream)' }}>{e.name}</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>{e.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
