/**
 * Upload ACRA screenshots to Supabase Storage.
 * Bucket: acra-screenshots (public)
 */

import { createClient } from '@supabase/supabase-js'

const BUCKET = 'acra-screenshots'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/** Upload a screenshot PNG and return its public URL, or null on failure. */
export async function uploadScreenshot(reportId: string, buffer: Buffer): Promise<string | null> {
  const supabase = getSupabase()
  const path = `${reportId}.png`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: 'image/png',
      upsert: true,
    })

  if (error) {
    console.error('Screenshot upload failed:', error.message)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
