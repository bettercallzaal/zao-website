// The ZAO brand reference, sourced from the zaobrand repo (canon/, voice/, visual/,
// hierarchy/). Kept in ZAO voice. Numbers are deliberately omitted (they drift).

export const WHAT_IS = {
  oneLine:
    'The ZAO is a web3 music community and incubator - a home where members build, ship, and graduate real products together.',
  longer:
    'It started as a gated Farcaster social client for its own community and grew into a lab. Members prototype ecosystem projects side by side; when a project is ready for production and new users, it graduates to its own repo and home. The community operates like a label and an incubator at once.',
  is: [
    'A community first - a home for a specific group of people, member-owned in spirit.',
    'A place that ships - real products, built in public, that leave the nest when ready.',
    'Web3-native and music-rooted, but not limited to either.',
  ],
  isNot: [
    'Not a platform play chasing generic scale.',
    'Not a token-first project - the community and the work come before any token.',
    'Not a single app - it is an umbrella over many builds.',
  ],
}

export const BOILERPLATE = {
  oneLiner: 'The ZAO is a web3 music community and incubator where artists own their work.',
  short:
    'The ZAO is a web3 music community and incubator, founded in 2024. It is a home where members build, ship, and graduate real products together - and where artists keep their margin, their data, and their IP. Built on Farcaster and Base.',
  medium:
    'The ZAO is a web3 music community and incubator, founded in 2024. It started as a gated social client for its own community and grew into a lab: members prototype projects side by side, and when something is ready it graduates to its own home. It runs like a label and an incubator at once. Everything it builds - from on-chain music battles to festivals - serves one idea: artists owning their work.',
  taglines: [
    'A home where artists own their work.',
    'Build, ship, graduate - together.',
    'Music, owned by the people who make it.',
  ],
  bios: [
    'The ZAO - a web3 music community and incubator. Artists own their work. Built on Farcaster + Base.',
    'Building the home where artists keep their margin, data, and IP.',
  ],
}

export const GLOSSARY: { correct: string; wrong: string; note: string }[] = [
  { correct: 'The ZAO', wrong: 'the Zao, ZAO, Zao', note: '"The ZAO" when standalone.' },
  { correct: 'WaveWarZ', wrong: 'Wave Wars, Wavewarz', note: 'Always WaveWarZ.' },
  { correct: 'COC Concertz', wrong: 'COC Concerts, CocConcertz', note: 'Space after COC, z not s.' },
  { correct: 'ZAOstock', wrong: 'ZAO Stock, Zaostock', note: 'One word, lowercase stock. The festival.' },
  { correct: 'ZABAL', wrong: 'Zabal, zabal', note: 'All caps.' },
  { correct: 'BetterCallZaal', wrong: 'Bettercallzaal, Better Call Zaal', note: 'One word, camelCase.' },
  { correct: 'ZOE', wrong: 'Zoe, zoe', note: 'All caps. The ecosystem orchestrator.' },
  { correct: 'ZOLs', wrong: 'Zols, ZOL', note: 'ZAO contribution credits.' },
  { correct: 'ZOUNZ', wrong: 'Zounz, zounz', note: 'All caps.' },
  { correct: 'SongJam', wrong: 'Songjam, Song Jam', note: 'CamelCase.' },
  { correct: 'SANG', wrong: 'Sang, sang', note: "All caps. SongJam's token." },
  { correct: 'FISHBOWLZ', wrong: 'Fishbowlz, FishBowlz', note: 'All caps. Paused.' },
  { correct: 'Huöttöja', wrong: 'Waha, Huottoja', note: "Community's own spelling, with umlauts." },
  { correct: 'JANGOUU FOREVER', wrong: 'Jango, Jangouu', note: 'Artist. Pronounced "Jango Double U".' },
  { correct: 'Joseph Goats', wrong: 'Jose Goats, Jose', note: 'Rebranded from Jose.' },
  { correct: 'Tom Fellenz', wrong: 'Fellenz', note: 'Full name or just Fellenz.' },
  { correct: 'Magnetiq', wrong: 'Magnetic, MagnetIQ', note: 'Event/launch platform at magnetiq.io.' },
]

export const VOICE = {
  hardRules: [
    'No emojis. Use plain text labels for emphasis: LIVE, DONE, MUSIC.',
    'No em dashes. Use hyphens.',
    'No decorative Unicode as emoji substitutes.',
    'Farcaster, not Warpcast.',
  ],
  register: [
    'Prose, not lists. The ZAO speaks in real sentences, not bullet dumps.',
    'Calm, not hype. Build-in-public honesty over marketing gloss.',
    'Grounded. Concrete over abstract - name the real thing that happened.',
    'Warm and inviting. The ZAO is a home, not a funnel.',
  ],
  avoid: [
    'Corporate filler (leverage, synergy, unlock, elevate).',
    'Fake urgency and scarcity.',
    'Over-claiming - no unconfirmed dates, partners, or targets.',
  ],
  test: 'Read it aloud. If it sounds like a press release or a growth-hack thread, rewrite it until it sounds like a person who actually built the thing telling you about it.',
}

// Current brand palette: the ZAO logo (navy + gold). Supersedes the older
// slate/cream brand palette after Zaal confirmed the logo as the brand (2026-07-23).
export const PALETTE = [
  { role: 'Navy', hex: '#022449', use: 'The ground. From the logo.' },
  { role: 'Gold', hex: '#fec107', use: 'The accent. From the logo.' },
  { role: 'Deep navy', hex: '#03182f', use: 'Page background (a touch deeper than the logo).' },
  { role: 'Light', hex: '#eaf0f8', use: 'Body text on navy.' },
]

export const HIERARCHY = {
  umbrella: [
    { name: 'The ZAO', note: 'The community and the brand. Everything relates back to it.' },
    { name: 'ZAO OS / ZAOOS', note: 'The lab where things get prototyped before they graduate.' },
  ],
  under: [
    { name: 'WaveWarZ', note: 'Live-traded music battles and artist pipeline.' },
    { name: 'ZAOstock', note: 'The ZAO festival.' },
    { name: 'COC Concertz', note: 'Events brand (graduated).' },
    { name: 'ZOE', note: 'The orchestrator agent (internal).' },
    { name: 'ZOLs', note: 'ZAO contribution credits.' },
  ],
  beside: [
    { name: 'BetterCallZaal', note: "Zaal's personal/agency brand." },
    { name: 'ZABAL / ZABAL Games', note: 'The build-a-thon program. Distinct from The ZAO, closely linked - keep them separate.' },
  ],
}
