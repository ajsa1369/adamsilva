import React from 'react'

export interface BadgeProps {
  variant?:
    | 'default'
    // Tier variants
    | 'starter' | 'pro' | 'max' | 'elite' | 'legacy'
    // Status variants
    | 'success' | 'warning' | 'error' | 'info'
    // Protocol variants — reuse existing globals.css classes
    | 'ucp' | 'acp' | 'ap2'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

// Base classes shared by non-protocol, non-default variants
const BASE = 'inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest font-mono'

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  // Protocol variants — delegate entirely to globals.css
  default: 'badge',
  info:    'badge',
  ucp:     'badge badge-ucp',
  acp:     'badge badge-acp',
  ap2:     'badge badge-ap2',

  // Tier variants
  starter: `${BASE} bg-amber-100 text-amber-800 border border-amber-300`,
  pro:     `${BASE} bg-[rgba(133,193,223,0.15)] text-[#2a6a8f] border border-[rgba(77,142,192,0.4)]`,
  max:     `${BASE} bg-yellow-100 text-yellow-800 border border-yellow-300`,
  elite:   `${BASE} bg-[#1B2E4B] text-white border border-[rgba(77,142,192,0.5)]`,
  legacy: `${BASE} bg-slate-100 text-slate-600 border border-slate-300`,

  // Status variants
  success: `${BASE} bg-emerald-100 text-emerald-800 border border-emerald-300`,
  warning: `${BASE} bg-amber-100 text-amber-800 border border-amber-300`,
  error:   `${BASE} bg-red-100 text-red-700 border border-red-300`,
}

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-[0.625rem] px-2 py-0.5',
  md: '',
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}: BadgeProps): React.JSX.Element {
  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
