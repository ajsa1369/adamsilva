---
phase: 04-agentic-intake-agent
plan: "02"
subsystem: api
tags: [next.js, vercel-ai-sdk, streaming, edge-runtime, tool-calling, intake, gemini]

# Dependency graph
requires:
  - phase: 04-agentic-intake-agent/04-01
    provides: lib/intake/model.ts (getIntakeModel), lib/intake/tools.ts (intakeTools)

provides:
  - app/api/intake/chat/route.ts — POST streaming endpoint for intake agent

affects:
  - 04-03 (UI page — connects to this route via DefaultChatTransport)
  - 04-05 (PDF route — Step 6 system prompt references /api/intake/pdf)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ai@6 route: stopWhen: stepCountIs(N) replaces maxSteps"
    - "ai@6 route: result.toUIMessageStreamResponse() replaces toDataStreamResponse()"
    - "ai@6 messages type: ModelMessage[] from @ai-sdk/provider-utils"
    - "Edge function pattern: export const runtime = 'edge', maxDuration = 60"
    - "All side effects (DB, email, CRM) live in tool.execute — not onFinish"

key-files:
  created:
    - "app/api/intake/chat/route.ts — POST streaming route with 6-step system prompt and 5 tools"
  modified: []

key-decisions:
  - "No onFinish callback — proposal persistence, email, and CRM all wired in saveToCRMTool.execute"
  - "maxDuration=60 needed for multi-step tool-calling chains to complete"
  - "stepCountIs(15) allows up to 15 tool call + response cycles per conversation turn"
  - "ModelMessage[] type import from @ai-sdk/provider-utils for strict typing of messages array"
  - "System prompt hardcodes location and lead midpoints for deterministic calculateProposal calls"

patterns-established:
  - "ai@6 streaming route: streamText + stopWhen + toUIMessageStreamResponse"
  - "Tool orchestration via system prompt instructions (Step 6 sequences generateProposalPDF before saveToCRM)"

requirements-completed:
  - INTAKE-03
  - INTAKE-04
  - INTAKE-09

# Metrics
duration: 6min
completed: 2026-03-02
---

# Phase 4 Plan 02: Streaming Intake Chat Route Summary

**POST /api/intake/chat streaming edge route with 6-step system prompt, all 5 intake tools, and ai@6 stopWhen/toUIMessageStreamResponse API**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-03-02T22:54:00Z
- **Completed:** 2026-03-02T23:00:00Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments
- Created `app/api/intake/chat/route.ts` — edge-compatible streaming endpoint
- System prompt covers all 6 intake steps, legacy platform branch, all 4 LOCKED edge cases
- Step 6 explicitly sequences `generateProposalPDF` then `saveToCRM` with pdfUrl
- No `onFinish` callback — avoids INTAKE-05/06 blocker where prospect fields are unavailable

## Task Commits

Each task was committed atomically:

1. **Task 1: Create app/api/intake/chat/route.ts** - `a32b801` (feat)

**Plan metadata:** `(see docs commit)` (docs: complete plan)

## Files Created/Modified
- `app/api/intake/chat/route.ts` — POST streaming route, edge runtime, 60s maxDuration, 5 tools, 6-step system prompt

## Decisions Made
- No `onFinish` callback: all side effects (Supabase insert, email, CRM webhook) live inside `saveToCRMTool.execute` which has full access to prospect data from tool input
- `stepCountIs(15)` chosen to accommodate the full 6-step flow with multiple tool calls per step

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ai@6 deprecated `maxSteps` → `stopWhen: stepCountIs(N)`**
- **Found during:** Task 1 (TypeScript check)
- **Issue:** Plan specified `maxSteps: 15` — removed in ai@6, replaced by `stopWhen` condition
- **Fix:** Imported `stepCountIs` from `ai`, changed `maxSteps: 15` to `stopWhen: stepCountIs(15)`
- **Files modified:** `app/api/intake/chat/route.ts`
- **Verification:** TypeScript check exits 0
- **Committed in:** a32b801

**2. [Rule 1 - Bug] ai@6 `toDataStreamResponse()` → `toUIMessageStreamResponse()`**
- **Found during:** Task 1 (TypeScript check)
- **Issue:** Plan used `result.toDataStreamResponse()` — renamed in ai@6
- **Fix:** Updated to `result.toUIMessageStreamResponse()` (ai@6 method for useChat-compatible streaming)
- **Files modified:** `app/api/intake/chat/route.ts`
- **Verification:** TypeScript check exits 0
- **Committed in:** a32b801

---

**Total deviations:** 2 auto-fixed (both Rule 1 — ai@6 API renames)
**Impact on plan:** Both renames required for compatibility. No scope creep.

## Issues Encountered
None — after ai@6 API fixes, route compiles cleanly.

## Next Phase Readiness
- `/api/intake/chat` POST endpoint ready
- Returns `toUIMessageStreamResponse()` compatible with `@ai-sdk/react` `useChat` (04-03 page)
- All 5 tools registered and ready to call lib/intake/tools.ts implementations

---
*Phase: 04-agentic-intake-agent*
*Completed: 2026-03-02*
