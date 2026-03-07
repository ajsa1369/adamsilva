import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from './components/sections/HeroSection'
import { SocialProofStrip } from './components/sections/SocialProofStrip'
import { ThreeProtocolStack } from './components/sections/ThreeProtocolStack'
import { ProtocolFlow } from './components/sections/ProtocolFlow'
import { ExplainerVideoSection } from './components/sections/ExplainerVideoSection'
import { ServicesPreview } from './components/sections/ServicesPreview'
import { InsightsPreview } from './components/sections/InsightsPreview'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { AuthorityFlywheel } from './components/interactive/AuthorityFlywheel'
import { ProtocolExplorer } from './components/interactive/ProtocolExplorer'
import { JsonLd } from './components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildHowToSchema, buildServiceSchema } from '@/lib/schemas/service'
import { buildImageObjectSchema } from '@/lib/schemas/image'
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildReviewSchema, buildAggregateRatingSchema } from '@/lib/schemas/review'
import { SERVICES } from '@/lib/data/services'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export const metadata: Metadata = {
  title: 'Adam Silva Consulting — Global Infrastructure for Agentic Commerce',
  description:
    'The definitive authority for UCP, ACP, and AP2 agentic commerce protocol implementation. Build AI-ready infrastructure that enables agents to discover, negotiate, and transact with your business.',
  alternates: {
    canonical: SITE_URL,
  },
}

const homeFAQs = [
  {
    question: 'What is agentic commerce?',
    answer: 'Agentic commerce is when AI agents — like ChatGPT, Perplexity, or Google AI Mode — discover, negotiate, and complete purchases on behalf of human users without requiring the user to visit a website. Three protocols govern this: UCP (discovery), ACP (execution), and AP2 (trust).',
  },
  {
    question: 'What is UCP (Universal Commerce Protocol)?',
    answer: 'UCP (Universal Commerce Protocol) is Google\'s open standard for AI agent commerce discovery. Published at /.well-known/ucp/manifest.json, UCP manifests tell every AI shopping agent exactly what your business sells, how to transact, and what transport protocols you support.',
  },
  {
    question: 'What is ACP (Agentic Commerce Protocol)?',
    answer: 'ACP (Agentic Commerce Protocol) is the OpenAI-led standard for AI agent checkout execution. It defines how agents ingest product feeds, initiate purchases via Stripe Payment Tokens (SPT), and confirm orders — enabling ChatGPT Instant Checkout.',
  },
  {
    question: 'What is AP2 (Agent Payments Protocol)?',
    answer: 'AP2 (Agent Payments Protocol) is Google\'s cryptographic mandate framework for agentic transactions. Intent and Cart mandates — signed with Verifiable Credentials — give AI agents the legal authority to transact and create the audit trail enterprise procurement requires.',
  },
  {
    question: 'Why is my business at risk from AI search?',
    answer: 'Gartner predicts AI will reduce traditional search engine traffic by 50% by 2028. Businesses that haven\'t implemented UCP/ACP/AP2 protocols, proper JSON-LD schema, and AEO/GEO optimization will simply not appear in AI-mediated commerce. Adam Silva Consulting closes this gap in 16 weeks.',
  },
  {
    question: 'What does Adam Silva Consulting do?',
    answer: 'Adam Silva Consulting implements the complete UCP, ACP, and AP2 agentic commerce protocol stack for enterprises. We also provide AEO/GEO optimization, authority building, AI-ready blog content creation, and 24/7 AI sales agents. We are the definitive authority for agentic commerce implementation.',
  },
]

const roadmapHowTo = buildHowToSchema(
  '16 Weeks to Agentic Readiness: The Implementation Roadmap',
  'A complete 16-week implementation roadmap for UCP, ACP, and AP2 protocol stack deployment — the exact methodology Adam Silva Consulting uses with enterprise clients.',
  [
    { name: 'Week 1-2: ACRA', text: 'Complete audit of current agentic commerce posture — structured data coverage, protocol compliance, token efficiency, authority signals.' },
    { name: 'Week 3-6: Foundation Layer', text: 'Deploy JSON-LD schema across all pages, implement UCP manifest, configure AP2 mandate infrastructure, and optimize for token efficiency.' },
    { name: 'Week 7-10: Execution Layer', text: 'Implement ACP checkout integration with Stripe SPT, configure product feeds, test agent checkout flows, and deploy Verifiable Credentials.' },
    { name: 'Week 11-14: Authority Layer', text: 'Launch authority flywheel — 10 AEO-optimized articles, hub pages, topical authority structure, and AI citation tracking.' },
    { name: 'Week 15-16: Verification & Launch', text: 'Complete QA across all protocols and schema types, verify AI agent discovery, and launch the fully agentic-ready digital presence.' },
  ],
  'P112D'
)

const videoSchema = {
  '@type': 'VideoObject',
  name: 'Agentic Commerce Explained — UCP, ACP, AP2',
  description: 'A narrated explainer video covering the three protocols that power agentic commerce: UCP (discovery), ACP (checkout), and AP2 (trust).',
  thumbnailUrl: `${SITE_URL}/images/hero/business-hero.jpg`,
  contentUrl: `${SITE_URL}/videos/homepage-explainer.mp4`,
  uploadDate: '2026-03-04T00:00:00-05:00',
  duration: 'PT75S',
  publisher: { '@type': 'Organization', name: 'Adam Silva Consulting' },
  inLanguage: 'en-US',
}

const aggregateRating = buildAggregateRatingSchema(TESTIMONIALS)
const reviewSchemas = TESTIMONIALS.map(buildReviewSchema)

const homeSchemas = [
  buildFAQSchema(homeFAQs),
  roadmapHowTo,
  buildBreadcrumbSchema([{ name: 'Home', url: '/' }]),
  buildImageObjectSchema({
    filename: 'adam-silva-consulting-agentic-commerce-hero.png',
    name: 'Adam Silva Consulting — Global Infrastructure for Agentic Commerce',
    description: 'Hero image for Adam Silva Consulting, the definitive authority for UCP, ACP, and AP2 agentic commerce protocol implementation.',
    width: 1920,
    height: 1080,
    representativeOfPage: true,
  }),
  videoSchema,
  ...(aggregateRating ? [aggregateRating] : []),
  ...reviewSchemas,
  ...SERVICES.slice(0, 4).map(s => buildServiceSchema({
    id: s.id,
    name: s.name,
    description: s.description,
    price: s.price === 'Custom' ? undefined : s.price,
    deliverables: s.deliverables,
    timeline: s.timeline,
    audience: s.audience,
  })),
]

export default async function HomePage() {
  return (
    <>
      <JsonLd data={homeSchemas} />

      <HeroSection />
      <SocialProofStrip />
      <ThreeProtocolStack />
      <ProtocolFlow />
      <ExplainerVideoSection />

      {/* Protocol Explorer */}
      <section className="section" aria-labelledby="protocol-explorer-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Live Protocol Viewer</span>
            <h2 id="protocol-explorer-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              Explore the Protocol Manifests
            </h2>
            <p className="text-[var(--color-muted)]">
              See the actual JSON served to AI agents — and how each protocol works in practice.
            </p>
          </div>
          <ProtocolExplorer />
        </div>
      </section>

      <ServicesPreview />

      {/* Authority Flywheel */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="flywheel-heading">
        <div className="container">
          <div className="mb-12">
            <div className="enterprise-eyebrow">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                The Revenue Flywheel
              </span>
            </div>
            <h2
              id="flywheel-heading"
              className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              6 Pillars. One Compounding Revenue Engine.
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '580px', fontSize: '1rem', lineHeight: 1.7 }}>
              Every service feeds the next — protocols power visibility, visibility builds authority,
              authority drives leads, and agents close them. Click any pillar to see how it compounds.
            </p>
          </div>
          <AuthorityFlywheel />
        </div>
      </section>

      <TestimonialsSection />

      {/* 16-Week Roadmap */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="roadmap-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Implementation</span>
            <h2 id="roadmap-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              16 Weeks to Agentic Readiness
            </h2>
            <p className="text-[var(--color-muted)]">
              Our proven implementation methodology — from ACRA to full protocol stack deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { phase: 'Phase 1', weeks: 'Wk 1-2', title: 'ACRA', description: 'Full audit of current posture', color: '#3b82f6' },
              { phase: 'Phase 2', weeks: 'Wk 3-6', title: 'Foundation Layer', description: 'JSON-LD, UCP manifest, AP2 infrastructure', color: '#8b5cf6' },
              { phase: 'Phase 3', weeks: 'Wk 7-10', title: 'Execution Layer', description: 'ACP + Stripe SPT + agent checkout', color: '#10b981' },
              { phase: 'Phase 4', weeks: 'Wk 11-14', title: 'Authority Layer', description: 'Flywheel + 10 articles + hub pages', color: '#f59e0b' },
              { phase: 'Phase 5', weeks: 'Wk 15-16', title: 'Launch', description: 'Verify, QA, and go live', color: '#ef4444' },
            ].map((item) => (
              <div key={item.phase} className="card p-5">
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: item.color }}>
                  {item.weeks}
                </div>
                <div className="text-sm font-bold text-[var(--color-text)] mb-2">{item.title}</div>
                <div className="text-xs text-[var(--color-muted-2)]">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/insights/16-weeks-agentic-readiness-roadmap" className="btn-primary">
              Read the Full Roadmap
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 id="faq-heading" className="text-3xl font-bold text-[var(--color-text)]">
              Common Questions About Agentic Commerce
            </h2>
          </div>
          <div className="space-y-4">
            {homeFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <InsightsPreview />

      {/* Final CTA with background image */}
      <section className="section relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero/services-hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(248,250,255,0.92)' }}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              Ready to Build Agentic Commerce Infrastructure?
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Start with a free Agentic Commerce Readiness Assessment (ACRA). We&apos;ll show you exactly where you stand — and what needs to change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Adam
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
