import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { IdeaBar, ideaMeta } from '@/components/IdeaBar'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import { ECOSYSTEM } from '@/lib/constants'

// Idea 3, THE ISSUE: the site as a monthly magazine. A cover, a contents page, one artist
// feature, and what the community built this month. Each month is a new issue and old issues
// stay up as the archive, so the site always has something new to read.
export const metadata: Metadata = { title: 'Idea 3: The Issue - The ZAO', ...ideaMeta }

export default function IssueIdea() {
  const cover = WEBFLOW_MEMBERS.find((m) => m.slug === 'iman-afrikah') ?? WEBFLOW_MEMBERS[0]
  const more = WEBFLOW_MEMBERS.filter((m) => m.slug !== cover.slug && m.bio.length > 0).slice(0, 3)
  return (
    <main className="min-h-screen">
      <IdeaBar n={3} name="The Issue" />

      <section className="px-4 py-10 sm:py-16" style={{ borderBottom: '1px solid var(--zao-border)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
              Issue 01, October 2026
            </p>
            <h1 className="mt-4 font-serif text-6xl font-black leading-none sm:text-8xl" style={{ color: 'var(--zao-cream)' }}>
              ZAO
            </h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.4em]">The artist-owned magazine</p>
            <p className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">On the cover: {cover.name}</p>
            <p className="mt-3 text-lg" style={{ color: 'var(--zao-cream-dim)' }}>
              {cover.bio[0]}
            </p>
            <Link href={`/community/${cover.slug}`} className="mt-6 inline-block font-bold underline" style={{ color: 'var(--zao-cream)' }}>
              Read the feature
            </Link>
          </div>
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded shadow-2xl"
            style={{ border: '1px solid var(--zao-border)' }}
          >
            <Image src={cover.photo} alt={cover.name} fill sizes="384px" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-serif text-3xl font-bold" style={{ color: 'var(--zao-cream)' }}>
              In this issue
            </h2>
            <ol className="mt-6 space-y-3 font-mono text-sm">
              <li>04 The cover: {cover.name}</li>
              <li>12 Three artists to hear next</li>
              <li>20 What we built this month</li>
              <li>28 How to get in</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>
              Three artists to hear next
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {more.map((m) => (
                <Link key={m.slug} href={`/community/${m.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded">
                    <Image src={m.photo} alt={m.name} fill sizes="(min-width: 640px) 20vw, 90vw" className="object-cover" />
                  </div>
                  <p className="mt-3 font-bold">{m.name}</p>
                  <p className="mt-1 line-clamp-3 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                    {m.bio[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14" style={{ backgroundColor: 'var(--zao-panel)' }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--zao-cream)' }}>
            What we built this month
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM.map((e) => (
              <a key={e.name} href={e.href} className="block">
                <p className="font-serif text-2xl font-bold">{e.name}</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--zao-cream-dim)' }}>
                  {e.blurb}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center">
        <p className="font-serif text-4xl font-bold">Get in the next issue.</p>
        <Link
          href="/zao-token"
          className="mt-6 inline-block rounded-full px-7 py-3 font-bold"
          style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
        >
          Join The ZAO
        </Link>
      </section>
    </main>
  )
}
