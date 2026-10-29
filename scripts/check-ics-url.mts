// Regression test for the event link the ICS parser pulls out of a Luma DESCRIPTION.
//
// WHAT IT PROTECTS. Luma puts the event link first in DESCRIPTION and escapes newlines as
// the two characters "\n". The old pattern stopped only at whitespace, so on 2026-10-28
// www.thezao.com/api/public/events served urls like
// "https://luma.com/yk6gei6f\n\nAddress:\nDiscord.thezao.com\n\nHosted".
//
// RUN IT:
//     node --experimental-strip-types scripts/check-ics-url.mts
//
// Not wired into CI, for the same reason as check-stats-guard.mts.

import { parseIcs } from '../lib/api/ics-parser.ts'

// Shape copied from the live Luma feed (cal-jPH4al7AMlXzdNN), 2026-10-28, including the
// folded continuation line.
const ics = [
  'BEGIN:VCALENDAR',
  'BEGIN:VEVENT',
  'DTSTART:20261103T170000Z',
  'DTEND:20261103T181500Z',
  'SUMMARY:ZAO FRACTAL #122 Session 2',
  'DESCRIPTION:Get up-to-date information at: https://luma.com/76eims17\\n\\nAd',
  ' dress:\\nDiscord.thezao.com\\n\\nHosted by BetterCallZaal',
  'LOCATION:Discord.thezao.com',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'DTSTART:20261103T170000Z',
  'DTEND:20261103T181500Z',
  'SUMMARY:Has a URL property',
  'URL:https://luma.com/abc',
  'DESCRIPTION:see https://luma.com/other',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

const [a, b] = parseIcs(ics)
let fail = 0
const t = (name: string, got: unknown, want: unknown) => {
  const ok = got === want
  if (!ok) fail++
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${JSON.stringify(got)}${ok ? '' : ` (want ${JSON.stringify(want)})`}`)
}
t('link stops at the escaped newline', a?.url, 'https://luma.com/76eims17')
t('URL property still wins', b?.url, 'https://luma.com/abc')
if (fail) process.exit(1)
