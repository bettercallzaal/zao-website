import Link from 'next/link'

// The strip on top of each homepage concept: which one this is and how to reach the others.
// Each concept ships in its own PR, so a sibling link 404s until that PR is merged.
export function ConceptStrip({ name }: { name: string }) {
  return (
    <div
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs"
      style={{ backgroundColor: 'var(--zao-cream)', color: 'var(--zao-dark)' }}
    >
      <span className="font-bold uppercase tracking-[0.16em]">Homepage concept {name}</span>
      <Link href="/" className="font-medium opacity-70 hover:opacity-100">
        the site today
      </Link>
    </div>
  )
}
