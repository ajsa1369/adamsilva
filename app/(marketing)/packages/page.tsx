import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import type { ComparisonRow } from '@/components/ui/ComparisonTable'
import { ROICalculator } from '@/components/ROICalculator'
import { PainStatsStrip } from '@/app/components/packages/AnimatedCounter'
import { PACKAGES } from '@/lib/data/packages'
import { buildFAQSchema } from '@/lib/schemas/faq'
import {
  SITE_URL,
  ORG_ID,
  organizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/schemas/organization'

// ---------------------------------------------------------------------------
// Metadata — AEO/GEO optimized with SpeakableSpecification targeting
// ---------------------------------------------------------------------------

const pageUrl = `${SITE_URL}/packages`
const pageTitle =
  'Agentic Commerce Packages — Starter, Pro, Max, Elite | Adam Silva Consulting'
const pageDescription =
  'Compare all 4 ASC agentic commerce tiers. Same AI agent fleet — different scope. Starter from $16,000 (30 pages), Pro $28,000 (60 pages), Max $48,000 (100 pages), Elite from $75,000 (unlimited). SSR architecture, zero hydration tax, full Gold Standard protocol compliance.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Agentic Commerce Packages — Starter, Pro, Max, Elite | ASC',
    description:
      'Compare all 4 tiers: same agent fleet, different page scope. SSR architecture eliminates the hydration tax. From $16,000 setup.',
    url: pageUrl,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/packages/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'ASC Agentic Commerce Packages — Starter, Pro, Max, Elite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic Commerce Packages — ASC',
    description:
      'Starter, Pro, Max, Elite — same AI agents, different scope. SSR-first. Zero hydration tax.',
    images: [`${SITE_URL}/packages/twitter-image`],
  },
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const allMainTiers = PACKAGES.filter((p) => !p.isLegacy)
const purchasableTiers = PACKAGES.filter(
  (p) => !p.isLegacy && p.setupPrice !== null
)

const comparisonColumns = ['Starter', 'Pro', 'Max', 'Elite']

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Setup Investment',
    values: ['$16,000', '$28,000', '$48,000', 'From $75,000'],
    highlight: true,
  },
  {
    feature: 'Continuity Plan',
    values: ['$3,500/mo', '$6,500/mo', '$12,000/mo', 'Custom'],
    highlight: true,
  },
  {
    feature: 'Pages Optimized in Setup',
    values: ['30', '60', '100', 'Unlimited'],
    highlight: true,
  },
  {
    feature: 'AI Commerce Agent Channels',
    values: allMainTiers.map((p) => p.features.chatbotChannels),
  },
  {
    feature: 'Protocol Stack',
    values: allMainTiers.map((p) => p.features.protocolStack),
  },
  {
    feature: 'Authority Content Agent',
    values: allMainTiers.map(() => 'Unlimited articles'),
  },
  {
    feature: 'Press Release Agent',
    values: allMainTiers.map(() => 'Client-scheduled'),
  },
  {
    feature: 'Images per Article',
    values: allMainTiers.map((p) => String(p.features.imagesPerPost)),
  },
  {
    feature: 'Architecture',
    values: allMainTiers.map((p) => p.features.architecture),
  },
  {
    feature: 'Support',
    values: allMainTiers.map((p) => p.features.support),
  },
]

// ---------------------------------------------------------------------------
// Sandler-style FAQ (objection handling)
// ---------------------------------------------------------------------------

const sandlerFAQs = [
  {
    question: 'What is the difference between Starter, Pro, Max, and Elite?',
    answer:
      'All four tiers deploy the same AI agent fleet — AI Commerce Agent, Authority Content Agent (with topical map planning), and Press Release Agent. The difference is scope: Starter covers 30 pages ($16,000), Pro covers 60 pages ($28,000), Max covers 100 pages ($48,000), Elite is unlimited (from $75,000). More pages means more JSON-LD schema, AEO/GEO optimization, and protocol endpoints — more entry points for AI systems to discover, cite, and transact with your business.',
  },
  {
    question: 'Why does the setup cost $16,000 or more?',
    answer:
      'The setup fee covers hundreds of hours of manual implementation: full JSON-LD schema markup on every page (Product, Organization, FAQPage, SpeakableSpecification, BreadcrumbList), AEO/GEO optimization of every content block, protocol endpoint deployment (UCP manifest, ACP checkout, AP2 trust layer), AI Commerce Agent training on your product catalog, and Authority Content Agent topical map construction. This is not template work — every implementation is custom to your business, product catalog, and competitive landscape.',
  },
  {
    question: 'Which platforms are compatible with ASC packages?',
    answer:
      'SSR (Server-Side Rendered) headless architectures — Next.js, Remix, Nuxt, or custom SSR — achieve full Gold Standard compliance. SSR is the key differentiator: AI agents receive complete HTML on the first request with zero hydration tax. SPA (Single-Page Application) architectures force AI crawlers to execute JavaScript before seeing any content, which most AI agents cannot do. Shopify, Wix, Squarespace, and WordPress carry the SPA hydration tax — ASC offers dedicated Shopify Starter and Shopify Growth packages for these merchants.',
  },
  {
    question: "We already have SEO. Why would we need this?",
    answer:
      'Traditional SEO optimizes for Google\'s link-based index. AI agents (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) use a fundamentally different discovery mechanism: they parse HTML directly, read JSON-LD schema, and look for protocol endpoints like UCP manifests. 83% of Google searches now show AI Overviews. If your site is not SSR-rendered with structured data and protocol endpoints, AI agents cannot find you — regardless of your PageRank. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are not SEO upgrades; they are separate disciplines.',
  },
  {
    question: "What if we don't see results?",
    answer:
      'AI agent discovery is measurable. Within 30 days of launch, we track: (1) UCP manifest fetch frequency by AI crawlers, (2) JSON-LD entity recognition in Google Knowledge Graph, (3) AI citation appearances across ChatGPT, Perplexity, and Gemini, (4) token efficiency scores via our Token Calculator tool, and (5) agent-mediated lead volume through your AI Commerce Agent. Every metric has a baseline measurement taken before implementation. If your site is SSR-rendered and schema-complete, AI agents will index it — this is not probabilistic, it is architectural.',
  },
  {
    question: 'How long until I see ROI from an ASC package?',
    answer:
      'Based on client benchmarks: Starter clients see payback in 8-18 months, Pro in 5-12 months, Max in 3-8 months. The ROI accelerates as AI agent transaction volume grows — current industry projections show agentic commerce reaching $4.6 trillion by 2028. Early movers capture disproportionate share because AI agents build trust scores over time; the first businesses with Gold Standard compliance in each vertical become the default recommendation.',
  },
  {
    question: 'Can we start with Starter and upgrade later?',
    answer:
      'Yes. Every page optimized in Starter carries forward. Upgrading from Starter (30 pages) to Pro (60 pages) means we optimize 30 additional pages — you never re-pay for work already done. The agent fleet, protocol endpoints, and schema infrastructure scale with you. Most clients who start with Starter upgrade within 6-12 months as AI-attributed revenue grows.',
  },
]

// ---------------------------------------------------------------------------
// JSON-LD — heavy schema graph
// ---------------------------------------------------------------------------

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Packages', url: pageUrl },
    ]),
    // WebPage with SpeakableSpecification
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { '@id': `${SITE_URL}#website` },
      publisher: { '@id': ORG_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-answer', '.speakable-hero'],
      },
      mainEntity: { '@id': `${pageUrl}#offers` },
    },
    // AggregateOffer for the package lineup
    {
      '@type': 'AggregateOffer',
      '@id': `${pageUrl}#offers`,
      name: 'ASC Agentic Commerce Packages',
      description:
        'Four tiers of agentic commerce implementation — same AI agent fleet, different page scope. SSR architecture with zero hydration tax.',
      lowPrice: '16000',
      highPrice: '75000',
      priceCurrency: 'USD',
      offerCount: 4,
      offers: allMainTiers.map((pkg) => ({
        '@type': 'Offer',
        '@id': `${SITE_URL}/packages/${pkg.slug}#offer`,
        name: `${pkg.name} Package`,
        description: pkg.heroDescription,
        price: pkg.setupPrice ?? '75000',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        seller: { '@id': ORG_ID },
        url: `${SITE_URL}/packages/${pkg.slug}`,
        itemOffered: {
          '@type': 'Service',
          name: `${pkg.name} Agentic Commerce Package`,
          description: pkg.heroDescription,
          provider: { '@id': ORG_ID },
          serviceType: 'Agentic Commerce Implementation',
          areaServed: 'Worldwide',
        },
      })),
    },
    // ItemList for AI discovery
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#list`,
      name: 'ASC Agentic Commerce Package Tiers',
      numberOfItems: allMainTiers.length,
      itemListElement: allMainTiers.map((pkg, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${pkg.name} Package`,
        url: `${SITE_URL}/packages/${pkg.slug}`,
      })),
    },
    // VideoObject (will reference the Remotion-generated video)
    {
      '@type': 'VideoObject',
      '@id': `${pageUrl}#video`,
      name: 'ASC Agentic Commerce Packages Overview',
      description:
        'Overview of all four ASC agentic commerce tiers: Starter, Pro, Max, and Elite. Same AI agent fleet, different page scope. SSR architecture with zero hydration tax.',
      thumbnailUrl: `${SITE_URL}/packages/opengraph-image`,
      uploadDate: '2026-03-06',
      duration: 'PT30S',
      contentUrl: `${SITE_URL}/videos/packages-overview.mp4`,
      embedUrl: `${SITE_URL}/videos/packages-overview.mp4`,
      publisher: { '@id': ORG_ID },
    },
    // Primary ImageObject
    {
      '@type': 'ImageObject',
      '@id': `${pageUrl}#primary-image`,
      url: `${SITE_URL}/packages/opengraph-image`,
      width: 1200,
      height: 630,
      caption:
        'ASC Agentic Commerce Packages: Starter ($16K), Pro ($28K), Max ($48K), Elite (From $75K)',
      representativeOfPage: true,
      creditText: 'Adam Silva Consulting',
    },
    // FAQ schema
    buildFAQSchema(sandlerFAQs),
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
  const elitePkg = PACKAGES.find((p) => p.slug === 'elite')

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* ================================================================== */}
      {/* HERO — Sandler Pain-First (Cost of Inaction)                       */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Glow orbs */}
        <div className="glow-orb glow-orb-blue w-96 h-96 -top-48 -right-24 opacity-50" />
        <div className="glow-orb glow-orb-purple w-64 h-64 bottom-0 left-1/4 opacity-30" />

        <div className="section-lg relative z-10">
          <div className="container text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-up">
              <span className="badge">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Commerce Era
              </span>
            </div>

            {/* Pain headline — speakable for AI agents */}
            <h1 className="speakable-hero font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] mb-6 max-w-4xl mx-auto leading-tight animate-fade-up-delay-1">
              Your Competitors Are Being Cited by AI Agents.{' '}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#60a5fa] bg-clip-text text-transparent">
                Are You?
              </span>
            </h1>

            {/* Pain subhead */}
            <p className="speakable-answer text-lg md:text-xl text-[var(--color-muted)] max-w-3xl mx-auto mb-8 animate-fade-up-delay-2">
              83% of Google searches now show AI Overviews. ChatGPT processes 14M+ commercial queries daily.
              If your site runs on SPA architecture with the hydration tax, AI agents see a blank page —
              your products, pricing, and expertise are invisible to the fastest-growing commerce channel.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
              <Link href="/get-started" className="btn-primary text-lg px-8 py-3">
                Get Your Custom Proposal &rarr;
              </Link>
              <Link href="#tiers" className="btn-secondary text-lg px-8 py-3">
                Compare All 4 Tiers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PAIN STATS — Animated counters (cost of inaction)                  */}
      {/* ================================================================== */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-3">The Cost of Inaction</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)]">
              Every Day Without AI Discovery Infrastructure Costs You Revenue
            </h2>
          </div>
          <PainStatsStrip />
        </div>
      </section>

      {/* ================================================================== */}
      {/* VIDEO SHOWCASE                                                     */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Video embed */}
            <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface-2)] border border-[var(--color-border)] aspect-video">
              <video
                className="w-full h-full object-cover"
                poster="/packages/opengraph-image"
                preload="none"
                controls
                playsInline
              >
                <source src="/videos/packages-overview.mp4" type="video/mp4" />
                {/* Fallback if video not yet rendered */}
              </video>
              {/* Overlay gradient for poster state */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Explainer text */}
            <div>
              <p className="section-label mb-3">How It Works</p>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)] mb-4">
                One Agent Fleet. Four Levels of Scope.
              </h2>
              <p className="text-[var(--color-muted)] mb-6 leading-relaxed">
                Every ASC package deploys the same AI agent fleet: AI Commerce Agent for 24/7 lead capture,
                Authority Content Agent with topical map planning for unlimited 2,000-word articles,
                and Press Release Agent with pre-built schema rules. The only difference between tiers
                is how many pages we optimize in setup — 30, 60, 100, or unlimited.
              </p>
              <ul className="space-y-3">
                {[
                  'Full JSON-LD schema on every page (Product, FAQPage, SpeakableSpecification)',
                  'AEO/GEO optimization for AI citation targeting',
                  'SSR architecture — zero hydration tax, instant HTML delivery',
                  'UCP/ACP/AP2 protocol endpoints for Gold Standard compliance',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">&#10003;</span>
                    <span className="text-[var(--color-muted)] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ALL 4 TIERS — Glassmorphism pricing cards                          */}
      {/* ================================================================== */}
      <section id="tiers" className="section bg-[var(--color-surface)] relative overflow-hidden">
        <div className="glow-orb glow-orb-blue w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

        <div className="container relative z-10">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Choose Your Scope</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)] mb-3">
              Four Tiers. Same Agent Fleet. Different Scale.
            </h2>
            <p className="text-[var(--color-muted)] max-w-2xl mx-auto">
              Every tier includes AI Commerce Agent, Authority Content Agent, and Press Release Agent.
              The setup price reflects scope — more pages means more schema, more optimization, more entry points.
            </p>
          </div>

          {/* 4-tier grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {allMainTiers.map((pkg) => {
              const isMax = pkg.slug === 'max'
              const isElite = pkg.slug === 'elite'
              return (
                <div
                  key={pkg.slug}
                  className={`card-glass p-5 flex flex-col relative ${
                    isMax
                      ? 'border-[var(--color-accent)] shadow-[0_0_30px_rgba(37,99,235,0.15)] lg:scale-105 lg:-my-2'
                      : ''
                  } ${isElite ? 'bg-gradient-to-b from-[rgba(248,250,255,0.9)] to-[rgba(37,99,235,0.04)]' : ''}`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="badge text-[0.625rem]">{pkg.badge}</span>
                    </div>
                  )}

                  {/* Tier name */}
                  <h3 className="font-display font-bold text-[var(--color-text)] text-lg mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[var(--color-muted-2)] mb-4">{pkg.tagline}</p>

                  {/* Pricing */}
                  <div className="mb-2">
                    <p className="text-xs text-[var(--color-muted)] mb-0.5">Setup</p>
                    <p className="font-mono font-bold text-[var(--color-text)] text-2xl leading-none">
                      {pkg.setupDisplay}
                    </p>
                  </div>
                  <div className="mb-5">
                    <p className="text-xs text-[var(--color-muted)] mb-0.5">Monthly</p>
                    <p className="font-mono font-bold text-[var(--color-muted)] text-base leading-none">
                      {pkg.monthlyDisplay}
                    </p>
                  </div>

                  {/* Pages + slots */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="badge text-[0.625rem]">
                      {pkg.pagesIncluded ? `${pkg.pagesIncluded} pages` : 'Unlimited'}
                    </span>
                    <span className="badge text-[0.625rem]">{pkg.slotsDisplay}</span>
                  </div>

                  {/* Protocol stack badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block text-[0.625rem] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        pkg.features.protocolStack.includes('Gold Standard')
                          ? 'bg-gradient-to-r from-[rgba(14,165,233,0.1)] via-[rgba(168,85,247,0.1)] to-[rgba(16,185,129,0.1)] text-[var(--color-accent)] border border-[rgba(37,99,235,0.2)]'
                          : 'bg-[rgba(37,99,235,0.06)] text-[var(--color-muted)] border border-[var(--color-border)]'
                      }`}
                    >
                      {pkg.features.protocolStack}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="flex-1 space-y-2 mb-5">
                    {pkg.highlights.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 text-xs mt-0.5 shrink-0 font-bold">&#10003;</span>
                        <span className="text-xs text-[var(--color-muted)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={isElite ? '/contact?package=elite' : `/packages/${pkg.slug}`}
                    className={`${isMax ? 'btn-primary' : 'btn-secondary'} w-full text-center text-sm justify-center`}
                  >
                    {isElite ? 'Request Custom Scope' : `View ${pkg.name} Details`} &rarr;
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SSR vs SPA — Architecture differentiator (AEO key point)           */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="card-glass p-6 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="section-label mb-3">Why Architecture Matters</p>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)] mb-4">
                  SSR Eliminates the Hydration Tax.{' '}
                  <span className="text-[var(--color-accent)]">SPA Does Not.</span>
                </h2>
                <p className="speakable-answer text-[var(--color-muted)] leading-relaxed mb-4">
                  When an AI agent requests a page from an SPA (Single-Page Application), it receives a near-empty HTML
                  document with a JavaScript bundle. The agent must execute 2MB+ of JavaScript before seeing any content.
                  Most AI agents cannot or will not do this. SSR (Server-Side Rendering) delivers complete HTML on the
                  first request — every product, every price, every schema markup is immediately readable. This is why
                  SSR architecture is a prerequisite for Gold Standard compliance.
                </p>
              </div>

              {/* SSR vs SPA visual comparison */}
              <div className="space-y-4">
                {/* SPA card */}
                <div className="terminal">
                  <div className="terminal-bar">
                    <div className="terminal-dot bg-red-400" />
                    <div className="terminal-dot bg-amber-400" />
                    <div className="terminal-dot bg-emerald-400" />
                    <span className="text-xs font-mono text-[var(--color-muted-2)] ml-2">
                      SPA Response (Shopify/Wix/React CSR)
                    </span>
                  </div>
                  <div className="p-4 font-mono text-xs text-red-500 leading-relaxed">
                    {'<html><body>'}
                    <br />
                    {'  <div id="root"></div>'}
                    <br />
                    {'  <script src="bundle.js" /> <!-- 2.1 MB -->'}
                    <br />
                    {'</body></html>'}
                    <br />
                    <span className="text-[var(--color-muted-2)]">
                      {'// AI agent sees: NOTHING (until JS executes)'}
                    </span>
                  </div>
                </div>

                {/* SSR card */}
                <div className="terminal">
                  <div className="terminal-bar">
                    <div className="terminal-dot bg-emerald-400" />
                    <div className="terminal-dot bg-emerald-400" />
                    <div className="terminal-dot bg-emerald-400" />
                    <span className="text-xs font-mono text-emerald-600 ml-2">
                      SSR Response (Next.js / ASC Stack)
                    </span>
                  </div>
                  <div className="p-4 font-mono text-xs text-emerald-600 leading-relaxed">
                    {'<html><head>'}
                    <br />
                    {'  <script type="application/ld+json">'}
                    <br />
                    {'    {"@type":"Product","name":"..."} '}
                    <br />
                    {'  </script>'}
                    <br />
                    {'</head><body>'}
                    <br />
                    {'  <h1>Your Product</h1>'}
                    <br />
                    {'  <p>$49.99 — Full description...</p>'}
                    <br />
                    {'</body></html>'}
                    <br />
                    <span className="text-[var(--color-muted-2)]">
                      {'// AI agent sees: EVERYTHING (instant)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FULL COMPARISON TABLE                                              */}
      {/* ================================================================== */}
      <section className="section bg-[var(--color-surface-2)]">
        <div className="container">
          <div className="text-center mb-8">
            <p className="section-label mb-3">Side-by-Side</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)]">
              Feature Comparison — All 4 Tiers
            </h2>
          </div>
          <ComparisonTable
            columns={comparisonColumns}
            rows={comparisonRows}
            caption="Complete feature comparison of all ASC agentic commerce packages including Elite enterprise tier"
          />
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEGATIVE REVERSE CTA — Sandler "This Isn't For Everyone"           */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="card-glass p-8 lg:p-12 text-center border-[var(--color-accent)] border-2">
            <p className="section-label mb-4">A Note From Adam</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)] mb-6">
              This Isn&apos;t For Everyone.
            </h2>
            <div className="text-[var(--color-muted)] space-y-4 text-left max-w-xl mx-auto leading-relaxed">
              <p>
                If you&apos;re looking for a quick SEO fix, a chatbot widget, or a templated solution — this is not it.
                ASC packages are high-investment, high-touch implementations built for businesses that understand
                agentic commerce is the next revenue channel, not a marketing experiment.
              </p>
              <p>
                Our clients are the businesses that will be recommended by AI agents in 2027.
                The rest will wonder why their traffic disappeared.
              </p>
              <p className="font-semibold text-[var(--color-text)]">
                If that resonates with you, we should talk. If it doesn&apos;t, there are plenty of
                excellent agencies doing traditional digital marketing.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary text-lg px-8 py-3">
                I&apos;m Ready. Let&apos;s Talk. &rarr;
              </Link>
              <Link href="/acra" className="btn-secondary text-lg px-8 py-3">
                Check My AI Readiness First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SHOPIFY / LEGACY PLATFORM CALLOUT                                  */}
      {/* ================================================================== */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container">
          <div className="card p-6 border-l-4 border-amber-500">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="font-display font-semibold text-[var(--color-text)] mb-1">
                  Using Shopify, Wix, or Squarespace?
                </p>
                <p className="text-[var(--color-muted)] text-sm">
                  These SPA platforms carry the hydration tax, but ASC offers dedicated packages
                  that maximize AI capability within their constraints — with a clear migration path to SSR
                  when you&apos;re ready.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap shrink-0">
                <Link href="/packages/shopify-starter" className="btn-secondary text-sm">
                  Shopify Starter &rarr;
                </Link>
                <Link href="/packages/shopify-growth" className="btn-secondary text-sm">
                  Shopify Growth &rarr;
                </Link>
                <Link href="/platform-check" className="btn-ghost text-sm">
                  Check Compatibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ROI CALCULATOR                                                     */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <p className="section-label mb-3">Calculate Your Return</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)]">
              ROI Projections by Tier
            </h2>
          </div>
          <ROICalculator
            formAction="/packages"
            tier={searchParams.tier}
            leads={searchParams.leads}
            rate={searchParams.rate}
            deal={searchParams.deal}
          />
        </div>
      </section>

      {/* ================================================================== */}
      {/* OBJECTION-HANDLING FAQ — Sandler methodology                       */}
      {/* ================================================================== */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)]">
              Before You Decide
            </h2>
          </div>

          <div className="space-y-4">
            {sandlerFAQs.map((faq, i) => (
              <details
                key={i}
                className="card-glass group"
              >
                <summary className="p-5 cursor-pointer flex items-start gap-3 list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[var(--color-accent)] font-mono text-sm font-bold mt-0.5 shrink-0">
                    Q{i + 1}
                  </span>
                  <span className="font-display font-semibold text-[var(--color-text)] text-sm lg:text-base">
                    {faq.question}
                  </span>
                  <span className="ml-auto text-[var(--color-muted-2)] text-lg leading-none shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 pl-12">
                  <p className="speakable-answer text-sm text-[var(--color-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PROTOCOL BADGES — Gold Standard visual                             */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container text-center">
          <p className="section-label mb-3">Gold Standard Compliance</p>
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-[var(--color-text)] mb-6">
            Three Protocols. One Standard.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/protocols/ucp" className="badge-ucp badge text-sm px-4 py-2">
              UCP — Universal Commerce Protocol
            </Link>
            <Link href="/protocols/acp" className="badge-acp badge text-sm px-4 py-2">
              ACP — Agentic Commerce Protocol
            </Link>
            <Link href="/protocols/ap2" className="badge-ap2 badge text-sm px-4 py-2">
              AP2 — Agent Payments Protocol
            </Link>
          </div>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto text-sm">
            Max and Elite packages achieve full Gold Standard compliance — all three protocols
            implemented, verified, and maintained. Starter includes UCP. Pro adds partial ACP.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}
      <section className="section-lg bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-base)]">
        <div className="container text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-text)] mb-4">
            The AI Commerce Window Is Open.{' '}
            <span className="text-[var(--color-accent)]">It Won&apos;t Stay Open.</span>
          </h2>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto mb-8">
            AI agents build trust scores over time. The first businesses with Gold Standard compliance
            in each vertical become the default recommendation. Early movers capture disproportionate share.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary text-lg px-10 py-4">
              Get Your Custom Proposal &rarr;
            </Link>
            <Link href="/acra" className="btn-secondary text-lg px-10 py-4">
              Free AI Readiness Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] p-3">
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
