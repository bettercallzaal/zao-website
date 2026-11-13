import { DOORS, type Door, type Pulses } from '@/lib/frontdoor'
import './brand-doors.css'

// The front door of thezao.com: every ZAO brand is a door straight to its own site. Each door
// shows the address it opens, and the brands that publish a live signal show it on the door,
// read when the page was built (refreshed every 10 minutes). Plain links, no script needed.

const GROUPS: Door['group'][] = ['Music', 'Gather', 'Build', 'Read']

export function BrandDoors({ pulses }: { pulses: Pulses }) {
  const live = DOORS.filter((d) => d.pulse && pulses[d.pulse]?.live).length

  return (
    <section className="doors" aria-labelledby="doors-title">
      <div className="doors-wrap">
        <div className="doors-head">
          <h2 id="doors-title" className="doors-title">
            Walk in. <span>Every ZAO brand, one door each.</span>
          </h2>
          <p className="doors-sub">
            {DOORS.length} doors{live > 0 ? `, ${live} with something on right now` : ''}. Each one opens its own
            site.
          </p>
        </div>

        <div className="doors-grid">
          {GROUPS.map((g) => (
            <div key={g} className="doors-col">
              <h2 className="doors-group">{g}</h2>
              <ul>
                {DOORS.filter((d) => d.group === g).map((d) => {
                  const p = d.pulse ? pulses[d.pulse] : undefined
                  return (
                    <li key={d.name}>
                      <a className="door" href={d.href} target="_blank" rel="noopener noreferrer">
                        <span className="door-name">{d.name}</span>
                        <span className="door-what">{d.what}</span>
                        {p && (
                          <span className={`door-pulse ${p.live ? 'is-live' : ''}`}>
                            <i aria-hidden="true" />
                            {p.text}
                          </span>
                        )}
                        <span className="door-domain">
                          {d.domain}
                          <b aria-hidden="true">&rarr;</b>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
