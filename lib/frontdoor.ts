// The front door: every ZAO brand with a live website, and one live signal for the brands
// that publish one. Zaal, 2026-10-28: "have all our zao brands on the front page when u walk
// in so u can click and just go to their websites".
//
// Names are canon (the brand glossary). Every href was fetched on 2026-10-28 and answered 200.
// Left off on purpose: Sparkz (its ICM box says it is paused until Zaal reopens it).
//
// A signal that cannot be read is simply absent, never a guess: the door still opens.

import { parseIcs, splitEventsByTime } from '@/lib/api/ics-parser'

export type Door = {
  name: string
  what: string
  href: string
  /** The address people see on the door, so they know where they are going. */
  domain: string
  group: 'Music' | 'Gather' | 'Build' | 'Read'
  /** Which live reading belongs on this door, if any. */
  pulse?: 'wavewarz' | 'fractal' | 'newsletter'
}

export const DOORS: Door[] = [
  { name: 'WaveWarZ', what: 'Live-traded music battles. Artists earn on every trade.', href: 'https://wavewarz.com', domain: 'wavewarz.com', group: 'Music', pulse: 'wavewarz' },
  { name: 'COC Concertz', what: 'A recurring metaverse concert series.', href: 'https://cocconcertz.com', domain: 'cocconcertz.com', group: 'Music' },
  { name: 'ZAOstock', what: 'A free music festival in Ellsworth, Maine.', href: 'https://zaostock.com', domain: 'zaostock.com', group: 'Music' },
  { name: 'The Fractal', what: 'Weekly rooms where members rank each other’s work and earn Respect.', href: 'https://luma.com/zao', domain: 'luma.com/zao', group: 'Gather', pulse: 'fractal' },
  { name: 'Zuke', what: 'Live audio rooms for the community.', href: 'https://zuke.thezao.com', domain: 'zuke.thezao.com', group: 'Gather' },
  { name: 'FISHBOWLZ', what: 'Persistent audio rooms.', href: 'https://fishbowlz.com', domain: 'fishbowlz.com', group: 'Gather' },
  { name: 'The ZAO Co-Works', what: 'The coworking side of The ZAO.', href: 'https://thezao.xyz', domain: 'thezao.xyz', group: 'Gather' },
  { name: 'ZABAL Gamez', what: 'A free 3-month build-a-thon with a ZAO mentor.', href: 'https://zabalgamez.com', domain: 'zabalgamez.com', group: 'Build' },
  { name: 'ZAO OS', what: 'The lab where new ZAO things are built first.', href: 'https://zaoos.com', domain: 'zaoos.com', group: 'Build' },
  { name: 'ZAOlingo', what: 'Learn to build with Claude Code, a few minutes a day.', href: 'https://zaolingo.vercel.app', domain: 'zaolingo.vercel.app', group: 'Build' },
  { name: 'zlank', what: 'Build Farcaster Snaps with no code.', href: 'https://zlank.vercel.app', domain: 'zlank.vercel.app', group: 'Build' },
  { name: 'channelz', what: 'A Farcaster client with your channels your way.', href: 'https://channelz-lilac.vercel.app', domain: 'channelz-lilac.vercel.app', group: 'Build' },
  { name: 'ZAO Video Editor', what: 'Fast clips, in the browser.', href: 'https://zao-video-editor.vercel.app', domain: 'zao-video-editor.vercel.app', group: 'Build' },
  { name: 'The ZAO Newsletter', what: 'The daily build log, on Paragraph.', href: 'https://paragraph.com/@thezao', domain: 'paragraph.com/@thezao', group: 'Read', pulse: 'newsletter' },
  { name: 'BetterCallZaal', what: 'Zaal Panthaki, the founder, building in public.', href: 'https://bettercallzaal.com', domain: 'bettercallzaal.com', group: 'Read' },
]

export type Pulse = { text: string; live: boolean }
export type Pulses = Partial<Record<NonNullable<Door['pulse']>, Pulse>>

const TZ = 'America/New_York'
const when = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(iso))

async function get(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, next: { revalidate: 600 } })
  if (!res.ok) throw new Error(String(res.status))
  return res
}

async function wavewarz(): Promise<Pulse | undefined> {
  try {
    const d = (await (await get('https://wavewarz.info/api/public/stats')).json()) as {
      liveBattle?: { artist1?: { name?: string }; artist2?: { name?: string } } | null
      battles?: { total?: unknown }
    }
    const a = d.liveBattle?.artist1?.name?.trim()
    const b = d.liveBattle?.artist2?.name?.trim()
    if (a && b) return { text: `Battle on now: ${a} v ${b}`, live: true }
    const total = d.battles?.total
    if (typeof total === 'number') return { text: `${total.toLocaleString('en-US')} battles so far`, live: false }
  } catch {}
  return undefined
}

async function fractal(): Promise<Pulse | undefined> {
  try {
    const ics = await (await get('https://api.lu.ma/ics/get?entity=calendar&id=cal-jPH4al7AMlXzdNN')).text()
    const next = splitEventsByTime(parseIcs(ics)).upcoming.find((e) => /fractal/i.test(e.title))
    if (!next) return undefined
    const n = next.title.match(/#\s*(\d+)/)?.[1]
    // Lit when the room opens within the next two hours.
    const soon = Date.parse(next.start) - Date.now() < 2 * 3600 * 1000
    return { text: `${n ? `Fractal #${n}` : 'Next fractal'}: ${when(next.start)} ET`, live: soon }
  } catch {}
  return undefined
}

async function newsletter(): Promise<Pulse | undefined> {
  try {
    const xml = await (await get('https://api.paragraph.com/blogs/rss/@thezao', { headers: { 'User-Agent': 'thezao.com' } })).text()
    const item = xml.match(/<item>([\s\S]*?)<\/item>/)?.[1]
    const title = item?.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]?.trim()
    if (title) return { text: `Latest: ${title}`, live: false }
  } catch {}
  return undefined
}

export async function getPulses(): Promise<Pulses> {
  const [w, f, n] = await Promise.all([wavewarz(), fractal(), newsletter()])
  return { wavewarz: w, fractal: f, newsletter: n }
}
