// ZAO Brand Design Tokens
// Source: zaobrand/visual/palette.md

export const ZAO_COLORS = {
  // Brand palette (marketing, web surfaces)
  dark: '#141e27',      // Primary dark background
  cream: '#e0ddaa',     // Warm light accent

  // Extended palette for depth
  darkAlt: '#0f1520',   // Darker variant
  creamAlt: '#d4cfaa',  // Cream with less brightness
} as const

export const NOTABLE_ARTISTS = [
  'Jango UU',
  'Songs of Eden',
  'Hurric4n3Ike',
  'Attabotty',
  'Clejan',
  'NessytheRilla',
  'Jadyn Violet',
  'Maxwell Aden',
] as const

export const NAV_LINKS = [
  { label: 'Community', href: '/community' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Leaderboard', href: '/zao-leaderboard' },
  { label: 'About', href: '/about' },
  { label: 'Token', href: '/zao-token' },
] as const

// What The ZAO builds. Names are canon (zaobrand/canon/naming-glossary.md) - do not restyle.
export const ECOSYSTEM = [
  {
    name: 'WaveWarZ',
    blurb: 'Live-traded music battles on Solana, with automated payouts to artists.',
    href: 'https://wavewarz.com',
  },
  {
    name: 'COC Concertz',
    blurb: 'A recurring metaverse concert series for the community.',
    href: 'https://cocconcertz.com',
  },
  {
    name: 'ZAOstock',
    blurb: 'The ZAO festival - bridging a real place to an onchain community.',
    href: 'https://zaostock.com',
  },
  {
    name: 'ZAO OS',
    blurb: 'The lab where ecosystem projects get built before they graduate.',
    href: 'https://zaoos.com',
  },
  {
    name: 'ZABAL Games',
    blurb: 'The build-a-thon program - artists and builders shipping together.',
    href: 'https://zabalgamez.com',
  },
] as const
