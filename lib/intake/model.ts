/**
 * lib/intake/model.ts
 *
 * MODEL_PROVIDER routing for the intake agent.
 * NEVER hardcode an LLM provider — always resolve from process.env.MODEL_PROVIDER.
 * INTAKE-09 compliance: all AI calls go through this function.
 */

import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import type { LanguageModel } from 'ai'

export function getIntakeModel(): LanguageModel {
  const provider = process.env.MODEL_PROVIDER ?? 'anthropic'
  if (provider === 'openai') {
    return createOpenAI()('gpt-4o')
  }
  return createAnthropic()('claude-sonnet-4-5-20251001')
}
