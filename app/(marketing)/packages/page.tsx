import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { PricingTable } from '@/components/ui/PricingTable'
import type { TierData } from '@/components/ui/PricingTable'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import type { ComparisonRow } from '@/components/ui/ComparisonTable'
import { ROICalculator } from '@/components/ROICalculator'
import { PACKAGES } from '@/lib/data/packages'
import { buildFAQSchema } from '@/lib/schemas/faq'
import {
  SITE_URL,
  ORG_ID,
  organizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/schemas/organization'

// ---------------------------------------------------------------------------
// Metadata (server component — no 'use client')
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Agentic Commerce Packages — Starter, Pro, Max | Adam Silva Consulting',
  description:
    'Compare ASC agentic commerce packages. Starter from $16,000 setup, Pro from $28,000, Max from $48,000. Same agent fleet — full JSON-LD schema, AEO/GEO, and protocol stack applied to 30, 60, or 100 pages.',
  alternates: { canonical: `${SITE_URL}/packages` },
  openGraph: {
    title: 'Agentic Commerce Packages — ASC',
    description:
      'Compare Starter, Pro, and Max packages for agentic commerce implementation. Same agents, different page scope.',
    url: `${SITE_URL}/packages`,
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Static data derivations
// ---------------------------------------------------------------------------

// Starter, Pro, Max — the three purchasable tiers (Elite is enterprise/custom, shown separately)
const mainTiers = PACKAGES.filter((p) => !p.isLegacy && p.setupPrice !== null)

const tierData: TierData[] = mainTiers.map((pkg) => ({
  id: pkg.slug as TierData['id'],
  name: pkg.name,
  setupPrice: pkg.setupPrice ?? 75000,
  monthlyPrice: pkg.monthlyPrice ?? 0,
  slots: pkg.tier1Slots ?? 99,
  highlights: pkg.highlights,
  badge: pkg.badge ?? undefined,
  highlighted: pkg.highlighted,
}))

const comparisonColumns = ['Starter', 'Pro', 'Max']

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Setup Price',
    values: ['$16,000', '$28,000', '$48,000'],
    highlight: true,
  },
  {
    feature: 'Continuity Plan',
    values: ['$3,500/mo', '$6,500/mo', '$12,000/mo'],
    highlight: true,
  },
  {
    feature: 'Pages in Setup',
    values: ['30', '60', '100'],
    highlight: true,
  },
  {
    feature: 'AI Commerce Agent Channels',
    values: mainTiers.map((p) => p.features.chatbotChannels),
  },
  {
    feature: 'Protocol Stack',
    values: mainTiers.map((p) => p.features.protocolStack),
  },
  {
    feature: 'Authority Content Agent',
    values: mainTiers.map(() => 'Unlimited articles'),
  },
  {
    feature: 'Press Release Agent',
    values: mainTiers.map(() => 'Client-scheduled'),
  },
  {
    feature: 'Images per Article',
    values: mainTiers.map((p) => String(p.features.imagesPerPost)),
  },
  {
    feature: 'Architecture',
    values: mainTiers.map((p) => p.features.architecture),
  },
  {
    feature: 'Support',
    values: mainTiers.map((p) => p.features.support),
  },
]

// ---------------------------------------------------------------------------
// JSON-LD (PKG-05)
// ---------------------------------------------------------------------------

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Packages', url: `${SITE_URL}/packages` },
    ]),
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/packages#list`,
      name: 'ASC Agentic Commerce Packages',
      description:
        'Starter, Pro, Max, Elite, and Shopify packages for agentic commerce protocol implementation.',
      numberOfItems: PACKAGES.length,
      itemListElement: PACKAGES.map((pkg, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Offer',
          '@id': `${SITE_URL}/packages/${pkg.slug}#offer`,
          name: `${pkg.name} Package`,
          description: pkg.heroDescription,
          price: pkg.setupPrice ?? '75000',
          priceCurrency: 'USD',
          seller: { '@id': ORG_ID },
          url: `${SITE_URL}/packages/${pkg.slug}`,
        },
      })),
    },
    buildFAQSchema([
      {
        question: 'What is the difference between Starter, Pro, and Max?',
        answer:
          'All three tiers deploy the same agent fleet — AI Commerce Agent, Authority Content Agent (with topical map planning), and Press Release Agent. The only difference is the number of pages optimized in setup: Starter covers 30 pages ($16,000), Pro covers 60 pages ($28,000), Max covers 100 pages ($48,000). More pages means more JSON-LD schema implementations, AEO/GEO optimization, and protocol endpoints — which means more entry points for AI systems to find, cite, and transact with your business.',
      },
      {
        question: 'Which platforms are compatible with ASC packages?',
        answer:
          'Any SSR (Server-Side Rendered) headless architecture — Next.js, Remix, Nuxt, or custom SSR — achieves full Gold Standard compliance. SSR is the key differentiator: AI agents receive complete HTML on the first request with zero hydration tax. SPA (Single-Page Application) architectures force AI crawlers to execute JavaScript before seeing any content, which most AI agents cannot do. Shopify, Wix, Squarespace, and WordPress platforms carry the SPA hydration tax — ASC offers dedicated Shopify Starter and Shopify Growth packages for these merchants.',
      },
      {
        question: 'How long until I see ROI from an ASC package?',
        answer:
          'Based on industry benchmarks, Starter clients see payback in 8-18 months, Pro in 5-12 months, and Max in 3-8 months. The ROI calculator above shows projections based on your specific leads/month, close rate, and average deal size.',
      },
    ]),
  ],
}

// ---------------------------------------------------------------------------
// Page Component (server component)
// ---------------------------------------------------------------------------

export default function PackagesPage({
  searchParams,
}: {
  searchParams: {
    view?: string
    tier?: string
    leads?: string
    rate?: string
    deal?: string
  }
}) {
  const showMonthly = searchParams.view === 'monthly'

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section className="section">
        <div className="container text-center">
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-[var(--color-text)] mb-4">
            Agentic Commerce Packages
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-6">
            Starter, Pro, and Max — the same agent fleet (AI Commerce Agent, Authority Content Agent, Press Release Agent) applied to 30, 60, or 100 pages. The price reflects the scope of the setup, not the capability.
          </p>
          <Link href="/get-started" className="btn-primary inline-block">
            Get Your Custom Proposal &rarr;
          </Link>
        </div>
      </section>

      {/* Setup/Monthly Toggle + PricingTable */}
      <section className="section">
        <div className="container">
          <div className="flex gap-2 justify-center mb-6">
            <Link
              href="/packages?view=setup"
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                !showMonthly
                  ? 'bg-[var(--color-accent)] text-white border-transparent'
                  : 'border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              Setup Price
            </Link>
            <Link
              href="/packages?view=monthly"
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                showMonthly
                  ? 'bg-[var(--color-accent)] text-white border-transparent'
                  : 'border-[var(--color-border)] text-[var(--color-muted)]'
              }`}
            >
              Monthly Price
            </Link>
          </div>

          <PricingTable tiers={tierData} />

          {/* View Details links below PricingTable */}
          <div className="grid grid-cols-3 gap-3 mt-4 max-w-2xl mx-auto">
            {mainTiers.map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/packages/${pkg.slug}`}
                className="btn-secondary text-center text-sm py-2"
              >
                View {pkg.name} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="section bg-[var(--color-surface-2)]">
        <div className="container">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-6 text-center">
            Feature Comparison
          </h2>
          <ComparisonTable
            columns={comparisonColumns}
            rows={comparisonRows}
            caption="Side-by-side comparison of all ASC agentic commerce packages"
          />
        </div>
      </section>

      {/* Enterprise / Core CTA */}
      <section className="section">
        <div className="container">
          <div className="card p-6 border-l-4 border-[var(--color-accent)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-[var(--color-text)] mb-1">
                Need more than 100 pages — or multi-brand / white-label?
              </p>
              <p className="text-[var(--color-muted)] text-sm">
                Elite is a custom-scoped engagement for enterprises, agencies, and multi-brand portfolios. Unlimited pages, custom agent training, white-label protocol endpoints. Priced from $75,000.
              </p>
            </div>
            <Link href="/packages/elite" className="btn-secondary text-sm shrink-0">
              Learn About Elite &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Shopify / Legacy Platform Callout */}
      <section className="section">
        <div className="container">
          <div className="card p-6 border-l-4 border-[var(--color-accent)]">
            <p className="font-semibold text-[var(--color-text)] mb-1">
              Using Shopify, Wix, or Squarespace?
            </p>
            <p className="text-[var(--color-muted)] text-sm mb-3">
              ASC offers dedicated packages for legacy platforms with a clear
              migration path.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/packages/shopify-starter"
                className="btn-secondary text-sm"
              >
                Shopify Starter &rarr;
              </Link>
              <Link
                href="/packages/shopify-growth"
                className="btn-secondary text-sm"
              >
                Shopify Growth &rarr;
              </Link>
              <Link
                href="/platform-check"
                className="btn-secondary text-sm"
              >
                Check Platform Compatibility &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section">
        <div className="container">
          <ROICalculator
            formAction="/packages"
            tier={searchParams.tier}
            leads={searchParams.leads}
            rate={searchParams.rate}
            deal={searchParams.deal}
            hiddenParams={showMonthly ? { view: 'monthly' } : undefined}
          />
        </div>
      </section>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4">
        <Link
          href="/get-started"
          className="btn-primary w-full text-center block"
        >
          Get Your Custom Proposal &rarr;
        </Link>
      </div>
    </>
  )
}
