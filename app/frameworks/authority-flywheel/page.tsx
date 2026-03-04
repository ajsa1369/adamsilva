import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, RotateCcw, BookOpen, BarChart3, Target, Zap } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildPageSchema, SITE_URL } from '@/lib/schemas/organization'
import { buildFAQSchema, buildWebPageSchema } from '@/lib/schemas/faq'
import { adamSilvaSchema } from '@/lib/schemas/person'
import { RelatedContent } from '@/app/components/sections/RelatedContent'

export const metadata: Metadata = {
  title: 'Authority Flywheel Methodology — AI Citation Dominance Framework',
  description:
    'The Authority Flywheel is Adam Silva\'s proprietary framework for achieving AI citation dominance. Publish primary research → earn AI citations → build schema authority → attract more citations. The self-reinforcing cycle that makes ChatGPT and Perplexity cite your brand.',
  alternates: {
    canonical: `${SITE_URL}/frameworks/authority-flywheel`,
  },
  openGraph: {
    title: 'Authority Flywheel — AI Citation Dominance Framework | Adam Silva Consulting',
    description:
      'The proprietary methodology for making AI models cite your brand as the authoritative source in your market.',
    url: `${SITE_URL}/frameworks/authority-flywheel`,
    type: 'article',
  },
}

const flywheel_faqs = [
  {
    question: 'What is the Authority Flywheel?',
    answer:
      'The Authority Flywheel is a proprietary methodology developed by Adam Silva for achieving AI citation dominance. It is a self-reinforcing cycle: publish primary research → earn AI citations → build schema authority → attract more citations. Each turn of the flywheel increases your brand\'s authority signals, making AI models more likely to cite you.',
  },
  {
    question: 'How long does it take to see results from the Authority Flywheel?',
    answer:
      'Most clients see initial AI citations within 30-45 days of activating the flywheel. Significant citation growth (being recommended by ChatGPT, Perplexity, and Gemini in your category) typically occurs within 90 days. The flywheel accelerates over time — each citation reinforces the next.',
  },
  {
    question: 'What makes the Authority Flywheel different from traditional SEO?',
    answer:
      'Traditional SEO optimizes for search engine rankings. The Authority Flywheel optimizes for AI citation — making AI models (ChatGPT, Perplexity, Claude, Gemini) recommend your brand as the authoritative source. This requires different signals: primary research, schema depth, E-E-A-T signals, and structured data that AI models can parse and trust.',
  },
  {
    question: 'Can any business use the Authority Flywheel?',
    answer:
      'The Authority Flywheel works best for businesses with genuine expertise in their domain. If you have proprietary data, original research, unique processes, or deep domain knowledge, the flywheel amplifies that into AI citations. It is not a shortcut — it accelerates the authority you already have.',
  },
]

export default function AuthorityFlywheelPage() {
  const webPageSchema = buildWebPageSchema({
    name: 'Authority Flywheel Methodology',
    description:
      'The Authority Flywheel is Adam Silva\'s proprietary framework for achieving AI citation dominance through primary research, schema authority, and E-E-A-T signals.',
    url: `${SITE_URL}/frameworks/authority-flywheel`,
  })

  const definedTermSchema = {
    '@type': 'DefinedTermSet',
    name: 'Authority Flywheel',
    description:
      'A proprietary methodology for achieving AI citation dominance through a self-reinforcing cycle of primary research publication, schema authority building, and E-E-A-T signal optimization.',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Authority Flywheel',
        description:
          'A self-reinforcing cycle: publish primary research → earn AI citations → build schema authority → attract more citations. Each revolution increases citation probability.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Citation Probability',
        description:
          'The likelihood that an AI model (ChatGPT, Perplexity, Claude, Gemini) will cite your brand when answering questions in your domain.',
      },
    ],
  }

  const articleSchema = {
    '@type': 'Article',
    '@id': `${SITE_URL}/frameworks/authority-flywheel#article`,
    headline: 'Authority Flywheel Methodology — AI Citation Dominance Framework',
    description:
      'The proprietary methodology for achieving AI citation dominance through primary research, schema authority, and E-E-A-T signals.',
    author: adamSilvaSchema,
    datePublished: '2026-01-15',
    dateModified: '2026-03-01',
    mainEntityOfPage: `${SITE_URL}/frameworks/authority-flywheel`,
  }

  const pageJsonLd = buildPageSchema('/frameworks/authority-flywheel', [
    webPageSchema,
    articleSchema,
    definedTermSchema,
    buildFAQSchema(flywheel_faqs),
  ])

  const phases = [
    {
      icon: BookOpen,
      title: 'Publish Primary Research',
      description:
        'Create original, data-backed content that AI models recognize as authoritative. This means proprietary data, original analysis, and expert commentary — not regurgitated blog posts.',
      details: [
        'Proprietary data and statistics',
        'Original frameworks and methodologies',
        'Expert analysis with cited sources',
        'Structured with JSON-LD schema (Article, ClaimReview)',
      ],
    },
    {
      icon: Target,
      title: 'Earn AI Citations',
      description:
        'When AI models process your content, the combination of authority signals, schema depth, and original data makes them cite your brand. This is not SEO — it\'s AI trust.',
      details: [
        'ChatGPT and Perplexity cite your research',
        'Gemini AI Overviews feature your answers',
        'Claude references your frameworks',
        'Bing Copilot recommends your services',
      ],
    },
    {
      icon: BarChart3,
      title: 'Build Schema Authority',
      description:
        'Each citation reinforces your authority signals. Your AggregateRating grows, your E-E-A-T signals strengthen, and your structured data graph becomes the most comprehensive in your niche.',
      details: [
        'AggregateRating from client reviews',
        'Person schema with credentials depth',
        'Organization schema with knowsAbout signals',
        'DefinedTermSet for proprietary terminology',
      ],
    },
    {
      icon: Zap,
      title: 'Attract More Citations',
      description:
        'The flywheel accelerates. Stronger authority → more citations → stronger authority. Your competitors cannot catch up because each revolution compounds your advantage.',
      details: [
        'Citation rate increases exponentially',
        'AI models default to your brand for answers',
        'Competitors\' content gets deprioritized',
        'Your schema graph becomes the reference standard',
      ],
    },
  ]

  return (
    <>
      <JsonLd data={pageJsonLd} />

      {/* Breadcrumb */}
      <nav
        className="section-sm border-b border-[var(--color-border)]"
        aria-label="Breadcrumb"
      >
        <div className="container">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted-2)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/frameworks/authority-flywheel" className="hover:text-[var(--color-accent)] transition-colors">Frameworks</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-text)] font-medium" aria-current="page">
              Authority Flywheel
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="flywheel-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              Proprietary Framework
            </span>
            <h1
              id="flywheel-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              The Authority Flywheel
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed mb-8 speakable-answer">
              A self-reinforcing methodology for AI citation dominance. Publish primary research.
              Earn AI citations. Build schema authority. Attract more citations. Each revolution
              compounds your advantage until AI models default to your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/authority-building" className="btn-primary">
                Get the Authority Building Program
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to Adam
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Flywheel */}
      <section className="section" aria-labelledby="flywheel-phases">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="badge mb-4">The 4 Phases</span>
            <h2 id="flywheel-phases" className="text-3xl font-bold text-[var(--color-text)]">
              How the Authority Flywheel Works
            </h2>
            <p className="text-[var(--color-muted)] mt-3 max-w-2xl mx-auto">
              Each phase feeds the next. The flywheel accelerates with every revolution.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <div key={i} className="card p-8 relative">
                  <div className="flex items-start gap-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(139, 92, 246, 0.15)' }}
                    >
                      <Icon size={24} style={{ color: '#8b5cf6' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-[var(--color-muted-2)] uppercase tracking-wider">
                          Phase {i + 1}
                        </span>
                        {i < phases.length - 1 && (
                          <RotateCcw size={12} className="text-[var(--color-muted-2)]" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{phase.title}</h3>
                      <p className="text-[var(--color-muted)] leading-relaxed mb-4">{phase.description}</p>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {phase.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-2 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="why-it-works">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">The Science</span>
            <h2 id="why-it-works" className="text-3xl font-bold text-[var(--color-text)]">
              Why AI Models Trust the Flywheel
            </h2>
          </div>
          <div className="space-y-6">
            <div className="card p-6 border-l-4" style={{ borderLeftColor: '#8b5cf6' }}>
              <h3 className="font-bold text-[var(--color-text)] mb-2">Primary Research = Trust</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                AI models are trained to distinguish original research from derivative content. When your site
                publishes proprietary data, original analysis, and expert commentary with ClaimReview schema,
                AI models classify it as high-trust content worthy of citation.
              </p>
            </div>
            <div className="card p-6 border-l-4" style={{ borderLeftColor: '#8b5cf6' }}>
              <h3 className="font-bold text-[var(--color-text)] mb-2">Schema Depth = Parseability</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                JSON-LD structured data is how AI models understand your content at scale. A complete schema
                graph (Organization, Person, Article, FAQPage, DefinedTermSet, ClaimReview) gives AI models
                machine-readable proof of your authority that no competitor blog post can match.
              </p>
            </div>
            <div className="card p-6 border-l-4" style={{ borderLeftColor: '#8b5cf6' }}>
              <h3 className="font-bold text-[var(--color-text)] mb-2">Compounding = Moat</h3>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                Every citation strengthens your authority signals, making the next citation more likely.
                After 3-4 revolutions, the flywheel generates citations without additional effort. Your
                competitors would need to match your entire research corpus and schema graph to catch up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="flywheel-faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 id="flywheel-faq" className="text-3xl font-bold text-[var(--color-text)]">
              Authority Flywheel Questions
            </h2>
          </div>
          <div className="space-y-4">
            {flywheel_faqs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <RelatedContent currentPath="/frameworks/authority-flywheel" />

      {/* CTA */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="flywheel-cta">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-4" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              Start the Flywheel
            </span>
            <h2 id="flywheel-cta" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4">
              Ready for AI Citation Dominance?
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              The Authority Building Program ($15,000 / 90 days) is the turnkey implementation of the
              Authority Flywheel. 10 articles, complete schema architecture, and monthly citation audits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/authority-building" className="btn-primary" style={{ background: '#8b5cf6' }}>
                Get Authority Building
                <ArrowRight size={16} />
              </Link>
              <Link href="/services/acra" className="btn-secondary">
                Free ACRA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
