/**
 * app/api/chatbot/[clientId]/whatsapp/route.ts
 *
 * WhatsApp webhook scaffold for 360dialog.
 * Tier enforcement: Gold+ required. Silver/Bronze clients receive 403.
 * Full implementation deferred to v2 per CONTEXT.md.
 *
 * TODO(v2): Full 360dialog WhatsApp flow
 *
 * CHAT-05 compliance.
 */

import { getChannelConfig, isChannelAllowed } from '@/lib/chatbot/channel-router'
import { parseWhatsAppWebhook } from '@/lib/chatbot/channels/whatsapp'

export const runtime = 'nodejs'

export async function POST(req: Request, { params }: { params: { clientId: string } }) {
  const { clientId } = params
  const config = await getChannelConfig(clientId)
  if (!isChannelAllowed(config, 'whatsapp')) {
    return Response.json({ error: 'WhatsApp channel requires Gold tier or higher.' }, { status: 403 })
  }
  // TODO(v2): Full 360dialog WhatsApp flow
  const msg = await parseWhatsAppWebhook(req)
  if (!msg) return Response.json({ error: 'Invalid WhatsApp webhook' }, { status: 400 })
  return Response.json({ status: 'received', messageId: msg.messageId, message: 'WhatsApp processing scaffold — full implementation in v2' })
}
