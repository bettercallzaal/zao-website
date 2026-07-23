// Reference ZAO profile: profile header on the ZAO interface, then the member's
// own site scrolls below. Zaal's is the first example of the pattern.

export const PROFILE = {
  name: 'Zaal Panthaki',
  handle: 'bettercallzaal',
  tagline: 'Open-source builder. Founder of The ZAO, co-founder of WaveWarZ.',
  bio: 'I build the AI-agent infrastructure and creator tools that put margin, data, and IP back in independent artists’ hands. Electrical engineer by training, building in public out of Maine.',
  // pfp pending in Brand Drop (BetterCallZaal folder). Until then, initials avatar.
  avatar: '', // set to '/zaal.jpeg' once dropped
  initials: 'Z',
  stats: [
    { value: '80+', label: 'open-source repos' },
    { value: 'FarHack 2026', label: 'Snap winner' },
    { value: '2', label: 'festivals produced' },
    { value: '100+', label: 'fractal governance weeks' },
  ],
  socials: [
    { label: 'Farcaster', href: 'https://farcaster.xyz/bettercallzaal' },
    { label: 'GitHub', href: 'https://github.com/bettercallzaal' },
    { label: 'X', href: 'https://x.com/bettercallzaal' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zaalp/' },
  ],
  bookUrl: 'https://cal.com/bettercallzaal',
}

// The Build Session offer (from bcz-strategies/services/build-session.md).
export const TIERS = [
  {
    name: 'Community',
    price: 'Free',
    who: 'ZAO core + active contributors',
    get: 'One fix, ~45 min live. The deeper you are in the community, the more this is just what we do.',
    featured: false,
    free: true,
  },
  {
    name: 'Neighbor',
    price: 'Pay what works',
    who: 'Local folks + small business',
    get: 'One fix plus a short follow-up. Sliding rate, no shame floor - nobody local gets priced out.',
    featured: false,
    free: false,
  },
  {
    name: 'Standard',
    price: '$500',
    unit: '/ session',
    who: 'Outside businesses',
    get: 'One fix, a written recap, and one follow-up. Priority within the week.',
    featured: false,
    free: false,
  },
  {
    name: 'Boost',
    price: '$1,500+',
    unit: '/ session',
    who: 'Capital-backed builds',
    get: 'Two or more fixes or a deeper build, priority scheduling, more of the agent fleet, and an on-ramp to a retainer. The boost rate funds the free tier.',
    featured: true,
    free: false,
  },
]

// Featured open-source work (curated from the GitHub audit).
export const FEATURED_REPOS = [
  { name: 'Sparkz', blurb: 'Farcaster-native identity and backing layer on Base - start with a spark, not a token.', href: 'https://github.com/bettercallzaal/sparkz', tag: 'Farcaster' },
  { name: 'Hermes Orchestrator', blurb: 'MIT-licensed supervisor framework for spawning and managing AI agents that build agents.', href: 'https://github.com/bettercallzaal/hermes-orchestrator', tag: 'AI agents' },
  { name: 'Zlank', blurb: 'No-code Farcaster Snap builder - stack blocks, hit deploy, share to feed.', href: 'https://github.com/bettercallzaal/zlank', tag: 'Farcaster' },
  { name: 'ZOL', blurb: 'Farcaster music scout bot that discovers and vets music in real time.', href: 'https://github.com/bettercallzaal/zol', tag: 'AI agents' },
  { name: 'Farscout', blurb: 'Free autonomous Farcaster research scout - tracks ecosystem activity and signals.', href: 'https://github.com/bettercallzaal/farscout', tag: 'Farcaster' },
  { name: 'ZAO Claude Skills', blurb: 'Hand-written Claude Code skills for the ZAO ecosystem - sync into your own stack.', href: 'https://github.com/bettercallzaal/zao-claude-skills', tag: 'Tools' },
]
