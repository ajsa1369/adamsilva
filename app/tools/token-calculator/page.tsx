'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'
import { JsonLd } from '../../components/seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const toolSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/tools/token-calculator#tool`,
      name: 'Token Efficiency Calculator — Adam Silva Consulting',
      description:
        'Free tool to estimate your website\'s token cost for AI agent consumption and compare it to an ASC-optimized site. Calculate how much your current tech stack costs AI agents to parse.',
      url: `${SITE_URL}/tools/token-calculator`,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'AEO/GEO Optimization Tool',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free to use',
        seller: { '@id': ORG_ID },
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        'Estimate token cost per page type',
        'Compare CSR vs SSR rendering costs',
        'Calculate JS bundle overhead',
        'Benchmark against ASC-optimized baseline',
      ],
      creator: { '@id': ORG_ID },
      provider: { '@id': ORG_ID },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is token efficiency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Token efficiency measures how many tokens (units of text) an AI agent must consume to extract useful information from your page. Lower token cost = cheaper for AI to read your site = more likely to be indexed and cited. A typical React SPA costs 3-5x more tokens than an SSR-rendered equivalent.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good token efficiency score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An ASC-optimized site targets under 2,000 tokens per page for a standard content page. React SPAs often run 8,000-15,000 tokens due to hydration scripts, inline styles, and duplicate data. The score benchmarks your estimate against our baseline.',
          },
        },
      ],
    },
  ],
}

// Rough token cost estimators (heuristic — not exact)
function estimateTokens({
  renderType,
  jsBundleKb,
  inlineStyles,
  contentLength,
  hasSchema,
}: {
  renderType: 'csr' | 'ssr' | 'ssg'
  jsBundleKb: number
  inlineStyles: boolean
  contentLength: 'short' | 'medium' | 'long'
  hasSchema: boolean
}) {
  const contentTokens = { short: 300, medium: 800, long: 1800 }[contentLength]
  const jsOverhead = renderType === 'csr' ? jsBundleKb * 4 : jsBundleKb * 0.5
  const styleOverhead = inlineStyles ? 600 : 80
  const hydrationOverhead = renderType === 'csr' ? 1200 : 0
  const schemaBonus = hasSchema ? -200 : 400 // schema reduces redundant metadata fetches
  const base = 400 // navigation, boilerplate

  return Math.max(200, Math.round(base + contentTokens + jsOverhead + styleOverhead + hydrationOverhead + schemaBonus))
}

const ASC_BASELINE = 1100 // tokens for ASC-optimized page

function getScore(tokens: number) {
  if (tokens <= 1500) return { label: 'Excellent', color: '#10b981', grade: 'A' }
  if (tokens <= 3000) return { label: 'Good', color: '#3b82f6', grade: 'B' }
  if (tokens <= 6000) return { label: 'Fair', color: '#f59e0b', grade: 'C' }
  if (tokens <= 10000) return { label: 'Poor', color: '#ef4444', grade: 'D' }
  return { label: 'Critical', color: '#dc2626', grade: 'F' }
}

export default function TokenCalculatorPage() {
  const [renderType, setRenderType] = useState<'csr' | 'ssr' | 'ssg'>('csr')
  const [jsBundleKb, setJsBundleKb] = useState(250)
  const [inlineStyles, setInlineStyles] = useState(false)
  const [contentLength, setContentLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [hasSchema, setHasSchema] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const estimatedTokens = estimateTokens({ renderType, jsBundleKb, inlineStyles, contentLength, hasSchema })
  const score = getScore(estimatedTokens)
  const savings = estimatedTokens - ASC_BASELINE
  const savingsPct = Math.round((savings / estimatedTokens) * 100)

  return (
    <>
      <JsonLd data={toolSchema} />

      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Free Tool</span>
          <h1 className="text-4xl font-black text-[var(--color-text)] mb-4">
            Token Efficiency Calculator
          </h1>
          <p className="text-lg text-[var(--color-muted)] speakable-answer">
            Estimate how many tokens AI agents consume reading your page — and how much you could save with proper SSR, schema, and AEO optimization.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <div className="card p-8 mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-[var(--color-accent)]" />
              Configure Your Site
            </h2>

            {/* Render type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Rendering Strategy
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: 'csr', label: 'CSR (React SPA)', desc: 'Client-side only' },
                  { value: 'ssr', label: 'SSR (Next.js)', desc: 'Server-rendered' },
                  { value: 'ssg', label: 'SSG (Static)', desc: 'Pre-generated HTML' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRenderType(opt.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      renderType === opt.value
                        ? 'border-[var(--color-accent)] bg-[var(--color-surface)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[var(--color-text)]">{opt.label}</div>
                    <div className="text-xs text-[var(--color-muted-2)] mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* JS bundle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                JavaScript Bundle Size: <span className="text-[var(--color-accent)]">{jsBundleKb} KB</span>
              </label>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={jsBundleKb}
                onChange={(e) => setJsBundleKb(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)]"
              />
              <div className="flex justify-between text-xs text-[var(--color-muted-2)] mt-1">
                <span>10 KB (minimal)</span>
                <span>500 KB (typical React)</span>
                <span>1000 KB (heavy)</span>
              </div>
            </div>

            {/* Content length */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Page Content Length
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: 'short', label: 'Short', desc: '<500 words' },
                  { value: 'medium', label: 'Medium', desc: '500-1,500 words' },
                  { value: 'long', label: 'Long', desc: '1,500+ words' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setContentLength(opt.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      contentLength === opt.value
                        ? 'border-[var(--color-accent)] bg-[var(--color-surface)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[var(--color-text)]">{opt.label}</div>
                    <div className="text-xs text-[var(--color-muted-2)]">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { label: 'Inline CSS / Styled Components', value: inlineStyles, set: setInlineStyles },
                { label: 'Has JSON-LD schema markup', value: hasSchema, set: setHasSchema },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => opt.set(!opt.value)}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      opt.value ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform shadow ${opt.value ? 'translate-x-4' : ''}`} />
                  </div>
                  <span className="text-sm text-[var(--color-text)]">{opt.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="btn-primary w-full justify-center"
            >
              Calculate Token Cost
              <Calculator size={16} />
            </button>
          </div>

          {/* Results */}
          {calculated && (
            <div className="card p-8 animate-fade-up">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Your Results</h2>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-5 bg-[var(--color-surface-2)] rounded-xl">
                  <div className="text-4xl font-black mb-1" style={{ color: score.color }}>
                    {score.grade}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: score.color }}>{score.label}</div>
                  <div className="text-xs text-[var(--color-muted-2)] mt-1">Token Efficiency Grade</div>
                </div>
                <div className="text-center p-5 bg-[var(--color-surface-2)] rounded-xl">
                  <div className="text-4xl font-black text-[var(--color-text)] mb-1">
                    ~{estimatedTokens.toLocaleString()}
                  </div>
                  <div className="text-xs text-[var(--color-muted-2)]">Estimated tokens/page</div>
                </div>
                <div className="text-center p-5 bg-[var(--color-surface-2)] rounded-xl">
                  <div className="text-4xl font-black text-[var(--color-accent)] mb-1">
                    {savings > 0 ? `-${savingsPct}%` : 'Optimal'}
                  </div>
                  <div className="text-xs text-[var(--color-muted-2)]">Potential savings vs ASC baseline</div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">Key Issues Detected</h3>
                <div className="space-y-2">
                  {renderType === 'csr' && (
                    <div className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <AlertTriangle size={14} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                      <span><strong>CSR detected:</strong> AI agents see a blank page until JavaScript executes. Switch to SSR/SSG to eliminate the hydration tax (~1,200 tokens).</span>
                    </div>
                  )}
                  {jsBundleKb > 200 && (
                    <div className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <AlertTriangle size={14} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                      <span><strong>Large JS bundle ({jsBundleKb} KB):</strong> Excess JavaScript metadata inflates token count. Code splitting and tree shaking can reduce this significantly.</span>
                    </div>
                  )}
                  {inlineStyles && (
                    <div className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <AlertTriangle size={14} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                      <span><strong>Inline styles detected:</strong> Styled Components and CSS-in-JS inject hundreds of style tokens that AI agents must parse. External CSS eliminates this overhead.</span>
                    </div>
                  )}
                  {!hasSchema && (
                    <div className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <AlertTriangle size={14} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                      <span><strong>No JSON-LD schema:</strong> AI agents must guess your content structure, consuming extra tokens. JSON-LD provides a compressed metadata layer that reduces overall parse cost.</span>
                    </div>
                  )}
                  {renderType !== 'csr' && jsBundleKb <= 200 && !inlineStyles && hasSchema && (
                    <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <CheckCircle size={14} className="text-[#10b981]" />
                      <span>Your configuration is already well-optimized. Further gains come from content structure (Answer-First format) and Speakable schema.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] text-center">
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  Want a precise analysis of your actual website with actionable fixes?
                </p>
                <Link href="/services/aeo-audit" className="btn-primary text-sm">
                  Get Full AEO Audit — $500
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">About Token Efficiency</h2>
            <div className="space-y-3">
              {[
                { q: 'What is token efficiency?', a: 'Token efficiency measures how many tokens an AI agent must consume to extract useful information from your page. Lower token cost means cheaper, faster AI indexing — and a higher probability of being cited as an authoritative source.' },
                { q: 'Why does my rendering type matter?', a: 'Client-side React (CSR) serves a near-empty HTML document — AI agents see almost nothing until JavaScript executes. SSR and SSG deliver full HTML immediately, eliminating the hydration tax of 1,000–2,000+ tokens per page.' },
                { q: 'How do I reduce my token cost?', a: 'The four biggest wins: 1) Switch to SSR/SSG, 2) Add JSON-LD schema, 3) Remove inline CSS/Styled Components, 4) Reduce JS bundle size. An AEO Audit will identify your specific highest-impact fixes.' },
              ].map((faq, i) => (
                <details key={i} className="card p-4">
                  <summary className="font-semibold text-sm text-[var(--color-text)] cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-[var(--color-muted-2)]">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
