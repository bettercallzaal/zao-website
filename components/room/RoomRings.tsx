import type { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WEBFLOW_MEMBERS } from '@/lib/webflowMembers'
import './room.css'

// The Room: members' own photos (from /public/members) sit on slow rings around the logo,
// six to the inner ring. Nothing is generated. If there are fewer members than seats, the
// outer rings simply hold fewer faces.

// Inner to outer: seats, radius and face size in container widths, turn time, direction.
const RINGS = [
  { seats: 6, r: 20, size: 10, dur: 70, dir: 'normal' },
  { seats: 12, r: 32, size: 8.5, dur: 110, dir: 'reverse' },
  { seats: 18, r: 44, size: 7, dur: 150, dir: 'normal' },
] as const

export function RoomRings() {
  const rings = RINGS.map((ring, k) => {
    const start = RINGS.slice(0, k).reduce((n, r) => n + r.seats, 0)
    return { ...ring, people: WEBFLOW_MEMBERS.slice(start, start + ring.seats) }
  })

  return (
    <div className="zao-room my-10 sm:my-16">
      {rings.map((ring) => (
        <div
          key={ring.seats}
          className="zao-room-ring"
          style={
            {
              width: `${ring.r * 2}cqw`,
              height: `${ring.r * 2}cqw`,
              '--dur': `${ring.dur}s`,
              '--dir': ring.dir,
              '--undir': ring.dir === 'normal' ? 'reverse' : 'normal',
            } as CSSProperties
          }
        >
          {ring.people.map((m, i) => (
            <Link
              key={m.slug}
              href={`/community/${m.slug}`}
              className="zao-room-seat"
              title={m.name}
              style={
                {
                  '--a': `${(360 / ring.seats) * i}deg`,
                  '--r': `${ring.r}cqw`,
                  '--size': `${ring.size}cqw`,
                } as CSSProperties
              }
            >
              <span className="zao-room-face">
                <Image src={m.photo} alt={m.name} width={96} height={96} className="h-full w-full object-cover" />
              </span>
            </Link>
          ))}
        </div>
      ))}
      <div className="zao-room-core">
        <Image src="/zao-logo-512.png" alt="The ZAO" fill sizes="160px" className="object-cover" priority />
      </div>
    </div>
  )
}
