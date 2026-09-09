// Live WaveWarZ stats, fetched server-side and cached hourly (ISR). Only real,
// verifiable on-chain figures from the public API - no hardcoded or derived-USD
// numbers (SOL volume is the honest on-chain figure; current-price USD understates it).
// Docs: https://wavewarz.info/api-docs

export type WaveWarZStats = {
  battles: number
  volumeSol: number
  artists: number
  songs: number
}

async function j(url: string) {
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

/**
 * Build the stat block from three raw API payloads, or return null.
 *
 * WHY THIS IS SEPARATE AND WHY IT REFUSES TO GUESS. The previous version read
 * `stats?.battles?.total ?? 0`. A DOWN api was handled - the fetch throws, the
 * caller returns null, the homepage hides the section. But an api answering
 * **200 with a changed shape** - a renamed key, a restructured payload - threw
 * nothing. Every field fell through to 0 and the homepage rendered "0 Music
 * battles, 0 SOL, 0 Artists competing, 0 Songs battled" as though those were
 * measurements. That is the reachable-but-wrong failure `uptime.yml` was written
 * to catch, and it would have been on the front door.
 *
 * **A zero is a claim. An absent section is not.** So a missing or non-numeric
 * field is treated as failure, not as zero, and the section hides exactly as it
 * does when the api is unreachable. Genuine zeros still render: the guard rejects
 * absence, not the number 0.
 *
 * Exported so it can be tested against a mutated payload without network.
 */
export function statsFrom(stats: unknown, artists: unknown, songs: unknown): WaveWarZStats | null {
  const num = (v: unknown): number | null =>
    typeof v === 'number' && Number.isFinite(v) ? v : null

  const g = (o: unknown, ...path: string[]): unknown =>
    path.reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), o)

  const battles = num(g(stats, 'battles', 'total'))
  const volumeSol = num(g(stats, 'volume', 'totalSol'))
  const artistCount = num(g(artists, 'count'))
  const songCount = num(g(songs, 'count'))

  if (battles === null || volumeSol === null || artistCount === null || songCount === null) {
    return null
  }
  return { battles, volumeSol: Math.round(volumeSol), artists: artistCount, songs: songCount }
}

export async function getWaveWarZStats(): Promise<WaveWarZStats | null> {
  try {
    const [stats, artists, songs] = await Promise.all([
      j('https://wavewarz.info/api/public/stats'),
      j('https://wavewarz.info/api/public/leaderboards/artists'),
      j('https://wavewarz.info/api/public/leaderboards/songs'),
    ])
    return statsFrom(stats, artists, songs)
  } catch {
    return null
  }
}

export const fmtNum = (n: number) => n.toLocaleString('en-US')

export type WWArtist = { name: string; wins: number; losses: number }

// Live top artists on the WaveWarZ battle leaderboard (real win/loss records).
export async function getTopArtists(limit = 5): Promise<WWArtist[]> {
  try {
    const d = await j('https://wavewarz.info/api/public/leaderboards/artists')
    const rows = (d?.artists ?? []) as { name?: string; wins?: number; losses?: number }[]
    return rows
      .map((r) => ({ name: (r.name ?? '').trim(), wins: r.wins ?? 0, losses: r.losses ?? 0 }))
      .filter((a) => a.name)
      .sort((a, b) => b.wins - a.wins || a.losses - b.losses)
      .slice(0, limit)
  } catch {
    return []
  }
}
