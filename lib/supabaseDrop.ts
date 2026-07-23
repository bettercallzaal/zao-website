import { createClient } from '@supabase/supabase-js'

// Browser client for the Brand Drop asset manager. Anon key is public by design;
// access is scoped by RLS to the brand_drops table + brand-drop bucket only.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const BUCKET = 'brand-drop'

export const supabase = createClient(url, anon, {
  auth: { persistSession: false },
})

export type BrandDrop = {
  id: string
  filename: string
  storage_path: string
  caption: string
  folder: string
  kind: 'image' | 'audio' | 'file'
  size_bytes: number | null
  created_at: string
}

export function publicUrl(path: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}
