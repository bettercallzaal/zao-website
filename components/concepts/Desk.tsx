'use client'

import { useState } from 'react'
import './desk.css'

export type Channel = {
  label: string
  readout: string
  blurb: string
  href: string
  live?: boolean
}

// The console. Meters and fader positions are decoration (aria-hidden); every figure a visitor
// reads comes from the readout, which the server fills from real data. Selecting a strip, by
// hover, focus or tap, routes it to the display; the strip's own button opens the project.
export function Desk({ channels, monoClass }: { channels: Channel[]; monoClass: string }) {
  const [sel, setSel] = useState(0)
  const ch = channels[sel]
  const external = ch.href.startsWith('http')

  return (
    <div className="zao-desk rounded-2xl p-3 sm:p-5">
      {/* The display: the one place the console speaks. */}
      <div className={`${monoClass} zao-desk-lcd rounded-lg px-4 py-4 sm:px-6 sm:py-5`} aria-live="polite">
        <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em]">
          <span>
            CH {String(sel + 1).padStart(2, '0')} / {ch.label}
          </span>
          {ch.live && (
            <span className="flex items-center gap-2">
              <span className="zao-desk-rec inline-block h-2 w-2 rounded-full" aria-hidden="true" />
              Live
            </span>
          )}
        </div>
        <p key={sel} className="zao-desk-swap mt-3 text-3xl font-bold leading-tight sm:text-5xl">
          {ch.readout}
        </p>
        <p key={`b${sel}`} className="zao-desk-swap mt-2 max-w-2xl text-sm leading-relaxed opacity-80 sm:text-base">
          {ch.blurb}
        </p>
        <a
          href={ch.href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.2em] underline underline-offset-4"
        >
          Open {ch.label} &rarr;
        </a>
      </div>

      {/* The strips. On a phone they scroll sideways, one console wide. */}
      <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:mt-5 sm:gap-3">
        {channels.map((c, i) => {
          const on = i === sel
          return (
            <button
              key={c.label}
              type="button"
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => setSel(i)}
              aria-pressed={on}
              aria-label={`${c.label}: ${c.readout}`}
              className={`zao-desk-strip ${on ? 'is-on' : ''} flex w-[5.5rem] shrink-0 snap-start flex-col items-center gap-4 rounded-xl px-2 pb-3 pt-4 sm:w-auto sm:flex-1`}
            >
              <span className="zao-desk-knob" style={{ transform: `rotate(${-120 + ((i * 47) % 240)}deg)` }} aria-hidden="true" />
              <span className="flex h-44 items-end gap-3 sm:h-56" aria-hidden="true">
                <span className="zao-desk-meter">
                  <span className="zao-desk-meter-cover" style={{ animationDuration: `${0.9 + (i % 4) * 0.23}s`, animationDelay: `${-i * 0.37}s` }} />
                </span>
                <span className="zao-desk-track">
                  <span className="zao-desk-cap" style={{ bottom: `${30 + ((i * 29) % 55)}%` }} />
                </span>
              </span>
              <span className={`${monoClass} zao-desk-tape w-full truncate rounded px-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.12em]`}>
                {c.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
