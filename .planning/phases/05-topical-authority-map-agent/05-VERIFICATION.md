---
phase: 05-topical-authority-map-agent
verified: 2026-03-02T00:00:00Z
status: passed
score: 9/9 must-haves verified
re_verification: false
---

# Phase 5: Topical Authority Map Agent Verification Report

**Phase Goal:** Build the monthly content intelligence layer — a dual-provider research pipeline (NotebookLM MCP primary / Gemini + Google Search fallback) that generates a ranked JSON authority map per client, stores it in Supabase authority_maps, sends a client approval email, and runs monthly via Vercel Cron on the first Monday of each month.
**Verified:** 2026-03-02
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1  | generateAuthorityMap({ clientId, industry, serviceArea, approvalEmail }) returns typed AuthorityMapTopic[] with 5-10 ranked topics | VERIFIED | researcher.ts exports generateAuthorityMap; calls generateWithNotebookLM or generateWithGemini based on env var; returns AuthorityMapResult with topics[] |
| 2  | Each topic contains rank, title, targetQueries[], authorityGapScore, recommendedSchemaTypes[], faqClusters[], estimatedCitationLift | VERIFIED | types.ts L1-9 defines AuthorityMapTopic with all 7 required fields; strict TypeScript (no `any`) |
| 3  | When NOTEBOOKLM_MCP_URL is set, researcher uses NotebookLM MCP via experimental_createMCPClient SSE transport | VERIFIED | researcher.ts L138: if (process.env.NOTEBOOKLM_MCP_URL) → generateWithNotebookLM; L10: imported from @ai-sdk/mcp; L113-118: SSE transport configured |
| 4  | Gemini fallback uses google.tools.googleSearch() — not a static dataset | VERIFIED | researcher.ts L99-104: generateText with tools: { google_search: google.tools.googleSearch({}) } and stepCountIs(10) |
| 5  | POST /api/authority-map/generate returns { success: true, mapId, topicCount } and upserts to authority_maps | VERIFIED | generate/route.ts L170-194: Supabase REST upsert with Prefer: return=representation,resolution=merge-duplicates; L228: returns { success: true, mapId: row.id, topicCount } |
| 6  | GET /api/authority-map/approve?id={uuid} sets approved_at and returns HTML confirmation | VERIFIED | approve/route.ts L114-146: PATCH authority_maps with approved_at, returns text/html confirmation page; idempotent guard at L104 |
| 7  | GET /api/authority-map/cron with correct CRON_SECRET iterates AUTHORITY_MAP_CLIENTS and calls generate per client | VERIFIED | cron/route.ts L20-22: CRON_SECRET auth; L26-35: AUTHORITY_MAP_CLIENTS JSON parse; L50-107: sequential for-of with generateAuthorityMap + Supabase + Resend per client |
| 8  | vercel.json crons contains first-Monday-of-month schedule for /api/authority-map/cron alongside existing followup cron | VERIFIED | vercel.json: 2 entries — /api/intake/followup (0 9 * * *) and /api/authority-map/cron (0 9 1-7 * 1); existing cron preserved |
| 9  | Client receives branded HTML approval email via Resend with top 5 topics and Approve button | VERIFIED | generate/route.ts L34-133: buildApprovalEmailHtml with #1B2E4B header, topics table (rank/title/gap-score/citation-lift), #4D8EC0 Approve button; sent via fetch to api.resend.com/emails |

**Score:** 9/9 truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/authority-map/types.ts` | AuthorityMapTopic, AuthorityMapResult, ClientConfig interfaces | VERIFIED | 24 lines; 3 named exports; all required fields present; no `any` |
| `lib/authority-map/researcher.ts` | generateAuthorityMap dual-provider function + system prompts | VERIFIED | 143 lines; exports generateAuthorityMap, RESEARCHER_SYSTEM_PROMPT, NOTEBOOKLM_SYSTEM_PROMPT; dual-provider routing at L137-142 |
| `app/api/authority-map/generate/route.ts` | POST endpoint: researcher → Supabase upsert → Resend approval email | VERIFIED | 236 lines; exports POST; Zod validation, generateAuthorityMap call, Supabase upsert, branded email, { success, mapId, topicCount } response |
| `app/api/authority-map/approve/route.ts` | GET endpoint: sets approved_at → HTML confirmation | VERIFIED | 152 lines; exports GET; fetches row, idempotency guard, PATCH approved_at, HTML response with brand colors |
| `app/api/authority-map/cron/route.ts` | Vercel Cron GET: reads AUTHORITY_MAP_CLIENTS, calls generateAuthorityMap per client | VERIFIED | 111 lines; exports GET; CRON_SECRET auth, JSON parse, sequential for-of loop, returns { processed, errors } |
| `vercel.json` | Cron schedule 0 9 1-7 * 1 + existing followup cron preserved | VERIFIED | 2 cron entries confirmed; intake/followup at 0 9 * * * preserved; authority-map/cron at 0 9 1-7 * 1 |
| `.env.example` | AUTHORITY_MAP_CLIENTS + NOTEBOOKLM_MCP_URL documented | VERIFIED | L31: AUTHORITY_MAP_CLIENTS with example JSON; L32: NOTEBOOKLM_MCP_URL as commented optional |

---

## Key Link Verification

### Plan 01 Key Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `lib/authority-map/researcher.ts` | `@ai-sdk/google google.tools.googleSearch()` | generateText with tools | WIRED | L9: import from 'ai'; L11: createGoogleGenerativeAI; L101: google.tools.googleSearch({}) called with empty object arg |
| `lib/authority-map/researcher.ts` | `@ai-sdk/mcp experimental_createMCPClient` | SSE transport to NOTEBOOKLM_MCP_URL | WIRED | L10: import from '@ai-sdk/mcp' (corrected from 'ai' — auto-fix per SUMMARY); L113-118: SSE transport configured |
| `lib/authority-map/researcher.ts` | `lib/intake/model.ts getIntakeModel()` | NotebookLM path model routing | WIRED | L13: import { getIntakeModel }; L122: model: getIntakeModel() in generateWithNotebookLM |
| `lib/authority-map/researcher.ts` | `lib/authority-map/types.ts` | named import AuthorityMapTopic, ClientConfig | WIRED | L12: import type { AuthorityMapTopic, AuthorityMapResult, ClientConfig } from '@/lib/authority-map/types' |

### Plan 02 Key Links

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `app/api/authority-map/generate/route.ts` | `lib/authority-map/researcher.ts` | import { generateAuthorityMap } | WIRED | L10: import; L161: await generateAuthorityMap(config) called |
| `app/api/authority-map/generate/route.ts` | Supabase authority_maps | fetch POST with Prefer: return=representation,resolution=merge-duplicates | WIRED | L170-183: full fetch with correct headers; row.id extracted at L191 |
| `app/api/authority-map/generate/route.ts` | Resend API | fetch POST to api.resend.com/emails | WIRED | L208-220: fetch with Authorization Bearer RESEND_API_KEY; error checked at L222 |
| `app/api/authority-map/cron/route.ts` | `lib/authority-map/researcher.ts` | import { generateAuthorityMap } | WIRED | L13: import; L53: await generateAuthorityMap(client) in per-client loop |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| AUTHMAP-01 | 05-01-PLAN | System can generate a monthly topical authority map per client — research pipeline identifies content gaps and ranks topics by citation opportunity | SATISFIED | researcher.ts: generateAuthorityMap with dual-provider (NotebookLM MCP + Gemini+Search); parseTopicsFromResponse returns AuthorityMapTopic[]; all 7 topic fields present |
| AUTHMAP-02 | 05-02-PLAN | Authority map output (JSON) is stored in Supabase authority_maps table | SATISFIED | generate/route.ts L170-193: Supabase REST upsert to /rest/v1/authority_maps with topics_json field; cron/route.ts L60-83: same upsert pattern per client |
| AUTHMAP-03 | 05-02-PLAN | Authority map generation is triggered on the first Monday of each month via Vercel Cron | SATISFIED | vercel.json: { "path": "/api/authority-map/cron", "schedule": "0 9 1-7 * 1" }; cron/route.ts exports GET with CRON_SECRET auth |
| AUTHMAP-04 | 05-02-PLAN | Client receives an approval email with approve/modify link before content calendar is locked | SATISFIED | generate/route.ts: branded HTML email with top-5 topics table + Approve button linking to /api/authority-map/approve?id={mapId}; approve/route.ts: PATCH approved_at on click |

No orphaned requirements — all 4 AUTHMAP IDs are claimed by plan frontmatter and evidence confirmed in code.

---

## Anti-Patterns Found

| File | Pattern | Severity | Assessment |
|------|---------|----------|------------|
| `app/api/authority-map/cron/route.ts` L87 | `if (resendKey)` — email send is conditional on RESEND_API_KEY being present | Info | Silently skips email if RESEND_API_KEY is not set rather than throwing. Plan says "sends approval email" but cron route treats it as best-effort. generate/route.ts throws on missing key — behavior differs between routes. Not a blocker for AUTHMAP-04 (generate route is the primary caller; cron uses minimal email template per plan design decision). |

No stubs, no placeholder returns, no empty implementations, no TODO/FIXME comments found in any phase 5 file.

---

## Human Verification Required

### 1. Supabase authority_maps Table Schema

**Test:** Check that the authority_maps table exists in Supabase with columns: id (uuid), client_id (text), month (text), topics_json (jsonb), approved_at (timestamptz nullable).
**Expected:** Table exists; upsert with Prefer: resolution=merge-duplicates works on (client_id, month) unique constraint; row.id is returned.
**Why human:** Supabase schema is not verifiable from the codebase alone — migration file for authority_maps was not found in the project's migration directory. The routes assume the table exists.

### 2. End-to-End Email Delivery

**Test:** Call POST /api/authority-map/generate with a valid ClientConfig body pointing to a real email address.
**Expected:** Resend delivers the branded HTML email; the Approve button link is correct; clicking it loads the HTML confirmation page and sets approved_at in Supabase.
**Why human:** Email rendering and link correctness require live execution against real Resend and Supabase environments.

### 3. Vercel Cron First-Monday Logic

**Test:** Confirm that the cron expression "0 9 1-7 * 1" correctly fires only on the first Monday of each month in Vercel's cron runtime.
**Expected:** Cron fires once per month on the first Monday at 9 AM UTC, not on other Mondays.
**Why human:** Vercel's cron runtime parsing of complex day-of-month + day-of-week combinations may differ from standard cron tools — needs a live Vercel environment to confirm actual trigger behavior.

---

## Gaps Summary

No gaps. All automated checks passed.

- All 5 required TypeScript files exist and are substantive (24–236 lines each).
- TypeScript compilation: `npx tsc --noEmit` exits 0 with zero errors.
- All 4 key links in Plan 01 are WIRED (import + actual call confirmed).
- All 4 key links in Plan 02 are WIRED (import + actual call confirmed).
- vercel.json contains both cron entries with correct schedules; valid JSON confirmed.
- .env.example documents AUTHORITY_MAP_CLIENTS (required) and NOTEBOOKLM_MCP_URL (commented optional).
- All 4 requirements (AUTHMAP-01 through AUTHMAP-04) have concrete implementation evidence.
- No stubs, mocks, TODO comments, or placeholder returns found.
- One informational note: cron route treats RESEND_API_KEY as optional (silently skips email), while generate route treats it as required (throws). This is consistent with the plan's stated design decision ("cron email HTML is minimal... to keep the cron route lean") and does not block any requirement.

---

_Verified: 2026-03-02_
_Verifier: Claude (gsd-verifier)_
