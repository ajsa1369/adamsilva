'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PLATFORM_MATRIX, PACKAGES } from '@/lib/data/packages'
import type { PlatformEntry, ComplianceLevel } from '@/lib/data/packages'
import { PlatformWarning, ComparisonTable } from '@/components/ui'

/**
 * Map ComplianceLevel to a ComparisonTable cell value.
 * - 'full'      -> boolean true  (green check)
 * - 'none'      -> boolean false (red cross)
 * - other       -> descriptive string
 */
function complianceCell(level: ComplianceLevel): boolean | string {
  if (level === 'full') return true
  if (level === 'none') return false
  if (level === 'partial') return 'Partial'
  if (level === 'subdomain') return 'Subdomain'
  if (level === 'migration') return 'With Migration'
  return '\u2014' // em dash
}

export function PlatformCheckTool() {
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const selected: PlatformEntry | undefined = PLATFORM_MATRIX.find(
    (p) => p.slug === selectedSlug,
  )
  const recommendedPkg = selected
    ? PACKAGES.find((p) => p.slug === selected.recommendedPackage)
    : null

  return (
    <section className="section">
      <div className="container max-w-3xl">
        {/* Platform selector */}
        <div className="card p-6 mb-6">
          <label
            htmlFor="platform-select"
            className="block text-sm font-semibold text-[var(--color-text)] mb-2"
          >
            Select your current platform
          </label>
          <select
            id="platform-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <option value="">— Choose your platform —</option>
            {PLATFORM_MATRIX.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Results panel — shown when a platform is selected */}
        {selected && (
          <div className="space-y-6">
            {/* Ceiling summary card */}
            <div
              className={`card p-6 border-l-4 ${
                selected.isLegacy ? 'border-amber-400' : 'border-emerald-400'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                Compliance Ceiling
              </p>
              <p className="font-display font-bold text-xl text-[var(--color-text)] mb-2">
                {selected.name}
              </p>
              <p className="text-[var(--color-muted)] text-sm">
                {selected.ceiling}
              </p>
            </div>

            {/* Compliance matrix */}
            <div>
              <h2 className="font-display font-bold text-lg text-[var(--color-text)] mb-3">
                Compliance Matrix
              </h2>
              <ComparisonTable
                columns={[selected.name]}
                rows={[
                  {
                    feature: 'Chatbot',
                    values: [complianceCell(selected.compliance.chatbot)],
                    highlight: false,
                  },
                  {
                    feature: 'Blog Pipeline',
                    values: [complianceCell(selected.compliance.blog)],
                  },
                  {
                    feature: 'Press Release',
                    values: [complianceCell(selected.compliance.pressRelease)],
                  },
                  {
                    feature: 'UCP Protocol',
                    values: [complianceCell(selected.compliance.ucp)],
                    highlight: true,
                  },
                  {
                    feature: 'ACP Protocol',
                    values: [complianceCell(selected.compliance.acp)],
                    highlight: true,
                  },
                  {
                    feature: 'AP2 Protocol',
                    values: [complianceCell(selected.compliance.ap2)],
                    highlight: true,
                  },
                  {
                    feature: 'Gold Standard',
                    values: [
                      complianceCell(selected.compliance.goldStandard),
                    ],
                    highlight: true,
                  },
                ]}
                caption="Based on ASC Platform Compatibility Matrix (PRD Section 9)"
              />
            </div>

            {/* Legacy penalties — only for legacy platforms */}
            {selected.penalties.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-[var(--color-text)] mb-3">
                  Why Protocol Compliance Is Limited on {selected.name}
                </h3>
                <ul className="space-y-2">
                  {selected.penalties.map((penalty, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">
                        &#10007;
                      </span>
                      {penalty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PlatformWarning component for legacy platforms */}
            {selected.isLegacy && (
              <PlatformWarning
                platform={selected.name}
                onContinueWithLegacy={() => {
                  if (selected.recommendedPackage !== 'migration') {
                    window.location.href = `/packages/${selected.recommendedPackage}`
                  }
                }}
                onExploreMigration={() => {
                  window.location.href = '/get-started'
                }}
              />
            )}

            {/* Recommended package */}
            {recommendedPkg && (
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                  Recommended Package
                </p>
                <p className="font-display font-bold text-xl text-[var(--color-text)] mb-1">
                  {recommendedPkg.name}
                </p>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  {recommendedPkg.heroDescription}
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href={`/packages/${recommendedPkg.slug}`}
                    className="btn-secondary text-sm"
                  >
                    View {recommendedPkg.name} Package
                  </Link>
                  <Link href="/get-started" className="btn-primary text-sm">
                    Get Custom Proposal
                  </Link>
                </div>
              </div>
            )}

            {/* Migration path recommendation for 'no-website' */}
            {selected.recommendedPackage === 'migration' && (
              <div className="card p-6 border-l-4 border-[var(--color-accent)]">
                <p className="font-semibold text-[var(--color-text)] mb-2">
                  Migration Path: Build for Full Gold Standard Compliance
                </p>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  Starting from scratch is the fastest path to Gold Standard
                  agentic commerce compliance. ASC can architect and implement a
                  full Next.js headless stack with complete UCP + ACP + AP2
                  protocols from day one.
                </p>
                <Link href="/get-started" className="btn-primary text-sm">
                  Discuss Migration
                </Link>
              </div>
            )}

            {/* Complementary tool link */}
            <p className="text-sm text-[var(--color-muted)] text-center">
              Already have a domain live?{' '}
              <Link
                href="/tools/protocol-checker"
                className="text-[var(--color-accent)] underline"
              >
                Check your domain&apos;s live protocol endpoints
              </Link>
            </p>
          </div>
        )}

        {/* Empty state CTA */}
        {!selected && (
          <div className="text-center text-[var(--color-muted)] text-sm mt-4">
            <p>Select a platform above to see your compliance ceiling.</p>
          </div>
        )}
      </div>
    </section>
  )
}
