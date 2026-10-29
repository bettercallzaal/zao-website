'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NODES, EDGES, REGIONS, type MapNode, type Region } from './graph'

// The navigable map for concept F. One world (1600 x 1000) that the visitor drags, scrolls or
// pinches; distances scale, dots and labels stay a readable screen size, like a real map.
// Tapping a project lights its connections and opens its card. Nothing moves on its own.

const W = 1600
const H = 1000
const MIN_K = 0.2
const MAX_K = 2.5

type View = { x: number; y: number; k: number }

const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k))

export function EcoMap() {
  const box = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>({ x: 0, y: 0, k: 0.5 })
  const [flying, setFlying] = useState(false)
  const [sel, setSel] = useState<string | null>(null)
  const [hover, setHover] = useState<string | null>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const drag = useRef<{ moved: number; pinch: number | null }>({ moved: 0, pinch: null })

  const byId = useMemo(() => new Map(NODES.map((n) => [n.slug, n])), [])
  const neighbours = useMemo(() => {
    const m = new Map<string, Set<string>>()
    for (const e of EDGES) {
      if (!m.has(e.a)) m.set(e.a, new Set())
      if (!m.has(e.b)) m.set(e.b, new Set())
      m.get(e.a)!.add(e.b)
      m.get(e.b)!.add(e.a)
    }
    return m
  }, [])

  const size = () => {
    const r = box.current?.getBoundingClientRect()
    return { w: r?.width ?? 1200, h: r?.height ?? 700 }
  }

  // Whole map on a wide screen; on a phone, a readable zoom centred on The ZAO.
  const fit = useCallback((animate = true) => {
    const { w, h } = size()
    const k = clampK(Math.max(Math.min(w / (W + 120), h / (H + 80)), w < 640 ? 0.42 : 0))
    const cx = w < 640 ? 800 : W / 2
    const cy = w < 640 ? 500 : H / 2
    setFlying(animate)
    setView({ k, x: w / 2 - cx * k, y: h / 2 - cy * k })
  }, [])

  useEffect(() => {
    fit(false)
    // Refit only when the width changes: a phone's address bar showing or hiding changes the
    // height on every scroll, and that must not throw away where the visitor has panned to.
    let lastW = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === lastW) return
      lastW = window.innerWidth
      fit(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [fit])

  const flyTo = useCallback((x: number, y: number, k?: number) => {
    const { w, h } = size()
    setFlying(true)
    setView((v) => {
      const kk = clampK(k ?? Math.max(v.k, 0.8))
      return { k: kk, x: w / 2 - x * kk, y: h / 2 - y * kk }
    })
  }, [])

  const select = useCallback(
    (slug: string | null, fly = true) => {
      setSel(slug)
      if (slug && fly) {
        const n = byId.get(slug)!
        flyTo(n.x, n.y)
      }
    },
    [byId, flyTo],
  )

  const zoomAt = useCallback((factor: number, sx: number, sy: number, animate = false) => {
    setFlying(animate)
    setView((v) => {
      const k = clampK(v.k * factor)
      const f = k / v.k
      return { k, x: sx - (sx - v.x) * f, y: sy - (sy - v.y) * f }
    })
  }, [])

  // Wheel zoom needs a non-passive listener so the page does not scroll under the map.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt])

  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    drag.current.moved = 0
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      drag.current.pinch = Math.hypot(a.x - b.x, a.y - b.y)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const dx = e.clientX - prev.x
    const dy = e.clientY - prev.y
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    drag.current.moved += Math.abs(dx) + Math.abs(dy)
    // Capture only once it is really a drag, so a plain tap still reaches the project.
    if (drag.current.moved > 6 && !(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
    setFlying(false)
    if (pointers.current.size === 2 && drag.current.pinch) {
      const [a, b] = [...pointers.current.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const r = box.current!.getBoundingClientRect()
      zoomAt(d / drag.current.pinch, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top)
      drag.current.pinch = d
      return
    }
    if (pointers.current.size === 1) setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) drag.current.pinch = null
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 60
    const pan: Record<string, [number, number]> = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    }
    if (e.key in pan && e.target === e.currentTarget) {
      e.preventDefault()
      const [dx, dy] = pan[e.key]
      setFlying(true)
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }))
    } else if (e.key === '+' || e.key === '=') {
      const { w, h } = size()
      zoomAt(1.25, w / 2, h / 2, true)
    } else if (e.key === '-') {
      const { w, h } = size()
      zoomAt(0.8, w / 2, h / 2, true)
    } else if (e.key === 'Escape') {
      select(null)
    }
  }

  const focus = hover ?? sel
  const lit = focus ? neighbours.get(focus) ?? new Set<string>() : null
  const node = sel ? byId.get(sel)! : null
  const { k } = view

  return (
    <div className="mp-shell">
      <div
        ref={box}
        className="mp-canvas"
        tabIndex={0}
        role="application"
        aria-label="Map of ZAO projects. Arrow keys move the map, plus and minus zoom, Tab moves between projects."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          if (e.target === e.currentTarget && drag.current.moved < 6) select(null, false)
        }}
      >
        <div
          className={`mp-world ${flying ? 'is-flying' : ''}`}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${k})` }}
        >
          {(Object.entries(REGIONS) as [Region, (typeof REGIONS)[Region]][]).filter(([key]) => key !== 'core').map(([key, r]) => (
            <span
              key={key}
              className="mp-region"
              aria-hidden="true"
              style={{ left: r.x, top: r.y, fontSize: Math.min(15 / k, 40) }}
            >
              {r.label}
            </span>
          ))}

          <svg className="mp-edges" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {EDGES.map((e) => {
              const a = byId.get(e.a)!
              const b = byId.get(e.b)!
              const on = focus ? e.a === focus || e.b === focus : false
              // A gentle bow keeps parallel spokes from the hubs apart.
              const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.08
              const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08
              return (
                <path
                  key={e.a + e.b}
                  d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`}
                  className={`mp-edge ${e.hub ? 'is-hub' : ''} ${on ? 'is-on' : ''} ${focus && !on ? 'is-off' : ''}`}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>

          {NODES.map((n) => {
            const isFocus = focus === n.slug
            const isLit = lit?.has(n.slug)
            const dim = focus && !isFocus && !isLit
            const dot = (n.hub ? 22 : 14) / k
            return (
              <button
                key={n.slug}
                type="button"
                className={`mp-node mp-${n.region} ${isFocus ? 'is-focus' : ''} ${isLit ? 'is-lit' : ''} ${dim ? 'is-dim' : ''} ${sel === n.slug ? 'is-sel' : ''}`}
                style={{ left: n.x, top: n.y }}
                onClick={() => drag.current.moved < 6 && select(sel === n.slug ? null : n.slug)}
                onMouseEnter={() => setHover(n.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n.slug)}
                onBlur={() => setHover(null)}
                aria-pressed={sel === n.slug}
              >
                <span className="mp-dot" style={{ width: dot, height: dot }} />
                <span className="mp-label" style={{ fontSize: Math.min((n.hub ? 15 : 13) / k, 30) }}>
                  {n.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mp-zoom">
          <button type="button" aria-label="Zoom in" onClick={() => { const { w, h } = size(); zoomAt(1.3, w / 2, h / 2, true) }}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => { const { w, h } = size(); zoomAt(1 / 1.3, w / 2, h / 2, true) }}>&minus;</button>
          <button type="button" className="mp-fit" onClick={() => { select(null, false); fit() }}>Whole map</button>
        </div>
      </div>

      <aside className={`mp-card ${node ? 'is-open' : ''}`} aria-live="polite">
        {node ? <Card node={node} links={[...(neighbours.get(node.slug) ?? [])].map((s) => byId.get(s)!)} onPick={(s) => select(s)} onClose={() => select(null, false)} /> : <Intro onRegion={(r) => flyTo(REGIONS[r].x, REGIONS[r].y + 120, 0.9)} />}
      </aside>
    </div>
  )
}

function Intro({ onRegion }: { onRegion: (r: Region) => void }) {
  return (
    <div className="mp-intro">
      <p className="mp-kicker">{NODES.length} projects, {EDGES.length} connections</p>
      <p className="mp-lede">
        Every project in The ZAO, joined wherever one project&apos;s own description names another. Drag to move, scroll
        or pinch to zoom, tap a project to open it.
      </p>
      <div className="mp-regions">
        {(Object.keys(REGIONS) as Region[]).map((r) => (
          <button key={r} type="button" className={`mp-chip mp-${r}`} onClick={() => onRegion(r)}>
            <span className="mp-swatch" />
            {REGIONS[r].label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Card({
  node,
  links,
  onPick,
  onClose,
}: {
  node: MapNode
  links: MapNode[]
  onPick: (slug: string) => void
  onClose: () => void
}) {
  const external = node.href?.startsWith('http')
  return (
    <div className="mp-detail">
      <div className="mp-detail-top">
        <p className={`mp-kicker mp-${node.region}`}>
          <span className="mp-swatch" />
          {REGIONS[node.region].label}
        </p>
        <button type="button" className="mp-close" onClick={onClose} aria-label="Close">
          Close
        </button>
      </div>
      <h2 className="mp-name">{node.name}</h2>
      <p className="mp-blurb">{node.blurb}</p>
      <div className="mp-actions">
        {node.href && (
          <a href={node.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mp-go">
            Open {node.name}
          </a>
        )}
        <a href={node.box} target="_blank" rel="noopener noreferrer" className="mp-box">
          Its ICM box (for AI)
        </a>
      </div>
      <p className="mp-kicker mp-conn">Connected to {links.length}</p>
      <ul className="mp-links">
        {links
          .sort((a, b) => Number(!!a.hub) - Number(!!b.hub) || a.name.localeCompare(b.name))
          .map((l) => (
            <li key={l.slug}>
              <button type="button" className={`mp-${l.region}`} onClick={() => onPick(l.slug)}>
                <span className="mp-swatch" />
                {l.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
