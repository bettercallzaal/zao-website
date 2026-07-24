// The Nexus: every ZAO project in one place, plus onboarding paths that route a
// visitor to what they came for. Names are canon (zaobrand naming glossary).

export type Step = { text: string; href: string; external: boolean }

// "Where do you want to go?" - onboarding paths, each a real step-by-step.
export const ONBOARDING: { want: string; blurb: string; steps: Step[] }[] = [
  {
    want: 'Earn a voice',
    blurb: 'Governance you earn, not buy. Here is exactly how to start.',
    steps: [
      { text: 'Join the /zao channel on Farcaster', href: 'https://farcaster.xyz/~/channel/zao', external: true },
      { text: 'Show up to a Fractal Monday - the weekly Respect session', href: '/calendar', external: false },
      { text: 'Share what you worked on; the circle ranks each other', href: '/zao-leaderboard', external: false },
      { text: 'Earn Respect - your standing, and your vote in how The ZAO runs', href: '/zao-leaderboard', external: false },
    ],
  },
  {
    want: 'Listen to music',
    blurb: 'On-chain music battles where fans back the songs.',
    steps: [
      { text: 'Open WaveWarZ', href: 'https://wavewarz.com', external: true },
      { text: 'Watch a live song-vs-song battle', href: 'https://wavewarz.com', external: true },
      { text: 'Back your favorite - artists earn on every trade', href: 'https://wavewarz.com', external: true },
    ],
  },
  {
    want: 'Come to an event',
    blurb: 'Metaverse concerts and the festival.',
    steps: [
      { text: 'Check the calendar for what is on', href: '/calendar', external: false },
      { text: 'Follow /zao on Farcaster so the next one finds you', href: 'https://farcaster.xyz/~/channel/zao', external: true },
      { text: 'Show up - COC Concertz in the metaverse, ZAOstock in person', href: '/nexus#music', external: false },
    ],
  },
  {
    want: 'Build something',
    blurb: 'Ship on top of The ZAO, in the open.',
    steps: [
      { text: 'See the lab and the build-a-thon in the Nexus', href: '/nexus#build', external: false },
      { text: 'Read the whitepaper to understand the governance you build into', href: '/papers', external: false },
      { text: 'Browse the open-source code and start', href: 'https://github.com/bettercallzaal', external: true },
    ],
  },
  {
    want: 'Understand The ZAO',
    blurb: 'The story and the thinking behind it.',
    steps: [
      { text: 'Read the story - where The ZAO came from', href: '/about', external: false },
      { text: 'Read the whitepaper - the earned-governance thesis in full', href: '/papers', external: false },
      { text: 'Meet the community', href: '/community', external: false },
    ],
  },
]

export type NexusProject = {
  name: string
  blurb: string
  href: string
  external: boolean
}

// The full directory, grouped. Only real, reachable destinations.
export const NEXUS: { group: string; id: string; projects: NexusProject[] }[] = [
  {
    group: 'Music & events',
    id: 'music',
    projects: [
      { name: 'WaveWarZ', blurb: 'Live-traded music battles on Solana, with automated artist payouts.', href: 'https://wavewarz.com', external: true },
      { name: 'COC Concertz', blurb: 'A recurring metaverse concert series.', href: 'https://cocconcertz.com', external: true },
      { name: 'ZAOstock', blurb: 'The ZAO festival - bridging a real place to an onchain community.', href: 'https://zaostock.com', external: true },
    ],
  },
  {
    group: 'Build & tools',
    id: 'build',
    projects: [
      { name: 'ZAO OS', blurb: 'The lab where ecosystem projects are built before they graduate.', href: 'https://zaoos.com', external: true },
      { name: 'ZABAL Games', blurb: 'The build-a-thon program for artists and builders.', href: 'https://zabalgamez.com', external: true },
      { name: 'Open source', blurb: 'Everything is built in the open. Browse the code.', href: 'https://github.com/bettercallzaal', external: true },
    ],
  },
  {
    group: 'Governance',
    id: 'governance',
    projects: [
      { name: 'The Whitepaper', blurb: 'Earned governance, verified on-chain - the full theory and mechanics.', href: '/papers', external: false },
      { name: 'Respect', blurb: 'The reputation you earn by contributing. How standing works.', href: '/zao-leaderboard', external: false },
      { name: 'The token stance', blurb: 'Community-first, not token-first. How value and contribution work.', href: '/zao-token', external: false },
      { name: 'The brand', blurb: 'The whole brand in one place - boilerplate, glossary, voice, palette, hierarchy.', href: '/brand', external: false },
    ],
  },
  {
    group: 'Community',
    id: 'community',
    projects: [
      { name: 'The community', blurb: 'Artists and builders shipping together. Meet them.', href: '/community', external: false },
      { name: 'Calendar', blurb: 'What is happening - shows, sessions, events.', href: '/calendar', external: false },
      { name: 'Newsletter', blurb: 'The build-in-public newsletter on Paragraph.', href: 'https://paragraph.com/@thezao', external: true },
      { name: 'Farcaster', blurb: 'The /zao channel - daily ecosystem activity.', href: 'https://farcaster.xyz/~/channel/zao', external: true },
    ],
  },
]
