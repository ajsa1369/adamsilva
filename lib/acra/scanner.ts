/**
 * ACRA Scanner — core URL analysis engine
 * Fetches and analyzes a URL across 9 scoring pillars
 */

export interface ScanSignals {
  // Raw HTML / HTTP data
  statusCode: number
  redirectChain: string[]
  htmlLength: number
  loadTimeMs: number
  hasHttps: boolean
  hasWww: boolean

  // Schema.org
  schemaTypesFound: string[]
  missingSchemaTypes: string[]
  hasOrganizationSchema: boolean
  hasProductSchema: boolean
  hasFAQSchema: boolean
  hasBreadcrumbSchema: boolean
  hasLocalBusinessSchema: boolean
  hasSpeakableSchema: boolean
  hasArticleSchema: boolean
  hasReviewSchema: boolean

  // SEO fundamentals
  hasTitle: boolean
  titleLength: number
  hasDescription: boolean
  descriptionLength: number
  hasCanonical: boolean
  hasRobotsTxt: boolean
  hasSitemap: boolean
  hasOpenGraph: boolean
  hasTwitterCard: boolean
  hasH1: boolean
  h1Count: number
  internalLinkCount: number
  imagesMissingAlt: number

  // AEO signals
  hasFAQContent: boolean
  hasQAPairs: boolean
  hasSpeakableContent: boolean
  hasDefinitionMarkup: boolean
  answerSnippetCount: number
  longAnswerBlocks: number

  // GEO signals
  hasAuthorMarkup: boolean
  hasPublisherMarkup: boolean
  hasDatePublished: boolean
  hasEEATSignals: boolean
  hasTopicalHubLinks: boolean
  hasGlossary: boolean
  hasResearchCitations: boolean

  // Protocol compliance
  hasUCPManifest: boolean
  hasACPEndpoint: boolean
  hasAP2Endpoint: boolean
  hasAgentJson: boolean
  hasAIPlugin: boolean
  hasLLMsTxt: boolean
  hasWellKnown: boolean
  ucpManifestValid: boolean

  // Social authority
  socialProfiles: string[]
  socialPlatformCount: number
  hasLinkedIn: boolean
  hasTwitter: boolean
  hasYouTube: boolean
  hasFacebook: boolean
  hasInstagram: boolean
  socialSameAsInSchema: boolean

  // Press & AI Authority
  pressReleaseLinks: string[]
  hasPressPage: boolean
  hasNewsroomPage: boolean
  hasMediaKit: boolean
  hasWikipediaLink: boolean
  hasIndustryDirectories: boolean
  hasPodcastPresence: boolean
  externalCitationEstimate: number

  // Technical
  hasSSL: boolean
  hasMobileViewport: boolean
  hasCoreWebVitalsHints: boolean
  hasPreloadLinks: boolean
  hasStructuredNavigation: boolean
}

const WELL_KNOWN_PATHS = [
  '/.well-known/ucp',
  '/.well-known/ucp/manifest.json',
  '/.well-known/acp',
  '/.well-known/ap2',
  '/agent.json',
  '/ai-plugin.json',
  '/llms.txt',
  '/llms-full.txt',
]

const SOCIAL_PATTERNS: Record<string, RegExp> = {
  linkedin: /linkedin\.com\/(company|in)\//i,
  twitter: /twitter\.com\/|x\.com\//i,
  youtube: /youtube\.com\/(channel|c|user|@)/i,
  facebook: /facebook\.com\//i,
  instagram: /instagram\.com\//i,
}

const PRESS_PATTERNS = [
  /press(-release)?/i,
  /newsroom/i,
  /media(-kit)?/i,
  /news/i,
  /blog/i,
]

function extractJsonLdTypes(html: string): string[] {
  const types: string[] = []
  let m: RegExpExecArray | null
  const re = /"@type"\s*:\s*"([^"]+)"/g
  while ((m = re.exec(html)) !== null) {
    if (!types.includes(m[1])) types.push(m[1])
  }
  return types
}

function extractSocialLinks(html: string): string[] {
  const links: string[] = []
  let m: RegExpExecArray | null
  const re = /href="(https?:\/\/(?:www\.)?(linkedin|twitter|x|youtube|facebook|instagram)\.com[^"]*?)"/gi
  while ((m = re.exec(html)) !== null) {
    if (!links.includes(m[1])) links.push(m[1])
  }
  return links
}

function extractPressLinks(html: string, baseUrl: string): string[] {
  const links: string[] = []
  let m: RegExpExecArray | null
  const re = /href="([^"]+)"/g
  while ((m = re.exec(html)) !== null) {
    const href = m[1]
    if (PRESS_PATTERNS.some((p) => p.test(href))) {
      const full = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`
      if (!links.includes(full)) links.push(full)
    }
  }
  return links.slice(0, 10)
}

async function checkEndpoint(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(4000),
      headers: { 'User-Agent': 'ACRABot/1.0 (+https://adamsilvaconsulting.com)' },
    })
    return res.status < 400
  } catch {
    return false
  }
}

export async function scanUrl(rawUrl: string): Promise<ScanSignals> {
  const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  const urlObj = new URL(url)
  const origin = urlObj.origin

  const start = Date.now()

  // Fetch main page
  let html = ''
  let statusCode = 0
  let loadTimeMs = 0
  let redirectChain: string[] = []

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(12000),
      headers: { 'User-Agent': 'ACRABot/1.0 (+https://adamsilvaconsulting.com)' },
      redirect: 'follow',
    })
    statusCode = res.status
    loadTimeMs = Date.now() - start
    html = await res.text()
    if ((res as Response & { redirected?: boolean }).redirected) redirectChain = [res.url]
  } catch {
    // If fetch fails, return low-signal baseline
    html = ''
    statusCode = 0
    loadTimeMs = 0
  }

  const htmlL = html.toLowerCase()

  // Parallel well-known checks
  const [
    hasUCPManifest,
    hasACPEndpoint,
    hasAP2Endpoint,
    hasAgentJson,
    hasAIPlugin,
    hasLLMsTxt,
    hasRobotsTxt,
    hasSitemap,
  ] = await Promise.all([
    checkEndpoint(`${origin}/.well-known/ucp/manifest.json`),
    checkEndpoint(`${origin}/.well-known/acp`),
    checkEndpoint(`${origin}/.well-known/ap2`),
    checkEndpoint(`${origin}/agent.json`),
    checkEndpoint(`${origin}/ai-plugin.json`),
    checkEndpoint(`${origin}/llms.txt`),
    checkEndpoint(`${origin}/robots.txt`),
    checkEndpoint(`${origin}/sitemap.xml`),
  ])

  const schemaTypesFound = extractJsonLdTypes(html)
  const socialProfiles = extractSocialLinks(html)
  const pressReleaseLinks = extractPressLinks(html, origin)

  // Schema detection
  const hasOrganizationSchema = schemaTypesFound.includes('Organization') || schemaTypesFound.includes('LocalBusiness')
  const hasProductSchema = schemaTypesFound.some((t) => ['Product', 'Service', 'Offer'].includes(t))
  const hasFAQSchema = schemaTypesFound.includes('FAQPage') || schemaTypesFound.includes('Question')
  const hasBreadcrumbSchema = schemaTypesFound.includes('BreadcrumbList')
  const hasLocalBusinessSchema = schemaTypesFound.includes('LocalBusiness')
  const hasSpeakableSchema = schemaTypesFound.includes('SpeakableSpecification')
  const hasArticleSchema = schemaTypesFound.some((t) => ['Article', 'BlogPosting', 'NewsArticle'].includes(t))
  const hasReviewSchema = schemaTypesFound.some((t) => ['Review', 'AggregateRating'].includes(t))

  // Critical schema gaps
  const allDesiredSchema = [
    'Organization', 'Product', 'Service', 'FAQPage', 'BreadcrumbList',
    'SpeakableSpecification', 'Article', 'Review', 'WebPage', 'WebSite',
    'HowTo', 'ItemList', 'VideoObject', 'Person', 'Event',
  ]
  const missingSchemaTypes = allDesiredSchema.filter((t) => !schemaTypesFound.includes(t))

  // SEO signals
  const hasTitle = /<title[^>]*>([^<]{10,})<\/title>/i.test(html)
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const titleLength = titleMatch ? titleMatch[1].trim().length : 0
  const hasDescription = /name="description"/i.test(html)
  const descMatch = html.match(/name="description"\s+content="([^"]+)"/i) || html.match(/content="([^"]+)"\s+name="description"/i)
  const descriptionLength = descMatch ? descMatch[1].trim().length : 0
  const hasCanonical = /rel="canonical"/i.test(html)
  const hasOpenGraph = /property="og:/i.test(html)
  const hasTwitterCard = /name="twitter:card"/i.test(html)
  const hasH1 = /<h1[^>]*>/i.test(html)
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length
  const internalLinkCount = (html.match(/href="\/[^"]*"/g) || []).length
  const imagesMissingAlt = (html.match(/<img(?![^>]*\balt\b)[^>]*>/gi) || []).length

  // AEO signals
  const hasFAQContent = hasFAQSchema || /faq|frequently asked/i.test(html)
  const hasQAPairs = hasFAQSchema || (html.match(/<dt[^>]*>/gi) || []).length > 3
  const hasSpeakableContent = hasSpeakableSchema || /speakable|class="speakable/i.test(html)
  const hasDefinitionMarkup = /<dfn|<abbr/i.test(html)
  const answerSnippetCount = (html.match(/class="[^"]*speakable[^"]*"|itemprop="answer"/gi) || []).length
  const longAnswerBlocks = (html.match(/<p[^>]*>[^<]{200,}<\/p>/gi) || []).length

  // GEO signals
  const hasAuthorMarkup = /itemprop="author"|"@type":"Person"/i.test(html)
  const hasPublisherMarkup = /itemprop="publisher"|"@type":"Organization"/i.test(html)
  const hasDatePublished = /itemprop="datePublished"|"datePublished"/i.test(html)
  const hasEEATSignals = hasAuthorMarkup && hasPublisherMarkup && hasDatePublished
  const hasTopicalHubLinks = (html.match(/hub|pillar|cluster/i) !== null) && internalLinkCount > 20
  const hasGlossary = /glossary|definitions|terminology/i.test(htmlL)
  const hasResearchCitations = /doi\.org|arxiv|research\.gov|pubmed/i.test(html)

  // Social
  const hasLinkedIn = socialProfiles.some((s) => /linkedin/i.test(s))
  const hasTwitter = socialProfiles.some((s) => /twitter|\.x\.com/i.test(s))
  const hasYouTube = socialProfiles.some((s) => /youtube/i.test(s))
  const hasFacebook = socialProfiles.some((s) => /facebook/i.test(s))
  const hasInstagram = socialProfiles.some((s) => /instagram/i.test(s))
  const socialSameAsInSchema = /"sameAs"\s*:/i.test(html) && socialProfiles.length > 0
  const socialPlatformCount = [hasLinkedIn, hasTwitter, hasYouTube, hasFacebook, hasInstagram].filter(Boolean).length

  // Press & AI Authority
  const hasPressPage = pressReleaseLinks.some((l) => /press|newsroom|media/i.test(l))
  const hasNewsroomPage = pressReleaseLinks.some((l) => /newsroom/i.test(l))
  const hasMediaKit = pressReleaseLinks.some((l) => /media.?kit/i.test(l))
  const hasWikipediaLink = /wikipedia\.org/i.test(html)
  const hasIndustryDirectories = /clutch\.co|g2\.com|capterra\.com|trustpilot|bbb\.org/i.test(html)
  const hasPodcastPresence = /podcast|spotify\.com\/show|apple.*podcast/i.test(html)
  const externalCitationEstimate = [hasWikipediaLink, hasIndustryDirectories, hasPodcastPresence, hasNewsroomPage].filter(Boolean).length * 25

  // Technical
  const hasSSL = url.startsWith('https')
  const hasMobileViewport = /name="viewport"/i.test(html)
  const hasCoreWebVitalsHints = /<link[^>]*rel="preload"/i.test(html)
  const hasPreloadLinks = /<link[^>]*rel="preload"/i.test(html)
  const hasStructuredNavigation = /<nav[^>]*>/i.test(html)
  const hasWellKnown = hasUCPManifest || hasACPEndpoint || hasAP2Endpoint || hasAgentJson || hasAIPlugin

  return {
    statusCode,
    redirectChain,
    htmlLength: html.length,
    loadTimeMs,
    hasHttps: hasSSL,
    hasWww: urlObj.hostname.startsWith('www.'),

    schemaTypesFound,
    missingSchemaTypes,
    hasOrganizationSchema,
    hasProductSchema,
    hasFAQSchema,
    hasBreadcrumbSchema,
    hasLocalBusinessSchema,
    hasSpeakableSchema,
    hasArticleSchema,
    hasReviewSchema,

    hasTitle,
    titleLength,
    hasDescription,
    descriptionLength,
    hasCanonical,
    hasRobotsTxt,
    hasSitemap,
    hasOpenGraph,
    hasTwitterCard,
    hasH1,
    h1Count,
    internalLinkCount,
    imagesMissingAlt,

    hasFAQContent,
    hasQAPairs,
    hasSpeakableContent,
    hasDefinitionMarkup,
    answerSnippetCount,
    longAnswerBlocks,

    hasAuthorMarkup,
    hasPublisherMarkup,
    hasDatePublished,
    hasEEATSignals,
    hasTopicalHubLinks,
    hasGlossary,
    hasResearchCitations,

    hasUCPManifest,
    hasACPEndpoint,
    hasAP2Endpoint,
    hasAgentJson,
    hasAIPlugin,
    hasLLMsTxt,
    hasWellKnown,
    ucpManifestValid: hasUCPManifest,

    socialProfiles,
    socialPlatformCount,
    hasLinkedIn,
    hasTwitter,
    hasYouTube,
    hasFacebook,
    hasInstagram,
    socialSameAsInSchema,

    pressReleaseLinks,
    hasPressPage,
    hasNewsroomPage,
    hasMediaKit,
    hasWikipediaLink,
    hasIndustryDirectories,
    hasPodcastPresence,
    externalCitationEstimate,

    hasSSL,
    hasMobileViewport,
    hasCoreWebVitalsHints,
    hasPreloadLinks,
    hasStructuredNavigation,
  }
}
