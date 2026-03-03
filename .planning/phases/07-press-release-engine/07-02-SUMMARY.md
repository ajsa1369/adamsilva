---
phase: 07-press-release-engine
plan: "02"
subsystem: api
tags: [ai-sdk, press-release, compliance, ab2013, sb942, inverted-pyramid, MODEL_PROVIDER]

# Dependency graph
requires:
  - phase: 07-01
    provides: lib/press-release/types.ts — PressReleaseDraft, ComplianceResult, ResearchContext interfaces
  - phase: 04-agentic-intake-agent
    provides: lib/intake/model.ts — getIntakeModel() MODEL_PROVIDER routing
  - phase: 06-content-insights-engine
    provides: lib/insights/draft-generator.ts — mirror pattern for generateText + getIntakeModel()
provides:
  - lib/press-release/draft-generator.ts — generatePressReleaseDraft() AI inverted-pyramid draft via MODEL_PROVIDER
  - lib/press-release/compliance.ts — injectCompliance() AB 2013/SB 942 label injection (pure sync)
affects:
  - 07-03 (schema-builder — imports PressReleaseDraft)
  - 07-04 (media-pipeline — imports PressReleaseDraft)
  - 07-05 (API route — calls generatePressReleaseDraft + injectCompliance before Supabase upsert)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "generateText from 'ai' with getIntakeModel() for MODEL_PROVIDER routing — never import LLM providers directly"
    - "maxOutputTokens: 4096 (ai@6 param name — not maxTokens)"
    - "parseResponse() strips markdown fences before JSON.parse — defensive against AI formatting variance"
    - "Pure sync compliance function — deterministic, no AI calls, no side effects"

key-files:
  created:
    - lib/press-release/draft-generator.ts
    - lib/press-release/compliance.ts
  modified: []

key-decisions:
  - "wordCount counts headline + lead + body only — boilerplate and mediaContact are standard blocks, not variable content (07-02)"
  - "buildDateline() generates ATLANTA /EINPresswire/ format — default wire for all drafts unless overridden (07-02)"
  - "parseResponse() throws descriptive error on invalid JSON — fail-fast prevents silent garbage data reaching Supabase (07-02)"
  - "AI_TRANSPARENCY_HTML_COMMENT exported separately from AI_TRANSPARENCY_LABEL — HTML rendering path needs comment, API response needs label text (07-02)"
  - "fullText joins sections with single \\n and blank lines between blocks — matches wire submission format (07-02)"

patterns-established:
  - "Press release AI functions mirror lib/insights/draft-generator.ts pattern: generateText + getIntakeModel() + maxOutputTokens: 4096"
  - "Compliance injection always runs before Supabase upsert — zero manual steps, automated by API route"

requirements-completed: [PR-01, PR-02]

# Metrics
duration: 8min
completed: 2026-03-03
---

# Phase 7 Plan 02: Press Release Draft Generator and Compliance Module Summary

**AI inverted-pyramid draft generator using MODEL_PROVIDER routing + pure-sync AB 2013/SB 942 compliance label injector**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-03T04:35:00Z
- **Completed:** 2026-03-03T04:43:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- `generatePressReleaseDraft()` produces 300-500 word inverted-pyramid press release via AI using `getIntakeModel()` — MODEL_PROVIDER env routing, no hardcoded LLM provider
- `injectCompliance()` appends AB 2013 / SB 942 label to boilerplate deterministically — zero manual steps, pure sync function
- `PRESS_RELEASE_SYSTEM_PROMPT` and `AI_TRANSPARENCY_LABEL` exported as named constants for direct reference by API route
- `parseResponse()` strips markdown fences, validates all 6 JSON fields with descriptive errors, fail-fast on malformed AI output
- TypeScript strict-mode clean across both files

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/press-release/draft-generator.ts** - `04fb911` (feat)
2. **Task 2: Create lib/press-release/compliance.ts** - `b5700fa` (feat)

**Plan metadata:** (docs commit — see state updates)

## Files Created/Modified
- `lib/press-release/draft-generator.ts` - generatePressReleaseDraft(), PRESS_RELEASE_SYSTEM_PROMPT, buildDateline(), parseResponse() — AI inverted-pyramid draft via getIntakeModel()
- `lib/press-release/compliance.ts` - injectCompliance(), AI_TRANSPARENCY_LABEL, AI_TRANSPARENCY_HTML_COMMENT — pure sync AB 2013/SB 942 compliance injection

## Decisions Made
- `wordCount` counts headline + lead + body only — boilerplate and mediaContact are standard fixed blocks, word budget applies only to variable content
- `buildDateline()` defaults to ATLANTA /EINPresswire/ format — consistent wire identity for all ASC press releases
- `parseResponse()` throws on invalid JSON rather than returning null — fail-fast prevents silent garbage reaching Supabase
- `AI_TRANSPARENCY_HTML_COMMENT` exported as separate const from `AI_TRANSPARENCY_LABEL` — HTML renderer needs the comment token, API route needs the label string; separate exports prevent coupling
- `fullText` joins with `\n` single newlines, blank lines created by `''` entries — matches industry wire text format

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Plan 07-03 (schema-builder) can import `PressReleaseDraft` from types.ts — no new dependencies needed
- Plan 07-05 (API route) can call `generatePressReleaseDraft()` then `injectCompliance()` then Supabase upsert — both functions are ready
- Both files TypeScript clean — `npx tsc --noEmit` exits 0

---
*Phase: 07-press-release-engine*
*Completed: 2026-03-03*
