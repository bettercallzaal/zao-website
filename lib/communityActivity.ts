// How active each community member is, and where they came in. Zaal asked for
// the /community page to be organised by most active as well as A to Z, with
// filters anyone can use (ZAO Festivals chat, 11 Nov 2026; iman-desk #189).
//
// Two measures are counted today, both from our own data:
//   battles  WaveWarZ battles, from the public API (wavewarz.info/api/public),
//            refreshed into communityActivity.generated.json by
//            scripts/community-activity.mjs. Only members mapped in
//            WAVEWARZ_HANDLES are counted, so nobody is matched by guesswork.
//   shows    ZAO shows played: ZAOstock (ZAOstock lineup file, 3 Oct 2026) and
//            CoC ConcertZ (the CoCConcertZ repo's runbooks and show notes).
// Two more are planned and NOT counted yet: fractal attendance (Respect earned)
// and new releases. The page says so in one line.
//
// Groups: "Active now" = a battle or show in the last 90 days. "Active this year"
// = in the last 365 days. Everyone else sits in the third group, which is also
// where members with no counted battles or shows land, so the label says both.
//
// Origins are facts we can point at, not a ranking: a WaveWarZ artist is one who
// has battled; Festivals = played ZAOstock; CoC = played a CoC ConcertZ; Fractal =
// a Respect earner named in lib/members.ts or a fractal result on the desk;
// everyone else came in as a friend of the ZAO through the original site.

import generated from './communityActivity.generated.json'

export type Origin = 'wavewarz' | 'festivals' | 'coc' | 'fractal' | 'friends'
export type ActivityGroup = 'now' | 'year' | 'alumni'

export type Show = { name: string; date: string }

export type MemberActivity = {
  slug: string
  origins: Origin[]
  battles: number
  battles90: number
  battles365: number
  lastBattle: string | null
  shows: Show[]
  score: number
}

export const ORIGINS: { key: Origin; title: string }[] = [
  { key: 'wavewarz', title: 'WaveWarZ' },
  { key: 'festivals', title: 'ZAO Festivals' },
  { key: 'coc', title: 'CoC ConcertZ' },
  { key: 'fractal', title: 'The Fractal' },
  { key: 'friends', title: 'Friends of the ZAO' },
]

export const ACTIVITY_GROUPS: { key: ActivityGroup; title: string; sub: string }[] = [
  { key: 'now', title: 'Active now', sub: 'a battle or a show in the last 90 days' },
  { key: 'year', title: 'Active this year', sub: 'in the last 365 days' },
  { key: 'alumni', title: 'Alumni and the wider family', sub: 'no battles or shows counted this year' },
]

// Community slug -> Audius handle used on WaveWarZ. Add a row when a member
// battles; the generator picks it up on the next run. Jack Miller and Money
// Miller are not confirmed to be the same person, so jack-miller is not mapped.
export const WAVEWARZ_HANDLES: Record<string, string> = {
  'hurric4n3ike': 'hurric4n3ike',
  'godcloud': 'godcloud',
  'stilo': 'dopestilo',
  'dcoop': 'dcoopofficial',
  'gesd1': 'gesd1',
  'bettercallzaal': 'bettercallzaal',
  'nessytherilla': 'nessytherilla',
  'iman-afrikah': 'imanafrikah',
}

const ZAOSTOCK: Show = { name: 'ZAOstock 2026', date: '2026-10-03' }
// CoC ConcertZ 4 ran in spring 2026 (the show notes announce a 19 March follow-up
// and mention Earth Day); the day is not in the repo, so the month stands in.
const COC4: Show = { name: 'CoC ConcertZ 4', date: '2026-03-01' }
const COC7: Show = { name: 'CoC ConcertZ 7', date: '2026-07-18' }

const SHOWS: Record<string, Show[]> = {
  'dcoop': [ZAOSTOCK],
  'fellenz': [ZAOSTOCK, COC4],
  'joseph-goats': [COC4],
  'stilo': [COC4, COC7],
  'godcloud': [COC7],
}

const EXTRA_ORIGINS: Record<string, Origin[]> = {
  'attabotty': ['coc', 'fractal'],
  'clejan': ['coc'],
  'iman-afrikah': ['coc', 'fractal'],
  'hurric4n3ike': ['fractal'],
  'fellenz': ['fractal'],
  'bettercallzaal': ['fractal'],
}

type Generated = {
  updatedAt: string
  battlesRead: number
  handles: Record<string, { battles: number; last90: number; last365: number; lastBattle: string }>
}

const GEN = generated as Generated
const DAY = 864e5

export const ACTIVITY_UPDATED_AT = GEN.updatedAt

const cache = new Map<string, MemberActivity>()

export function activityFor(slug: string): MemberActivity {
  const hit = cache.get(slug)
  if (hit) return hit

  const handle = WAVEWARZ_HANDLES[slug]
  const g = handle ? GEN.handles[handle.toLowerCase()] : undefined
  const shows = SHOWS[slug] ?? []
  const origins = new Set<Origin>()
  if (g && g.battles > 0) origins.add('wavewarz')
  if (shows.some((s) => s.name.startsWith('ZAOstock'))) origins.add('festivals')
  if (shows.some((s) => s.name.startsWith('CoC'))) origins.add('coc')
  for (const o of EXTRA_ORIGINS[slug] ?? []) origins.add(o)
  if (origins.size === 0) origins.add('friends')

  const ref = Date.parse(GEN.updatedAt)
  const showsIn = (days: number) => shows.filter((s) => ref - Date.parse(s.date) < days * DAY).length

  const a: MemberActivity = {
    slug,
    origins: [...origins],
    battles: g?.battles ?? 0,
    battles90: g?.last90 ?? 0,
    battles365: g?.last365 ?? 0,
    lastBattle: g?.lastBattle || null,
    shows,
    score: (g?.last90 ?? 0) * 3 + (g?.last365 ?? 0) + showsIn(365) * 10 + showsIn(90) * 10,
  }
  cache.set(slug, a)
  return a
}

export function activityGroup(a: MemberActivity): ActivityGroup {
  const ref = Date.parse(GEN.updatedAt)
  const recentShow = (days: number) => a.shows.some((s) => ref - Date.parse(s.date) < days * DAY)
  if (a.battles90 > 0 || recentShow(90)) return 'now'
  if (a.battles365 > 0 || recentShow(365)) return 'year'
  return 'alumni'
}

function shortDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
}

// One short line for the card: the strongest fact we hold, or nothing.
export function activityLine(a: MemberActivity): string | null {
  if (a.battles > 0 && a.lastBattle) {
    const n = a.battles === 1 ? '1 WaveWarZ battle' : `${a.battles} WaveWarZ battles`
    return `${n}, last ${shortDate(a.lastBattle)}`
  }
  if (a.shows.length > 0) {
    const latest = [...a.shows].sort((x, y) => (x.date < y.date ? 1 : -1))[0]
    return `Played ${latest.name}`
  }
  return null
}
