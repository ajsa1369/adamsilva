import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'
import { buildFAQSchema } from '@/lib/schemas/faq'

// Re-export for use in generateMetadata and generateStaticParams
const HUB_DATA: Record<string, {
  label: string
  tagline: string
  accent: string
  description: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedServices: Array<{ label: string; href: string }>
  relatedInsights: Array<{ label: string; href: string }>
}> = {
  guides: {
    label: 'Guides',
    tagline: 'Step-by-step implementation guides',
    accent: '#0ea5e9',
    description:
      'Practical, actionable guides for implementing agentic commerce protocols, AEO strategies, and AI-ready infrastructure. Built for teams who need to move fast without sacrificing correctness.',
    intro:
      'Adam Silva Consulting publishes battle-tested implementation guides drawn from real client engagements. Every guide maps to a concrete deliverable — not theory, but working infrastructure.',
    sections: [
      {
        heading: '16-Week Agentic Readiness Roadmap',
        body: 'The 16-week roadmap is the master guide for achieving full agentic commerce readiness. It covers UCP manifest publication (weeks 1-4), ACP checkout integration (weeks 5-8), AP2 mandate implementation (weeks 9-12), and authority flywheel activation (weeks 13-16). Each phase has clear deliverables, acceptance criteria, and rollback procedures. See the full roadmap at /insights/16-weeks-agentic-readiness-roadmap.',
      },
      {
        heading: 'UCP Manifest Implementation Guide',
        body: 'Publishing a UCP manifest requires creating a JSON file at /.well-known/ucp/manifest.json that declares your business capabilities, product catalog endpoint, supported transports (REST, MCP, A2A), and authentication methods. The manifest must be valid JSON, served with the correct Content-Type header, and reachable without authentication. See the full protocol deep-dive at /protocols/ucp.',
      },
      {
        heading: 'ACP Checkout Integration Walkthrough',
        body: 'ACP integration requires configuring Stripe SPT (Single-use Payment Tokens), publishing a product feed in ACP format, and registering your checkout endpoint in the UCP manifest. The integration enables ChatGPT Instant Checkout and any ACP-compatible AI agent to complete purchases on behalf of users. Full technical reference at /protocols/acp.',
      },
      {
        heading: 'AP2 Mandate Setup Guide',
        body: 'AP2 mandates are cryptographically signed authorizations that give AI agents verified permission to transact. Setting up AP2 requires implementing Verifiable Credentials (W3C standard), configuring Intent and Cart mandate types, and integrating with your existing checkout for non-repudiation audit trails. See /protocols/ap2 for the complete specification.',
      },
    ],
    faqs: [
      {
        question: 'Where do I start with agentic commerce implementation?',
        answer: 'Start with the free Agentic Commerce Readiness Assessment (ACRA) to assess your current infrastructure against 47 agentic commerce criteria. This produces a prioritized implementation roadmap specific to your tech stack and business model. From there, most clients progress to UCP implementation, then ACP, then AP2.',
      },
      {
        question: 'How long does full protocol stack implementation take?',
        answer: 'The 16-week roadmap covers UCP, ACP, and AP2 implementation plus AEO/GEO content strategy and authority flywheel activation. Individual protocols can be implemented in 4-6 weeks each. Timelines depend on existing infrastructure complexity.',
      },
    ],
    relatedServices: [
      { label: 'ACRA (Free)', href: '/services/acra' },
      { label: 'UCP Protocol Stack', href: '/services/ucp-implementation' },
      { label: 'ACP Checkout Integration', href: '/services/acp-integration' },
    ],
    relatedInsights: [
      { label: '16 Weeks to Agentic Readiness', href: '/insights/16-weeks-agentic-readiness-roadmap' },
      { label: 'The Agentic Commerce Protocols', href: '/insights/agentic-commerce-protocols-ucp-acp-ap2' },
    ],
  },

  'ai-engine-optimization-mastery': {
    label: 'AI Engine Optimization Mastery',
    tagline: 'AEO & GEO: rank in AI answers',
    accent: '#a855f7',
    description:
      'Master Answer Engine Optimization and Generative Engine Optimization — the disciplines that determine whether AI systems cite your brand or your competitors.',
    intro:
      'AI systems — ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini — choose which sources to cite based on structural signals, not keyword density. AEO and GEO are the disciplines for earning those citations.',
    sections: [
      {
        heading: 'Answer Engine Optimization (AEO)',
        body: 'AEO optimizes content to be extracted and cited by AI answer engines. The core techniques are: Answer-First formatting (put the direct answer in the first 40-60 words), FAQPage schema on every page, Speakable schema marking which content AI should read aloud, and structured data that tells AI systems exactly what your content is about. AEO focuses on question-answering interfaces like Google AI Overviews and voice search.',
      },
      {
        heading: 'Generative Engine Optimization (GEO)',
        body: 'GEO optimizes for AI models that generate creative or synthesized responses — ChatGPT, Claude, Gemini. GEO techniques include: brand mention seeding (getting your brand associated with key concepts in training data), E-E-A-T authority signals that survive model training, and topical authority architecture that makes your brand the definitive source AI models cite for your niche.',
      },
      {
        heading: 'Zero-Click Search Strategy',
        body: 'Over 60% of Google searches end without a click. AI-generated answers satisfy users before they visit a website. Winning zero-click means structuring content to be extracted as the answer, not just ranked. This requires concise definitions, numbered lists, comparison tables, and FAQPage schema that AI systems can directly parse and present.',
      },
      {
        heading: 'AEO Audit Methodology',
        body: 'Adam Silva Consulting\'s AEO Audit evaluates 47 criteria across structured data completeness, content formatting, E-E-A-T signals, .well-known endpoint presence, schema coverage, and answer-engine discoverability. The $500 audit delivers a prioritized remediation roadmap with implementation effort estimates for each finding.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between AEO and SEO?',
        answer: 'SEO optimizes for traditional search engines that rank pages for humans to click through. AEO (Answer Engine Optimization) optimizes for AI systems that extract answers directly from content and present them without requiring a click. AEO requires structured data, answer-first formatting, and schema markup that SEO traditionally ignored.',
      },
      {
        question: 'What is GEO and how is it different from AEO?',
        answer: 'GEO (Generative Engine Optimization) optimizes for AI models like ChatGPT, Claude, and Gemini that generate synthesized responses. AEO focuses on getting extracted as the direct answer; GEO focuses on getting cited as an authoritative source in generated content. Both are required for comprehensive AI search visibility.',
      },
      {
        question: 'How do I know if my site is AEO-ready?',
        answer: 'Key AEO readiness signals: FAQ schema on key pages, Speakable schema marking answer-rich content, structured data for Organization and Person entities, Answer-First content formatting, and E-E-A-T signals (author bios, credentials, publication dates). The Adam Silva Consulting AEO Audit checks all 47 criteria for $500.',
      },
    ],
    relatedServices: [
      { label: 'AEO Audit', href: '/services/aeo-audit' },
      { label: 'GEO Implementation', href: '/services/geo-implementation' },
      { label: 'Authority Building', href: '/services/authority-building' },
    ],
    relatedInsights: [
      { label: 'AEO vs. GEO: What\'s the Difference', href: '/insights/aeo-vs-geo-difference' },
      { label: 'Zero-Click Searches', href: '/insights/zero-click-searches-the-new-reality-of-information-discovery' },
      { label: 'Gartner\'s 50% Traffic Decline', href: '/insights/gartner-50-percent-traffic-decline' },
    ],
  },

  'topical-authority-architecture': {
    label: 'Topical Authority Architecture',
    tagline: 'Own entire topic graphs',
    accent: '#f59e0b',
    description:
      'Build hub-and-spoke content architectures that signal to AI systems you are the definitive source on agentic commerce.',
    intro:
      'Topical authority is how AI systems decide which sources to cite when they have multiple options. It is built through deliberate content architecture, consistent E-E-A-T signals, and schema that tells AI what you own.',
    sections: [
      {
        heading: 'Hub-and-Spoke Architecture',
        body: 'Hub pages cover broad topics comprehensively (e.g., Universal Commerce Protocol). Spoke pages cover specific sub-topics and link back to the hub. This creates a topic graph that AI systems can traverse to understand your depth of coverage. Every hub page at adamsilvaconsulting.com/hub/* is a pillar that spokes (blog posts, protocol pages, service pages) link back to.',
      },
      {
        heading: 'DefinedTermSet Schema for AI Citation',
        body: 'The DefinedTermSet schema type marks a page as the authoritative definition of a concept. When AI models encounter an unfamiliar term, they trace it back to sources that have DefinedTermSet schema claiming ownership. Adam Silva Consulting publishes DefinedTermSet schema for UCP, ACP, AP2, AEO, GEO, and 20+ agentic commerce terms at /glossary.',
      },
      {
        heading: 'The Authority Flywheel Explained',
        body: 'The authority flywheel is a 6-pillar compounding cycle: AI Protocols establish machine-readable credibility → AEO/GEO optimization gets content cited → Content & Authority builds the topic graph → Advertising amplifies reach → Lead Generation feeds the pipeline → AI Agents monetize at scale. Each revolution compounds the previous cycle.',
      },
      {
        heading: 'Internal Link Strategy for AI Crawlers',
        body: 'AI crawlers follow links to build topic graphs — they need clear, consistent internal link paths to understand your content hierarchy. Every blog post should link to 3+ service pages and 2+ protocol pages. Every service page links to relevant blog posts. Every protocol page links to case studies. The pattern creates a web AI systems traverse to confirm your authority.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to build topical authority?',
        answer: 'Initial topical authority signals (schema, hub structure, 5+ in-depth articles) can be established in 6-8 weeks. Meaningful AI citation frequency typically emerges after 3-6 months of consistent content publication. The authority flywheel compounds — citations generate more citations over time.',
      },
      {
        question: 'What schema types signal topical authority to AI systems?',
        answer: 'Key schema types for topical authority: DefinedTermSet and DefinedTerm (claim ownership of concepts), DefinedTermSet + Speakable (AI reads your definitions aloud), Organization with knowsAbout property (declare your expertise areas), and ClaimReview (verify statistics AI models cite). All are implemented across adamsilvaconsulting.com.',
      },
    ],
    relatedServices: [
      { label: 'Authority Building Program', href: '/services/authority-building' },
      { label: 'AEO Blog Creator Engine', href: '/services/agent-ready-blog-creator' },
      { label: 'AEO Audit', href: '/services/aeo-audit' },
    ],
    relatedInsights: [
      { label: 'Building Topical Authority', href: '/insights/building-topical-authority' },
      { label: 'The Authority Flywheel', href: '/insights/authority-flywheel-agent-citation-dominance' },
      { label: 'The Integrated Service Ecosystem', href: '/insights/the-integrated-service-ecosystem-strategic-flywheel-analysis' },
    ],
  },

  'technical-framework-excellence': {
    label: 'Technical Framework Excellence',
    tagline: 'SSR, schema, and AI-readable code',
    accent: '#10b981',
    description:
      'Technical best practices for AI-discoverable websites — SSR architecture, JSON-LD schema implementation, token efficiency, hydration optimization, and .well-known endpoint configuration.',
    intro:
      'AI agents and crawlers interact with your website differently than humans. Technical excellence for AI readiness means optimizing for machine parsing, not just human experience.',
    sections: [
      {
        heading: 'Server-Side Rendering for AI Discoverability',
        body: 'AI agents fetch pages and parse HTML. If your site is a React SPA, the agent sees an empty body tag — your entire product catalog, pricing, and descriptions are invisible. SSR (Server-Side Rendering) ensures full page content is in the initial HTML response. Next.js App Router with SSR is the recommended architecture for AI-first web development. See /insights/hydration-tax-client-side-rendering for the full analysis.',
      },
      {
        heading: 'Token Efficiency: Reducing AI Parsing Costs',
        body: 'AI agents pay per token when processing your pages. Bloated HTML, repeated navigation boilerplate, inline scripts, and excessive DOM nesting all increase token costs, making AI agents less likely to crawl deeply. Token efficiency techniques: semantic HTML, minimal inline styles, server-rendered text, and clean JSON-LD that agents parse instead of reconstructing from scattered HTML. See /insights/token-efficiency-make-pages-cheap-to-parse.',
      },
      {
        heading: 'JSON-LD Schema Implementation',
        body: 'JSON-LD (JavaScript Object Notation for Linked Data) is the preferred format for embedding structured data in web pages. It is read by Google, Bing, and AI systems to understand page content. Every page on adamsilvaconsulting.com embeds JSON-LD in <script type="application/ld+json"> tags with Organization, WebSite, BreadcrumbList, and page-specific schema types. The schema library is at lib/schemas/*.',
      },
      {
        heading: '.well-known Endpoint Configuration',
        body: 'The .well-known directory (defined in RFC 8615) is where AI agents look for machine-readable capability declarations. For agentic commerce: /.well-known/ucp/manifest.json declares UCP capabilities, /.well-known/acp/config.json declares ACP checkout endpoints, /.well-known/ap2/mandates.json declares AP2 mandate types. Publishing these files is the first signal that your business is agent-ready.',
      },
    ],
    faqs: [
      {
        question: 'Does my site need to be built in Next.js for AI discoverability?',
        answer: 'No — any SSR framework works (Next.js, Nuxt, SvelteKit, Astro, plain HTML). The requirement is that your pages render full content in the initial HTML response before JavaScript executes. Next.js App Router is recommended for new builds because it makes SSR the default, but existing sites can achieve the same result with proper SSR configuration.',
      },
      {
        question: 'What is the hydration tax?',
        answer: 'The hydration tax is the performance penalty of client-side rendering (CSR). When a page uses CSR, the browser downloads a JavaScript bundle, executes it, fetches data from an API, and then renders content — all before an AI agent or search crawler sees any real content. For a typical React SPA, this can mean AI agents see an empty or partial page. Full explanation at /insights/hydration-tax-client-side-rendering.',
      },
    ],
    relatedServices: [
      { label: 'UCP Protocol Stack', href: '/services/ucp-implementation' },
      { label: 'ACRA (Free)', href: '/services/acra' },
      { label: 'AEO Audit', href: '/services/aeo-audit' },
    ],
    relatedInsights: [
      { label: 'The Hydration Tax', href: '/insights/hydration-tax-client-side-rendering' },
      { label: 'Token Efficiency', href: '/insights/token-efficiency-make-pages-cheap-to-parse' },
      { label: 'Agentic Commerce Protocols', href: '/insights/agentic-commerce-protocols-ucp-acp-ap2' },
    ],
  },

  'ai-powered-content-operations': {
    label: 'AI-Powered Content Operations',
    tagline: 'Scale quality content with AI',
    accent: '#ec4899',
    description:
      'Frameworks for building AI-assisted content workflows that maintain E-E-A-T signals while dramatically increasing output volume.',
    intro:
      'Publishing at scale is no longer optional for topical authority. AI content operations frameworks let you produce 2,000+ word, E-E-A-T-compliant articles faster than any human-only workflow — without sacrificing quality.',
    sections: [
      {
        heading: 'The AI Content Operations Framework',
        body: 'The ASC content ops framework has five stages: (1) Keyword + question research using AI to find zero-click-worthy queries; (2) Outline generation with Answer-First structure and FAQPage schema pre-planned; (3) AI-assisted drafting with human expert review; (4) Schema injection (BlogPosting, FAQPage, BreadcrumbList, ImageObject) automated via template; (5) Video summary generation via Remotion. Each stage reduces manual effort while preserving the E-E-A-T signals AI systems require. See /insights/ai-content-operations-scaling-quality-with-automation.',
      },
      {
        heading: 'E-E-A-T in the Generative AI Era',
        body: 'Google\'s E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) has become the primary signal AI systems use to rank and cite sources. Key E-E-A-T signals: author bios with Person schema and credentials, publication and last-modified dates on every article, source citations with external links to authoritative sources, and consistent topical coverage that demonstrates expertise depth. See /insights/e-e-a-t-in-the-age-of-generative-ai-building-unshakeable-authority.',
      },
      {
        heading: 'Automated Schema Injection Pipelines',
        body: 'Manually adding JSON-LD schema to every article is error-prone and slow. ASC\'s approach: schema templates defined in lib/schemas/* are automatically injected server-side based on page type. BlogPosting schema is generated from Strapi CMS fields. FAQPage schema is stored as structured data in the CMS. ImageObject schema is auto-generated from image filenames following the descriptive naming convention. Zero manual schema work per article.',
      },
      {
        heading: 'Blog-to-Video Automation with Remotion',
        body: 'Every blog post at adamsilvaconsulting.com gets an automatically generated 45-90 second video summary rendered with Remotion. The BlogSummaryVideo composition takes title, excerpt, and key points as props and renders a branded video with TitleCard, KeyPointSlide, and CTASlide compositions. Videos are uploaded to Strapi media and referenced in VideoObject schema on the article page. This doubles the content surface area per article for AI citation.',
      },
    ],
    faqs: [
      {
        question: 'Can AI-generated content rank in AI search engines?',
        answer: 'Yes, with the right E-E-A-T signals. AI-assisted content that includes expert review, accurate information, author attribution, proper schema, and source citations performs well in AI search. The key is treating AI as a drafting assistant with human expert review — not as a fully automated publisher. The ASC content ops framework is designed to maintain E-E-A-T throughout the AI-assisted pipeline.',
      },
      {
        question: 'What length should AI-optimized articles be?',
        answer: 'Minimum 2,000 words for topic authority. The Answer-First format places the direct answer in the first 40-60 words (for AI extraction), followed by full explanation for depth signals. Articles under 1,500 words rarely earn topical authority citations from AI systems. The sweet spot for AI-cited articles is 2,000-2,500 words with clear H2/H3 hierarchy.',
      },
    ],
    relatedServices: [
      { label: 'AEO Blog Creator Engine', href: '/services/agent-ready-blog-creator' },
      { label: 'Strategic Press Syndicator', href: '/services/press-syndicator' },
      { label: 'Authority Building Program', href: '/services/authority-building' },
    ],
    relatedInsights: [
      { label: 'AI Content Operations', href: '/insights/ai-content-operations-scaling-quality-with-automation' },
      { label: 'E-E-A-T in the AI Era', href: '/insights/e-e-a-t-in-the-age-of-generative-ai-building-unshakeable-authority' },
      { label: 'Building Topical Authority', href: '/insights/building-topical-authority' },
    ],
  },

  'marketing-automation-intelligence': {
    label: 'Marketing Automation Intelligence',
    tagline: 'Automate campaigns, qualify leads',
    accent: '#f97316',
    description:
      'AI-driven marketing automation strategies — from intent-based lead scoring and enrichment pipelines to omnichannel nurturing sequences and AI-native advertising.',
    intro:
      'Modern marketing automation is not just scheduling emails. It is AI-driven intent detection, real-time lead scoring, enrichment pipelines that add context before the first human touch, and omnichannel sequences that adapt based on behavior.',
    sections: [
      {
        heading: 'Intent-Based Lead Scoring with AI',
        body: 'Traditional lead scoring assigns static points for form fills and page visits. AI-based intent scoring analyzes behavioral patterns, company signals (hiring, funding, tech stack), and content consumption to predict purchase intent in real time. The result: sales teams talk to leads who are actually ready to buy, not leads who happened to download a PDF three months ago. See the Lead Enrichment Pipeline service at /services/lead-enrichment.',
      },
      {
        heading: 'Omnichannel Nurturing Automation',
        body: 'Effective nurturing sequences run across email, LinkedIn, retargeting ads, and SMS — triggered by intent signals rather than fixed time intervals. The sequence adapts: a lead who visits the pricing page three times gets a different message than one who only reads blog posts. AI handles the logic; humans write the messages once. The result is consistent follow-up at scale without manual effort. See /services/auto-appointment-setter.',
      },
      {
        heading: 'Lead Scraping and Enrichment Pipeline',
        body: 'The Lead Scraping (Hunter) service finds companies matching your ICP across LinkedIn, job boards, funding databases, and news sources. The Lead Enrichment Pipeline adds email, phone, tech stack, company size, and recent hiring signals to raw leads before they enter your CRM. The combination delivers enriched, intent-scored leads — not just names and email addresses. See /services/lead-scraping and /services/lead-enrichment.',
      },
      {
        heading: 'AI-Native Advertising Optimization',
        body: 'AI advertising campaigns move beyond static audience segments and keyword lists. Real-time bidding adjustments, dynamic creative optimization (DCO), and predictive LTV modeling allow AI systems to optimize for actual revenue outcomes, not just clicks. Combined with AEO/GEO content strategy, paid and organic amplify each other: paid drives initial exposure, organic authority drives trust that converts. See /services/geo-implementation.',
      },
    ],
    faqs: [
      {
        question: 'What marketing automation tools does Adam Silva Consulting work with?',
        answer: 'ASC is tool-agnostic and integrates with HubSpot, Salesforce, Pipedrive, ActiveCampaign, Klaviyo, and custom stacks. The methodology is platform-independent — we implement the intent scoring logic, enrichment pipeline, and nurturing sequences in whatever tools you already use, or recommend the right stack if you are starting fresh.',
      },
      {
        question: 'How does lead scraping work?',
        answer: 'The Lead Scraping (Hunter) service uses AI-powered prospecting tools to find companies and contacts matching your ideal customer profile (ICP) criteria across LinkedIn, job boards, funding databases, news sources, and web signals. Scraping is performed ethically using public data sources and complies with CAN-SPAM, GDPR, and platform terms of service. Enrichment then adds verified contact data and intent signals before leads enter your pipeline.',
      },
    ],
    relatedServices: [
      { label: 'Lead Scraping (Hunter)', href: '/services/lead-scraping' },
      { label: 'Lead Enrichment Pipeline', href: '/services/lead-enrichment' },
      { label: 'Auto-Appointment Setter', href: '/services/auto-appointment-setter' },
    ],
    relatedInsights: [
      { label: 'Marketing Pain Points 2025', href: '/insights/marketing-pain-points-2025-resource-crunch-to-ai-solution' },
      { label: 'The Integrated Service Ecosystem', href: '/insights/the-integrated-service-ecosystem-strategic-flywheel-analysis' },
    ],
  },

  'csr-and-trust-engineering': {
    label: 'CSR & Trust Engineering',
    tagline: 'AI agents that handle customer success',
    accent: '#06b6d4',
    description:
      'Design and deploy AI agents for customer success, support, and trust verification — including AP2 mandate flows, voice agents, and 24/7 automated customer resolution.',
    intro:
      'Customer success at scale requires AI agents that can handle inquiries, verify identity, process payments, and escalate intelligently — all without human intervention for routine cases. Trust engineering ensures every automated action is verifiable and auditable.',
    sections: [
      {
        heading: 'AP2 Trust Layer Architecture',
        body: 'AP2 (Agent Payments Protocol) is the trust layer for agentic transactions. It mandates cryptographically signed authorizations — Intent Mandates (I authorize an AI agent to search and quote) and Cart Mandates (I authorize an AI agent to complete this specific purchase). Every mandate includes Verifiable Credentials (W3C standard) and creates a non-repudiation audit trail. For enterprise deployments, AP2 is the difference between agentic commerce that legal approves and agentic commerce that creates liability. See /protocols/ap2.',
      },
      {
        heading: 'Off-Hours Voice Agent Deployment',
        body: 'The Off-Hours Voice Agent answers calls when your team is unavailable — capturing leads, qualifying intent, answering product questions, and scheduling callbacks. Unlike IVR trees, the voice agent understands natural language and handles unexpected questions. It logs every call, transcribes conversations, and delivers qualified summaries to your CRM. No missed leads at 2am. Deployment typically takes 2-3 weeks. See /services/off-hours-voice-agent.',
      },
      {
        heading: 'Quoting Agent: Automated Proposal Generation',
        body: 'The Quoting Agent takes a prospect inquiry (via chat, email, or API call) and generates a fully scoped proposal — service selection, pricing, timeline, and deliverables — without human involvement for standard engagements. For complex deals, it generates a first-draft proposal that a human refines. The result: proposals delivered in minutes, not days. See /services/quoting-agent.',
      },
      {
        heading: 'Customer Success Automation and Escalation Design',
        body: 'Effective AI customer success requires deliberate escalation design: defining which issues the AI handles autonomously, which trigger human review, and which require immediate escalation. The 24/7 Unified Sales & CS Agent handles tier-1 inquiries autonomously, routes tier-2 cases to the right human with full context, and escalates tier-3 emergencies with priority flags. See /services/unified-sales-agent.',
      },
    ],
    faqs: [
      {
        question: 'What is AP2 and why is it required for agentic transactions?',
        answer: 'AP2 (Agent Payments Protocol, governed by Google) provides cryptographic mandates — signed authorizations that prove an AI agent had explicit human permission to complete a transaction. Without AP2, agentic purchases lack non-repudiation: if an AI agent makes an unauthorized purchase, there is no verifiable proof of authorization. AP2 mandates create an auditable chain of custody from human intent to completed transaction.',
      },
      {
        question: 'How does the Off-Hours Voice Agent handle complex questions?',
        answer: 'The voice agent is trained on your product catalog, pricing, FAQs, and sales scripts. For questions within its training scope, it answers autonomously. For out-of-scope questions, it acknowledges the question, offers to connect the caller with a specialist, captures their contact information, and logs the question for the team. It does not guess or fabricate answers — a key safety requirement for enterprise deployments.',
      },
      {
        question: 'Can AI customer success agents comply with GDPR and CCPA?',
        answer: 'Yes. The Unified Sales & CS Agent is deployable with GDPR/CCPA compliance built in: call recording consent capture, data minimization (transcripts store only necessary information), right-to-deletion workflows, and data retention policies. AP2 mandates also provide the consent documentation trail required for transaction-related data processing.',
      },
    ],
    relatedServices: [
      { label: 'Off-Hours Voice Agent', href: '/services/off-hours-voice-agent' },
      { label: 'Quoting Agent', href: '/services/quoting-agent' },
      { label: 'AP2 Trust Layer', href: '/services/ap2-trust-layer' },
    ],
    relatedInsights: [
      { label: 'AP2 Mandates: Cryptographic Trust', href: '/insights/ap2-mandates-cryptographic-trust' },
      { label: 'Agentic Commerce Protocols', href: '/insights/agentic-commerce-protocols-ucp-acp-ap2' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(HUB_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const hub = HUB_DATA[slug]
  if (!hub) return { title: 'Not Found' }

  return {
    title: `${hub.label} — Authority Hub | Adam Silva Consulting`,
    description: hub.description,
    alternates: { canonical: `${SITE_URL}/authority-hub/${slug}` },
    openGraph: {
      title: `${hub.label} — Authority Hub | Adam Silva Consulting`,
      description: hub.description,
      url: `${SITE_URL}/authority-hub/${slug}`,
    },
  }
}

export default async function AuthorityHubSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const hub = HUB_DATA[slug]
  if (!hub) notFound()

  const schemas = [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}/authority-hub/${slug}#article`,
      headline: `${hub.label} — Authority Hub`,
      description: hub.description,
      url: `${SITE_URL}/authority-hub/${slug}`,
      publisher: { '@id': ORG_ID },
      author: { '@id': ORG_ID },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/authority-hub/${slug}` },
      inLanguage: 'en-US',
    },
    buildFAQSchema(hub.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Authority Hub', url: '/authority-hub' },
      { name: hub.label, url: `/authority-hub/${slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="pt-32 pb-12" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/authority-hub"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
            >
              <ArrowLeft size={12} />
              Authority Hub
            </Link>
            <span style={{ color: 'var(--color-border)' }}>/</span>
            <span
              className="text-xs px-2 py-0.5 rounded font-bold"
              style={{
                fontFamily: 'var(--font-mono)',
                background: `${hub.accent}15`,
                color: hub.accent,
                border: `1px solid ${hub.accent}25`,
              }}
            >
              {hub.tagline}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {hub.label}
          </h1>
          <p
            className="speakable-answer"
            style={{
              color: 'var(--color-muted)',
              fontSize: '1rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {hub.intro}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Article body */}
            <div className="lg:col-span-2 space-y-8">
              {hub.sections.map((section, i) => (
                <div
                  key={i}
                  className="rounded-lg p-6"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `3px solid ${hub.accent}`,
                  }}
                >
                  <h2
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    className="leading-relaxed text-sm"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                  >
                    {section.body}
                  </p>
                </div>
              ))}

              {/* FAQ */}
              <div>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--color-text)',
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {hub.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-5"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <h3
                        className="mb-2 font-bold text-sm"
                        style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)' }}
                      >
                        {faq.question}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Related Services */}
              <div
                className="rounded-lg p-5"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderTop: `3px solid ${hub.accent}`,
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-mono)', color: hub.accent }}
                >
                  Related Services
                </h3>
                <div className="space-y-2">
                  {hub.relatedServices.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className="flex items-center justify-between text-sm py-2 transition-colors group"
                      style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                    >
                      <span className="group-hover:text-[var(--color-text)] transition-colors">{svc.label}</span>
                      <ArrowRight size={11} style={{ color: 'var(--color-muted-2)' }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Insights */}
              <div
                className="rounded-lg p-5"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-2)' }}
                >
                  Related Insights
                </h3>
                <div className="space-y-2">
                  {hub.relatedInsights.map((ins) => (
                    <Link
                      key={ins.href}
                      href={ins.href}
                      className="flex items-start gap-2 text-sm py-1.5 group"
                      style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                    >
                      <span
                        className="inline-block w-1 h-1 rounded-full flex-shrink-0 mt-2"
                        style={{ background: hub.accent }}
                      />
                      <span className="leading-snug group-hover:text-[var(--color-text)] transition-colors">
                        {ins.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className="rounded-lg p-5"
                style={{
                  background: `${hub.accent}08`,
                  border: `1px solid ${hub.accent}25`,
                }}
              >
                <p
                  className="font-bold mb-1.5 text-sm"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                >
                  Ready to implement?
                </p>
                <p
                  className="text-xs mb-4 leading-relaxed"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                >
                  Start with a free Agentic Commerce Readiness Assessment (ACRA) to see exactly where you stand — delivered in 48 hours.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center text-sm"
                >
                  <Zap size={13} className="opacity-80" />
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
