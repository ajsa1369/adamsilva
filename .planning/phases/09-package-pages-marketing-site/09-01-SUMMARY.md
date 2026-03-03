---
phase: 09-package-pages-marketing-site
plan: 01
subsystem: ui, data
tags: [typescript, pricing, roi-calculator, react, tailwind, marketing-pages]

# Dependency graph
requires:
  - phase: 01-design-system-ui-foundation
    provides: Button, Card, Badge components and CSS design tokens
  - phase: 03-integration-catalog-pricing-engine
    provides: PackageDefinition interface reference (separate from marketing data)
provides:
  - PACKAGES typed const array (6 tiers) — single source of truth for all Phase 9 pages
  - PLATFORM_MATRIX typed const array (8 platform types) — compliance data for /platform-check
  - PackagePageData interface — rich page-level data shape for marketing display
  - PlatformEntry interface + ComplianceLevel type — platform compatibility types
  - ROICalculator client component — interactive ROI calculator with 4 inputs and 3 outputs
affects: [09-02-PLAN, 09-03-PLAN, 09-04-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns: [pure-data-module, client-side-computation, css-variable-only-styling]

key-files:
  created:
    - lib/data/packages.ts
    - components/ROICalculator.tsx
  modified: []

key-decisions:
  - "No --color-navy CSS var exists; used --color-text (#0a0f1e) and --color-accent (#2563eb) from globals.css design tokens"
  - "ROI denominator uses setup cost (not annual cost) for percentage calculation — matches plan formula exactly"
  - "lib/data/packages.ts is fully independent from lib/integrations/catalog.ts — separate purposes, no cross-imports"

patterns-established:
  - "Pure data module pattern: typed const arrays with exhaustive interfaces for marketing page data"
  - "ROI Calculator pattern: useMemo for derived computation, CSS variables via inline style for design token compliance"

requirements-completed: [PKG-04]

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 9 Plan 01: Data Foundation + ROI Calculator Summary

**Typed pricing data for all 6 package tiers, 8-platform compliance matrix, and interactive ROI calculator with real-time revenue/ROI/payback computation**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T12:52:35Z
- **Completed:** 2026-03-03T12:55:50Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- Created lib/data/packages.ts as single source of truth for all Phase 9 marketing pages with 6 package tiers (bronze, silver, gold, core, shopify-starter, shopify-growth) and exact PRD Section 5 pricing
- Created PLATFORM_MATRIX with 8 platform entries and 7-column compliance matrix matching PRD Section 9 exactly
- Built ROICalculator.tsx client component with 4 inputs (tier selector, leads/month, close rate slider, deal size) and 3 computed output cards (monthly revenue lift, annual ROI %, payback period)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create lib/data/packages.ts** - `785a799` (feat)
2. **Task 2: Create components/ROICalculator.tsx** - `cdfd46d` (feat)

## Files Created/Modified
- `lib/data/packages.ts` - PackagePageData interface + PACKAGES (6 entries) + ComplianceLevel type + PlatformEntry interface + PLATFORM_MATRIX (8 entries)
- `components/ROICalculator.tsx` - Interactive 'use client' ROI calculator with tier selection, 4 inputs, 3 computed outputs, CTA to /get-started

## Decisions Made
- No `--color-navy` CSS variable exists in globals.css; used `--color-text` and `--color-accent` which are the actual design token equivalents
- ROI formula: `((annualRevenueLift - annualCost) / setupCost) * 100` — setup cost is the denominator per plan specification, not total annual cost
- lib/data/packages.ts is a standalone pure-data module with zero imports — fully independent from lib/integrations/catalog.ts which serves the pricing engine

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- PACKAGES and PLATFORM_MATRIX are ready for import by Plan 09-02 (/packages page), Plan 09-03 (/packages/[tier] pages), and Plan 09-04 (/platform-check page)
- ROICalculator component is ready for embedding in /packages and /packages/[tier] pages
- All TypeScript types exported for downstream plan consumption

## Self-Check: PASSED

- [x] lib/data/packages.ts exists
- [x] components/ROICalculator.tsx exists
- [x] Commit 785a799 found in git log
- [x] Commit cdfd46d found in git log
- [x] npx tsc --noEmit exits 0

---
*Phase: 09-package-pages-marketing-site*
*Completed: 2026-03-03*
