import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from './components/sections/HeroSection'
import { ThreeProtocolStack } from './components/sections/ThreeProtocolStack'
import { ServicesPreview } from './components/sections/ServicesPreview'
import { InsightsPreview } from './components/sections/InsightsPreview'
import { AuthorityFlywheel } from './components/interactive/AuthorityFlywheel'
import { ProtocolExplorer } from './components/interactive/ProtocolExplorer'
import { JsonLd } from './components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildHowToSchema, buildServiceSchema } from '@/lib/schemas/service'
import { buildImageObjectSchema } from '@/lib/schemas/image'
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schemas/organization'
import { SERVICES } from '@/lib/data/services'

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
    { name: 'Week 1-2: AI Readiness Check', text: 'Complete audit of current agentic commerce posture — structured data coverage, protocol compliance, token efficiency, authority signals.' },
    { name: 'Week 3-6: Foundation Layer', text: 'Deploy JSON-LD schema across all pages, implement UCP manifest, configure AP2 mandate infrastructure, and optimize for token efficiency.' },
    { name: 'Week 7-10: Execution Layer', text: 'Implement ACP checkout integration with Stripe SPT, configure product feeds, test agent checkout flows, and deploy Verifiable Credentials.' },
    { name: 'Week 11-14: Authority Layer', text: 'Launch authority flywheel — 10 AEO-optimized articles, hub pages, topical authority structure, and AI citation tracking.' },
    { name: 'Week 15-16: Verification & Launch', text: 'Complete QA across all protocols and schema types, verify AI agent discovery, and launch the fully agentic-ready digital presence.' },
  ],
  'P112D'
)

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
      <ThreeProtocolStack />

      {/* AI Commerce Demo Section */}
      <section
        className="section"
        aria-labelledby="commerce-demo-heading"
        style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <div className="container">
          <div className="mb-10">
            <div className="enterprise-eyebrow">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                How It Works
              </span>
            </div>
            <h2
              id="commerce-demo-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.625rem, 3vw, 2.25rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '0.75rem',
              }}
            >
              From AI Discovery to Completed Purchase
            </h2>
            <p style={{ color: 'var(--color-muted)', maxWidth: '520px', fontSize: '0.9375rem' }}>
              When an AI agent shops for your customer, this is the exact sequence our protocol stack enables.
            </p>
          </div>

          {/* Step-by-step flow */}
          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connecting line (desktop only) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, #0ea5e9, #a855f7, #10b981, #f59e0b)' }}
            />

            {[
              {
                step: '01',
                title: 'AI Agent Searches',
                body: 'ChatGPT, Perplexity, or Google AI Mode gets a shopping intent from your customer.',
                color: '#0ea5e9',
                icon: '🤖',
              },
              {
                step: '02',
                title: 'UCP Discovery',
                body: 'The agent reads your /.well-known/ucp manifest — your full catalog, pricing, and capabilities.',
                color: '#a855f7',
                icon: '📡',
              },
              {
                step: '03',
                title: 'ACP Checkout',
                body: 'The agent initiates purchase via Stripe Payment Token. No human login. No cart abandonment.',
                color: '#10b981',
                icon: '⚡',
              },
              {
                step: '04',
                title: 'AP2 Verified',
                body: 'Cryptographic mandate confirms the transaction. Audit trail created. Revenue secured.',
                color: '#f59e0b',
                icon: '✓',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center px-4">
                {/* Step circle */}
                <div
                  className="w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center text-xl font-bold mb-4 relative z-10"
                  style={{
                    background: `rgba(${item.color === '#0ea5e9' ? '14,165,233' : item.color === '#a855f7' ? '168,85,247' : item.color === '#10b981' ? '16,185,129' : '245,158,11'},0.12)`,
                    border: `2px solid ${item.color}`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                {/* Step number */}
                <div
                  className="mb-1.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: item.color,
                  }}
                >
                  STEP {item.step}
                </div>

                {/* Title */}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                  }}
                >
                  {item.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Result bar */}
          <div
            className="mt-10 rounded-lg px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{
              background: 'rgba(14,165,233,0.05)',
              border: '1px solid rgba(14,165,233,0.15)',
            }}
          >
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider mr-3"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                Result:
              </span>
              <span style={{ fontSize: '0.9375rem', color: 'var(--color-text)', fontWeight: 600 }}>
                Your business transacts with AI agents 24/7 — no website visit, no human required.
              </span>
            </div>
            <Link href="/protocols" className="btn-secondary text-sm flex-shrink-0">
              See the Full Protocol Stack
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Explorer section */}
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

      {/* Authority Flywheel section */}
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

      {/* 16-Week Roadmap */}
      <section className="section" aria-labelledby="roadmap-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">Implementation</span>
            <h2 id="roadmap-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              16 Weeks to Agentic Readiness
            </h2>
            <p className="text-[var(--color-muted)]">
              Our proven implementation methodology — from AI readiness check to full protocol stack deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { phase: 'Phase 1', weeks: 'Wk 1-2', title: 'AI Readiness Check', description: 'Full audit of current posture', color: '#3b82f6' },
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

      {/* FAQ Section */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="faq-heading">
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

      {/* Final CTA */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              Ready to Build Agentic Commerce Infrastructure?
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Start with a $100 AI Readiness Check. We&apos;ll show you exactly where you stand — and what needs to change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/ai-readiness-check" className="btn-primary">
                Start with AI Readiness Check — $100
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
