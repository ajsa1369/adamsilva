import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { ComparisonTable, Badge } from '@/components/ui'
import type { ComparisonRow } from '@/components/ui/ComparisonTable'
import type { BadgeProps } from '@/components/ui/Badge'
import { ROICalculator } from '@/components/ROICalculator'
import { PACKAGES } from '@/lib/data/packages'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildServiceSchema } from '@/lib/schemas/service'
import {
  SITE_URL,
  organizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/schemas/organization'

// ---------------------------------------------------------------------------
// Static Params — pre-render all 6 tier slugs
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({ tier: pkg.slug }))
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { tier: string }
}): Promise<Metadata> {
  const pkg = PACKAGES.find((p) => p.slug === params.tier)
  if (!pkg) return {}
  return {
    title: `${pkg.name} Package — ${pkg.setupDisplay} Setup | Adam Silva Consulting`,
    description: pkg.heroDescription,
    alternates: { canonical: `${SITE_URL}/packages/${pkg.slug}` },
    openGraph: {
      title: `${pkg.name} Agentic Commerce Package`,
      description: pkg.heroDescription,
      url: `${SITE_URL}/packages/${pkg.slug}`,
      type: 'website',
    },
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TIER_ORDER = [
  'starter',
  'pro',
  'max',
  'elite',
  'shopify-starter',
  'shopify-growth',
] as const

/** Map package slug to a valid Badge variant */
function getBadgeVariant(
  slug: string,
): NonNullable<BadgeProps['variant']> {
  if (slug === 'starter') return 'starter'
  if (slug === 'pro') return 'pro'
  if (slug === 'max') return 'max'
  if (slug === 'elite') return 'elite'
  return 'legacy'
}

// ---------------------------------------------------------------------------
// Page Component (server component)
// ---------------------------------------------------------------------------

export default function TierPage({
  params,
  searchParams,
}: {
  params: { tier: string }
  searchParams: {
    tier?: string
    leads?: string
    rate?: string
    deal?: string
  }
}) {
  const pkg = PACKAGES.find((p) => p.slug === params.tier)
  if (!pkg) notFound()

  // Find next tier up for upgrade nudge comparison
  const currentIndex = TIER_ORDER.indexOf(
    pkg.slug as (typeof TIER_ORDER)[number],
  )
  const nextTierSlug =
    currentIndex >= 0 && currentIndex < TIER_ORDER.length - 1
      ? TIER_ORDER[currentIndex + 1]
      : null
  const nextPkg = nextTierSlug
    ? PACKAGES.find((p) => p.slug === nextTierSlug)
    : null

  // ROI calculator tier (only for starter/pro/max)
  const roiTier = (['starter', 'pro', 'max'] as const).includes(
    pkg.slug as 'starter' | 'pro' | 'max',
  )
    ? (pkg.slug as 'starter' | 'pro' | 'max')
    : 'max'

  // Upgrade nudge comparison rows
  const nudgeRows: ComparisonRow[] | null =
    nextPkg
      ? [
          {
            feature: 'Setup Price',
            values: [pkg.setupDisplay, nextPkg.setupDisplay],
            highlight: true,
          },
          {
            feature: 'Monthly',
            values: [pkg.monthlyDisplay, nextPkg.monthlyDisplay],
            highlight: true,
          },
          {
            feature: 'Integration Slots',
            values: [pkg.slotsDisplay, nextPkg.slotsDisplay],
          },
          {
            feature: 'Chatbot Channels',
            values: [
              pkg.features.chatbotChannels,
              nextPkg.features.chatbotChannels,
            ],
          },
          {
            feature: 'Protocol Stack',
            values: [
              pkg.features.protocolStack,
              nextPkg.features.protocolStack,
            ],
          },
          {
            feature: 'Blog Posts/Month',
            values: [
              String(pkg.features.blogPostsPerMonth),
              String(nextPkg.features.blogPostsPerMonth),
            ],
          },
        ]
      : null

  // JSON-LD (PKG-05)
  const tierSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      buildBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Packages', url: `${SITE_URL}/packages` },
        { name: pkg.name, url: `${SITE_URL}/packages/${pkg.slug}` },
      ]),
      buildServiceSchema({
        id: `packages/${pkg.slug}`,
        name: `${pkg.name} Agentic Commerce Package`,
        description: pkg.heroDescription,
        price: pkg.setupPrice ? String(pkg.setupPrice) : undefined,
        priceCurrency: 'USD',
        priceType: pkg.setupPrice ? 'fixed' : 'custom',
        deliverables: pkg.highlights,
        timeline: '30-60 days implementation',
        audience: pkg.isLegacy
          ? 'Shopify/Wix/Squarespace merchants'
          : 'Headless and custom platform operators',
      }),
      buildFAQSchema(pkg.faqs),
    ],
  }

  return (
    <>
      <JsonLd data={tierSchema} />

      {/* Hero */}
      <section className="section">
        <div className="container">
          <div className="mb-2">
            <Link
              href="/packages"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              &larr; All Packages
            </Link>
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getBadgeVariant(pkg.slug)}>
                  {pkg.badge ?? pkg.name}
                </Badge>
              </div>
              <h1 className="font-display font-bold text-4xl text-[var(--color-text)] mb-2">
                {pkg.name} Package
              </h1>
              <p className="text-lg text-[var(--color-muted)] max-w-xl">
                {pkg.heroDescription}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--color-muted)] mb-1">Setup</p>
              <p className="font-mono font-bold text-3xl text-[var(--color-text)]">
                {pkg.setupDisplay}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-2 mb-1">
                Monthly
              </p>
              <p className="font-mono font-bold text-xl text-[var(--color-text)]">
                {pkg.monthlyDisplay}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-[var(--color-surface-2)]">
        <div className="container">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-6">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">
                Integration Slots
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                {pkg.slotsDisplay}
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">
                Chatbot Channels
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                {pkg.features.chatbotChannels}
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">
                Content Production
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                {pkg.features.blogPostsPerMonth} blog post
                {pkg.features.blogPostsPerMonth !== 1 ? 's' : ''}/mo &middot;{' '}
                {pkg.features.pressReleasesPerMonth} press release
                {pkg.features.pressReleasesPerMonth !== 1 ? 's' : ''}/mo
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">
                Protocol Stack
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                {pkg.features.protocolStack}
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-2">
            {pkg.highlights.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
              >
                <span className="text-emerald-400 mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison vs Next Tier (upgrade nudge) */}
      {nextPkg && nudgeRows && (
        <section className="section">
          <div className="container">
            <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-6">
              {pkg.name} vs {nextPkg.name}
            </h2>
            <ComparisonTable
              columns={[pkg.name, `${nextPkg.name} (upgrade)`]}
              rows={nudgeRows}
              caption={`Side-by-side: ${pkg.name} vs ${nextPkg.name}`}
            />
            <div className="mt-4 text-center">
              <Link
                href={`/packages/${nextPkg.slug}`}
                className="btn-secondary text-sm"
              >
                View {nextPkg.name} Details &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Platform Warning for Shopify/Legacy tiers — inline server-side */}
      {pkg.isLegacy && (
        <section className="section">
          <div className="container">
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
                  &#9888;
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--color-text)] font-display text-lg mb-1">
                    Legacy Platform Detected
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] mb-4">
                    This package is designed for legacy platforms with architectural
                    limitations. Full protocol compliance requires migration to a
                    headless stack.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/platform-check" className="btn-secondary text-sm">
                      Check Compliance Ceiling
                    </Link>
                    <Link href="/get-started" className="btn-primary text-sm">
                      Explore Migration Path
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-4">
            Ready to Start with {pkg.name}?
          </h2>
          <p className="text-[var(--color-muted)] mb-6">
            Get your custom proposal — AI-generated in minutes, no sales call
            required.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/get-started" className="btn-primary">
              Start with {pkg.name} — Get Your Custom Proposal
            </Link>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-4">
            Not sure?{' '}
            <Link href="/packages" className="text-[var(--color-accent)]">
              Compare all packages
            </Link>{' '}
            &middot;{' '}
            <Link
              href="/platform-check"
              className="text-[var(--color-accent)]"
            >
              Check platform compatibility
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-surface-2)]">
        <div className="container">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-2xl">
            {pkg.faqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <p className="font-semibold text-[var(--color-text)] mb-2 speakable-answer">
                  {faq.question}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator (non-elite tiers only) */}
      {pkg.slug !== 'elite' && (
        <section className="section">
          <div className="container">
            <ROICalculator
              defaultTier={roiTier}
              formAction={`/packages/${pkg.slug}`}
              tier={searchParams.tier}
              leads={searchParams.leads}
              rate={searchParams.rate}
              deal={searchParams.deal}
            />
          </div>
        </section>
      )}
    </>
  )
}
