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

// First cohort: Fractal Respect earners.
export const MEMBERS: Member[] = [
  { handle: 'candytoybox', fid: 208976, name: 'Candy Toybox', role: 'Artist & Fractal contributor' },
  { handle: 'hurric4n3ike', fid: 436428, name: 'Hurric4n3Ike', role: 'Artist & Fractal contributor' },
  { handle: 'ohnahji', fid: 262222, name: 'Ohnahji', role: 'Fractal contributor' },
  { handle: 'attabotty', fid: 504174, name: 'Attabotty', role: 'Artist & Fractal contributor' },
  { handle: 'danici', fid: 492524, name: "Da'Nici", role: 'Fractal contributor' },
  { handle: 'fellenz', fid: 364831, name: 'Tom Fellenz', role: 'Fractal contributor' },
]
