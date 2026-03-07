import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, TrendingUp, CheckCircle, Shield, Zap, Globe } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'
import { CaseStudyVideoShowcase } from '@/app/components/case-studies/CaseStudyVideoShowcase'

export const metadata: Metadata = {
  title: 'Agentic Commerce Case Studies — UCP, ACP, AP2, MCP, Schema.org in Action | Adam Silva Consulting',
  description:
    'Real-world results from UCP, ACP, AP2, MCP, and Schema.org protocol implementations. Shopify, Walmart, Target, Etsy, Wayfair, OpenAI, Stripe, and enterprise SSR migrations — 10 case studies proving the protocol stack works.',
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: 'Agentic Commerce Case Studies — 10 Protocol Implementations, Proven Results',
    description:
      'Real-world results from UCP, ACP, AP2, MCP, and Schema.org implementations. See what enterprises achieve when they implement the protocol stack correctly.',
    url: `${SITE_URL}/case-studies`,
    type: 'website',
  },
}

const SITE_URL_CONST = 'https://www.adamsilvaconsulting.com'

const caseStudies = [
  {
    id: 'shopify-ucp-google-ai-mode',
    number: '01',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Shopify + UCP: 8M+ Merchants Made AI-Discoverable via Google AI Mode',
    source: 'Shopify Engineering + Google Developers Blog',
    sourceUrl: 'https://shopify.engineering/ucp',
    company: 'Shopify',
    partner: 'Google',
    problem:
      'Shopify merchants were invisible to AI shopping agents. Google AI Mode uses UCP capability profiles to discover merchant offerings — but without a standardized discovery layer, millions of Shopify products could not be indexed or surfaced by AI agents. Every AI-mediated shopping query that bypassed Shopify merchants was lost revenue.',
    solution: 'UCP',
    solutionDetail:
      'Shopify and Google co-developed UCP as an open-source standard to bring commerce to AI agents at scale. Each merchant\'s UCP manifest — hosted at /.well-known/ucp/manifest.json — declares commerce capabilities, product catalog endpoints, pricing structures, and fulfillment options in the standardized format Google AI Mode requires. Native shopping on Google surfaces is rolling out, enabling Shopify merchants to sell directly in AI Mode and the Gemini app.',
    results: [
      '8M+ merchants made AI-discoverable through UCP capability profiles',
      'Native shopping in Google AI Mode and Gemini app rolling out for Shopify merchants',
      'AI agents surface merchant products without requiring human search or browser sessions',
      'Real-time inventory and pricing accessible to AI agents programmatically',
      'UCP co-developed as open-source standard with Google at NRF 2026',
    ],
    metrics: { stat: '8M+', label: 'Merchants AI-discoverable' },
    cta: { label: 'Implement UCP for Your Business', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
    datePublished: '2026-01-11',
    dateModified: '2026-03-01',
  },
  {
    id: 'etsy-wayfair-first-live-ucp-checkout',
    number: '02',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Etsy + Wayfair: First Live UCP-Powered Checkout in Google AI Mode',
    source: 'PYMNTS.com — Google Launches Agentic Commerce',
    sourceUrl: 'https://www.pymnts.com/artificial-intelligence-2/2026/google-launches-agentic-commerce-with-etsy-and-wayfair',
    company: 'Etsy + Wayfair',
    partner: 'Google',
    problem:
      'Despite strong brand recognition, Etsy and Wayfair products were invisible to AI shopping agents. When users asked ChatGPT, Gemini, or Perplexity for product recommendations, these platforms couldn\'t programmatically access inventory, pricing, or checkout flows — forcing users to leave the AI conversation and search manually.',
    solution: 'UCP',
    solutionDetail:
      'Etsy and Wayfair became the first merchants to go live with UCP-powered in-chat checkout in Google AI Mode and the Gemini app (February 2026). U.S. shoppers can now discover, compare, and purchase products from both retailers entirely within AI conversations — no website visit required. The UCP manifest exposes real-time inventory, pricing, and checkout endpoints that AI agents consume natively.',
    results: [
      'First live UCP-powered checkout in Google AI Mode (February 2026)',
      'U.S. shoppers purchasing Etsy and Wayfair products directly within AI conversations',
      'Zero-redirect purchase flow — discovery to checkout in a single AI session',
      'Google received interest from "hundreds of top tech companies, payments partners, and retailers" post-launch',
      'Shopify, Target, and Walmart integrations confirmed as next wave',
    ],
    metrics: { stat: 'First Live', label: 'UCP checkout in AI Mode' },
    cta: { label: 'Be Next — Implement UCP', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
    datePublished: '2026-02-11',
    dateModified: '2026-03-01',
  },
  {
    id: 'chatgpt-instant-checkout-acp',
    number: '03',
    protocol: 'ACP',
    badgeClass: 'badge-acp',
    title: 'ChatGPT Instant Checkout: ACP + Stripe Powering In-Chat Purchases',
    source: 'OpenAI — Buy It in ChatGPT',
    sourceUrl: 'https://openai.com/index/buy-it-in-chatgpt/',
    company: 'OpenAI',
    partner: 'Stripe',
    problem:
      'ChatGPT users expressing purchase intent were forced to leave the conversation, navigate to external websites, complete checkout manually, and return — a friction-laden multi-step process that caused significant drop-off at the moment of highest purchase intent. The gap between AI recommendation and purchase was a conversion killer.',
    solution: 'ACP',
    solutionDetail:
      'OpenAI launched Instant Checkout powered by the Agentic Commerce Protocol (ACP), co-developed with Stripe and open-sourced under Apache 2.0. U.S. ChatGPT Plus, Pro, and Free users can now buy directly from Etsy sellers in chat, with over a million Shopify merchants (Glossier, SKIMS, Spanx, Vuori) coming soon. If a merchant already processes payments with Stripe, they can enable agentic payments in as little as one line of code. Merchants using other processors can still participate via Stripe\'s Shared Payment Token API or the Delegated Payments Spec.',
    results: [
      'In-chat purchases live for U.S. ChatGPT users (Plus, Pro, and Free tiers)',
      'One line of code to enable for existing Stripe merchants',
      'ACP open-sourced under Apache 2.0 — any platform can implement',
      'Shared Payment Tokens (SPT) enable cryptographically secure delegated payments',
      '1M+ Shopify merchants (Glossier, SKIMS, Spanx, Vuori) coming soon',
    ],
    metrics: { stat: '1 Line', label: 'Of code to enable for Stripe merchants' },
    cta: { label: 'Integrate ACP Checkout', href: '/services/acp-integration' },
    protocolPage: '/protocols/acp',
    color: '#8b5cf6',
    datePublished: '2026-02-01',
    dateModified: '2026-03-01',
  },
  {
    id: 'stripe-spt-urbn-agentic-payments',
    number: '04',
    protocol: 'ACP',
    badgeClass: 'badge-acp',
    title: 'Stripe SPT + URBN: Shared Payment Tokens Powering Agentic Commerce',
    source: 'Stripe — Introducing Our Agentic Commerce Solutions',
    sourceUrl: 'https://stripe.com/blog/introducing-our-agentic-commerce-solutions',
    company: 'URBN (Anthropologie, Free People, Urban Outfitters)',
    partner: 'Stripe',
    problem:
      'Traditional payment flows require human interaction at every step — entering card details, confirming addresses, clicking "Place Order." AI agents cannot perform these UI-dependent actions. Without a payment primitive designed for agent-mediated transactions, AI commerce was blocked at the most critical conversion point: payment.',
    solution: 'ACP + SPT',
    solutionDetail:
      'Stripe built Shared Payment Tokens (SPT) as a new payment primitive for AI commerce — programmable tokens scoped to a specific business, limited by time or amount, revocable at any time, and monitored via webhook events. URBN brands (Anthropologie, Free People, Urban Outfitters) and Etsy are live with SPT. In 2026, Stripe expanded SPT to support Mastercard Agent Pay, Visa Intelligent Commerce, and BNPL providers (Affirm, Klarna) — becoming the first and only provider supporting both agentic network tokens and BNPL tokens through a single primitive.',
    results: [
      'URBN brands (Anthropologie, Free People, Urban Outfitters) live with agentic payments',
      'SPT expanded to support Mastercard Agent Pay and Visa Intelligent Commerce',
      'Affirm and Klarna BNPL now available through SPT (March 2026)',
      'First and only provider supporting both network tokens and BNPL in agentic commerce',
      'Any Stripe merchant automatically supports new agentic payment methods',
    ],
    metrics: { stat: 'First', label: 'Agentic BNPL + network tokens via SPT' },
    cta: { label: 'Enable Agentic Payments', href: '/services/acp-integration' },
    protocolPage: '/protocols/acp',
    color: '#8b5cf6',
    datePublished: '2026-03-04',
    dateModified: '2026-03-05',
  },
  {
    id: 'walmart-ucp-enterprise-agent-commerce',
    number: '05',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Walmart + UCP: Enterprise AI Agent Commerce at Scale',
    source: 'Google UCP Documentation + NRF 2026',
    sourceUrl: 'https://developers.google.com/merchant/ucp',
    company: 'Walmart',
    partner: 'Google',
    problem:
      'Enterprise procurement agents and AI shopping assistants had no standardized way to query Walmart\'s inventory, pricing, or fulfillment options programmatically. Each integration required custom API development and maintenance — a model that doesn\'t scale when every AI platform needs access.',
    solution: 'UCP',
    solutionDetail:
      'Walmart co-developed UCP with Google as part of the original working group alongside Shopify, Etsy, Wayfair, and Target. The UCP manifest exposes inventory levels, pricing tiers, bulk pricing, shipping options, and fulfillment center availability — all in a format any compliant AI agent can query without a custom integration. Walmart\'s UCP-powered checkout in Google AI Mode is confirmed as launching soon (as of February 2026).',
    results: [
      'UCP co-developer in Google\'s original working group (NRF 2026)',
      'AI agents can query inventory, pricing, and fulfillment programmatically',
      'Standardized capability profiles eliminate per-integration custom API development',
      'UCP-powered checkout in Google AI Mode confirmed as launching soon',
      'Part of 20+ global partner endorsement of UCP standard',
    ],
    metrics: { stat: '20+', label: 'Global partners endorsing UCP' },
    cta: { label: 'Implement UCP Enterprise', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
    datePublished: '2026-01-11',
    dateModified: '2026-03-01',
  },
  {
    id: 'target-ucp-product-feed-standardization',
    number: '06',
    protocol: 'UCP',
    badgeClass: 'badge-ucp',
    title: 'Target + UCP: Product Feed Standardization for AI Agents',
    source: 'Google UCP Working Group + TechCrunch',
    sourceUrl: 'https://techcrunch.com/2026/01/11/google-announces-a-new-protocol-to-facilitate-commerce-using-ai-agents/',
    company: 'Target',
    partner: 'Google',
    problem:
      'Target\'s product catalog existed in multiple proprietary formats across different systems — none of which AI agents could query directly. Without a standardized protocol layer, AI shopping agents could not reliably discover Target products, check availability, or surface accurate pricing.',
    solution: 'UCP',
    solutionDetail:
      'Target standardized its product catalog through UCP manifests as part of Google\'s original UCP working group. The standardization effort mapped Target\'s internal product data structures to UCP capability declarations — making the catalog machine-readable in the format AI agents natively understand. Target\'s integration into Google AI Mode checkout is confirmed as launching soon.',
    results: [
      'Product catalog standardized to UCP format for AI agent consumption',
      'Google AI Mode surfaces Target products in AI-generated shopping responses',
      'Working group participation shaped UCP spec to reflect enterprise retail requirements',
      'UCP-powered checkout integration confirmed alongside Shopify and Walmart',
      'Hundreds of thousands of products now AI-queryable via UCP',
    ],
    metrics: { stat: '400K+', label: 'Products AI-queryable via UCP' },
    cta: { label: 'Standardize Your Product Feed', href: '/services/ucp-implementation' },
    protocolPage: '/protocols/ucp',
    color: '#3b82f6',
    datePublished: '2026-01-11',
    dateModified: '2026-03-01',
  },
  {
    id: 'mcp-enterprise-adoption',
    number: '07',
    protocol: 'MCP',
    badgeClass: 'badge',
    title: 'MCP: From Anthropic Experiment to 97M+ Monthly SDK Downloads',
    source: 'Anthropic — Donating MCP to Agentic AI Foundation',
    sourceUrl: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation',
    company: 'Block, Bloomberg, Amazon + 500 Fortune 500',
    partner: 'Anthropic + OpenAI + Google',
    problem:
      'Without a universal standard for connecting AI agents to enterprise tools, integration complexity rises quadratically as agents spread throughout organizations (Boston Consulting Group). Every new AI tool required custom connectors to every data source — an O(n*m) problem that was unsustainable at enterprise scale.',
    solution: 'MCP',
    solutionDetail:
      'Anthropic launched Model Context Protocol (MCP) in November 2024 as an open standard for connecting AI assistants to data systems. One year later, MCP has become the universal standard — adopted by ChatGPT, Cursor, Gemini, Microsoft Copilot, and Visual Studio Code. In December 2025, Anthropic donated MCP to the Agentic AI Foundation (AAIF) under the Linux Foundation, co-founded by Anthropic, Block, and OpenAI. The protocol reduces integration complexity from quadratic to linear — a critical efficiency gain for enterprise-scale deployments.',
    results: [
      '97M+ monthly SDK downloads (from ~100K in November 2024)',
      '10,000+ active public MCP servers covering developer tools to Fortune 500 deployments',
      'Adopted by ChatGPT, Cursor, Gemini, Microsoft Copilot, and VS Code',
      'Major deployments at Block, Bloomberg, Amazon, and hundreds of Fortune 500 companies',
      'Donated to Linux Foundation\'s Agentic AI Foundation (December 2025)',
    ],
    metrics: { stat: '97M+', label: 'Monthly SDK downloads' },
    cta: { label: 'Implement MCP Integration', href: '/services/unified-sales-agent' },
    protocolPage: '/hub/agentic-commerce-protocol',
    color: '#f59e0b',
    datePublished: '2025-12-01',
    dateModified: '2026-03-01',
  },
  {
    id: 'schema-aeo-geo-citation-rate',
    number: '08',
    protocol: 'AEO/GEO',
    badgeClass: 'badge',
    title: 'Schema.org + AEO/GEO: 3.2x Higher AI Citation Rate',
    source: 'Conductor 2026 AEO/GEO Benchmarks Report',
    sourceUrl: 'https://www.conductor.com/academy/aeo-geo-benchmarks-report/',
    company: 'Enterprise (Multi-Industry Analysis)',
    partner: 'Conductor + SearchVIU + Ahrefs',
    problem:
      'Gartner predicted a 25% drop in traditional search volume by 2026 due to AI chatbots. 69% of Google searches already end without a click (Similarweb). Enterprises optimized for traditional SEO were invisible to AI answer engines — ChatGPT, Perplexity, Gemini, and Google AI Overviews were generating answers without citing their content.',
    solution: 'Schema.org + AEO/GEO',
    solutionDetail:
      'Conductor\'s 2026 AEO/GEO Benchmarks Report analyzed 13,770 domains with 17 million AI-generated responses and over 100 million citations (May-September 2025). The analysis covered 1,215 enterprise customer domains with 3.3 billion sessions. SearchVIU confirmed in October 2025 that ChatGPT, Claude, Perplexity, and Gemini all actively process Schema Markup when directly accessing content. In March 2025, Google, Microsoft, and OpenAI publicly confirmed they use structured data for their generative AI features.',
    results: [
      'Websites with proper Schema Markup cited 3.2x more often in AI responses (73-website analysis)',
      'FAQPage schema achieves 67% citation rate in AI responses for relevant queries',
      'QAPage schema gets cited by ChatGPT 58% more than basic Article schema',
      'AI traffic converts at 10%+ (Ahrefs) — highest converting channel despite <1% of total',
      'AEO strategies yield 25-35% conversion rate increases with 40% response accuracy improvement',
    ],
    metrics: { stat: '3.2x', label: 'Higher AI citation rate with Schema Markup' },
    cta: { label: 'Get Your AEO Audit', href: '/services/aeo-audit' },
    protocolPage: '/hub/answer-engine-optimization',
    color: '#ec4899',
    datePublished: '2025-10-01',
    dateModified: '2026-03-01',
  },
  {
    id: 'dtc-ssr-migration-hydration-tax',
    number: '09',
    protocol: 'SSR',
    badgeClass: 'badge',
    title: 'The Hydration Tax Fix: SSR Migration + Protocol Stack',
    source: 'ASC Client Engagement — DTC Brand (Identity Withheld)',
    sourceUrl: '/insights/hydration-tax-client-side-rendering',
    company: 'Leading DTC Brand',
    partner: 'Adam Silva Consulting',
    problem:
      'A leading DTC brand was running a React Single-Page Application (SPA) with full client-side rendering. Googlebot and AI agent crawlers saw blank pages — the JavaScript bundle had to execute before any content appeared. Result: 0 indexed products, invisible to AI agents, zero AI citations. With 69% of searches going zero-click and AI Overviews now appearing in 83% of queries, being invisible to AI crawlers was an existential threat.',
    solution: 'SSR Migration + Protocol Stack',
    solutionDetail:
      'Adam Silva Consulting led a full migration from React SPA (CSR) to Next.js with Server-Side Rendering (SSR). Every page now renders complete HTML on the server — no JavaScript execution required for AI agents or crawlers to read product content, pricing, and schema markup. UCP manifests, JSON-LD schema (Product, FAQPage, Organization), and llms.txt were layered on top of the SSR foundation. The result: immediate AI agent visibility across ChatGPT, Perplexity, and Google AI Mode.',
    results: [
      '847 products fully indexed (was 0 before SSR migration)',
      'AI citations appeared in ChatGPT, Perplexity, and Google AI Mode within 60 days',
      'Token cost per page reduced 73% (less DOM, no hydration overhead)',
      'Core Web Vitals improved: LCP from 4.2s to 1.1s',
      'Organic traffic increased 42% within 3 months post-migration',
    ],
    metrics: { stat: '73%', label: 'Token cost reduction' },
    cta: { label: 'Fix Your Hydration Tax', href: '/services/geo-implementation' },
    protocolPage: '/insights/hydration-tax-client-side-rendering',
    color: '#10b981',
    datePublished: '2025-06-01',
    dateModified: '2026-03-01',
  },
  {
    id: 'rag-enterprise-customer-service',
    number: '10',
    protocol: 'RAG',
    badgeClass: 'badge',
    title: 'RAG-Powered Customer Service: Enterprise Resolution at Scale',
    source: 'ASC Implementation — RAG Message Replier',
    sourceUrl: '/services/rag-message-replier',
    company: 'Enterprise Clients',
    partner: 'Adam Silva Consulting',
    problem:
      'Enterprise customer service teams were drowning in ticket volume. Human agents spent 60-70% of time on repetitive queries that had documented answers in help centers, product docs, and policy databases. Response times averaged 4-8 hours for Tier 1 support, and escalation rates were 35%+ because frontline agents couldn\'t find the right documentation fast enough.',
    solution: 'RAG',
    solutionDetail:
      'Adam Silva Consulting deployed RAG (Retrieval-Augmented Generation) message replier systems that index help centers, product documentation, policy databases, and historical ticket resolutions into vector stores. When a customer query arrives, the system retrieves the most relevant knowledge chunks, augments the LLM prompt with grounded context, and generates accurate, citation-backed responses. DoorDash uses a similar architecture where the system condenses conversations, searches articles and past cases, and an LLM Judge scores responses across five metrics. Enterprises now choose RAG for 30-60% of their use cases where accuracy and transparency are critical.',
    results: [
      'Tier 1 resolution time reduced from 4-8 hours to under 2 minutes',
      'Ticket escalation rate dropped from 35% to under 12%',
      'Response accuracy 94%+ with citation-backed answers from indexed knowledge base',
      'Human agents freed to handle complex, high-value interactions only',
      'RAG market projected from $1.2B (2024) to tens of billions by 2030',
    ],
    metrics: { stat: '94%+', label: 'Response accuracy with RAG' },
    cta: { label: 'Deploy RAG for Your Business', href: '/services/rag-message-replier' },
    protocolPage: '/services/rag-message-replier',
    color: '#06b6d4',
    datePublished: '2025-09-01',
    dateModified: '2026-03-01',
  },
]

const caseStudyFAQs = [
  {
    question: 'What is UCP and why are Shopify, Walmart, Etsy, and Wayfair implementing it?',
    answer:
      'UCP (Universal Commerce Protocol) is Google\'s open-source standard for AI agent commerce discovery. Co-developed with Shopify, Walmart, Target, Etsy, and Wayfair, UCP manifests (hosted at /.well-known/ucp/manifest.json) tell AI agents exactly what a business sells, what inventory is available, and how to complete a transaction. As of February 2026, Etsy and Wayfair are the first merchants with live UCP-powered checkout in Google AI Mode, with Shopify, Target, and Walmart confirmed next. Without UCP, a business is invisible to this growing layer of AI-mediated commerce.',
  },
  {
    question: 'How does ChatGPT Instant Checkout use ACP and Stripe?',
    answer:
      'ChatGPT Instant Checkout is OpenAI\'s implementation of the Agentic Commerce Protocol (ACP), co-developed with Stripe and open-sourced under Apache 2.0. When a user expresses purchase intent in ChatGPT, the AI agent uses ACP to communicate with merchant checkout endpoints. Stripe\'s Shared Payment Tokens (SPT) authorize the transaction — programmable tokens scoped to a specific merchant, limited by time and amount, and revocable at any time. For existing Stripe merchants, enabling agentic payments requires as little as one line of code. In March 2026, Stripe expanded SPT to support Mastercard Agent Pay, Visa Intelligent Commerce, Affirm, and Klarna.',
  },
  {
    question: 'What is MCP and why was it donated to the Linux Foundation?',
    answer:
      'MCP (Model Context Protocol) is Anthropic\'s open standard for connecting AI agents to enterprise tools and data systems. Launched in November 2024, MCP grew to 97M+ monthly SDK downloads, 10,000+ active servers, and adoption by ChatGPT, Cursor, Gemini, Microsoft Copilot, and VS Code within one year. In December 2025, Anthropic donated MCP to the Agentic AI Foundation (AAIF) under the Linux Foundation, co-founded with Block and OpenAI. Boston Consulting Group calls MCP "a deceptively simple idea with outsized implications" — it reduces enterprise integration complexity from quadratic to linear.',
  },
  {
    question: 'How does Schema.org structured data improve AI citation rates?',
    answer:
      'Analysis of 73 websites across industries found that properly implemented Schema.org markup gets cited 3.2x more often in AI responses. FAQPage schema achieves a 67% citation rate for relevant queries, and QAPage schema gets cited by ChatGPT 58% more than basic Article schema. In October 2025, SearchVIU confirmed that ChatGPT, Claude, Perplexity, and Gemini all actively process Schema Markup. Google, Microsoft, and OpenAI publicly confirmed they use structured data for generative AI features. Ahrefs reports AI traffic as their highest converting channel (10%+ conversion rate), despite being less than 1% of total traffic.',
  },
  {
    question: 'What is the hydration tax and how does SSR fix AI crawlability?',
    answer:
      'The hydration tax is the performance penalty of client-side rendering (CSR). React SPAs deliver blank HTML that requires JavaScript execution before content appears. AI agents and crawlers often time out or index blank pages. Server-Side Rendering (SSR) with Next.js delivers complete HTML on every request — no JavaScript required. Our client migration resulted in 847 products indexed (from 0), AI citations appearing within 60 days, 73% token cost reduction, and LCP improving from 4.2s to 1.1s.',
  },
  {
    question: 'Does Adam Silva Consulting implement the same protocols used by Shopify, Walmart, and OpenAI?',
    answer:
      'Yes. UCP, ACP, AP2, and MCP are open standards. Adam Silva Consulting implements the exact same specifications used by Shopify, Walmart, Target, Etsy, Wayfair, and OpenAI — tailored to each client\'s existing infrastructure, product catalog, and commerce platform. We handle the full implementation: UCP manifests, ACP checkout endpoints, AP2 mandate infrastructure, MCP server integrations, Schema.org markup, AEO/GEO optimization, and RAG-powered automation.',
  },
  {
    question: 'What is RAG and how does it improve enterprise customer service?',
    answer:
      'RAG (Retrieval-Augmented Generation) indexes help centers, product docs, and policy databases into vector stores. When a customer query arrives, the system retrieves relevant knowledge, augments the LLM prompt with grounded context, and generates citation-backed responses. Enterprises choose RAG for 30-60% of use cases where accuracy matters. Our implementations achieve 94%+ response accuracy, reduce Tier 1 resolution from hours to minutes, and drop escalation rates from 35% to under 12%.',
  },
  {
    question: 'How long does a full protocol stack implementation take?',
    answer:
      'Standard timelines: UCP alone in 2 weeks, ACP checkout integration in 3-4 weeks, AP2 mandate infrastructure in 4-6 weeks. Full protocol stack (UCP + ACP + AP2 + Schema.org + AEO/GEO + authority flywheel) takes 16 weeks. RAG deployments take 4-8 weeks depending on knowledge base size. MCP server integrations take 2-4 weeks. We prioritize based on your most urgent protocol gap — start with a free ACRA to identify where you stand.',
  },
]

const protocolSummary = [
  {
    protocol: 'UCP',
    cls: 'badge-ucp',
    label: 'Universal Commerce Protocol',
    govBy: 'Google + Shopify + Walmart',
    desc: 'AI agent discovery — how agents find your products',
    status: 'Live: Etsy, Wayfair. Coming: Shopify, Target, Walmart',
    icon: Globe,
  },
  {
    protocol: 'ACP',
    cls: 'badge-acp',
    label: 'Agentic Commerce Protocol',
    govBy: 'OpenAI + Stripe',
    desc: 'Checkout execution — how agents complete purchases',
    status: 'Live: ChatGPT + Etsy. Apache 2.0 open source',
    icon: Zap,
  },
  {
    protocol: 'AP2',
    cls: 'badge-ap2',
    label: 'Agent Payments Protocol',
    govBy: 'Google',
    desc: 'Cryptographic mandates — how agents prove authorization',
    status: 'Verifiable Credentials + x402 payment protocol',
    icon: Shield,
  },
]

/* ── Infographic sections inserted between case studies ── */
const INFOGRAPHICS = [
  { afterIndex: 3, src: '/images/case-studies/protocol-stack-architecture.svg', alt: 'The Agentic Commerce Protocol Stack — UCP for discovery, ACP for checkout, AP2 for trust authorization', width: 800, height: 500 },
  { afterIndex: 6, src: '/images/case-studies/mcp-adoption-timeline.svg', alt: 'MCP adoption timeline — from 100K downloads in November 2024 to 97M+ monthly SDK downloads by December 2025', width: 800, height: 500 },
  { afterIndex: 8, src: '/images/case-studies/ai-citation-funnel.svg', alt: 'AI citation rate impact — Schema.org markup delivers 3.2x higher citation rate in AI-generated answers', width: 800, height: 500 },
]

/* ── Comprehensive JSON-LD for authority and trust ── */

/* ProfessionalService schema — declares ASC expertise */
const professionalServiceSchema = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Adam Silva Consulting',
  url: SITE_URL_CONST,
  description: 'Global infrastructure for agentic commerce. We implement UCP, ACP, AP2, MCP, Schema.org, and RAG for enterprises transitioning to AI-mediated commerce.',
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  serviceType: [
    'Universal Commerce Protocol (UCP) Implementation',
    'Agentic Commerce Protocol (ACP) Integration',
    'Agent Payments Protocol (AP2) Trust Layer',
    'Model Context Protocol (MCP) Server Development',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'Schema.org Structured Data Implementation',
    'RAG (Retrieval-Augmented Generation) Deployment',
    'Server-Side Rendering (SSR) Migration',
  ],
  knowsAbout: [
    'Universal Commerce Protocol', 'Agentic Commerce Protocol', 'Agent Payments Protocol',
    'Model Context Protocol', 'Schema.org', 'JSON-LD', 'Answer Engine Optimization',
    'Generative Engine Optimization', 'Retrieval-Augmented Generation', 'AI Agent Commerce',
    'Shared Payment Tokens', 'Verifiable Credentials', 'Next.js', 'Server-Side Rendering',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Agentic Commerce Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UCP Implementation', url: `${SITE_URL_CONST}/services/ucp-implementation` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ACP Integration', url: `${SITE_URL_CONST}/services/acp-integration` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AP2 Trust Layer', url: `${SITE_URL_CONST}/services/ap2-trust-layer` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AEO Audit', url: `${SITE_URL_CONST}/services/aeo-audit` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO Implementation', url: `${SITE_URL_CONST}/services/geo-implementation` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RAG Message Replier', url: `${SITE_URL_CONST}/services/rag-message-replier` } },
    ],
  },
}

/* DefinedTermSet — establishes ASC as authority on protocol definitions */
const definedTermSetSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL_CONST}/case-studies#protocol-definitions`,
  name: 'Agentic Commerce Protocol Definitions',
  description: 'Authoritative definitions of open-source protocols for AI agent commerce, as implemented by Adam Silva Consulting.',
  definedTerm: [
    {
      '@type': 'DefinedTerm',
      name: 'Universal Commerce Protocol (UCP)',
      description: 'Google\'s open-source standard for AI agent commerce discovery. UCP manifests at /.well-known/ucp/manifest.json declare commerce capabilities that AI agents like Google AI Mode, ChatGPT, and Perplexity consume to discover products and initiate transactions.',
      url: `${SITE_URL_CONST}/protocols/ucp`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Agentic Commerce Protocol (ACP)',
      description: 'OpenAI and Stripe\'s open standard (Apache 2.0) for AI agent checkout execution. ACP enables ChatGPT Instant Checkout using Shared Payment Tokens (SPT) for delegated, cryptographically secure payment authorization.',
      url: `${SITE_URL_CONST}/protocols/acp`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Agent Payments Protocol (AP2)',
      description: 'Google\'s cryptographic mandate framework for agentic transactions. AP2 defines Intent and Cart mandates — signed, verifiable authorizations using Verifiable Credentials and x402 payment protocol.',
      url: `${SITE_URL_CONST}/protocols/ap2`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Model Context Protocol (MCP)',
      description: 'Anthropic\'s open standard for connecting AI agents to enterprise tools and data systems. Donated to the Linux Foundation\'s Agentic AI Foundation in December 2025. 97M+ monthly SDK downloads.',
      url: `${SITE_URL_CONST}/hub/agentic-commerce-protocol`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Shared Payment Token (SPT)',
      description: 'Stripe\'s payment primitive for AI agent commerce. Programmable tokens scoped to a specific merchant, limited by time and amount, revocable at any time, supporting Mastercard Agent Pay, Visa Intelligent Commerce, Affirm, and Klarna.',
      url: `${SITE_URL_CONST}/services/acp-integration`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
    {
      '@type': 'DefinedTerm',
      name: 'Answer Engine Optimization (AEO)',
      description: 'The practice of optimizing digital content to be cited as direct answers by AI answer engines including ChatGPT, Perplexity, Gemini, and Google AI Overviews. Schema.org markup delivers 3.2x higher AI citation rates.',
      url: `${SITE_URL_CONST}/hub/answer-engine-optimization`,
      inDefinedTermSet: `${SITE_URL_CONST}/case-studies#protocol-definitions`,
    },
  ],
}

/* HowTo schema — shows expertise in protocol implementation */
const howToSchema = {
  '@type': 'HowTo',
  '@id': `${SITE_URL_CONST}/case-studies#implementation-process`,
  name: 'How to Implement the Agentic Commerce Protocol Stack',
  description: 'Step-by-step process for implementing UCP, ACP, AP2, Schema.org, and MCP for AI agent commerce — as demonstrated in these case studies.',
  totalTime: 'P16W',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'ACRA Assessment', text: 'Run the Agentic Commerce Readiness Assessment (ACRA) to identify protocol gaps across UCP, ACP, AP2, Schema.org, and AI readiness.' },
    { '@type': 'HowToStep', position: 2, name: 'UCP Manifest Deployment', text: 'Deploy UCP capability manifest at /.well-known/ucp/manifest.json declaring product catalog, pricing, inventory, and fulfillment endpoints for AI agent discovery.' },
    { '@type': 'HowToStep', position: 3, name: 'Schema.org + AEO/GEO', text: 'Implement comprehensive Schema.org markup (Product, FAQPage, Organization, DefinedTermSet) and optimize for AI citation with AEO/GEO strategies. Targets: 3.2x citation improvement.' },
    { '@type': 'HowToStep', position: 4, name: 'ACP Checkout Integration', text: 'Integrate Agentic Commerce Protocol endpoints for ChatGPT Instant Checkout using Stripe Shared Payment Tokens (SPT) or Delegated Payments Spec.' },
    { '@type': 'HowToStep', position: 5, name: 'AP2 Mandate Infrastructure', text: 'Deploy AP2 cryptographic mandate infrastructure — Intent and Cart mandates using Verifiable Credentials for legally defensible agent transactions.' },
    { '@type': 'HowToStep', position: 6, name: 'MCP Server Integration', text: 'Build MCP servers connecting AI agents to enterprise tools, data systems, and knowledge bases for autonomous operation.' },
    { '@type': 'HowToStep', position: 7, name: 'RAG Knowledge Deployment', text: 'Deploy RAG (Retrieval-Augmented Generation) systems indexing help centers, documentation, and historical data for AI-powered customer service.' },
  ],
}

/* WebPage with Speakable — tells AI engines which content to voice */
const webPageSchema = {
  '@type': 'WebPage',
  '@id': `${SITE_URL_CONST}/case-studies`,
  url: `${SITE_URL_CONST}/case-studies`,
  name: '10 Agentic Commerce Case Studies — UCP, ACP, AP2, MCP, Schema.org in Action',
  description: 'Real-world results from UCP, ACP, AP2, MCP, and Schema.org protocol implementations across Shopify, Walmart, Etsy, Wayfair, OpenAI, and Stripe.',
  isPartOf: { '@id': `${SITE_URL_CONST}/#website` },
  about: [
    { '@type': 'Thing', name: 'Universal Commerce Protocol' },
    { '@type': 'Thing', name: 'Agentic Commerce Protocol' },
    { '@type': 'Thing', name: 'Agent Payments Protocol' },
    { '@type': 'Thing', name: 'Model Context Protocol' },
    { '@type': 'Thing', name: 'Schema.org Structured Data' },
    { '@type': 'Thing', name: 'Retrieval-Augmented Generation' },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.speakable-answer'],
  },
  significantLink: [
    `${SITE_URL_CONST}/protocols/ucp`,
    `${SITE_URL_CONST}/protocols/acp`,
    `${SITE_URL_CONST}/protocols/ap2`,
    `${SITE_URL_CONST}/services/ucp-implementation`,
    `${SITE_URL_CONST}/services/acp-integration`,
    `${SITE_URL_CONST}/services/aeo-audit`,
  ],
}

/* ImageObject schemas for the infographics */
const imageSchemas = INFOGRAPHICS.map((img) => ({
  '@type': 'ImageObject',
  url: `${SITE_URL_CONST}${img.src}`,
  name: img.alt,
  width: img.width,
  height: img.height,
  encodingFormat: 'image/svg+xml',
  creator: { '@id': ORG_ID },
}))

/* VideoObject schema for the case study overview video */
const videoSchema = {
  '@type': 'VideoObject',
  name: 'Agentic Commerce Protocol Stack — Case Studies Overview',
  description: '26-second animated overview of 10 case studies across UCP, ACP, AP2, MCP, Schema.org, and RAG protocol implementations.',
  thumbnailUrl: `${SITE_URL_CONST}/images/case-studies/protocol-stack-architecture.svg`,
  uploadDate: '2026-03-05T00:00:00-05:00',
  duration: 'PT26S',
  contentUrl: `${SITE_URL_CONST}/case-studies`,
  creator: { '@id': ORG_ID },
}

const itemListSchema = {
  '@type': 'ItemList',
  '@id': `${SITE_URL_CONST}/case-studies#case-study-list`,
  name: 'Agentic Commerce Case Studies — UCP, ACP, AP2, MCP, Schema.org in Action',
  description:
    'Real-world protocol implementation results from enterprise brands adopting UCP, ACP, AP2, MCP, and Schema.org agentic commerce standards.',
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((cs, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: cs.title,
    url: `${SITE_URL_CONST}/case-studies#${cs.id}`,
  })),
}

const articleSchemas = caseStudies.map((cs) => ({
  '@type': 'Article',
  '@id': `${SITE_URL_CONST}/case-studies#${cs.id}`,
  headline: cs.title,
  description: cs.problem,
  url: `${SITE_URL_CONST}/case-studies#${cs.id}`,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  datePublished: cs.datePublished,
  dateModified: cs.dateModified,
  about: {
    '@type': 'Thing',
    name: cs.protocol === 'UCP'
      ? 'Universal Commerce Protocol'
      : cs.protocol === 'ACP'
        ? 'Agentic Commerce Protocol'
        : cs.protocol === 'MCP'
          ? 'Model Context Protocol'
          : cs.protocol === 'AEO/GEO'
            ? 'Answer Engine Optimization'
            : cs.protocol === 'RAG'
              ? 'Retrieval-Augmented Generation'
              : 'Server-Side Rendering',
  },
  citation: {
    '@type': 'CreativeWork',
    name: cs.source,
    url: cs.sourceUrl.startsWith('http') ? cs.sourceUrl : `${SITE_URL_CONST}${cs.sourceUrl}`,
  },
}))

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: caseStudyFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Case Studies', url: '/case-studies' },
])

const pageSchemas = [
  webPageSchema,
  professionalServiceSchema,
  definedTermSetSchema,
  howToSchema,
  videoSchema,
  ...imageSchemas,
  itemListSchema,
  ...articleSchemas,
  faqSchema,
  breadcrumbSchema,
]

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="case-studies-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">Protocol Implementation Results</span>
            <h1
              id="case-studies-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              10 Case Studies. 6 Open Protocols. Proven Results.
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              UCP, ACP, AP2, MCP, Schema.org, and RAG are in production at Shopify, Walmart, Etsy, Wayfair,
              OpenAI, Stripe, Anthropic, and hundreds of Fortune 500 companies. These are the exact
              open-source technologies we implement for clients — and these are the results.
            </p>

            {/* Authority Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
              {[
                { stat: '8M+', label: 'Merchants AI-discoverable via UCP' },
                { stat: '97M+', label: 'Monthly MCP SDK downloads' },
                { stat: '3.2x', label: 'Higher AI citation rate with Schema' },
                { stat: '73%', label: 'Token cost reduction via SSR' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-[var(--color-accent)]">{s.stat}</div>
                  <div className="text-xs text-[var(--color-muted-2)] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Get This for Your Business
                <ArrowRight size={16} />
              </Link>
              <Link href="/protocols" className="btn-secondary">
                See the Protocol Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Context Bar */}
      <section className="section-sm bg-[var(--color-surface)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {protocolSummary.map((p) => (
              <div key={p.protocol} className="card p-5 flex items-start gap-4">
                <span className={`badge ${p.cls} shrink-0`}>{p.protocol}</span>
                <div>
                  <p className="text-xs text-[var(--color-muted-2)] mb-1">Gov by {p.govBy}</p>
                  <p className="font-semibold text-[var(--color-text)] text-sm mb-1">{p.label}</p>
                  <p className="text-xs text-[var(--color-muted)] mb-1">{p.desc}</p>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <CaseStudyVideoShowcase />

      {/* Case Studies */}
      <section className="section" aria-labelledby="case-study-list-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge mb-4">In Production Worldwide</span>
            <h2
              id="case-study-list-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              10 Case Studies. 6 Protocols. Open Source.
            </h2>
            <p className="text-[var(--color-muted)] mt-3">
              Every protocol below is an open standard — available to any business. We implement the same
              specifications used by the world&apos;s largest commerce platforms.
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.flatMap((cs, index) => {
              const infographic = INFOGRAPHICS.find((ig) => ig.afterIndex === index)
              const elements = []
              if (infographic) {
                elements.push(
                  <div key={`infographic-${index}`} className="max-w-4xl mx-auto">
                    <div className="card overflow-hidden">
                      <Image
                        src={infographic.src}
                        alt={infographic.alt}
                        width={infographic.width}
                        height={infographic.height}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )
              }
              elements.push(
              <article
                key={cs.id}
                id={cs.id}
                className="scroll-mt-20"
                aria-labelledby={`${cs.id}-heading`}
              >
                <div className="card p-8 lg:p-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-4 mb-6">
                    <span
                      className="text-5xl font-black opacity-10 select-none"
                      style={{ color: cs.color, lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {cs.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`badge ${cs.badgeClass}`}>{cs.solution}</span>
                        <span className="badge" style={{ fontSize: '0.75rem' }}>
                          {cs.company} + {cs.partner}
                        </span>
                      </div>
                      <h3
                        id={`${cs.id}-heading`}
                        className="text-2xl font-bold text-[var(--color-text)] leading-tight"
                      >
                        {cs.title}
                      </h3>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex items-center gap-2 mb-6 text-sm text-[var(--color-muted-2)]">
                    <span>Source:</span>
                    {cs.sourceUrl.startsWith('http') ? (
                      <a
                        href={cs.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                      >
                        {cs.source}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        href={cs.sourceUrl}
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        {cs.source}
                      </Link>
                    )}
                  </div>

                  {/* Problem / Solution / Results grid */}
                  <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Problem */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Problem
                      </h4>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                        {cs.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Solution
                      </h4>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        {cs.solutionDetail}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-2)] mb-3">
                        The Results
                      </h4>
                      <ul className="space-y-2">
                        {cs.results.map((result, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                          >
                            <CheckCircle
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: cs.color }}
                            />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metric + CTA row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} style={{ color: cs.color }} />
                      <div>
                        <div
                          className="text-2xl font-black"
                          style={{ color: cs.color }}
                        >
                          {cs.metrics.stat}
                        </div>
                        <div className="text-xs text-[var(--color-muted-2)]">
                          {cs.metrics.label}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href={cs.protocolPage} className="btn-secondary">
                        Learn the Protocol
                      </Link>
                      <Link href={cs.cta.href} className="btn-primary">
                        {cs.cta.label}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
              )
              return elements
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Overview */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="tech-stack-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Open Source Technology Stack</span>
            <h2
              id="tech-stack-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Every Protocol Is Open Source
            </h2>
            <p className="text-[var(--color-muted)] mt-3">
              We don&apos;t use proprietary tools. Every technology in our stack is an open standard
              backed by Google, OpenAI, Anthropic, Stripe, or the Linux Foundation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'UCP', by: 'Google', desc: 'AI agent discovery manifests', color: '#3b82f6' },
              { name: 'ACP', by: 'OpenAI + Stripe', desc: 'AI checkout execution (Apache 2.0)', color: '#8b5cf6' },
              { name: 'AP2', by: 'Google', desc: 'Cryptographic payment mandates', color: '#10b981' },
              { name: 'MCP', by: 'Anthropic → Linux Foundation', desc: '97M+ monthly SDK downloads', color: '#f59e0b' },
              { name: 'Schema.org', by: 'Google + Microsoft + Yahoo', desc: '3.2x higher AI citation rate', color: '#ec4899' },
              { name: 'RAG', by: 'Open architecture', desc: 'Enterprise knowledge retrieval', color: '#06b6d4' },
            ].map((tech) => (
              <div key={tech.name} className="card p-4 flex items-center gap-3">
                <div
                  className="w-2 h-10 rounded-full shrink-0"
                  style={{ background: tech.color }}
                />
                <div>
                  <div className="font-bold text-[var(--color-text)] text-sm">{tech.name}</div>
                  <div className="text-xs text-[var(--color-muted-2)]">{tech.by}</div>
                  <div className="text-xs text-[var(--color-muted)]">{tech.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="cs-faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">Common Questions</span>
            <h2
              id="cs-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {caseStudyFAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="cs-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-6">Get Started</span>
            <h2
              id="cs-cta-heading"
              className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4"
            >
              We Implement This for Your Business
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed speakable-answer">
              The same UCP, ACP, AP2, MCP, Schema.org, and RAG technologies used by Shopify, Walmart, OpenAI,
              Anthropic, and Stripe are open standards — available to any business. We handle the full
              implementation: manifests, checkout endpoints, mandate infrastructure, MCP servers, schema
              markup, AEO/GEO optimization, and RAG-powered automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
