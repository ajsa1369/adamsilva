---
phase: 01-design-system-ui-foundation
plan: 02
subsystem: ui
tags: [tailwind-v4, react, typescript, css-variables, design-system, components]

# Dependency graph
requires:
  - phase: 01-01
    provides: lib/design-tokens.ts (brand.navy for ProposalCard header), Button.tsx, Badge.tsx, globals.css CSS variables
provides:
  - components/ui/ChatBubble.tsx — user/assistant/system chat variants with loading dots animation
  - components/ui/ProposalCard.tsx — tier proposal card with brand.navy header and stat formatting
  - components/ui/IntakeStep.tsx — multi-step indicator with progress bar and content slot
  - components/ui/PricingTable.tsx — 5-tier horizontally scrollable pricing grid
  - components/ui/ComparisonTable.tsx — arbitrary feature matrix with check/cross/dash cells
  - components/ui/PlatformWarning.tsx — amber warning card with two CTA slots
  - components/ui/index.ts — barrel export for all 9 components and TypeScript types
affects:
  - All subsequent phases importing from '@/components/ui' (intake, packages, chatbot, proposal)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Barrel export pattern via components/ui/index.ts for single-import ergonomics
    - 'use client' only where click handlers are passed as props (ProposalCard, PricingTable, PlatformWarning)
    - Server components default — ChatBubble, ComparisonTable, IntakeStep are server-safe
    - Mobile-first grid: grid-cols-1 base, sm:grid-cols-2 for responsive layouts

key-files:
  created:
    - components/ui/ChatBubble.tsx
    - components/ui/ProposalCard.tsx
    - components/ui/IntakeStep.tsx
    - components/ui/PricingTable.tsx
    - components/ui/ComparisonTable.tsx
    - components/ui/PlatformWarning.tsx
    - components/ui/index.ts
  modified: []

key-decisions:
  - "Server component default — 'use client' only added where onClick prop callbacks are present (ProposalCard, PricingTable, PlatformWarning)"
  - "ChatBubble loading state uses Tailwind animate-bounce with inline style delays — no JS animation library required"
  - "ComparisonTable uses semantic <table> element for accessibility, not a CSS grid"
  - "PricingTable uses grid-cols-5/min-w-[640px] inner grid inside overflow-x-auto outer — forces horizontal scroll at 375px without JS"

patterns-established:
  - "Pattern 4: Composite components import from ./Button and ./Badge (relative), never from the barrel '@/components/ui' — prevents circular dependencies"
  - "Pattern 5: All price formatting uses toLocaleString() — no currency library needed"
  - "Pattern 6: Mobile-first responsive — single-column at 375px, multi-column at sm+ breakpoint"

requirements-completed: [DS-02, DS-03]

# Metrics
duration: 3min
completed: 2026-03-02
---

# Phase 1 Plan 02: Design System — Composite Components and Barrel Export Summary

**6 domain-specific UI components (ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning) wired through a single barrel export at components/ui/index.ts**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-02T20:08:31Z
- **Completed:** 2026-03-02T20:12:15Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Created ChatBubble with user/assistant/system variants, inline animate-bounce loading dots, and optional timestamps
- Created ProposalCard with brand.navy (#1B2E4B) header, tier-specific accent lines, stat-number formatted prices, and optional CTA
- Created IntakeStep with progress bar (stepNumber/totalSteps), status-aware indicator circle (upcoming/current/completed), and conditional children slot
- Created PricingTable with overflow-x-auto wrapper, 5-column grid (min-w-[640px]), Badge/Button integration, and highlighted tier support
- Created ComparisonTable as semantic table with check/cross/dash/string cell rendering and alternating row backgrounds
- Created PlatformWarning as amber-50 warning card with two CTA path options, mobile-first grid layout
- Created components/ui/index.ts barrel exporting all 9 components and their TypeScript types — build passes with 0 errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ChatBubble, ProposalCard, IntakeStep components** - `b7b86cb` (feat)
2. **Task 2: Create PricingTable, ComparisonTable, PlatformWarning components** - `77611c9` (feat)
3. **Task 3: Create barrel export components/ui/index.ts** - `a5bc30b` (feat)

## Files Created/Modified

- `components/ui/ChatBubble.tsx` - Server component; user (right-aligned accent), assistant (left-aligned surface-2 with blue border), system (full-width center) variants; CSS animate-bounce loading dots
- `components/ui/ProposalCard.tsx` - 'use client'; brand.navy header via inline style; tier accent border-top lines; stat-number class for mono gradient pricing; imports Badge + Button
- `components/ui/IntakeStep.tsx` - Server component; h-0.5 progress bar at top; w-8 indicator circle with completed checkmark SVG; conditional children slot for current status only
- `components/ui/PricingTable.tsx` - 'use client'; overflow-x-auto outer / grid-cols-5 min-w-[640px] inner; Badge for slot count, Button for CTA, highlighted tier gets accent border + glow
- `components/ui/ComparisonTable.tsx` - Server component; semantic table with thead/tbody; CellValue helper for check/cross/dash/string; odd rows bg-surface, even transparent
- `components/ui/PlatformWarning.tsx` - 'use client'; bg-amber-50 border-amber-300; two path cards in grid-cols-1/sm:grid-cols-2; imports Button for CTAs
- `components/ui/index.ts` - 9 named component exports + 9 type exports; no logic, no imports outside ui directory

## Decisions Made

- **Server component default:** Only components that accept click handler props are marked 'use client' (ProposalCard, PricingTable, PlatformWarning). ChatBubble, ComparisonTable, and IntakeStep are pure server-safe render components.
- **Loading dots via CSS only:** animate-bounce + inline animationDelay style attributes — no framer-motion or additional animation library required.
- **Semantic table for ComparisonTable:** Used native HTML table elements for accessibility rather than CSS grid. Screen readers can navigate by column headers.
- **Horizontal scroll strategy for PricingTable:** overflow-x-auto outer wrapper + min-w-[640px] on the inner grid. No JS resize observer needed.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — TypeScript checks passed after each task; build compiled successfully on first attempt with 71 pages and 0 errors.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Complete component library ready: all 9 components importable from '@/components/ui' with full TypeScript types
- ProposalCard, PricingTable, and PlatformWarning ready for Phase 2 (intake flow) immediately
- ChatBubble ready for Phase 8 (chatbot) immediately
- No blockers for Phase 2 or any subsequent phases using these components

---
*Phase: 01-design-system-ui-foundation*
*Completed: 2026-03-02*
