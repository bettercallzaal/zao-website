#!/usr/bin/env node
/**
 * check-site.mjs - guards against three failures that already happened on this
 * site and are all SILENT: the build stays green and the pages return 200 while
 * the defect ships.
 *
 *   1. A page defines its own `openGraph` without `images`, which overrides the
 *      root layout and drops the share image. 14 pages shipped this way,
 *      including /links, the page built for the reveal. Invisible until someone
 *      shares a link.
 *
 *   2. A live, indexable page is missing from the sitemap. /ai was linked from
 *      the nav on every page and absent from sitemap.xml.
 *
 *   3. A URL the Webflow site answers stops resolving here. The migration's whole
 *      job. 25 of the 81 were missing and no crawl could find them, because
 *      nothing on the site links to them.
 *
 *   4. The site's OWN public API breaks or freezes. /api-docs advertises four
 *      endpoints, and until 2026-09-09 nothing in this lane had ever fetched
 *      them. A JSON route can 500, or keep answering 200 with a frozen
 *      `updatedAt`, without a single page looking wrong.
 *
 * Usage:  node scripts/check-site.mjs [baseUrl]      (default http://localhost:3000)
 *         npm run check:site
 *
 * Exits non-zero on any failure so CI or a pre-merge run catches it.
 *
 * NOTE ON #3: the URL list is RECORDED in scripts/webflow-live-urls.json, not
 * re-derived by crawling. That is deliberate and it is the whole lesson - the
 * original 56-page list was built by crawling the site's own links and was wrong
 * for weeks, because a page nothing links to is invisible to a crawler. A
 * completeness check is only as good as the list it measures against.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

const failures = []
const notes = []
function fail(check, detail) {
  failures.push({ check, detail })
}

/** Fetch without following redirects, so a 3xx is visible rather than hidden. */
async function head(path) {
  try {
    const res = await fetch(BASE + path, { redirect: 'manual' })
    return { status: res.status, location: res.headers.get('location') || '' }
  } catch (err) {
    return { status: 0, location: '', error: String(err) }
  }
}

async function body(path) {
  try {
    const res = await fetch(BASE + path)
    return { status: res.status, html: await res.text() }
  } catch (err) {
    return { status: 0, html: '', error: String(err) }
  }
}

// ---------------------------------------------------------------- check 1
// Every page in the sitemap must carry an og:image.
async function checkOgImages(routes) {
  let checked = 0
  for (const path of routes) {
    const { status, html } = await body(path)
    if (status !== 200) {
      fail('og:image', `${path} returned ${status}, cannot check its share image`)
      continue
    }
    checked++
    const hasOg =
      /<meta[^>]+property="og:image"[^>]+content="[^"]+"/.test(html) ||
      /<meta[^>]+content="[^"]+"[^>]+property="og:image"/.test(html)
    if (!hasOg) {
      fail(
        'og:image',
        `${path} has NO og:image. A page that defines its own openGraph block ` +
          `without an "images" key overrides the root layout and silently loses ` +
          `the share image.`,
      )
    }
  }
  notes.push(`og:image checked on ${checked} pages`)
}

// ---------------------------------------------------------------- check 2
// Every internal page linked from the site must appear in the sitemap.
async function checkSitemapCoverage(routes) {
  const seen = new Set()
  for (const path of ['/', '/about', '/community', '/links']) {
    const { status, html } = await body(path)
    if (status !== 200) continue
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) seen.add(m[1] || '/')
  }
  const isAsset = (p) => /\.(png|jpe?g|svg|ico|webp|css|js|txt|xml)$/i.test(p) || p.startsWith('/_next/')
  const missing = [...seen].filter((p) => !isAsset(p) && !routes.includes(p)).sort()
  for (const p of missing) {
    const { status } = await head(p)
    // A linked page that resolves but is not in the sitemap is the defect.
    // A linked path that redirects is fine - it is not a page.
    if (status === 200) {
      fail('sitemap', `${p} is linked from the site, returns 200, and is NOT in sitemap.xml`)
    }
  }
  notes.push(`sitemap coverage checked against ${seen.size} linked paths`)
}

// ---------------------------------------------------------------- check 3
// Every URL the Webflow site answers must resolve or redirect here.
//
// WHAT THIS PROVES, AND THE LINE IT DOES NOT CROSS. It proves NO DEAD URL: after
// the cutover, nothing that Webflow answers today starts 404ing. It does NOT
// prove the content survived, because a redirect to any 200 counts as a pass -
// including a redirect to a page that carries none of the original content.
//
// That gap is real on this site, not hypothetical. The 17 `/drops/*` pages each
// carried an editorial writeup of a release (14 of them past 120 words). They
// redirect to `/community/jango-uu`, which is the right target - they are all
// Jango UU releases, and the OLD Webflow profile linked to `/drops/` zero times,
// so nothing regressed - but that page contains none of the 14 release titles,
// and the replacement has no release surface at all. This check passes them, and
// should: the URLs are alive. Someone arriving from a shared `/drops/sunrider`
// link still lands on a page that never says SUNRIDER.
//
// So do not read a green parity line as "the migration lost nothing". The only
// full copy of those writeups is the archive at `~/Desktop/repos/thezao-com`.
// Measuring content equivalence would need a different check than this one.
async function checkWebflowParity() {
  const file = join(HERE, 'webflow-live-urls.json')
  const { urls, count } = JSON.parse(readFileSync(file, 'utf8'))
  if (urls.length !== count) {
    fail('webflow-parity', `webflow-live-urls.json says count ${count} but lists ${urls.length}`)
  }
  let ok = 0
  for (const path of urls) {
    const { status, location } = await head(path)
    if (status === 200) {
      ok++
      continue
    }
    if (status >= 300 && status < 400) {
      const target = location.startsWith('http') ? location.replace(BASE, '') : location
      const { status: final } = await body(target)
      if (final === 200) {
        ok++
        continue
      }
      fail('webflow-parity', `${path} redirects to ${target}, which returns ${final}`)
      continue
    }
    fail(
      'webflow-parity',
      `${path} returns ${status}. This URL is LIVE on the Webflow site - it breaks at cutover.`,
    )
  }
  notes.push(
    `webflow parity: ${ok}/${urls.length} resolve or redirect to a 200 ` +
      `(no dead URL - NOT a claim that content was preserved; see the comment above)`,
  )
}

// ---------------------------------------------------------------- check 4
// The site's own public API must answer, be valid JSON, and not be frozen.
//
// WHAT IT ASSERTS AND WHY EACH PART EARNS ITS PLACE. 200 alone is nearly
// worthless here - a route that answers 200 with stale or malformed JSON looks
// identical to a healthy one from the outside, which is the same failure the
// other three checks exist for. So: the route answers 200, the body parses as
// JSON, it carries an `updatedAt`, and that timestamp is neither in the future
// nor older than MAX_AGE_H.
//
// WHY 24 HOURS AND NOT SOMETHING TIGHTER. The data revalidates hourly, so a
// healthy feed is minutes old - it was 1.5 minutes when this was written. But
// this guard also runs from a cron that GitHub delays by hours, so a tight
// threshold would fire on the scheduler rather than on the site. 24h is loose
// enough never to flap and still catches the thing that matters: a feed that has
// genuinely stopped updating.
//
// WHAT IS DELIBERATELY *NOT* CHECKED: agreement with upstream wavewarz.info.
// Comparing our proxy against theirs is a genuinely better check - a proxy can be
// fresh and wrong, and that comparison was run by hand on 2026-09-09 (both said
// volume.totalSol = 923.1038). But wiring it in here would make OUR alarm fire
// during THEIR outage, and an alarm that cries about someone else's site is one
// people learn to ignore. Worth running by hand when the numbers look off.
const API_ROUTES = ['/api/public', '/api/public/events', '/api/public/stats', '/api/public/wavewarz']
const MAX_AGE_H = 24

async function checkPublicApi() {
  let ok = 0
  for (const path of API_ROUTES) {
    const { status, html } = await body(path)
    if (status !== 200) {
      fail('public-api', `${path} returned ${status}. It is advertised on /api-docs.`)
      continue
    }
    let data
    try {
      data = JSON.parse(html)
    } catch {
      fail('public-api', `${path} returned 200 but the body is not valid JSON.`)
      continue
    }
    const updatedAt = data && typeof data === 'object' ? data.updatedAt : undefined
    if (!updatedAt) {
      fail('public-api', `${path} has no updatedAt, so staleness cannot be detected.`)
      continue
    }
    const t = Date.parse(updatedAt)
    if (Number.isNaN(t)) {
      fail('public-api', `${path} has an unparseable updatedAt: ${updatedAt}`)
      continue
    }
    const ageH = (Date.now() - t) / 3_600_000
    if (ageH > MAX_AGE_H) {
      fail('public-api', `${path} is FROZEN - updatedAt ${updatedAt} is ${ageH.toFixed(1)}h old (max ${MAX_AGE_H}h). It still answers 200.`)
      continue
    }
    if (ageH < -0.25) {
      fail('public-api', `${path} has updatedAt in the future: ${updatedAt}`)
      continue
    }
    ok++
  }
  notes.push(`public api: ${ok}/${API_ROUTES.length} answer 200 with fresh, parseable JSON`)
}

// ---------------------------------------------------------------- run
const { status: smStatus, html: smXml } = await body('/sitemap.xml')
if (smStatus !== 200) {
  console.error(`FATAL: sitemap.xml returned ${smStatus} at ${BASE}. Is the site running?`)
  process.exit(2)
}
const routes = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''))
  .map((p) => p || '/')

console.log(`checking ${BASE} - ${routes.length} sitemap routes\n`)
await checkOgImages(routes)
await checkSitemapCoverage(routes)
await checkWebflowParity()
await checkPublicApi()

for (const n of notes) console.log(`  ${n}`)
console.log('')
if (failures.length === 0) {
  console.log('PASS - no silent regressions found')
  process.exit(0)
}
console.log(`FAIL - ${failures.length} problem${failures.length === 1 ? '' : 's'}\n`)
for (const f of failures) console.log(`  [${f.check}] ${f.detail}`)
process.exit(1)
