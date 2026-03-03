---
phase: 05-topical-authority-map-agent
plan: 01
subsystem: api
tags: [ai-sdk, gemini, mcp, typescript, authority-map, content-strategy, google-search]

# Dependency graph
requires:
  - phase: 04-agentic-intake-agent
    provides: getIntakeModel() from lib/intake/model.ts — MODEL_PROVIDER routing reused for NotebookLM path
provides:
  - lib/authority-map/types.ts — AuthorityMapTopic, AuthorityMapResult, ClientConfig interfaces
  - lib/authority-map/researcher.ts — generateAuthorityMap() dual-provider function, RESEARCHER_SYSTEM_PROMPT, NOTEBOOKLM_SYSTEM_PROMPT
affects: [05-02-PLAN, plan-02-authority-map-api-route]

# Tech tracking
tech-stack:
  added:
    - "@ai-sdk/mcp@1.0.23 — MCP client for NotebookLM SSE transport"
  patterns:
    - "Dual-provider pattern: primary MCP path gated by env var, fallback to direct AI provider"
    - "experimental_createMCPClient from @ai-sdk/mcp (not ai) in ai@6 — MCP package was extracted"
    - "google.tools.googleSearch({}) requires empty object argument — ProviderToolFactory ARGS must be passed"
    - "getIntakeModel() reused from Phase 4 to honor MODEL_PROVIDER env var — never hardcode provider"

key-files:
  created:
    - lib/authority-map/types.ts
    - lib/authority-map/researcher.ts
  modified:
    - package.json

key-decisions:
  - "experimental_createMCPClient imported from @ai-sdk/mcp not ai — it was extracted to a separate package in ai@6"
  - "google.tools.googleSearch({}) called with empty object — ProviderToolFactory signature requires options arg even if all fields optional"
  - "generateWithNotebookLM reuses getIntakeModel() from Phase 4 to honor MODEL_PROVIDER env var"
  - "NOTEBOOKLM_SYSTEM_PROMPT is a separate named export from RESEARCHER_SYSTEM_PROMPT — identical content, distinct exports for clarity"

patterns-established:
  - "Dual-provider AI function: check process.env.NOTEBOOKLM_MCP_URL → MCP primary path, else Gemini fallback"
  - "MCP client lifecycle: experimental_createMCPClient → tools() → generateText → close() in finally block"
  - "parseTopicsFromResponse: strip markdown fences with regex, JSON.parse, throw descriptive error with raw response preview"

requirements-completed:
  - AUTHMAP-01

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 5 Plan 01: Authority Map TypeScript Contracts and Research Pipeline Summary

**Dual-provider authority map research pipeline using NotebookLM MCP (primary) + Gemini 2.0 Flash with Google Search grounding (fallback), with fully typed AuthorityMapTopic/AuthorityMapResult/ClientConfig contracts**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T01:00:52Z
- **Completed:** 2026-03-03T01:04:28Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created AuthorityMapTopic, AuthorityMapResult, ClientConfig TypeScript interfaces with all required fields, strict typing, no any
- Built generateAuthorityMap() with dual-provider routing: NotebookLM MCP via SSE when NOTEBOOKLM_MCP_URL is set, else Gemini + Google Search grounding
- Exported RESEARCHER_SYSTEM_PROMPT and NOTEBOOKLM_SYSTEM_PROMPT as named const strings
- parseTopicsFromResponse strips markdown code fences and parses JSON with descriptive error messages
- generateWithNotebookLM reuses getIntakeModel() from Phase 4 — MODEL_PROVIDER env var honored throughout

## Task Commits

Each task was committed atomically:

1. **Task 1: Authority map TypeScript contracts** - `ebade99` (feat)
2. **Task 2: Dual-provider research pipeline** - `ecd9492` (feat)

**Plan metadata:** (docs commit pending — created with final state update)

## Files Created/Modified
- `lib/authority-map/types.ts` - AuthorityMapTopic, AuthorityMapResult, ClientConfig named exports
- `lib/authority-map/researcher.ts` - generateAuthorityMap, RESEARCHER_SYSTEM_PROMPT, NOTEBOOKLM_SYSTEM_PROMPT named exports; dual-provider pipeline
- `package.json` - Added @ai-sdk/mcp@1.0.23 dependency

## Decisions Made
- `experimental_createMCPClient` imported from `@ai-sdk/mcp` not `ai` — in ai@6.0.107 the MCP client was extracted to a dedicated `@ai-sdk/mcp` package; it no longer exists in the `ai` main package exports
- `google.tools.googleSearch({})` requires an empty object argument — `ProviderToolFactory<{}, ARGS>` means the factory function always takes an `options: ARGS & {...}` parameter, even when all fields are optional
- `getIntakeModel()` from Phase 4 reused in `generateWithNotebookLM` — ensures MODEL_PROVIDER env var routing is consistent across all AI calls in the system

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocker] experimental_createMCPClient not exported from ai@6.0.107**
- **Found during:** Task 2 (researcher.ts TypeScript compilation)
- **Issue:** The plan specifies `import { experimental_createMCPClient } from 'ai'` but ai@6.0.107 moved MCP client to a separate `@ai-sdk/mcp` package — the export does not exist in the `ai` main package
- **Fix:** Installed `@ai-sdk/mcp@1.0.23` and updated import to `import { experimental_createMCPClient } from '@ai-sdk/mcp'`
- **Files modified:** lib/authority-map/researcher.ts, package.json
- **Verification:** npx tsc --noEmit exits 0 with zero errors
- **Committed in:** ecd9492 (Task 2 commit)

**2. [Rule 1 - Bug] google.tools.googleSearch() call with no arguments fails TypeScript**
- **Found during:** Task 2 (researcher.ts TypeScript compilation)
- **Issue:** `ProviderToolFactory<{}, {mode?, dynamicThreshold?}>` type signature requires `options` argument — TypeScript error "Expected 1 arguments, but got 0"
- **Fix:** Changed `google.tools.googleSearch()` to `google.tools.googleSearch({})` (empty options object satisfies optional ARGS)
- **Files modified:** lib/authority-map/researcher.ts
- **Verification:** npx tsc --noEmit exits 0 with zero errors
- **Committed in:** ecd9492 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking import, 1 TypeScript bug)
**Impact on plan:** Both auto-fixes required for TypeScript compilation to pass. No scope creep — functional behavior matches plan exactly.

## Issues Encountered
- ai@6 package reorganization: MCP client was extracted to `@ai-sdk/mcp` in a recent version bump. The plan was written against an earlier ai@6 API where `experimental_createMCPClient` was still in the main `ai` package. Fixed by installing the correct package.

## User Setup Required
None - no external service configuration required for the library layer. NOTEBOOKLM_MCP_URL and GOOGLE_GENERATIVE_AI_API_KEY are used at runtime but not needed for build/type-check.

## Next Phase Readiness
- Plan 02 (API route) can import generateAuthorityMap, AuthorityMapResult, and ClientConfig directly from lib/authority-map/
- npx tsc --noEmit exits 0 — zero TypeScript errors
- generateWithGemini uses real Google Search grounding (not mock data)
- generateWithNotebookLM uses SSE transport to NOTEBOOKLM_MCP_URL when configured

---
*Phase: 05-topical-authority-map-agent*
*Completed: 2026-03-03*
