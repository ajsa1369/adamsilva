/**
 * lib/chatbot/channels/sms.ts
 *
 * Inbound SMS handler for Twilio and Vonage webhook formats.
 * Twilio sends application/x-www-form-urlencoded; Vonage sends JSON.
 *
 * CHAT-05 compliance: Silver+ tier required (enforced in API route).
 */

export interface SMSMessage {
  from: string
  body: string
  messageId: string
  provider: 'twilio' | 'vonage'
}

export async function parseSMSWebhook(req: Request): Promise<SMSMessage | null> {
  const contentType = req.headers.get('content-type') ?? ''

  if (contentType.includes('application/x-www-form-urlencoded')) {
    // Twilio format
    const text = await req.text()
    const params = new URLSearchParams(text)
    const from = params.get('From') ?? ''
    const body = params.get('Body') ?? ''
    const messageId = params.get('MessageSid') ?? ''
    if (!from || !body) return null
    return { from, body, messageId, provider: 'twilio' }
  }

  if (contentType.includes('application/json')) {
    // Vonage format
    const data = await req.json() as { from?: string; text?: string; messageId?: string }
    if (!data.from || !data.text) return null
    return { from: data.from, body: data.text, messageId: data.messageId ?? '', provider: 'vonage' }
  }

  return null
}

export function buildSMSResponse(text: string, provider: 'twilio' | 'vonage'): Response {
  if (provider === 'twilio') {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${text}</Message></Response>`
    return new Response(twiml, { headers: { 'Content-Type': 'text/xml' } })
  }
  return Response.json({ message: text })
}
