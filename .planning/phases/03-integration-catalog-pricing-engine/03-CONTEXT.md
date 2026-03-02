# Phase 3: Integration Catalog & Pricing Engine — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** PRD Express Path (.planning/PRD.md) + live Supabase data

<domain>
## Phase Boundary

Phase 3 builds the TypeScript pricing library that every subsequent phase depends on for proposal generation. This is pure `lib/` code — no Next.js pages, no API routes, no UI changes.

**Deliverables:**
- `lib/integrations/catalog.ts` — TypeScript wrapper over the live Supabase catalog
- `lib/pricing/types.ts` — shared TypeScript types for the pricing system
- `lib/pricing/calculator.ts` — slot logic + overage math + totals
- `lib/pricing/tier-selector.ts` — recommendation engine
- Unit tests for all pricing logic (requires adding a test framework — none currently installed)

Phase 4 (Agentic Intake Agent) depends directly on this library. The catalog.ts must be ready for the intake agent to classify tools and calculator.ts must produce the proposal totals.

</domain>

<decisions>
## Implementation Decisions

### File Paths (LOCKED — from ROADMAP)

Exact paths required:
- `lib/integrations/catalog.ts`
- `lib/pricing/calculator.ts`
- `lib/pricing/tier-selector.ts`
- `lib/pricing/types.ts` (additional types file — Claude's discretion on exact name, but needed)

All under `lib/` which is aliased as `@/lib/` via tsconfig `@/*` → `./`.

### Integration Tiers & Costs (LOCKED — from live Supabase integrations_catalog)

**Tier 1** ($750 setup / $150/mo) — 20 tools:
`ActiveCampaign, Calendly, ConvertKit, GoHighLevel, Google Calendar, HubSpot, HubSpot Service, Intercom, Klaviyo, Mailchimp, Next.js Custom, PayPal, Pipedrive, QuickBooks Online, Salesforce, Square, Stripe, Webflow, Xero, Zendesk`

**Tier 2** ($1,500 setup / $250/mo) — 21 tools:
`ActiveCampaign Email, Acuity Scheduling, Adyen, Authorize.net, Beehiiv, Brevo, Close, Drip, FreshBooks, Freshdesk, Freshsales, Keap, Monday Sales CRM, Outlook Calendar, QuickBooks Payments, Shopify, SimplyBook.me, Wave, WooCommerce, WordPress, Zoho CRM`

**Tier 3** ($4,000 setup / $500/mo) — 12 tools:
`Housecall Pro, Jobber, Magento, Microsoft Dynamics, Mindbody, NetSuite, Oracle ERP, SAP, ServiceTitan, Squarespace, Vagaro, Wix`

**Enterprise stack detection (routes to Core):** SAP, NetSuite, Oracle ERP, Microsoft Dynamics — any of these present → recommend Core tier.

### Package Definitions (LOCKED — from live Supabase packages table)

| Slug | T1 slots | T2 slots | T3 slots | Setup | Monthly | Legacy |
|------|----------|----------|----------|-------|---------|--------|
| bronze | 3 | 0 | 0 | $16,000 | $3,500 | false |
| silver | 6 | 1 | 0 | $28,000 | $6,500 | false |
| gold | 12 | 3 | 1 | $48,000 | $12,000 | false |
| core | 99 | 99 | 99 | $75,000 | custom | false |
| shopify-starter | 2 | 0 | 0 | $8,500 | $2,000 | true |
| shopify-growth | 4 | 1 | 0 | $16,000 | $4,000 | true |

Core slots = 99 (represents unlimited). core.base_monthly = 0 (custom engagement — not used in auto-calculation).

### Overage Pricing (LOCKED — from PRD Section 5)

When an integration is selected but its tier's slots are exhausted:
- Tier 1 overage = Tier 1 unit setup + unit monthly (same as included cost)
- Tier 2 overage = Tier 2 unit setup + unit monthly
- Tier 3 overage = Tier 3 unit setup + unit monthly

**Slot counting per package:** Each package has T1, T2, T3 slot buckets. Integrations consume from their tier's bucket first. When a bucket is empty, overages begin at that tier's unit price.

**Example (Bronze + 4 T1 integrations):**
- Bronze includes 3 T1 slots → 3 integrations included in base
- 4th T1 integration = T1 overage: +$750 setup, +$150/mo
- Calculator output: setup_total = 16000 + 750 = $16,750; monthly_total = 3500 + 150 = $3,650

### Tier Recommendation Logic (LOCKED — from PRD and ROADMAP)

The `tier-selector.ts` must implement this logic:

**Edge cases (LOCKED from ROADMAP success criteria):**
- 10+ integrations total → recommend Core
- No tools → recommend Bronze
- Any enterprise stack (SAP/NetSuite/Oracle ERP/Microsoft Dynamics) → recommend Core
- Legacy platform (Shopify/Wix/Squarespace/WordPress) → route to legacy path (shopify-starter or shopify-growth)

**Standard recommendation:**
1. Count T1, T2, T3 integrations
2. Check if any package can accommodate all integrations within slots (no overage needed) → pick smallest fitting package
3. If overage unavoidable → pick package that minimizes total cost
4. Override rules:
   - goals include `ucp` or `acp` → minimum Gold
   - location_count >= 6 → minimum Silver
   - monthly_leads >= 200 → minimum Silver
   - monthly_leads >= 500 → minimum Gold
   - enterprise ERP present → Core

**Inputs to tier-selector:**
```typescript
{
  integrations: IntegrationSelection[]  // name, tier
  monthlyLeads: number                  // 0, 50, 200, 500+
  goals: string[]                       // e.g. ['ucp', 'acp', 'blog', ...]
  platform: string                      // 'shopify', 'wix', 'next.js', etc.
  locationCount: number                 // 1, 2-5, 6-20, 20+
}
```

### Testing (LOCKED — PRICE-04 requires unit tests)

No test framework installed. Must add one. **Vitest is the recommended choice** for a Next.js 14 TypeScript project:
- Works without ejecting from Next.js
- Native ESM support
- `vitest` + `@vitest/coverage-v8`
- Test files: `lib/pricing/__tests__/calculator.test.ts`, `tier-selector.test.ts`

Unit tests must cover:
1. Slot logic (all slots used → correct included count)
2. Overage calculation (T1 overflow, T2 overflow, mixed tier overflow)
3. Tier recommendation edge cases (the 4 LOCKED cases from ROADMAP)
4. Bronze with no tools
5. Silver trigger conditions (leads, locations, T2 integration)
6. Gold trigger conditions (UCP/ACP goals, T3 integration)
7. Core trigger conditions (enterprise ERP, 10+ integrations)

### TypeScript Constraints (LOCKED — existing project conventions)

- Strict mode honored (`tsconfig.json` has `strict` implied by Next.js defaults)
- Path alias: `@/lib/pricing/...` resolves from project root
- No `any` types
- Export pattern: named exports (consistent with Phase 1 components)

### Data Source Strategy (LOCKED — from Phase 2 foundation)

The catalog.ts must support two usage modes:
1. **Static lookup** — hardcoded map of tool name → tier (for the pricing engine, no DB call needed)
2. **DB lookup** — query Supabase integrations_catalog by name (for intake agent real-time classification)

The static map is derived directly from the seeded Supabase data (already known — 53 tools with known tiers). Phase 4's intake agent may use the DB lookup for unknown tools.

**Recommendation:** catalog.ts exports both — a `CATALOG` static record and a `lookupIntegration(name)` function. The pricing engine uses the static CATALOG; the intake agent can use either.

### Claude's Discretion

- Exact TypeScript interface names (IntegrationTier, Package, ProposalCalculation, etc.)
- Whether to add a `getPackageBySlug()` function alongside the slot calculation
- Whether vitest config goes in `vite.config.ts` or `vitest.config.ts`
- Whether to add `@supabase/supabase-js` DB lookup in catalog.ts (useful for Phase 4) or keep it static-only
- Exact test coverage thresholds
- Whether to export a `PACKAGES` static record similar to `CATALOG`

</decisions>

<specifics>
## Specific Ideas

### Catalog Structure

```typescript
// lib/integrations/catalog.ts
export type IntegrationTier = 1 | 2 | 3

export interface CatalogEntry {
  name: string
  tier: IntegrationTier
  category: string
  setupCost: number    // 750 | 1500 | 4000
  monthlyCost: number  // 150 | 250 | 500
}

// Static lookup map (keyed by lowercase normalized name)
export const CATALOG: Record<string, CatalogEntry> = {
  'hubspot': { name: 'HubSpot', tier: 1, category: 'crm', setupCost: 750, monthlyCost: 150 },
  // ... all 53 entries
}

export function lookupIntegration(name: string): CatalogEntry | null {
  return CATALOG[name.toLowerCase().trim()] ?? null
}
```

### Calculator Types

```typescript
// lib/pricing/types.ts
export interface IntegrationSelection {
  name: string
  tier: IntegrationTier
}

export interface PackageDefinition {
  slug: string
  name: string
  baseSetup: number
  baseMonthly: number
  tier1Slots: number
  tier2Slots: number
  tier3Slots: number
  isLegacyOnly: boolean
}

export interface PricingResult {
  packageSlug: string
  baseSetup: number
  baseMonthly: number
  overageSetup: number
  overageMonthly: number
  setupTotal: number
  monthlyTotal: number
  includedIntegrations: IntegrationSelection[]
  overageIntegrations: IntegrationSelection[]
}
```

### Tier Recommendation Test Cases (from ROADMAP success criteria)

```typescript
// Must all pass:
expect(selectTier({ integrations: [], ... })).toBe('bronze')
expect(selectTier({ integrations: [/* 10+ */], ... })).toBe('core')
expect(selectTier({ integrations: [{ name: 'SAP', tier: 3 }], ... })).toBe('core')
expect(selectTier({ integrations: [{ name: 'HubSpot', tier: 1 }], goals: ['ucp'], ... })).toBe('gold')
```

### Existing lib/ Files to Be Aware Of

- `lib/design-tokens.ts` — Phase 1 output, do not modify
- `lib/mailer.ts` — existing pre-milestone mailer
- `lib/schemas/` — existing JSON-LD schema library
- `lib/supabase/` — existing Supabase client
- `lib/strapi/` — existing Strapi client

New files go in `lib/integrations/` and `lib/pricing/` subdirectories (create both).

</specifics>

<deferred>
## Deferred Ideas

- Real-time catalog updates from Supabase (catalog.ts is static in v1 — DB sync is Phase 4+)
- Unknown tool classification flow (flag for human review — Phase 4 intake agent concern)
- Pricing history / audit trail — v2
- Multi-currency pricing — out of scope v1
- Discount/promo engine — out of scope v1
- Stripe integration for payment processing — v2 (manual invoicing for v1)

</deferred>

---

*Phase: 03-integration-catalog-pricing-engine*
*Context gathered: 2026-03-02 via PRD Express Path + live Supabase data*
