/**
 * lib/chatbot/channel-router.ts
 *
 * Channel routing: derives allowed channels from clientId prefix convention.
 * In Phase 8, tier is derived from the clientId prefix (e.g. 'gold-acme-corp-xyz' → gold tier).
 * A full per-client mapping table (Supabase query) is Phase 9+ scope.
 *
 * CHAT-05 compliance: Bronze/default=['web'], Silver=['web','sms'], Gold/Core=['web','sms','voice','whatsapp']
 */

import type { ChatChannel, ChatClientConfig } from './types'

// Tier → allowed channels mapping (CHAT-05 spec)
const TIER_CHANNELS: Record<string, ChatChannel[]> = {
  gold: ['web', 'sms', 'voice', 'whatsapp'],
  core: ['web', 'sms', 'voice', 'whatsapp'],
  silver: ['web', 'sms'],
  bronze: ['web'],
  'legacy-addon': ['web'],
  default: ['web'],
}

// Derive tier from package slug or clientId prefix
// Convention: clientId may embed tier info (e.g., 'gold-acme-corp-xyz')
// A full client-tier mapping table is Phase 9+ scope. For Phase 8, this
// clientId prefix convention is the authoritative tier source.
function slugToTier(slug: string): string {
  if (slug.includes('gold')) return 'gold'
  if (slug.includes('core')) return 'core'
  if (slug.includes('silver')) return 'silver'
  if (slug.includes('legacy')) return 'legacy-addon'
  if (slug.includes('bronze')) return 'bronze'
  return 'default'
}

// getChannelConfig: derives allowed channels from clientId prefix convention.
// No Supabase query in Phase 8 — tier comes from clientId string (e.g., 'silver-acme-xyz').
// Falls back to bronze (['web'] only) for any unrecognised clientId.
export async function getChannelConfig(clientId: string): Promise<ChatClientConfig> {
  const tierFromId = slugToTier(clientId.toLowerCase())
  const allowedChannels = TIER_CHANNELS[tierFromId] ?? ['web']

  return {
    clientId,
    packageTier: (tierFromId === 'default' ? 'bronze' : tierFromId) as ChatClientConfig['packageTier'],
    crmType: null,
    allowedChannels,
  }
}

// isChannelAllowed: synchronous check using pre-loaded config
export function isChannelAllowed(config: ChatClientConfig, channel: ChatChannel): boolean {
  return config.allowedChannels.includes(channel)
}
