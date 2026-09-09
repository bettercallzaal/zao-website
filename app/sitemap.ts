import type { MetadataRoute } from 'next'
import { MEMBERS } from '@/lib/members'
import { WEBFLOW_MEMBERS, ARTIST_CATEGORIES } from '@/lib/webflowMembers'
import { WEBFLOW_DROPS } from '@/lib/webflowDrops'

const BASE = 'https://thezao.com'

// Public, indexable routes. Every route here must be reachable and indexable.
// /drop is intentionally excluded - it is a noindexed ops tool, verified as
// carrying a noindex tag rather than assumed.
const ROUTES = [
  '',
  '/nexus',
  '/papers',
  '/brand',
  '/community',
  '/calendar',
  '/zao-leaderboard',
  '/about',
  '/zao-token',
  '/zaal',
  '/links',
  '/ai',
  '/api-docs',
  '/music-releases',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
  const members = MEMBERS.map((m) => ({
    url: `${BASE}/${m.handle}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  // The 43 profiles carried over from the Webflow site, at their original paths
  // so inbound links and search results keep resolving after the switch.
  const community = WEBFLOW_MEMBERS.map((m) => ({
    url: `${BASE}/community/${m.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  // The Webflow artist-category paths, rebuilt so inbound links keep resolving.
  const categories = ARTIST_CATEGORIES.map((c) => ({
    url: `${BASE}/artist-category/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  // Jango UU's 17 release pages, ported from Webflow. They were live there and
  // linked from nothing, so they were absent from search as well as from the
  // site's own navigation; listing them here is the first time they are
  // discoverable at all.
  const drops = WEBFLOW_DROPS.map((d) => ({
    url: `${BASE}/drops/${d.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))
  return [...core, ...members, ...community, ...categories, ...drops]
}
