---
phase: 08-site-chatbot-module
plan: 02
subsystem: database
tags: [supabase, pgvector, vector-embeddings, rag, google-ai, sha256, knowledge-base]

# Dependency graph
requires:
  - phase: 08-01
    provides: embedText() from lib/chatbot/embedder.ts — used by seed route

provides:
  - supabase/migrations/014_chatbot_knowledge.sql — chatbot_knowledge pgvector table + IVFFlat index + RLS + match_chatbot_knowledge() RPC function
  - app/api/chatbot/[clientId]/seed/route.ts — knowledge seeding API with SHA-256 dedup, embedding via embedText(), Supabase upsert

affects:
  - 08-01 (retriever.ts calls match_chatbot_knowledge RPC — now the function exists)
  - 08-03 (chatbot API route depends on RAG pipeline being ready)
  - 08-04 (channels depend on chatbot_knowledge being seeded)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - SHA-256 content hash for idempotent knowledge chunk deduplication
    - IVFFlat index with vector_cosine_ops and lists=100 for pgvector ANN search
    - Non-fatal per-chunk error handling — seed route continues on single embedding failure

key-files:
  created:
    - supabase/migrations/014_chatbot_knowledge.sql
    - app/api/chatbot/[clientId]/seed/route.ts
  modified: []

key-decisions:
  - "vector(768) matches Google text-embedding-004 native output (VECTOR_DIMENSIONS constant in embedder.ts)"
  - "IVFFlat lists=100 — appropriate for tables under 1M rows per pgvector recommendation"
  - "RLS service_role_all policy — chatbot knowledge is backend-only, never public-readable"
  - "CHATBOT_SEED_SECRET optional auth — dev convenience without env var, secured in production"
  - "Non-fatal chunk errors: embedding failures increment errors counter, loop continues"
  - "SHA-256 dedup pre-check before embed — avoids unnecessary Google AI API calls for known chunks"

patterns-established:
  - "pgvector IVFFlat pattern: embedding column vector(N) + ivfflat index with vector_cosine_ops + lists=100"
  - "Knowledge seeding: content_hash dedup check → embed → upsert with onConflict ignoreDuplicates"

requirements-completed: [CHAT-04]

# Metrics
duration: 2min
completed: 2026-03-03
---

# Phase 8 Plan 02: Chatbot Knowledge Base Summary

**pgvector chatbot_knowledge table with IVFFlat cosine index, match_chatbot_knowledge() RPC, and knowledge seeding API with SHA-256 hash deduplication**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T06:26:38Z
- **Completed:** 2026-03-03T06:28:38Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created migration 014_chatbot_knowledge.sql with pgvector table, IVFFlat ANN index, RLS, and match_chatbot_knowledge() SQL function used by retriever.ts
- Created POST /api/chatbot/[clientId]/seed route that embeds content chunks via embedText() and upserts with SHA-256 hash-based deduplication
- TypeScript compiles with zero errors across both new files

## Task Commits

Each task was committed atomically:

1. **Task 1: Create migration 014_chatbot_knowledge.sql** - `e7a3900` (feat)
2. **Task 2: Create POST /api/chatbot/[clientId]/seed route** - `634cace` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `supabase/migrations/014_chatbot_knowledge.sql` - pgvector table, IVFFlat index, RLS policy, match_chatbot_knowledge() cosine similarity RPC function
- `app/api/chatbot/[clientId]/seed/route.ts` - Knowledge seeding POST handler with SHA-256 dedup, embedText() embedding, Supabase upsert

## Decisions Made
- vector(768) used to match Google text-embedding-004 native output (same constant as VECTOR_DIMENSIONS in embedder.ts)
- IVFFlat lists=100 chosen as safe default for tables under 1M rows per pgvector docs
- RLS service_role_all policy — knowledge base is backend-only, never public-readable
- SHA-256 dedup pre-check occurs before embedding call — avoids wasteful API calls for already-known chunks
- CHATBOT_SEED_SECRET auth is optional — if env var absent, auth check is skipped for dev convenience; enforced in production
- Per-chunk non-fatal error handling: single embedding failure increments errors counter, loop continues to next chunk

## Deviations from Plan

None - plan executed exactly as written.

(Note: lib/chatbot/types.ts, model.ts, embedder.ts, retriever.ts — Plan 01 files — were found pre-existing on disk but untracked in git. They were not recreated; Plan 02's seed route imports embedder.ts which already existed correctly.)

## Issues Encountered
None.

## User Setup Required
- Add `CHATBOT_SEED_SECRET` to .env.local for production seeding auth
- Apply migration 014_chatbot_knowledge.sql to Supabase: `supabase db push` or via Supabase dashboard SQL editor

## Next Phase Readiness
- match_chatbot_knowledge() RPC function now exists — retriever.ts (Plan 01) can call it successfully
- chatbot_knowledge table ready for seeding via POST /api/chatbot/[clientId]/seed
- Plan 03 (CRM adapters) can proceed — no dependency on knowledge base
- Plan 04 (chatbot API route) can proceed — RAG pipeline (embedder + retriever + knowledge table) is complete

---
*Phase: 08-site-chatbot-module*
*Completed: 2026-03-03*

## Self-Check: PASSED

- FOUND: supabase/migrations/014_chatbot_knowledge.sql
- FOUND: app/api/chatbot/[clientId]/seed/route.ts
- FOUND: .planning/phases/08-site-chatbot-module/08-02-SUMMARY.md
- FOUND commit: e7a3900 (feat: migration 014_chatbot_knowledge.sql)
- FOUND commit: 634cace (feat: seed route)
