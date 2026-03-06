/**
 * PackageRecommendation — ACRA report section
 *
 * Two panels:
 * 1. Framework & Architecture Assessment — SSR status, platform ceiling, penalty flags
 * 2. Book a Strategy Call — drives prospects to talk to a salesperson who handles
 *    package selection, with a hint that talking to us can unlock discounts.
 */
import Link from 'next/link'
import { CheckCircle2, XCircle, ArrowRight, AlertTriangle, Cpu, Phone, Gift } from 'lucide-react'
import { PLATFORM_MATRIX, type PlatformEntry } from '@/lib/data/packages'
import type { RevenueImpact } from '@/lib/acra/revenue'

interface Props {
  pillarScores: Record<string, number>
  domain: string
  framework: string | null
  overallScore: number
  revenueImpact: RevenueImpact
}

// -- Platform detection from free-text framework field ----------------------------

function detectPlatform(framework: string | null): { platform: PlatformEntry | null; displayName: string | null } {
  if (!framework) return { platform: null, displayName: null }
  const f = framework.toLowerCase().trim()

  if (f.includes('hydrogen') || f.includes('oxygen')) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'shopify') ?? null, displayName: 'Shopify Hydrogen / Oxygen' }
  }
  if (f.includes('shopify')) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'shopify') ?? null, displayName: 'Shopify' }
  }
  if (f.includes('wix')) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'wix') ?? null, displayName: 'Wix' }
  }
  if (f.includes('squarespace')) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'squarespace') ?? null, displayName: 'Squarespace' }
  }
  if (f.includes('wordpress') || f.includes(' wp ') || f === 'wp') {
    const slug = f.includes('light') ? 'wordpress-light' : 'wordpress-heavy'
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === slug) ?? null, displayName: slug === 'wordpress-light' ? 'WordPress (Light Theme)' : 'WordPress (Heavy Theme)' }
  }
  if (f.includes('webflow')) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'webflow-headless') ?? null, displayName: 'Webflow (Headless)' }
  }
  if (
    f.includes('next') || f.includes('react') || f.includes('nuxt') ||
    f.includes('headless') || f.includes('custom') || f.includes('gatsby') ||
    f.includes('astro') || f.includes('sveltekit') || f.includes('remix')
  ) {
    return { platform: PLATFORM_MATRIX.find((p) => p.slug === 'nextjs-custom') ?? null, displayName: framework }
  }
  return { platform: null, displayName: framework }
}

function isHydrogenVariant(framework: string | null): boolean {
  if (!framework) return false
  const f = framework.toLowerCase()
  return f.includes('hydrogen') || f.includes('oxygen')
}

const COMPLIANCE_LABEL: Record<string, string> = {
  full: 'Full',
  partial: 'Partial',
  subdomain: 'Subdomain only',
  none: 'Not achievable',
  migration: 'Requires migration',
}
const COMPLIANCE_COLOR: Record<string, string> = {
  full: '#10b981',
  partial: '#f59e0b',
  subdomain: '#f97316',
  none: '#ef4444',
  migration: '#8b5cf6',
}

// -- SSR / rendering assessment from signals --------------------------------------

function isSSRIssue(platform: PlatformEntry | null, aeoScore: number): boolean {
  if (platform?.isLegacy) return true
  if (aeoScore < 35) return true
  return false
}

// -- Panel 1: Architecture Assessment ---------------------------------------------

function FrameworkAssessment({
  framework,
  platform,
  displayName,
  overallScore,
  aeoScore,
}: {
  framework: string | null
  platform: PlatformEntry | null
  displayName: string | null
  overallScore: number
  aeoScore: number
}) {
  const hydrogen = isHydrogenVariant(framework)
  const ssrIssue = isSSRIssue(platform, aeoScore)
  const hasPenalties = (platform?.penalties?.length ?? 0) > 0
  const canAchieveGold = platform?.compliance.goldStandard === 'full'
  const isLegacy = platform?.isLegacy ?? false
  const detectedName = displayName ?? platform?.name ?? (framework ? `${framework} (unrecognized platform)` : 'Unknown Platform')

  return (
    <div className="card overflow-hidden">
      <div
        className="p-5"
        style={{ background: isLegacy ? 'linear-gradient(135deg, #ef444410, #ef444405)' : canAchieveGold ? 'linear-gradient(135deg, #10b98110, #10b98105)' : 'linear-gradient(135deg, #f59e0b10, #f59e0b05)' }}
      >
        <div className="flex items-start gap-3">
          <Cpu size={20} className={isLegacy ? 'text-red-500' : canAchieveGold ? 'text-green-500' : 'text-amber-500'} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[var(--color-text)]">Architecture Assessment</h3>
              {framework && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-muted-2)] font-medium">
                  {detectedName}
                </span>
              )}
              {isLegacy && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  Legacy Architecture
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-muted-2)] mt-1 leading-relaxed">
              {platform
                ? platform.ceiling
                : 'Submit your framework in the scan form for a platform-specific architecture assessment.'}
            </p>
          </div>
        </div>
      </div>

      {ssrIssue && (
        <div className="mx-4 mt-4 p-3 rounded-lg border border-red-200 bg-red-50">
          <div className="flex items-start gap-2">
            <AlertTriangle size={15} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-red-700">
                {hydrogen ? 'Shopify Hydrogen / Oxygen — Still Legacy Architecture' : 'Server-Side Rendering (SSR) — Not Detected'}
              </div>
              <p className="text-xs text-red-600 mt-0.5 leading-relaxed">
                {hydrogen
                  ? 'Shopify Hydrogen is React-based and ships significant client-side JavaScript. While it is an improvement over Shopify Liquid templates, it still runs on Shopify Oxygen hosting — which blocks root-level file placement (no UCP), uses Shopify proprietary checkout (no ACP), and cannot implement custom cryptographic security headers (no AP2). Hydrogen is a better developer experience on a fundamentally limited platform. It is not the Gold Standard.'
                  : isLegacy
                  ? `${platform?.name ?? 'This platform'} ships 2MB+ of JavaScript that AI crawlers cannot execute. Every page effectively delivers a blank document to ACRABot, Googlebot, and every LLM crawler — your content is invisible to AI systems at the rendering layer.`
                  : `Your AEO score (${aeoScore}/100) suggests content may be loaded via JavaScript rather than server-rendered HTML. AI crawlers cannot execute JS — they need your content directly in the HTML source. This is the #1 cause of AI invisibility for otherwise well-configured sites.`
                }
              </p>
              <p className="text-xs text-red-700 font-semibold mt-1.5">
                The ASC Gold Standard stack runs on Next.js 14 App Router with Server Components — 100% of content is in the HTML source before any JavaScript runs, with full UCP/ACP/AP2 protocol support.
              </p>
            </div>
          </div>
        </div>
      )}

      {platform && (
        <div className="p-5">
          <div className="text-xs font-semibold text-[var(--color-text)] mb-3">
            Protocol Compliance Ceiling — {platform.name}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {([
              { key: 'ucp', label: 'UCP Discovery' },
              { key: 'acp', label: 'ACP Checkout' },
              { key: 'ap2', label: 'AP2 Trust Layer' },
              { key: 'goldStandard', label: 'Gold Standard' },
            ] as const).map(({ key, label }) => {
              const level = platform.compliance[key]
              const color = COMPLIANCE_COLOR[level]
              return (
                <div key={key} className="p-2.5 rounded-lg" style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                  <div className="text-[10px] text-[var(--color-muted-2)] font-medium">{label}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color }}>{COMPLIANCE_LABEL[level]}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {hasPenalties && (
        <div className="px-5 pb-5">
          <div className="text-xs font-semibold text-red-600 mb-2">
            Architecture Penalties — {platform!.name}
          </div>
          <div className="space-y-1.5">
            {platform!.penalties.map((p) => (
              <div key={p} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                <XCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 pb-5">
        <div
          className="p-4 rounded-xl"
          style={{ background: 'linear-gradient(135deg, var(--color-accent) / 8%, transparent)', border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)' }}
        >
          <div className="text-xs font-bold text-[var(--color-accent)] mb-2">Why the ASC Stack Is the New Standard</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Next.js 14 Server Components — zero JS required for AI crawlers to read content',
              'Dense JSON-LD schema library — every entity, product, FAQ, and author is machine-readable',
              'Full UCP + ACP + AP2 protocol stack — AI agents can discover, negotiate, and purchase autonomously',
              'Press Release Agent (client-scheduled) — entity-schema releases train LLMs to cite your brand',
              'sameAs entity graph — your brand identity is verified across all AI knowledge graphs',
              'AI-first content architecture — answer-first paragraphs and speakable markup throughout',
            ].map((item) => (
              <div key={item} className="flex items-start gap-1.5 text-xs text-[var(--color-muted)]">
                <CheckCircle2 size={12} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          {isLegacy && (
            <p className="text-xs text-[var(--color-muted)] mt-2.5 leading-relaxed border-t border-[var(--color-border)] pt-2.5">
              <strong className="text-[var(--color-text)]">Migration path available.</strong>{' '}
              ASC handles the full migration from {platform?.name ?? 'your current platform'} to a headless Next.js architecture — DNS cutover, content transfer, and full Gold Standard implementation included. Most migrations complete in 6-8 weeks.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// -- Panel 2: Book a Strategy Call CTA --------------------------------------------

function BookCallCTA({
  domain,
  overallScore,
  criticalCount,
  revenueImpact,
}: {
  domain: string
  overallScore: number
  criticalCount: number
  revenueImpact: RevenueImpact
}) {
  const urgencyText = criticalCount > 3
    ? `${criticalCount} critical gaps identified — this needs immediate attention.`
    : criticalCount > 0
    ? `${criticalCount} critical gap${criticalCount > 1 ? 's' : ''} found that ${criticalCount > 1 ? 'are' : 'is'} costing you AI revenue today.`
    : 'Your report reveals clear opportunities to capture more AI-driven revenue.'

  return (
    <div className="card overflow-hidden">
      <div
        className="p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)' }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Talk to Us Before You Buy Anything</h3>
            <p className="text-blue-100 text-sm mt-1 leading-relaxed">
              {urgencyText} Our team will walk through your report, identify the highest-ROI fixes, and build a custom remediation plan for {domain}.
            </p>
          </div>
        </div>

        {/* Discount hint */}
        <div className="mt-5 p-4 rounded-xl bg-white/10 border border-white/20">
          <div className="flex items-start gap-3">
            <Gift size={18} className="shrink-0 mt-0.5 text-amber-300" />
            <div>
              <div className="text-sm font-bold text-white">Clients who speak with us first save money</div>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                Instead of buying off-the-shelf packages, let us scope a custom engagement based on your exact gaps. Clients who book a strategy call typically get a tailored plan that addresses their specific needs at a better price point than our standard packages.
              </p>
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {['100% Free Call', 'Custom Scoping', 'No Obligation'].map((v) => (
            <div key={v} className="bg-white/10 rounded-lg px-3 py-2 text-center text-xs font-semibold">{v}</div>
          ))}
        </div>
      </div>

      {/* What happens on the call */}
      <div className="p-6">
        <div className="text-xs font-semibold text-[var(--color-text)] mb-3">What Happens on the Call</div>
        <div className="space-y-2.5">
          {[
            { step: '1', text: 'We review your ACRA report together and explain what each score means for your revenue' },
            { step: '2', text: 'We identify the 2-3 highest-impact fixes based on your specific architecture and industry' },
            { step: '3', text: 'We build a custom scope and timeline — not a cookie-cutter package' },
            { step: '4', text: 'You decide if and when to move forward. No pressure, no follow-up spam' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: '#2563eb18', color: '#2563eb' }}
              >
                {item.step}
              </div>
              <span className="text-sm text-[var(--color-muted)] leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>

        {revenueImpact.monthlyAtRisk > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Your report estimates ${revenueImpact.monthlyAtRisk.toLocaleString()}/mo</strong> in AI revenue at risk.
              Every month without a remediation plan, that number compounds as competitors with protocol-compliant infrastructure capture market share.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            href={`/contact?service=ACRA+Strategy+Call&source=acra-report&domain=${encodeURIComponent(domain)}&score=${overallScore}`}
            className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
          >
            Book Your Free Strategy Call
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/services"
            className="btn-secondary flex-1 text-center flex items-center justify-center gap-2 text-sm"
          >
            Browse All Services
          </Link>
        </div>
        <p className="text-xs text-center text-[var(--color-muted-2)] mt-3">
          We respond within 24 hours. 30-minute call. Your data is never shared.
        </p>
      </div>
    </div>
  )
}

// -- Main export ------------------------------------------------------------------

export function PackageRecommendation({ pillarScores, domain, framework, overallScore, revenueImpact }: Props) {
  const { platform, displayName } = detectPlatform(framework)
  const aeoScore = pillarScores['aeo'] ?? 0
  const criticalCount = Object.values(pillarScores).filter((s) => s < 35).length

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[var(--color-text)]">Architecture & Next Steps</h2>
        <p className="text-sm text-[var(--color-muted-2)] mt-1">
          Based on your {displayName ?? framework ?? 'site'} architecture and ACRA scores, here is what we recommend for {domain}.
        </p>
      </div>
      <div className="space-y-4">
        <FrameworkAssessment
          framework={framework}
          platform={platform}
          displayName={displayName}
          overallScore={overallScore}
          aeoScore={aeoScore}
        />
        <BookCallCTA
          domain={domain}
          overallScore={overallScore}
          criticalCount={criticalCount}
          revenueImpact={revenueImpact}
        />
      </div>
    </div>
  )
}
