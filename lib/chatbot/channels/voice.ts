/**
 * lib/chatbot/channels/voice.ts
 *
 * Voice channel handler scaffold for Bland.ai / Vapi.
 * Credentials deferred per CONTEXT.md — full implementation in v2.
 *
 * TODO(v2): Implement Bland.ai/Vapi voice webhook
 * BLAND_AI_API_KEY or VAPI_API_KEY required
 * Scaffold: parse incoming voice call webhook, convert speech-to-text, call chatbot API, TTS response
 *
 * CHAT-05 compliance: Gold+ tier required (enforced in API route).
 */

export interface VoiceWebhookPayload {
  callId: string
  from: string
  transcript?: string
  provider: 'bland' | 'vapi'
}

export async function parseVoiceWebhook(req: Request): Promise<VoiceWebhookPayload | null> {
  // TODO(v2): Detect provider from headers, parse call payload
  try {
    const data = await req.json() as Partial<VoiceWebhookPayload>
    return { callId: data.callId ?? '', from: data.from ?? '', transcript: data.transcript, provider: data.provider ?? 'bland' }
  } catch {
    return null
  }
}
