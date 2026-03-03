---
phase: 08-site-chatbot-module
plan: 01
subsystem: api
tags: [chatbot, ai-sdk, gemini, pgvector, rag, supabase, typescript, crm]

# Dependency graph
requires:
  - phase: 04-agentic-intake-agent
    provides: "lib/intake/model.ts MODEL_PROVIDER routing pattern — mirrored exactly for getChatModel()"
  - phase: 02-supabase-schema-data-architecture
    provides: "chatbot_sessions table schema (channel/outcome CHECK constraints) used by ChatSession type"
provides:
  - "lib/chatbot/types.ts — 14 shared TypeScript contracts for all chatbot modules"
  - "lib/chatbot/model.ts — getChatModel() with Gemini 2.5 Flash Lite default via MODEL_PROVIDER routing"
  - "lib/chatbot/embedder.ts — embedText() via Google text-embedding-004, VECTOR_DIMENSIONS=768"
  - "lib/chatbot/retriever.ts — retrieveContext() pgvector cosine search, top-3 chunks as formatted string"
affects:
  - 08-02-migrations
  - 08-03-crm-adapters
  - 08-04-tools
  - 08-05-api-route
  - 08-06-channels
  - 08-07-widget

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "MODEL_PROVIDER routing pattern extended to chatbot (getChatModel mirrors getIntakeModel exactly)"
    - "Vercel AI SDK v6 embed() for embeddings — not @google/generative-ai directly"
    - "Graceful RAG fallback — retrieveContext returns '' on any error (embedding, RPC, missing env vars)"
    - "VECTOR_DIMENSIONS exported constant — migration 014 must use same value (768)"

key-files:
  created:
    - lib/chatbot/types.ts
    - lib/chatbot/model.ts
    - lib/chatbot/embedder.ts
    - lib/chatbot/retriever.ts
  modified: []

key-decisions:
  - "getChatModel() uses gemini-2.5-flash-lite-preview-06-17 as Google default — lowest latency for real-time chat (not gemini-2.0-flash used by intake)"
  - "VECTOR_DIMENSIONS=768 — Google text-embedding-004 natively outputs 768 dimensions; CONTEXT.md noted vector(1536) as default but specified to adjust for actual model output"
  - "retrieveContext() calls match_chatbot_knowledge RPC (created in Plan 02 migration 014) — pre-Plan-02 environments return '' gracefully"
  - "embedText() uses embed() from 'ai' package (Vercel AI SDK) not @google/generative-ai — consistent with project AI SDK pattern"
  - "CRMAdapter interface has createContact(lead: CRMLead): Promise<CRMResult> — all 10 CRM adapters in Plan 03 implement this exact signature"

patterns-established:
  - "Chatbot module root: lib/chatbot/ — all downstream plans import from here"
  - "Graceful degradation: any RAG error (missing env, embed failure, RPC error) returns '' — chatbot still works without knowledge base"
  - "OpenAI fallback uses gpt-4o-mini (not gpt-4o) — cost-optimized for chat latency"
  - "Anthropic fallback uses claude-haiku-4-5-20251001 — fastest Anthropic model for real-time chat"

requirements-completed: [CHAT-01, CHAT-02, CHAT-03]

# Metrics
duration: 2min
completed: 2026-03-03
---

# Phase 8 Plan 01: Site Chatbot Module — Foundation Summary

**Gemini 2.5 Flash Lite chatbot foundation: MODEL_PROVIDER-routed getChatModel(), Google text-embedding-004 embedder (768-dim), pgvector RAG retriever, and 14 shared TypeScript contracts for all downstream chatbot plans**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T06:26:24Z
- **Completed:** 2026-03-03T06:28:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `lib/chatbot/types.ts` with 14 exported interfaces covering channel/outcome types, message/session shapes, knowledge chunks, CRM adapter contract, 4 tool result shapes, and client config
- Created `lib/chatbot/model.ts` with `getChatModel()` using Gemini 2.5 Flash Lite as default — mirrors `getIntakeModel()` from Phase 4 exactly but with chat-optimized models
- Created `lib/chatbot/embedder.ts` with `embedText()` using Vercel AI SDK v6 `embed()` + Google text-embedding-004, exporting `VECTOR_DIMENSIONS=768` constant for migration alignment
- Created `lib/chatbot/retriever.ts` with `retrieveContext()` calling `match_chatbot_knowledge` Supabase RPC (Plan 02 migration 014), gracefully returning `''` on any error
- Zero TypeScript errors across all 4 files — `npx tsc --noEmit` exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/chatbot/types.ts — shared contracts** - `41d003c` (feat)
2. **Task 2: Create lib/chatbot/model.ts, embedder.ts, retriever.ts** - `debd7e1` (feat)

**Plan metadata:** (docs commit — see final commit)

## Files Created/Modified

- `lib/chatbot/types.ts` — 14 shared TypeScript contracts: ChatChannel, ChatOutcome, ChatMessage, ChatToolCall, ChatSession, KnowledgeChunk, CRMLead, CRMResult, CRMAdapter, BookAppointmentResult, CalculateJobCostResult, EscalateToHumanResult, LookupOrderStatusResult, ChatClientConfig
- `lib/chatbot/model.ts` — getChatModel() with MODEL_PROVIDER routing (Gemini 2.5 Flash Lite / gpt-4o-mini / claude-haiku-4-5-20251001)
- `lib/chatbot/embedder.ts` — embedText() + VECTOR_DIMENSIONS=768 exported constant
- `lib/chatbot/retriever.ts` — retrieveContext() pgvector cosine search via match_chatbot_knowledge RPC

## Decisions Made

- `getChatModel()` uses `gemini-2.5-flash-lite-preview-06-17` as the Google default (not `gemini-2.0-flash` used by intake agent) — chat requires lowest latency
- `VECTOR_DIMENSIONS=768` — Google text-embedding-004 natively outputs 768 dimensions; CONTEXT.md noted `vector(1536)` as a default but specified adjustment per actual model output
- OpenAI fallback is `gpt-4o-mini` (not `gpt-4o`) — cost-optimized for real-time chat use case
- Anthropic fallback is `claude-haiku-4-5-20251001` — fastest available Anthropic model
- `retrieveContext()` calls `match_chatbot_knowledge` RPC that Plan 02 migration 014 will create — pre-Plan-02 error handled as graceful empty return

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required for this foundational layer. Env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GOOGLE_GENERATIVE_AI_API_KEY) are already documented in .env.example from prior phases.

## Next Phase Readiness

- Plan 02 (migrations): Ready. `lib/chatbot/` types define exact DB column shapes. `VECTOR_DIMENSIONS=768` must be used in migration 014's `vector(768)` column definition and `match_chatbot_knowledge` function.
- Plan 03 (CRM adapters): Ready. `CRMAdapter` interface with `createContact(lead: CRMLead): Promise<CRMResult>` is the exact contract all 10 adapters implement.
- Plan 04 (tools): Ready. 4 tool result types (`BookAppointmentResult`, `CalculateJobCostResult`, `EscalateToHumanResult`, `LookupOrderStatusResult`) are pre-defined.
- All downstream plans: `getChatModel()`, `embedText()`, `retrieveContext()` are ready to import.

---
*Phase: 08-site-chatbot-module*
*Completed: 2026-03-03*
