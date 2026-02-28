import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { adamSilvaSchema } from '@/lib/schemas/person'
import { buildFAQSchema } from '@/lib/schemas/faq'
import {
  organizationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'About Adam Silva Consulting — UCP, ACP, AP2 Experts',
  description:
    'Adam Silva is the definitive authority on UCP, ACP, and AP2 agentic commerce protocol implementation. Learn about our mission, expertise, and approach to building AI-ready enterprise infrastructure.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

const aboutFAQs = [
  {
    question: 'Who is Adam Silva?',
    answer:
      'Adam Silva is the founder and principal consultant at Adam Silva Consulting. He is a leading authority on agentic commerce protocols — UCP, ACP, and AP2 — having led over 50 protocol implementations across e-commerce, retail, and enterprise clients. He specializes in helping businesses build the AI-ready infrastructure required for agentic transactions, answer engine optimization, and generative engine optimization.',
  },
  {
    question: 'What does Adam Silva Consulting specialize in?',
    answer:
      'Adam Silva Consulting specializes in the full UCP/ACP/AP2 agentic commerce protocol stack. This includes AI readiness audits, UCP manifest implementation for AI agent discovery, ACP checkout integration with Stripe Payment Tokens, AP2 cryptographic mandate infrastructure, answer engine optimization (AEO), and generative engine optimization (GEO) for AI-native search.',
  },
  {
    question: 'Why are UCP, ACP, and AP2 essential for enterprises?',
    answer:
      'AI agents are rapidly becoming the primary interface between consumers and commerce. UCP enables AI agents to discover what you sell. ACP enables agents to execute purchases directly. AP2 provides the cryptographic trust layer that makes agentic transactions legally defensible. Enterprises that lack these protocols are invisible to the growing population of AI-powered shoppers and procurement agents.',
  },
]

const aboutPageSchema = {
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'About Adam Silva Consulting — UCP, ACP, AP2 Experts',
  description:
    'Adam Silva is the definitive authority on UCP, ACP, and AP2 agentic commerce protocol implementation — helping enterprises build AI-ready infrastructure.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  mainEntity: { '@id': `${SITE_URL}/#adam-silva` },
}

const pillars = [
  {
    protocol: 'UCP',
    label: 'Universal Commerce Protocol',
    color: '#3b82f6',
    badgeClass: 'badge-ucp',
    govBy: 'Google',
    description:
      'UCP is Google\'s open standard for AI agent commerce discovery, published at /.well-known/ucp/manifest.json. Every business needs a UCP manifest to be visible to AI shopping agents, voice assistants, and automated procurement systems.',
  },
  {
    protocol: 'ACP',
    label: 'Agentic Commerce Protocol',
    color: '#8b5cf6',
    badgeClass: 'badge-acp',
    govBy: 'OpenAI + Stripe',
    description:
      'ACP is the OpenAI-led standard for AI agent checkout execution, enabling ChatGPT Instant Checkout and delegated purchasing. Without ACP integration, AI agents cannot complete purchases in your store — the transaction stalls and the customer is lost.',
  },
  {
    protocol: 'AP2',
    label: 'Agent Payments Protocol',
    color: '#10b981',
    badgeClass: 'badge-ap2',
    govBy: 'Google',
    description:
      'AP2 is Google\'s cryptographic mandate framework that makes agentic transactions legally defensible through Verifiable Credentials. Enterprise procurement, compliance, and non-repudiation requirements make AP2 the non-negotiable trust layer in any serious agentic commerce deployment.',
  },
]

const principles = [
  {
    title: 'Protocol-First',
    description:
      'We implement the technical protocol layer before anything else. Correct UCP manifests, ACP endpoints, and AP2 mandates are the foundation — everything else is secondary.',
  },
  {
    title: 'Schema-Native',
    description:
      'Every page, product, and service is machine-readable from day one. Comprehensive JSON-LD schema is not an afterthought — it\'s how AI agents understand your business.',
  },
  {
    title: 'Authority-Focused',
    description:
      'Protocol compliance opens the door. Topical authority and answer-optimized content ensure AI agents cite you first, consistently, at scale.',
  },
  {
    title: 'Results-Driven',
    description:
      'We measure agentic readiness scores, AI citation frequency, and protocol compliance rates — not vanity metrics. Every engagement has clear, measurable outcomes.',
  },
]

const pageSchemas = [
  aboutPageSchema,
  adamSilvaSchema,
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]),
  buildFAQSchema(aboutFAQs),
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="about-hero-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">About Adam Silva Consulting</span>
            <h1
              id="about-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight"
            >
              Meet Adam Silva &mdash; Global Infrastructure for Agentic Commerce
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              The definitive authority on UCP, ACP, and AP2 protocol implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="mission-heading">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Our Mission</span>
          <h2
            id="mission-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-6"
          >
            Our Mission
          </h2>
          <p className="text-lg text-[var(--color-muted)] leading-relaxed speakable-answer">
            As AI agents become the primary interface between consumers and commerce, businesses
            that lack proper agentic infrastructure become invisible. Our mission is to ensure
            no enterprise is left behind in the agentic commerce transition.
          </p>
        </div>
      </section>

      {/* Adam Silva Bio */}
      <section className="section" aria-labelledby="bio-heading">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="badge mb-4">Founder &amp; Principal Consultant</span>
              <h2
                id="bio-heading"
                className="text-3xl font-bold text-[var(--color-text)] mb-6"
              >
                Adam Silva
              </h2>
              <div className="prose-asc space-y-4">
                <p>
                  Adam Silva is the CEO and Founder of Adam Silva Consulting, and one of the
                  world&apos;s foremost authorities on agentic commerce protocol implementation.
                  Over the past three years, he has led more than 50 UCP, ACP, and AP2
                  implementations across e-commerce, retail, and enterprise organizations,
                  helping businesses become AI-agent-ready before their competitors.
                </p>
                <p>
                  His technical expertise spans the full agentic commerce stack: UCP manifest
                  architecture, ACP checkout integration with Stripe Payment Tokens (SPT), AP2
                  cryptographic mandate infrastructure, JSON-LD schema strategy, and the
                  emerging AI-native transport protocols — REST, MCP (Model Context Protocol),
                  and A2A (Agent-to-Agent).
                </p>
                <p>
                  Adam specializes in answer engine optimization (AEO) and generative engine
                  optimization (GEO) — the disciplines that ensure enterprises are cited
                  correctly and consistently by AI systems including ChatGPT, Perplexity,
                  Google AI Mode, and emerging agentic shopping agents. He developed the
                  Authority Flywheel methodology, a four-stage compounding cycle that builds
                  permanent AI citation dominance.
                </p>
                <p>
                  Before founding Adam Silva Consulting, Adam spent a decade at the intersection
                  of enterprise e-commerce and emerging technology. He recognized agentic
                  commerce as the defining infrastructure shift of the decade and built the
                  firm to be the definitive implementation partner for organizations navigating
                  this transition.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4 text-sm uppercase tracking-wider">
                  Core Expertise
                </h3>
                <ul className="space-y-3">
                  {[
                    'Universal Commerce Protocol (UCP) Implementation',
                    'Agentic Commerce Protocol (ACP) Integration',
                    'Agent Payments Protocol (AP2) Trust Layer',
                    'Answer Engine Optimization (AEO)',
                    'Generative Engine Optimization (GEO)',
                    'JSON-LD Schema Architecture',
                    'AI-Mediated Transaction Infrastructure',
                    'Enterprise AI Transformation Strategy',
                  ].map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--color-accent)' }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4 text-sm uppercase tracking-wider">
                  Track Record
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: '50+', label: 'Protocol Implementations' },
                    { stat: '16 wks', label: 'Average Time to Full Stack' },
                    { stat: '3', label: 'Protocols Mastered' },
                    { stat: '100%', label: 'Enterprise-Grade Delivery' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {item.stat}
                      </div>
                      <div className="text-xs text-[var(--color-muted-2)]">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">The Protocol Stack</span>
            <h2
              id="pillars-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Three Protocols. One Complete Stack.
            </h2>
            <p className="text-[var(--color-muted)]">
              UCP, ACP, and AP2 are not optional enhancements — they are the infrastructure
              layer that determines whether AI agents can find, transact with, and trust your
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.protocol} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`badge ${pillar.badgeClass}`}>{pillar.protocol}</span>
                  <span className="text-xs text-[var(--color-muted-2)]">Gov by {pillar.govBy}</span>
                </div>
                <h3
                  className="text-lg font-bold text-[var(--color-text)] mb-3"
                >
                  {pillar.label}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">How We Work</span>
            <h2
              id="approach-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Our Approach
            </h2>
            <p className="text-[var(--color-muted)]">
              Four principles guide every engagement we take on — from the initial AI
              Readiness Check through full protocol stack deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, i) => (
              <div key={principle.title} className="card p-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-4"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{principle.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="about-faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="about-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {aboutFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="about-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="about-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              Ready to Build Agentic Commerce Infrastructure?
            </h2>
            <p className="text-[var(--color-muted)] mb-8">
              Start with a $100 AI Readiness Check. We&apos;ll assess your current protocol
              compliance, structured data coverage, and agentic readiness — then map the
              fastest path to full implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/ai-readiness-check" className="btn-primary">
                Start with AI Readiness Check &mdash; $100
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
