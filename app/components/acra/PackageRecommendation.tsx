/**
 * PackageRecommendation — ACRA report section
 *
 * Two panels:
 * 1. Framework & Architecture Assessment — SSR status, platform ceiling, penalty flags
 * 2. Recommended Package — always Gold Standard (migration path for legacy platforms)
 *
 * Policy: Shopify (including Hydrogen/Oxygen), Wix, Squarespace, and WordPress
 * are all Legacy Architecture. The recommendation is always Gold + migration.
 * There is no "good enough" answer on a legacy platform — only a migration path.
 */
import Link from 'next/link'
import { CheckCircle2, XCircle, ArrowRight, Package, AlertTriangle, Cpu, TrendingUp } from 'lucide-react'
import { PACKAGES, PLATFORM_MATRIX, type PlatformEntry, type PackagePageData } from '@/lib/data/packages'
import { SavingsCounter } from '@/app/components/acra/SavingsCounter'
import type { RevenueImpact } from '@/lib/acra/revenue'

interface Props {
  pillarScores: Record<string, number>
  domain: string
  framework: string | null
  overallScore: number
  revenueImpact: RevenueImpact
}

// ── Platform detection from free-text framework field ────────────────────────

// Returns the matched platform entry AND a label override for Hydrogen/Oxygen variants
function detectPlatform(framework: string | null): { platform: PlatformEntry | null; displayName: string | null } {
  if (!framework) return { platform: null, displayName: null }
  const f = framework.toLowerCase().trim()

  // Shopify Hydrogen / Oxygen — still Shopify legacy architecture
  if (f.includes('hydrogen') || f.includes('oxygen')) {
    return {
      platform: PLATFORM_MATRIX.find((p) => p.slug === 'shopify') ?? null,
      displayName: 'Shopify Hydrogen / Oxygen',
    }
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

// ── Package selection — always Gold Standard ──────────────────────────────────
// Policy: every client should reach Gold. Legacy platforms need migration first,
// but the package recommendation never settles for a Shopify-tier plan.

function pickPackage(overallScore: number): PackagePageData {
  // Gold is always the target — the only variable is entry point
  if (overallScore >= 40) return PACKAGES.find((p) => p.slug === 'gold')!
  if (overallScore >= 20) return PACKAGES.find((p) => p.slug === 'silver')!
  return PACKAGES.find((p) => p.slug === 'bronze')!
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

const PACKAGE_COLOR: Record<string, string> = {
  bronze: '#b45309',
  silver: '#64748b',
  gold: '#d97706',
  core: '#7c3aed',
  'shopify-starter': '#10b981',
  'shopify-growth': '#0ea5e9',
}

// ── SSR / rendering assessment from signals ───────────────────────────────────

function isSSRIssue(platform: PlatformEntry | null, aeoScore: number): boolean {
  // Legacy platforms inherently have JS hydration issues
  if (platform?.isLegacy) return true
  // Low AEO score is a strong proxy for non-SSR / thin HTML
  if (aeoScore < 35) return true
  return false
}

// ── Panel 1: Architecture Assessment ─────────────────────────────────────────

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

      {/* SSR Warning — prominent if issue detected */}
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

      {/* Protocol compliance matrix */}
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

      {/* Legacy penalties */}
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

      {/* What ASC does differently */}
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
              '4 press releases/month — the #1 AI citation signal, generating compounding LLM authority',
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
              ASC handles the full migration from {platform?.name ?? 'your current platform'} to a headless Next.js architecture — DNS cutover, content transfer, and full Gold Standard implementation included. Most migrations complete in 6–8 weeks.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Panel 2: Package Recommendation ──────────────────────────────────────────

function PackageCard({
  pkg,
  platform,
  displayName,
  pillarScores,
  revenueImpact,
}: {
  pkg: PackagePageData
  platform: PlatformEntry | null
  displayName: string | null
  pillarScores: Record<string, number>
  revenueImpact: RevenueImpact
}) {
  const color = PACKAGE_COLOR[pkg.slug] ?? '#6366f1'
  const gapsClosedBy: string[] = []

  if (pillarScores['protocol'] < 60) gapsClosedBy.push('Protocol stack deployed: ' + pkg.features.protocolStack + ' — AI agents can discover and transact')
  if (pillarScores['press'] < 60) gapsClosedBy.push(`Press Release Agent (${pkg.features.pressReleasesPerMonth}/mo) — entity schema trains LLMs to cite your brand`)
  if (pillarScores['aeo'] < 60) gapsClosedBy.push(`Authority Content Agent (${pkg.features.blogPostsPerMonth} post${pkg.features.blogPostsPerMonth === 1 ? '' : 's'}/mo) — AEO-structured to become the source AI systems quote`)
  if (pillarScores['social'] < 60) gapsClosedBy.push('AI Commerce Agent (' + pkg.features.chatbotChannels + ') — 24/7 lead capture across channels')
  gapsClosedBy.push('Schema.org JSON-LD library — dense structured data for all entities')

  return (
    <div className="card overflow-hidden">
      <div className="p-5" style={{ background: `${color}10` }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package size={20} style={{ color }} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[var(--color-text)]">Recommended: {pkg.name} Package</h3>
                {pkg.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
                    {pkg.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--color-muted-2)] mt-0.5">{pkg.tagline}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-bold" style={{ color }}>{pkg.setupDisplay}</div>
            <div className="text-xs text-[var(--color-muted-2)]">{pkg.monthlyDisplay}</div>
          </div>
        </div>
      </div>

      {/* Animated savings / ROI counter */}
      {revenueImpact.monthlyAtRisk > 0 && pkg.monthlyPrice && pkg.setupPrice && (
        <div className="px-5 pb-2">
          <SavingsCounter
            monthlyAtRisk={revenueImpact.monthlyAtRisk}
            annualAtRisk={revenueImpact.annualAtRisk}
            setupPrice={pkg.setupPrice}
            monthlyPrice={pkg.monthlyPrice}
            packageName={pkg.name}
          />
        </div>
      )}

      <div className="p-5 grid sm:grid-cols-2 gap-6">
        {/* What's included */}
        <div>
          <div className="text-xs font-semibold text-[var(--color-text)] mb-2.5">What's Included</div>
          <ul className="space-y-1.5">
            {pkg.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                <CheckCircle2 size={13} style={{ color }} className="shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gaps this closes */}
        <div>
          <div className="text-xs font-semibold text-[var(--color-text)] mb-2.5">Critical Gaps This Closes</div>
          <ul className="space-y-1.5">
            {gapsClosedBy.slice(0, 5).map((g) => (
              <li key={g} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                <TrendingUp size={13} style={{ color }} className="shrink-0 mt-0.5" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Migration note for non-headless platforms */}
      {platform && platform.compliance.goldStandard !== 'full' && (
        <div className="px-5 pb-5">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 leading-relaxed">
            <strong>Migration included.</strong>{' '}
            {displayName ?? platform.name} cannot achieve Gold Standard compliance without migrating to a headless Next.js architecture.
            ASC scopes and executes the full migration — DNS cutover, content transfer, and protocol implementation — as part of the Gold engagement.
            Most migrations complete in 6–8 weeks. Your existing domain, branding, and content are preserved.
          </div>
        </div>
      )}

      <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/packages/${pkg.slug}`}
          className="btn-primary flex-1 text-center flex items-center justify-center gap-2 text-sm"
        >
          View Full Package Details
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/contact"
          className="btn-secondary flex-1 text-center flex items-center justify-center gap-2 text-sm"
        >
          Book a Strategy Call
        </Link>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function PackageRecommendation({ pillarScores, domain, framework, overallScore, revenueImpact }: Props) {
  const { platform, displayName } = detectPlatform(framework)
  const pkg = pickPackage(overallScore)
  const aeoScore = pillarScores['aeo'] ?? 0

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[var(--color-text)]">Architecture & Package Recommendation</h2>
        <p className="text-sm text-[var(--color-muted-2)] mt-1">
          Based on your {displayName ?? framework ?? 'site'} architecture and ACRA scores, here is what ASC recommends for {domain}.
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
        <PackageCard
          pkg={pkg}
          platform={platform}
          displayName={displayName}
          pillarScores={pillarScores}
          revenueImpact={revenueImpact}
        />
      </div>
    </div>
  )
}
