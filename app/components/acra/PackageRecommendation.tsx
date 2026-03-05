/**
 * PackageRecommendation — ACRA report section
 *
 * Two panels:
 * 1. Framework & Architecture Assessment — SSR status, platform ceiling, penalty flags
 * 2. Recommended Package (Bronze / Silver / Gold / Shopify-tier) — what closes the gaps
 */
import Link from 'next/link'
import { CheckCircle2, XCircle, ArrowRight, Package, AlertTriangle, Cpu, TrendingUp } from 'lucide-react'
import { PACKAGES, PLATFORM_MATRIX, type PlatformEntry, type PackagePageData } from '@/lib/data/packages'

interface Props {
  pillarScores: Record<string, number>
  domain: string
  framework: string | null
  overallScore: number
}

// ── Platform detection from free-text framework field ────────────────────────

function detectPlatform(framework: string | null): PlatformEntry | null {
  if (!framework) return null
  const f = framework.toLowerCase().trim()
  if (f.includes('shopify'))       return PLATFORM_MATRIX.find((p) => p.slug === 'shopify') ?? null
  if (f.includes('wix'))           return PLATFORM_MATRIX.find((p) => p.slug === 'wix') ?? null
  if (f.includes('squarespace'))   return PLATFORM_MATRIX.find((p) => p.slug === 'squarespace') ?? null
  if (f.includes('wordpress') || f.includes(' wp ') || f === 'wp') {
    // Heuristic: if framework specifically says "light" keep light, otherwise assume heavy (conservative)
    const slug = f.includes('light') ? 'wordpress-light' : 'wordpress-heavy'
    return PLATFORM_MATRIX.find((p) => p.slug === slug) ?? null
  }
  if (f.includes('webflow'))       return PLATFORM_MATRIX.find((p) => p.slug === 'webflow-headless') ?? null
  if (
    f.includes('next') || f.includes('react') || f.includes('nuxt') ||
    f.includes('headless') || f.includes('custom') || f.includes('gatsby') ||
    f.includes('astro') || f.includes('sveltekit') || f.includes('remix')
  ) return PLATFORM_MATRIX.find((p) => p.slug === 'nextjs-custom') ?? null
  return null
}

// ── Package selection from platform + score ───────────────────────────────────

function pickPackage(platform: PlatformEntry | null, overallScore: number): PackagePageData {
  // Shopify family → Shopify-tier packages
  if (platform?.slug === 'shopify') {
    const slug = overallScore >= 40 ? 'shopify-growth' : 'shopify-starter'
    return PACKAGES.find((p) => p.slug === slug)!
  }
  // Legacy platforms (Wix, Squarespace, WordPress heavy) → Silver (partial) + migration path
  if (platform?.isLegacy) {
    return PACKAGES.find((p) => p.slug === 'silver')!
  }
  // Headless / Next.js → Gold (they can achieve it)
  if (platform?.slug === 'nextjs-custom') {
    return PACKAGES.find((p) => p.slug === 'gold')!
  }
  // Partial platforms (WordPress light, Webflow) → Silver
  if (platform && !platform.isLegacy && platform.compliance.goldStandard === 'none') {
    return PACKAGES.find((p) => p.slug === 'silver')!
  }
  // Unknown framework → score-based
  if (overallScore >= 50) return PACKAGES.find((p) => p.slug === 'gold')!
  if (overallScore >= 25) return PACKAGES.find((p) => p.slug === 'silver')!
  return PACKAGES.find((p) => p.slug === 'bronze')!
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
  overallScore,
  aeoScore,
}: {
  framework: string | null
  platform: PlatformEntry | null
  overallScore: number
  aeoScore: number
}) {
  const ssrIssue = isSSRIssue(platform, aeoScore)
  const hasPenalties = (platform?.penalties?.length ?? 0) > 0
  const canAchieveGold = platform?.compliance.goldStandard === 'full'
  const isLegacy = platform?.isLegacy ?? false
  const detectedName = platform?.name ?? (framework ? `${framework} (unrecognized platform)` : 'Unknown Platform')

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
              <div className="text-xs font-bold text-red-700">Server-Side Rendering (SSR) — Not Detected</div>
              <p className="text-xs text-red-600 mt-0.5 leading-relaxed">
                {isLegacy
                  ? `${platform?.name ?? 'This platform'} ships 2MB+ of JavaScript that AI crawlers cannot execute. Every page effectively delivers a blank document to ACRABot, Googlebot, and every LLM crawler — your content is invisible to AI systems at the rendering layer.`
                  : `Your AEO score (${aeoScore}/100) suggests content may be loaded via JavaScript rather than server-rendered HTML. AI crawlers cannot execute JS — they need your content directly in the HTML source. This is the #1 cause of AI invisibility for otherwise well-configured sites.`
                }
              </p>
              <p className="text-xs text-red-700 font-semibold mt-1.5">
                The ASC stack is built on Next.js 14 App Router with Server Components — 100% of content is in the HTML source before any JavaScript runs.
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
  pillarScores,
  isLegacy,
}: {
  pkg: PackagePageData
  platform: PlatformEntry | null
  pillarScores: Record<string, number>
  isLegacy: boolean
}) {
  const color = PACKAGE_COLOR[pkg.slug] ?? '#6366f1'
  const gapsClosedBy: string[] = []

  if (pillarScores['protocol'] < 60) gapsClosedBy.push('Agentic protocol stack (' + pkg.features.protocolStack + ')')
  if (pillarScores['press'] < 60) gapsClosedBy.push(`${pkg.features.pressReleasesPerMonth} press release(s)/month — fastest AI authority signal`)
  if (pillarScores['aeo'] < 60) gapsClosedBy.push(`${pkg.features.blogPostsPerMonth} authority blog post(s)/month`)
  if (pillarScores['social'] < 60) gapsClosedBy.push('AI chatbot (' + pkg.features.chatbotChannels + ') for lead capture')
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

      {/* Migration note for legacy platforms */}
      {isLegacy && (
        <div className="px-5 pb-5">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 leading-relaxed">
            <strong>Note:</strong> {pkg.features.architecture === 'Shopify'
              ? `This package is optimized for ${platform?.name ?? 'your platform'}. For full Gold Standard compliance (UCP + ACP + AP2), the recommended path is migration to headless Next.js architecture.`
              : `Silver unlocks partial protocol compliance on ${platform?.name ?? 'your platform'}. Full Gold Standard requires headless migration — we scope this as a separate workstream.`
            }
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

export function PackageRecommendation({ pillarScores, domain, framework, overallScore }: Props) {
  const platform = detectPlatform(framework)
  const pkg = pickPackage(platform, overallScore)
  const aeoScore = pillarScores['aeo'] ?? 0

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[var(--color-text)]">Architecture & Package Recommendation</h2>
        <p className="text-sm text-[var(--color-muted-2)] mt-1">
          Based on your {framework ? `${framework} architecture` : 'site architecture'} and ACRA scores, here is what ASC recommends for {domain}.
        </p>
      </div>
      <div className="space-y-4">
        <FrameworkAssessment
          framework={framework}
          platform={platform}
          overallScore={overallScore}
          aeoScore={aeoScore}
        />
        <PackageCard
          pkg={pkg}
          platform={platform}
          pillarScores={pillarScores}
          isLegacy={platform?.isLegacy ?? false}
        />
      </div>
    </div>
  )
}
