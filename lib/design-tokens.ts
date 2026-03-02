/**
 * ASC Design Tokens
 *
 * Single source of truth for brand colors, typography references, and spacing.
 * Color values reference CSS variables from app/globals.css — NOT hardcoded hex.
 * Exception: the `brand` palette which contains the locked ASC logo colors.
 */

// ---------------------------------------------------------------------------
// BRAND PALETTE — locked by user directive (extracted from logo-clear.png)
// ---------------------------------------------------------------------------
export const brand = {
  navy: '#1B2E4B',       // dark quadrant, "ADAM SILVA" wordmark
  blue: '#4D8EC0',       // "CONSULTING" wordmark, mid-tone
  blueLight: '#85C1DF',  // arrow, lightest element
  white: '#FFFFFF',      // circuit lines, icon fills
} as const

// ---------------------------------------------------------------------------
// COLORS — typed references to CSS variables (defined in app/globals.css)
// Do NOT redefine — these are ergonomic aliases for TypeScript consumers.
// ---------------------------------------------------------------------------
export const colors = {
  base: 'var(--color-base)',
  surface: 'var(--color-surface)',
  surface2: 'var(--color-surface-2)',
  surface3: 'var(--color-surface-3)',
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)',
  accentHover: 'var(--color-accent-hover)',
  accentGlow: 'var(--color-accent-glow)',
  text: 'var(--color-text)',
  muted: 'var(--color-muted)',
  muted2: 'var(--color-muted-2)',
  border: 'var(--color-border)',
  borderHover: 'var(--color-border-hover)',
  ucp: 'var(--color-ucp)',
  acp: 'var(--color-acp)',
  ap2: 'var(--color-ap2)',
} as const

// ---------------------------------------------------------------------------
// TYPOGRAPHY — typed references to font-family CSS variables
// ---------------------------------------------------------------------------
export const typography = {
  display: 'var(--font-display)',
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
} as const

// ---------------------------------------------------------------------------
// SPACING — standard scale derived from globals.css section patterns
// ---------------------------------------------------------------------------
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '5rem',   // 80px — matches .section padding
} as const

// ---------------------------------------------------------------------------
// SHADOWS — typed references to shadow CSS variables
// ---------------------------------------------------------------------------
export const shadows = {
  card: 'var(--shadow-card)',
  cardHover: 'var(--shadow-card-hover)',
  glowSm: 'var(--shadow-glow-sm)',
  glow: 'var(--shadow-glow)',
  glowLg: 'var(--shadow-glow-lg)',
} as const

// ---------------------------------------------------------------------------
// DEFAULT EXPORT — combined token object
// ---------------------------------------------------------------------------
const tokens = { brand, colors, typography, spacing, shadows } as const
export default tokens
