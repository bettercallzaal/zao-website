import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { getEditions } from '@/lib/paragraphFeed'
import '@/components/paper/paper.css'

// The blog, in The Paper look (concept D, PR 72). There is no post content on this site:
// every edition below comes from the newsletter's public Paragraph feed and links out to
// Paragraph. If the feed is down the page says so instead of printing a guess.
// This is a proposal: it waits on Zaal and on Brian (design lead).

export const revalidate = 900 // matches REVALIDATE in lib/paragraphFeed.ts; Next needs a literal here

export const metadata: Metadata = {
  title: 'Blog - The ZAO',
  description:
    'The ZAO Newsletter: the daily build log from The ZAO, a decentralized impact network for artists. Every edition is read on Paragraph.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog - The ZAO',
    description: 'The ZAO Newsletter: the daily build log, on Paragraph.',
    url: 'https://thezao.com/blog',
    images: ['https://thezao.com/og-image.png'],
  },
}

const mast = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'] })

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', ...o }).format(new Date(iso))

export default async function BlogPage() {
  const editions = await getEditions()
  const latest = editions?.[0]

  return (
    <div className="paper">
      <Nav />

      <header className="paper-wrap paper-mast">
        <div className="paper-mast-top">
          <span>The ZAO Newsletter</span>
          <span>
            <a href="https://paragraph.com/@thezao" target="_blank" rel="noopener noreferrer">
              paragraph.com/@thezao
            </a>
          </span>
        </div>
        <h1 className={`${mast.className} paper-title`}>Blog</h1>
        <p className="paper-motto">The daily build log, on Paragraph.</p>
      </header>

      <div className="paper-wrap paper-grid">
        <article className="paper-lead">
          <h2 className="paper-label">Latest edition</h2>
          {latest ? (
            <a href={latest.link} target="_blank" rel="noopener noreferrer" className="paper-ed">
              <span className={`${mast.className} paper-head`}>{latest.title}</span>
              <span className="paper-when">{fmt(latest.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="paper-ed-excerpt">{latest.excerpt}</span>
              <span className="paper-cta">Read the edition on Paragraph</span>
            </a>
          ) : (
            <p className="paper-missing">
              The newsletter feed did not come in just now. The editions are all on{' '}
              <a href="https://paragraph.com/@thezao" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                Paragraph
              </a>
              .
            </p>
          )}
        </article>

        <aside className="paper-daily">
          <h2 className="paper-label">Earlier editions</h2>
          {editions && editions.length > 1 ? (
            <ol className="paper-earlier">
              {editions.slice(1, 25).map((e) => (
                <li key={e.link}>
                  <a href={e.link} target="_blank" rel="noopener noreferrer">
                    <span className="paper-when">{fmt(e.date, { month: 'short', day: 'numeric' })}</span>
                    {e.title}
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="paper-missing">No earlier editions to list.</p>
          )}
        </aside>
      </div>

      <Footer />
    </div>
  )
}
