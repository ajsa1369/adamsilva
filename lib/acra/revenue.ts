/**
 * ACRA Revenue Impact Calculator
 * Translates score gaps into projected monthly/annual revenue loss
 * Using industry benchmarks for AI commerce traffic share
 */

export type RevenueRange = '$0-50k' | '$50k-250k' | '$250k-1M' | '$1M-10M' | '$10M+'

const MONTHLY_REVENUE_MIDPOINTS: Record<RevenueRange, number> = {
  '$0-50k': 25000,
  '$50k-250k': 150000,
  '$250k-1M': 625000,
  '$1M-10M': 5500000,
  '$10M+': 20000000,
}

// Gartner: 50% of traditional search traffic replaced by AI by 2026.
// We model 18% of revenue currently influenced by AI discovery/recommendations.
const AI_INFLUENCE_RATE = 0.18

// % of AI-influenced revenue requiring agentic protocol compliance to convert
const AGENTIC_CONVERSION_RATE = 0.31

// AI commerce growing 48% YoY — 4% monthly compound
const AI_MONTHLY_GROWTH = 0.04

export interface RevenueImpact {
  monthlyAtRisk: number
  annualAtRisk: number
  aiInfluencedMonthly: number
  projectedIn12Months: number
  competitorAIShare: number  // %
  yourAIShare: number        // %
  gapScore: number           // 0-100 (how much you're leaving on the table)
  breakdown: ImpactItem[]
}

export interface ImpactItem {
  gap: string
  monthlyLoss: number
  description: string
  urgency: 'critical' | 'high' | 'medium'
}

export function calculateRevenueImpact(
  overallScore: number,
  pillarScores: Record<string, number>,
  revenueRange?: RevenueRange
): RevenueImpact {
  const monthlyRevenue = revenueRange
    ? MONTHLY_REVENUE_MIDPOINTS[revenueRange]
    : MONTHLY_REVENUE_MIDPOINTS['$250k-1M'] // default assumption

  const aiInfluencedMonthly = Math.round(monthlyRevenue * AI_INFLUENCE_RATE)
  const gapScore = 100 - overallScore
  const yourAIShare = Math.round(overallScore * 0.4)   // rough correlation
  const competitorAIShare = Math.min(85, yourAIShare + 35)

  // Revenue loss from each major gap
  const breakdown: ImpactItem[] = []

  const protocolScore = pillarScores['protocol'] ?? 0
  if (protocolScore < 50) {
    const loss = Math.round(aiInfluencedMonthly * AGENTIC_CONVERSION_RATE * (1 - protocolScore / 100))
    breakdown.push({
      gap: 'No Agentic Protocol (UCP/ACP/AP2)',
      monthlyLoss: loss,
      description: 'AI shopping agents cannot discover or purchase from your site. You are invisible to the fastest-growing commerce channel.',
      urgency: 'critical',
    })
  }

  const aeoScore = pillarScores['aeo'] ?? 0
  if (aeoScore < 60) {
    const loss = Math.round(aiInfluencedMonthly * 0.22 * (1 - aeoScore / 100))
    breakdown.push({
      gap: 'Missing from AI Answer Engines',
      monthlyLoss: loss,
      description: 'ChatGPT, Perplexity, and Claude are answering your category queries — but recommending competitors, not you.',
      urgency: 'critical',
    })
  }

  const socialScore = pillarScores['social'] ?? 0
  if (socialScore < 50) {
    const loss = Math.round(aiInfluencedMonthly * 0.08 * (1 - socialScore / 100))
    breakdown.push({
      gap: 'Weak Social Authority',
      monthlyLoss: loss,
      description: 'Social proof is an LLM trust signal. Low social authority reduces AI recommendation frequency by up to 40%.',
      urgency: 'high',
    })
  }

  const pressScore = pillarScores['press'] ?? 0
  if (pressScore < 50) {
    const loss = Math.round(aiInfluencedMonthly * 0.12 * (1 - pressScore / 100))
    breakdown.push({
      gap: 'No Press / PR Coverage',
      monthlyLoss: loss,
      description: 'Press releases are the #1 fast-track to AI authority. Without them, your brand authority score stagnates as competitors get cited.',
      urgency: 'critical',
    })
  }

  const geoScore = pillarScores['geo'] ?? 0
  if (geoScore < 60) {
    const loss = Math.round(aiInfluencedMonthly * 0.15 * (1 - geoScore / 100))
    breakdown.push({
      gap: 'Poor Generative Engine Optimization',
      monthlyLoss: loss,
      description: 'LLMs are bypassing your content for competitors with stronger E-E-A-T and topical cluster architecture.',
      urgency: 'high',
    })
  }

  const schemScore = pillarScores['structured-data'] ?? 0
  if (schemScore < 50) {
    const loss = Math.round(aiInfluencedMonthly * 0.10 * (1 - schemScore / 100))
    breakdown.push({
      gap: 'Insufficient Structured Data',
      monthlyLoss: loss,
      description: 'AI agents cannot read your product data in machine-readable format. Pricing, availability, and specifications are invisible to agentic buyers.',
      urgency: 'high',
    })
  }

  const monthlyAtRisk = breakdown.reduce((sum, item) => sum + item.monthlyLoss, 0)
  const annualAtRisk = monthlyAtRisk * 12

  // Project growth: agentic commerce is growing 48% YoY
  const projectedIn12Months = Math.round(monthlyAtRisk * Math.pow(1 + AI_MONTHLY_GROWTH, 12))

  return {
    monthlyAtRisk,
    annualAtRisk,
    aiInfluencedMonthly,
    projectedIn12Months,
    competitorAIShare,
    yourAIShare,
    gapScore,
    breakdown: breakdown.sort((a, b) => b.monthlyLoss - a.monthlyLoss),
  }
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n.toLocaleString()}`
}
