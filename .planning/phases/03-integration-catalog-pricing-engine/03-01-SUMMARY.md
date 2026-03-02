---
phase: 03-integration-catalog-pricing-engine
plan: "01"
subsystem: pricing-library
tags: [pricing, typescript, catalog, types, integrations]
dependency_graph:
  requires: []
  provides: [lib/pricing/types.ts, lib/integrations/catalog.ts]
  affects: [03-02-calculator, 03-03-tier-selector]
tech_stack:
  added: []
  patterns: [static-catalog, named-exports, readonly-arrays]
key_files:
  created:
    - lib/pricing/types.ts
    - lib/integrations/catalog.ts
  modified: []
decisions:
  - "CATALOG keys are lowercase-normalized slugs (e.g. 'hubspot', 'google-calendar') matching plan spec exactly"
  - "Tier costs extracted to TIER_SETUP/TIER_MONTHLY constants to keep 53 entries DRY"
  - "ENTERPRISE_TOOLS and LEGACY_PLATFORMS use readonly string[] for type safety"
  - "PACKAGES exported from catalog.ts (not types.ts) since it is static data, not a type contract"
metrics:
  duration: "1 min"
  completed_date: "2026-03-02"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 03 Plan 01: Integration Catalog & Pricing Types Summary

Shared TypeScript pricing contracts and 53-entry static integration catalog powering all subsequent pricing engine plans.

## What Was Built

**lib/pricing/types.ts** — 7 named TypeScript exports, no implementation logic:
- `IntegrationTier` — union type `1 | 2 | 3`
- `CatalogEntry` — tool record (name, tier, category, setupCost, monthlyCost)
- `IntegrationSelection` — prospect-selected tool (name + resolved tier)
- `PackageDefinition` — package slot/pricing record (slug, baseSetup, baseMonthly, tier slots, isLegacyOnly)
- `PricingResult` — calculator output (base, overage, totals, included/overage integration lists)
- `TierSelectorInput` — recommendation engine input (integrations, monthlyLeads, goals, platform, locationCount)
- `TierRecommendation` — recommendation engine output (recommendedSlug, isLegacyPath, reasoning)

**lib/integrations/catalog.ts** — Static catalog + helpers:
- `CATALOG` — `Record<string, CatalogEntry>` with 53 entries (20 T1 / 21 T2 / 12 T3)
- `lookupIntegration(name)` — case-insensitive lookup returning `CatalogEntry | null`
- `ENTERPRISE_TOOLS` — readonly string[] of 4 ERP tools that route to Core
- `LEGACY_PLATFORMS` — readonly string[] of 4 platforms that route to legacy packages
- `PACKAGES` — `Record<string, PackageDefinition>` with 6 package definitions (bronze/silver/gold/core/shopify-starter/shopify-growth)

## Verification Results

- `npx tsc --noEmit` passes with zero errors after both files created
- CATALOG has exactly 53 entries: 20 Tier 1, 21 Tier 2, 12 Tier 3
- PACKAGES has 6 entries matching locked values from CONTEXT.md
- `lookupIntegration('sap')` returns `{ tier: 3, setupCost: 4000, monthlyCost: 500 }`
- `lookupIntegration('hubspot')` returns `{ tier: 1, setupCost: 750, monthlyCost: 150 }`
- `lookupIntegration('unknown')` returns `null`

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create lib/pricing/types.ts | c94ca92 | lib/pricing/types.ts |
| 2 | Create lib/integrations/catalog.ts | 6023d94 | lib/integrations/catalog.ts |

## Deviations from Plan

None — plan executed exactly as written.

Tier costs extracted to `TIER_SETUP`/`TIER_MONTHLY` constant objects within catalog.ts to keep all 53 entries DRY (each entry references constants rather than repeating numeric literals). This is a cosmetic implementation choice that does not change any exported values.

## Key Decisions

1. **CATALOG keys are lowercase-normalized slugs** matching the plan spec exactly (e.g. `'hubspot'`, `'google-calendar'`, `'authorize.net'`). The `lookupIntegration()` function applies `.toLowerCase().trim()` so callers need not normalize.

2. **Tier cost constants** (`TIER_SETUP`, `TIER_MONTHLY`) are unexported — they exist only to keep the 53 CATALOG entries DRY. The exported `CatalogEntry` fields still carry the concrete numbers (750, 150, etc.) so downstream code has no indirection.

3. **PACKAGES exported from catalog.ts** (not types.ts) since PackageDefinition is the type and PACKAGES is static data. This follows the existing pattern of types.ts being types-only.

4. **ENTERPRISE_TOOLS uses display-name variants** (`'oracle erp'`, `'microsoft dynamics'`) matching how the tier-selector will receive platform names from the intake form — not CATALOG keys.

## Self-Check: PASSED

| Item | Status |
|------|--------|
| lib/pricing/types.ts | FOUND |
| lib/integrations/catalog.ts | FOUND |
| Commit c94ca92 | FOUND |
| Commit 6023d94 | FOUND |
