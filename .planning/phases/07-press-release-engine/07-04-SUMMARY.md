---
phase: 07-press-release-engine
plan: "04"
subsystem: api
tags: [press-release, wire-distribution, mcp, notebooklm, einpresswire, businesswire, prnewswire, accesswire]

# Dependency graph
requires:
  - phase: 07-01
    provides: WireAdapter interface, WireSubmitResult, ResearchContext, PressReleaseDraft types
  - phase: 04-agentic-intake-agent
    provides: getIntakeModel() for AI fallback in researcher.ts
  - phase: 05-topical-authority-map-agent
    provides: MCP pattern (experimental_createMCPClient SSE) mirrored in researcher.ts
provides:
  - researchPressReleaseTopic(topic) — NotebookLM MCP wrapper with AI fallback, returns ResearchContext
  - einpresswireAdapter — EIN Presswire WireAdapter (free tier default)
  - businesswireAdapter — Business Wire WireAdapter
  - prnewswireAdapter — PR Newswire WireAdapter
  - accesswireAdapter — AccessWire WireAdapter
  - distribute(draft, mediaFiles, wireServices) — parallel wire orchestrator via Promise.allSettled
affects: [07-05, api-route-press-release]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WireAdapter interface pattern: status 'skipped' when env key missing, 'error' on API failure, 'submitted' on 2xx"
    - "Promise.allSettled for partial-failure-tolerant parallel async calls"
    - "MCP-first with AI fallback: try NotebookLM MCP, catch any error, fall back to getIntakeModel()"
    - "Double-fallback researcher: MCP failure -> AI fallback -> graceful degradation { summary: topic, keyFacts: [], sources: [] }"

key-files:
  created:
    - lib/press-release/researcher.ts
    - lib/press-release/wire-adapters/einpresswire.ts
    - lib/press-release/wire-adapters/businesswire.ts
    - lib/press-release/wire-adapters/prnewswire.ts
    - lib/press-release/wire-adapters/accesswire.ts
    - lib/press-release/distributor.ts
  modified: []

key-decisions:
  - "Double-fallback in researcher: MCP path wrapped in outer try/catch; AI path wrapped in inner try/catch; final catch returns graceful stub — researcher never throws"
  - "All 4 wire adapters use _mediaFiles prefix (unused param) to match WireAdapter interface signature without TypeScript unused-param errors"
  - "ADAPTERS registry in distributor.ts: Record<string, WireAdapter> keyed by service name — unknown service names caught gracefully with status: 'error'"
  - "Default wireServices = ['einpresswire'] in distribute() — EIN Presswire free tier as safe default per CONTEXT.md"
  - "Promise.allSettled used (not Promise.all) — one adapter failing does not block the other 3"

patterns-established:
  - "Wire adapter pattern: check env key → 'skipped'; fetch API; ok → 'submitted'; !ok → 'error'; catch → 'error'"
  - "Researcher double-fallback: primary (MCP) → secondary (AI) → tertiary (stub) — never throws"

requirements-completed: [PR-04]

# Metrics
duration: 4min
completed: 2026-03-03
---

# Phase 7 Plan 04: Research Module and Wire Distribution Layer Summary

**NotebookLM MCP researcher with double-fallback and 4 wire adapters (EIN/BW/PRN/AW) orchestrated in parallel via Promise.allSettled**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-03T04:32:04Z
- **Completed:** 2026-03-03T04:36:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- researchPressReleaseTopic() with NotebookLM MCP primary + AI-only secondary + graceful stub fallback — never throws
- 4 wire adapters (EIN Presswire, Business Wire, PR Newswire, AccessWire) all implementing WireAdapter interface with proper skipped/error/submitted semantics
- distribute() orchestrator using Promise.allSettled for partial-failure tolerance — at least one working service is sufficient (PR-04)
- TypeScript clean — no `any` types, no unhandled promise rejections, zero tsc errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create researcher.ts and all 4 wire adapters** - `052bfac` (feat)
2. **Task 2: Create lib/press-release/distributor.ts** - `58ac25f` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `lib/press-release/researcher.ts` - researchPressReleaseTopic(topic): MCP primary + AI fallback + stub tertiary
- `lib/press-release/wire-adapters/einpresswire.ts` - EIN Presswire adapter (free tier default)
- `lib/press-release/wire-adapters/businesswire.ts` - Business Wire adapter
- `lib/press-release/wire-adapters/prnewswire.ts` - PR Newswire adapter
- `lib/press-release/wire-adapters/accesswire.ts` - AccessWire adapter
- `lib/press-release/distributor.ts` - Parallel wire submission orchestrator

## Decisions Made
- Double-fallback in researcher: MCP path in outer try/catch; AI path in inner try/catch; final catch returns graceful stub — researcher never throws
- All 4 wire adapters use `_mediaFiles` prefix (unused param) to match WireAdapter interface signature without TypeScript unused-param errors
- ADAPTERS registry in distributor.ts keyed by service name — unknown service names caught gracefully with `status: 'error'`
- Default wireServices = `['einpresswire']` in distribute() — EIN Presswire free tier as safe default per CONTEXT.md
- Promise.allSettled used (not Promise.all) — one adapter failing does not block the other 3

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required. Wire services activate automatically when their env vars are set (EINPRESSWIRE_API_KEY, BUSINESSWIRE_API_KEY, PRNEWSWIRE_API_KEY, ACCESSWIRE_API_KEY).

## Next Phase Readiness
- Plan 07-05 can import `distribute()` from `@/lib/press-release/distributor` and `researchPressReleaseTopic()` from `@/lib/press-release/researcher` without modification
- All 4 adapters stub-ready for live credentials — replace TODO(live) endpoint comments when accounts available
- TypeScript clean at 0 errors — no blockers for 07-05

---
*Phase: 07-press-release-engine*
*Completed: 2026-03-03*
