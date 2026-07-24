import type { MetadataRoute } from 'next'
import { MEMBERS } from '@/lib/members'

const BASE = 'https://thezao.com'

// Public, indexable routes. /drop is intentionally excluded (noindexed ops tool).
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
  return [...core, ...members]
}
