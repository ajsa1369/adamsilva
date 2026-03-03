// Service-role client for webhook handlers and background processes.
// Bypasses RLS. Do NOT use for user-facing operations — use lib/supabase/server.ts instead.
//
// Key differences from server.ts and client.ts:
//   - Imports from @supabase/supabase-js (NOT @supabase/ssr — no cookies required)
//   - Uses the SERVICE_ROLE key (not the anon key) to bypass Row Level Security
//   - Instantiated at module level as a singleton (no per-request cookie context)
//   - persistSession: false — webhook handlers have no user session to persist

import { createClient } from '@supabase/supabase-js'

/**
 * Validates that a required environment variable is set and non-empty.
 * Throws at module load time if the variable is missing — fail fast,
 * never silently proceed with an undefined key.
 */
function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Add it to .env.local for local development and to the Vercel Dashboard for production.`
    )
  }
  return value
}

/**
 * Supabase service-role client singleton.
 * Instantiated at module level so that missing env vars throw immediately
 * on import, not lazily on first use.
 */
export const supabaseService = createClient(
  getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
  getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
)
