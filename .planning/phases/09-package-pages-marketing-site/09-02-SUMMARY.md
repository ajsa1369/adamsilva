---
phase: 09-package-pages-marketing-site
plan: 02
subsystem: ui
tags: [next.js, server-components, pricing-table, comparison-table, json-ld, schema.org, ssg, marketing]

# Dependency graph
requires:
  - phase: 09-package-pages-marketing-site
    provides: lib/data/packages.ts (PACKAGES array, PackagePageData interface), components/ROICalculator.tsx
provides:
  - /packages comparison page with PricingTable, ComparisonTable, ROICalculator, JSON-LD ItemList
  - /packages/[tier] individual tier detail pages with generateStaticParams (6 slugs)
  - JSON-LD Service + FAQPage + BreadcrumbList per tier page
affects: [09-package-pages-marketing-site, get-started, platform-check]

# Tech tracking
tech-stack:
  added: []
  patterns: [searchParams-based toggle for server component interactivity, getBadgeVariant slug-to-variant mapper, upgrade nudge ComparisonTable pattern]

key-files:
  created:
    - app/(marketing)/packages/page.tsx
    - app/(marketing)/packages/[tier]/page.tsx
  modified:
    - .gitignore

key-decisions:
  - "searchParams toggle (?view=setup/monthly) instead of client-side useState for price toggle — keeps page as pure server component with export metadata"
  - "gitignore **/packages/ negation via !/app/ + !/app/** — same pattern as existing lib/ and supabase/ fixes"
  - "Badge variant mapped via getBadgeVariant() helper — shopify-starter and shopify-growth use 'legacy' variant since they are not in Badge variant union"
  - "PlatformWarning rendered without onContinueWithLegacy/onExploreMigration (undefined) — server component cannot pass event handlers; PlatformWarning renders without CTA buttons when props are undefined"

patterns-established:
  - "searchParams toggle: Use URL search params for tab-like toggle in server components instead of client-side state"
  - "Upgrade nudge: ComparisonTable with TIER_ORDER for progressive tier comparison"
  - "getBadgeVariant: Centralized slug-to-Badge-variant mapping for type safety"

requirements-completed: [PKG-01, PKG-02, PKG-05]

# Metrics
duration: 6min
completed: 2026-03-03
---

# Phase 9 Plan 02: Package Pages Summary

**/packages comparison page with PricingTable (4 tiers), ComparisonTable (12 feature rows), ROI calculator, and /packages/[tier] detail pages with Service+FAQ JSON-LD for all 6 tier slugs**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-03T12:59:10Z
- **Completed:** 2026-03-03T13:05:01Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- /packages comparison page: PricingTable with 4 main tiers (bronze/silver/gold/core), ComparisonTable with 12 feature rows, ROICalculator, sticky mobile CTA, searchParams-based price toggle, ItemList + FAQPage JSON-LD
- /packages/[tier] detail pages: generateStaticParams pre-renders all 6 slugs, hero with pricing display, What's Included section, upgrade nudge ComparisonTable vs next tier, PlatformWarning for Shopify tiers, FAQ section, ROICalculator (non-core), Service + FAQPage + BreadcrumbList JSON-LD
- npm run build succeeds with zero TypeScript errors, all 6 tier paths pre-rendered

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /packages comparison page** - `ba0dd11` (feat)
2. **Task 2: Create /packages/[tier] individual tier detail pages** - `fa94ba5` (feat)

## Files Created/Modified
- `app/(marketing)/packages/page.tsx` - Server component comparison page with PricingTable, ComparisonTable, ROICalculator, JSON-LD
- `app/(marketing)/packages/[tier]/page.tsx` - Dynamic tier detail page with generateStaticParams, generateMetadata, Service/FAQ/Breadcrumb JSON-LD
- `.gitignore` - Added !/app/ + !/app/** negation for **/packages/ rule (NuGet/C# pattern was blocking app/(marketing)/packages/)

## Decisions Made
- searchParams toggle (?view=setup/monthly) instead of client-side useState for price toggle — keeps page as pure server component with export metadata
- gitignore **/packages/ negation via !/app/ + !/app/** — same pattern as existing lib/ and supabase/ fixes
- Badge variant mapped via getBadgeVariant() helper — shopify-starter and shopify-growth use 'legacy' variant since they are not in Badge variant union
- PlatformWarning rendered without onContinueWithLegacy/onExploreMigration (undefined) — server component cannot pass event handlers; PlatformWarning renders without CTA buttons when props are undefined

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed .gitignore **/packages/ rule blocking app/(marketing)/packages/**
- **Found during:** Task 1 (git add failed)
- **Issue:** The comprehensive .gitignore template includes `**/packages/` (NuGet/C# packages), which blocked `app/(marketing)/packages/` from being tracked by git
- **Fix:** Added `!/app/` and `!/app/**` negation rules, following the same pattern as existing `!/lib/` and `!/supabase/` fixes
- **Files modified:** .gitignore
- **Verification:** git add succeeded after fix, build passes
- **Committed in:** ba0dd11 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix was necessary to allow git tracking of the new route directory. No scope creep.

## Issues Encountered
None beyond the gitignore blocking issue (documented above as deviation).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /packages and /packages/[tier] pages complete — prospects can compare all tiers and drill into details
- Ready for Plan 09-03 (platform check page) and Plan 09-04 (get-started integration)
- All 6 tier links active; Shopify tiers show PlatformWarning with migration guidance

## Self-Check: PASSED

- FOUND: app/(marketing)/packages/page.tsx
- FOUND: app/(marketing)/packages/[tier]/page.tsx
- FOUND: 09-02-SUMMARY.md
- FOUND: commit ba0dd11
- FOUND: commit fa94ba5

---
*Phase: 09-package-pages-marketing-site*
*Completed: 2026-03-03*
