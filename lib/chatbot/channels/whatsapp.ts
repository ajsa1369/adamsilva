/**
 * lib/chatbot/channels/whatsapp.ts
 *
 * WhatsApp channel handler scaffold for 360dialog.
 * Credentials deferred per CONTEXT.md — full implementation in v2.
 *
 * TODO(v2): Implement 360dialog WhatsApp webhook
 * DIALOG360_API_KEY required
 * Scaffold: parse WhatsApp message webhook, extract text, call chatbot API, send reply
 *
 * CHAT-05 compliance: Gold+ tier required (enforced in API route).
 */

export interface WhatsAppMessage {
  from: string
  body: string
  messageId: string
}

export async function parseWhatsAppWebhook(req: Request): Promise<WhatsAppMessage | null> {
  // TODO(v2): 360dialog webhook format
  try {
    const data = await req.json() as {
      messages?: Array<{ from: string; text?: { body: string }; id: string }>
    }
    const msg = data.messages?.[0]
    if (!msg) return null
    return { from: msg.from, body: msg.text?.body ?? '', messageId: msg.id }
  } catch {
    return null
  }
}
