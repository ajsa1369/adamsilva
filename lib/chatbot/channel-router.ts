/**
 * lib/chatbot/channel-router.ts
 *
 * Channel routing: derives allowed channels from clientId prefix convention.
 * In Phase 8, tier is derived from the clientId prefix (e.g. 'max-acme-corp-xyz' → max tier).
 * A full per-client mapping table (Supabase query) is Phase 9+ scope.
 *
 * CHAT-05 compliance: Starter/default=['web'], Pro=['web','sms'], Max/Elite=['web','sms','voice','whatsapp']
 */

import type { ChatChannel, ChatClientConfig } from './types'

// Tier → allowed channels mapping (CHAT-05 spec)
const TIER_CHANNELS: Record<string, ChatChannel[]> = {
  max: ['web', 'sms', 'voice', 'whatsapp'],
  elite: ['web', 'sms', 'voice', 'whatsapp'],
  pro: ['web', 'sms'],
  starter: ['web'],
  'legacy-addon': ['web'],
  default: ['web'],
}

// Derive tier from package slug or clientId prefix
// Convention: clientId may embed tier info (e.g., 'max-acme-corp-xyz')
// A full client-tier mapping table is Phase 9+ scope. For Phase 8, this
// clientId prefix convention is the authoritative tier source.
function slugToTier(slug: string): string {
  if (slug.includes('max')) return 'max'
  if (slug.includes('elite')) return 'elite'
  if (slug.includes('pro')) return 'pro'
  if (slug.includes('legacy')) return 'legacy-addon'
  if (slug.includes('starter')) return 'starter'
  return 'default'
}

// getChannelConfig: derives allowed channels from clientId prefix convention.
// No Supabase query in Phase 8 — tier comes from clientId string (e.g., 'pro-acme-xyz').
// Falls back to starter (['web'] only) for any unrecognised clientId.
export async function getChannelConfig(clientId: string): Promise<ChatClientConfig> {
  const tierFromId = slugToTier(clientId.toLowerCase())
  const allowedChannels = TIER_CHANNELS[tierFromId] ?? ['web']

  return {
    clientId,
    packageTier: (tierFromId === 'default' ? 'starter' : tierFromId) as ChatClientConfig['packageTier'],
    crmType: null,
    allowedChannels,
  }
}

// isChannelAllowed: synchronous check using pre-loaded config
export function isChannelAllowed(config: ChatClientConfig, channel: ChatChannel): boolean {
  return config.allowedChannels.includes(channel)
}
