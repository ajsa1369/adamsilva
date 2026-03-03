/**
 * lib/chatbot/retriever.ts
 *
 * RAG retriever — queries Supabase chatbot_knowledge table using pgvector
 * cosine distance ordering (<=> operator). Returns top-3 content chunks
 * formatted as a CONTEXT block string for injection into the system prompt.
 *
 * CHAT-03 compliance: retrieveContext() returns Promise<string>.
 *
 * Note: The match_chatbot_knowledge RPC function is created in migration 014
 * (Plan 02). If it does not exist in the current environment (pre-Plan-02),
 * the call will return an error which is handled gracefully (returns '').
 */

import { createClient } from '@supabase/supabase-js'
import { embedText } from './embedder'

// Returns top-3 knowledge chunks for a client as a formatted CONTEXT string
// for injection into the chatbot system prompt (RAG pipeline step 3)
export async function retrieveContext(
  clientId: string,
  query: string,
): Promise<string> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return '' // No RAG if Supabase not configured (dev without env vars)
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  let embedding: number[]
  try {
    embedding = await embedText(query)
  } catch {
    return '' // Non-fatal: return empty context if embedding fails
  }

  const { data, error } = await supabase.rpc('match_chatbot_knowledge', {
    query_embedding: embedding,
    match_client_id: clientId,
    match_count: 3,
  })

  if (error || !data || data.length === 0) {
    return ''
  }

  const chunks = (data as Array<{ content: string; source: string }>)
    .map((row, i) => `[${i + 1}] ${row.content} (source: ${row.source})`)
    .join('\n\n')

  return `CONTEXT FROM KNOWLEDGE BASE:\n${chunks}\n\nAnswer using the above context where relevant.`
}
