---
phase: 05-topical-authority-map-agent
plan: 02
subsystem: api
tags: [nextjs, supabase, resend, vercel-cron, zod, authority-map, typescript]

# Dependency graph
requires:
  - phase: 05-topical-authority-map-agent
    provides: generateAuthorityMap() from lib/authority-map/researcher.ts + AuthorityMapResult/ClientConfig types from lib/authority-map/types.ts
  - phase: 04-agentic-intake-agent
    provides: CRON_SECRET auth pattern from app/api/intake/followup/route.ts
provides:
  - app/api/authority-map/generate/route.ts — POST endpoint: Zod validation → generateAuthorityMap → Supabase upsert → branded Resend approval email with top-5 topics table
  - app/api/authority-map/approve/route.ts — GET endpoint: PATCH approved_at in authority_maps → HTML confirmation page
  - app/api/authority-map/cron/route.ts — Vercel Cron GET: CRON_SECRET auth, sequential per-client generation + upsert + email
  - vercel.json — cron schedule for /api/authority-map/cron at "0 9 1-7 * 1" (first Monday of month, 9 AM UTC)
  - .env.example — AUTHORITY_MAP_CLIENTS + NOTEBOOKLM_MCP_URL Phase 5 documentation
affects: [06-blog-production-agent, phase-10-dynamic-well-known]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zod safeParse with .issues (not .errors) for validation error detail — Zod v3 API"
    - "Supabase REST upsert with Prefer: return=representation,resolution=merge-duplicates to get row id back"
    - "Resend direct fetch API for email delivery (not edge function) — keeps route self-contained"
    - "Sequential for-of loop for per-client cron processing — avoids rate limits vs Promise.allSettled"
    - "CRON_SECRET header verified before processing — same pattern as Phase 4 followup cron"
    - "monthLabel derived by splitting YYYY-MM string → months[idx] + year"

key-files:
  created:
    - app/api/authority-map/generate/route.ts
    - app/api/authority-map/approve/route.ts
    - app/api/authority-map/cron/route.ts
  modified:
    - vercel.json
    - .env.example

key-decisions:
  - "parsed.error.issues not .errors — Zod v3 uses .issues property on ZodError; .errors does not exist on the type"
  - "Cron route uses minimal email HTML (plain link) — full branded template is in generate route to keep cron route lean"
  - "Approve route is idempotent — returns 'Already approved' if approved_at already set, no double-PATCH"
  - "AUTHORITY_MAP_CLIENTS parsed as JSON.parse(raw) — full ClientConfig array in single env var for simplicity"
  - "NOTEBOOKLM_MCP_URL documented as commented-out optional in .env.example — avoids undefined behavior until configured"

patterns-established:
  - "Authority map approval flow: generate → upsert (get UUID) → email approve link → client clicks → PATCH approved_at"
  - "Cron route: auth check first → parse clients JSON → sequential for-of with per-client try/catch → return { processed, errors }"
  - "HTML response helper function for approve route — wraps body in consistent brand-styled HTML shell"

requirements-completed:
  - AUTHMAP-02
  - AUTHMAP-03
  - AUTHMAP-04

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 5 Plan 02: Authority Map API Routes Summary

**Three API routes completing the authority map operational loop: POST generate (Zod + Supabase upsert + branded Resend email), GET approve (PATCH approved_at + HTML confirmation), GET cron (CRON_SECRET auth + sequential multi-client processing), with vercel.json first-Monday-of-month schedule**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T01:07:13Z
- **Completed:** 2026-03-03T01:10:29Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Built POST /api/authority-map/generate: Zod schema validation → generateAuthorityMap() → Supabase REST upsert with merge-duplicates → branded HTML email with top-5 topics table + Approve button via Resend
- Built GET /api/authority-map/approve: idempotent approval — fetches row, guards on already-approved, PATCHes approved_at, returns branded HTML confirmation page
- Built GET /api/authority-map/cron: CRON_SECRET auth → AUTHORITY_MAP_CLIENTS JSON parse → sequential per-client researcher + Supabase + Resend loop with error accumulation
- Updated vercel.json with first-Monday-of-month cron (0 9 1-7 * 1) alongside existing daily followup cron
- Documented AUTHORITY_MAP_CLIENTS and NOTEBOOKLM_MCP_URL in .env.example as Phase 5 additions

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate route + Approve route** - `e3060eb` (feat)
2. **Task 2: Cron route + vercel.json + .env.example** - `6902c9c` (feat)

**Plan metadata:** (docs commit pending — created with final state update)

## Files Created/Modified
- `app/api/authority-map/generate/route.ts` - POST endpoint: Zod validation, generateAuthorityMap, Supabase upsert, branded Resend approval email with top-5 topics HTML table
- `app/api/authority-map/approve/route.ts` - GET endpoint: fetch row, idempotent approved_at PATCH, HTML confirmation page
- `app/api/authority-map/cron/route.ts` - Vercel Cron GET: CRON_SECRET auth, sequential per-client authority map generation + persistence + notification
- `vercel.json` - Added /api/authority-map/cron at schedule "0 9 1-7 * 1" (first Monday of month, 9 AM UTC)
- `.env.example` - Added Phase 5 block: AUTHORITY_MAP_CLIENTS (required) + NOTEBOOKLM_MCP_URL (commented, optional)

## Decisions Made
- `parsed.error.issues` not `.errors` — Zod v3 puts validation issues on the `.issues` property; `.errors` does not exist on the ZodError type (auto-fixed during Task 1 verification)
- Cron route uses minimal email HTML (plain approve link) while generate route has full branded template — keeps cron lean for batch operations
- Approve route is idempotent — double-clicking the approve link returns a friendly "already approved" page without patching again
- AUTHORITY_MAP_CLIENTS stored as a JSON array string in a single env var — avoids per-client env var proliferation, simple to add clients

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Zod v3 uses `.issues` not `.errors` for validation detail**
- **Found during:** Task 1 (TypeScript compilation of generate/route.ts)
- **Issue:** Plan specified `parsed.error.errors` but Zod v3's `ZodError` type does not have an `.errors` property — TypeScript error TS2339: Property 'errors' does not exist
- **Fix:** Changed `parsed.error.errors` to `parsed.error.issues`
- **Files modified:** app/api/authority-map/generate/route.ts
- **Verification:** npx tsc --noEmit exits 0 with zero errors
- **Committed in:** e3060eb (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 TypeScript bug)
**Impact on plan:** Auto-fix required for TypeScript compilation to pass. No scope creep — functional behavior matches plan exactly.

## Issues Encountered
- Zod v3 API: the plan specified `.error.errors` but Zod v3 uses `.error.issues` for the array of validation errors. This is a common point of confusion between Zod v2 and v3. Fixed immediately by rule 1.

## User Setup Required
None - no external service configuration required for the API layer itself. Environment variables documented in .env.example:
- `AUTHORITY_MAP_CLIENTS` — JSON array of ClientConfig objects (required for cron)
- `RESEND_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET` — already documented in Phase 4 block

## Next Phase Readiness
- Full authority map pipeline is now operational: monthly cron → AI research → Supabase → client approval email → approval click → approved_at set
- Phase 6 (blog production agent) can query authority_maps WHERE approved_at IS NOT NULL to find approved maps to produce content for
- npx tsc --noEmit exits 0 — zero TypeScript errors
- All three routes follow established codebase patterns (runtime='nodejs', Response.json, fetch-based Supabase/Resend)

## Self-Check: PASSED
- app/api/authority-map/generate/route.ts: FOUND
- app/api/authority-map/approve/route.ts: FOUND
- app/api/authority-map/cron/route.ts: FOUND
- .planning/phases/05-topical-authority-map-agent/05-02-SUMMARY.md: FOUND
- Commit e3060eb: FOUND
- Commit 6902c9c: FOUND

---
*Phase: 05-topical-authority-map-agent*
*Completed: 2026-03-03*
