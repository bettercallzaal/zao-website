'use client'

import { useMemo, useState } from 'react'
import { MemberCard } from '@/components/MemberCard'
import type { WebflowMember } from '@/lib/webflowMembers'
import {
  ACTIVITY_GROUPS,
  ORIGINS,
  activityFor,
  activityGroup,
  activityLine,
  type ActivityGroup,
  type Origin,
} from '@/lib/communityActivity'

// Default order is by where people came in (Tom Fellenz, ZAO Festivals chat 12 Nov: keep
// festival performers, WaveWarZ and friends apart; Zaal: "we should default organize by
// this"). A member with more than one door sits under the first one in ORIGINS order.
type Sort = 'origin' | 'active' | 'az'

const chipBase = 'rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-[1.03] sm:text-sm'

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={chipBase}
      style={
        on
          ? { backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)', border: '1px solid var(--zao-cream)' }
          : { border: '1px solid var(--zao-border)', color: 'var(--zao-cream-dim)', backgroundColor: 'var(--zao-panel)' }
      }
    >
      {children}
    </button>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span
        className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] sm:w-28"
        style={{ color: 'var(--zao-cream-faint)' }}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function CommunityDirectory({ members }: { members: WebflowMember[] }) {
  const [sort, setSort] = useState<Sort>('origin')
  const [role, setRole] = useState<string | null>(null)
  const [group, setGroup] = useState<ActivityGroup | null>(null)
  const [origin, setOrigin] = useState<Origin | null>(null)

  const roles = useMemo(() => {
    const counts = new Map<string, number>()
    for (const m of members) if (m.category) counts.set(m.category, (counts.get(m.category) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [members])

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (role && m.category !== role) return false
      const a = activityFor(m.slug)
      if (group && activityGroup(a) !== group) return false
      if (origin && !a.origins.includes(origin)) return false
      return true
    })
  }, [members, role, group, origin])

  const az = (a: WebflowMember, b: WebflowMember) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })

  const byActivity = (a: WebflowMember, b: WebflowMember) => {
    const d = activityFor(b.slug).score - activityFor(a.slug).score
    return d !== 0 ? d : az(a, b)
  }
  const homeOrigin = (m: WebflowMember): Origin =>
    ORIGINS.map((o) => o.key).find((k) => activityFor(m.slug).origins.includes(k)) ?? 'friends'

  const sections: { key: string; title: string; sub?: string; items: WebflowMember[] }[] =
    sort === 'az'
      ? [{ key: 'all', title: '', items: [...filtered].sort(az) }]
      : sort === 'origin'
      ? ORIGINS.map((o) => ({
          key: o.key,
          title: o.key === 'festivals' ? 'ZAO Festivals performers' : o.title,
          sub: o.key === 'friends' ? 'came in through the ZAO itself' : 'most active first',
          items: filtered.filter((m) => homeOrigin(m) === o.key).sort(byActivity),
        })).filter((s) => s.items.length > 0)
      : ACTIVITY_GROUPS.map((g) => ({
          key: g.key,
          title: g.title,
          sub: g.sub,
          items: filtered
            .filter((m) => activityGroup(activityFor(m.slug)) === g.key)
            .sort(byActivity),
        })).filter((s) => s.items.length > 0)

  const anyFilter = role !== null || group !== null || origin !== null

  return (
    <div className="space-y-8">
      <div className="space-y-3 rounded p-4 sm:p-5" style={{ border: '1px solid var(--zao-border)' }}>
        <FilterRow label="Order">
          <Chip on={sort === 'origin'} onClick={() => setSort('origin')}>
            Where they came in
          </Chip>
          <Chip on={sort === 'active'} onClick={() => setSort('active')}>
            Most active
          </Chip>
          <Chip on={sort === 'az'} onClick={() => setSort('az')}>
            A to Z
          </Chip>
        </FilterRow>
        <FilterRow label="How active">
          <Chip on={group === null} onClick={() => setGroup(null)}>
            Everyone
          </Chip>
          {ACTIVITY_GROUPS.map((g) => (
            <Chip key={g.key} on={group === g.key} onClick={() => setGroup(group === g.key ? null : g.key)}>
              {g.title}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Role">
          <Chip on={role === null} onClick={() => setRole(null)}>
            All roles
          </Chip>
          {roles.map((r) => (
            <Chip key={r} on={role === r} onClick={() => setRole(role === r ? null : r)}>
              {r}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Came in from">
          <Chip on={origin === null} onClick={() => setOrigin(null)}>
            Anywhere
          </Chip>
          {ORIGINS.map((o) => (
            <Chip key={o.key} on={origin === o.key} onClick={() => setOrigin(origin === o.key ? null : o.key)}>
              {o.title}
            </Chip>
          ))}
        </FilterRow>
        <p className="pt-1 text-xs" style={{ color: 'var(--zao-cream-faint)' }}>
          Activity counts WaveWarZ battles and ZAO shows played. Fractal attendance and new releases join the count next.
          {anyFilter ? ` Showing ${filtered.length} of ${members.length}.` : ''}
        </p>
      </div>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--zao-cream-dim)' }}>Nobody matches those filters yet. Clear one and try again.</p>
      )}

      {sections.map((s) => (
        <div key={s.key} className="space-y-4">
          {s.title && (
            <div className="flex items-baseline gap-3">
              <h3 className="text-lg font-semibold sm:text-xl" style={{ color: 'var(--zao-cream)' }}>
                {s.title}
              </h3>
              <span className="text-xs" style={{ color: 'var(--zao-cream-faint)' }}>
                {s.items.length}
                {s.sub ? ` · ${s.sub}` : ''}
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {s.items.map((member) => (
              <MemberCard key={member.slug} member={member} line={activityLine(activityFor(member.slug))} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
