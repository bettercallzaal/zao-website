// Regression test for the homepage's live WaveWarZ stat block.
//
// WHAT IT PROTECTS. The homepage renders four on-chain figures. A DOWN api was
// always handled - the fetch throws and the section hides. An api answering
// 200 with a CHANGED SHAPE was not: every field fell through `?? 0` and the page
// rendered "0 Music battles, 0 SOL, 0 Artists competing, 0 Songs battled" as
// though those were measurements. On the front door.
//
// The distinction this locks down is the subtle one: the guard must reject
// ABSENCE while still rendering a GENUINE ZERO. Both cases are asserted below.
//
// RUN IT:
//     node --experimental-strip-types scripts/check-stats-guard.mts
//
// Not wired into CI on purpose: it needs `--experimental-strip-types` to import
// a .ts module directly, and whether the CI runner's Node 22 has that flag is
// UNMEASURED from here. Adding a step that might fail for an unrelated reason is
// worse than a script someone can run. Wire it in once that is checked.

import { statsFrom } from '../lib/wavewarz.ts'

const good = {
  stats: { battles: { total: 1508 }, volume: { totalSol: 923.1038 } },
  artists: { count: 52 },
  songs: { count: 941 },
}

let pass = 0
let fail = 0
const t = (name: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (ok) pass++
  else fail++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}`)
  if (!ok) console.log(`        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`)
}

t('healthy payload -> real numbers', statsFrom(good.stats, good.artists, good.songs), {
  battles: 1508,
  volumeSol: 923,
  artists: 52,
  songs: 941,
})
t(
  'THE BUG: renamed key -> null, not zeros',
  statsFrom({ battleCount: { total: 1508 }, volume: { totalSol: 923 } }, good.artists, good.songs),
  null,
)
t('restructured payload -> null', statsFrom({ battles: 1508 }, good.artists, good.songs), null)
t('missing artists.count -> null', statsFrom(good.stats, {}, good.songs), null)
t('missing songs.count -> null', statsFrom(good.stats, good.artists, {}), null)
t('null payload -> null', statsFrom(null, good.artists, good.songs), null)
t(
  'string instead of number -> null',
  statsFrom({ battles: { total: '1508' }, volume: { totalSol: 923 } }, good.artists, good.songs),
  null,
)
t('NaN -> null', statsFrom({ battles: { total: NaN }, volume: { totalSol: 923 } }, good.artists, good.songs), null)
t(
  'GENUINE zero still renders - the guard rejects absence, not 0',
  statsFrom({ battles: { total: 0 }, volume: { totalSol: 0 } }, { count: 0 }, { count: 0 }),
  { battles: 0, volumeSol: 0, artists: 0, songs: 0 },
)

console.log(`\n  ${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
