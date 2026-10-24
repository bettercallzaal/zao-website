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
      // /blog-categories/* were Webflow's release-type listings (3-track, album,
      // EP, single, video), each a list of /drops pages. They used to land on
      // /community because nothing here listed releases; the ported
      // /music-releases index does, so they land there. There is no per-type
      // filter on it yet. They stay temporary: a permanent redirect would cache
      // hard and outlive that choice.
      { source: '/blog-categories/3-track', destination: '/music-releases', permanent: false },
      { source: '/blog-categories/album', destination: '/music-releases', permanent: false },
      { source: '/blog-categories/ep', destination: '/music-releases', permanent: false },
      { source: '/blog-categories/single', destination: '/music-releases', permanent: false },
      { source: '/blog-categories/video', destination: '/music-releases', permanent: false },
      { source: '/oldpages/music-releases', destination: '/music-releases', permanent: false },

      // Webflow answers both with a 301 today, measured 2026-10-20 with curl on
      // www.thezao.com: /contact -> /join -> /zao-token. Same final page and the
      // same permanence here, minus the extra hop. They were missing from the
      // recorded URL list because a 301 is not a page, so they 404ed on the
      // rebuild until IMan's review caught it (iman-desk #106).
      { source: '/contact', destination: '/zao-token', permanent: true },
      { source: '/join', destination: '/zao-token', permanent: true },
      ...WEBFLOW_MEMBERS.map((m) => ({
        source: `/artists/${m.slug}`,
        destination: `/community/${m.slug}`,
        permanent: true,
      })),
    ]
  },
  // Zaal, grill 2026-10-18 batch2 (card 9855): "noindex the test host". The same
  // build serves thezao.com, test.thezao.com and the vercel.app aliases, so this
  // keys on the host: only the non-production hosts get noindex, and thezao.com
  // stays indexable after the DNS switch. Next anchors `has` values (^...$).
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex' }]
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'test\\.thezao\\.com' }], headers: noindex },
      { source: '/:path*', has: [{ type: 'host', value: '.+\\.vercel\\.app' }], headers: noindex },
    ]
  },
}

export default nextConfig
