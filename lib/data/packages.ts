/**
 * lib/data/packages.ts
 *
 * Single source of truth for all Phase 9 marketing page data.
 * Contains typed pricing data for all 6 package tiers and platform
 * compatibility matrix for all 8 platform types.
 *
 * This file is SEPARATE from lib/integrations/catalog.ts which serves
 * the pricing engine. This file provides richer page-level data for
 * display on /packages, /packages/[tier], and /platform-check pages.
 */

// ---------------------------------------------------------------------------
// Package Data
// ---------------------------------------------------------------------------

export interface PackagePageData {
  slug: 'bronze' | 'silver' | 'gold' | 'core' | 'shopify-starter' | 'shopify-growth'
  name: string
  tagline: string
  setupPrice: number | null    // null = custom pricing (Core)
  monthlyPrice: number | null  // null = custom pricing (Core)
  setupDisplay: string         // "$16,000" or "From $75,000"
  monthlyDisplay: string       // "$3,500/mo" or "Custom"
  tier1Slots: number | null    // null = unlimited (Core)
  tier2Slots: number
  tier3Slots: number
  slotsDisplay: string         // "3 T1 / 0 T2 / 0 T3" or "Unlimited"
  isLegacy: boolean            // true for shopify-starter and shopify-growth
  highlighted: boolean         // true for gold (most popular)
  badge: string | null         // "Most Popular" | "Best Value" | null
  highlights: string[]         // 4-6 bullet strings for PricingTable
  features: {                  // for ComparisonTable rows
    blogPostsPerMonth: number | string
    imagesPerPost: number
    pressReleasesPerMonth: number | string
    chatbotChannels: string
    protocolStack: string
    architecture: string
    support: string
  }
  faqs: Array<{ question: string; answer: string }>  // min 3 per tier
  heroDescription: string      // 2-sentence description for /packages/[tier] hero
}

export const PACKAGES: PackagePageData[] = [
  {
    slug: 'bronze',
    name: 'Bronze',
    tagline: 'Your first AI agent fleet — foundation stack for AI commerce',
    setupPrice: 16000,
    monthlyPrice: 3500,
    setupDisplay: '$16,000',
    monthlyDisplay: '$3,500/mo',
    tier1Slots: 3,
    tier2Slots: 0,
    tier3Slots: 0,
    slotsDisplay: '3 T1 / 0 T2 / 0 T3',
    isLegacy: false,
    highlighted: false,
    badge: null,
    highlights: [
      'AI Commerce Agent — web channel (24/7 lead capture + commerce)',
      'Authority Content Agent (1 article/mo) — 2,000 words + Remotion video summary + 2 schema-wrapped PNG images',
      'Press Release Agent (1/mo) — pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'UCP Discovery Protocol — AI agents can find and read your site',
      'JSON-LD schema library — products, org, and services machine-readable',
      'Continuity plan: model updates + schema evolution included',
    ],
    features: {
      blogPostsPerMonth: 1,
      imagesPerPost: 2,
      pressReleasesPerMonth: 1,
      chatbotChannels: 'Web',
      protocolStack: 'UCP',
      architecture: 'Any headless',
      support: 'Email',
    },
    faqs: [
      {
        question: 'Who is Bronze for?',
        answer:
          'Bronze is for lean teams establishing their AI commerce foundation. You get a live AI Commerce Agent on your site, a monthly 2,000-word authority article with video summary and schema-wrapped images, and a press release pipeline that trains AI systems to understand and cite your business.',
      },
      {
        question: 'What does each Authority Content article include?',
        answer:
          'Every article is 2,000 words, structured for answer engine citation (answer-first paragraphs, SpeakableSpecification markup, FAQ schema, entity linking). It ships with a Remotion-generated video summary with JSON-LD embedded in the video metadata, and 2 PNG images each wrapped in ImageObject schema — giving AI systems multiple machine-readable entry points into the content.',
      },
      {
        question: 'How does the Press Release Agent work and what do I need to provide?',
        answer:
          'The Press Release Agent uses pre-populated rules and structure that ASC controls — you cannot break the schema format. JSON-LD entity markup is always included. You bring your own Business Wire or PR Newswire account (billed directly to you) and your own AI API key (also billed to you). ASC provides the agent, the rules, and the schema — you control the distribution costs.',
      },
    ],
    heroDescription:
      'Bronze deploys your first AI agent fleet: a web commerce agent, a press release agent with pre-built schema rules, and an authority content agent producing 2,000-word articles with Remotion video summaries and schema-wrapped images.',
  },
  {
    slug: 'silver',
    name: 'Silver',
    tagline: 'Multi-channel agent fleet with entity graph and topical authority',
    setupPrice: 28000,
    monthlyPrice: 6500,
    setupDisplay: '$28,000',
    monthlyDisplay: '$6,500/mo',
    tier1Slots: 6,
    tier2Slots: 1,
    tier3Slots: 0,
    slotsDisplay: '6 T1 / 1 T2 / 0 T3',
    isLegacy: false,
    highlighted: false,
    badge: 'Best Value',
    highlights: [
      'AI Commerce Agent — web + SMS channels (24/7 lead capture + commerce)',
      'Authority Content Agent (3 articles/mo) — 2,000 words + Remotion video summary + 2 schema-wrapped PNG images each',
      'Press Release Agent (2/mo) — pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'UCP + ACP (partial) — AI agents can discover and initiate checkout',
      'Entity graph construction — sameAs + knowledge graph registration',
      'Continuity plan: agent retraining + protocol updates included',
    ],
    features: {
      blogPostsPerMonth: 3,
      imagesPerPost: 2,
      pressReleasesPerMonth: 2,
      chatbotChannels: 'Web + SMS',
      protocolStack: 'UCP + ACP (partial)',
      architecture: 'Any headless',
      support: 'Priority email',
    },
    faqs: [
      {
        question: "What's the difference between Bronze and Silver?",
        answer:
          'Silver runs more agents at higher velocity: 3 authority content articles per month vs 1, 2 press releases vs 1, adds SMS as a second commerce agent channel, and implements partial ACP so AI agents can initiate checkout flows on your site. Entity graph construction is also included, registering your brand across AI knowledge graphs.',
      },
      {
        question: 'What does each Authority Content article include at the Silver tier?',
        answer:
          'Every article is 2,000 words, structured for answer engine citation (answer-first paragraphs, SpeakableSpecification markup, FAQ schema, entity linking). It ships with a Remotion-generated video summary with JSON-LD embedded in the video metadata, and 2 PNG images each wrapped in ImageObject schema — giving AI systems multiple machine-readable entry points into the content.',
      },
      {
        question: 'How does the Press Release Agent work and what do I need to provide?',
        answer:
          'The Press Release Agent uses pre-populated rules and structure that ASC controls — you cannot break the schema format. JSON-LD entity markup is always included. You bring your own Business Wire or PR Newswire account (billed directly to you) and your own AI API key (also billed to you). ASC provides the agent, the rules, and the schema — you control the distribution costs.',
      },
      {
        question: 'What is the entity graph construction?',
        answer:
          'We register your brand entity across the major AI knowledge graphs — Google Knowledge Panel, Wikidata, Crunchbase, LinkedIn Company — and link them via sameAs in your JSON-LD. This gives AI systems a machine-verified identity for your brand, which directly increases LLM recommendation confidence.',
      },
    ],
    heroDescription:
      'Silver scales your agent fleet: web and SMS commerce agents, three 2,000-word authority articles per month with Remotion video summaries and schema-wrapped images, two press releases, and entity graph registration that tells AI knowledge graphs exactly who you are and what you sell.',
  },
  {
    slug: 'gold',
    name: 'Gold',
    tagline: 'Full agent fleet — four channels, Gold Standard protocols, maximum AI authority',
    setupPrice: 48000,
    monthlyPrice: 12000,
    setupDisplay: '$48,000',
    monthlyDisplay: '$12,000/mo',
    tier1Slots: 12,
    tier2Slots: 3,
    tier3Slots: 1,
    slotsDisplay: '12 T1 / 3 T2 / 1 T3',
    isLegacy: false,
    highlighted: true,
    badge: 'Most Popular',
    highlights: [
      'AI Commerce Agent — web, SMS, voice, and WhatsApp channels (24/7)',
      'Authority Content Agent (8 articles/mo) — 2,000 words + Remotion video summary + 2 schema-wrapped PNG images each',
      'Press Release Agent (4/mo) — pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full UCP + ACP + AP2 Gold Standard protocol stack',
      'Complete JSON-LD schema library — every entity, product, and service machine-readable',
      'Dedicated Client Success Manager',
    ],
    features: {
      blogPostsPerMonth: 8,
      imagesPerPost: 2,
      pressReleasesPerMonth: 4,
      chatbotChannels: 'Web + SMS + Voice + WhatsApp',
      protocolStack: 'UCP + ACP + AP2 (Gold Standard)',
      architecture: 'Headless required',
      support: 'Dedicated CSM',
    },
    faqs: [
      {
        question: "What makes Gold the 'Gold Standard'?",
        answer:
          'Gold achieves full compliance across all three agentic commerce protocols — UCP for AI discovery, ACP for agent-initiated checkout, and AP2 for cryptographic payment trust. Combined with 4 press releases/month and 8 authority content articles, Gold is the architecture that makes AI systems reliably discover, cite, and transact with your business.',
      },
      {
        question: 'What does each Authority Content article include at the Gold tier?',
        answer:
          'Every article is 2,000 words, structured for answer engine citation (answer-first paragraphs, SpeakableSpecification markup, FAQ schema, entity linking). It ships with a Remotion-generated video summary with JSON-LD embedded in the video metadata, and 2 PNG images each wrapped in ImageObject schema — giving AI systems multiple machine-readable entry points into the content. At 8 articles per month, this builds topical dominance at a pace that compounds quickly.',
      },
      {
        question: 'How does the Press Release Agent work and what do I need to provide?',
        answer:
          'The Press Release Agent uses pre-populated rules and structure that ASC controls — you cannot break the schema format. JSON-LD entity markup is always included. You bring your own Business Wire or PR Newswire account (billed directly to you) and your own AI API key (also billed to you). ASC provides the agent, the rules, and the schema — you control the distribution costs. At 4 releases per month, branded web mentions compound to dramatically increase AI citation frequency.',
      },
      {
        question: 'How do the four AI Commerce Agent channels work together?',
        answer:
          'Each channel — web, SMS, voice, and WhatsApp — connects to the same underlying AI Commerce Agent with shared context. A prospect can start on your website, follow up via SMS, and close over WhatsApp. The agent maintains full conversation history and product knowledge across all four channels.',
      },
    ],
    heroDescription:
      'Gold is the complete agent fleet: four-channel AI Commerce Agent, eight 2,000-word authority articles per month with Remotion video summaries and schema-wrapped images, four press releases with pre-built schema rules, and the full UCP/ACP/AP2 protocol stack that lets AI agents buy from you autonomously.',
  },
  {
    slug: 'core',
    name: 'Core',
    tagline: 'Enterprise-grade with unlimited scale',
    setupPrice: null,
    monthlyPrice: null,
    setupDisplay: 'From $75,000',
    monthlyDisplay: 'Custom',
    tier1Slots: null,
    tier2Slots: 0,
    tier3Slots: 0,
    slotsDisplay: 'Unlimited',
    isLegacy: false,
    highlighted: false,
    badge: null,
    highlights: [
      'Unlimited AI Commerce Agent channels + custom channel development',
      'Authority Content Agent — unlimited 2,000-word articles, each with Remotion video summary + 2 schema-wrapped PNG images',
      'Press Release Agent — custom cadence; pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full protocol stack + white-label UCP/ACP/AP2 endpoints',
      'Custom agent training on your full product catalog and business logic',
      '24/7 dedicated agent operations team',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: 2,
      pressReleasesPerMonth: 'Unlimited',
      chatbotChannels: 'All + custom',
      protocolStack: 'Full stack + white-label',
      architecture: 'Custom',
      support: '24/7 dedicated team',
    },
    faqs: [
      {
        question: 'Who is Core designed for?',
        answer:
          'Core is built for enterprises running multi-brand portfolios, high-volume agentic transaction environments, or businesses that want to white-label the entire ASC agent stack for their own clients. The agents are custom-trained on your full product catalog and business logic.',
      },
      {
        question: 'How is Core pricing determined?',
        answer:
          'Core is custom-quoted based on agent fleet size, number of brands, content production volume, custom channel development, and white-label licensing scope. Setup starts from $75,000 and includes full agent training, protocol implementation, and dedicated operations. Content production (articles, press releases) scales to your volume — you bring your own syndication accounts and AI API keys so distribution costs are billed directly to you.',
      },
      {
        question: 'What does white-label mean for Core clients?',
        answer:
          'Core clients can deploy the full ASC agent stack — commerce agents, press release agents, content agents, and protocol infrastructure — under their own brand. This includes custom protocol endpoints (/.well-known/ucp, /acp, /ap2 under your domain) and branded agent identities for your clients or business units.',
      },
    ],
    heroDescription:
      'Core is the enterprise agent fleet — unlimited channels, unlimited 2,000-word authority articles with Remotion video summaries and schema-wrapped images, custom press release cadence with pre-built schema rules, white-label protocol infrastructure, and a 24/7 dedicated team managing your entire agentic commerce operation.',
  },
  {
    slug: 'shopify-starter',
    name: 'Shopify Starter',
    tagline: 'AI readiness within Shopify constraints',
    setupPrice: 8500,
    monthlyPrice: 2000,
    setupDisplay: '$8,500',
    monthlyDisplay: '$2,000/mo',
    tier1Slots: 2,
    tier2Slots: 0,
    tier3Slots: 0,
    slotsDisplay: '2 T1 / 0 T2 / 0 T3',
    isLegacy: true,
    highlighted: false,
    badge: null,
    highlights: [
      '2 Tier-1 integrations',
      'Chatbot (Web channel)',
      '1 blog post/month via subdomain',
      '1 press release/month',
      'UCP layer (limited)',
      'Email support',
    ],
    features: {
      blogPostsPerMonth: 1,
      imagesPerPost: 3,
      pressReleasesPerMonth: 1,
      chatbotChannels: 'Web only',
      protocolStack: 'UCP (limited)',
      architecture: 'Shopify',
      support: 'Email',
    },
    faqs: [
      {
        question: 'Why is Shopify limited in protocol compliance?',
        answer:
          "Shopify's closed architecture prevents root-level file placement (blocking UCP discovery), uses proprietary checkout (blocking ACP), and doesn't allow custom security headers (blocking AP2). These are platform-level constraints, not service limitations.",
      },
      {
        question: "What is the 'subdomain blog' for Shopify?",
        answer:
          "Since Shopify's native blog lacks the structured data and performance characteristics needed for AI discovery, we deploy your authority content on a headless subdomain (e.g., blog.yourdomain.com) that achieves full SEO and AI indexing standards.",
      },
      {
        question: 'Can I migrate from Shopify Starter to Gold?',
        answer:
          'Yes — and we recommend it. Migration from Shopify to a headless architecture unlocks full Gold Standard compliance. We handle the migration planning, content transfer, and DNS cutover as part of the upgrade process.',
      },
    ],
    heroDescription:
      'Shopify Starter brings AI chatbot and authority content to Shopify merchants — operating within Shopify\'s architectural constraints with a clear upgrade path to headless Gold.',
  },
  {
    slug: 'shopify-growth',
    name: 'Shopify Growth',
    tagline: 'Maximum AI capability on Shopify',
    setupPrice: 16000,
    monthlyPrice: 4000,
    setupDisplay: '$16,000',
    monthlyDisplay: '$4,000/mo',
    tier1Slots: 4,
    tier2Slots: 1,
    tier3Slots: 0,
    slotsDisplay: '4 T1 / 1 T2 / 0 T3',
    isLegacy: true,
    highlighted: false,
    badge: null,
    highlights: [
      '4 T1 + 1 T2 integrations',
      'Chatbot (Web + SMS)',
      '2 blog posts/month via subdomain',
      '2 press releases/month',
      'UCP layer (limited)',
      'Priority support',
    ],
    features: {
      blogPostsPerMonth: 2,
      imagesPerPost: 5,
      pressReleasesPerMonth: 2,
      chatbotChannels: 'Web + SMS',
      protocolStack: 'UCP (limited)',
      architecture: 'Shopify',
      support: 'Priority email',
    },
    faqs: [
      {
        question: 'What does Shopify Growth add vs. Shopify Starter?',
        answer:
          'Shopify Growth doubles your integrations (4 T1 + 1 T2), adds SMS chatbot channel, and increases content production to 2 blog posts and 2 press releases per month — maximizing AI capability within Shopify\'s platform constraints.',
      },
      {
        question: "Why can Shopify achieve UCP but not ACP?",
        answer:
          "Shopify allows limited UCP through workarounds (meta tags, subdomain endpoints), but ACP requires programmatic checkout control that Shopify's proprietary checkout system does not expose. This is a hard architectural ceiling.",
      },
      {
        question: 'When should I consider migrating from Shopify Growth?',
        answer:
          'Consider migration when you need full protocol compliance (ACP checkout, AP2 trust), more than 5 integrations, voice/WhatsApp chatbot channels, or when your monthly AI-attributed revenue exceeds $50,000 — at that point, the ROI on headless migration is immediate.',
      },
    ],
    heroDescription:
      "Shopify Growth maximizes AI capability within Shopify's ecosystem — adding SMS chatbot, more content velocity, and deeper integrations while preserving your existing Shopify investment.",
  },
]

// ---------------------------------------------------------------------------
// Platform Compatibility Matrix
// ---------------------------------------------------------------------------

export type ComplianceLevel = 'full' | 'partial' | 'subdomain' | 'none' | 'migration'

export interface PlatformEntry {
  slug: string
  name: string
  isLegacy: boolean
  compliance: {
    chatbot: ComplianceLevel
    blog: ComplianceLevel
    pressRelease: ComplianceLevel
    ucp: ComplianceLevel
    acp: ComplianceLevel
    ap2: ComplianceLevel
    goldStandard: ComplianceLevel
  }
  recommendedPackage:
    | 'bronze'
    | 'silver'
    | 'gold'
    | 'core'
    | 'shopify-starter'
    | 'shopify-growth'
    | 'migration'
  ceiling: string       // human-readable ceiling description
  penalties: string[]   // legacy penalty descriptions (empty array for non-legacy)
}

export const PLATFORM_MATRIX: PlatformEntry[] = [
  {
    slug: 'nextjs-custom',
    name: 'Next.js / Custom SPA',
    isLegacy: false,
    compliance: {
      chatbot: 'full',
      blog: 'full',
      pressRelease: 'full',
      ucp: 'full',
      acp: 'full',
      ap2: 'full',
      goldStandard: 'full',
    },
    recommendedPackage: 'gold',
    ceiling:
      'Gold Standard: Full UCP + ACP + AP2 compliance achievable',
    penalties: [],
  },
  {
    slug: 'webflow-headless',
    name: 'Webflow (Headless)',
    isLegacy: false,
    compliance: {
      chatbot: 'full',
      blog: 'full',
      pressRelease: 'full',
      ucp: 'partial',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'silver',
    ceiling:
      'Partial: UCP layer achievable, ACP/AP2 require architecture changes',
    penalties: [],
  },
  {
    slug: 'wordpress-light',
    name: 'WordPress (Light Theme)',
    isLegacy: false,
    compliance: {
      chatbot: 'full',
      blog: 'full',
      pressRelease: 'full',
      ucp: 'partial',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'silver',
    ceiling:
      'Partial: UCP achievable with optimization, ACP/AP2 blocked by WordPress checkout architecture',
    penalties: [],
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    isLegacy: true,
    compliance: {
      chatbot: 'full',
      blog: 'subdomain',
      pressRelease: 'full',
      ucp: 'none',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'shopify-starter',
    ceiling:
      'Limited: Chatbot + press release only. Blog requires subdomain. No UCP/ACP/AP2.',
    penalties: [
      'Hydration Tax (2MB+ JS) → -40% agent crawl frequency',
      'Root-Level Restriction → 0% UCP capability discovery',
      'Proprietary Checkout → Cannot implement ACP',
      'No Custom Security Headers → 0% AP2 cryptographic trust score',
    ],
  },
  {
    slug: 'wix',
    name: 'Wix',
    isLegacy: true,
    compliance: {
      chatbot: 'full',
      blog: 'subdomain',
      pressRelease: 'full',
      ucp: 'none',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'shopify-starter',
    ceiling:
      'Limited: Same architectural constraints as Shopify.',
    penalties: [
      'Hydration Tax (2MB+ JS) → -40% agent crawl frequency',
      'Token Inefficiency → AI deprioritizes the site',
      'Root-Level Restriction → 0% UCP capability discovery',
      'Proprietary Checkout → Cannot implement ACP',
      'No Custom Security Headers → 0% AP2 cryptographic trust score',
    ],
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    isLegacy: true,
    compliance: {
      chatbot: 'full',
      blog: 'subdomain',
      pressRelease: 'full',
      ucp: 'none',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'shopify-starter',
    ceiling:
      'Limited: Same architectural constraints as Shopify.',
    penalties: [
      'Hydration Tax (2MB+ JS) → -40% agent crawl frequency',
      'Token Inefficiency → AI deprioritizes the site',
      'Root-Level Restriction → 0% UCP capability discovery',
      'Proprietary Checkout → Cannot implement ACP',
      'No Custom Security Headers → 0% AP2 cryptographic trust score',
    ],
  },
  {
    slug: 'wordpress-heavy',
    name: 'WordPress (Heavy Theme)',
    isLegacy: true,
    compliance: {
      chatbot: 'full',
      blog: 'partial',
      pressRelease: 'full',
      ucp: 'none',
      acp: 'none',
      ap2: 'none',
      goldStandard: 'none',
    },
    recommendedPackage: 'shopify-starter',
    ceiling:
      'Limited: Heavy theme overhead blocks UCP/ACP/AP2. Blog partially achievable.',
    penalties: [
      'Hydration Tax (2MB+ JS) → -40% agent crawl frequency',
      'Token Inefficiency → AI deprioritizes the site',
      'Root-Level Restriction → 0% UCP capability discovery',
      'Proprietary Checkout → Cannot implement ACP',
      'No Custom Security Headers → 0% AP2 cryptographic trust score',
    ],
  },
  {
    slug: 'no-website',
    name: 'No Website Yet',
    isLegacy: false,
    compliance: {
      chatbot: 'migration',
      blog: 'migration',
      pressRelease: 'migration',
      ucp: 'migration',
      acp: 'migration',
      ap2: 'migration',
      goldStandard: 'migration',
    },
    recommendedPackage: 'migration',
    ceiling:
      'Migration path recommended — build headless from scratch for full Gold Standard compliance',
    penalties: [],
  },
]
