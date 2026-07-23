import Link from 'next/link'
import Image from 'next/image'
import { Container } from './Container'
import { NAV_LINKS } from '@/lib/constants'

export function Nav() {
  return (
    <nav className="py-5" style={{ borderBottom: '1px solid var(--zao-border)' }}>
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="The ZAO home">
          <Image
            src="/zao-logo.jpeg"
            alt="The ZAO"
            width={44}
            height={44}
            priority
            className="rounded-lg"
            style={{ boxShadow: '0 0 0 1px var(--zao-border)' }}
          />
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--zao-cream)' }}>
            The ZAO
          </span>
        </Link>
        <div className="hidden gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-[color:var(--zao-cream)]"
              style={{ color: 'var(--zao-text)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  )
}
