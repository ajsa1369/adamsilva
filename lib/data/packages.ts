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
 *
 * IMPORTANT: These packages are sales-rep only — deeply discounted
 * vs à la carte pricing. The only difference between tiers is pages.
 * All tiers ship the same agent fleet, full protocol stack, SSR (AI readability) + SPA (speed)
 * architecture, heavy schema, and content assets.
 *
 * Support/maintenance fees begin 100 days after project start OR
 * upon completion of initial setup, whichever comes first.
 */

// ---------------------------------------------------------------------------
// Package Data
// ---------------------------------------------------------------------------

export interface PackagePageData {
  slug: 'genesis' | 'essentials' | 'prime' | 'scale' | 'shopify-starter' | 'shopify-growth'
  name: string
  tagline: string
  setupPrice: number | null    // null = custom pricing
  monthlyPrice: number | null  // null = custom pricing
  setupDisplay: string         // "$16,000" or "From $75,000"
  monthlyDisplay: string       // "$3,500/mo" or "Custom"
  pagesIncluded: number        // pages optimized in setup
  tier1Slots: number | null    // null = unlimited (Scale)
  tier2Slots: number
  tier3Slots: number
  slotsDisplay: string         // "3 T1 / 0 T2 / 0 T3" or "Unlimited"
  isLegacy: boolean            // true for shopify-starter and shopify-growth
  highlighted: boolean         // true for prime (most popular)
  badge: string | null         // "Most Popular" | "Best Value" | null
  highlights: string[]         // 4-6 bullet strings for PricingTable
  features: {                  // for ComparisonTable rows
    blogPostsPerMonth: number | string
    imagesPerPost: string
    pressReleasesPerMonth: number | string
    chatbotChannels: string
    protocolStack: string
    architecture: string
    support: string
    supportDelay: string
  }
  faqs: Array<{ question: string; answer: string }>  // min 3 per tier
  heroDescription: string      // 2-sentence description for /packages/[tier] hero
}

export const PACKAGES: PackagePageData[] = [
  {
    slug: 'genesis',
    name: 'Genesis',
    tagline: 'Full agent fleet — up to 50 pages optimized in setup',
    setupPrice: 16000,
    monthlyPrice: 3500,
    setupDisplay: '$16,000',
    monthlyDisplay: '$3,500/mo',
    pagesIncluded: 50,
    tier1Slots: 3,
    tier2Slots: 0,
    tier3Slots: 0,
    slotsDisplay: '3 T1 / 0 T2 / 0 T3',
    isLegacy: false,
    highlighted: false,
    badge: null,
    highlights: [
      'Up to 50 pages: full JSON-LD schema, AEO/GEO optimization, and protocol endpoints built in setup',
      'AI Commerce Agent — all channels (24/7 lead capture + commerce)',
      'Authority Content Agent — topical map agent builds your content plan; unlimited 2,000-word articles + Remotion video + 3 schema-wrapped images (or 2 images + 1 video)',
      'Press Release Agent — client-scheduled; pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full UCP + ACP + AP2 Gold Standard protocol stack',
      'Support fees begin 100 days after project start or upon setup completion',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 'Client-scheduled',
      chatbotChannels: 'Web + SMS + Voice + WhatsApp',
      protocolStack: 'UCP + ACP + AP2 (Gold Standard)',
      architecture: 'SSR (AI readability) + SPA (speed)',
      support: 'Email',
      supportDelay: 'Starts at 100 days or setup completion',
    },
    faqs: [
      {
        question: 'Who is Genesis for?',
        answer:
          'Genesis is for lean teams or smaller sites (up to 50 pages). You get the exact same agent fleet, protocol stack, and content assets as every other tier — the only difference is the number of pages covered in the initial setup. The setup fee reflects the man hours to implement full JSON-LD schema, AEO/GEO optimization, and protocol endpoints across those pages.',
      },
      {
        question: 'What is the difference between Genesis, Essentials, Prime, and Scale?',
        answer:
          'The agent fleet, protocol stack, architecture, and content assets are identical across all four tiers. The only difference is the number of pages included in the setup: Genesis covers 50 pages, Essentials covers 100 pages, Prime covers 150 pages, Scale covers 250 pages. More pages means more man hours — more JSON-LD schema implementations, more AEO/GEO optimization, more protocol endpoints, more structured data coverage.',
      },
      {
        question: 'What does each Authority Content article include?',
        answer:
          'Every article is 2,000 words, structured for answer engine citation (answer-first paragraphs, SpeakableSpecification markup, FAQ schema, entity linking). It ships with a Remotion-generated video summary with JSON-LD embedded in the video metadata, and 3 PNG images each wrapped in ImageObject schema — or 2 images plus 1 video. This gives AI systems multiple machine-readable entry points into every piece of content.',
      },
      {
        question: 'When do support fees start?',
        answer:
          'Monthly support and maintenance fees do not begin until 100 days after project start or when the initial setup is completed, whichever comes first. This ensures you are only paying for ongoing support once the foundation is built. The ongoing fee keeps your site current as AI protocols and models evolve — because AI is a moving target.',
      },
    ],
    heroDescription:
      'Genesis is the full agent fleet applied to up to 50 pages: JSON-LD schema, AEO/GEO optimization, full Gold Standard protocol stack, and AI Commerce Agent all built in setup. Same agents and protocols as every tier — the difference is scope, not capability.',
  },
  {
    slug: 'essentials',
    name: 'Essentials',
    tagline: 'Full agent fleet — up to 100 pages optimized in setup',
    setupPrice: 28000,
    monthlyPrice: 6500,
    setupDisplay: '$28,000',
    monthlyDisplay: '$6,500/mo',
    pagesIncluded: 100,
    tier1Slots: 6,
    tier2Slots: 1,
    tier3Slots: 0,
    slotsDisplay: '6 T1 / 1 T2 / 0 T3',
    isLegacy: false,
    highlighted: false,
    badge: 'Best Value',
    highlights: [
      'Up to 100 pages: full JSON-LD schema, AEO/GEO optimization, and protocol endpoints built in setup',
      'AI Commerce Agent — all channels (24/7 lead capture + commerce)',
      'Authority Content Agent — topical map agent builds your content plan; unlimited 2,000-word articles + Remotion video + 3 schema-wrapped images (or 2 images + 1 video)',
      'Press Release Agent — client-scheduled; pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full UCP + ACP + AP2 Gold Standard protocol stack + entity graph construction',
      'Support fees begin 100 days after project start or upon setup completion',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 'Client-scheduled',
      chatbotChannels: 'Web + SMS + Voice + WhatsApp',
      protocolStack: 'UCP + ACP + AP2 (Gold Standard)',
      architecture: 'SSR (AI readability) + SPA (speed)',
      support: 'Priority email',
      supportDelay: 'Starts at 100 days or setup completion',
    },
    faqs: [
      {
        question: "What's the difference between Genesis and Essentials?",
        answer:
          'Essentials covers 100 pages in the setup vs 50 for Genesis — more man hours to implement JSON-LD schema, AEO/GEO optimization, and protocol endpoints across a larger site. Essentials also adds entity graph construction (registering your brand across AI knowledge graphs). The agent fleet, protocol stack, and content assets are identical.',
      },
      {
        question: 'What does each Authority Content article include?',
        answer:
          'Every article is 2,000 words, structured for answer engine citation (answer-first paragraphs, SpeakableSpecification markup, FAQ schema, entity linking). It ships with a Remotion-generated video summary with JSON-LD embedded in the video metadata, and 3 PNG images each wrapped in ImageObject schema — or 2 images plus 1 video. The topical map agent determines which articles to write each month based on authority gaps.',
      },
      {
        question: 'What is the entity graph construction?',
        answer:
          'We register your brand entity across the major AI knowledge graphs — Google Knowledge Panel, Wikidata, Crunchbase, LinkedIn Company — and link them via sameAs in your JSON-LD. This gives AI systems a machine-verified identity for your brand, which directly increases LLM recommendation confidence.',
      },
      {
        question: 'When do support fees start?',
        answer:
          'Monthly support and maintenance fees do not begin until 100 days after project start or when the initial setup is completed, whichever comes first. The ongoing fee keeps your site current as AI protocols and models evolve — because AI is a moving target.',
      },
    ],
    heroDescription:
      'Essentials is the full agent fleet applied to up to 100 pages: same agents, same Gold Standard protocol stack as every tier, covering more of your site. More pages means more JSON-LD schema, more AEO/GEO optimization, and more protocol surface area — which directly increases the number of entry points AI systems have into your business.',
  },
  {
    slug: 'prime',
    name: 'Prime',
    tagline: 'Full agent fleet — up to 150 pages optimized in setup',
    setupPrice: 48000,
    monthlyPrice: 12000,
    setupDisplay: '$48,000',
    monthlyDisplay: '$12,000/mo',
    pagesIncluded: 150,
    tier1Slots: 12,
    tier2Slots: 3,
    tier3Slots: 1,
    slotsDisplay: '12 T1 / 3 T2 / 1 T3',
    isLegacy: false,
    highlighted: true,
    badge: 'Most Popular',
    highlights: [
      'Up to 150 pages: full JSON-LD schema, AEO/GEO optimization, and protocol endpoints built in setup',
      'AI Commerce Agent — all channels (24/7 lead capture + commerce)',
      'Authority Content Agent — topical map agent builds your content plan; unlimited 2,000-word articles + Remotion video + 3 schema-wrapped images (or 2 images + 1 video)',
      'Press Release Agent — client-scheduled; pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full UCP + ACP + AP2 Gold Standard protocol stack',
      'Dedicated Client Success Manager',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 'Client-scheduled',
      chatbotChannels: 'Web + SMS + Voice + WhatsApp',
      protocolStack: 'UCP + ACP + AP2 (Gold Standard)',
      architecture: 'SSR (AI readability) + SPA (speed)',
      support: 'Dedicated CSM',
      supportDelay: 'Starts at 100 days or setup completion',
    },
    faqs: [
      {
        question: "What makes Prime the most popular?",
        answer:
          'Prime covers 150 pages in the setup — the largest standard implementation. It includes a Dedicated Client Success Manager and the same full Gold Standard protocol stack, agent fleet, and content assets as every other tier. For most mid-market businesses, 150 pages covers the entire site with room to grow.',
      },
      {
        question: 'How does the topical map agent work?',
        answer:
          'The topical map agent analyzes your domain, competitors, and AI citation gaps to produce a monthly content plan targeting the exact topics where AI systems (ChatGPT, Perplexity, Claude, Gemini) are most likely to cite sources. Every article it schedules is 2,000 words with a Remotion video summary and 3 schema-wrapped images (or 2 images + 1 video) — giving AI systems machine-readable entry points into every piece of content.',
      },
      {
        question: 'How does the Press Release Agent work and what do I need to provide?',
        answer:
          'The Press Release Agent uses pre-populated rules and structure that ASC controls — you cannot break the schema format. JSON-LD entity markup is always included. You set the release schedule yourself and push when you are ready. You bring your own Business Wire or PR Newswire account (billed directly to you) and your own AI API key (also billed to you). ASC provides the agent, the rules, and the schema — you control the timing and distribution costs.',
      },
      {
        question: 'When do support fees start?',
        answer:
          'Monthly support and maintenance fees do not begin until 100 days after project start or when the initial setup is completed, whichever comes first. The ongoing fee keeps your site current as AI protocols and models evolve — because AI is a moving target.',
      },
    ],
    heroDescription:
      'Prime is the full agent fleet applied to up to 150 pages: comprehensive schema coverage, AEO/GEO optimization across your entire site, the full Gold Standard protocol stack, and a Dedicated Client Success Manager. Same agents as every tier — Prime is the sweet spot for mid-market businesses.',
  },
  {
    slug: 'scale',
    name: 'Scale',
    tagline: 'Full agent fleet — up to 250 pages optimized in setup',
    setupPrice: 75000,
    monthlyPrice: 20000,
    setupDisplay: '$75,000',
    monthlyDisplay: '$20,000/mo',
    pagesIncluded: 250,
    tier1Slots: null,
    tier2Slots: 0,
    tier3Slots: 0,
    slotsDisplay: 'Unlimited',
    isLegacy: false,
    highlighted: false,
    badge: null,
    highlights: [
      'Up to 250 pages: full JSON-LD schema, AEO/GEO optimization, and protocol endpoints built in setup',
      'AI Commerce Agent — all channels + custom channel development',
      'Authority Content Agent — unlimited 2,000-word articles, each with Remotion video summary + 3 schema-wrapped images (or 2 images + 1 video)',
      'Press Release Agent — custom cadence; pre-built schema rules + JSON-LD; you bring your syndication account + AI API',
      'Full protocol stack + white-label UCP/ACP/AP2 endpoints',
      '24/7 dedicated agent operations team',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 'Client-scheduled',
      chatbotChannels: 'All + custom',
      protocolStack: 'Full stack + white-label',
      architecture: 'SSR (AI readability) + SPA (speed)',
      support: '24/7 dedicated team',
      supportDelay: 'Starts at 100 days or setup completion',
    },
    faqs: [
      {
        question: 'Who is Scale designed for?',
        answer:
          'Scale is built for enterprises running multi-brand portfolios, high-volume agentic transaction environments, or businesses that want to white-label the entire ASC agent stack for their own clients. It covers up to 250 pages with custom agent training on your full product catalog and business logic.',
      },
      {
        question: 'How is Scale pricing determined?',
        answer:
          'Scale is $75,000 setup with $20,000/month support. The setup fee reflects the man hours to implement full JSON-LD schema, AEO/GEO optimization, and protocol endpoints across 250 pages, plus custom agent training, white-label protocol infrastructure, and dedicated operations. Content production (articles, press releases) scales to your volume — you bring your own syndication accounts and AI API keys so distribution costs are billed directly to you.',
      },
      {
        question: 'What does white-label mean for Scale clients?',
        answer:
          'Scale clients can deploy the full ASC agent stack — commerce agents, press release agents, content agents, and protocol infrastructure — under their own brand. This includes custom protocol endpoints (/.well-known/ucp, /acp, /ap2 under your domain) and branded agent identities for your clients or business units.',
      },
      {
        question: 'When do support fees start?',
        answer:
          'Monthly support and maintenance fees do not begin until 100 days after project start or when the initial setup is completed, whichever comes first. The ongoing fee keeps your site current as AI protocols and models evolve — because AI is a moving target.',
      },
    ],
    heroDescription:
      'Scale is the enterprise agent fleet — up to 250 pages, all channels plus custom channel development, unlimited 2,000-word authority articles with Remotion video summaries and schema-wrapped images, custom press release cadence, white-label protocol infrastructure, and a 24/7 dedicated team managing your entire agentic commerce operation.',
  },
  {
    slug: 'shopify-starter',
    name: 'Shopify Starter',
    tagline: 'AI readiness within Shopify constraints',
    setupPrice: 8500,
    monthlyPrice: 2000,
    setupDisplay: '$8,500',
    monthlyDisplay: '$2,000/mo',
    pagesIncluded: 5,
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
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 1,
      chatbotChannels: 'Web only',
      protocolStack: 'UCP (limited)',
      architecture: 'Shopify',
      support: 'Email',
      supportDelay: 'Starts at 100 days or setup completion',
    },
    faqs: [
      {
        question: 'Why is Shopify limited in protocol compliance?',
        answer:
          "Shopify's SPA architecture imposes the hydration tax — AI agents must download and execute 2MB+ of JavaScript before seeing any content. SSR (Server-Side Rendering) delivers complete HTML on the first request, eliminating this entirely. Beyond the hydration tax, Shopify prevents root-level file placement (blocking UCP discovery), uses proprietary checkout (blocking ACP), and doesn't allow custom security headers (blocking AP2). These are platform-level constraints, not service limitations.",
      },
      {
        question: "What is the 'subdomain blog' for Shopify?",
        answer:
          "Since Shopify's native blog lacks the structured data and performance characteristics needed for AI discovery, we deploy your authority content on a headless subdomain (e.g., blog.yourdomain.com) that achieves full SEO and AI indexing standards.",
      },
      {
        question: 'Can I migrate from Shopify Starter to Prime?',
        answer:
          'Yes — and we recommend it. Migration from Shopify (SPA) to an SSR headless architecture eliminates the hydration tax and unlocks full Gold Standard compliance. AI agents go from seeing a blank page to receiving complete HTML instantly. We handle the migration planning, content transfer, and DNS cutover as part of the upgrade process.',
      },
    ],
    heroDescription:
      'Shopify Starter brings AI chatbot and authority content to Shopify merchants — operating within Shopify\'s architectural constraints with a clear upgrade path to headless Prime.',
  },
  {
    slug: 'shopify-growth',
    name: 'Shopify Growth',
    tagline: 'Maximum AI capability on Shopify',
    setupPrice: 16000,
    monthlyPrice: 4000,
    setupDisplay: '$16,000',
    monthlyDisplay: '$4,000/mo',
    pagesIncluded: 10,
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
      imagesPerPost: '3 images or 2 images + 1 video',
      pressReleasesPerMonth: 2,
      chatbotChannels: 'Web + SMS',
      protocolStack: 'UCP (limited)',
      architecture: 'Shopify',
      support: 'Priority email',
      supportDelay: 'Starts at 100 days or setup completion',
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
    | 'genesis'
    | 'essentials'
    | 'prime'
    | 'scale'
    | 'shopify-starter'
    | 'shopify-growth'
    | 'migration'
  ceiling: string       // human-readable ceiling description
  penalties: string[]   // legacy penalty descriptions (empty array for non-legacy)
}

export const PLATFORM_MATRIX: PlatformEntry[] = [
  {
    slug: 'nextjs-custom',
    name: 'Next.js SSR / Custom Headless',
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
    recommendedPackage: 'prime',
    ceiling:
      'Gold Standard: Full UCP + ACP + AP2 compliance achievable. SSR eliminates the hydration tax — AI agents see complete HTML on first request.',
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
    recommendedPackage: 'essentials',
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
    recommendedPackage: 'essentials',
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
      'Limited: SPA architecture imposes hydration tax — AI agents must execute 2MB+ JavaScript before seeing content. SSR platforms eliminate this entirely. Chatbot + press release only. Blog requires subdomain. No UCP/ACP/AP2.',
    penalties: [
      'SPA Hydration Tax (2MB+ JS) → AI agents must execute JavaScript before seeing content; SSR delivers full HTML instantly',
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
      'Limited: Same SPA hydration tax as Shopify — AI agents cannot read content without JavaScript execution.',
    penalties: [
      'SPA Hydration Tax (2MB+ JS) → AI agents must execute JavaScript before seeing content; SSR delivers full HTML instantly',
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
      'Limited: Same SPA hydration tax as Shopify — AI agents cannot read content without JavaScript execution.',
    penalties: [
      'SPA Hydration Tax (2MB+ JS) → AI agents must execute JavaScript before seeing content; SSR delivers full HTML instantly',
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
      'Limited: Heavy theme SPA hydration tax blocks UCP/ACP/AP2. Blog partially achievable.',
    penalties: [
      'SPA Hydration Tax (2MB+ JS) → AI agents must execute JavaScript before seeing content; SSR delivers full HTML instantly',
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
