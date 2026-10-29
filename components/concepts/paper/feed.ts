// The live feed behind concept D, The Paper. Every item on the page comes from a public
// endpoint at request time (cached 15 minutes): the ZAO Luma calendar, the newsletter's
// Paragraph RSS and the WaveWarZ public API. A source that fails or changes shape returns
// null and its section says so, rather than printing a guess.

import { parseIcs, splitEventsByTime } from '@/lib/api/ics-parser'

export const REVALIDATE = 900

const LUMA_ICS = 'https://api.lu.ma/ics/get?entity=calendar&id=cal-jPH4al7AMlXzdNN'
const PARAGRAPH_RSS = 'https://api.paragraph.com/blogs/rss/@thezao'
const WW_BATTLES = 'https://wavewarz.info/api/public/battles?limit=8'
const WW_STATS = 'https://wavewarz.info/api/public/stats'

export type PaperEvent = { title: string; start: string; url: string; location: string | null }
export type Edition = { title: string; link: string; date: string; excerpt: string }
export type Battle = {
  id: string
  type: string
  a: string
  b: string
  winner: 'a' | 'b' | null
  decided: boolean
  volumeSol: number
  url: string
  endsAt: string
}

async function get(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, next: { revalidate: REVALIDATE } })
  if (!res.ok) throw new Error(`${url} ${res.status}`)
  return res
}

// The ICS DESCRIPTION carries escaped newlines ("\n" as two characters), so the event link
// is cut at the first backslash or whitespace. lib/api/ics-parser keeps the tail.
const cleanUrl = (u: string) => u.split(/[\\\s]/)[0]

export async function getEvents(): Promise<{ upcoming: PaperEvent[]; recent: PaperEvent[] } | null> {
  try {
    const ics = await (await get(LUMA_ICS)).text()
    const { upcoming, recent } = splitEventsByTime(parseIcs(ics))
    const tidy = (e: { title: string; start: string; url: string; location: string | null }) => ({
      title: e.title,
      start: e.start,
      url: cleanUrl(e.url) || 'https://luma.com/zao',
      location: e.location,
    })
    return { upcoming: upcoming.map(tidy), recent: recent.map(tidy) }
  } catch {
    return null
  }
}

const cdata = (s: string) => s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
const pick = (item: string, tag: string) => cdata(item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? '')

export async function getEditions(): Promise<Edition[] | null> {
  try {
    const xml = await (await get(PARAGRAPH_RSS, { headers: { 'User-Agent': 'Mozilla/5.0 (thezao.com)' } })).text()
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])
    const editions = items
      .map((it) => ({
        title: pick(it, 'title'),
        link: pick(it, 'link'),
        date: pick(it, 'pubDate'),
        // The feed's description opens with the sign-on line and the title in lower case
        // ("zm year of the zabal day 300 ..."); the story starts after it.
        excerpt: pick(it, 'description')
          .replace(/^zm\s+/i, '')
          .replace(new RegExp(`^${pick(it, 'title').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+-\s+/g, '\\s+')}\\s*`, 'i'), '')
          .replace(/https?:\/\/\S+/g, '')
          .replace(/\s+\.\.\.$/, '...')
          .trim(),
      }))
      .filter((e) => e.title && e.link && !Number.isNaN(Date.parse(e.date)))
    return editions.length ? editions : null
  } catch {
    return null
  }
}

type RawSide = { name?: unknown; volumeSol?: unknown }
type RawBattle = {
  battleId?: unknown
  type?: unknown
  winnerDecided?: unknown
  winnerSide?: unknown
  url?: unknown
  endsAt?: unknown
  artist1?: RawSide
  artist2?: RawSide
}

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null)
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function getBattles(): Promise<Battle[] | null> {
  try {
    const d = (await (await get(WW_BATTLES)).json()) as { battles?: RawBattle[] }
    if (!Array.isArray(d.battles)) return null
    return d.battles
      .map((b) => {
        const va = num(b.artist1?.volumeSol)
        const vb = num(b.artist2?.volumeSol)
        return {
          id: String(b.battleId ?? ''),
          type: str(b.type),
          a: str(b.artist1?.name),
          b: str(b.artist2?.name),
          winner: b.winnerSide === 'artist1' ? 'a' : b.winnerSide === 'artist2' ? 'b' : null,
          decided: b.winnerDecided === true,
          volumeSol: va !== null && vb !== null ? va + vb : NaN,
          url: str(b.url) || 'https://wavewarz.info',
          endsAt: str(b.endsAt),
        } as Battle
      })
      .filter((b) => b.id && b.a && b.b && Number.isFinite(b.volumeSol))
  } catch {
    return null
  }
}

export async function getBattleTotal(): Promise<number | null> {
  try {
    const d = (await (await get(WW_STATS)).json()) as { battles?: { total?: unknown } }
    return num(d.battles?.total)
  } catch {
    return null
  }
}
