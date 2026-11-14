// The Paragraph RSS for The ZAO Newsletter (https://paragraph.com/@thezao), read server-side
// and shared by /blog and the front door's newsletter signal. Public, keyless. A feed that
// fails or changes shape returns null and the caller says so, rather than printing a guess.
// Lifted from the concept PR 72 (The Paper), trimmed to the newsletter only.

export const REVALIDATE = 900

const PARAGRAPH_RSS = 'https://api.paragraph.com/blogs/rss/@thezao'

export type Edition = { title: string; link: string; date: string; excerpt: string }

const cdata = (s: string) => s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
const pick = (item: string, tag: string) => cdata(item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? '')

// Only an http(s) link is ever rendered as a link: a feed must not be able to hand the page a
// javascript: or data: address.
const safeLink = (u: string) => {
  try {
    const p = new URL(u)
    return p.protocol === 'https:' || p.protocol === 'http:' ? p.href : ''
  } catch {
    return ''
  }
}

export async function getEditions(): Promise<Edition[] | null> {
  try {
    const res = await fetch(PARAGRAPH_RSS, {
      headers: { 'User-Agent': 'Mozilla/5.0 (thezao.com)' },
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) return null
    const xml = await res.text()
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1])
    const editions = items
      .map((it) => ({
        title: pick(it, 'title'),
        link: safeLink(pick(it, 'link')),
        date: pick(it, 'pubDate'),
        // The feed's description opens with the sign-on line and the title in lower case
        // ("zm ... "); the story starts after it.
        excerpt: pick(it, 'description')
          .replace(/^zm\s+/i, '')
          .replace(new RegExp(`^${pick(it, 'title').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+-\s+/g, '\\s+')}\\s*`, 'i'), '')
          .replace(/https?:\/\/\S+/g, '')
          .replace(/\s+\.\.\.$/, '...')
          .trim(),
      }))
      .filter((e) => e.title && e.link && !Number.isNaN(Date.parse(e.date)))
    return editions.length ? editions : null
  } catch {
    return null
  }
}
