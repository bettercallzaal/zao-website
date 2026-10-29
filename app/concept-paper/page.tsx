import type { Metadata } from 'next'
import Link from 'next/link'
import { Playfair_Display, Newsreader } from 'next/font/google'
import { PaperStrip } from '@/components/concepts/paper/Strip'
import { Countdown } from '@/components/concepts/paper/Countdown'
import {

  getEvents,
  getEditions,
  getBattles,
  getBattleTotal,
  type PaperEvent,
} from '@/components/concepts/paper/feed'
import '@/components/concepts/paper/paper.css'

// Concept D, THE PAPER: the home page is today's front page. No listing on it is typed by hand:
// the lead story, the calendar, the results table and the newsletter column are all pulled
// from public endpoints and reprinted every 15 minutes, so the page reads differently each
// day. A source that is down prints as "did not come in", never as a made-up figure.

export const revalidate = 900 // matches REVALIDATE in feed.ts; Next needs a literal here

// A sketch for Zaal to compare, so it stays out of search until one is picked.
export const metadata: Metadata = {
  title: 'Concept D: The Paper - The ZAO',
  robots: { index: false, follow: false },
}

const mast = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] })
const body = Newsreader({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'] })

const TZ = 'America/New_York'
const fmt = (iso: string | number, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: TZ, ...o }).format(new Date(iso))
const dayKey = (iso: string) => fmt(iso, { year: 'numeric', month: '2-digit', day: '2-digit' })

// The lead is the next thing a member can show up to. A fractal gets its own headline
// because it is the weekly heartbeat; anything else runs under its Luma title.
function lead(e: PaperEvent) {
  const when = `${fmt(e.start, { weekday: 'long' })} at ${fmt(e.start, { hour: 'numeric', minute: '2-digit' })} ET`
  const n = e.title.match(/FRACTAL\s*#\s*(\d+)/i)
  if (n) {
    const second = /session\s*2/i.test(e.title)
    return {
      kicker: 'Governance',
      head: `Fractal #${n[1]}${second ? ', second session,' : ''} meets ${when}`,
      deck:
        'Members sit in small rooms and rank each other’s work for the week. The ranking is paid out as Respect, a soulbound token on Optimism that measures contribution, not money, and Respect is what carries the vote.',
    }
  }
  return { kicker: 'Next up', head: e.title, deck: `${when}${e.location ? `, ${e.location}` : ''}.` }
}

function Missing({ what }: { what: string }) {
  return <p className="paper-missing">{what} did not come in for this edition.</p>
}

export default async function PaperConcept() {
  const printedAt = Date.now()
  const [events, editions, battles, total] = await Promise.all([
    getEvents(),
    getEditions(),
    getBattles(),
    getBattleTotal(),
  ])

  const next = events?.upcoming[0]
  const story = next ? lead(next) : null
  const latest = editions?.[0]
  const day = latest?.title.match(/Day\s+(\d+)/i)?.[1]
  const calendar = events?.upcoming.slice(1, 9) ?? []
  const byDay = calendar.reduce<Record<string, PaperEvent[]>>((acc, e) => {
    ;(acc[dayKey(e.start)] ||= []).push(e)
    return acc
  }, {})
  const recent = events?.recent.slice(0, 4) ?? []

  const sources = [
    { name: 'ZAO calendar', href: 'https://luma.com/zao', ok: events !== null },
    { name: 'The ZAO Newsletter (Paragraph RSS)', href: 'https://paragraph.com/@thezao', ok: editions !== null },
    { name: 'WaveWarZ public API', href: 'https://wavewarz.info/api-docs', ok: battles !== null },
  ]

  return (
    <main className={`paper ${body.className}`}>
      <PaperStrip />

      <header className="paper-wrap paper-mast">
        <div className="paper-mast-top">
          <span>{fmt(printedAt, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="hidden sm:inline">{day ? `Year of the ZABAL, day ${day}` : 'Daily edition'}</span>
          <span>
            Printed {fmt(printedAt, { hour: 'numeric', minute: '2-digit' })} ET, reprints every 15 min
          </span>
        </div>
        <h1 className={`${mast.className} paper-title`}>The ZAO</h1>
        <p className="paper-motto">
          A decentralized impact network for artists. Everything below came in from the network itself.
        </p>
        <nav className="paper-index" aria-label="In this edition">
          <a href="#front">Front page</a>
          <a href="#daily">The daily</a>
          <a href="#results">Results</a>
          <a href="#calendar">Calendar</a>
          <a href="#wire">Sources</a>
        </nav>
      </header>

      <div className="paper-wrap paper-grid">
        <article id="front" className="paper-lead">
          {story && next ? (
            <>
              <p className="paper-kicker">{story.kicker}</p>
              <h2 className={`${mast.className} paper-head`}>{story.head}</h2>
              <p className="paper-deck">{story.deck}</p>
              <p className="paper-byline">
                <Countdown start={next.start} printedAt={printedAt} />
                {next.location ? ` · ${next.location}` : ''}
              </p>
              <a className="paper-cta" href={next.url} target="_blank" rel="noopener noreferrer">
                Save a seat on Luma
              </a>
            </>
          ) : (
            <Missing what="The calendar" />
          )}

          {recent.length > 0 && (
            <div className="paper-brief">
              <h3 className="paper-label">Already happened</h3>
              <ul>
                {recent.map((e) => (
                  <li key={e.start + e.title}>
                    <span className="paper-when">{fmt(e.start, { month: 'short', day: 'numeric' })}</span>
                    {e.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <aside id="daily" className="paper-daily">
          <h3 className="paper-label">The daily</h3>
          {latest ? (
            <>
              <a href={latest.link} target="_blank" rel="noopener noreferrer" className="paper-ed">
                <span className={`${mast.className} paper-ed-title`}>{latest.title}</span>
                <span className="paper-when">{fmt(latest.date, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span className="paper-ed-excerpt">{latest.excerpt}</span>
                <span className="paper-more">Read the edition</span>
              </a>
              <ol className="paper-earlier">
                {editions!.slice(1, 6).map((e) => (
                  <li key={e.link}>
                    <a href={e.link} target="_blank" rel="noopener noreferrer">
                      <span className="paper-when">{fmt(e.date, { month: 'short', day: 'numeric' })}</span>
                      {e.title}
                    </a>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <Missing what="The newsletter" />
          )}
        </aside>
      </div>

      <section id="results" className="paper-wrap paper-section">
        <div className="paper-section-head">
          <h2 className={`${mast.className} paper-h2`}>Results</h2>
          <p>
            The latest WaveWarZ battles on Solana, winner in bold
            {total !== null ? `. ${total.toLocaleString('en-US')} battles to date.` : '.'}
          </p>
        </div>
        {battles && battles.length > 0 ? (
          <table className="paper-table">
            <thead>
              <tr>
                <th scope="col">Battle</th>
                <th scope="col" className="paper-num">Traded</th>
                <th scope="col" className="paper-num">Result</th>
              </tr>
            </thead>
            <tbody>
              {battles.map((b) => (
                <tr key={b.id}>
                  <td>
                    <a href={b.url} target="_blank" rel="noopener noreferrer">
                      <span className={b.winner === 'a' ? 'paper-won' : ''}>{b.a}</span>
                      <span className="paper-vs"> v </span>
                      <span className={b.winner === 'b' ? 'paper-won' : ''}>{b.b}</span>
                    </a>
                    <span className="paper-tag">{b.type === 'main' ? 'main event' : 'song v song'}</span>
                  </td>
                  <td className="paper-num">{b.volumeSol.toFixed(2)} SOL</td>
                  <td className="paper-num">
                    {b.winner ? 'settled' : b.decided ? 'pending' : 'open'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Missing what="WaveWarZ results" />
        )}
      </section>

      <section id="calendar" className="paper-wrap paper-section">
        <div className="paper-section-head">
          <h2 className={`${mast.className} paper-h2`}>Calendar</h2>
          <p>
            Straight from the{' '}
            <a href="https://luma.com/zao" target="_blank" rel="noopener noreferrer">
              ZAO calendar on Luma
            </a>
            .
          </p>
        </div>
        {events ? (
          calendar.length > 0 ? (
            <div className="paper-cal">
              {Object.entries(byDay).map(([k, list]) => (
                <div key={k} className="paper-cal-day">
                  <p className="paper-cal-date">
                    <span>{fmt(list[0].start, { weekday: 'short' })}</span>
                    <strong className={mast.className}>{fmt(list[0].start, { day: 'numeric' })}</strong>
                    <span>{fmt(list[0].start, { month: 'short' })}</span>
                  </p>
                  <ul>
                    {list.map((e) => (
                      <li key={e.start + e.title}>
                        <a href={e.url} target="_blank" rel="noopener noreferrer">
                          <span className="paper-when">{fmt(e.start, { hour: 'numeric', minute: '2-digit' })} ET</span>
                          {e.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="paper-missing">Nothing else is on the calendar yet.</p>
          )
        ) : (
          <Missing what="The calendar" />
        )}
      </section>

      <footer id="wire" className="paper-wrap paper-wire">
        <h3 className="paper-label">Sources for this edition</h3>
        <ul>
          {sources.map((s) => (
            <li key={s.name}>
              <span className={s.ok ? 'paper-ok' : 'paper-down'}>{s.ok ? 'in' : 'missing'}</span>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Every listing on this page came in from these sources; none is typed by hand. Want to be in tomorrow&apos;s edition?{' '}
          <Link href="/community">Join the community</Link> and come to a fractal.
        </p>
      </footer>
    </main>
  )
}
