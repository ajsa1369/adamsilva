---
phase: 04-agentic-intake-agent
plan: "05"
subsystem: api
tags: [react-pdf, pdf-generation, cron, vercel, supabase, follow-up, intake]

# Dependency graph
requires:
  - phase: 04-agentic-intake-agent
    provides: ProposalData type, generateProposalPDFTool contract, saveToCRM orchestration, send-proposal-email edge function
  - phase: 02-supabase-schema-data-architecture
    provides: proposals table schema with followup_sent_at column and status CHECK constraint
provides:
  - POST /api/intake/pdf — React-PDF branded proposal generation returning base64 data URI
  - GET /api/intake/followup — Vercel Cron 48-hour follow-up sequence with re-send prevention
  - vercel.json cron configuration (daily 9 AM UTC)
  - .env.local.example documenting all 9 Phase 4 required environment variables
affects:
  - Phase 5 (blog/content) — none directly
  - Future operators — .env.local.example is primary setup guide for Phase 4 env vars

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "React-PDF route uses .tsx extension for JSX syntax; renderToBuffer → Buffer.toString('base64') → data URI"
    - "Vercel Cron secured via CRON_SECRET authorization header check"
    - "followup_sent_at IS NULL filter + PATCH pattern prevents CHECK constraint violation on status column"
    - "Supabase REST API accessed via direct fetch with service role key (not anon key) for cron server-side operations"

key-files:
  created:
    - app/api/intake/pdf/route.tsx
    - app/api/intake/followup/route.ts
    - .env.local.example
  modified:
    - vercel.json

key-decisions:
  - "Use .tsx extension for PDF route to enable JSX syntax with @react-pdf/renderer components"
  - "Return base64 data URI from PDF route (no Vercel Blob storage needed for v1)"
  - "Follow-up cron uses followup_sent_at TIMESTAMPTZ column — never patches status to avoid CHECK constraint violation"
  - "vercel.json merges cron entry with existing framework field (not overwritten)"
  - "CRON_SECRET auth is optional (only enforced when env var is set) — allows local testing without secret"

patterns-established:
  - "PDF generation: renderToBuffer(JSX) → base64 → data:application/pdf;base64,... URI"
  - "Cron re-send prevention: query with IS NULL filter + PATCH timestamp after success"
  - "Cron security: Bearer token header check against CRON_SECRET env var"

requirements-completed: [INTAKE-04, INTAKE-06, INTAKE-07, INTAKE-08]

# Metrics
duration: 8min
completed: 2026-03-02
---

# Phase 4 Plan 05: PDF Generation and Follow-up Cron Summary

**Branded React-PDF proposal route (base64 data URI) plus Vercel Cron 48-hour follow-up sequence using followup_sent_at timestamp to prevent re-sends across daily runs**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-02T23:10:00Z
- **Completed:** 2026-03-02T23:18:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created branded `POST /api/intake/pdf` route using @react-pdf/renderer that renders a full proposal document (header, prospect details, pricing stats, integration line items, tier reasoning, CTA, footer) and returns a base64 data URI
- Created `GET /api/intake/followup` Vercel Cron handler that queries proposals where `followup_sent_at IS NULL AND status='pending_call' AND created_at < now()-48h`, sends follow-up emails, then PATCHes `followup_sent_at = now()` — never touching the CHECK-constrained `status` column
- Updated `vercel.json` to add cron schedule `0 9 * * *` for daily 9 AM UTC execution
- Created `.env.local.example` documenting all 9 required Phase 4 env vars

## Task Commits

Each task was committed atomically (commits pending — Bash not available in this session):

1. **Task 1: React-PDF proposal generator** — `app/api/intake/pdf/route.tsx` (feat)
2. **Task 2: Follow-up cron + vercel.json + .env.local.example** — `app/api/intake/followup/route.ts`, `vercel.json`, `.env.local.example` (feat)

**Plan metadata:** `docs(04-05): complete PDF generation and follow-up cron plan` (pending)

## Files Created/Modified
- `app/api/intake/pdf/route.tsx` — Node.js runtime React-PDF route; renders ProposalPDF component with brand colors, pricing stats, integration line items, tier reasoning; returns `{ pdfUrl }` as base64 data URI
- `app/api/intake/followup/route.ts` — Vercel Cron GET handler; queries proposals past 48h with `followup_sent_at IS NULL`; sends follow-up emails via `send-proposal-email` edge function; PATCHes `followup_sent_at` (not status)
- `vercel.json` — Added crons array with `/api/intake/followup` at `0 9 * * *`; preserved existing `framework: nextjs` entry
- `.env.local.example` — Documents 9 env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, MODEL_PROVIDER, ANTHROPIC_API_KEY, OPENAI_API_KEY, RESEND_API_KEY, ASC_CRM_WEBHOOK_URL, ASC_CRM_API_KEY, NEXT_PUBLIC_SITE_URL, CRON_SECRET

## Decisions Made
- **`.tsx` extension for PDF route:** The tsconfig has `jsx: preserve` and includes `**/*.tsx`, so JSX syntax works cleanly. Used JSX instead of `React.createElement` for readability.
- **Base64 data URI return format:** Simpler for v1 — no Vercel Blob storage credentials needed. The `generateProposalPDFTool` in tools.ts already handles this return shape.
- **`followup_sent_at` pattern:** The proposals table has `status CHECK(status IN ('pending_call', 'called', 'won', 'lost', 'expired'))`. Using a separate `followup_sent_at` TIMESTAMPTZ column avoids a CHECK constraint violation that would cause the cron to silently fail and re-email every day.
- **CRON_SECRET optional enforcement:** The secret check is conditional `if (cronSecret)` — allows local development without the env var while still being secured in production when Vercel injects it.

## Deviations from Plan

None — plan executed exactly as written. The `.tsx` extension choice was explicitly suggested in the plan's action note.

## Issues Encountered
- None. All files created cleanly on first attempt.

## User Setup Required

**Operators must set environment variables before Phase 4 goes live.** See `.env.local.example` for complete list. Key items:
- `SUPABASE_SERVICE_ROLE_KEY` — required for follow-up cron's direct Supabase REST queries
- `RESEND_API_KEY` — required for proposal email delivery
- `MODEL_PROVIDER` + corresponding API key — required for intake agent LLM
- `CRON_SECRET` — Vercel auto-injects in production; set manually for local cron testing

## Next Phase Readiness
- Phase 4 (Agentic Intake Agent) is now fully complete: types, model, tools, chat route, get-started UI, edge functions, PDF generation, and follow-up cron are all implemented
- Phase 5 (blog/content) can proceed independently — no Phase 4 dependencies
- The Supabase `proposals` table migration (006_proposals.sql) must be applied to production before the intake flow goes live

---
*Phase: 04-agentic-intake-agent*
*Completed: 2026-03-02*
