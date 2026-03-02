# Phase 2: Supabase Schema & Data Architecture — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/PRD.md)

<domain>
## Phase Boundary

Phase 2 creates the Supabase database layer that all downstream phases read and write. This phase delivers:
- 7 new tables with full column definitions and Row Level Security
- Seed data for integrations_catalog (all known Tier 1/2/3 tools) and packages (Bronze/Silver/Gold/Core/Legacy)
- SQL migration files in `/supabase/migrations/` (continuing from existing 001–003)
- 3 edge function scaffolds: `generate-proposal`, `send-proposal-email`, `create-crm-deal`

**Existing Supabase project:** cdifobufvgfpbcbvicjs (us-east-1)
**Existing tables (do not modify):** contact_submissions (001), leads (002), newsletter_signups (003)
**New migrations:** 004 through N — one per table or logical group

Nothing in this phase touches the Next.js app or component library. Pure database + edge function work.

</domain>

<decisions>
## Implementation Decisions

### Table Schemas (LOCKED — from PRD Section 7)

All 7 tables must exist with these columns (exact SQL types are Claude's discretion):

**integrations_catalog**
```
id, name, category, tier, setup_cost, monthly_cost,
api_available, connector_type, notes
```
- `tier`: integer (1, 2, or 3)
- `setup_cost`: numeric — Tier 1=$750, Tier 2=$1500, Tier 3=$3000–$5000 (use midpoint $4000 for Tier 3)
- `monthly_cost`: numeric — Tier 1=$150, Tier 2=$250, Tier 3=$500 (midpoint)

**packages**
```
id, name, slug, base_setup, base_monthly,
tier1_slots, tier2_slots, tier3_slots,
features_json, is_legacy_only
```

**proposals**
```
id, created_at, prospect_name, prospect_email,
industry, locations, monthly_leads,
platform, platform_tier,
integrations_detected jsonb,
recommended_package, setup_total, monthly_total,
goals jsonb, proposal_pdf_url, status,
crm_deal_id
```

**blog_posts**
```
id, client_id, title, slug, status,
authority_map_id, published_at,
schema_json jsonb, images jsonb, video_url,
strapi_id
```

**authority_maps**
```
id, client_id, month, topics_json jsonb,
created_at, approved_at
```

**chatbot_sessions**
```
id, client_id, channel, session_start,
messages jsonb, outcome, crm_contact_id,
appointment_booked, lead_value_estimate
```

**press_releases**
```
id, client_id, title, draft_text,
schema_json jsonb, video_url,
wire_service, distributed_at, status
```

### Package Definitions (LOCKED — from PRD Section 5)

Seed the packages table with these 6 packages:

| Name | Slug | Setup | Monthly | T1 slots | T2 slots | T3 slots | Legacy only |
|------|------|-------|---------|----------|----------|----------|-------------|
| Bronze | bronze | 16000 | 3500 | 3 | 0 | 0 | false |
| Silver | silver | 28000 | 6500 | 6 | 1 | 0 | false |
| Gold | gold | 48000 | 12000 | 12 | 3 | 1 | false |
| Core | core | 75000 | 0 | 99 | 99 | 99 | false |
| Shopify Starter | shopify-starter | 8500 | 2000 | 2 | 0 | 0 | true |
| Shopify Growth | shopify-growth | 16000 | 4000 | 4 | 1 | 0 | true |

- Core monthly = 0 (custom/negotiated — stored separately)
- Core slots = 99 (represents "unlimited" in the pricing engine)
- features_json: populate with bullet points from PRD Section 5

### Integration Catalog Seed (LOCKED — tools known from PRD)

All tools mentioned in the intake flow (PRD Section 6, Module 1) must be seeded with tier classification. Tier classification logic:
- **Tier 1** = pre-built connector / well-documented REST API (HubSpot, Stripe, Calendly, Mailchimp, QuickBooks, Zendesk, Pipedrive, etc.)
- **Tier 2** = REST API requiring custom data mapping or limited docs (Zoho, Monday Sales, Freshsales, Close, Keap, Vonage, Acuity)
- **Tier 3** = legacy system, no public API, or custom build required (ServiceTitan, SAP, NetSuite, Oracle, custom ERP)

Minimum seed: all tools listed in the intake conversation flow (PRD Module 1 Step 2).

### Row Level Security (LOCKED — all tables must have RLS)

Requirements DATA-07: All new tables have RLS enabled. Policy pattern:
- Enable RLS on every new table
- Default: deny all access
- Service role key bypasses RLS (server-side operations only)
- No anon read access on any commercial table (proposals, chatbot_sessions, etc. are sensitive)

### Edge Functions (LOCKED — 3 scaffolds required)

Three edge functions must be deployed and return non-error responses:
- `generate-proposal` — scaffold that accepts proposal data, returns 200 with placeholder response
- `send-proposal-email` — scaffold that accepts email + proposal ID, returns 200
- `create-crm-deal` — scaffold that accepts prospect data, returns 200

These are **scaffolds only** — full implementation in Phase 4. They must deploy without errors and respond to HTTP requests.

### Migration File Convention (LOCKED — follow existing pattern)

Existing migrations: `001_contact_submissions.sql`, `002_leads.sql`, `003_newsletter_signups.sql`
New migrations: `004_integrations_catalog.sql`, `005_packages.sql`, `006_proposals.sql`, etc.
- Each migration is idempotent (uses `CREATE TABLE IF NOT EXISTS`)
- RLS enable + policy in same file as table creation

### Claude's Discretion

- Exact SQL column types (uuid vs bigserial for id, varchar lengths, text vs varchar)
- Whether to use `uuid_generate_v4()` or `gen_random_uuid()` for primary keys
- Foreign key constraints between tables (e.g., blog_posts.authority_map_id → authority_maps.id)
- Index strategy (add indexes on client_id, status columns used in queries)
- Whether to group migrations (7 separate files vs logical groupings)
- Edge function runtime (Deno TypeScript — standard for Supabase)
- How to seed data (separate seed SQL files vs inline in migration)
- The `features_json` structure for each package tier

</decisions>

<specifics>
## Specific Ideas

### Column Type Recommendations

Use these patterns for consistency with existing migrations:
```sql
id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
created_at timestamptz DEFAULT now() NOT NULL,
```

For `client_id` — reference a text field (client identifier string) rather than a foreign key, since there's no clients table yet. Phase 4+ will establish client management.

### Integration Catalog Categories

Suggested category values for the seed:
- `crm` — HubSpot, Salesforce, Pipedrive, Zoho, GoHighLevel, Monday Sales, Freshsales, Close, Keap, ActiveCampaign
- `booking` — Calendly, Acuity, Google Calendar, Outlook, SimplyBook, ServiceTitan, Mindbody, Vagaro, Jobber, Housecall Pro
- `email` — Klaviyo, Mailchimp, ActiveCampaign, Brevo, ConvertKit, Drip, Beehiiv
- `payment` — Stripe, Square, PayPal, Adyen, Authorize.net, QuickBooks Payments
- `helpdesk` — Zendesk, Freshdesk, HubSpot Service, Intercom
- `accounting` — QuickBooks, Xero, FreshBooks, Wave
- `platform` — Next.js/Custom, Shopify, WooCommerce, WordPress, Webflow, Wix, Squarespace, Magento
- `erp` — SAP, NetSuite, Oracle ERP (Tier 3)

### Edge Function Scaffold Pattern

```typescript
// supabase/functions/generate-proposal/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  return new Response(
    JSON.stringify({ success: true, message: 'generate-proposal scaffold' }),
    { headers: { 'Content-Type': 'application/json' }, status: 200 }
  )
})
```

### Supabase Project Details (from MEMORY.md)

- Project ref: cdifobufvgfpbcbvicjs
- URL: https://cdifobufvgfpbcbvicjs.supabase.co
- Region: us-east-1
- Access token: sbp_9763ae3189e29a7f5180816da338c4058e192d2a (MCP)

### Existing Migration Files

```
supabase/migrations/001_contact_submissions.sql
supabase/migrations/002_leads.sql
supabase/migrations/003_newsletter_signups.sql
```

New migrations: start at 004.

</specifics>

<deferred>
## Deferred Ideas

- Client authentication / client management table — deferred to Phase 4+
- Stripe subscription tracking table — v2 (manual invoicing for v1)
- Multi-tenant data isolation — v2 (MULTI-01 requirement)
- Real-time subscriptions on chatbot_sessions — not needed until Phase 8
- Full edge function implementation (generate-proposal body, PDF generation, email sending) — Phase 4

</deferred>

---

*Phase: 02-supabase-schema-data-architecture*
*Context gathered: 2026-03-02 via PRD Express Path (.planning/PRD.md)*
