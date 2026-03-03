# Phase 5: Topical Authority Map Agent — Context

**Gathered:** 2026-03-03
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/PRD.md) + live codebase inspection + Google AI Studio Deep Research API

<domain>
## Phase Boundary

Phase 5 builds the monthly content intelligence layer: a research pipeline that uses Gemini with Google Search grounding ("deep research") to identify topical authority gaps per client, generates a ranked JSON authority map, stores it in Supabase, and sends the client an approval email before content production begins.

**Deliverables (from PRD Section 11 + Sub-module 2a):**
- `lib/authority-map/types.ts` — AuthorityMapTopic, AuthorityMapResult, ClientConfig interfaces
- `lib/authority-map/researcher.ts` — Gemini + Google Search grounding research pipeline
- `app/api/authority-map/generate/route.ts` — POST endpoint: research → Supabase insert → approval email
- `app/api/authority-map/approve/route.ts` — GET endpoint: client clicks link → updates approved_at in Supabase
- `app/api/authority-map/cron/route.ts` — Vercel Cron handler: reads client list, calls generate for each
- `vercel.json` — Add cron entry for first Monday of each month
- `.env.example` — Document new Phase 5 env vars

**Foundation already built (do NOT rebuild):**
- Phase 2: `authority_maps` table in Supabase (client_id TEXT, month TEXT, topics_json JSONB, approved_at TIMESTAMPTZ, UNIQUE(client_id, month))
- Phase 4: `@ai-sdk/google` v3.0.36 installed, `GOOGLE_GENERATIVE_AI_API_KEY` in .env.example
- Phase 4: `vercel.json` exists with crons array (add to it — do NOT recreate)
- Phase 2/4: `email-service` edge function with Resend (pattern used by send-proposal-email)
- `SUPABASE_SERVICE_ROLE_KEY` documented in .env.example

**PRD notes NotebookLM MCP — REPLACED by Google AI Studio Deep Research:**
- PRD Section 11 Phase 5 specified "NotebookLM MCP" but that was explicitly deferred from Phase 4
- User direction: use Google AI Studio deep research feature (Gemini + Google Search grounding)
- `@ai-sdk/google` already has `google.tools.googleSearch()` (ProviderToolFactory) — no new package needed

</domain>

<decisions>
## Implementation Decisions

### Google AI Studio Deep Research Pattern (LOCKED — user directive)

Use `generateText` from `ai` with `@ai-sdk/google` and Google Search grounding for the research pipeline. This is the "deep research" capability.

```typescript
// lib/authority-map/researcher.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

const google = createGoogleGenerativeAI()

const { text } = await generateText({
  model: google('gemini-2.0-flash'),
  tools: {
    google_search: google.tools.googleSearch(),
  },
  maxSteps: 10,
  system: RESEARCHER_SYSTEM_PROMPT,
  prompt: `Research topical authority gaps for a ${industry} business...`,
})
// text = the model's final response after using Google Search tool
// Parse JSON from text for the authority map topics
```

**Note on ai@6 vs older API:** The `tools` object in `generateText` uses the same `@ai-sdk/google` provider tool pattern. If `google.tools.googleSearch()` doesn't type-check in ai@6, use `providerOptions`:
```typescript
// Fallback: providerOptions.google.useSearchGrounding
const { text } = await generateText({
  model: google('gemini-2.0-flash'),
  providerOptions: {
    google: { useSearchGrounding: true }
  },
  prompt: '...',
})
```
Executor should try `google.tools.googleSearch()` first and fall back to `providerOptions` if types fail.

### Authority Map Output Schema (LOCKED — from PRD Sub-module 2a)

```typescript
interface AuthorityMapTopic {
  rank: number                       // 1-based ranking by opportunity score
  title: string                      // Blog post / content topic title
  targetQueries: string[]            // Search queries this topic addresses
  authorityGapScore: number          // 0-100: gap in market coverage
  recommendedSchemaTypes: string[]   // ['Article', 'FAQPage', 'HowTo']
  faqClusters: string[]              // Key questions to answer in the content
  estimatedCitationLift: string      // e.g. "3-5 AI citations/month"
}

interface AuthorityMapResult {
  clientId: string
  month: string                      // 'YYYY-MM' format
  topics: AuthorityMapTopic[]        // 5-10 ranked topics
}

interface ClientConfig {
  clientId: string
  industry: string
  serviceArea: string                // e.g. "Atlanta, GA" or "US"
  approvalEmail: string              // Who receives the approval email
  existingContentUrls?: string[]     // Optional: URLs of existing posts for gap analysis
}
```

### Supabase authority_maps Table (LOCKED — from Phase 2 migration 008)

Columns to populate on map save:
```
client_id (TEXT), month (TEXT 'YYYY-MM'), topics_json (JSONB), approved_at (null until approved)
```

Insert uses UPSERT (`ON CONFLICT (client_id, month) DO UPDATE`) — safe to re-run generation for same month.

Use Supabase REST API with SUPABASE_SERVICE_ROLE_KEY (same pattern as generate-proposal edge function — but this is a Next.js API route, not Deno).

### POST /api/authority-map/generate (LOCKED)

```
Input: { clientId: string, industry: string, serviceArea: string, approvalEmail: string, existingContentUrls?: string[] }
Flow:
  1. Call researcher.ts → generateAuthorityMap(input) → AuthorityMapTopic[]
  2. Upsert row in authority_maps (client_id, month, topics_json)
  3. Send approval email via Resend (not supabase edge fn — direct Resend API call from route)
  4. Return { success: true, mapId, topicCount }
```

The approval email contains a link: `${NEXT_PUBLIC_SITE_URL}/api/authority-map/approve?id={mapId}`
The `id` (UUID from authority_maps table) serves as the approval token for v1.

### GET /api/authority-map/approve (LOCKED)

```
Input: Query params: id (UUID — the authority_maps row id)
Flow:
  1. Fetch authority_maps row by id
  2. If approved_at already set → return "Already approved"
  3. PATCH approved_at = NOW() via Supabase REST
  4. Return simple HTML confirmation page (or redirect to thank-you URL)
```

Security note for v1: the UUID row ID serves as an unguessable approval token (36-char UUID). Good enough for v1.

### Vercel Cron — First Monday of Each Month (LOCKED — AUTHMAP-03)

```json
// vercel.json — ADD to existing crons array (already has /api/intake/followup)
{ "path": "/api/authority-map/cron", "schedule": "0 9 1-7 * 1" }
```

`0 9 1-7 * 1` = 9 AM UTC, on Mondays (day of week = 1) in the first 7 days of the month = first Monday.

The cron route reads client configs from `AUTHORITY_MAP_CLIENTS` env var (JSON array of ClientConfig objects). This is the v1 approach — no clients table yet.

### GET /api/authority-map/cron (LOCKED)

```
Input: Vercel Cron auto-sends CRON_SECRET header (reuse existing CRON_SECRET from Phase 4)
Flow:
  1. Verify CRON_SECRET header
  2. Parse AUTHORITY_MAP_CLIENTS env var (JSON: ClientConfig[])
  3. For each client: POST to /api/authority-map/generate with client config
  4. Return { processed: N, errors: [] }
```

Uses `fetch` to call its own generate endpoint (or inline calls to shared library function).

### Researcher System Prompt Design (Claude's Discretion)

The researcher prompt must instruct Gemini to:
1. Search for the top content competitors in the industry/service area
2. Identify what questions AI engines (ChatGPT, Gemini, Perplexity) cite when asked about this industry
3. Cross-reference with the client's existing content URLs (if provided) to find gaps
4. Produce a JSON array of 5-10 ranked topics in the AuthorityMapTopic schema
5. Return ONLY valid JSON in the final response (no prose wrapping)

### Approval Email Design (Claude's Discretion)

Email via direct Resend API call (not supabase edge function — simpler from Next.js route):
- From: "Adam Silva Consulting <info@adamsilvaconsulting.com>"
- Subject: "Your [Month] Content Calendar is Ready — Review Required"
- Body: brief explanation + table of top 5 topics + [Approve Content Calendar] button (links to approve route) + [Modify Topics] reply-to instruction
- HTML branded with #1B2E4B + #4D8EC0 (matching Phase 4 email pattern)

### TypeScript Constraints (LOCKED — project conventions)

- Strict mode, no `any` types
- Path alias `@/lib/...`, `@/app/...` via tsconfig `@/*` → `./`
- Named exports only (no default exports)
- All API routes: Zod input validation (already have `zod` installed from Phase 4)

### Environment Variables for Phase 5

Required (add to .env.example):
```
GOOGLE_GENERATIVE_AI_API_KEY=   # already in .env.example (from Phase 4 model.ts fix)
AUTHORITY_MAP_CLIENTS=          # JSON array: [{clientId,industry,serviceArea,approvalEmail}]
RESEND_API_KEY=                 # already set (reuse from Phase 4)
NEXT_PUBLIC_SITE_URL=           # already set
CRON_SECRET=                    # already set (reuse from Phase 4)
SUPABASE_SERVICE_ROLE_KEY=      # already set
```

No new env vars needed that aren't already in .env.example — Phase 5 reuses all Phase 4 infrastructure. Just `AUTHORITY_MAP_CLIENTS` is new.

### File Paths (LOCKED)

```
lib/authority-map/types.ts
lib/authority-map/researcher.ts
app/api/authority-map/generate/route.ts
app/api/authority-map/approve/route.ts
app/api/authority-map/cron/route.ts
vercel.json (modify existing — add cron entry)
.env.example (modify existing — add AUTHORITY_MAP_CLIENTS)
```

</decisions>

<specifics>
## Specific Ideas

### Researcher Prompt Template

```
You are a content strategist and SEO researcher. Your job is to identify the highest-opportunity content topics for a ${industry} business in ${serviceArea}.

Use Google Search to:
1. Find the top 5 competitor sites in this industry/area and analyze their content
2. Search for common questions people ask about ${industry} in ${serviceArea}
3. Look for what AI tools (ChatGPT, Gemini, Perplexity) answer when asked about ${industry} services
4. Identify gaps: high-authority topics that competitors are thin on or missing

${existingContentUrls.length > 0 ? `Client's existing content (these topics are already covered — do NOT recommend them):
${existingContentUrls.join('\n')}` : ''}

Return ONLY a valid JSON array of 5-10 topics using EXACTLY this structure:
[
  {
    "rank": 1,
    "title": "...",
    "targetQueries": ["...", "..."],
    "authorityGapScore": 85,
    "recommendedSchemaTypes": ["Article", "FAQPage"],
    "faqClusters": ["What is...?", "How much does...?"],
    "estimatedCitationLift": "4-6 AI citations/month"
  }
]

Rank by authorityGapScore descending. No prose — JSON only.
```

### Supabase Upsert Pattern (from Next.js route — not Deno)

```typescript
// Use fetch with SUPABASE_SERVICE_ROLE_KEY — same REST API pattern as edge functions
const res = await fetch(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/authority_maps`,
  {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation,resolution=merge-duplicates',  // UPSERT behavior
    },
    body: JSON.stringify({
      client_id: clientId,
      month: format(new Date(), 'yyyy-MM'),   // 'date-fns' not installed — use template literal
      topics_json: topics,
    }),
  }
)
const [row] = await res.json()
// row.id = the UUID to use in approval link
```

**Month format without date-fns:**
```typescript
const now = new Date()
const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
```

### Approve Route — Simple HTML Response

```typescript
// app/api/authority-map/approve/route.ts
// Returns simple HTML — no React page needed
return new Response(
  `<html><body><h1>Content Calendar Approved</h1>
   <p>Your ${month} content calendar has been approved. Blog production begins this week.</p>
   </body></html>`,
  { headers: { 'Content-Type': 'text/html' } }
)
```

### ai@6 generateText with Google Search Tool

ai@6 renamed `maxSteps` to `stopWhen: stepCountIs(N)` — check this in researcher.ts if `maxSteps` type-errors.

```typescript
import { generateText, stepCountIs } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI()

const { text } = await generateText({
  model: google('gemini-2.0-flash'),
  tools: { google_search: google.tools.googleSearch() },
  stopWhen: stepCountIs(10),   // ai@6 API
  system: SYSTEM_PROMPT,
  prompt: buildPrompt(input),
})
```

### Cron Route — Inline vs Fetch Pattern

For the cron route, prefer calling the shared `generateAuthorityMap` function directly from `lib/authority-map/researcher.ts` rather than fetching its own API. This avoids circular HTTP calls and CRON_SECRET auth complications.

```typescript
// app/api/authority-map/cron/route.ts
import { generateAuthorityMap } from '@/lib/authority-map/researcher'
// then call generateAuthorityMap(clientConfig) for each client
// still does the Supabase insert and email from the shared lib or generate route logic
```

Or extract the core logic into a shared function called by both the POST route and the cron.

</specifics>

<deferred>
## Deferred Ideas

- NotebookLM MCP integration — replaced by Google AI Studio Deep Research (Gemini + Google Search grounding)
- Client portal view for authority maps — Phase 9 (client portal)
- Modify topics flow (full UI) — v2 (reply-to email handles modifications manually in v1)
- Multi-client parallel generation with Promise.allSettled — Phase 5 v1 runs sequentially to avoid rate limits
- Competitor URL ingestion via web scraping — v2 (v1 relies on Gemini's search tool)
- Authority map diff (month-over-month gap comparison) — v2
- Slack notification to ASC team on map generation — Phase 7 (notifications)
- Stripe-gated client portal access — v2

</deferred>

---

*Phase: 05-topical-authority-map-agent*
*Context gathered: 2026-03-03 via PRD Express Path + codebase inspection + Google AI Studio API*
