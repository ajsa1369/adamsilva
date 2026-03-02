# Phase 1: Design System & UI Foundation — Context

**Gathered:** 2026-03-02
**Status:** Ready for planning
**Source:** User directive + logo analysis + existing globals.css

<domain>
## Phase Boundary

Phase 1 delivers the shared design system that all subsequent phases draw from:
- `lib/design-tokens.ts` — typed TypeScript token exports (color, typography, spacing)
- `components/ui/` — 9 reusable components, all Tailwind v4, dark/light mode, mobile-first

Nothing in this phase is user-facing (no new pages). This is the foundation layer.

</domain>

<decisions>
## Implementation Decisions

### Logo Color Palette (LOCKED — user directive: "maintain the logos colors")

The ASC logo (logo-clear.png) defines the brand palette. All design tokens MUST use these exact values:

| Token | Hex | Usage |
|-------|-----|-------|
| `--asc-navy` | `#1B2E4B` | Primary dark — logo dark quadrant, "ADAM SILVA" wordmark text |
| `--asc-blue` | `#4D8EC0` | Brand blue — "CONSULTING" wordmark, mid-tone logo elements |
| `--asc-blue-light` | `#85C1DF` | Accent blue — logo arrow, lightest quadrant |
| `--asc-white` | `#FFFFFF` | Circuit lines, icon fills in logo |

These four values are the ASC brand identity and MUST appear in `lib/design-tokens.ts` as the `brand` palette.

### Existing Color System (MUST EXTEND, NOT REPLACE)

`app/globals.css` already defines the full dark/light @theme variables. The design tokens file MUST:
- Reference/re-export the existing CSS variable names (e.g. `var(--color-primary)`)
- Add the `brand.*` palette from the logo colors above
- NOT introduce a second parallel color system — extend the existing one

Existing variables to preserve:
- Dark mode: `--color-base: #060d1f`, `--color-primary: #0ea5e9`, etc.
- Light mode: `[data-theme="light"]` override block
- Protocol colors: `--color-ucp`, `--color-acp`, `--color-ap2`

### Typography (LOCKED — already in globals.css)

- Display: `Roboto Condensed` → `--font-display`
- Body: `Roboto` → `--font-sans`
- Mono: `JetBrains Mono` → `--font-mono`

Design tokens MUST re-export these as typed constants, not redefine the font stack.

### Tailwind v4 Approach

- Use `@theme` block in globals.css for CSS variables (already done)
- Components use Tailwind utility classes that reference CSS vars (e.g. `bg-[var(--color-surface)]`)
- Dark/light mode via `data-theme="light"` attribute on `<html>` (existing pattern)
- NO arbitrary values unless unavoidable
- Mobile-first (375px base, responsive up)

### Component Scope (LOCKED — 9 components)

All 9 go in `components/ui/`:
1. `Button` — variants: primary, secondary, ghost, danger; sizes: sm, md, lg
2. `Card` — surface container with optional hover state
3. `Badge` — inline label; variants: tier (bronze/silver/gold/core), status (success/warning/error), protocol (ucp/acp/ap2)
4. `ChatBubble` — message bubble for intake agent and site chatbot; variants: user, assistant, system
5. `ProposalCard` — displays generated proposal summary (tier, setup total, monthly total, integration count)
6. `PricingTable` — full tier comparison grid (Bronze/Silver/Gold/Core/Legacy)
7. `ComparisonTable` — generic feature comparison table (used on /packages pages)
8. `IntakeStep` — step indicator + content wrapper for multi-step chatbot flow
9. `PlatformWarning` — alert card shown when legacy platform detected (Shopify/Wix/Squarespace/WordPress)

### Component Export Pattern

All components exported from `components/ui/index.ts` (barrel export). Each component in its own file: `components/ui/Button.tsx`, etc.

### TypeScript

- All components: typed props with explicit interfaces (no `any`)
- Design tokens file: typed as `const` objects (not enums)
- Strict mode honored throughout

### Claude's Discretion

- Exact prop API surface for each component (names, required vs. optional)
- Whether to use `class-variance-authority` (cva) for variant management — check package.json first
- Whether to add Storybook or a simple visual test page (lean toward no Storybook for now — too heavy)
- Spacing scale values (can derive from Tailwind defaults)
- Animation/transition approach (prefer CSS transitions over JS animation)

</decisions>

<specifics>
## Specific Ideas

### Brand Token Usage in Components

- `ProposalCard` header background → `var(--asc-navy)` in dark mode, lighter tint in light mode
- `Badge` tier variants:
  - Bronze → warm copper gradient (not in logo — Claude's discretion)
  - Silver → `var(--asc-blue-light)` tint
  - Gold → warm gold (not in logo — Claude's discretion)
  - Core → `var(--asc-navy)` with white text
- `PlatformWarning` → amber/yellow warning palette (existing protocol colors don't cover this — Claude's discretion)
- `ChatBubble` assistant → `var(--asc-blue)` accent border; user → `var(--color-surface-3)`

### Logo Reference

Logo file: `public/images/logo-clear.png`
Logo animated SVG: used in header component (existing)
The brand colors above were extracted from the actual PNG logo asset.

### Design Token File Structure

```typescript
// lib/design-tokens.ts
export const brand = {
  navy: '#1B2E4B',
  blue: '#4D8EC0',
  blueLight: '#85C1DF',
  white: '#FFFFFF',
} as const

export const colors = {
  // Re-exports of CSS variable names for typed usage
  base: 'var(--color-base)',
  surface: 'var(--color-surface)',
  // ... etc
} as const

export const typography = {
  display: 'var(--font-display)',
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
} as const

export const spacing = { ... } as const
```

</specifics>

<deferred>
## Deferred Ideas

- Storybook setup — too heavy for v1, defer to v2
- Animation library (Framer Motion) — not needed for Phase 1 components
- Icon library beyond what's already in the codebase — defer to per-phase needs
- Form components (Input, Select, Textarea, Checkbox) — Phase 4 will build these as needed for intake UI

</deferred>

---

*Phase: 01-design-system-ui-foundation*
*Context gathered: 2026-03-02 — logo colors locked from user directive*
