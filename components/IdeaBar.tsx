import Link from 'next/link'

// The strip on top of each idea page (thezao.com/1, /2, /3): which idea this is and how to
// get to the others. Idea pages are sketches of a new way to make the site, not the site.
export function IdeaBar({ n, name }: { n: 1 | 2 | 3; name: string }) {
  return (
    <div
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs"
      style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
    >
      <span className="font-bold uppercase tracking-[0.16em]">
        Idea {n} of 3: {name}
      </span>
      <span className="flex gap-3 font-medium">
        {[1, 2, 3].map((i) => (
          <Link key={i} href={`/${i}`} className={i === n ? 'underline' : 'opacity-70 hover:opacity-100'}>
            /{i}
          </Link>
        ))}
        <Link href="/" className="opacity-70 hover:opacity-100">
          the site today
        </Link>
      </span>
    </div>
  )
}

export const ideaMeta = { robots: { index: false, follow: false } }
