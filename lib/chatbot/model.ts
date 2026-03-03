/**
 * lib/chatbot/model.ts
 *
 * MODEL_PROVIDER routing for the chatbot agent.
 * NEVER hardcode an LLM provider — always resolve from process.env.MODEL_PROVIDER.
 * CHAT-01 compliance: mirrors lib/intake/model.ts pattern exactly.
 *
 * Default: Gemini 2.5 Flash Lite — lowest latency for real-time chat.
 */

import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import type { LanguageModel } from 'ai'

// CHAT-01 compliance: MODEL_PROVIDER routing — never hardcoded
// Default: Gemini 2.5 Flash Lite — lowest latency for real-time chat
export function getChatModel(): LanguageModel {
  const provider = process.env.MODEL_PROVIDER ?? 'google'
  if (provider === 'openai') {
    return createOpenAI()('gpt-4o-mini') // fast + cheap fallback
  }
  if (provider === 'anthropic') {
    return createAnthropic()('claude-haiku-4-5-20251001') // fast fallback
  }
  // Default: Google Gemini 2.5 Flash Lite — fastest, lowest cost
  return createGoogleGenerativeAI()('gemini-2.5-flash-lite-preview-06-17')
}
