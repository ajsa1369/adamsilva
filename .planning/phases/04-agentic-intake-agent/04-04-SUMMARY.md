---
phase: 04-agentic-intake-agent
plan: "04"
subsystem: api
tags: [supabase, deno, edge-functions, resend, email, proposals]

# Dependency graph
requires:
  - phase: 04-01
    provides: lib/intake/types.ts ProposalData shape that edge function inputs mirror
  - phase: 02-04
    provides: supabase/functions scaffolds and deno.land/std@0.208.0 version decision
  - phase: 02-02
    provides: proposals table schema (006_proposals.sql) with all column contracts
provides:
  - generate-proposal edge function — inserts full proposal row to Supabase proposals table, returns proposal_id
  - send-proposal-email edge function — sends branded HTML proposal email via Resend, returns email_id
affects:
  - 04-02 (PDF generation — calls generate-proposal to persist before PDF render)
  - 04-03 (chat route — calls generate-proposal and send-proposal-email via saveToCRMTool)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Deno edge function full implementation pattern with CORS, validation, env-based credentials
    - Supabase REST API insert via service role key with Prefer=return=representation for returning ID
    - Resend email API pattern with branded HTML template, tags metadata, proposal CTA structure

key-files:
  created: []
  modified:
    - supabase/functions/generate-proposal/index.ts
    - supabase/functions/send-proposal-email/index.ts

key-decisions:
  - "generate-proposal uses Supabase REST API directly (no npm packages in Deno edge functions) — fetch to /rest/v1/proposals with Prefer: return=representation to get inserted row ID back"
  - "send-proposal-email HTML template uses brand colors #1B2E4B (navy) and #4D8EC0 (blue) matching design system tokens — proposal_delivery tag added for Resend analytics"
  - "Both functions validate required fields before any external calls — fail-fast with 400 before touching DB or Resend"

patterns-established:
  - "Deno edge function pattern: CORS OPTIONS first, method guard, env var guard, JSON parse with try/catch, field validation, external call, error propagation"
  - "JSONB columns (integrations_detected, goals) serialized via JSON.stringify before insert — Supabase REST API accepts string for JSONB columns"

requirements-completed:
  - INTAKE-05
  - INTAKE-06

# Metrics
duration: 4min
completed: 2026-03-02
---

# Phase 4 Plan 04: Supabase Edge Functions — generate-proposal + send-proposal-email Summary

**Deno edge functions that persist proposals to Supabase via REST API service role insert and deliver branded HTML proposal emails via Resend with PDF download CTA and strategy call link**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-02T22:57:28Z
- **Completed:** 2026-03-02T23:01:28Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- generate-proposal: full Deno implementation replacing Phase 2 scaffold — validates 5 required fields, inserts all 13 schema columns to proposals table via service role REST API, returns `{ success: true, proposal_id }`
- send-proposal-email: full Deno implementation replacing Phase 2 scaffold — branded HTML email with package name, setup/monthly totals, PDF download CTA, Calendly strategy call CTA, returns `{ success: true, email_id }`
- Both functions: CORS OPTIONS handler, 405 method guard, env var guard, 400 validation, 500 error propagation, no hardcoded credentials

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement generate-proposal/index.ts** - `4e937cc` (feat)
2. **Task 2: Implement send-proposal-email/index.ts** - `291e833` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `supabase/functions/generate-proposal/index.ts` — Validates required fields (prospect_name, prospect_email, recommended_package, setup_total, monthly_total), inserts 13 columns to proposals table via Supabase REST API with service role key, returns proposal_id from inserted row
- `supabase/functions/send-proposal-email/index.ts` — Sends branded HTML proposal email via Resend with package pricing summary, PDF download button, strategy call CTA; returns email_id

## Decisions Made

- `generate-proposal` uses `Prefer: return=representation` header so Supabase REST API returns the inserted row (including auto-generated UUID `id`) — allows function to return `proposal_id` without a second lookup query
- JSONB columns (`integrations_detected`, `goals`) are serialized with `JSON.stringify` before insert — Supabase REST API accepts string values for JSONB columns when posting JSON body
- Email HTML uses `&rarr;` HTML entity for the arrow (not `→` unicode) — avoids potential encoding issues in email clients
- Both functions follow exact same CORS headers structure as email-service/index.ts — consistent with Phase 2 edge function pattern

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no new external service configuration required. Edge functions depend on existing env vars:
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (already noted as needed for Phase 4 in STATE.md blockers)
- `RESEND_API_KEY` (already noted as needed for Phase 4 in STATE.md blockers)

Both must be set as Supabase edge function secrets before deployment via `supabase secrets set`.

## Next Phase Readiness

- generate-proposal ready: `saveToCRMTool` in lib/intake/tools.ts already calls this function — once deployed, proposal persistence is live
- send-proposal-email ready: called by `saveToCRMTool` after PDF URL is available
- Plan 04-02 (PDF generation route) can now reference generate-proposal as the persistence step
- Plan 04-03 (chat/streaming route) orchestrates both functions via saveToCRMTool
- Deployment blocker: Supabase CLI `supabase functions deploy` still needed (out of scope for this plan)

---
*Phase: 04-agentic-intake-agent*
*Completed: 2026-03-02*
