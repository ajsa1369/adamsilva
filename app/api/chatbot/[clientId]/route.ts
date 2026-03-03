/**
 * app/api/chatbot/[clientId]/route.ts
 *
 * Streaming chatbot API route — wires together:
 *   - getChatModel()    → Gemini 2.5 Flash Lite (NODE.js runtime for Supabase)
 *   - retrieveContext() → RAG retrieval from chatbot_knowledge table (pgvector)
 *   - chatbotTools      → 5 tool definitions registered in streamText
 *   - persistSession()  → session upsert to chatbot_sessions after each response
 *
 * CHAT-02 compliance: tools execute in conversation
 * CHAT-04 compliance: session persisted after each response
 *
 * Uses runtime='nodejs' (NOT 'edge') — required for Supabase createClient + session upsert.
 * Channel defaults to 'web' if not specified in request body.
 */

import { streamText, stepCountIs } from 'ai'
import type { ModelMessage } from '@ai-sdk/provider-utils'
import { createClient } from '@supabase/supabase-js'
import { getChatModel } from '@/lib/chatbot/model'
import { retrieveContext } from '@/lib/chatbot/retriever'
import { chatbotTools } from '@/lib/chatbot/tools'
import type { ChatChannel, ChatMessage, ChatOutcome } from '@/lib/chatbot/types'

export const runtime = 'nodejs'
export const maxDuration = 30

// ---------------------------------------------------------------------------
// POST handler — streaming chatbot response with RAG + session persistence
// ---------------------------------------------------------------------------

export async function POST(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> },
) {
  const { clientId } = await params
  const body = await req.json() as {
    messages: ModelMessage[]
    sessionId?: string
    channel?: ChatChannel
  }

  const { messages, sessionId, channel = 'web' } = body

  // Extract last user message for RAG retrieval
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === 'user')

  const lastUserText =
    typeof lastUserMessage?.content === 'string'
      ? lastUserMessage.content
      : Array.isArray(lastUserMessage?.content)
        ? (lastUserMessage.content as Array<{ type: string; text?: string }>)
            .filter((p) => p.type === 'text')
            .map((p) => p.text ?? '')
            .join(' ')
        : ''

  // RAG retrieval — non-fatal (returns '' if Supabase unavailable or embedding fails)
  const ragContext = await retrieveContext(clientId, lastUserText).catch(() => '')

  // Build system prompt with RAG context injection
  const systemPrompt = buildSystemPrompt(clientId, ragContext)

  // Stream response with onFinish for session persistence (CHAT-04)
  const result = await streamText({
    model: getChatModel(),
    system: systemPrompt,
    messages,
    tools: chatbotTools,
    stopWhen: stepCountIs(10),
    onFinish: async ({ text, toolCalls }) => {
      // Persist session after streaming completes — non-fatal
      await persistSession(clientId, sessionId, channel, messages, text, toolCalls ?? [])
    },
  })

  return result.toUIMessageStreamResponse()
}

// ---------------------------------------------------------------------------
// System prompt builder — injects RAG context block at end if non-empty
// ---------------------------------------------------------------------------

function buildSystemPrompt(clientId: string, ragContext: string): string {
  const base = `You are a helpful AI assistant for ${clientId}. You help website visitors with questions, job cost estimates, appointments, and lead capture.

When a visitor asks about pricing or costs, use the calculateJobCost tool.
For booking, use bookAppointment.
To capture lead info, use createCRMLead with crmType from client configuration.
If visitor is frustrated or needs human help, use escalateToHuman.
For order tracking, use lookupOrderStatus.`

  if (!ragContext) {
    return base
  }

  return `${base}

${ragContext}`
}

// ---------------------------------------------------------------------------
// persistSession — upsert session to chatbot_sessions after each response
// Non-fatal: wraps all operations in try/catch; logs errors, never throws.
// ---------------------------------------------------------------------------

async function persistSession(
  clientId: string,
  sessionId: string | undefined,
  channel: ChatChannel,
  incomingMessages: ModelMessage[],
  assistantText: string,
  toolCalls: Array<{
    toolName: string
    input: unknown
    output?: unknown
  }>,
): Promise<void> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      // No Supabase credentials — skip session persistence in dev
      return
    }

    const supabase = createClient(supabaseUrl, serviceKey)

    // Map incoming messages to ChatMessage[]
    const chatMessages: ChatMessage[] = incomingMessages.map((m) => {
      const role = m.role === 'user' ? 'user' : 'assistant'
      let content = ''
      if (typeof m.content === 'string') {
        content = m.content
      } else if (Array.isArray(m.content)) {
        content = (m.content as Array<{ type: string; text?: string }>)
          .filter((p) => p.type === 'text')
          .map((p) => p.text ?? '')
          .join(' ')
      }
      return { role, content, timestamp: new Date().toISOString() }
    })

    // Append assistant's final response as a ChatMessage
    const toolCallRecords = toolCalls.map((tc) => ({
      toolName: tc.toolName,
      input: (tc.input ?? {}) as Record<string, unknown>,
      output: (tc.output ?? {}) as Record<string, unknown>,
    }))

    chatMessages.push({
      role: 'assistant',
      content: assistantText,
      timestamp: new Date().toISOString(),
      toolCalls: toolCallRecords.length > 0 ? toolCallRecords : undefined,
    })

    // Determine outcome from tool calls
    let outcome: ChatOutcome | undefined
    let appointmentBooked: boolean | undefined
    let crmContactId: string | undefined

    for (const tc of toolCalls) {
      if (tc.toolName === 'escalateToHuman') {
        outcome = 'escalated'
      } else if (tc.toolName === 'bookAppointment') {
        const out = (tc.output ?? {}) as { success?: boolean }
        if (out.success) {
          outcome = 'booked'
          appointmentBooked = true
        }
      } else if (tc.toolName === 'createCRMLead') {
        const out = (tc.output ?? {}) as { success?: boolean; contactId?: string }
        if (out.success) {
          outcome = 'qualified'
          crmContactId = out.contactId
        }
      }
    }

    // Build upsert payload
    const payload: Record<string, unknown> = {
      client_id: clientId,
      channel,
      messages: chatMessages,
    }
    if (outcome !== undefined) payload.outcome = outcome
    if (appointmentBooked !== undefined) payload.appointment_booked = appointmentBooked
    if (crmContactId !== undefined) payload.crm_contact_id = crmContactId

    if (sessionId) {
      // Update existing session row — accumulate message history
      await supabase
        .from('chatbot_sessions')
        .upsert({ id: sessionId, ...payload }, { onConflict: 'id' })
    } else {
      // Insert new session row
      await supabase.from('chatbot_sessions').insert(payload)
    }
  } catch (err) {
    console.error('[chatbot/persistSession] Failed to persist session:', err)
    // Never throw — session persistence is non-fatal
  }
}
