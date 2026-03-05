'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Star, TrendingUp, ShieldCheck, Megaphone, Users, Globe, BarChart3 } from 'lucide-react'

interface ServiceRec {
  slug: string
  name: string
  icon: React.ElementType
  iconColor: string
  reason: string
  impact: string
  price: string
  urgency: 'critical' | 'high' | 'medium'
  pillar: string
}

interface Props {
  pillarScores: Record<string, number>
  domain: string
  framework: string | null
}

function buildRecommendations(pillarScores: Record<string, number>, framework: string | null): ServiceRec[] {
  const recs: ServiceRec[] = []

  const protocol = pillarScores['protocol'] ?? 0
  const schema = pillarScores['structured-data'] ?? 0
  const aeo = pillarScores['aeo'] ?? 0
  const geo = pillarScores['geo'] ?? 0
  const social = pillarScores['social'] ?? 0
  const press = pillarScores['press'] ?? 0
  const aiAuthority = pillarScores['ai-authority'] ?? 0
  const llm = pillarScores['llm-recommendation'] ?? 0

  if (protocol < 60) {
    recs.push({
      slug: 'ucp-implementation',
      name: 'UCP/ACP/AP2 Protocol Implementation',
      icon: Zap,
      iconColor: '#8b5cf6',
      reason: `Your protocol score (${protocol}/100) means AI shopping agents cannot discover or transact with your site. You are invisible to the fastest-growing commerce channel.`,
      impact: '40% lift in Agent Checkout conversion rate once implemented',
      price: 'From $15,000',
      urgency: 'critical',
      pillar: 'protocol',
    })
  }

  if (press < 60) {
    recs.push({
      slug: 'press-syndicator',
      name: 'Press Release Syndication',
      icon: Megaphone,
      iconColor: '#dc2626',
      reason: `Press score: ${press}/100. Branded web mentions have a 0.664 correlation with AI citation frequency — the strongest signal available. You have no Tier 1 press footprint.`,
      impact: 'Fastest path to AI authority. Expect citation lift within 4–8 weeks of syndication',
      price: '$6,500 + $3,000/mo',
      urgency: press < 25 ? 'critical' : 'high',
      pillar: 'press',
    })
  }

  if (aeo < 60) {
    recs.push({
      slug: 'aeo-audit',
      name: 'AEO Audit + Implementation',
      icon: BarChart3,
      iconColor: '#f59e0b',
      reason: `AEO score: ${aeo}/100. Scores below 60 mean AI systems are not citing your content. Most sites score 25–45 — a score above 70 puts you in the top 15% of AI-ready sites.`,
      impact: 'Join the top 15% of AI-ready websites. Citation lift within 60 days',
      price: '$5,000',
      urgency: aeo < 30 ? 'critical' : 'high',
      pillar: 'aeo',
    })
  }

  if (geo < 60) {
    recs.push({
      slug: 'geo-implementation',
      name: 'GEO Content Architecture',
      icon: Globe,
      iconColor: '#0ea5e9',
      reason: `GEO score: ${geo}/100. LLMs are bypassing your content for competitors with stronger E-E-A-T signals, topical hub architecture, and research citations.`,
      impact: '15–40% citation rate after 12 months of consistent GEO publishing',
      price: '$7,500',
      urgency: 'high',
      pillar: 'geo',
    })
  }

  if (social < 60) {
    recs.push({
      slug: 'social-media-manager',
      name: 'Social Authority Building',
      icon: Users,
      iconColor: '#ec4899',
      reason: `Social score: ${social}/100. ${framework && ['WordPress', 'Wix', 'Squarespace'].includes(framework) ? `${framework} sites often lack sameAs entity mapping — ` : ''}Social authority directly correlates with AI recommendation frequency, reducing your chance of being cited by up to 40%.`,
      impact: 'Branded web mentions are the #1 AI citation signal (0.664 Ahrefs correlation)',
      price: '$6,500 + $1,500/mo',
      urgency: 'high',
      pillar: 'social',
    })
  }

  if (schema < 60) {
    recs.push({
      slug: 'aeo-audit',
      name: 'Structured Data & Schema Library',
      icon: ShieldCheck,
      iconColor: '#10b981',
      reason: `Schema score: ${schema}/100. AI agents cannot read your product data in machine-readable format. Pricing, availability, and specifications are invisible to agentic buyers.${framework ? ` (${framework} sites typically need custom JSON-LD injection)` : ''}`,
      impact: 'Dense JSON-LD schema is required for the ASC Gold Standard',
      price: '$5,000',
      urgency: schema < 30 ? 'critical' : 'high',
      pillar: 'structured-data',
    })
  }

  if (aiAuthority < 60 && llm < 50) {
    recs.push({
      slug: 'authority-building',
      name: 'AI Authority & Brand Entity Program',
      icon: Star,
      iconColor: '#f97316',
      reason: `AI Authority: ${aiAuthority}/100 | LLM Recommendation: ${llm}/100. Your brand does not register as authoritative to AI systems. ChatGPT, Perplexity, Claude, and Gemini require machine-verifiable trust signals your site is missing.`,
      impact: 'Authority compounds. Establish entity graph and citation network before competitors do',
      price: '$15,000',
      urgency: 'high',
      pillar: 'ai-authority',
    })
  }

  // Sort: critical first, then by gap severity
  return recs.sort((a, b) => {
    const urgencyOrder = { critical: 0, high: 1, medium: 2 }
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
  })
}

const urgencyStyles = {
  critical: { badge: 'bg-red-100 text-red-700', border: 'border-red-200', accent: '#ef4444' },
  high: { badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200', accent: '#f59e0b' },
  medium: { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', accent: '#3b82f6' },
}

export function RecommendedServices({ pillarScores, domain, framework }: Props) {
  const recs = buildRecommendations(pillarScores, framework)

  if (recs.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
          <TrendingUp size={20} className="text-[var(--color-accent)]" />
          Recommended Services for {domain}
        </h2>
        <span className="text-xs text-[var(--color-muted-2)] bg-[var(--color-surface-2)] px-2 py-1 rounded-full">
          {recs.length} service{recs.length > 1 ? 's' : ''} identified
        </span>
      </div>

      <div className="space-y-4">
        {recs.map((rec) => {
          const styles = urgencyStyles[rec.urgency]
          const Icon = rec.icon
          return (
            <div key={rec.slug} className={`card p-5 border ${styles.border}`}>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${rec.iconColor}15` }}
                >
                  <Icon size={20} style={{ color: rec.iconColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[var(--color-text)]">{rec.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}>
                          {rec.urgency === 'critical' ? 'Critical Gap' : rec.urgency === 'high' ? 'High Priority' : 'Recommended'}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)] font-semibold mt-0.5">{rec.price}</p>
                    </div>
                    <Link
                      href={`/services/${rec.slug}`}
                      className="btn-primary text-xs py-1.5 px-3 shrink-0 flex items-center gap-1"
                    >
                      Learn More
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  <p className="text-sm text-[var(--color-muted-2)] leading-relaxed mb-2">{rec.reason}</p>

                  <div
                    className="flex items-start gap-2 text-xs font-medium rounded-lg px-3 py-2"
                    style={{ background: `${rec.iconColor}10`, color: rec.iconColor }}
                  >
                    <TrendingUp size={12} className="shrink-0 mt-0.5" />
                    <span>{rec.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
