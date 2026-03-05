/**
 * ACRA Scoring Engine — converts raw scan signals into 0-100 pillar scores
 * and generates prioritized recommendations
 */

import type { ScanSignals } from './scanner'

export interface PillarScore {
  key: string
  label: string
  score: number          // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  status: 'critical' | 'needs-work' | 'good' | 'excellent'
  summary: string
  findings: Finding[]
  serviceUpsell: ServiceUpsell | null
}

export interface Finding {
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  detail: string
  fixWith?: string      // service slug
}

export interface ServiceUpsell {
  name: string
  slug: string
  price: string
  urgency: string
}

export interface LLMScores {
  chatgpt: number
  perplexity: number
  claude: number
  gemini: number
  copilot: number
}

export interface CrawlabilityFactor {
  factor: string
  pass: boolean
  detail: string
}

export interface ValueLevers {
  // Lever 1: LLM Crawlability Score (1-10)
  llmCrawlabilityScore: number
  llmCrawlabilityGrade: 'A' | 'B' | 'C' | 'D' | 'F'
  llmCrawlabilityFactors: CrawlabilityFactor[]

  // Lever 2: Zero-Click Traffic Projection
  zeroClickRiskPercent: number        // % of organic traffic shifting to AI (0-100)
  zeroClickCitationRate: number       // % of that traffic where you'd be cited (0-100)
  zeroClickNetLossPercent: number     // actual % of total organic at risk of disappearing

  // Lever 3: Hallucination & Misinformation Risk
  hallucinationRiskLevel: 'low' | 'medium' | 'high' | 'critical'
  hallucinationRiskReasons: string[]

  // Lever 4: Shadow Competitor Context
  competitorAdvantageMonths: number   // how many months ahead a compliant competitor is
  shadowCompetitorStatement: string   // narrative about who IS being recommended
}

export interface ACRAScores {
  overall: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  pillars: PillarScore[]
  llm: LLMScores
  topRecommendations: Finding[]
  valueLevers: ValueLevers
}

function toGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 60) return 'C'
  if (score >= 40) return 'D'
  return 'F'
}

function toStatus(score: number): PillarScore['status'] {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 35) return 'needs-work'
  return 'critical'
}

function clamp(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n)))
}

// ── Pillar 1: Agentic Protocol Compliance ────────────────────────────────────
function scoreProtocol(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasUCPManifest) score += 30
  else findings.push({ severity: 'critical', title: 'No UCP Manifest', detail: 'Your site has no /.well-known/ucp/manifest.json. AI shopping agents cannot discover your product catalog.', fixWith: 'ucp-implementation' })

  if (s.hasACPEndpoint) score += 25
  else findings.push({ severity: 'critical', title: 'No ACP Checkout Endpoint', detail: 'AI agents cannot execute purchases autonomously on your site. You are invisible to ChatGPT Instant Checkout and similar agentic buying flows.', fixWith: 'acp-integration' })

  if (s.hasAP2Endpoint) score += 20
  else findings.push({ severity: 'high', title: 'Missing AP2 Trust Layer', detail: 'No cryptographic mandate infrastructure means enterprise AI procurement systems cannot verify your business identity.', fixWith: 'ap2-trust-layer' })

  if (s.hasAgentJson || s.hasAIPlugin) score += 15
  else findings.push({ severity: 'high', title: 'No Agent Manifest', detail: 'No /agent.json or /ai-plugin.json means LLMs cannot load your capability schema for function calling or tool use.' })

  if (s.hasLLMsTxt) score += 10
  else findings.push({ severity: 'medium', title: 'No llms.txt', detail: 'An llms.txt file guides AI crawlers on how to index your site. Without it, LLMs may misrepresent your offerings.' })

  return {
    key: 'protocol',
    label: 'Agentic Protocol Compliance',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: score < 20 ? 'Your site is completely invisible to AI agents. Zero agentic transactions are possible.' : score < 50 ? 'Partial protocol coverage — agents can find you but cannot buy from you.' : 'Good protocol foundation. Optimize remaining gaps to capture full agentic revenue.',
    findings,
    serviceUpsell: score < 60 ? { name: 'UCP Implementation', slug: 'ucp-implementation', price: '$15,000', urgency: 'CRITICAL — Every month without this costs you agentic market share.' } : null,
  }
}

// ── Pillar 2: Structured Data & Semantics ────────────────────────────────────
function scoreStructuredData(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasOrganizationSchema) score += 15
  else findings.push({ severity: 'critical', title: 'No Organization Schema', detail: 'LLMs cannot verify your business identity, funding status, or contact details. This causes hallucinations when AI answers questions about your company.' })

  if (s.hasProductSchema) score += 20
  else findings.push({ severity: 'critical', title: 'No Product/Service Schema', detail: 'AI agents cannot read your pricing, availability, or product specifications. Your catalog is invisible to agentic commerce flows.' })

  if (s.hasFAQSchema) score += 15
  else findings.push({ severity: 'high', title: 'Missing FAQPage Schema', detail: 'FAQ schema allows LLMs to retrieve precise answers directly, eliminating hallucination risk for your key product questions.' })

  if (s.hasBreadcrumbSchema) score += 10
  else findings.push({ severity: 'medium', title: 'No BreadcrumbList Schema', detail: 'Breadcrumb schema improves site navigation comprehension for AI crawlers and improves Google featured snippet eligibility.' })

  if (s.hasReviewSchema) score += 10
  else findings.push({ severity: 'medium', title: 'No AggregateRating Schema', detail: 'Reviews missing from structured data mean AI agents cannot confirm social proof when recommending your products.' })

  if (s.hasSpeakableSchema) score += 15
  else findings.push({ severity: 'high', title: 'No SpeakableSpecification Schema', detail: 'Voice AI and LLM answer engines cannot identify which content to read aloud or cite as authoritative answers.' })

  if (s.schemaTypesFound.length >= 5) score += 15
  else score += s.schemaTypesFound.length * 2

  return {
    key: 'structured-data',
    label: 'Structured Data & Semantics',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: `${s.schemaTypesFound.length} schema type(s) detected. ${s.missingSchemaTypes.length} critical types missing. LLMs are reading your HTML as unstructured text.`,
    findings,
    serviceUpsell: score < 50 ? { name: 'AEO Audit', slug: 'aeo-audit', price: '$5,000', urgency: 'Fix structured data gaps before AI traffic scales.' } : null,
  }
}

// ── Pillar 3: AEO — Answer Engine Optimization (12-point framework) ──────────
// Based on ASC 12-criteria AEO readiness model.
// Most sites score 25-45. Score <60 = not being cited. Score >70 = top 15%.
function scoreAEO(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  // Criterion 1: Server-Side Rendering (inferred from fast load / no CSR signals)
  if (s.statusCode > 0 && s.htmlLength > 5000) score += 8
  else findings.push({ severity: 'critical', title: 'Content May Not Be SSR', detail: 'AI crawlers cannot execute JavaScript. Content must be in the HTML source — not loaded client-side. CSR-heavy sites score 0 in AI citation extraction.' })

  // Criterion 2: Answer-First Paragraph (long answer blocks near top)
  if (s.longAnswerBlocks >= 3) score += 10
  else if (s.longAnswerBlocks >= 1) score += 5
  else findings.push({ severity: 'critical', title: 'No Answer-First Content Structure', detail: 'AI systems extract answers from the first 100 words. Your content likely buries answers behind introductory text — the single most common reason brands are invisible to AI citation engines.' })

  // Criterion 3: JSON-LD Structured Data
  if (s.schemaTypesFound.length >= 4) score += 10
  else if (s.schemaTypesFound.length >= 2) score += 5
  else findings.push({ severity: 'critical', title: 'Missing JSON-LD Structured Data', detail: 'AI systems are comprehension engines, not keyword matchers. Without JSON-LD, they cannot verify your entity, products, or author claims — so they skip you in favor of competitors who have it.' })

  // Criterion 4: FAQPage Schema
  if (s.hasFAQSchema) score += 10
  else findings.push({ severity: 'high', title: 'No FAQPage Schema', detail: 'FAQPage schema is the most reliable path to appearing in AI-generated answers. It makes your Q&A pairs directly extractable by every major LLM without guesswork.' })

  // Criterion 5: Internal Link Structure (3+ per page signals topical breadth)
  if (s.internalLinkCount >= 10) score += 8
  else if (s.internalLinkCount >= 3) score += 4
  else findings.push({ severity: 'medium', title: 'Weak Internal Link Structure', detail: 'AI systems use internal links to map your topical authority. Fewer than 3 internal links per page signals a flat site with no subject matter depth.' })

  // Criterion 6: Content Depth (2000+ word pages)
  if (s.longAnswerBlocks >= 5) score += 8
  else if (s.longAnswerBlocks >= 2) score += 4

  // Criterion 7: Author Credentials (Person schema)
  if (s.hasAuthorMarkup) score += 8
  else findings.push({ severity: 'high', title: 'No Author Credentials (Person Schema)', detail: 'AI systems are comprehension systems that evaluate author expertise. Anonymous content is systematically deprioritized. Adding Person schema with verifiable credentials is a top-3 AEO fix.' })

  // Criterion 8: Publication/Modification Dates
  if (s.hasDatePublished) score += 6
  else findings.push({ severity: 'medium', title: 'Missing Publication Dates', detail: 'LLMs heavily weight content freshness. Undated content is treated as potentially stale and is down-ranked in citation selection.' })

  // Criterion 9: .well-known Protocol Files (covered in protocol pillar — bonus here)
  if (s.hasWellKnown) score += 6

  // Criterion 10: Speakable Markup
  if (s.hasSpeakableContent) score += 8
  else findings.push({ severity: 'medium', title: 'No Speakable Markup', detail: 'Speakable schema tells AI engines exactly which content blocks are authoritative answers. Without it, LLMs must guess — and they often guess wrong, citing competitors instead.' })

  // Criterion 11: Core Web Vitals signals
  if (s.hasMobileViewport && s.hasPreloadLinks) score += 6
  else if (s.hasMobileViewport) score += 3

  // Criterion 12: Descriptive Image Alt Text
  if (s.imagesMissingAlt === 0) score += 8
  else if (s.imagesMissingAlt <= 3) score += 4
  else findings.push({ severity: 'low', title: `${s.imagesMissingAlt} Images Missing Alt Text`, detail: 'Multimodal AI systems use alt text to understand images. Missing alt text reduces your score on visual comprehension criteria used by Gemini and GPT-4V.' })

  const finalScore = clamp(score)
  return {
    key: 'aeo',
    label: 'Answer Engine Optimization',
    score: finalScore,
    grade: toGrade(finalScore),
    status: toStatus(finalScore),
    summary: finalScore < 30
      ? `Score ${finalScore}/100 — well below the industry average of 25-45. AI engines are not citing your content. Competitors are answering your branded queries instead.`
      : finalScore < 60
      ? `Score ${finalScore}/100 — below the 60-point citation threshold. AI systems are likely skipping your content. Brands above 70 appear in the top 15% of AI citations.`
      : `Score ${finalScore}/100 — above the 60-point citation threshold. You are being cited. Focus on reaching 70+ to enter the top 15% of AI-ready sites.`,
    findings,
    serviceUpsell: finalScore < 70 ? { name: 'AEO Audit', slug: 'aeo-audit', price: '$5,000', urgency: 'Gartner projects 50% of search traffic will shift to AI by 2026. Every week you delay, competitors cement their citation advantage.' } : null,
  }
}

// ── Pillar 4: GEO — Generative Engine Optimization ───────────────────────────
function scoreGEO(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasEEATSignals) score += 25
  else {
    if (!s.hasAuthorMarkup) findings.push({ severity: 'critical', title: 'No Author E-E-A-T Signals', detail: 'Google and LLMs require clear author expertise signals (E-E-A-T). Anonymous content is down-ranked in generative results.' })
    if (!s.hasPublisherMarkup) findings.push({ severity: 'high', title: 'No Publisher Markup', detail: 'Publisher identity markup helps LLMs verify content origin and authority.' })
    if (!s.hasDatePublished) findings.push({ severity: 'medium', title: 'Missing datePublished', detail: 'LLMs heavily favor fresh, timestamped content for citations. Undated content is considered unreliable.' })
  }

  if (s.hasTopicalHubLinks) score += 15
  else findings.push({ severity: 'high', title: 'No Topical Hub Structure', detail: 'Topical cluster architecture signals deep subject matter expertise to LLMs. Flat site structures are penalized in generative rankings.' })

  if (s.hasResearchCitations) score += 20
  else findings.push({ severity: 'high', title: 'No Research Citations', detail: 'LLMs strongly prefer content that cites peer-reviewed research, studies, or verifiable data sources.' })

  if (s.hasGlossary) score += 15
  else findings.push({ severity: 'medium', title: 'No Glossary / Terminology Hub', detail: 'Brands that define the vocabulary of their industry dominate generative AI results for category keywords.' })

  if (s.hasArticleSchema) score += 15
  else findings.push({ severity: 'medium', title: 'No Article Schema', detail: 'Article/BlogPosting schema tells LLMs your content is authoritative editorial content, not just marketing copy.' })

  if (s.internalLinkCount > 50) score += 10
  else if (s.internalLinkCount > 20) score += 5

  return {
    key: 'geo',
    label: 'Generative Engine Optimization',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: score < 30 ? 'Your site lacks the E-E-A-T signals and topical depth that generative AI requires to cite your brand.' : score < 60 ? 'Moderate GEO coverage. Building topical authority will accelerate AI citation frequency.' : 'Strong GEO foundation. Continue content depth and E-E-A-T reinforcement.',
    findings,
    serviceUpsell: score < 60 ? { name: 'GEO Implementation', slug: 'geo-implementation', price: '$7,500', urgency: 'After 12 months of GEO, most clients see 15–40% of relevant AI queries cite their domain. You are currently at 0%.' } : null,
  }
}

// ── Pillar 5: SEO Foundation ──────────────────────────────────────────────────
function scoreSEO(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasSSL) score += 15
  else findings.push({ severity: 'critical', title: 'No HTTPS', detail: 'Your site is not secured with SSL. This disqualifies you from most AI agent integrations and modern search indexing.' })

  if (s.hasTitle && s.titleLength >= 30 && s.titleLength <= 60) score += 15
  else if (s.hasTitle) score += 8
  else findings.push({ severity: 'critical', title: 'Missing or Invalid Title Tag', detail: `Title tag is ${s.titleLength} characters. Optimal is 30-60. This directly harms AI search snippet generation.` })

  if (s.hasDescription && s.descriptionLength >= 120 && s.descriptionLength <= 160) score += 15
  else if (s.hasDescription) score += 8
  else findings.push({ severity: 'high', title: 'Meta Description Issues', detail: `Description is ${s.descriptionLength} characters. LLMs use meta descriptions to understand page purpose.` })

  if (s.hasCanonical) score += 10
  else findings.push({ severity: 'medium', title: 'No Canonical Tag', detail: 'Without canonical tags, duplicate content signals confuse AI crawlers and reduce citation authority.' })

  if (s.hasRobotsTxt) score += 10
  else findings.push({ severity: 'high', title: 'No robots.txt', detail: 'AI crawlers need robots.txt to understand crawl permissions. Missing it means AI agents may skip your site.' })

  if (s.hasSitemap) score += 10
  else findings.push({ severity: 'high', title: 'No XML Sitemap', detail: 'AI indexers use sitemaps to discover all pages. Without one, large sections of your site may never be indexed by AI.' })

  if (s.hasMobileViewport) score += 10
  else findings.push({ severity: 'medium', title: 'No Mobile Viewport', detail: 'Mobile-first indexing is standard. AI tools preferentially crawl mobile-optimized pages.' })

  if (s.hasH1 && s.h1Count === 1) score += 10
  else if (s.h1Count > 1) findings.push({ severity: 'medium', title: `Multiple H1 Tags (${s.h1Count})`, detail: 'Multiple H1 tags confuse AI page hierarchy parsing. Each page should have exactly one H1.' })
  else findings.push({ severity: 'high', title: 'Missing H1 Tag', detail: 'H1 is the primary content signal for AI indexers. Every page must have exactly one descriptive H1.' })

  if (s.imagesMissingAlt === 0) score += 5
  else findings.push({ severity: 'low', title: `${s.imagesMissingAlt} Images Without Alt Text`, detail: 'Missing alt text reduces accessibility and AI comprehension of visual content.' })

  return {
    key: 'seo',
    label: 'SEO Foundation',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: score < 40 ? 'Critical SEO gaps are undermining both traditional search and AI discoverability.' : score < 70 ? 'SEO fundamentals are partially in place. Address remaining gaps to solidify AI indexing.' : 'Strong SEO foundation. This supports your AI visibility across all channels.',
    findings,
    serviceUpsell: null,
  }
}

// ── Pillar 6: Social Authority ────────────────────────────────────────────────
function scoreSocial(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasLinkedIn) score += 20
  else findings.push({ severity: 'high', title: 'No LinkedIn Profile Linked', detail: 'LinkedIn is the #1 social signal for B2B AI authority. LLMs validate business credibility via LinkedIn presence.' })

  if (s.hasTwitter) score += 15
  else findings.push({ severity: 'medium', title: 'No Twitter/X Profile Linked', detail: 'Twitter/X signals are indexed by LLMs for real-time brand sentiment and thought leadership authority.' })

  if (s.hasYouTube) score += 15
  else findings.push({ severity: 'medium', title: 'No YouTube Channel Linked', detail: 'YouTube content is increasingly used as AI training data and citation source. Video presence increases entity authority.' })

  if (s.hasFacebook) score += 10
  else findings.push({ severity: 'low', title: 'No Facebook Page Linked', detail: 'Facebook signals contribute to entity disambiguation in AI knowledge graphs.' })

  if (s.hasInstagram) score += 10
  else findings.push({ severity: 'low', title: 'No Instagram Linked', detail: 'Instagram presence contributes to brand entity confidence scores used by AI systems.' })

  if (s.socialSameAsInSchema) score += 20
  else findings.push({ severity: 'critical', title: 'Social Profiles Not in Schema (sameAs)', detail: 'Your social profiles are not linked via Schema.org sameAs. This breaks entity disambiguation — AI systems cannot confirm your brand identity across platforms, causing citation errors and hallucinations about your company.' })

  if (s.socialPlatformCount >= 3) score += 10

  return {
    key: 'social',
    label: 'Social Authority Score',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: s.socialPlatformCount === 0 ? 'No social profiles detected. Your brand entity is unverifiable across platforms — a critical trust gap for AI systems.' : `${s.socialPlatformCount} social platform(s) detected. ${s.socialSameAsInSchema ? 'Linked in schema.' : 'NOT linked in schema.org sameAs — critical gap.'}`,
    findings,
    serviceUpsell: score < 50 ? { name: 'Social Media Manager', slug: 'social-media-manager', price: '$6,500 + $1,500/mo', urgency: 'Social authority directly correlates with AI recommendation frequency.' } : null,
  }
}

// ── Pillar 7: Press & PR Coverage ─────────────────────────────────────────────
function scorePress(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasPressPage) score += 20
  else findings.push({ severity: 'critical', title: 'No Press Page', detail: 'AI knowledge graphs use press coverage to validate brand credibility. Without a press page, you cannot be indexed as an authoritative source in your industry.' })

  if (s.hasNewsroomPage) score += 15
  else findings.push({ severity: 'high', title: 'No Newsroom / Media Hub', detail: 'Newsrooms signal active brand communication to AI crawlers. Brands with newsrooms receive 4x more AI citations for industry news queries.' })

  if (s.pressReleaseLinks.length >= 3) score += 20
  else if (s.pressReleaseLinks.length > 0) score += 10
  else findings.push({ severity: 'critical', title: 'No Discoverable Press Releases', detail: 'Press releases are among the highest-authority content for LLM citations. Your brand has zero press coverage indexed by AI systems.' })

  if (s.hasMediaKit) score += 15
  else findings.push({ severity: 'medium', title: 'No Media Kit', detail: 'A media kit provides AI agents with logo assets, company facts, and spokesperson info needed for accurate brand representation.' })

  if (s.hasWikipediaLink) score += 15
  else findings.push({ severity: 'high', title: 'No Wikipedia / Wikidata Entry', detail: 'Wikipedia and Wikidata are primary training sources for all major LLMs. Brands without entries are underrepresented in AI knowledge graphs.' })

  if (s.hasIndustryDirectories) score += 15
  else findings.push({ severity: 'medium', title: 'Not Listed in AI-Indexed Directories', detail: 'Clutch, G2, Capterra, and Trustpilot are heavily indexed by LLMs for business validation. Absence reduces AI recommendation probability.' })

  return {
    key: 'press',
    label: 'Press & PR Coverage',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: score < 25 ? 'CRITICAL: Your brand has virtually no press footprint. AI systems cannot validate your authority, making recommendations rare and hallucinations common.' : score < 60 ? 'Limited press coverage detected. Building PR infrastructure will significantly increase AI citation frequency.' : 'Solid press coverage. Continue expanding media presence to dominate AI brand queries.',
    findings,
    serviceUpsell: score < 50 ? { name: 'Press Syndicator', slug: 'press-syndicator', price: '$6,500 + $3,000/mo', urgency: 'Press releases are the fastest path to AI authority. Brands publishing weekly see 8x more LLM citations.' } : null,
  }
}

// ── Pillar 8: AI Authority ───────────────────────────────────────────────────
function scoreAIAuthority(s: ScanSignals): PillarScore {
  let score = 0
  const findings: Finding[] = []

  if (s.hasOrganizationSchema && s.socialSameAsInSchema) score += 20
  else findings.push({ severity: 'critical', title: 'Unverified Brand Entity', detail: 'AI systems cannot confirm your brand identity. Without a complete Organization schema linked to social profiles, Wikipedia, and directories, LLMs treat your brand as an unverified entity — leading to hallucinations and missed recommendations.' })

  if (s.hasLLMsTxt) score += 15
  else findings.push({ severity: 'high', title: 'No llms.txt Guidance File', detail: 'llms.txt is the emerging standard for instructing AI crawlers on how to index and represent your brand. Early adopters capture disproportionate AI authority.' })

  if (s.hasEEATSignals) score += 15
  else findings.push({ severity: 'high', title: 'Weak E-E-A-T Signals', detail: 'Google and LLMs use Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) to rank content for AI citation. Your signals are insufficient.' })

  if (s.hasResearchCitations) score += 15
  else findings.push({ severity: 'medium', title: 'No Research-Backed Content', detail: 'LLMs strongly prefer content backed by research citations. Publishing data studies, reports, and industry benchmarks creates self-reinforcing AI authority.' })

  if (s.hasPodcastPresence) score += 10
  else findings.push({ severity: 'medium', title: 'No Podcast Presence', detail: 'Podcast transcripts are major LLM training data sources. Brands with podcast presence appear more frequently in conversational AI responses.' })

  if (s.externalCitationEstimate >= 50) score += 15
  else if (s.externalCitationEstimate >= 25) score += 8
  else findings.push({ severity: 'high', title: 'Low External Citation Score', detail: 'Your brand is minimally cited outside your own domain. AI systems require third-party validation to recommend your products and services confidently.' })

  if (s.hasArticleSchema && s.longAnswerBlocks >= 3) score += 10

  return {
    key: 'ai-authority',
    label: 'AI Authority Score',
    score: clamp(score),
    grade: toGrade(score),
    status: toStatus(score),
    summary: score < 25 ? 'Your brand does not register as authoritative to AI systems. You are being overlooked in favor of competitors with established AI authority signals.' : score < 60 ? 'Moderate AI authority. Increasing entity verification and content depth will improve LLM recommendation rates.' : 'Strong AI authority foundation. Focus on expanding the authority flywheel.',
    findings,
    serviceUpsell: score < 60 ? { name: 'Authority Building', slug: 'authority-building', price: '$15,000', urgency: 'AI authority compounds. Every month you delay, competitors build insurmountable citation advantages.' } : null,
  }
}

// ── Pillar 9: LLM Recommendation Score ───────────────────────────────────────
function scoreLLMRecommendation(s: ScanSignals): { pillar: PillarScore; llm: LLMScores } {
  // Each LLM weights different signals
  const baseFactors = {
    hasUCP: s.hasUCPManifest ? 1 : 0,
    hasACP: s.hasACPEndpoint ? 1 : 0,
    hasStructuredData: Math.min(s.schemaTypesFound.length / 8, 1),
    hasFAQ: s.hasFAQSchema ? 1 : 0,
    hasPress: s.hasPressPage ? 1 : 0,
    hasSocial: Math.min(s.socialPlatformCount / 4, 1),
    hasSameAs: s.socialSameAsInSchema ? 1 : 0,
    hasEEAT: s.hasEEATSignals ? 1 : 0,
    hasAgent: (s.hasAgentJson || s.hasAIPlugin) ? 1 : 0,
    hasLLMsTxt: s.hasLLMsTxt ? 1 : 0,
  }

  // ChatGPT: heavily weights ACP, UCP, and structured product data
  const chatgpt = clamp(Math.round((
    baseFactors.hasUCP * 25 +
    baseFactors.hasACP * 25 +
    baseFactors.hasStructuredData * 20 +
    baseFactors.hasFAQ * 10 +
    baseFactors.hasAgent * 10 +
    baseFactors.hasLLMsTxt * 10
  )))

  // Perplexity: heavily weights press, citations, EE-A-T, and fresh content
  const perplexity = clamp(Math.round((
    baseFactors.hasPress * 25 +
    baseFactors.hasEEAT * 25 +
    baseFactors.hasStructuredData * 15 +
    baseFactors.hasFAQ * 15 +
    baseFactors.hasSocial * 10 +
    baseFactors.hasLLMsTxt * 10
  )))

  // Claude: weights entity clarity, schema, E-E-A-T, and agent infrastructure
  const claude = clamp(Math.round((
    baseFactors.hasSameAs * 20 +
    baseFactors.hasEEAT * 20 +
    baseFactors.hasStructuredData * 20 +
    baseFactors.hasUCP * 15 +
    baseFactors.hasLLMsTxt * 15 +
    baseFactors.hasFAQ * 10
  )))

  // Gemini: weights Google-friendly signals (schema, sitemap, E-E-A-T, social)
  const gemini = clamp(Math.round((
    baseFactors.hasStructuredData * 25 +
    baseFactors.hasEEAT * 20 +
    baseFactors.hasSocial * 20 +
    baseFactors.hasFAQ * 15 +
    baseFactors.hasSameAs * 10 +
    baseFactors.hasPress * 10
  )))

  // Bing Copilot: weights LinkedIn, press, structured data
  const copilot = clamp(Math.round((
    baseFactors.hasSocial * 25 +
    baseFactors.hasPress * 25 +
    baseFactors.hasStructuredData * 20 +
    baseFactors.hasEEAT * 15 +
    baseFactors.hasFAQ * 15
  )))

  const avgLLM = Math.round((chatgpt + perplexity + claude + gemini + copilot) / 5)
  const findings: Finding[] = []

  if (avgLLM < 30) findings.push({ severity: 'critical', title: 'AI Agents Cannot Order From You', detail: 'No major LLM would confidently recommend or facilitate a purchase from your brand. You are completely outside the agentic commerce ecosystem.', fixWith: 'ucp-implementation' })
  if (!s.hasACPEndpoint) findings.push({ severity: 'critical', title: 'Cannot Accept Agentic Purchases', detail: 'ChatGPT Instant Checkout, Claude Commerce, and Perplexity Shop require ACP-compatible endpoints. Without this, AI agents literally cannot buy from you.', fixWith: 'acp-integration' })
  if (!s.socialSameAsInSchema) findings.push({ severity: 'high', title: 'LLMs Cannot Verify Brand Identity', detail: 'Without sameAs schema linking your social profiles, LLMs may hallucinate incorrect information about your business when recommending you.' })

  return {
    pillar: {
      key: 'llm-recommendation',
      label: 'LLM Recommendation Score',
      score: avgLLM,
      grade: toGrade(avgLLM),
      status: toStatus(avgLLM),
      summary: avgLLM < 20 ? 'No AI model would reliably recommend your brand for agentic commerce.' : avgLLM < 50 ? `AI models have limited confidence in your brand. ChatGPT: ${chatgpt}/100 · Perplexity: ${perplexity}/100 · Claude: ${claude}/100` : `Strong AI recommendation signals across key LLMs. ChatGPT: ${chatgpt}/100 · Perplexity: ${perplexity}/100`,
      findings,
      serviceUpsell: avgLLM < 50 ? { name: 'Gold Package', slug: 'gold', price: '$48,000 setup + $12,000/mo', urgency: 'Agentic commerce will drive 31% of e-commerce revenue by 2027. Your share is currently $0.' } : null,
    },
    llm: { chatgpt, perplexity, claude, gemini, copilot },
  }
}

// ── Value Levers: 4 high-stakes insight dimensions ───────────────────────────
function computeValueLevers(s: ScanSignals, aeoScore: number, overallScore: number): ValueLevers {

  // ── Lever 1: LLM Crawlability Score (1-10) ────────────────────────────────
  const crawlFactors: CrawlabilityFactor[] = [
    {
      factor: 'Page Load Speed',
      pass: s.loadTimeMs > 0 && s.loadTimeMs < 4000,
      detail: s.loadTimeMs === 0 ? 'Site did not respond — AI crawlers will time out and skip entirely.' : s.loadTimeMs < 2000 ? `${s.loadTimeMs}ms — excellent. AI bots index fast pages first.` : s.loadTimeMs < 4000 ? `${s.loadTimeMs}ms — acceptable. Under 2,000ms preferred for priority crawling.` : `${s.loadTimeMs}ms — too slow. Googlebot and AI crawlers deprioritize pages over 4s.`,
    },
    {
      factor: 'Server-Side Rendered Content',
      pass: s.htmlLength > 8000 && s.longAnswerBlocks >= 1,
      detail: s.htmlLength < 8000 ? 'Thin HTML detected — content likely loaded via JavaScript, which AI crawlers cannot execute.' : s.longAnswerBlocks < 1 ? 'No substantial text blocks in raw HTML. AI bots cannot extract meaningful content.' : `${s.longAnswerBlocks} substantive paragraph(s) in raw HTML. Good signal for AI extraction.`,
    },
    {
      factor: 'SSL / HTTPS',
      pass: s.hasSSL,
      detail: s.hasSSL ? 'Site secured with HTTPS. Required for all AI agent integrations.' : 'No SSL detected. AI agents and modern crawlers refuse to index non-HTTPS sites.',
    },
    {
      factor: 'Mobile Viewport',
      pass: s.hasMobileViewport,
      detail: s.hasMobileViewport ? 'Mobile viewport declared. AI crawlers use mobile-first indexing.' : 'No mobile viewport tag. AI systems using mobile-first indexing may penalize or skip this site.',
    },
    {
      factor: 'Rich Schema Markup',
      pass: s.schemaTypesFound.length >= 3,
      detail: s.schemaTypesFound.length === 0 ? 'Zero structured data. AI systems have no machine-readable content to extract.' : s.schemaTypesFound.length < 3 ? `Only ${s.schemaTypesFound.length} schema type(s). Minimum 3 needed for reliable AI extraction.` : `${s.schemaTypesFound.length} schema types detected. Good machine-readable signal density.`,
    },
    {
      factor: 'Answer-First Content Structure',
      pass: s.longAnswerBlocks >= 2,
      detail: s.longAnswerBlocks === 0 ? 'No answer-block paragraphs detected. AI systems cannot extract direct answers — they skip to sites that have them.' : s.longAnswerBlocks < 2 ? '1 substantive paragraph found. Aim for 3+ answer-first paragraphs for reliable AI citation.' : `${s.longAnswerBlocks} answer-block paragraphs detected. Strong citation extraction potential.`,
    },
    {
      factor: 'Preload / Performance Hints',
      pass: s.hasPreloadLinks,
      detail: s.hasPreloadLinks ? 'Resource preloading detected. Signals a performance-optimized site to AI crawlers.' : 'No preload hints found. Adding <link rel="preload"> improves perceived load time for all bots.',
    },
  ]

  const passCount = crawlFactors.filter((f) => f.pass).length
  const rawScore = Math.max(1, Math.round((passCount / crawlFactors.length) * 10))
  const llmCrawlabilityScore = rawScore
  const llmCrawlabilityGrade: ValueLevers['llmCrawlabilityGrade'] =
    rawScore >= 9 ? 'A' : rawScore >= 7 ? 'B' : rawScore >= 5 ? 'C' : rawScore >= 3 ? 'D' : 'F'

  // ── Lever 2: Zero-Click Traffic Projection ────────────────────────────────
  // Gartner: 40% of organic search traffic shifts to AI answer engines by 2026
  // Citation rate based on AEO score — what % of that shifted traffic cites you
  const zeroClickRiskPercent = 40  // industry-wide shift (fixed, Gartner projection)
  const citationRate =
    aeoScore >= 80 ? 75 :
    aeoScore >= 60 ? 45 :
    aeoScore >= 40 ? 20 :
    aeoScore >= 20 ? 8 : 3
  const zeroClickCitationRate = citationRate
  // Net loss = % of total organic that shifts away AND you don't capture in AI
  const zeroClickNetLossPercent = Math.round(zeroClickRiskPercent * (1 - citationRate / 100))

  // ── Lever 3: Hallucination & Misinformation Risk ──────────────────────────
  const hallucinationRiskReasons: string[] = []

  if (!s.hasOrganizationSchema) hallucinationRiskReasons.push('No Organization schema — AI cannot verify your legal name, founding date, or contact details')
  if (!s.socialSameAsInSchema) hallucinationRiskReasons.push('Social profiles not linked via sameAs — AI conflates your brand with similarly-named entities')
  if (!s.hasPressPage) hallucinationRiskReasons.push('No press footprint — AI invents brand history from sparse third-party signals')
  if (!s.hasEEATSignals) hallucinationRiskReasons.push('No E-E-A-T signals — AI cannot attribute expertise, generating generic or wrong descriptions of your services')
  if (!s.hasWikipediaLink) hallucinationRiskReasons.push('No Wikipedia/Wikidata entry — primary LLM training source for brand facts is absent')
  if (s.externalCitationEstimate < 25) hallucinationRiskReasons.push('Low external citation count — AI fills gaps with competitor data or fabricated information')

  const hallucinationRiskLevel: ValueLevers['hallucinationRiskLevel'] =
    hallucinationRiskReasons.length >= 5 ? 'critical' :
    hallucinationRiskReasons.length >= 3 ? 'high' :
    hallucinationRiskReasons.length >= 1 ? 'medium' : 'low'

  // ── Lever 4: Shadow Competitor Context ───────────────────────────────────
  // Estimate how many months ahead a competitor who IS protocol-compliant is
  const missingProtocols = [!s.hasUCPManifest, !s.hasACPEndpoint, !s.hasAP2Endpoint].filter(Boolean).length
  const missingAuthority = [!s.hasEEATSignals, !s.hasPressPage, !s.socialSameAsInSchema].filter(Boolean).length
  const competitorAdvantageMonths = Math.min(24, (missingProtocols * 4) + (missingAuthority * 2) + (overallScore < 30 ? 6 : overallScore < 60 ? 3 : 0))

  const protocolGap = !s.hasUCPManifest && !s.hasACPEndpoint
  const authorityGap = !s.hasEEATSignals && !s.hasPressPage
  const shadowCompetitorStatement =
    protocolGap && authorityGap
      ? 'Competitors with agentic protocol stacks (UCP/ACP) and press authority are being recommended by ChatGPT, Perplexity, and Gemini for purchases in your category. Your brand does not appear in these results — not because of price or quality, but because you are technically invisible to AI buying agents.'
      : protocolGap
      ? 'Brands with ACP-compatible checkout endpoints are completing AI-initiated transactions in your category while visitors to your site must find the purchase button themselves. Every AI agent recommendation flows to your protocol-ready competitors.'
      : authorityGap
      ? 'Competitors with structured press coverage and verified E-E-A-T signals are cited as category authorities by Perplexity and Claude. Without these signals, AI systems treat your brand as unverified and route purchase recommendations elsewhere.'
      : 'Your foundational signals are partially in place. Competitors who close remaining gaps first will cement a citation advantage that compounds over 12–18 months as AI training data solidifies.'

  return {
    llmCrawlabilityScore,
    llmCrawlabilityGrade,
    llmCrawlabilityFactors: crawlFactors,
    zeroClickRiskPercent,
    zeroClickCitationRate,
    zeroClickNetLossPercent,
    hallucinationRiskLevel,
    hallucinationRiskReasons,
    competitorAdvantageMonths,
    shadowCompetitorStatement,
  }
}

// ── Master scoring function ───────────────────────────────────────────────────
export function computeScores(signals: ScanSignals): ACRAScores {
  const protocol = scoreProtocol(signals)
  const structuredData = scoreStructuredData(signals)
  const aeo = scoreAEO(signals)
  const geo = scoreGEO(signals)
  const seo = scoreSEO(signals)
  const social = scoreSocial(signals)
  const press = scorePress(signals)
  const aiAuthority = scoreAIAuthority(signals)
  const { pillar: llmPillar, llm } = scoreLLMRecommendation(signals)

  // Weighted overall score
  const overall = clamp(Math.round(
    protocol.score * 0.20 +
    structuredData.score * 0.12 +
    aeo.score * 0.12 +
    geo.score * 0.10 +
    seo.score * 0.10 +
    social.score * 0.08 +
    press.score * 0.10 +
    aiAuthority.score * 0.10 +
    llmPillar.score * 0.08
  ))

  const pillars = [protocol, structuredData, aeo, geo, seo, social, press, aiAuthority, llmPillar]

  // Top recommendations across all pillars
  const allFindings = pillars.flatMap((p) => p.findings)
  const topRecommendations = allFindings
    .sort((a, b) => {
      const sev = { critical: 0, high: 1, medium: 2, low: 3 }
      return sev[a.severity] - sev[b.severity]
    })
    .slice(0, 8)

  const valueLevers = computeValueLevers(signals, aeo.score, overall)

  return {
    overall,
    grade: toGrade(overall),
    pillars,
    llm,
    topRecommendations,
    valueLevers,
  }
}
