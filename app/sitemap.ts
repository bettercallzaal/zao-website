import type { MetadataRoute } from 'next'

const BASE = 'https://thezao.com'

const ROUTES = ['', '/community', '/calendar', '/zao-leaderboard', '/about', '/zao-token']

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
