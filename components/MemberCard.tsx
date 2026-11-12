import Image from 'next/image'
import Link from 'next/link'
import type { WebflowMember } from '@/lib/webflowMembers'

export function MemberCard({ member, line }: { member: WebflowMember; line?: string | null }) {
  return (
    <Link
      href={`/community/${member.slug}`}
      className="group block overflow-hidden rounded transition-all hover:scale-[1.03]"
      style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-sm font-medium sm:text-base" style={{ color: 'var(--zao-cream)' }}>
          {member.name}
        </p>
        {member.category && (
          <p className="mt-1 text-xs" style={{ color: 'var(--zao-cream-dim)' }}>
            {member.category}
          </p>
        )}
        {line && (
          <p className="mt-1 text-xs" style={{ color: 'var(--zao-cream-faint)' }}>
            {line}
          </p>
        )}
      </div>
    </Link>
  )
}
