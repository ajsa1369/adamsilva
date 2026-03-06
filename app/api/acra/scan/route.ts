import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { scanUrl } from '@/lib/acra/scanner'
import { computeScores } from '@/lib/acra/scoring'
import { calculateRevenueImpact, type RevenueRange } from '@/lib/acra/revenue'
import { pushACRASearchToPipedrive } from '@/lib/pipedrive/acra-lead'
import { captureScreenshot } from '@/lib/acra/screenshot'
import { uploadScreenshot } from '@/lib/acra/storage'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { url, companyName, industry, monthlyRevenueRange, framework } = body as {
    url?: string
    companyName?: string
    industry?: string
    monthlyRevenueRange?: RevenueRange
    framework?: string
  }

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  // Create scan record
  const { data: scan, error: scanError } = await supabase
    .from('acra_scans')
    .insert({
      user_id: user.id,
      url,
      company_name: companyName ?? null,
      industry: industry ?? null,
      monthly_revenue_range: monthlyRevenueRange ?? null,
      framework: framework ?? null,
      status: 'processing',
    })
    .select('id')
    .single()

  if (scanError || !scan) {
    return NextResponse.json({ error: 'Failed to create scan' }, { status: 500 })
  }

  try {
    // Run HTML scan + Chrome screenshot in parallel
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    const [signals, screenshotBuffer] = await Promise.all([
      scanUrl(url),
      captureScreenshot(fullUrl).catch(() => null),
    ])

    // Upload screenshot to Supabase Storage if captured
    let screenshotUrl: string | null = null
    if (screenshotBuffer) {
      screenshotUrl = await uploadScreenshot(scan.id, screenshotBuffer)
    }

    const scores = computeScores(signals)

    const pillarScores: Record<string, number> = {}
    for (const p of scores.pillars) pillarScores[p.key] = p.score

    const revenue = calculateRevenueImpact(scores.overall, pillarScores, monthlyRevenueRange)

    // Recommendations: top findings with upsell context
    const recommendations = scores.topRecommendations.map((f) => ({
      severity: f.severity,
      title: f.title,
      detail: f.detail,
      fixWith: f.fixWith ?? null,
    }))

    // Store report
    const { data: report, error: reportError } = await supabase
      .from('acra_reports')
      .insert({
        scan_id: scan.id,
        user_id: user.id,
        overall_score: scores.overall,
        overall_grade: scores.grade,
        score_protocol_compliance: pillarScores['protocol'] ?? 0,
        score_structured_data: pillarScores['structured-data'] ?? 0,
        score_aeo: pillarScores['aeo'] ?? 0,
        score_geo: pillarScores['geo'] ?? 0,
        score_seo_foundation: pillarScores['seo'] ?? 0,
        score_social_authority: pillarScores['social'] ?? 0,
        score_press_coverage: pillarScores['press'] ?? 0,
        score_ai_authority: pillarScores['ai-authority'] ?? 0,
        score_llm_recommendation: pillarScores['llm-recommendation'] ?? 0,
        projected_monthly_loss_usd: revenue.monthlyAtRisk,
        projected_annual_loss_usd: revenue.annualAtRisk,
        ai_traffic_share_percent: revenue.yourAIShare,
        competitor_ai_share_percent: revenue.competitorAIShare,
        llm_chatgpt: scores.llm.chatgpt,
        llm_perplexity: scores.llm.perplexity,
        llm_claude: scores.llm.claude,
        llm_gemini: scores.llm.gemini,
        llm_copilot: scores.llm.copilot,
        schema_types_found: signals.schemaTypesFound,
        well_known_endpoints: [
          signals.hasUCPManifest && '/.well-known/ucp/manifest.json',
          signals.hasACPEndpoint && '/.well-known/acp',
          signals.hasAP2Endpoint && '/.well-known/ap2',
          signals.hasAgentJson && '/agent.json',
          signals.hasAIPlugin && '/ai-plugin.json',
          signals.hasLLMsTxt && '/llms.txt',
        ].filter(Boolean),
        social_profiles_found: signals.socialProfiles,
        press_sources_found: signals.pressReleaseLinks,
        missing_schema_types: signals.missingSchemaTypes.slice(0, 10),
        recommendations,
        scan_meta: {
          loadTimeMs: signals.loadTimeMs,
          statusCode: signals.statusCode,
          htmlLength: signals.htmlLength,
          hasSSL: signals.hasSSL,
          hasSitemap: signals.hasSitemap,
          hasRobotsTxt: signals.hasRobotsTxt,
          valueLevers: scores.valueLevers,
          ogImage: signals.ogImage,
          favicon: signals.favicon,
          screenshotUrl,
        },
      })
      .select('id, share_token')
      .single()

    if (reportError || !report) {
      throw new Error('Failed to store report')
    }

    const reportData = report as { id: string; share_token: string }

    // Mark scan complete
    await supabase
      .from('acra_scans')
      .update({ status: 'complete', completed_at: new Date().toISOString() })
      .eq('id', scan.id)

    // Alert Pipedrive: new ACRA search (fire-and-forget — don't block the response)
    const domain = (() => {
      try { return new URL(url.startsWith('http') ? url : `https://${url}`).hostname }
      catch { return url }
    })()
    const criticalGaps = Object.values(pillarScores).filter((s) => s < 35).length
    const shareUrl = reportData.share_token
      ? `https://www.adamsilvaconsulting.com/acra/share/${reportData.share_token}`
      : undefined

    void pushACRASearchToPipedrive({
      name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'Unknown',
      email: user.email ?? '',
      company: companyName ?? undefined,
      domain,
      acraScore: scores.overall,
      criticalGaps,
      pillarScores,
      shareUrl,
    })

    return NextResponse.json({ scanId: scan.id, reportId: reportData.id })
  } catch (err) {
    await supabase
      .from('acra_scans')
      .update({ status: 'failed' })
      .eq('id', scan.id)

    console.error('ACRA scan failed:', err)
    return NextResponse.json({ error: 'Scan failed. Please try again.' }, { status: 500 })
  }
}
