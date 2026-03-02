# Phase 4: Agentic Intake Agent — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/PRD.md) + live codebase inspection

<domain>
## Phase Boundary

Phase 4 builds the full agentic intake pipeline: a streaming conversational AI chatbot at `/get-started` that qualifies prospects, detects their tech stack, classifies tools against the integration catalog, generates a custom proposal, stores it in Supabase, emails a PDF, fires a CRM webhook, and triggers a 48-hour follow-up sequence.

**Deliverables (from PRD Section 11 + Module 1):**
- `app/(marketing)/get-started/page.tsx` — conversational intake UI using Phase 1 components
- `app/api/intake/chat/route.ts` — Vercel AI SDK `streamText` route with 5 tool definitions
- `lib/intake/tools.ts` — AI tool implementations (calculateProposal, detectPlatformTier, lookupIntegration, generateProposalPDF, saveToCRM)
- `lib/intake/model.ts` — MODEL_PROVIDER routing logic (Anthropic / OpenAI, never hardcoded)
- PDF proposal generation (React-PDF or PDFKit — Claude's discretion)
- Implement `supabase/functions/generate-proposal/index.ts` (scaffold awaiting this phase)
- Implement `supabase/functions/send-proposal-email/index.ts` (scaffold awaiting this phase)

**Foundation already built (do NOT rebuild):**
- Phase 1: `IntakeStep`, `ChatBubble`, `PlatformWarning`, `ProposalCard`, `Button`, `Badge` — all in `components/ui/`
- Phase 3: `calculatePricing()`, `selectTier()`, `lookupIntegration()` — all in `lib/pricing/` and `lib/integrations/`
- Phase 2: `proposals` table in Supabase + `email-service` edge function with Resend
- Phase 2: `generate-proposal` and `send-proposal-email` edge function scaffolds (ready for implementation)

**Packages NOT yet installed (must add):**
- `ai` — Vercel AI SDK core (streamText, useChat, tool-calling)
- `@ai-sdk/anthropic` — Anthropic provider adapter
- `@ai-sdk/openai` — OpenAI provider adapter
- `zod` — runtime validation for tool input schemas
- `@react-pdf/renderer` — PDF generation (OR `pdfkit` — Claude's discretion)

</domain>

<decisions>
## Implementation Decisions

### File Paths (LOCKED — from PRD Section 11 + Module 1)

Exact paths required:
- `app/(marketing)/get-started/page.tsx` — intake UI page
- `app/api/intake/chat/route.ts` — streaming API route
- `lib/intake/tools.ts` — tool implementations
- `lib/intake/model.ts` — MODEL_PROVIDER resolution

Route group `(marketing)` does not yet exist — must create with `mkdir -p app/(marketing)/get-started`.

### Conversation Flow (LOCKED — from PRD Module 1)

6 sequential steps:

**Step 1: Business Context**
- Industry (dropdown: 10 categories)
- Number of locations (1 / 2-5 / 6-20 / 20+)
- Monthly leads (under 50 / 50-200 / 200-500 / 500+)

**Step 2: Stack Discovery** (sequential, one category at a time)
- CRM: HubSpot | Salesforce | Pipedrive | Zoho | GoHighLevel | Monday Sales | Freshsales | Close | Keap | ActiveCampaign | None | Other
- Booking: Calendly | Acuity | Google Calendar | Outlook | SimplyBook | ServiceTitan | Mindbody | Vagaro | Jobber | Housecall Pro | Phone only | Other
- Website Platform: Next.js/Custom | Shopify | WooCommerce | WordPress | Webflow | Wix | Squarespace | Magento | Other
- Email Marketing: Klaviyo | Mailchimp | HubSpot | ActiveCampaign | Brevo | ConvertKit | Drip | Beehiiv | None | Other
- Payment Processor: Stripe | Square | PayPal | Adyen | Authorize.net | QuickBooks Payments | Invoice manually | Other
- Helpdesk: Zendesk | Freshdesk | HubSpot Service | Intercom | None | Other
- Accounting: QuickBooks | Xero | FreshBooks | Wave | None | Other
- Other tools: Free text field

**Step 3: Goal Selection** (multi-select, up to 3)
- More booked appointments automatically
- Qualify and capture leads 24/7
- Automate blog content for AI search
- Get cited by ChatGPT / Gemini / Perplexity
- Syndicate press releases for brand authority
- Automate lead follow-up
- Connect all tools (nothing falls through cracks)
- Make site discoverable to AI shopping agents (UCP/ACP) → maps to `ucp`/`acp` goal codes
- Replace phone reception with AI

**Step 4: Platform Branch Logic** (LOCKED)
- platform ∈ {Shopify, Wix, Squarespace, WordPress (heavy)} → show legacy platform warning → offer PATH A (Legacy Add-On) or PATH B (Migration)
- platform ∈ {Next.js, Custom, Webflow, Headless} → full package flow
- platform = "No website yet" → Migration-first recommendation

**Step 5: Proposal Generation** (LOCKED — must use Phase 3 engine)
- Call `lookupIntegration()` for each named tool → classify Tier 1/2/3
- Call `selectTier(input)` with integrations, monthlyLeads, goals, platform, locationCount
- Call `calculatePricing(packageSlug, integrations)` → PricingResult
- Display proposal card in-chat using `ProposalCard` component

**Step 6: Proposal Delivery** (LOCKED)
- Display in-chat as formatted card (ProposalCard component)
- Store in Supabase `proposals` table
- Send PDF to prospect email via `send-proposal-email` edge function (Resend)
- Fire CRM webhook (`ASC_CRM_WEBHOOK_URL` env var)
- Trigger 48-hour follow-up sequence if no call booked
- Show [Book Strategy Call] + [Download PDF Proposal] CTAs

### AI Tool Definitions (LOCKED — from PRD + ROADMAP)

Five tools the AI agent can call during intake:

```typescript
// 1. lookupIntegration(name: string) → { tier, setupCost, monthlyCost } | null
//    Uses lib/integrations/catalog.ts CATALOG lookup
//    Called for each named tool the prospect mentions

// 2. detectPlatformTier(platform: string) → 'legacy' | 'full' | 'migration'
//    Routes prospect to correct path

// 3. calculateProposal(input: TierSelectorInput) → { packageSlug, pricingResult, recommendation }
//    Uses selectTier() + calculatePricing() from lib/pricing/
//    Called after all tools collected

// 4. generateProposalPDF(proposalData: ProposalData) → { pdfUrl: string }
//    Generates PDF, uploads to Vercel Blob or returns data URL

// 5. saveToCRM(proposalId: string, prospectData: ProspectData) → { success: boolean }
//    Fires webhook to ASC_CRM_WEBHOOK_URL
//    Creates contact + deal
```

### MODEL_PROVIDER Pattern (LOCKED — INTAKE-09, never hardcode)

```typescript
// lib/intake/model.ts
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import type { LanguageModelV1 } from 'ai'

export function getIntakeModel(): LanguageModelV1 {
  const provider = process.env.MODEL_PROVIDER ?? 'anthropic'
  if (provider === 'openai') {
    return createOpenAI()('gpt-4o')
  }
  return createAnthropic()('claude-sonnet-4-5-20251001')
}
```

### Supabase proposals table (LOCKED — from Phase 2 schema)

Columns to populate on proposal save:
```
prospect_name, prospect_email, industry, locations, monthly_leads,
platform, platform_tier, integrations_detected (jsonb),
recommended_package, setup_total, monthly_total,
goals (jsonb), proposal_pdf_url, status='pending_call', crm_deal_id
```

### Edge Functions (LOCKED — Phase 2 scaffolds, Phase 4 implements)

`supabase/functions/generate-proposal/index.ts`:
- Accept: `{ prospect_name, prospect_email, industry, platform, integrations_detected[], goals[], recommended_package, setup_total, monthly_total }`
- Insert row into `proposals` table using service role key
- Return: `{ success: true, proposal_id }`

`supabase/functions/send-proposal-email/index.ts`:
- Accept: `{ proposal_id, prospect_email, prospect_name, proposal_pdf_url }`
- Call Resend API (already wired in `email-service/index.ts` pattern)
- Return: `{ success: true, email_id }`

### Follow-Up Sequence (LOCKED — INTAKE-08)

Triggered after proposal delivery if no call booked:
- At proposal save: record `proposal_id` + `created_at` + `status='pending_call'`
- 48-hour check: Vercel Cron or webhook-based — if `status='pending_call'` and `created_at < now - 48h`, send follow-up email
- Implementation: Vercel Cron job at `app/api/intake/followup/route.ts` (daily check) or use Supabase scheduled function
- Claude's discretion on exact implementation mechanism

### CRM Webhook (LOCKED — INTAKE-07)

```typescript
// POST to process.env.ASC_CRM_WEBHOOK_URL
const payload = {
  event: 'proposal_created',
  prospect: { name, email, industry, platform, monthlyLeads },
  proposal: { packageSlug, setupTotal, monthlyTotal, proposalId }
}
```

ASC_CRM_API_KEY sent as Bearer token in Authorization header.

### TypeScript Constraints (LOCKED — project conventions)

- Strict mode, no `any` types
- Path alias `@/lib/...`, `@/components/...` via tsconfig `@/*` → `./`
- Named exports consistent with existing codebase
- No default exports

### Claude's Discretion

- PDF library: `@react-pdf/renderer` (React-PDF) vs `pdfkit` — React-PDF is better suited for Next.js 14 App Router
- Whether PDF is generated server-side in the API route or client-side
- Exact system prompt for the intake agent (tone, phrasing, how to guide through steps)
- Whether to use Vercel Blob or return base64 PDF (simpler for v1)
- Exact follow-up implementation (Vercel Cron vs Supabase cron function)
- Whether to put intake logic in a React Server Component or Client Component + API (useChat hook pattern)
- How to handle the "Other" free-text tool input (flag for review, book discovery call per PRD edge case)

</decisions>

<specifics>
## Specific Ideas

### Vercel AI SDK Streaming Pattern (App Router)

```typescript
// app/api/intake/chat/route.ts
import { streamText } from 'ai'
import { getIntakeModel } from '@/lib/intake/model'
import { intakeTools } from '@/lib/intake/tools'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: getIntakeModel(),
    system: INTAKE_SYSTEM_PROMPT,
    messages,
    tools: intakeTools,
    maxSteps: 10,  // allow multiple tool calls per conversation turn
  })

  return result.toDataStreamResponse()
}
```

### Client Page Pattern (useChat)

```typescript
// app/(marketing)/get-started/page.tsx
'use client'
import { useChat } from 'ai/react'
import { ChatBubble, IntakeStep, PlatformWarning, ProposalCard } from '@/components/ui'

export default function GetStartedPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/intake/chat',
  })
  // render intake UI using Phase 1 components
}
```

### Proposal Data Shape (for PDF + Supabase)

```typescript
interface ProposalData {
  prospectName: string
  prospectEmail: string
  industry: string
  platform: string
  locationCount: number
  monthlyLeads: number
  goals: string[]
  integrations: Array<{ name: string; tier: number; included: boolean; setupCost: number; monthlyCost: number }>
  packageSlug: string
  baseSetup: number
  baseMonthly: number
  overageSetup: number
  overageMonthly: number
  setupTotal: number
  monthlyTotal: number
  proposalId?: string
  createdAt: string
}
```

### Phase 1 Components to Use

All in `components/ui/`:
- `IntakeStep` — wraps each step's content, shows step number + title
- `ChatBubble` — renders agent and user messages
- `PlatformWarning` — shows legacy platform blocker with two-path CTA
- `ProposalCard` — renders the final proposal with line items and totals
- `Button` — CTA buttons (Book Strategy Call, Download PDF)
- `Badge` — shows tier/integration labels

### Existing Supabase Credentials

The Supabase client is already set up in `lib/supabase/`. Phase 4 should use the server client for proposal inserts via the service role key.

### Environment Variables for Phase 4

Required (not yet in .env.local — document in README):
```
MODEL_PROVIDER=anthropic         # or 'openai'
ANTHROPIC_API_KEY=               # for claude-sonnet
OPENAI_API_KEY=                  # for gpt-4o (optional, for MODEL_PROVIDER=openai)
RESEND_API_KEY=                  # for email (already used by email-service edge function)
ASC_CRM_WEBHOOK_URL=             # where to POST new CRM deals
ASC_CRM_API_KEY=                 # CRM auth token
NEXT_PUBLIC_SUPABASE_URL=        # already set
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # already set
SUPABASE_SERVICE_ROLE_KEY=       # for server-side proposal inserts
VERCEL_BLOB_READ_WRITE_TOKEN=    # for PDF upload (if using Vercel Blob)
```

### PRD Edge Cases (LOCKED)

- 10+ integrations → route to Core automatically, alert sales team
- No existing tools → Bronze with CRM selection guidance
- Unknown tool (not in CATALOG) → flag for technical review, book discovery call
- Enterprise stack (SAP/NetSuite/Oracle ERP/Microsoft Dynamics) → Core auto-route

</specifics>

<deferred>
## Deferred Ideas

- NotebookLM MCP integration — Phase 5 (Authority Map Agent), not Phase 4
- Multi-tenant proposal history — Phase 9 client portal
- Stripe billing for proposal acceptance — v2 (manual invoicing for now)
- Real-time CRM sync (bidirectional) — v2
- Proposal revision/negotiation flow — v2
- Multi-language intake — v2
- Voice intake channel — Phase 8 (Chatbot Module)
- CRM adapters (10 Tier 1 CRMs) — Phase 8 (Chatbot Module)

</deferred>

---

*Phase: 04-agentic-intake-agent*
*Context gathered: 2026-03-02 via PRD Express Path + live codebase inspection*
