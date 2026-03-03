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
    'Agentic Commerce Packages — Bronze, Silver, Gold, Core | Adam Silva Consulting',
  description:
    'Compare all ASC agentic commerce packages. Bronze from $16,000 setup, Silver from $28,000, Gold from $48,000, Core custom enterprise. Side-by-side feature comparison.',
  alternates: { canonical: `${SITE_URL}/packages` },
  openGraph: {
    title: 'Agentic Commerce Packages — ASC',
    description:
      'Compare Bronze, Silver, Gold, Core packages for agentic commerce protocol implementation.',
    url: `${SITE_URL}/packages`,
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Static data derivations
// ---------------------------------------------------------------------------

const mainTiers = PACKAGES.filter((p) => !p.isLegacy)

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

const comparisonColumns = ['Bronze', 'Silver', 'Gold', 'Core']

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Setup Price',
    values: ['$16,000', '$28,000', '$48,000', 'From $75K'],
    highlight: true,
  },
  {
    feature: 'Monthly',
    values: ['$3,500', '$6,500', '$12,000', 'Custom'],
    highlight: true,
  },
  {
    feature: 'T1 Integration Slots',
    values: ['3', '6', '12', 'Unlimited'],
  },
  { feature: 'T2 Integration Slots', values: ['0', '1', '3', 'Unlimited'] },
  { feature: 'T3 Integration Slots', values: ['0', '0', '1', 'Unlimited'] },
  {
    feature: 'Blog Posts / Month',
    values: mainTiers.map((p) => String(p.features.blogPostsPerMonth)),
  },
  {
    feature: 'Images / Post',
    values: mainTiers.map((p) => String(p.features.imagesPerPost)),
  },
  {
    feature: 'Press Releases / Month',
    values: mainTiers.map((p) => String(p.features.pressReleasesPerMonth)),
  },
  {
    feature: 'Chatbot Channels',
    values: mainTiers.map((p) => p.features.chatbotChannels),
  },
  {
    feature: 'Protocol Stack',
    values: mainTiers.map((p) => p.features.protocolStack),
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
        'Bronze, Silver, Gold, Core, and Shopify packages for agentic commerce protocol implementation.',
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
        question: 'What is the difference between Bronze and Gold?',
        answer:
          'Bronze ($16,000 setup) includes 3 Tier-1 integrations, web chatbot, 1 blog/month, and UCP protocol. Gold ($48,000 setup) includes 12 T1 + 3 T2 + 1 T3 integrations, all 4 chatbot channels (Web, SMS, Voice, WhatsApp), 8 blogs/month, and full UCP+ACP+AP2 Gold Standard compliance.',
      },
      {
        question: 'Which platforms are compatible with ASC packages?',
        answer:
          'Any headless or custom architecture (Next.js, custom SPA, Webflow headless) achieves full compliance. Shopify, Wix, Squarespace, and WordPress platforms have architectural limitations — ASC offers dedicated Shopify Starter and Shopify Growth packages for these merchants.',
      },
      {
        question: 'How long until I see ROI from an ASC package?',
        answer:
          'Based on industry benchmarks, Bronze clients see payback in 8-18 months, Silver in 5-12 months, and Gold in 3-8 months. The ROI calculator above shows projections based on your specific leads/month, close rate, and average deal size.',
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
  searchParams: { view?: string }
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
            From lean Bronze entry to unlimited Core — every package delivers AI
            chatbot, authority content, press release pipeline, and progressive
            protocol compliance.
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
          <div className="grid grid-cols-4 gap-3 mt-4 min-w-[640px]">
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
          <ROICalculator />
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
