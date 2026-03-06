/**
 * app/api/chatbot/[clientId]/voice/route.ts
 *
 * Voice webhook scaffold for Bland.ai / Vapi.
 * Tier enforcement: Max+ required. Pro/Starter clients receive 403.
 * Full implementation deferred to v2 per CONTEXT.md.
 *
 * TODO(v2): Full Bland.ai/Vapi voice flow
 *
 * CHAT-05 compliance.
 */

import { getChannelConfig, isChannelAllowed } from '@/lib/chatbot/channel-router'
import { parseVoiceWebhook } from '@/lib/chatbot/channels/voice'

export const runtime = 'nodejs'

export async function POST(req: Request, { params }: { params: { clientId: string } }) {
  const { clientId } = params
  const config = await getChannelConfig(clientId)
  if (!isChannelAllowed(config, 'voice')) {
    return Response.json({ error: 'Voice channel requires Max tier or higher.' }, { status: 403 })
  }
  // TODO(v2): Full Bland.ai/Vapi voice flow
  const payload = await parseVoiceWebhook(req)
  if (!payload) return Response.json({ error: 'Invalid voice webhook' }, { status: 400 })
  // Scaffold response — real implementation in v2
  return Response.json({ status: 'received', callId: payload.callId, message: 'Voice processing scaffold — full implementation in v2' })
}
