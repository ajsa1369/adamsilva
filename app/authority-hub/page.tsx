import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Shield, FileText, BarChart2, Bot, Award } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Authority Hub — AI & Agentic Commerce Resource Center',
  description:
    'The Adam Silva Consulting Authority Hub: curated guides, frameworks, and deep-dives on AI Engine Optimization, topical authority architecture, technical excellence, content operations, and marketing automation.',
  alternates: {
    canonical: `${SITE_URL}/authority-hub`,
  },
  openGraph: {
    title: 'Authority Hub — AI & Agentic Commerce Resource Center',
    description:
      'Curated expertise on AEO, GEO, topical authority, technical frameworks, content operations, and marketing automation for the agentic commerce era.',
    url: `${SITE_URL}/authority-hub`,
  },
}

const HUB_CATEGORIES = [
  {
    slug: 'guides',
    label: 'Guides',
    icon: BookOpen,
    accent: '#0ea5e9',
    tagline: 'Step-by-step implementation guides',
    description:
      'Practical, actionable guides for implementing agentic commerce protocols, AEO strategies, and AI-ready infrastructure. Built for teams who need to move fast without sacrificing correctness.',
    topics: [
      '16-Week Agentic Readiness Roadmap',
      'UCP Manifest Implementation Guide',
      'ACP Checkout Integration Walkthrough',
      'AP2 Mandate Setup Guide',
    ],
    href: '/authority-hub/guides',
  },
  {
    slug: 'ai-engine-optimization-mastery',
    label: 'AI Engine Optimization Mastery',
    icon: Zap,
    accent: '#a855f7',
    tagline: 'AEO & GEO: rank in AI answers',
    description:
      'Master Answer Engine Optimization and Generative Engine Optimization — the disciplines that determine whether AI systems cite your brand or your competitors. Covers structured data, speakable schema, and answer-first content.',
    topics: [
      'AEO vs. GEO: the definitive breakdown',
      'Speakable schema implementation',
      'Featured snippet optimization',
      'Zero-click search strategies',
    ],
    href: '/authority-hub/ai-engine-optimization-mastery',
  },
  {
    slug: 'topical-authority-architecture',
    label: 'Topical Authority Architecture',
    icon: Award,
    accent: '#f59e0b',
    tagline: 'Own entire topic graphs',
    description:
      'Build hub-and-spoke content architectures that signal to AI systems you are the definitive source on agentic commerce. Covers DefinedTermSet schema, internal link strategy, and authority flywheel mechanics.',
    topics: [
      'Hub-and-spoke content architecture',
      'DefinedTermSet schema for AI citation',
      'Building topical authority from scratch',
      'The authority flywheel explained',
    ],
    href: '/authority-hub/topical-authority-architecture',
  },
  {
    slug: 'technical-framework-excellence',
    label: 'Technical Framework Excellence',
    icon: Shield,
    accent: '#10b981',
    tagline: 'SSR, schema, and AI-readable code',
    description:
      'Technical best practices for AI-discoverable websites — SSR architecture, JSON-LD schema implementation, token efficiency, hydration optimization, and .well-known endpoint configuration.',
    topics: [
      'SSR vs. CSR: the hydration tax',
      'Token efficiency for AI crawlers',
      'JSON-LD schema best practices',
      '.well-known endpoint configuration',
    ],
    href: '/authority-hub/technical-framework-excellence',
  },
  {
    slug: 'ai-powered-content-operations',
    label: 'AI-Powered Content Operations',
    icon: FileText,
    accent: '#ec4899',
    tagline: 'Scale quality content with AI',
    description:
      'Frameworks for building AI-assisted content workflows that maintain E-E-A-T signals while dramatically increasing output. Covers editorial pipelines, automated schema injection, and AI content quality standards.',
    topics: [
      'AI content operations frameworks',
      'E-E-A-T in the generative AI era',
      'Automated schema injection pipelines',
      'Blog-to-video automation with Remotion',
    ],
    href: '/authority-hub/ai-powered-content-operations',
  },
  {
    slug: 'marketing-automation-intelligence',
    label: 'Marketing Automation Intelligence',
    icon: BarChart2,
    accent: '#f97316',
    tagline: 'Automate campaigns, qualify leads',
    description:
      'AI-driven marketing automation strategies — from intent-based lead scoring and enrichment pipelines to omnichannel nurturing sequences and AI-native advertising that adapts in real time.',
    topics: [
      'Intent-based lead scoring with AI',
      'Omnichannel nurturing automation',
      'AI advertising campaign optimization',
      'Lead enrichment pipeline setup',
    ],
    href: '/authority-hub/marketing-automation-intelligence',
  },
  {
    slug: 'csr-and-trust-engineering',
    label: 'CSR & Trust Engineering',
    icon: Bot,
    accent: '#06b6d4',
    tagline: 'AI agents that handle customer success',
    description:
      'Design and deploy AI agents for customer success, support, and trust verification — including AP2 mandate flows, voice agents, and 24/7 automated customer resolution that escalates intelligently.',
    topics: [
      'AP2 trust layer architecture',
      'Off-hours voice agent deployment',
      'Customer success automation',
      'AI agent escalation design',
    ],
    href: '/authority-hub/csr-and-trust-engineering',
  },
]

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Authority Hub', url: '/authority-hub' },
])

const collectionSchema = {
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/authority-hub`,
  name: 'Adam Silva Consulting Authority Hub',
  description:
    'The definitive resource center for agentic commerce, AI Engine Optimization, topical authority architecture, and marketing automation intelligence.',
  url: `${SITE_URL}/authority-hub`,
  publisher: { '@id': ORG_ID },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Authority Hub Categories',
    numberOfItems: HUB_CATEGORIES.length,
    itemListElement: HUB_CATEGORIES.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cat.label,
      url: `${SITE_URL}${cat.href}`,
      description: cat.tagline,
    })),
  },
}

export default function AuthorityHubPage() {
  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section
        className="pt-32 pb-16"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container max-w-4xl">
          <div className="enterprise-eyebrow">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
            >
              Authority Hub
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
            }}
          >
            The Definitive Resource Center<br />for Agentic Commerce
          </h1>
          <p
            className="speakable-answer"
            style={{
              color: 'var(--color-muted)',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
              maxWidth: '600px',
            }}
          >
            Curated guides, frameworks, and deep-dives on every discipline required to dominate
            AI-mediated commerce — from protocol implementation to topical authority architecture.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HUB_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="group relative rounded-lg overflow-hidden block transition-all duration-200"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderTop: `3px solid ${cat.accent}`,
                    padding: '1.75rem',
                  }}
                >
                  {/* Icon + label row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${cat.accent}15`,
                        border: `1px solid ${cat.accent}30`,
                      }}
                    >
                      <Icon size={16} style={{ color: cat.accent }} />
                    </div>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: 'var(--color-muted-2)' }}
                    />
                  </div>

                  {/* Tagline */}
                  <div
                    className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                    style={{ fontFamily: 'var(--font-mono)', color: cat.accent }}
                  >
                    {cat.tagline}
                  </div>

                  {/* Title */}
                  <h2
                    className="mb-3 leading-snug"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.0625rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    {cat.label}
                  </h2>

                  {/* Description */}
                  <p
                    className="mb-4 leading-relaxed text-sm"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                  >
                    {cat.description}
                  </p>

                  {/* Topics */}
                  <ul className="space-y-1.5">
                    {cat.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
                      >
                        <span
                          className="inline-block w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: cat.accent }}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA bar */}
          <div
            className="mt-10 rounded-lg px-6 py-5 flex flex-wrap items-center justify-between gap-4"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div>
              <p
                className="font-bold mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '1rem' }}
              >
                Ready to implement what you learn?
              </p>
              <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
                Every guide in the Authority Hub is backed by a corresponding service Adam Silva Consulting delivers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/services" className="btn-secondary text-sm">
                View Services
                <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="btn-primary text-sm">
                <Zap size={13} className="opacity-80" />
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
