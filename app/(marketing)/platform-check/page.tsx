import type { Metadata } from 'next'
import { JsonLd } from '@/app/components/seo/JsonLd'
import {
  SITE_URL,
  ORG_ID,
  buildBreadcrumbSchema,
  organizationSchema,
} from '@/lib/schemas/organization'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { PlatformCheckTool } from '@/components/PlatformCheckTool'

export const metadata: Metadata = {
  title:
    'Platform Compliance Checker — Is Your Site AI-Ready? | Adam Silva Consulting',
  description:
    'Check whether your current platform (Shopify, WordPress, Webflow, Next.js) can achieve full UCP, ACP, and AP2 agentic commerce protocol compliance — and what your ceiling is.',
  alternates: { canonical: `${SITE_URL}/platform-check` },
  openGraph: {
    title: 'Platform Compliance Checker — ASC',
    description:
      'Find out if your platform can achieve Gold Standard agentic commerce compliance.',
    url: `${SITE_URL}/platform-check`,
    type: 'website',
  },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Platform Check', url: `${SITE_URL}/platform-check` },
    ]),
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/platform-check#tool`,
      name: 'ASC Platform Compliance Checker',
      description:
        'Free tool to determine whether your website platform can achieve full UCP, ACP, and AP2 agentic commerce protocol compliance.',
      url: `${SITE_URL}/platform-check`,
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        seller: { '@id': ORG_ID },
      },
      creator: { '@id': ORG_ID },
      featureList: [
        'Platform compliance matrix for 8 platform types',
        'UCP / ACP / AP2 ceiling analysis',
        'Recommended package matching',
        'Legacy platform penalty breakdown',
      ],
    },
    buildFAQSchema([
      {
        question:
          'Which platforms work with ASC agentic commerce packages?',
        answer:
          'Next.js, custom SPAs, and Webflow headless all support full or partial compliance. Shopify, Wix, Squarespace, and WordPress (heavy theme) face architectural constraints that limit UCP, ACP, and AP2 compliance. ASC offers dedicated Shopify Starter and Shopify Growth packages for merchants who want AI capabilities without migrating.',
      },
      {
        question:
          "Why can't Shopify achieve full protocol compliance?",
        answer:
          "Shopify's closed commerce architecture creates five blockers: (1) 2MB+ JavaScript hydration tax reduces AI agent crawl frequency by 40%, (2) Shopify's root-level restriction prevents UCP capability discovery, (3) proprietary checkout cannot implement ACP agent payments, (4) no custom security headers means 0% AP2 cryptographic trust score, and (5) token inefficiency causes AI systems to deprioritize the site.",
      },
      {
        question: 'What is Gold Standard compliance?',
        answer:
          'Gold Standard compliance means your site has full UCP (AI agent discovery), ACP (agent checkout), and AP2 (cryptographic payment mandates) protocol implementation. Only Next.js / custom headless architectures or a fresh build from scratch can achieve Gold Standard. Gold Standard unlocks the full ASC Gold package and positions your business to transact directly with AI shopping agents.',
      },
    ]),
  ],
}

export default function PlatformCheckPage({
  searchParams,
}: {
  searchParams: { platform?: string }
}) {
  return (
    <>
      <JsonLd data={pageSchema} />
      {/* Hero section — server-rendered */}
      <section className="section">
        <div className="container text-center">
          <h1 className="font-display font-bold text-4xl lg:text-5xl text-[var(--color-text)] mb-4">
            Platform Compliance Checker
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-2">
            Select your current website platform to see your agentic commerce
            compliance ceiling — what&apos;s achievable, what&apos;s blocked,
            and why.
          </p>
          <p className="text-sm text-[var(--color-muted)] mb-8">
            Checking a live domain instead?{' '}
            <a
              href="/tools/protocol-checker"
              className="text-[var(--color-accent)] underline"
            >
              Use the Protocol Endpoint Checker
            </a>
          </p>
        </div>
      </section>
      {/* Platform checker — server component, reads searchParams */}
      <PlatformCheckTool selectedPlatform={searchParams.platform} />
    </>
  )
}
