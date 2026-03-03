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
    tagline: 'Enterprise AI readiness for lean teams',
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
      '3 Tier-1 integrations included',
      'Chatbot (Web channel)',
      '1 blog post/month',
      '1 press release/month',
      'UCP protocol layer',
      'Email support',
    ],
    features: {
      blogPostsPerMonth: 1,
      imagesPerPost: 3,
      pressReleasesPerMonth: 1,
      chatbotChannels: 'Web only',
      protocolStack: 'UCP',
      architecture: 'Any headless',
      support: 'Email',
    },
    faqs: [
      {
        question: 'Who is Bronze for?',
        answer:
          'Bronze is designed for lean teams entering the agentic commerce space. It provides the foundational AI chatbot, authority content pipeline, and UCP protocol layer needed to establish AI discoverability without a large upfront investment.',
      },
      {
        question: 'What integrations are included in Bronze?',
        answer:
          'Bronze includes 3 Tier-1 integration slots. Tier-1 integrations cover standard tools like CRM connectors, analytics platforms, and email marketing services. You can choose any 3 from our catalog of 20+ Tier-1 options.',
      },
      {
        question: 'Can I upgrade from Bronze later?',
        answer:
          'Yes. All packages are designed for seamless tier progression. When you upgrade from Bronze to Silver or Gold, your existing integrations carry over and we add the new capabilities incrementally — no rebuilds required.',
      },
    ],
    heroDescription:
      'The Bronze package delivers enterprise AI readiness for lean teams — chatbot, blog pipeline, UCP protocol layer, and 3 core integrations at a predictable monthly cost.',
  },
  {
    slug: 'silver',
    name: 'Silver',
    tagline: 'Accelerate lead capture with multi-channel AI',
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
      '6 T1 + 1 T2 integrations',
      'Chatbot (Web + SMS)',
      '3 blog posts/month',
      '2 press releases/month',
      'UCP + partial ACP',
      'Priority support',
    ],
    features: {
      blogPostsPerMonth: 3,
      imagesPerPost: 5,
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
          'Silver doubles your integration capacity (6 T1 + 1 T2 vs 3 T1), adds SMS as a chatbot channel, triples your content velocity to 3 blog posts per month, and introduces partial ACP checkout protocol support for agent-initiated transactions.',
      },
      {
        question: 'What is the SMS chatbot channel?',
        answer:
          'The SMS channel extends your AI chatbot beyond your website. Prospects can text a dedicated number to interact with your AI agent, get answers, and book appointments — capturing leads even when they are not on your site.',
      },
      {
        question: 'Does Silver include ACP checkout?',
        answer:
          'Silver includes partial ACP (Agentic Checkout Protocol) support. This means AI agents can discover your product catalog and initiate checkout flows, but the full cryptographic trust layer (AP2) requires Gold tier.',
      },
    ],
    heroDescription:
      'Silver unlocks SMS-channel chatbot, 3x content velocity, and ACP partial checkout — the right choice for growing teams ready to accelerate lead capture.',
  },
  {
    slug: 'gold',
    name: 'Gold',
    tagline: 'The complete agentic commerce stack',
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
      '12 T1 + 3 T2 + 1 T3 integrations',
      'All 4 channels (Web/SMS/Voice/WhatsApp)',
      '8 blog posts/month',
      '4 press releases/month',
      'Full UCP + ACP + AP2 stack',
      'Dedicated CSM',
    ],
    features: {
      blogPostsPerMonth: 8,
      imagesPerPost: 8,
      pressReleasesPerMonth: 4,
      chatbotChannels: 'Web + SMS + Voice + WhatsApp',
      protocolStack: 'UCP + ACP + AP2 (Gold Standard)',
      architecture: 'Headless required',
      support: 'Dedicated CSM',
    },
    faqs: [
      {
        question: "What does 'Gold Standard' compliance mean?",
        answer:
          'Gold Standard means your site achieves full compliance across all three agentic commerce protocols: UCP (Universal Commerce Protocol) for AI discovery, ACP (Agentic Checkout Protocol) for agent-initiated transactions, and AP2 (Agent Payments Protocol) for cryptographic trust verification.',
      },
      {
        question: 'Which chatbot channels does Gold unlock?',
        answer:
          'Gold provides all four AI chatbot channels: Web (embedded on your site), SMS (text messaging), Voice (phone calls via AI), and WhatsApp (messaging app). Each channel connects to the same AI agent with full context continuity.',
      },
      {
        question: 'What is the AP2 cryptographic trust layer?',
        answer:
          'AP2 (Agent Payments Protocol) adds cryptographic verification to every agent-initiated transaction. It ensures AI purchasing agents can verify your business identity, validate pricing authenticity, and execute secure payments — the highest trust standard in agentic commerce.',
      },
    ],
    heroDescription:
      'Gold delivers the complete agentic commerce stack — all four chatbot channels, full UCP/ACP/AP2 protocol compliance, and a dedicated client success manager to orchestrate your AI transformation.',
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
      'Unlimited integrations',
      'All channels + custom channels',
      'Unlimited content production',
      'Custom press release cadence',
      'Full protocol stack + white-label',
      '24/7 dedicated team',
    ],
    features: {
      blogPostsPerMonth: 'Unlimited',
      imagesPerPost: 10,
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
          'Core is built for enterprise organizations with complex infrastructure requirements — multi-brand portfolios, high-volume transaction environments, or businesses needing white-label agentic commerce capabilities for their own clients.',
      },
      {
        question: 'How is Core pricing determined?',
        answer:
          'Core pricing is custom-quoted based on your specific infrastructure scope: number of brands, integration complexity, content volume requirements, custom channel development, and white-label licensing needs. Setup starts from $75,000.',
      },
      {
        question: 'Does Core include white-label options?',
        answer:
          'Yes. Core is the only tier that includes white-label capability, allowing you to deploy the full agentic commerce stack under your own brand for your clients or business units — including custom protocol endpoints and branded AI agents.',
      },
    ],
    heroDescription:
      'Core is the enterprise tier for organizations that require unlimited scale, white-label capability, and a fully dedicated team — priced custom to your infrastructure requirements.',
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
