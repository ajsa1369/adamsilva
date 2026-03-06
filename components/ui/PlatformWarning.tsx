'use client'

import React from 'react'
import { Button } from './Button'

export type LegacyPlatform = 'Shopify' | 'Wix' | 'Squarespace' | 'WordPress' | string

export interface PlatformWarningProps {
  platform: LegacyPlatform
  onContinueWithLegacy?: () => void   // "Continue with Legacy Add-On" CTA
  onExploreMigration?: () => void     // "Explore Migration Path" CTA
  className?: string
}

export function PlatformWarning({
  platform,
  onContinueWithLegacy,
  onExploreMigration,
  className = '',
}: PlatformWarningProps): React.JSX.Element {
  return (
    <div className={`rounded-xl border border-amber-300 bg-amber-50 p-6 ${className}`}>
      <div className="flex items-start gap-4">
        {/* Warning icon */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
          ⚠
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--color-text)] font-display text-lg mb-1">
            {platform} Platform Detected
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            {platform} operates on a closed commerce stack, which limits full protocol compliance.
            ASC offers two paths forward:
          </p>

          {/* Two path options */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Legacy Add-On Path */}
            <div className="bg-[var(--color-surface-2)] rounded-lg p-4 border border-[var(--color-border)]">
              <p className="font-semibold text-sm text-[var(--color-text)] mb-1">
                Legacy Add-On Path
              </p>
              <p className="text-xs text-[var(--color-muted)] mb-3">
                Protocol layer on top of {platform}. Limited ceiling — Starter or Pro tier only.
              </p>
              {onContinueWithLegacy && (
                <Button variant="secondary" size="sm" onClick={onContinueWithLegacy}>
                  Continue with Legacy Add-On
                </Button>
              )}
            </div>

            {/* Migration Path */}
            <div className="bg-[var(--color-surface-2)] rounded-lg p-4 border border-[var(--color-border)]">
              <p className="font-semibold text-sm text-[var(--color-text)] mb-1">
                Migration Path
              </p>
              <p className="text-xs text-[var(--color-muted)] mb-3">
                Migrate to a headless stack. Full protocol compliance, all tiers available.
              </p>
              {onExploreMigration && (
                <Button variant="primary" size="sm" onClick={onExploreMigration}>
                  Explore Migration Path
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
