'use client'

import { useEffect, useRef } from 'react'

// Counts a number up from zero the first time it scrolls into view. The server renders the
// final value, so no-JS visitors, crawlers and reduced-motion users always see the real figure.
// The count is written straight to the DOM: it is animation, not React state.
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fmt = (n: number) => n.toLocaleString('en-US')
    el.textContent = fmt(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1100
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur)
          el.textContent = fmt(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = fmt(value)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('en-US')}
    </span>
  )
}
