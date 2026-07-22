'use client'

import { useEffect } from 'react'

// Progressive enhancement: adds the reveal class via JS, so no-JS visitors
// always see everything. Skips the first section so the above-fold hero
// never hides. Respects prefers-reduced-motion (handled in CSS).
export function Reveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = Array.from(document.querySelectorAll('main section')).slice(1)
    sections.forEach((el) => el.classList.add('zao-reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('zao-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
