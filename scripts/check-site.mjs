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

for (const n of notes) console.log(`  ${n}`)
console.log('')
if (failures.length === 0) {
  console.log('PASS - no silent regressions found')
  process.exit(0)
}
console.log(`FAIL - ${failures.length} problem${failures.length === 1 ? '' : 's'}\n`)
for (const f of failures) console.log(`  [${f.check}] ${f.detail}`)
process.exit(1)
