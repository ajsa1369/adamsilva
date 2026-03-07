'use client'

import React from 'react'
import { Badge } from './Badge'
import { Button } from './Button'

export interface TierData {
  id: 'genesis' | 'essentials' | 'prime' | 'scale' | 'legacy'
  name: string           // e.g. "Starter"
  setupPrice: number     // e.g. 2500
  monthlyPrice: number   // e.g. 500
  slots: number          // integration slots included
  highlights: string[]   // 3-5 bullet feature strings
  cta?: string           // CTA button label
  onSelect?: () => void  // CTA handler
  badge?: string         // optional "Most Popular" label
  highlighted?: boolean  // renders with accent border
}

export interface PricingTableProps {
  tiers: TierData[]
  className?: string
}

export function PricingTable({ tiers, className = '' }: PricingTableProps): React.JSX.Element {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <div className="grid grid-cols-5 min-w-[640px] gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`card p-4 flex flex-col relative ${
              tier.highlighted
                ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                : ''
            }`}
          >
            {/* Optional badge ribbon */}
            {tier.badge && (
              <div className="absolute top-3 right-3">
                <Badge variant="default" size="sm">{tier.badge}</Badge>
              </div>
            )}

            {/* Header: tier name */}
            <h3 className="font-display font-bold text-[var(--color-text)] text-base mb-3 pr-12">
              {tier.name}
            </h3>

            {/* Pricing */}
            <div className="mb-3">
              <p className="text-xs text-[var(--color-muted)] mb-0.5">Setup</p>
              <p className="font-mono font-bold text-[var(--color-text)] text-lg leading-none">
                ${tier.setupPrice.toLocaleString()}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-[var(--color-muted)] mb-0.5">Monthly</p>
              <p className="font-mono font-bold text-[var(--color-text)] text-lg leading-none">
                ${tier.monthlyPrice.toLocaleString()}/mo
              </p>
            </div>

            {/* Slot count */}
            <div className="mb-4">
              <Badge variant={tier.id} size="sm">
                {tier.slots} Integration{tier.slots !== 1 ? 's' : ''}
              </Badge>
            </div>

            {/* Highlights */}
            <ul className="flex-1 space-y-1.5 mb-4">
              {tier.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 text-xs mt-0.5 shrink-0">✓</span>
                  <span className="text-sm text-[var(--color-muted)]">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {tier.onSelect && tier.cta && (
              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                size="sm"
                onClick={tier.onSelect}
                className="w-full justify-center"
              >
                {tier.cta}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
