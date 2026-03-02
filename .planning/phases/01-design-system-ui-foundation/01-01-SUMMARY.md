---
phase: 01-design-system-ui-foundation
plan: 01
subsystem: ui
tags: [tailwind-v4, design-tokens, react, typescript, css-variables]

# Dependency graph
requires: []
provides:
  - lib/design-tokens.ts with typed brand palette (navy/blue/blueLight) and CSS variable references
  - components/ui/Button.tsx with 4 variants, 3 sizes, loading state, href-as-anchor
  - components/ui/Card.tsx with default/glass variants and polymorphic 'as' prop
  - components/ui/Badge.tsx with 14 variants covering protocol, tier, and status badges
  - app/globals.css locked to light-mode-only with #f8faff base surface
affects:
  - 01-02-design-system-ui-foundation
  - All subsequent phases using components/ui/* or lib/design-tokens.ts

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CSS variable reference pattern (var(--color-*)) in Tailwind v4 utility classes
    - globals.css utility class composition in React components (no CSS duplication)
    - as const typed token exports for brand palette

key-files:
  created:
    - lib/design-tokens.ts
    - components/ui/Button.tsx
    - components/ui/Card.tsx
    - components/ui/Badge.tsx
  modified:
    - app/globals.css

key-decisions:
  - "Light mode only — deleted all [data-theme='light'] override blocks; @theme now permanent light defaults"
  - "Design tokens are CSS variable references, not hex values — single source of truth stays in globals.css"
  - "Button/Card/Badge delegate to existing globals.css utility classes (.btn-primary, .card, .badge-*) — no duplicate CSS"
  - "Badge 'core' tier uses brand.navy (#1B2E4B) with white text — intentional dark anchor on light surface"

patterns-established:
  - "Pattern 1: globals.css owns CSS variables; components consume via Tailwind bg-[var(--color-*)] or utility class names"
  - "Pattern 2: New primitive components live in components/ui/; barrel export via index.ts (to be added in 01-02)"
  - "Pattern 3: design-tokens.ts is a typed reference layer — never duplicate hex values, always reference CSS vars"

requirements-completed: [DS-01, DS-02, DS-03]

# Metrics
duration: 4min
completed: 2026-03-02
---

# Phase 1 Plan 01: Design System — Tokens and Primitive Components Summary

**Light-mode globals.css + typed brand token library + Button/Card/Badge primitives built on existing CSS utility classes**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-02T20:01:42Z
- **Completed:** 2026-03-02T20:05:30Z
- **Tasks:** 4 (Task 0 + Tasks 1-3)
- **Files modified:** 5

## Accomplishments

- Locked globals.css to light-mode-only: replaced dark @theme block with #f8faff surface values, deleted all [data-theme="light"] overrides, updated bg-grid/gradients/nav/badge colors for light surfaces
- Created lib/design-tokens.ts with locked brand palette (navy=#1B2E4B, blue=#4D8EC0, blueLight=#85C1DF) and typed CSS variable reference exports
- Created Button.tsx (4 variants, 3 sizes, loading spinner, href-as-anchor, aria-label) and Card.tsx (default/glass, 4 padding sizes, polymorphic as prop)
- Created Badge.tsx with 14 variants: 5 tier (bronze/silver/gold/core/legacy), 4 status (success/warning/error/info), 3 protocol (ucp/acp/ap2), 1 default — protocol variants reuse globals.css classes

## Task Commits

Each task was committed atomically:

1. **Task 0: Update globals.css to light-mode-only defaults** - `3fb8181` (feat)
2. **Task 1: Create lib/design-tokens.ts** - `079623f` (feat)
3. **Task 2: Create Button and Card components** - `6da0bef` (feat)
4. **Task 3: Create Badge component** - `dd33644` (feat)

## Files Created/Modified

- `app/globals.css` - Replaced dark @theme with light surface defaults; removed all [data-theme="light"] blocks; updated utility classes for light mode
- `lib/design-tokens.ts` - Typed exports: brand (4 locked hex values), colors (CSS var references), typography, spacing, shadows
- `components/ui/Button.tsx` - 'use client'; 4 variants via globals.css classes; danger variant via Tailwind; loading spinner SVG; href renders as anchor
- `components/ui/Card.tsx` - Server component; default/glass variants via .card/.card-glass; polymorphic Tag prop; 4 padding sizes
- `components/ui/Badge.tsx` - Server component; 14 variants; protocol badges reuse .badge-ucp/.badge-acp/.badge-ap2; tier/status use Tailwind utilities

## Decisions Made

- **Light-mode only implementation:** The [data-theme="light"] CSS pattern was removed entirely rather than merged — the @theme block is now the permanent single declaration, keeping CSS DRY.
- **Design tokens as reference layer:** lib/design-tokens.ts references CSS variable strings (e.g., `'var(--color-accent)'`) rather than hex. This keeps globals.css as the single source of truth while providing TypeScript consumers with typed ergonomics.
- **Badge 'info' maps to .badge class:** Per plan, info variant uses the same styling as default since the accent color is already informational in context.
- **badge-ucp/acp/ap2 colors updated for light surfaces:** The original .badge-ucp used #38bdf8 text (too light on white) — updated to #0284c7 (sky-700) and equivalent for acp/ap2 for legible contrast on #f8faff background.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Light Mode Correctness] Updated protocol badge text colors for light surface legibility**
- **Found during:** Task 0 (globals.css review)
- **Issue:** Original .badge-ucp/.badge-acp/.badge-ap2 used text colors (#38bdf8 / #c084fc / #34d399) designed for dark backgrounds — these fail contrast on light #f8faff surfaces
- **Fix:** Updated to darker accessible alternatives: #0284c7 (ucp), #7c3aed (acp), #059669 (ap2) with adjusted opacities
- **Files modified:** app/globals.css
- **Verification:** Build passes, colors are readable against light surfaces
- **Committed in:** 3fb8181 (Task 0 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 - missing critical for color contrast correctness)
**Impact on plan:** Necessary color adjustment for light mode; no scope creep.

## Issues Encountered

None — build passed on first attempt for all tasks.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Token library and three primitive components ready for 01-02 (ChatBubble, ProposalCard, PricingTable, ComparisonTable, IntakeStep, PlatformWarning)
- components/ui/index.ts barrel export should be created in 01-02 when remaining 6 components are added
- No blockers for 01-02

---
*Phase: 01-design-system-ui-foundation*
*Completed: 2026-03-02*

## Self-Check: PASSED

All 6 files confirmed present. All 4 task commits confirmed in git history.
