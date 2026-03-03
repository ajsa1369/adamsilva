---
phase: 04-agentic-intake-agent
verified: 2026-03-02T00:00:00Z
status: passed
score: 11/11 must-haves verified
re_verification:
  previous_status: gaps_found
  previous_score: 10/11
  gaps_closed:
    - ".env.example now documents GOOGLE_GENERATIVE_AI_API_KEY with a comment explaining it is required when MODEL_PROVIDER=google or MODEL_PROVIDER is unset (line 13)"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "End-to-end conversation flow at /get-started"
    expected: "Agent responds to each step, legacy warning renders for Shopify, ProposalCard appears after calculateProposal, both CTAs (Book Strategy Call + Download PDF) are visible"
    why_human: "Requires live Gemini API key, streaming network behavior, and visual rendering cannot be verified by static analysis"
  - test: "PDF download from /api/intake/pdf"
    expected: "POST with { prospectName, packageSlug, setupTotal, monthlyTotal } returns JSON with pdfUrl as a data URI; opening that URI renders a branded PDF"
    why_human: "renderToBuffer produces binary output; visual quality of PDF layout requires human review"
  - test: "Proposal email delivery (send-proposal-email edge function)"
    expected: "Email arrives in inbox with proposal details, PDF link, and Book Strategy Call CTA; branding matches site"
    why_human: "Requires Resend API key, deployed Supabase edge function, and human inbox inspection"
  - test: "CRM webhook fires on proposal completion"
    expected: "saveToCRM tool execution creates a contact + deal in the configured CRM within seconds of the conversation completing"
    why_human: "Requires live CRM webhook URL (ASC_CRM_WEBHOOK_URL) and CRM account access to verify deal creation"
  - test: "48-hour follow-up cron (GET /api/intake/followup)"
    expected: "Proposals older than 48h with status=pending_call and followup_sent_at IS NULL receive a follow-up email; followup_sent_at is set on those rows afterward"
    why_human: "Requires seeded proposals in Supabase, CRON_SECRET authentication, and real email delivery to verify"
---

# Phase 4: Agentic Intake Agent — Verification Report

**Phase Goal:** Build the full agentic intake pipeline — a streaming conversational AI chatbot at /get-started that qualifies prospects, detects their tech stack, classifies tools against the integration catalog, generates a custom proposal, stores it in Supabase, emails a PDF, fires a CRM webhook, and triggers a 48-hour follow-up sequence.
**Verified:** 2026-03-02
**Status:** passed (11/11 must-haves verified)
**Re-verification:** Yes — gap closed after initial verification found 1 partial truth

---

## Re-Verification Summary

**Gap from initial verification:** `.env.example` was missing `GOOGLE_GENERATIVE_AI_API_KEY`. The default `MODEL_PROVIDER` in `model.ts` is `'google'` (line 15: `process.env.MODEL_PROVIDER ?? 'google'`), but the example file only documented `ANTHROPIC_API_KEY` and `OPENAI_API_KEY`.

**Fix applied:** Line 13 of `.env.example` now reads:
```
GOOGLE_GENERATIVE_AI_API_KEY=AIza...               # required if MODEL_PROVIDER=google (default)
```

Line 12 also explicitly sets `MODEL_PROVIDER=google` as the default with options documented. All 9 Phase 4 environment variables are now present and annotated.

**Regression check:** All 10 previously passing truths confirmed unchanged (no modifications to any functional code files).

---

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                              | Status     | Evidence                                                                                                              |
|----|---------------------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------|
| 1  | GET /get-started renders a page ('use client' + useChat)                                          | VERIFIED   | page.tsx line 1: `'use client'`; line 15: `import { useChat } from '@ai-sdk/react'`; line 80: `useChat({...})`      |
| 2  | POST /api/intake/chat streams responses using Vercel AI SDK streamText                            | VERIFIED   | route.ts line 13: `import { streamText }`, line 99: `streamText({...})`, line 107: `result.toUIMessageStreamResponse()` |
| 3  | Chat route registers all 5 tools                                                                  | VERIFIED   | tools.ts lines 289-295: `intakeTools` exports all 5 keys; route.ts line 103: `tools: intakeTools`                    |
| 4  | MODEL_PROVIDER env var controls LLM — default is 'google', never hardcoded                       | VERIFIED   | model.ts line 15: `const provider = process.env.MODEL_PROVIDER ?? 'google'`; three branches for openai/anthropic/google |
| 5  | saveToCRM orchestrates full delivery: generate-proposal + send-proposal-email + CRM webhook       | VERIFIED   | tools.ts lines 185-284: three-step sequence inside saveToCRMTool.execute with explicit ordering                       |
| 6  | generate-proposal inserts into proposals table with status='pending_call'                         | VERIFIED   | supabase/functions/generate-proposal/index.ts line 99: `status: 'pending_call'`; inserts via Supabase REST POST      |
| 7  | send-proposal-email calls Resend API with proposal details                                        | VERIFIED   | supabase/functions/send-proposal-email/index.ts line 150: `fetch('https://api.resend.com/emails', { method: 'POST' })` |
| 8  | /api/intake/pdf generates PDF using @react-pdf/renderer, returns pdfUrl                          | VERIFIED   | pdf/route.tsx line 13: `import { renderToBuffer, ... } from '@react-pdf/renderer'`; line 279: `pdfUrl = data:application/pdf;base64,...`; line 281: `NextResponse.json({ pdfUrl })` |
| 9  | /api/intake/followup queries pending_call proposals >48h with no followup, PATCHes followup_sent_at | VERIFIED   | followup/route.ts line 57: query string with `status=eq.pending_call&followup_sent_at=is.null&created_at=lt.${cutoff}`; line 111: `PATCH { followup_sent_at: new Date().toISOString() }` |
| 10 | vercel.json has cron entry for /api/intake/followup                                               | VERIFIED   | vercel.json lines 3-8: `"path": "/api/intake/followup"`, `"schedule": "0 9 * * *"`                                   |
| 11 | .env.example documents all required env vars including default provider key                       | VERIFIED   | .env.example line 13: `GOOGLE_GENERATIVE_AI_API_KEY=AIza...  # required if MODEL_PROVIDER=google (default)`; line 12: `MODEL_PROVIDER=google` with options documented |

**Score:** 11/11 truths verified

---

### Required Artifacts

| Artifact                                              | Expected                                    | Status   | Details                                                                                 |
|------------------------------------------------------|---------------------------------------------|----------|-----------------------------------------------------------------------------------------|
| `app/(marketing)/get-started/page.tsx`               | Intake UI with useChat + 6-step flow        | VERIFIED | 305 lines; 'use client'; useChat wired to /api/intake/chat; PlatformWarning + ProposalCard rendered conditionally |
| `app/api/intake/chat/route.ts`                       | Streaming chat API — all 5 tools            | VERIFIED | 108 lines; streamText + intakeTools + getIntakeModel; 6-step system prompt              |
| `lib/intake/tools.ts`                                | 5 AI SDK tool definitions                   | VERIFIED | 295 lines; all 5 tools with full execute logic; saveToCRM orchestrates 3-step delivery |
| `lib/intake/model.ts`                                | MODEL_PROVIDER routing — defaults google    | VERIFIED | 24 lines; reads env var at runtime; google/openai/anthropic branches                   |
| `lib/intake/types.ts`                                | ProposalData + ProspectData interfaces      | VERIFIED | 54 lines; exports ProspectData, ProposalLineItem, ProposalData                          |
| `supabase/functions/generate-proposal/index.ts`      | Supabase insert with status='pending_call'  | VERIFIED | 128 lines; validates required fields; inserts via REST API; returns proposal_id         |
| `supabase/functions/send-proposal-email/index.ts`    | Resend email with proposal details          | VERIFIED | 181 lines; branded HTML email; calls Resend API; handles CORS                          |
| `app/api/intake/pdf/route.tsx`                       | React-PDF generation → pdfUrl              | VERIFIED | 282 lines; renderToBuffer with ProposalPDF component; returns base64 data URI           |
| `app/api/intake/followup/route.ts`                   | 48h cron — PATCH followup_sent_at           | VERIFIED | 120 lines; correct 3-filter query; PATCHes followup_sent_at (NOT status)               |
| `vercel.json`                                        | Cron entry at 0 9 * * *                     | VERIFIED | 9 lines; single cron at /api/intake/followup                                            |
| `.env.example`                                       | All 9 Phase 4 env vars documented           | VERIFIED | All 9 vars present: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, MODEL_PROVIDER, GOOGLE_GENERATIVE_AI_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY, RESEND_API_KEY, ASC_CRM_WEBHOOK_URL, ASC_CRM_API_KEY, NEXT_PUBLIC_SITE_URL, CRON_SECRET |

---

### Key Link Verification

| From                                  | To                                        | Via                                         | Status   | Details                                                        |
|---------------------------------------|-------------------------------------------|---------------------------------------------|----------|----------------------------------------------------------------|
| `app/(marketing)/get-started/page.tsx` | `app/api/intake/chat/route.ts`           | DefaultChatTransport api param              | WIRED    | Line 81: `new DefaultChatTransport({ api: '/api/intake/chat' })` |
| `app/api/intake/chat/route.ts`        | `lib/intake/model.ts`                     | getIntakeModel() call                       | WIRED    | Line 15: import; line 100: `model: getIntakeModel()`           |
| `app/api/intake/chat/route.ts`        | `lib/intake/tools.ts`                     | intakeTools barrel export                   | WIRED    | Line 16: import; line 103: `tools: intakeTools`                |
| `lib/intake/tools.ts`                 | `lib/integrations/catalog.ts`             | lookupIntegration tool calls catalogLookup  | WIRED    | Line 18: import; line 32: `catalogLookup(input.name)`          |
| `lib/intake/tools.ts`                 | `lib/pricing/tier-selector.ts`            | calculateProposal calls selectTier          | WIRED    | Line 19: import; line 83: `selectTier({...})`                  |
| `lib/intake/tools.ts`                 | `lib/pricing/calculator.ts`               | calculateProposal calls calculatePricing    | WIRED    | Line 20: import; line 90: `calculatePricing(...)`              |
| `lib/intake/tools.ts` (saveToCRM)     | `supabase/functions/generate-proposal`    | fetch inside saveToCRMTool.execute          | WIRED    | Line 188: `fetch(${supabaseUrl}/functions/v1/generate-proposal, ...)` |
| `lib/intake/tools.ts` (saveToCRM)     | `supabase/functions/send-proposal-email`  | fetch after generate-proposal returns id    | WIRED    | Line 223: `fetch(${supabaseUrl}/functions/v1/send-proposal-email, ...)` |
| `lib/intake/tools.ts` (generatePDF)   | `app/api/intake/pdf/route.tsx`            | fetch to /api/intake/pdf                   | WIRED    | Lines 120-129: `fetch(${baseUrl}/api/intake/pdf, { method: 'POST' })` |
| `app/api/intake/followup/route.ts`    | `supabase/functions/send-proposal-email`  | fetch for each pending proposal             | WIRED    | Line 83: `fetch(${supabaseUrl}/functions/v1/send-proposal-email, ...)` |
| `app/api/intake/followup/route.ts`    | `supabase/proposals` table                | PATCH followup_sent_at                      | WIRED    | Line 104-112: `PATCH ?id=eq.${proposal.id}` with `{ followup_sent_at }` |

---

### Requirements Coverage

| Requirement | Source Plan | Description                                                             | Status              | Evidence                                                                          |
|-------------|------------|-------------------------------------------------------------------------|---------------------|-----------------------------------------------------------------------------------|
| INTAKE-01   | 04-02, 04-03 | Prospect can start conversational intake at /get-started               | SATISFIED           | page.tsx renders full chat UI; route.ts handles POST streaming                    |
| INTAKE-02   | 04-01, 04-03 | Agent detects platform tier and routes legacy path                     | SATISFIED           | detectPlatformTierTool classifies shopify/wix/squarespace/wordpress as 'legacy'; page.tsx renders PlatformWarning conditionally |
| INTAKE-03   | 04-01       | Agent classifies each named tool against integration catalog           | SATISFIED           | lookupIntegrationTool calls catalogLookup; returns tier/cost data                 |
| INTAKE-04   | 04-05       | Agent generates complete proposal with tier, setup, monthly, line items | SATISFIED           | calculateProposalTool runs selectTier + calculatePricing; returns full breakdown  |
| INTAKE-05   | 04-01, 04-04 | Generated proposal stored in Supabase proposals table                  | SATISFIED           | generate-proposal edge fn inserts with status='pending_call'; returns proposal_id |
| INTAKE-06   | 04-04, 04-05 | Prospect receives PDF proposal via email automatically                 | SATISFIED           | pdf/route.tsx generates PDF; send-proposal-email sends via Resend                 |
| INTAKE-07   | 04-01       | Contact + deal created in CRM via configurable webhook                 | SATISFIED           | saveToCRMTool fires to ASC_CRM_WEBHOOK_URL with event='proposal_created'          |
| INTAKE-08   | 04-05       | 48-hour follow-up if no strategy call booked                           | SATISFIED           | followup/route.ts queries correct subset; PATCHes followup_sent_at; vercel.json cron configured |
| INTAKE-09   | 04-01       | LLM provider never hardcoded — uses MODEL_PROVIDER env var             | SATISFIED           | model.ts reads process.env.MODEL_PROVIDER at runtime; three provider branches     |

Note: REQUIREMENTS.md marks INTAKE-08 as "Pending" but the implementation is complete and verified in code. The traceability table should be updated.

---

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `app/api/intake/followup/route.ts` | No GET handler auth enforcement when CRON_SECRET is absent | Info | Non-fatal: cron secret check is conditional (line 37: `if (cronSecret)`) — acceptable for dev but consider enforcing in production |

No blocker anti-patterns. No stubs. No placeholder returns. No empty handlers. The `.env.example` documentation gap from the initial verification has been resolved.

---

### Notable Implementation Observations

**AI SDK Version (v6 API):** The implementation correctly uses `inputSchema` (not `parameters`) for tool definitions, matching the installed `ai@6.0.107`. The PLAN 01 template incorrectly showed `parameters` syntax from ai@5 — the implementer correctly used the v6 API.

**MODEL_PROVIDER Default Divergence from PLAN:** PLAN 01's `must_haves.truths` states "setting MODEL_PROVIDER=anthropic (or omitting it) routes to Claude." The actual implementation defaults to `'google'` (Gemini 2.0 Flash, free tier). This is correct per the phase goal ("default is google/gemini") and per the prompt specification. The PLAN was written before the final design decision. The code is correct; the PLAN truth is stale.

**PDF as Base64 Data URI:** The pdf route returns `data:application/pdf;base64,...` instead of a hosted URL (no Vercel Blob). This is noted in the code as "simpler for v1" and works for email attachment links. Not a blocker — the pdfUrl field is populated and passed through the full chain.

**Email Gating on proposalId:** send-proposal-email is only called inside saveToCRM if `proposalId` is non-null (line 221: `if (proposalId)`). If the generate-proposal edge function fails, the email is skipped silently. This is a conservative design choice — avoids orphaned emails without a database record — but means a Supabase outage silently suppresses delivery.

---

### Human Verification Required

#### 1. End-to-End Conversation Flow

**Test:** Navigate to `/get-started`, click "Yes, let's get started", complete all 6 steps with real data including a Shopify platform selection
**Expected:** Legacy PlatformWarning renders after detectPlatformTier returns 'legacy'; ProposalCard renders after calculateProposal; both CTAs appear; streaming indicator shows during AI responses
**Why human:** Requires live Gemini API key, network streaming, and visual component rendering

#### 2. PDF Proposal Download

**Test:** After completing the conversation, click "Download PDF Proposal"
**Expected:** Browser opens/downloads a branded PDF with prospect name, package name, setup total, monthly total, and integration line items
**Why human:** Binary PDF output requires visual inspection; base64 data URI behavior differs by browser

#### 3. Proposal Email Delivery

**Test:** Complete the intake conversation and provide an email address; check inbox within 60 seconds
**Expected:** Email from info@adamsilvaconsulting.com arrives with correct package name, pricing, PDF link, and Book Strategy Call button
**Why human:** Requires deployed Supabase edge functions, live Resend API key, and inbox access

#### 4. CRM Webhook Integration

**Test:** Set ASC_CRM_WEBHOOK_URL to a webhook.site URL; complete a conversation; inspect the webhook payload
**Expected:** POST with event='proposal_created', prospect object, and proposal object arrives within the conversation completion
**Why human:** Requires live webhook endpoint and manual payload inspection

#### 5. 48-Hour Follow-Up Cron

**Test:** Seed a proposal row with `created_at = NOW() - INTERVAL '49 hours'`, `status = 'pending_call'`, `followup_sent_at = NULL`; trigger GET /api/intake/followup with Authorization: Bearer {CRON_SECRET}
**Expected:** Follow-up email sent to prospect; `followup_sent_at` updated in DB; response: `{ success: true, sent: 1 }`
**Why human:** Requires database seeding, Supabase access, and email delivery verification

---

### Gap Resolution

The single gap from the initial verification has been resolved:

**Gap:** `.env.example` did not document `GOOGLE_GENERATIVE_AI_API_KEY`. The default `MODEL_PROVIDER` in `lib/intake/model.ts` is `'google'`, but an operator following the example file would not know to set a Google API key.

**Resolution confirmed:** `.env.example` line 13 now reads:
```
GOOGLE_GENERATIVE_AI_API_KEY=AIza...               # required if MODEL_PROVIDER=google (default)
```
Line 12 sets `MODEL_PROVIDER=google` with `# Options: 'google' | 'anthropic' | 'openai'` as inline documentation. All 9 required Phase 4 environment variables are present and annotated with comments explaining their purpose and conditionality.

---

_Initial verification: 2026-03-02_
_Re-verified: 2026-03-02_
_Verifier: Claude (gsd-verifier)_
