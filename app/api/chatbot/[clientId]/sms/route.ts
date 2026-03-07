/**
 * app/api/chatbot/[clientId]/sms/route.ts
 *
 * Inbound SMS webhook for Twilio and Vonage.
 * Tier enforcement: all main tiers (Genesis+) include SMS.
 * Uses generateText() (non-streaming) — SMS needs a plain string, not SSE stream.
 *
 * CHAT-05 compliance.
 */

import { generateText, stepCountIs } from 'ai'
import { getChatModel } from '@/lib/chatbot/model'
import { retrieveContext } from '@/lib/chatbot/retriever'
import { chatbotTools } from '@/lib/chatbot/tools'
import { getChannelConfig, isChannelAllowed } from '@/lib/chatbot/channel-router'
import { parseSMSWebhook, buildSMSResponse } from '@/lib/chatbot/channels/sms'

export const runtime = 'nodejs'

export async function POST(req: Request, { params }: { params: { clientId: string } }) {
  const { clientId } = params

  // Tier enforcement: all main tiers include SMS
  const config = await getChannelConfig(clientId)
  if (!isChannelAllowed(config, 'sms')) {
    return Response.json({ error: 'SMS channel not available on your plan.' }, { status: 403 })
  }

  const smsMsg = await parseSMSWebhook(req)
  if (!smsMsg) {
    return Response.json({ error: 'Invalid SMS webhook payload' }, { status: 400 })
  }

  // Retrieve RAG context for the inbound message
  const ragContext = await retrieveContext(clientId, smsMsg.body)

  const systemPrompt = [
    `You are a helpful AI assistant for ${clientId}. Reply concisely — SMS has a 160-character limit.`,
    ragContext,
  ].filter(Boolean).join('\n\n')

  // Use generateText (non-streaming) — SMS needs a plain string, not an SSE stream
  let replyText: string
  try {
    const { text } = await generateText({
      model: getChatModel(),
      system: systemPrompt,
      messages: [{ role: 'user', content: smsMsg.body }],
      tools: chatbotTools,
      stopWhen: stepCountIs(5),
    })
    replyText = text.slice(0, 160)  // SMS 160-char limit
  } catch (err) {
    console.error('SMS generateText failed:', err)
    replyText = 'Thank you for your message. We will get back to you shortly.'
  }

  return buildSMSResponse(replyText || 'Thank you for your message. We will get back to you shortly.', smsMsg.provider)
}
