// Server-side Farcaster data via Neynar. Key is server-only (never NEXT_PUBLIC).
export type FarcasterUser = {
  fid: number
  username: string
  display_name: string
  pfp_url: string
  bio: string
  follower_count: number
}

// Fetch users by FID in bulk. ISR: refresh daily so pfps/bios stay current.
export async function getFarcasterUsers(fids: number[]): Promise<Record<number, FarcasterUser>> {
  const key = process.env.NEYNAR_API_KEY
  if (!key || fids.length === 0) return {}
  try {
    const res = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fids.join(',')}`,
      { headers: { 'x-api-key': key }, next: { revalidate: 86400 } },
    )
    if (!res.ok) return {}
    const data = await res.json()
    const out: Record<number, FarcasterUser> = {}
    for (const u of data.users ?? []) {
      out[u.fid] = {
        fid: u.fid,
        username: u.username,
        display_name: u.display_name,
        pfp_url: u.pfp_url,
        bio: u.profile?.bio?.text ?? '',
        follower_count: u.follower_count ?? 0,
      }
    }
    return out
  } catch {
    return {}
  }
}
