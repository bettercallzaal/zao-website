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

export async function getWaveWarZStats(): Promise<WaveWarZStats | null> {
  try {
    const [stats, artists, songs] = await Promise.all([
      j('https://wavewarz.info/api/public/stats'),
      j('https://wavewarz.info/api/public/leaderboards/artists'),
      j('https://wavewarz.info/api/public/leaderboards/songs'),
    ])
    return {
      battles: stats?.battles?.total ?? 0,
      volumeSol: Math.round(stats?.volume?.totalSol ?? 0),
      artists: artists?.count ?? 0,
      songs: songs?.count ?? 0,
    }
  } catch {
    return null
  }
}

export const fmtNum = (n: number) => n.toLocaleString('en-US')
