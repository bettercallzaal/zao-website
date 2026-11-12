#!/usr/bin/env node
// Refreshes lib/communityActivity.generated.json from the WaveWarZ public API.
// Read-only against wavewarz.info; writes one JSON file. Run before a release:
//   node scripts/community-activity.mjs
// Only members mapped in WAVEWARZ_HANDLES (lib/communityActivity.ts) are counted.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'lib/communityActivity.ts'), 'utf8')

// slug: 'handle' pairs from the WAVEWARZ_HANDLES block, without importing TS.
const start = src.indexOf('export const WAVEWARZ_HANDLES')
const block = src.slice(start, src.indexOf('\n}', start))
const handles = {}
for (const m of block.matchAll(/'([a-z0-9-]+)':\s*'([^']+)'/g)) handles[m[1]] = m[2].toLowerCase()
const wanted = new Set(Object.values(handles))

const PAGE = 200
const all = []
for (let offset = 0; offset < 10000; offset += PAGE) {
  const url = `https://wavewarz.info/api/public/battles?limit=${PAGE}&offset=${offset}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  const page = await res.json()
  if (!page.battles?.length) break
  all.push(...page.battles)
  if (page.battles.length < PAGE) break
}
const seen = new Set()
const battles = all.filter((b) => !seen.has(b.battleId) && seen.add(b.battleId))

const now = Date.now()
const d90 = now - 90 * 864e5
const d365 = now - 365 * 864e5
const stats = {}
for (const b of battles) {
  const t = Date.parse(b.createdAt)
  for (const a of [b.artist1, b.artist2]) {
    const m = (a.musicLink || '').match(/audius\.co\/([^/?#]+)/i)
    if (!m) continue
    const h = m[1].toLowerCase()
    if (!wanted.has(h)) continue
    const s = (stats[h] ??= { battles: 0, last90: 0, last365: 0, lastBattle: '' })
    s.battles++
    if (t > d90) s.last90++
    if (t > d365) s.last365++
    const day = b.createdAt.slice(0, 10)
    if (day > s.lastBattle) s.lastBattle = day
  }
}

const out = { updatedAt: new Date().toISOString().slice(0, 10), battlesRead: battles.length, handles: stats }
writeFileSync(join(root, 'lib/communityActivity.generated.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`read ${battles.length} battles, ${Object.keys(stats).length} of ${wanted.size} mapped handles found`)
for (const [h, s] of Object.entries(stats)) console.log(`  ${h}: ${s.battles} battles, ${s.last90} in 90 days, last ${s.lastBattle}`)
