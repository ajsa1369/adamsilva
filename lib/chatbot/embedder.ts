/**
 * lib/chatbot/embedder.ts
 *
 * Text embedding via Vercel AI SDK v6 embed() using Google text-embedding-004.
 * CHAT-02 compliance: embedText() returns Promise<number[]>.
 *
 * VECTOR_DIMENSIONS = 768:
 *   Google text-embedding-004 natively outputs 768 dimensions.
 *   CONTEXT.md noted vector(1536) as a default but specified "if Google
 *   text-embedding-004 returns 768, adjust accordingly — make configurable
 *   constant." Migration 014_chatbot_knowledge.sql uses this same constant
 *   (vector(768)) — must match exactly.
 */

import { embed } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI()

// VECTOR_DIMENSIONS must match migration 014_chatbot_knowledge.sql
// Google text-embedding-004 outputs 768 dimensions by default
// Using 768 here — migration uses vector(768)
export const VECTOR_DIMENSIONS = 768

export async function embedText(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004'),
    value: text,
  })
  return embedding
}
