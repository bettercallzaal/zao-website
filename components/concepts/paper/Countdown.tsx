'use client'

import { useEffect, useState } from 'react'

// Live "starts in" line for the lead story. Server renders the time at print; the client
// keeps it current, so a page left open still tells the truth.
function until(target: number, now: number) {
  const ms = target - now
  if (ms <= 0) return 'happening now'
  const m = Math.floor(ms / 60000)
  const d = Math.floor(m / 1440)
  const h = Math.floor((m % 1440) / 60)
  const mm = m % 60
  if (d > 0) return `starts in ${d} day${d === 1 ? '' : 's'}, ${h} hour${h === 1 ? '' : 's'}`
  if (h > 0) return `starts in ${h} hour${h === 1 ? '' : 's'}, ${mm} min`
  return `starts in ${mm} min`
}

export function Countdown({ start, printedAt }: { start: string; printedAt: number }) {
  const target = Date.parse(start)
  const [now, setNow] = useState(printedAt)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])
  return <span suppressHydrationWarning>{until(target, now)}</span>
}
