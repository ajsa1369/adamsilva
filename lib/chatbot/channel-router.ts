/**
 * lib/chatbot/channel-router.ts
 *
 * Channel routing: derives allowed channels from clientId prefix convention.
 * In Phase 8, tier is derived from the clientId prefix (e.g. 'prime-acme-corp-xyz' → prime tier).
 * A full per-client mapping table (Supabase query) is Phase 9+ scope.
 *
 * All main tiers (Genesis/Essentials/Prime/Scale) have full channel access:
 * ['web','sms','voice','whatsapp']. Only legacy tiers have restrictions.
 */

import type { ChatChannel, ChatClientConfig } from './types'

// Tier → allowed channels mapping
// All main tiers get full channel access (same agent fleet, same channels)
const TIER_CHANNELS: Record<string, ChatChannel[]> = {
  genesis: ['web', 'sms', 'voice', 'whatsapp'],
  essentials: ['web', 'sms', 'voice', 'whatsapp'],
  prime: ['web', 'sms', 'voice', 'whatsapp'],
  scale: ['web', 'sms', 'voice', 'whatsapp'],
  'legacy-addon': ['web'],
  default: ['web', 'sms', 'voice', 'whatsapp'],
}

// Derive tier from package slug or clientId prefix
// Convention: clientId may embed tier info (e.g., 'prime-acme-corp-xyz')
// A full client-tier mapping table is Phase 9+ scope. For Phase 8, this
// clientId prefix convention is the authoritative tier source.
function slugToTier(slug: string): string {
  if (slug.includes('scale')) return 'scale'
  if (slug.includes('prime')) return 'prime'
  if (slug.includes('essentials')) return 'essentials'
  if (slug.includes('genesis')) return 'genesis'
  if (slug.includes('legacy')) return 'legacy-addon'
  return 'default'
}

// getChannelConfig: derives allowed channels from clientId prefix convention.
// No Supabase query in Phase 8 — tier comes from clientId string (e.g., 'prime-acme-xyz').
// Falls back to default (all channels) for any unrecognised clientId.
export async function getChannelConfig(clientId: string): Promise<ChatClientConfig> {
  const tierFromId = slugToTier(clientId.toLowerCase())
  const allowedChannels = TIER_CHANNELS[tierFromId] ?? ['web', 'sms', 'voice', 'whatsapp']

  return {
    clientId,
    packageTier: (tierFromId === 'default' ? 'genesis' : tierFromId) as ChatClientConfig['packageTier'],
    crmType: null,
    allowedChannels,
  }
}

// isChannelAllowed: synchronous check using pre-loaded config
export function isChannelAllowed(config: ChatClientConfig, channel: ChatChannel): boolean {
  return config.allowedChannels.includes(channel)
}
