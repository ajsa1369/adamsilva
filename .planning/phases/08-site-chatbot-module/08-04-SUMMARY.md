---
phase: 08-site-chatbot-module
plan: 04
subsystem: api
tags: [vercel-ai-sdk, streaming, gemini, supabase, rag, tool-calling, chatbot]

# Dependency graph
requires:
  - phase: 08-01
    provides: getChatModel(), retrieveContext(), ChatSession/ChatMessage/ChatChannel types
  - phase: 08-03
    provides: chatbotTools (5 tools: bookAppointment, calculateJobCost, createCRMLead, escalateToHuman, lookupOrderStatus)
  - phase: 08-02
    provides: chatbot_sessions table schema, chatbot_knowledge pgvector RPC
provides:
  - POST /api/chatbot/[clientId] — streaming chatbot route with RAG + session persistence + tool calling
affects: [08-05, 08-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - onFinish callback for non-fatal post-stream side effects (session persistence)
    - TypedToolCall<tools> with input:unknown — cast to Record<string,unknown> before JSONB storage
    - Channel defaults to 'web' — all non-web channels handled by same route via clientId

key-files:
  created:
    - app/api/chatbot/[clientId]/route.ts
  modified: []

key-decisions:
  - "runtime='nodejs' not 'edge' — Supabase createClient + session upsert requires Node.js runtime (edge has no Supabase REST client support)"
  - "onFinish callback for persistSession — mirrors correct pattern; session written after stream completes, never blocks streaming response"
  - "TypedToolCall input is unknown not Record<string,unknown> — ai@6 toolCalls from onFinish use unknown input type; cast on write to JSONB"
  - "persistSession non-fatal — entire function wrapped in try/catch; session loss never crashes the chat response"
  - "Outcome detection priority: escalateToHuman=escalated > bookAppointment.success=booked > createCRMLead.success=qualified (last write wins for multi-tool turns)"
  - "RAG retrieval .catch(() => '') — double-wrapped non-fatal; retrieveContext already handles errors but .catch at call site ensures no unhandled rejection"
  - "Channel defaults to 'web' if not specified — plan spec requirement; embed script (Plan 06) will always send explicit channel"

patterns-established:
  - "Dynamic route segment extraction via await params — Next.js 14 App Router pattern for [clientId] segment"
  - "Last user message extraction: reverse().find(role==='user') — correct for multi-turn message arrays"
  - "Content extraction for both string and parts[] format — handles ModelMessage content as string or array of typed parts"

requirements-completed: [CHAT-02, CHAT-04]

# Metrics
duration: 1min
completed: 2026-03-03
---

# Phase 8 Plan 04: Chatbot Streaming API Route Summary

**POST /api/chatbot/[clientId] streaming route with Gemini 2.5 Flash Lite, RAG injection, 5 chatbot tools, and non-fatal Supabase session persistence via onFinish**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-03T06:39:45Z
- **Completed:** 2026-03-03T06:40:47Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `app/api/chatbot/[clientId]/route.ts` — streaming POST handler with Node.js runtime (not edge) for Supabase compatibility
- Wired getChatModel() + retrieveContext() + chatbotTools + persistSession() into single streamText call
- Session persistence via onFinish callback — upserts chatbot_sessions with full message history, tool call records, and outcome detection (escalated/booked/qualified)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create app/api/chatbot/[clientId]/route.ts** - `6b3e8c6` (feat)

**Plan metadata:** (docs commit — see final commit hash after state update)

## Files Created/Modified

- `app/api/chatbot/[clientId]/route.ts` — Streaming chatbot API: getChatModel, retrieveContext RAG, chatbotTools x5, persistSession with chatbot_sessions upsert

## Decisions Made

- `runtime='nodejs'` not `'edge'` — Supabase createClient + session upsert requires Node.js runtime; intake/chat/route.ts uses edge because it has no Supabase writes
- `onFinish` callback for `persistSession` — session written after stream completes; non-fatal try/catch ensures session failure never blocks the chat response
- TypedToolCall `input` is `unknown` in ai@6 `onFinish` — cast to `Record<string,unknown>` only at JSONB storage boundary
- Outcome detection: last-write-wins for multi-tool turns (escalateToHuman takes priority via loop order)
- `.catch(() => '')` on `retrieveContext` call site as additional safety net — retrieveContext already handles errors internally but defense-in-depth at boundary

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypedToolCall input type mismatch**
- **Found during:** Task 1 (TypeScript compile check)
- **Issue:** persistSession parameter declared `input: Record<string,unknown>` but ai@6 TypedToolCall uses `input: unknown` — TypeScript error TS2345
- **Fix:** Changed persistSession parameter type to `input: unknown`; cast to `Record<string,unknown>` only at JSONB storage site
- **Files modified:** app/api/chatbot/[clientId]/route.ts
- **Verification:** `npx tsc --noEmit` exits 0
- **Committed in:** 6b3e8c6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — type bug)
**Impact on plan:** Necessary type fix for ai@6 compatibility. No scope creep.

## Issues Encountered

- ai@6 TypedToolCall has `input: unknown` not `Record<string,unknown>` in onFinish callback — auto-fixed per Rule 1

## User Setup Required

None - no external service configuration required beyond env vars already documented.

## Next Phase Readiness

- Streaming chatbot API route complete — ready for Plan 05 (client config loading, channel routing) and Plan 06 (embed script)
- Route at `/api/chatbot/[clientId]` — embed script (Plan 06) will POST to this exact URL pattern
- Session persistence operational — chatbot_sessions accumulates message history per sessionId

---
*Phase: 08-site-chatbot-module*
*Completed: 2026-03-03*

## Self-Check: PASSED

- FOUND: app/api/chatbot/[clientId]/route.ts
- FOUND: commit 6b3e8c6
