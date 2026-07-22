type EcosystemCardProps = {
  name: string
  blurb: string
  href: string
}

export function EcosystemCard({ name, blurb, href }: EcosystemCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded p-5 transition-all hover:-translate-y-0.5 sm:p-6"
      style={{ border: '1px solid var(--zao-border)', backgroundColor: 'var(--zao-panel)' }}
    >
      <h3 className="text-lg font-bold" style={{ color: 'var(--zao-cream)' }}>
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--zao-cream-dim)' }}>
        {blurb}
      </p>
    </a>
  )
}
