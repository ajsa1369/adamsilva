export interface Service {
  id: string
  name: string
  tagline: string
  description: string
  price: string
  priceDisplay: string
  timeline: string
  deliverables: string[]
  features: string[]
  audience: string
  icon: string
  category: 'audit' | 'optimization' | 'automation' | 'protocol' | 'content'
  featured: boolean
}

export const SERVICES: Service[] = [
  {
    id: 'ai-readiness-check',
    name: 'AI Readiness Check',
    tagline: 'Diagnose your agentic commerce readiness in 48 hours',
    description:
      'A comprehensive 48-hour assessment of your current digital infrastructure against agentic commerce standards. We evaluate your structured data, protocol compliance, token efficiency, and authority signals — delivering a prioritized action plan.',
    price: '100',
    priceDisplay: '$100',
    timeline: '48 hours',
    deliverables: [
      'UCP/ACP/AP2 protocol compliance audit',
      'Structured data coverage report',
      'Token efficiency score (vs. ASC benchmark)',
      'Authority signal inventory',
      'Prioritized action plan (PDF)',
    ],
    features: [
      'JSON-LD coverage analysis',
      '.well-known endpoint check',
      'SSR vs. CSR rendering audit',
      'Mobile performance review',
      'Competitive gap analysis',
    ],
    audience: 'Enterprise e-commerce and DTC brands',
    icon: 'CheckCircle',
    category: 'audit',
    featured: false,
  },
  {
    id: 'aeo-audit',
    name: 'AEO Audit',
    tagline: 'Find every gap in your Answer Engine Optimization strategy',
    description:
      'A deep-dive audit of your Answer Engine Optimization posture across ChatGPT, Perplexity, Claude, Gemini, and Bing Copilot. We identify why you\'re not being cited, what\'s missing, and what to do about it.',
    price: '500',
    priceDisplay: '$500',
    timeline: '5 business days',
    deliverables: [
      'AEO gap analysis (12-point framework)',
      'Competitor citation comparison',
      'Schema gap report',
      'Content structure recommendations',
      'Keyword-to-answer mapping',
    ],
    features: [
      'AI citation testing across 5 platforms',
      'Featured snippet opportunity analysis',
      'E-E-A-T signal evaluation',
      'FAQ schema opportunities',
      'Voice search readiness check',
    ],
    audience: 'B2B and B2C brands with existing content',
    icon: 'Search',
    category: 'audit',
    featured: false,
  },
  {
    id: 'geo-implementation',
    name: 'GEO Implementation',
    tagline: 'Optimize your content for generative AI engines',
    description:
      'Full implementation of Generative Engine Optimization across your existing content. We restructure pages, add schema, improve authority signals, and ensure AI models cite your brand as the authoritative source.',
    price: '2500',
    priceDisplay: '$2,500',
    timeline: '2 weeks',
    deliverables: [
      'Schema implementation (all page types)',
      'Content restructuring for AI citation',
      'E-E-A-T signal enhancement',
      'Internal link architecture optimization',
      'Performance report (before/after)',
    ],
    features: [
      'JSON-LD on all pages and images',
      'Answer-First content format',
      'ClaimReview schema on key stats',
      'Speakable markup implementation',
      'Breadcrumb and navigation schema',
    ],
    audience: 'Content-heavy websites and blogs',
    icon: 'Zap',
    category: 'optimization',
    featured: false,
  },
  {
    id: 'authority-building',
    name: 'Authority Building Program',
    tagline: 'Become the definitive source AI agents cite in your market',
    description:
      'A 90-day intensive program that builds your brand into the authoritative source AI agents cite when your topics come up. Combines content strategy, schema architecture, protocol implementation, and flywheel activation.',
    price: '5000',
    priceDisplay: '$5,000',
    timeline: '90 days',
    deliverables: [
      '10× 2,000+ word authority articles',
      'Complete schema architecture',
      'Hub-and-spoke content structure',
      'Topical authority hub pages',
      '90-day citation growth report',
    ],
    features: [
      'Authority flywheel implementation',
      'Primary research publication',
      'DefinedTermSet glossary',
      'ClaimReview fact citations',
      'Monthly AI citation audits',
    ],
    audience: 'Enterprise brands and category leaders',
    icon: 'Award',
    category: 'optimization',
    featured: true,
  },
  {
    id: 'agent-ready-blog-creator',
    name: 'AEO/GEO Blog Creator Engine',
    tagline: 'Automated 2,000+ word articles that dominate AI citations',
    description:
      'A fully automated content production system that creates AEO/GEO-optimized blog articles — 2,000+ words each, with video summaries, proper schema, and internal linking. Scale your authority without scaling your team.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: 'Ongoing',
    deliverables: [
      '4–8 articles/month (2,000+ words each)',
      'Remotion video summary per article',
      'Full schema bundle per post',
      'Internal link strategy per article',
      'Monthly citation growth report',
    ],
    features: [
      'Answer-First format',
      'FAQPage schema per article',
      'VideoObject + BlogPosting schema',
      'Strapi CMS integration',
      'RSS feed for news aggregators',
    ],
    audience: 'Brands needing consistent authority content',
    icon: 'FileText',
    category: 'content',
    featured: true,
  },
  {
    id: 'press-syndicator',
    name: 'Strategic News & Press Syndicator',
    tagline: 'Amplify your authority signals across news networks',
    description:
      'A strategic press syndication program that distributes your thought leadership, protocol announcements, and research publications across news networks — building E-E-A-T signals and driving AI citation authority.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: 'Ongoing',
    deliverables: [
      'Monthly press releases (NewsArticle schema)',
      'News syndication to 50+ outlets',
      'Google News submission',
      'Apple News optimization',
      'Citation tracking report',
    ],
    features: [
      'NewsArticle schema on all releases',
      'FinancialProduct claim citations',
      'Google News compliance',
      'Bing News optimization',
      'Feedly and Flipboard submission',
    ],
    audience: 'Enterprise brands building news authority',
    icon: 'Newspaper',
    category: 'content',
    featured: false,
  },
  {
    id: 'unified-sales-agent',
    name: '24/7 Unified Sales & CS Agent',
    tagline: 'An AI agent that sells and supports like your best rep',
    description:
      'A custom AI sales and customer service agent trained on your products, pricing, protocols, and policies. Handles inbound inquiries, qualifies leads, answers product questions, and initiates ACP checkout — 24/7.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: '4 weeks',
    deliverables: [
      'Custom AI agent deployment',
      'ACP checkout integration',
      'CRM/Supabase integration',
      'Lead qualification rules',
      'Monthly performance report',
    ],
    features: [
      'UCP manifest for agent discovery',
      'ACP checkout capability',
      'Natural language product queries',
      'Lead capture to Supabase',
      'Escalation to human rep',
    ],
    audience: 'E-commerce and SaaS companies',
    icon: 'Bot',
    category: 'automation',
    featured: true,
  },
  {
    id: 'ucp-implementation',
    name: 'UCP Protocol Implementation',
    tagline: 'Make your business discoverable by every AI shopping agent',
    description:
      'Complete implementation of the Universal Commerce Protocol (UCP) — enabling AI agents to discover your capabilities, products, and services through standardized manifest files and capability declarations.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: '2 weeks',
    deliverables: [
      '.well-known/ucp/manifest.json',
      'Capability profile configuration',
      'REST, MCP, and A2A transport bindings',
      'Product capability declarations',
      'UCP v2 compliance verification',
    ],
    features: [
      'UCP v2 spec compliance',
      'Agent discovery testing',
      'Google AI Mode compatibility',
      'Perplexity Shopping integration',
      'Manifest validation and monitoring',
    ],
    audience: 'E-commerce brands and marketplaces',
    icon: 'Network',
    category: 'protocol',
    featured: true,
  },
  {
    id: 'acp-integration',
    name: 'ACP Checkout API Integration',
    tagline: 'Enable AI agents to complete purchases in your store',
    description:
      'Full integration of the Agentic Commerce Protocol (ACP) — enabling AI agents to execute checkout directly in your platform. Includes Stripe SPT setup, delegated payment authorization, and ChatGPT Instant Checkout compatibility.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: '3–4 weeks',
    deliverables: [
      'ACP checkout API endpoints',
      'Stripe SPT integration',
      'Product feed configuration',
      'Delegated payment authorization',
      'ChatGPT Instant Checkout setup',
    ],
    features: [
      'ACP v1 spec compliance',
      'Stripe Payment Token (SPT) support',
      'Agent authentication layer',
      'Order confirmation schemas',
      'Transaction audit logging',
    ],
    audience: 'E-commerce platforms with payment infrastructure',
    icon: 'ShoppingCart',
    category: 'protocol',
    featured: false,
  },
  {
    id: 'ap2-trust-layer',
    name: 'AP2 Mandate & Trust Service',
    tagline: 'Cryptographic trust infrastructure for agentic transactions',
    description:
      'Implementation of the Agent Payments Protocol (AP2) — including Intent and Cart mandates, Verifiable Credentials, x402 crypto payment support, and non-repudiation audit trails. The trust layer that makes agentic commerce legally defensible.',
    price: 'Custom',
    priceDisplay: 'Custom',
    timeline: '4–6 weeks',
    deliverables: [
      '.well-known/ap2/mandates.json',
      'Intent and Cart mandate schemas',
      'Verifiable Credentials integration',
      'x402 payment protocol support',
      'Audit trail implementation',
    ],
    features: [
      'AP2 v1 spec compliance',
      'Cryptographic mandate signing',
      'Non-repudiation architecture',
      'Agent identity verification',
      'Dispute resolution framework',
    ],
    audience: 'Enterprise e-commerce with high transaction value',
    icon: 'Shield',
    category: 'protocol',
    featured: false,
  },
]

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return SERVICES.filter((s) => s.category === category)
}

export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured)
}
