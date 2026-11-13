// The ground truth behind concept F, The Map: every ZAO project that has an ICM box
// (lib/icm.ts, groups core, product and people), placed by region, and joined wherever one
// box's own text names another.
//
// HOW THE EDGES WERE MEASURED, 2026-10-28 ~21:45 EDT. Each box's master copy was fetched from
// context.thezao.com/<slug> (served from the zao-icm repo's boxes/, the master since
// 2026-10-11; the useicm.com copy is frozen) and searched for the other boxes' names: "WaveWarZ", "ZABAL Gam", "ZAOstock", "COC Concertz", "POIDH", "Fractal"
// or "Respect", "Newsletter", "ZAO Assistant" or "ZOE", "Zuke" or "ZAO Spaces", and so on, case
// sensitive except channelz and zlank. A pair is joined if either box names the other. 53 pairs
// came back. They are copied here so the map does not depend on a fetch at build time; re-run
// the same search when a box changes.
//
// Positions are hand placed in a 1600 x 1000 world, by region, so the map reads the same on
// every visit. The blurbs are condensed from each box's opening paragraph.

import { boxLlmUrl, ICM_BOXES } from '@/lib/icm'

export type Region = 'core' | 'governance' | 'music' | 'builders' | 'tools' | 'media'

export const REGIONS: Record<Region, { label: string; x: number; y: number }> = {
  // The core has no label on the map; the two hubs speak for themselves.
  core: { label: 'The network', x: 800, y: 415 },
  governance: { label: 'Governance', x: 330, y: 190 },
  music: { label: 'Music and live', x: 1420, y: 330 },
  builders: { label: 'Builders', x: 290, y: 640 },
  tools: { label: 'Tools', x: 830, y: 50 },
  media: { label: 'Media', x: 1080, y: 930 },
}

type NodeDef = {
  slug: string
  x: number
  y: number
  region: Region
  blurb: string
  href?: string
  hub?: boolean
}

const DEFS: NodeDef[] = [
  { slug: 'thezao', x: 800, y: 500, region: 'core', hub: true, href: '/about',
    blurb: 'A decentralized impact network bringing profit margin, data and IP rights back to artists, using blockchain and AI.' },
  { slug: 'bettercallzaal', x: 800, y: 690, region: 'core', hub: true, href: 'https://bettercallzaal.com',
    blurb: 'Zaal Panthaki, founder of The ZAO: the build-in-public practice, consulting and web3 music work under one name.' },
  { slug: 'fractal', x: 400, y: 260, region: 'governance', href: '/papers',
    blurb: 'The ZAO’s governance. Members rank each other’s work weekly and earn Respect, a soulbound token on Optimism that carries the vote.' },
  { slug: 'wavewarz', x: 1180, y: 380, region: 'music', href: 'https://wavewarz.com',
    blurb: 'Live-traded music battles: two artists face off, fans trade on the outcome, artists earn on every trade.' },
  { slug: 'coc-concertz', x: 1420, y: 470, region: 'music', href: 'https://cocconcertz.com',
    blurb: 'A concert series run as a 50/50 joint venture between The ZAO and the COC, led by Thy Revolution.' },
  { slug: 'zao-festivals', x: 1240, y: 620, region: 'music',
    blurb: 'The in-person arm of The ZAO: real events where the community and its artists show up.' },
  { slug: 'zaostock', x: 1440, y: 720, region: 'music', href: 'https://zaostock.com',
    blurb: 'The flagship festival: a free, community-built outdoor showcase for independent artists in Ellsworth, Maine.' },
  { slug: 'sparkz', x: 1300, y: 170, region: 'music',
    blurb: 'A creator-coin launcher with a built-in advisor, from The ZAO.' },
  { slug: 'zabalgamez', x: 420, y: 560, region: 'builders', href: 'https://zabalgamez.com',
    blurb: 'A free 3-month build-a-thon: ship something real in public with a ZAO mentor, and earn Respect.' },
  { slug: 'poidh', x: 560, y: 790, region: 'builders', href: 'https://poidh.xyz',
    blurb: 'Bounties, “pics or it didn’t happen”: The ZAO runs POIDH bounties as part of ZABAL Gamez and community work.' },
  { slug: 'zaolingo', x: 190, y: 770, region: 'builders',
    blurb: 'A bite-sized, phone-first app that teaches people to build with Claude Code the ZAO way.' },
  { slug: 'zlank', x: 170, y: 470, region: 'builders', href: 'https://zlank.vercel.app',
    blurb: 'A no-code Farcaster Snap builder: stack blocks, deploy, share to your feed.' },
  { slug: 'channelz', x: 560, y: 120, region: 'tools', href: 'https://channelz-lilac.vercel.app',
    blurb: 'A lightweight Farcaster client that puts channel control back in your hands.' },
  { slug: 'zao-assistant', x: 830, y: 200, region: 'tools',
    blurb: 'The operator layer: Claude Code sessions plus ZOE, the always-on bot, turning intent into shipped work.' },
  { slug: 'zaoscout', x: 1060, y: 120, region: 'tools',
    blurb: 'No-login scrapers pulled out of ZAO OS that read public data without accounts or keys.' },
  { slug: 'zao-video-editor', x: 640, y: 330, region: 'tools', href: 'https://zao-video-editor.vercel.app',
    blurb: 'A browser-based video editor for fast turnaround on clips.' },
  { slug: 'zao-newsletter', x: 1000, y: 830, region: 'media', href: 'https://paragraph.com/@thezao',
    blurb: 'The daily build log of The ZAO, on Paragraph.' },
  { slug: 'zuke', x: 820, y: 900, region: 'media', href: 'https://zuke.thezao.com',
    blurb: 'Live audio rooms for the community, integrated with Juke.' },
]

const PAIRS: [string, string][] = [
  ['bettercallzaal', 'channelz'], ['bettercallzaal', 'coc-concertz'], ['bettercallzaal', 'fractal'],
  ['bettercallzaal', 'poidh'], ['bettercallzaal', 'sparkz'], ['bettercallzaal', 'thezao'],
  ['bettercallzaal', 'wavewarz'], ['bettercallzaal', 'zabalgamez'], ['bettercallzaal', 'zao-assistant'],
  ['bettercallzaal', 'zao-festivals'], ['bettercallzaal', 'zao-newsletter'], ['bettercallzaal', 'zao-video-editor'],
  ['bettercallzaal', 'zaolingo'], ['bettercallzaal', 'zaoscout'], ['bettercallzaal', 'zaostock'],
  ['bettercallzaal', 'zlank'], ['bettercallzaal', 'zuke'], ['channelz', 'thezao'], ['coc-concertz', 'sparkz'],
  ['coc-concertz', 'thezao'],
  ['coc-concertz', 'zao-festivals'], ['coc-concertz', 'zaostock'], ['fractal', 'thezao'], ['fractal', 'zabalgamez'],
  ['poidh', 'thezao'], ['poidh', 'wavewarz'], ['poidh', 'zabalgamez'], ['poidh', 'zao-assistant'], ['poidh', 'zuke'],
  ['sparkz', 'thezao'], ['sparkz', 'zaostock'], ['thezao', 'wavewarz'], ['thezao', 'zabalgamez'], ['thezao', 'zao-assistant'],
  ['thezao', 'zao-festivals'], ['thezao', 'zao-newsletter'], ['thezao', 'zao-video-editor'], ['thezao', 'zaolingo'],
  ['thezao', 'zaoscout'], ['thezao', 'zaostock'], ['thezao', 'zlank'], ['thezao', 'zuke'], ['wavewarz', 'zabalgamez'],
  ['wavewarz', 'zao-assistant'], ['wavewarz', 'zao-festivals'], ['wavewarz', 'zaoscout'], ['wavewarz', 'zaostock'],
  ['zabalgamez', 'zao-assistant'], ['zabalgamez', 'zao-festivals'], ['zabalgamez', 'zaolingo'],
  ['zabalgamez', 'zaostock'], ['zabalgamez', 'zlank'], ['zao-festivals', 'zaostock'],
]

export type MapNode = NodeDef & { name: string; box: string }
export type MapEdge = { a: string; b: string; hub: boolean }

const BOX = new Map(ICM_BOXES.map((b) => [b.slug, b]))

// Names come from lib/icm.ts so the map and the site's AI page never disagree. ZABAL Gamez
// is spelled with a z, per the glossary.
export const NODES: MapNode[] = DEFS.map((d) => {
  const box = BOX.get(d.slug)
  if (!box) throw new Error(`map: no ICM box for ${d.slug}`)
  return { ...d, name: box.name, box: boxLlmUrl(box.id) }
})

const HUBS = new Set(DEFS.filter((d) => d.hub).map((d) => d.slug))
export const EDGES: MapEdge[] = PAIRS.map(([a, b]) => ({ a, b, hub: HUBS.has(a) || HUBS.has(b) }))
