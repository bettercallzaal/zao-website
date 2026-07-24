// ZAO member registry for the living-article profiles. Farcaster data (pfp, name,
// bio, followers) is pulled live via Neynar; this holds only the ZAO-side facts.
// `note` is a hand-written living article - grows each quarter with real work.
export type Member = {
  handle: string // Farcaster username -> thezao.com/<handle>
  fid: number
  name: string // fallback display name
  role: string // honest label, not an invented accomplishment
  note?: string // living-article body; leave empty until real contributions are written
}

// First cohort: Fractal Respect earners. `note` articles are grounded in each
// member's real public Farcaster activity - first drafts, refined each quarter.
export const MEMBERS: Member[] = [
  {
    handle: 'candytoybox',
    fid: 208976,
    name: 'Candy Toybox',
    role: 'Musician & Fractal contributor',
    note: 'Candy Toybox is an independent musician in The ZAO and one of the community’s most energetic voices for WaveWarZ. She puts it plainly: it is the most rewarding platform for musicians she has found, a place where artists battle their own catalog and fans trade on the songs they believe in. She shows up for the artist-first model and brings other creators along with her.',
  },
  {
    handle: 'hurric4n3ike',
    fid: 436428,
    name: 'Hurric4n3Ike',
    role: 'Writer & Fractal contributor',
    note: 'Hurric4n3Ike is the creative voice behind a lot of the WaveWarZ world. He writes the lore and the characters - Lui, Geek Myth, and the cast of TraderZ and TuneSmithZ - turning the mechanics of live-traded music into a story worth following. Where others see an order book, he sees a battlefield, and he makes you want to watch.',
  },
  {
    handle: 'ohnahji',
    fid: 262222,
    name: 'Ohnahji',
    role: 'Livestreamer, educator & Fractal contributor',
    note: 'Ohnahji shows up every day. He runs Yappin with B, a morning livestream on Twitch and YouTube where he teaches, builds in public, and brings the community along. He frames The ZAO as Web3’s first HBCU - a home base for educating the hometeam on blockchain and AI - and he keeps that classroom open, live, and warm.',
  },
  {
    handle: 'attabotty',
    fid: 504174,
    name: 'Attabotty',
    role: 'Artist & Fractal contributor',
    note: 'Attabotty is part of the day-to-day heartbeat of The ZAO - a regular in the live sessions, quick to welcome new faces, and always down to show up. Catch him in the room when the community goes live.',
  },
  {
    handle: 'danici',
    fid: 492524,
    name: "Da'Nici",
    role: 'Community & Fractal contributor',
    note: 'Da’Nici is one of The ZAO’s steady, warm presences - the kind of consistent voice that keeps a community feeling like a home. She keeps the daily rhythm going and the door open.',
  },
  {
    handle: 'fellenz',
    fid: 364831,
    name: 'Tom Fellenz',
    role: 'Community & Fractal contributor',
    note: 'Tom Fellenz is a thoughtful contributor in The ZAO and an early believer in on-chain creative work - an Avastars OG. He shows up with encouragement for other builders and a steady, considered voice, the kind that helps a small community hold together.',
  },
]
