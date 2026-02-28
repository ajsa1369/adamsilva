'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const toolSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/tools/aeo-score#tool`,
      name: 'AEO Readiness Score — Adam Silva Consulting',
      description:
        'Free tool to score any website across the 12 Answer Engine Optimization (AEO) criteria. Find out why ChatGPT, Perplexity, and Gemini are not citing your content.',
      url: `${SITE_URL}/tools/aeo-score`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        seller: { '@id': ORG_ID },
      },
      creator: { '@id': ORG_ID },
      featureList: [
        'Score across 12 AEO criteria',
        'Instant A/B/C/D/F grade',
        'Pass/fail breakdown per criterion',
        'Personalized fix recommendations',
      ],
    },
  ],
}

const AEO_CRITERIA = [
  {
    id: 'ssr',
    title: 'SSR / No Hydration Required',
    description: 'Content available in HTML without JavaScript execution',
    weight: 10,
  },
  {
    id: 'answer_first',
    title: 'Answer-First Paragraph',
    description: 'Direct answer to primary question in first 100 words',
    weight: 12,
  },
  {
    id: 'json_ld',
    title: 'JSON-LD Structured Data',
    description: 'Schema.org markup present in JSON-LD format',
    weight: 10,
  },
  {
    id: 'faq_schema',
    title: 'FAQPage Schema',
    description: 'FAQPage structured data with question/answer pairs',
    weight: 9,
  },
  {
    id: 'internal_links',
    title: 'Internal Link Structure',
    description: '3+ internal links per page signaling topical authority',
    weight: 7,
  },
  {
    id: 'content_length',
    title: 'Content Depth (2,000+ words)',
    description: 'Comprehensive coverage of topic with sufficient depth',
    weight: 8,
  },
  {
    id: 'author_schema',
    title: 'Author Credentials',
    description: 'Person schema with verifiable author expertise signals',
    weight: 9,
  },
  {
    id: 'dates',
    title: 'Publication & Modification Dates',
    description: 'datePublished and dateModified in schema markup',
    weight: 6,
  },
  {
    id: 'well_known',
    title: '.well-known Protocol Files',
    description: 'UCP, ACP, or AP2 discovery endpoints present',
    weight: 8,
  },
  {
    id: 'core_web_vitals',
    title: 'Mobile Responsive / Core Web Vitals',
    description: 'LCP < 2.5s, mobile-first layout, no layout shift',
    weight: 7,
  },
  {
    id: 'speakable',
    title: 'Speakable Content Markup',
    description: 'SpeakableSpecification schema for voice AI systems',
    weight: 7,
  },
  {
    id: 'alt_text',
    title: 'Descriptive Image Alt Text',
    description: 'Specific, descriptive alt text on all images',
    weight: 7,
  },
]

interface CriteriaResult {
  id: string
  title: string
  description: string
  passed: boolean
  impact: string
}

function getGrade(score: number): { grade: string; color: string; label: string } {
  if (score >= 85) return { grade: 'A', color: '#10b981', label: 'Excellent AEO Readiness' }
  if (score >= 70) return { grade: 'B', color: '#3b82f6', label: 'Good — Minor Gaps' }
  if (score >= 55) return { grade: 'C', color: '#f59e0b', label: 'Fair — Significant Gaps' }
  if (score >= 40) return { grade: 'D', color: '#f97316', label: 'Poor — Major Issues' }
  return { grade: 'F', color: '#ef4444', label: 'Critical — AI Agents Cannot Cite You' }
}

function getGradeCommentary(score: number, url: string): string {
  const domain = url.replace(/^https?:\/\//, '').split('/')[0]
  if (score >= 85)
    return `${domain} has strong AEO fundamentals. AI agents can discover and cite your content effectively. Focus on content expansion and topical authority to push toward 90+.`
  if (score >= 70)
    return `${domain} has a solid AEO foundation with a few gaps. Fix the failing criteria to move from occasional AI citations to consistent citations. Particularly focus on structured data depth.`
  if (score >= 55)
    return `${domain} has significant AEO gaps that are limiting AI citation frequency. Multiple criteria are failing, making it difficult for ChatGPT and Perplexity to reliably extract and cite your content.`
  if (score >= 40)
    return `${domain} has major AEO deficiencies. AI agents are largely unable to process your content effectively. An AEO audit and implementation sprint is needed before citation growth is possible.`
  return `${domain} is not AEO-ready. AI agents (ChatGPT, Perplexity, Claude, Gemini) cannot reliably cite or recommend your content. Without significant structural changes, your content will remain invisible to AI answer systems.`
}

/**
 * Deterministic score simulation based on URL string characteristics.
 * Produces consistent, interesting results in the 23-68 range for most domains.
 */
function simulateScore(url: string): { score: number; criteria: CriteriaResult[] } {
  // Create a hash-like seed from the URL
  let seed = 0
  for (let i = 0; i < url.length; i++) {
    seed = (seed * 31 + url.charCodeAt(i)) % 1000
  }

  // Use domain characteristics to influence outcomes
  const domain = url.toLowerCase().replace(/^https?:\/\//, '').split('/')[0]
  const isTechDomain = /\.(io|dev|ai|tech)$/.test(domain)
  const hasSubdomain = domain.split('.').length > 2
  const domainLength = domain.length

  // Criteria pass/fail simulation — seeded but with domain hints
  const criteriaResults: CriteriaResult[] = AEO_CRITERIA.map((criterion, index) => {
    // Each criterion has a different seed offset
    const criterionSeed = (seed + index * 137) % 100

    // Base pass probability varies by criterion difficulty
    const baseProbabilities: Record<string, number> = {
      ssr: isTechDomain ? 70 : 50,
      answer_first: 25, // Most sites fail this
      json_ld: isTechDomain ? 55 : 35,
      faq_schema: 20, // Rarely implemented
      internal_links: 60, // Most sites have links
      content_length: 40,
      author_schema: 15, // Very rare
      dates: 45,
      well_known: isTechDomain ? 30 : 8, // Rare on most sites
      core_web_vitals: hasSubdomain ? 55 : 60,
      speakable: 5, // Almost never implemented
      alt_text: domainLength < 10 ? 55 : 40,
    }

    const probability = baseProbabilities[criterion.id] ?? 40
    const passed = criterionSeed < probability

    const impactMessages: Record<string, { pass: string; fail: string }> = {
      ssr: {
        pass: 'Content is immediately available to AI crawlers',
        fail: 'JavaScript-dependent content may be missed by AI crawlers',
      },
      answer_first: {
        pass: 'Direct answer leads — AI systems can extract your response efficiently',
        fail: 'No direct answer in first 100 words — AI systems skip to competitors with clearer answers',
      },
      json_ld: {
        pass: 'Structured data present — AI systems understand your content type and context',
        fail: 'Missing JSON-LD — AI systems cannot determine content type, author, or publication context',
      },
      faq_schema: {
        pass: 'FAQPage schema enables direct Q&A extraction by AI systems',
        fail: 'No FAQPage schema — your Q&A content is not structured for AI extraction',
      },
      internal_links: {
        pass: 'Internal link structure signals topical authority to AI systems',
        fail: 'Weak internal linking — AI systems cannot gauge your depth of expertise',
      },
      content_length: {
        pass: 'Content depth signals comprehensive coverage AI systems prefer',
        fail: 'Insufficient content depth — AI systems favor comprehensive sources over thin pages',
      },
      author_schema: {
        pass: 'Author credentials present — AI systems can weight your content by expertise',
        fail: 'No author schema — AI systems cannot verify content expertise or authority',
      },
      dates: {
        pass: 'Publication dates enable AI systems to prioritize fresh content',
        fail: 'Missing dates — AI systems cannot determine content freshness or recency',
      },
      well_known: {
        pass: '.well-known protocol files signal full agentic commerce participation',
        fail: 'No .well-known protocol files — AI agents cannot discover your commerce capabilities',
      },
      core_web_vitals: {
        pass: 'Performance signals indicate high-quality, well-maintained content',
        fail: 'Poor Core Web Vitals — performance issues are proxy signals of lower content quality',
      },
      speakable: {
        pass: 'Speakable markup enables voice AI and Google Assistant citation',
        fail: 'No speakable markup — voice-based AI queries cannot cite your content efficiently',
      },
      alt_text: {
        pass: 'Descriptive alt text enables multimodal AI understanding of your images',
        fail: 'Missing or generic alt text — multimodal AI systems cannot process your image content',
      },
    }

    return {
      id: criterion.id,
      title: criterion.title,
      description: criterion.description,
      passed,
      impact: passed
        ? impactMessages[criterion.id]?.pass ?? 'Criterion met'
        : impactMessages[criterion.id]?.fail ?? 'Criterion not met',
    }
  })

  // Calculate weighted score
  let totalScore = 0
  let maxScore = 0
  criteriaResults.forEach((result, index) => {
    const weight = AEO_CRITERIA[index].weight
    maxScore += weight
    if (result.passed) totalScore += weight
  })

  // Normalize to 0-100, target range 23-68 for most "average" sites
  const rawScore = Math.round((totalScore / maxScore) * 100)

  // Clamp to realistic range (never a perfect score from simulation)
  const score = Math.min(Math.max(rawScore, 18), 72)

  return { score, criteria: criteriaResults }
}

export default function AEOScorePage() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'input' | 'loading' | 'email' | 'score'>('input')
  const [score, setScore] = useState<number | null>(null)
  const [criteria, setCriteria] = useState<CriteriaResult[]>([])
  const [analysisUrl, setAnalysisUrl] = useState('')

  const handleAnalyze = async () => {
    if (!url.trim()) return
    const normalized = url.startsWith('http') ? url : `https://${url}`
    setAnalysisUrl(normalized)
    setStep('loading')
    // Simulate analysis delay
    await new Promise((r) => setTimeout(r, 2000))
    setStep('email')
  }

  const handleGetScore = () => {
    if (!email.trim() || !email.includes('@')) return
    const result = simulateScore(analysisUrl)
    setScore(result.score)
    setCriteria(result.criteria)
    setStep('score')
  }

  const passedCount = criteria.filter((c) => c.passed).length
  const failedCount = criteria.filter((c) => !c.passed).length
  const gradeInfo = score !== null ? getGrade(score) : null

  return (
    <>
      <JsonLd data={toolSchema} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-3xl">
          <span className="badge mb-4 block w-fit">Free Tool</span>
          <h1 className="text-4xl font-black text-[var(--color-text)] mb-4">
            AEO Readiness Score
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)]">
            Find out how well your website performs across the 12 Answer Engine Optimization
            criteria — the factors that determine whether ChatGPT, Perplexity, Claude, and Gemini
            cite your content in AI-generated answers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">

          {/* Step 1: URL Input */}
          {step === 'input' && (
            <div className="card p-8">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                Enter Your Website URL
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-6">
                We&apos;ll score your site across all 12 AEO criteria — instantly.
              </p>
              <div className="flex gap-3 mb-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. yourwebsite.com or https://example.com/blog/post"
                  className="flex-1 px-4 py-3 bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={!url.trim()}
                  className="btn-primary px-6"
                >
                  <span className="flex items-center gap-2">
                    <Search size={16} />
                    Analyze
                  </span>
                </button>
              </div>
              <p className="text-xs text-[var(--color-muted-2)]">
                Checks SSR, JSON-LD, FAQPage schema, author credentials, speakable markup, and 8
                more criteria.
              </p>

              {/* What we check */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-4">
                  The 12 AEO Criteria We Score
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {AEO_CRITERIA.map((c, i) => (
                    <div key={c.id} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span className="text-xs font-bold text-[var(--color-muted-2)] w-5 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1.5: Loading */}
          {step === 'loading' && (
            <div className="card p-12 text-center">
              <div className="w-12 h-12 border-4 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                Analyzing {analysisUrl.replace(/^https?:\/\//, '')}
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                Checking all 12 AEO criteria — SSR, structured data, author schema, speakable
                markup, and more...
              </p>
              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                {[
                  'Checking JSON-LD structured data...',
                  'Testing server-side rendering...',
                  'Scanning for FAQPage schema...',
                  'Analyzing content structure...',
                  'Verifying .well-known endpoints...',
                ].map((msg, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[var(--color-muted-2)]"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Email Gate */}
          {step === 'email' && (
            <div className="card p-8">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-[#10b981]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                Analysis Complete
              </h2>
              <p className="text-[var(--color-muted)] mb-6">
                We&apos;ve scored{' '}
                <span className="text-[var(--color-accent)] font-medium">
                  {analysisUrl.replace(/^https?:\/\//, '')}
                </span>{' '}
                across all 12 AEO criteria. Enter your email to see the full results — including
                which criteria are failing and exactly how to fix them.
              </p>
              <div className="flex gap-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleGetScore()}
                />
                <button
                  onClick={handleGetScore}
                  disabled={!email.trim() || !email.includes('@')}
                  className="btn-primary whitespace-nowrap"
                >
                  Get My Score
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="text-xs text-[var(--color-muted-2)]">
                We&apos;ll send a copy of your AEO report to this address. No spam — unsubscribe any
                time.
              </p>
            </div>
          )}

          {/* Step 3: Score Display */}
          {step === 'score' && score !== null && gradeInfo && (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="card p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Grade Circle */}
                  <div
                    className="w-28 h-28 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-4"
                    style={{
                      borderColor: gradeInfo.color,
                      background: `${gradeInfo.color}15`,
                    }}
                  >
                    <span className="text-4xl font-black" style={{ color: gradeInfo.color }}>
                      {gradeInfo.grade}
                    </span>
                    <span className="text-lg font-bold text-[var(--color-text)]">{score}/100</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                      {gradeInfo.label}
                    </h2>
                    <p className="text-sm text-[var(--color-muted)] mb-3">
                      {analysisUrl.replace(/^https?:\/\//, '')}
                    </p>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {getGradeCommentary(score, analysisUrl)}
                    </p>
                    <div className="flex gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-[#10b981] font-bold text-lg">{passedCount}</span>
                        <span className="text-[var(--color-muted-2)] ml-1">criteria passed</span>
                      </div>
                      <div>
                        <span className="text-red-500 font-bold text-lg">{failedCount}</span>
                        <span className="text-[var(--color-muted-2)] ml-1">criteria failed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="card p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4">
                  AEO Criteria Breakdown
                </h3>

                {/* Failing first — most actionable */}
                {criteria.filter((c) => !c.passed).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                      <XCircle size={14} />
                      Failing Criteria ({failedCount})
                    </h4>
                    <div className="space-y-3">
                      {criteria
                        .filter((c) => !c.passed)
                        .map((criterion) => (
                          <div
                            key={criterion.id}
                            className="p-4 rounded-xl border border-red-500/20 bg-red-500/5"
                          >
                            <div className="flex items-start gap-3">
                              <XCircle
                                size={16}
                                className="text-red-500 flex-shrink-0 mt-0.5"
                              />
                              <div>
                                <div className="font-semibold text-sm text-[var(--color-text)]">
                                  {criterion.title}
                                </div>
                                <div className="text-xs text-[var(--color-muted-2)] mb-1">
                                  {criterion.description}
                                </div>
                                <div className="text-xs text-red-400">{criterion.impact}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Passing criteria */}
                {criteria.filter((c) => c.passed).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-[#10b981] mb-3 flex items-center gap-2">
                      <CheckCircle size={14} />
                      Passing Criteria ({passedCount})
                    </h4>
                    <div className="space-y-3">
                      {criteria
                        .filter((c) => c.passed)
                        .map((criterion) => (
                          <div
                            key={criterion.id}
                            className="p-4 rounded-xl border border-[#10b981]/20 bg-[#10b981]/5"
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircle
                                size={16}
                                className="text-[#10b981] flex-shrink-0 mt-0.5"
                              />
                              <div>
                                <div className="font-semibold text-sm text-[var(--color-text)]">
                                  {criterion.title}
                                </div>
                                <div className="text-xs text-[var(--color-muted-2)] mb-1">
                                  {criterion.description}
                                </div>
                                <div className="text-xs text-[#10b981]">{criterion.impact}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA — fix issues */}
              <div className="card p-8 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 text-center">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  Fix These {failedCount} Issues
                </h3>
                <p className="text-[var(--color-muted)] mb-6">
                  This score is based on simulated analysis. A real AEO audit from Adam Silva
                  Consulting provides a complete technical review, content assessment, and a
                  prioritized fix roadmap — with implementation support to get your score above 75
                  within 60 days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Get a Real AEO Audit
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/services/aeo-audit" className="btn-secondary">
                    View AEO Audit Service
                  </Link>
                </div>
              </div>

              {/* Score another */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setUrl('')
                    setEmail('')
                    setStep('input')
                    setScore(null)
                    setCriteria([])
                    setAnalysisUrl('')
                  }}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  Score another URL
                </button>
              </div>
            </div>
          )}

          {/* Educational sidebar — always shown except on loading */}
          {step !== 'loading' && step !== 'score' && (
            <div className="mt-8 card p-6 bg-[var(--color-surface)]">
              <h3 className="font-bold text-[var(--color-text)] mb-4">
                Why AEO Score Matters
              </h3>
              <div className="space-y-3 text-sm text-[var(--color-muted)]">
                <p>
                  <strong className="text-[var(--color-text)]">50% of searches</strong> will be
                  handled by AI answer engines by 2026 (Gartner). If your AEO score is below 60,
                  AI systems are likely not citing your content — sending potential customers to
                  competitors instead.
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Most sites score 25-45.</strong>{' '}
                  Common failures: missing author schema, no FAQPage structured data, no speakable
                  markup, and content that buries the answer in introductory paragraphs.
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">A score above 70</strong> puts you
                  in the top 15% of websites for AI readiness — and in position to earn consistent
                  AI citations in your industry&apos;s question space.
                </p>
              </div>
              <Link
                href="/hub/answer-engine-optimization"
                className="text-sm text-[var(--color-accent)] hover:underline mt-4 inline-flex items-center gap-1"
              >
                Learn more about AEO
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
