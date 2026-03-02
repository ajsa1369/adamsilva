---
phase: 03-integration-catalog-pricing-engine
plan: "02"
subsystem: pricing-library
tags: [pricing, typescript, calculator, tier-selector, integrations]

# Dependency graph
requires:
  - phase: 03-01
    provides: [lib/pricing/types.ts, lib/integrations/catalog.ts, PACKAGES, ENTERPRISE_TOOLS, LEGACY_PLATFORMS]
provides:
  - lib/pricing/calculator.ts — calculatePricing(packageSlug, integrations) → PricingResult
  - lib/pricing/tier-selector.ts — selectTier(input) → TierRecommendation
  - TIER_UNIT_COSTS export from calculator.ts
affects: [03-03-unit-tests, 04-intake-agent, phase-4-proposal-generation]

# Tech tracking
tech-stack:
  added: []
  patterns: [slot-bucket-algorithm, priority-rule-chain, slot-fit-upgrade-loop]

key-files:
  created:
    - lib/pricing/calculator.ts
    - lib/pricing/tier-selector.ts
  modified: []

key-decisions:
  - "Core package (tier1/2/3Slots=99) is never subject to overages — slot===99 check always routes to includedIntegrations"
  - "TIER_UNIT_COSTS exported from calculator.ts (not catalog.ts) since it is calculation logic, not catalog data"
  - "Slot-fit upgrade loop iterates TIER_ORDER array from minSlug upward, calling calculatePricing to confirm zero overages before accepting a slug"
  - "upgradeTier() helper encodes bronze<silver<gold<core ordering as a single lookup in TIER_ORDER array"
  - "Legacy platform check is strictly FIRST — a Shopify prospect with 10 integrations still gets legacy path, not core"

patterns-established:
  - "Slot-bucket algorithm: initialize buckets from package definition, consume slots per integration, accumulate overages when exhausted"
  - "Priority rule chain: each step returns early on first match; no fall-through"
  - "Minimum-tier accumulation: start at bronze, apply upgradeTier() for each rule, never downgrade"

requirements-completed: [PRICE-02, PRICE-03]

# Metrics
duration: 1min
completed: 2026-03-02
---

# Phase 03 Plan 02: Pricing Calculator & Tier Recommendation Engine Summary

**Slot-bucket pricing calculator and 6-rule priority recommendation engine powering Phase 4 intake agent proposal generation**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-02T22:07:25Z
- **Completed:** 2026-03-02T22:08:48Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- `calculatePricing` correctly allocates integrations into included/overage buckets, with Bronze + 4×T1 producing setupTotal=$16,750 and monthlyTotal=$3,650 exactly
- `selectTier` implements all LOCKED business rules in correct priority order: legacy platform → enterprise ERP → 10+ integrations → zero integrations → goal/lead/location overrides → slot-fit upgrade
- Both functions are strictly typed (no `any`), use lowercase-normalized string comparison throughout, and pass `npx tsc --noEmit` with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/pricing/calculator.ts** - `d72cc9a` (feat)
2. **Task 2: Create lib/pricing/tier-selector.ts** - `699dd92` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `lib/pricing/calculator.ts` — `calculatePricing(packageSlug, integrations)` with slot buckets, overage accumulation, and `TIER_UNIT_COSTS` export
- `lib/pricing/tier-selector.ts` — `selectTier(input)` with 6-step priority chain and slot-fit upgrade loop

## Decisions Made

1. **Core never overages** — The `slots === 99` guard routes all integrations to `includedIntegrations` for Core, regardless of position. This means `calculatePricing('core', 15×T1)` always returns `overageIntegrations.length === 0`.

2. **TIER_UNIT_COSTS in calculator.ts** — Kept alongside the function that uses them rather than in catalog.ts. They are pricing engine logic, not catalog data.

3. **upgradeTier() helper** — Encodes `bronze < silver < gold < core` as an index into `TIER_ORDER` array. Comparing indices prevents string comparison bugs and keeps ordering as a single source of truth.

4. **Legacy platform check is absolute first** — Per locked spec, a Shopify prospect is always routed to `shopify-starter` or `shopify-growth`, even if they have 10+ integrations or enterprise ERPs in their list.

5. **Slot-fit loop starts from minSlug** — After all goal/lead/location override rules compute the minimum acceptable tier, the loop starts there (not at bronze) so it never recommends lower than the business rules require.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `calculatePricing` and `selectTier` are ready for Plan 03-03 unit tests to be written against without any modification
- Phase 4 intake agent can call both functions to generate accurate proposal totals and package recommendations
- Both exports are fully typed — intake form can pass `TierSelectorInput` directly to `selectTier`

---
*Phase: 03-integration-catalog-pricing-engine*
*Completed: 2026-03-02*

## Self-Check: PASSED

| Item | Status |
|------|--------|
| lib/pricing/calculator.ts | FOUND |
| lib/pricing/tier-selector.ts | FOUND |
| .planning/phases/03-integration-catalog-pricing-engine/03-02-SUMMARY.md | FOUND |
| Commit d72cc9a | FOUND |
| Commit 699dd92 | FOUND |
