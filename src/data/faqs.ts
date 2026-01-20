import { FAQItem } from '../utils/seo';

/**
 * Global FAQ data optimized for Answer Engine Optimization (AEO)
 * These FAQs are structured to be easily parsed by AI engines
 * Updated January 2026 with UCP, ACP, and AP2 agentic commerce protocols
 */

export const homepageFAQs: FAQItem[] = [
  {
    question: "What is the Universal Commerce Protocol (UCP)?",
    answer: "The Universal Commerce Protocol (UCP) is Google's open standard launched in January 2026, co-developed with Shopify, Walmart, Target, Etsy, and 20+ ecosystem partners including Visa, Mastercard, Stripe, and PayPal. UCP establishes a common language for AI agents to discover merchant capabilities, negotiate transactions, and execute purchases. By publishing a machine-readable manifest at /.well-known/ucp, merchants gain access to every UCP-compatible agent surface including Google AI Mode, Gemini, and ChatGPT without building custom integrations."
  },
  {
    question: "What is the Agentic Commerce Protocol (ACP)?",
    answer: "The Agentic Commerce Protocol (ACP), developed by OpenAI and Stripe, enables 'Instant Checkout' in AI interfaces like ChatGPT. ACP uses Shared Payment Tokens (SPT)—single-use, time-bound tokens that allow agents to complete purchases on behalf of users without exposing raw payment credentials. While merchants remain the Merchant of Record and retain customer relationships, AI agents manage the checkout UI. ACP is optimized for speed-to-market with a centralized architecture tightly integrated with Stripe."
  },
  {
    question: "What is AP2 (Agent Payments Protocol)?",
    answer: "AP2 (Agent Payments Protocol) is Google's cryptographically-signed mandate system that provides verifiable proof of user authorization for agent-initiated payments. It uses three mandate types: Intent Mandates (capturing user instructions like 'buy running shoes under $120'), Cart Mandates (locking exact items and prices), and Payment Mandates (sent to payment networks with AI agent presence signals). AP2 uses ECDSA signatures and Verifiable Credentials to create tamper-proof audit trails, addressing the critical trust question: 'How do we prove the user approved this?'"
  },
  {
    question: "How is AEO different from traditional SEO?",
    answer: "Traditional SEO optimizes for clicks in search engine results pages (SERPs). Answer Engine Optimization (AEO) optimizes for being cited by AI engines when they answer queries directly. AEO requires heavy schema markup, structured data, FAQ schemas, and content optimized for AI comprehension—not just keyword density. As Gartner predicts a 50% decline in organic traffic due to AI answering queries without sending users to websites, AEO is critical for visibility in the agent-mediated discovery era."
  },
  {
    question: "Why is SPA + SSR architecture essential for agentic commerce?",
    answer: "AI crawlers allocate limited 'token budgets' when processing websites. Legacy platforms like Shopify and Wix impose a 'Hydration Tax'—heavy JavaScript bundles that waste tokens before reaching actual content. SPA + SSR (Single Page Application with Server-Side Rendering) delivers lean, fully-rendered HTML with dense JSON-LD schema, achieving sub-300ms render-to-first-fact times that agents prioritize. Sites optimizing for token efficiency see 20-50% increases in AI-sourced traffic and 3-5x higher AI citation rates."
  },
  {
    question: "What results can I expect from Adam Silva Consulting?",
    answer: "Clients of Adam Silva Consulting achieve agentic commerce readiness through UCP, ACP, and AP2 protocol implementation, increased AI engine citations, improved topical authority, and streamlined operations. We deliver measurable results: 20-50% increases in AI-sourced traffic, 3-5x higher agent citation rates, sub-300ms render times, and full protocol compliance within 12-16 weeks. Our approach ensures clients are visible, trusted, and transactable by AI agents across Google AI Mode, Gemini, ChatGPT, and emerging surfaces."
  },
  {
    question: "How long does agentic commerce implementation take?",
    answer: "A complete agentic commerce implementation typically takes 12-16 weeks across four phases: Phase 1 (Weeks 1-6) covers SSR/Edge deployment and heavy schema implementation; Phase 2 (Weeks 7-10) implements UCP manifest publishing and ACP checkout adapters; Phase 3 (Weeks 11-13) handles AP2 mandate signing, certification, and security testing; Phase 4 (Weeks 14+) establishes ongoing operations, authority building, and protocol monitoring. Early benefits like improved AI citations often appear within the first month."
  },
  {
    question: "What industries benefit most from agentic commerce?",
    answer: "All commerce businesses benefit from agentic commerce readiness, but early adopters gaining the most advantage include e-commerce retailers, B2B services, technology companies, professional services, and any business where AI-assisted discovery is growing. With traffic from generative AI sources up 1,200% in 2025-2026, businesses that implement UCP/ACP/AP2 protocols now gain a 3-6 year competitive advantage over those waiting for legacy platforms to catch up."
  }
];

export const aeoServiceFAQs: FAQItem[] = [
  {
    question: "What is included in AEO services?",
    answer: "Our Answer Engine Optimization services include comprehensive content audits, topical authority development, structured data implementation, content optimization for AI engines, citation tracking and monitoring, competitive AEO analysis, and ongoing optimization. We ensure your content is structured, authoritative, and optimized to be cited by all major AI engines including ChatGPT, Claude, Perplexity, Google AI, and others."
  },
  {
    question: "How do you track AEO performance?",
    answer: "We track AEO performance through multiple metrics including AI engine citation frequency, source attribution accuracy, topical authority scores, content coverage in AI responses, competitive citation benchmarking, and traffic from AI-referred sources. Our proprietary tracking methods monitor when and how your content is cited by major AI engines, providing clear ROI measurement."
  },
  {
    question: "Can AEO work alongside our existing SEO strategy?",
    answer: "Absolutely! AEO and SEO are complementary strategies. In fact, many AEO best practices (quality content, topical authority, structured data) also benefit traditional SEO. We integrate AEO seamlessly with your existing SEO efforts, ensuring that optimizations benefit both traditional search rankings and AI engine citations. This integrated approach maximizes your overall digital visibility."
  },
  {
    question: "What makes Adam Silva Consulting different in AEO?",
    answer: "Adam Silva Consulting is a pioneer in Answer Engine Optimization, being one of the first consulting firms to specialize exclusively in AEO and GEO strategies. Our founder has deep expertise in AI marketing intelligence and has developed proprietary frameworks for building topical authority recognized by AI engines. We combine technical optimization with strategic content development and have proven track records of getting clients cited by major AI platforms."
  }
];

export const geoServiceFAQs: FAQItem[] = [
  {
    question: "What is Generative Engine Optimization?",
    answer: "Generative Engine Optimization (GEO) is the practice of optimizing your digital presence so that generative AI engines can accurately understand, extract, and cite your content when creating custom responses. This involves structuring content for AI comprehension, implementing comprehensive knowledge graphs, optimizing information architecture, and building semantic relationships between concepts. GEO ensures AI engines not only find your content but synthesize it accurately in their responses."
  },
  {
    question: "Which AI engines does GEO target?",
    answer: "Our GEO strategies target all major generative AI engines including OpenAI's GPT models (ChatGPT), Anthropic's Claude, Google's Gemini, Perplexity AI, Meta's LLaMA-based engines, and emerging AI platforms. We optimize for both current and future AI engines by following best practices in semantic structuring and knowledge representation."
  },
  {
    question: "How is GEO measured?",
    answer: "GEO performance is measured through citation accuracy (how accurately AI engines represent your information), citation frequency (how often you're cited), context preservation (whether full context is maintained), source attribution (whether you're properly credited), and competitive positioning (your citation share vs competitors). We provide detailed reports showing your GEO performance across multiple AI platforms."
  }
];

export const digitalTransformationFAQs: FAQItem[] = [
  {
    question: "What does digital transformation include?",
    answer: "Our digital transformation services include AI implementation strategy, marketing automation setup, CRM and sales process optimization, data analytics and business intelligence, process automation, digital infrastructure modernization, change management and training, and continuous optimization. We provide end-to-end support for businesses transitioning to AI-powered operations."
  },
  {
    question: "How long does digital transformation take?",
    answer: "Digital transformation timelines vary based on scope and organization size. A focused AI implementation might take 3-4 months, while comprehensive transformation typically requires 6-12 months for initial implementation, followed by ongoing optimization. Adam Silva Consulting uses phased approaches to deliver value incrementally while building toward complete transformation."
  },
  {
    question: "What ROI can I expect from digital transformation?",
    answer: "Typical ROI from digital transformation includes 30-50% reduction in manual processes, 25-40% improvement in marketing efficiency, 20-35% increase in qualified leads, 15-25% cost reduction in operations, and significant improvements in data-driven decision making. Exact ROI depends on current maturity level and transformation scope, which we assess during initial consultation."
  }
];

export const topicalAuthorityFAQs: FAQItem[] = [
  {
    question: "What is topical authority?",
    answer: "Topical authority is when search engines and AI engines recognize you as a comprehensive, trustworthy source of information on specific topics. It's built through consistent, high-quality content covering all aspects of a topic, structured relationships between content pieces, expert credentials and citations, and recognition from other authoritative sources. For AI engines, topical authority is critical - they preferentially cite sources they recognize as authoritative."
  },
  {
    question: "How do you build topical authority?",
    answer: "We build topical authority through comprehensive topic mapping, strategic content creation covering all topic aspects, semantic content structuring, expert positioning and credentials, strategic partnerships and citations, and continuous content updates. Our approach ensures AI engines recognize you as the definitive source in your domain, leading to consistent citations."
  },
  {
    question: "How long does it take to establish topical authority?",
    answer: "Establishing topical authority typically takes 4-8 months for focused topics and 8-12 months for broader subject areas. The timeline depends on competition level, existing content assets, topic breadth, and content creation capacity. However, early indicators of authority (initial AI citations, improved rankings) often appear within 2-3 months of beginning the authority building process."
  }
];
