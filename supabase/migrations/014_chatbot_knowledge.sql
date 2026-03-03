-- Phase 8: Chatbot knowledge base — pgvector RAG
-- Depends on: pgvector extension (enable idempotently)
-- Vector dimensions: 768 (Google text-embedding-004 native output)

-- Enable pgvector (idempotent — safe to run even if already enabled)
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge chunks table
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    TEXT         NOT NULL,
  content      TEXT         NOT NULL,
  metadata     JSONB        NOT NULL DEFAULT '{}'::jsonb,
  source       TEXT         NOT NULL DEFAULT 'manual',
  content_hash TEXT         NOT NULL,   -- SHA-256 hex of content, used for dedup upsert
  embedding    vector(768),             -- Google text-embedding-004 (768 dims)
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Deduplication constraint: one chunk per (client_id, content_hash)
CREATE UNIQUE INDEX IF NOT EXISTS idx_chatbot_knowledge_dedup
  ON chatbot_knowledge(client_id, content_hash);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_client_id
  ON chatbot_knowledge(client_id);

-- IVFFlat ANN index for cosine similarity search
-- lists=100 is appropriate for tables under 1M rows
CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_embedding
  ON chatbot_knowledge USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- RLS: service role only (chatbot backend writes; never public)
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON chatbot_knowledge
  FOR ALL USING (auth.role() = 'service_role');

-- match_chatbot_knowledge: returns top-N chunks for a client by cosine similarity
-- Called by lib/chatbot/retriever.ts via supabase.rpc('match_chatbot_knowledge', ...)
CREATE OR REPLACE FUNCTION match_chatbot_knowledge(
  query_embedding vector(768),
  match_client_id text,
  match_count     int DEFAULT 3
)
RETURNS TABLE(id uuid, content text, source text, metadata jsonb, similarity float)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    content,
    source,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
  FROM chatbot_knowledge
  WHERE client_id = match_client_id
    AND embedding IS NOT NULL
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
