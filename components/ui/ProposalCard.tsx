'use client'

import React from 'react'
import { brand } from '@/lib/design-tokens'
import { Badge } from './Badge'
import { Button } from './Button'

export interface ProposalCardProps {
  tier: 'bronze' | 'silver' | 'gold' | 'core' | 'legacy'
  setupTotal: number      // dollars, no cents
  monthlyTotal: number    // dollars, no cents
  integrationCount: number
  companyName?: string    // prospect name for personalization
  onViewDetails?: () => void  // optional CTA handler
  className?: string
}

const tierAccentLine: Record<ProposalCardProps['tier'], string> = {
  bronze: 'border-t-2 border-amber-400',
  silver: 'border-t-2 border-[#85C1DF]',
  gold:   'border-t-2 border-yellow-400',
  core:   'border-t-2 border-[#4D8EC0]',
  legacy: 'border-t-2 border-slate-400',
}

const tierLabel: Record<ProposalCardProps['tier'], string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold:   'Gold',
  core:   'Core',
  legacy: 'Legacy',
}

export function ProposalCard({
  tier,
  setupTotal,
  monthlyTotal,
  integrationCount,
  companyName,
  onViewDetails,
  className = '',
}: ProposalCardProps): React.JSX.Element {
  return (
    <div className={`card overflow-hidden ${className}`}>
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{ backgroundColor: brand.navy }}
      >
        <div className="flex items-center gap-3">
          <Badge variant={tier} size="sm">
            {tierLabel[tier]}
          </Badge>
          <span className="text-white font-display font-semibold text-lg leading-tight">
            {companyName ? `${companyName} Proposal` : 'Your Proposal'}
          </span>
        </div>
      </div>

      {/* Tier accent line */}
      <div className={tierAccentLine[tier]} />

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
          {/* Setup Investment */}
          <div>
            <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-mono mb-1">
              Setup Investment
            </p>
            <p className="stat-number text-2xl">
              ${setupTotal.toLocaleString()}
            </p>
          </div>

          {/* Monthly Retainer */}
          <div>
            <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-mono mb-1">
              Monthly Retainer
            </p>
            <p className="stat-number text-2xl">
              ${monthlyTotal.toLocaleString()}/mo
            </p>
          </div>

          {/* Integrations */}
          <div>
            <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-mono mb-1">
              Integrations Included
            </p>
            <p className="stat-number text-2xl">
              {integrationCount}
            </p>
          </div>
        </div>

        {onViewDetails && (
          <Button variant="primary" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        )}
      </div>
    </div>
  )
}
