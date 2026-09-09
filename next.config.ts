import type { NextConfig } from 'next'
import { WEBFLOW_MEMBERS } from './lib/webflowMembers'

// URLs the Webflow site answers today. Without these they 404 the moment DNS
// moves, taking any inbound link, bookmark or search result with them.
//
// /artists is a LIVE 301 to /community on Webflow right now - replicating it is
// parity, not a new decision.
//
// /artists/<slug> was the member URL scheme before /community/<slug>. Those
// already 404 on Webflow, so this is an improvement on the old site rather than
// parity: the slugs are identical, the profiles exist, and the links are still
// out in the world. Only slugs that actually exist are redirected, so none of
// these can land on a 404.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  async redirects() {
    return [
      { source: '/artists', destination: '/community', permanent: true },

      // The Webflow pages nothing on that site links to, found via the Wayback
      // index rather than by crawling. They are LIVE today and 404 the moment
      // DNS moves.
      //
      // The 17 /drops pages and /music-releases are now REAL PAGES, not
      // redirects - see lib/webflowDrops.ts. The comment that used to sit here
      // said these soft landings came out if the content was ever ported. It
      // was, so they have. /oldpages/music-releases still redirects, to the
      // ported index rather than to an artist profile.
      //
      // The remaining redirects stay temporary: /blog-categories/* were Webflow
      // CMS taxonomy pages with no equivalent here, and a permanent redirect
      // would cache hard and outlive that choice.
      { source: '/blog-categories/3-track', destination: '/community', permanent: false },
      { source: '/blog-categories/album', destination: '/community', permanent: false },
      { source: '/blog-categories/ep', destination: '/community', permanent: false },
      { source: '/blog-categories/single', destination: '/community', permanent: false },
      { source: '/blog-categories/video', destination: '/community', permanent: false },
      { source: '/oldpages/music-releases', destination: '/music-releases', permanent: false },
      ...WEBFLOW_MEMBERS.map((m) => ({
        source: `/artists/${m.slug}`,
        destination: `/community/${m.slug}`,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
