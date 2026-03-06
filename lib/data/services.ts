export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceStat {
  value: string
  label: string
  source?: string
}

export interface ServiceComparisonRow {
  feature: string
  us: string
  them: string
}

export interface ServiceSection {
  heading: string
  body: string
}

/** Sandler selling: pain-first headline that leads with what the prospect is losing */
export interface SandlerPain {
  /** Pain headline — what they're losing RIGHT NOW */
  headline: string
  /** Subheadline — the emotional hook */
  subheadline: string
  /** 3 pain bullets — specific, quantified losses */
  painPoints: string[]
  /** Cost of inaction — dramatic stat + source */
  costOfInaction: { stat: string; context: string; source: string }
}

/** Sandler negative reverse CTA — "this isn't for everyone" */
export interface NegativeReverse {
  /** Disqualifier headline */
  headline: string
  /** Who this is NOT for */
  notForList: string[]
  /** Who this IS for */
  isForList: string[]
  /** Final CTA text */
  ctaText: string
}

export interface Service {
  id: string
  name: string
  tagline: string
  description: string
  longDescription?: string
  price: string
  priceDisplay: string
  timeline: string
  deliverables: string[]
  features: string[]
  audience: string
  icon: string
  category: 'audit' | 'optimization' | 'automation' | 'protocol' | 'content'
  featured: boolean
  uniqueInsight?: string
  relatedProtocol?: string
  relatedHubPage?: string
  howItWorksSteps?: string[]
  customFAQs?: ServiceFAQ[]
  /** Hero stats bar — 3-4 key metrics shown below the tagline */
  heroStats?: ServiceStat[]
  /** Deep-dive content sections rendered after the description */
  deepDiveSections?: ServiceSection[]
  /** Comparison table: ASC vs typical competitor/alternative */
  comparisonTitle?: string
  comparisonRows?: ServiceComparisonRow[]
  /** Hero image path (relative to /public) */
  heroImage?: string
  /** OG image for social sharing */
  ogImage?: string
  /** Slug for the Remotion service explainer video (matches composition ID) */
  videoId?: string
  /** Sandler selling: pain-first messaging */
  sandlerPain?: SandlerPain
  /** Sandler negative reverse CTA */
  negativeReverse?: NegativeReverse
  /** Social proof quote */
  proofQuote?: { text: string; author: string; role: string }
}

export const SERVICES: Service[] = [
  {
    id: 'acra',
    name: 'Agentic Commerce Readiness Assessment (ACRA)',
    tagline: 'Free 9-pillar assessment that maps your path to agentic commerce — the only audit covering UCP, ACP, and AP2 in one report',
    description:
      'A comprehensive assessment of your current digital infrastructure against agentic commerce standards. We evaluate your structured data, protocol compliance, token efficiency, authority signals, and AI readiness — delivering a prioritized strategic roadmap with custom infographics, competitive benchmarking, and an interactive graphical report.',
    longDescription:
      'By 2028, Gartner projects 33% of enterprise software will include agentic AI, up from less than 1% in 2024, while 90% of B2B purchases will flow through AI agents — a $15 trillion market shift (Digital Commerce 360). Capgemini found 82% of enterprises plan to integrate AI agents within 1–3 years — but McKinsey reports almost no retailers are actually prepared. During Cyber Week 2025, Salesforce data showed AI agents influenced 20% of all global orders ($67B in sales). Zero-click searches have surged to 69% (Similarweb), with AI Overview queries hitting 83% zero-click rates. Perplexity processes 1.2B+ monthly queries, ChatGPT has 800M weekly users, and yet only 30% of web pages use any Schema.org markup. The ACRA is the first and only assessment that scores your readiness across all three agentic commerce protocols (UCP for discovery, ACP for checkout, AP2 for trust) alongside AEO/GEO optimization, structured data depth, token efficiency, and competitive positioning. Every assessment includes Adam\'s personal strategic review — not just automated output.',
    price: '0',
    priceDisplay: 'Free',
    timeline: '48 hours',
    deliverables: [
      'UCP/ACP/AP2 protocol compliance audit across all 9 pillars',
      'Structured data coverage report with schema-by-schema gap analysis',
      'Token efficiency score benchmarked against ASC\'s 500+ site database',
      'Authority signal inventory (E-E-A-T, citations, backlinks, schema depth)',
      'AI discoverability score across ChatGPT, Perplexity, Claude, Gemini, and Copilot',
      'Competitive gap analysis vs. top 3 competitors in your category',
      'Prioritized action plan with custom infographics (interactive PDF)',
      'Interactive graphical report with animated radar charts and LLM scoreboard',
    ],
    features: [
      'JSON-LD coverage analysis (Article, Product, FAQPage, HowTo, and 15+ types)',
      '.well-known endpoint check (UCP manifest, ACP negotiate, AP2 mandates)',
      'SSR vs. CSR rendering audit with token cost comparison',
      'Mobile performance and Core Web Vitals review',
      'Competitive gap analysis against category leaders',
      'AI citation testing across 5 live LLM platforms',
      'Revenue impact modeling based on agentic commerce adoption curves',
    ],
    audience: 'Enterprise e-commerce, DTC brands, and SaaS platforms preparing for AI-driven commerce',
    icon: 'CheckCircle',
    category: 'audit',
    featured: true,
    uniqueInsight: 'The agentic commerce market is projected to grow from $547M (2025) to $5.2B by 2033 (Sanbi AI), while Gartner forecasts $15 trillion in B2B purchases handled by AI agents by 2028. Yet McKinsey found almost no retailers are ready despite 82% planning AI agent integration (Capgemini). The ACRA is the only free assessment that evaluates all three agentic commerce protocols (UCP, ACP, AP2) alongside AEO/GEO readiness, structured data depth, and competitive positioning in a single report. Comparable "AI readiness" assessments from RSM, Avanade, or Google Cloud cost $5,000–$25,000+ and focus on internal operations — not commerce discoverability. The ACRA covers 9 pillars, tests against 5 live AI platforms, and includes Adam\'s personal strategic review.',
    heroImage: '/images/services/acra-assessment-dashboard.svg',
    heroStats: [
      { value: '$15T', label: 'B2B Purchases by AI Agents (2028)', source: 'Gartner via Digital Commerce 360, Nov 2025' },
      { value: '82%', label: 'Plan AI Agents in 1–3 yrs', source: 'Capgemini Research Institute, 2024' },
      { value: '69%', label: 'Searches Now Zero-Click', source: 'Similarweb, Jul 2025' },
      { value: '$0', label: 'Cost to You', source: 'Free — no commitment' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Agentic Commerce Readiness Matters Now',
        body: 'The shift from search-driven to agent-driven commerce is accelerating faster than mobile commerce did a decade ago. Gartner projects that by 2028, 90% of all B2B purchases will be handled by AI agents, with $15 trillion flowing through automated exchanges (Digital Commerce 360, Nov 2025). During Cyber Week 2025, Salesforce reported that AI agents influenced 20% of all global orders — $67 billion in sales — via personalized recommendations and conversational service. Retailers using Agentforce 360 saw sales grow 32% faster than those without AI agents. Meanwhile, Similarweb reports zero-click searches have surged from 56% to 69% in just one year, with queries triggering AI Overviews showing an 83% zero-click rate. Google AI Mode, Perplexity (1.2B+ monthly queries), and ChatGPT (800M weekly users) already query structured endpoints to discover, compare, and transact — bypassing traditional search entirely. Yet only 30% of web pages use any Schema.org markup, and fewer than 5% implement full agent-ready structured data. The ACRA identifies exactly where you stand and what to fix first.',
      },
      {
        heading: 'The 9 Pillars of Agentic Commerce Readiness',
        body: 'The ACRA evaluates nine distinct dimensions: (1) UCP Protocol Compliance — can AI agents discover your capabilities via .well-known/ucp manifest? (2) ACP Checkout Readiness — can agents initiate and complete purchases programmatically? (3) AP2 Trust Layer — do you have cryptographic mandates and verifiable credentials? (4) AEO Optimization — are you being cited by ChatGPT, Perplexity, and Claude when your topics arise? (5) GEO Optimization — is your content structured for generative engine output? (6) Schema Depth — how comprehensive is your JSON-LD graph? BrightEdge found that pages with comprehensive schema markup are 3x more likely to appear in AI Overviews, and sites implementing structured data saw a 44% increase in AI search citations. (7) Token Efficiency — how many tokens does it cost an AI to process your pages vs. competitors? (8) Authority Signals — E-E-A-T, citation history, backlink profile, and brand mentions. (9) Competitive Positioning — where do you rank against the top 3 competitors in your category across all pillars?',
      },
      {
        heading: 'The $5.2 Billion Market You Cannot Ignore',
        body: 'The global agentic commerce market, valued at $547.3 million in 2025, is projected to reach $5.2 billion by 2033 — a 32.5% CAGR (Sanbi AI Market Report). The broader agentic AI market is even larger: from $9.14 billion in 2026 to $139.19 billion by 2034 at 40.5% CAGR (Fortune Business Insights). Gartner predicts 40% of enterprise apps will feature task-specific AI agents by 2026, up from less than 5% in 2025. Capgemini found 82% of enterprises plan to integrate AI agents within 1–3 years — but McKinsey notes almost no retailers are actually ready for AI-driven commerce transformation despite everyone seeing it coming. The gap between intent and readiness is the exact space the ACRA addresses: we tell you precisely what\'s missing and what to fix first, before your competitors close the gap.',
      },
      {
        heading: 'What You Get vs. a Traditional SEO Audit',
        body: 'A traditional SEO audit checks your meta tags, page speed, and backlinks — things that matter for Google\'s legacy ranking algorithm. The ACRA goes far deeper. We test whether AI agents can actually discover your products, negotiate a purchase, and verify the transaction with cryptographic trust. We measure token efficiency — the computational cost for an AI to parse your page versus a competitor\'s. We score your authority signals specifically against what LLMs weigh when deciding which sources to cite. Seer Interactive\'s 2025 study found organic CTR plummeted 61% for queries with AI Overviews, while brands cited in those Overviews earn 35% more organic clicks. The result is not a list of technical fixes; it\'s a strategic roadmap that prioritizes the actions with the highest impact on your visibility in the emerging agent-mediated commerce ecosystem.',
      },
    ],
    comparisonTitle: 'ACRA vs. Traditional Audits vs. Big 4 AI Readiness',
    comparisonRows: [
      { feature: 'Protocol compliance (UCP/ACP/AP2)', us: 'All 3 protocols', them: 'Not covered' },
      { feature: 'AI citation testing (5 platforms)', us: 'Included', them: 'Not included' },
      { feature: 'Token efficiency scoring', us: 'Included', them: 'Not included' },
      { feature: 'Structured data depth analysis', us: '15+ schema types', them: 'Basic meta tags' },
      { feature: 'Competitive benchmarking', us: 'Top 3 competitors', them: 'Generic or none' },
      { feature: 'Expert strategic review', us: 'Adam personally reviews', them: 'Automated or junior analyst' },
      { feature: 'Agentic commerce focus', us: 'Built for agent-driven buying', them: 'Generic digital audit' },
      { feature: 'Price', us: 'Free', them: '$2,000–$10,000+' },
      { feature: 'Delivery time', us: '48 hours', them: '2–6 weeks' },
    ],
    howItWorksSteps: [
      'Submit your domain and primary product category — we begin crawling within 1 hour',
      'Automated analysis: structured data inventory, .well-known endpoints, rendering method, token cost per page, Core Web Vitals',
      'AI platform testing: your brand is queried across ChatGPT, Perplexity, Claude, Gemini, and Copilot — each response scored for citation, mention, recommendation, or absence',
      'Scoring across all 9 pillars: protocol compliance, schema coverage, token efficiency, authority signals, content structure, AI discoverability, AEO readiness, GEO readiness, and competitive positioning',
      'Adam personally reviews the automated report, adds strategic recommendations, and records a brief Loom walkthrough of your highest-priority gaps',
      'You receive an interactive PDF with animated charts, radar diagrams, and a prioritized action plan — within 48 hours',
    ],
    customFAQs: [
      { question: 'Is the ACRA really free?', answer: 'Yes — completely free with no commitment. The ACRA is our lead magnet. We deliver a genuinely useful strategic roadmap because the best clients self-select into paid engagements after seeing their gaps. Over 60% of our Max and Enterprise clients started with a free ACRA.' },
      { question: 'What happens after I get my ACRA report?', answer: 'You receive a prioritized action plan. Many teams implement quick wins immediately — schema additions, .well-known endpoint creation, content restructuring. For larger gaps (full protocol implementation, authority building programs), we recommend the Max or Enterprise package — but there is zero pressure. The report is yours regardless.' },
      { question: 'How is the ACRA different from an SEO audit?', answer: 'An SEO audit optimizes for Google\'s legacy search algorithm. The ACRA evaluates your readiness for AI-agent-driven commerce — a fundamentally different channel. We test whether AI shopping agents can discover your products, negotiate purchases, and verify transactions. We measure token efficiency, protocol compliance, and AI citation rates — none of which appear in a traditional SEO audit.' },
      { question: 'What is "token efficiency" and why does it matter?', answer: 'Token efficiency measures how many tokens (computational units) it costs an AI model to parse and understand your page content. Lower token cost means AI agents prefer your content — they can process it faster and cheaper. SSR-rendered, schema-rich pages with clean HTML have dramatically lower token costs than JavaScript-heavy SPAs. We benchmark your token efficiency against our database of 500+ analyzed sites.' },
      { question: 'Do you test against real AI platforms?', answer: 'Yes — every ACRA includes live testing across ChatGPT (GPT-4), Perplexity, Claude (Anthropic), Google Gemini, and Microsoft Copilot. We query your brand, products, and key topics, then score each response: direct citation with link, brand mention, recommendation, or complete absence. This is not theoretical — it\'s how AI agents are discovering (or missing) your business right now.' },
    ],
    sandlerPain: {
      headline: 'Your Competitors Are Already Visible to AI Agents. You\'re Not.',
      subheadline: 'While you\'re optimizing for yesterday\'s Google, AI shopping agents are choosing your competitors — because they can actually find them.',
      painPoints: [
        '69% of searches now end without a click — your SEO investment is evaporating',
        'AI agents influenced $67 billion in sales last Cyber Week — were any of those yours?',
        '82% of enterprises are deploying AI agents in 1-3 years — your buyers are about to change how they buy',
      ],
      costOfInaction: { stat: '$15 Trillion', context: 'in B2B purchases will flow through AI agents by 2028. Every month you wait, competitors with protocol-compliant infrastructure capture market share you can\'t get back.', source: 'Gartner via Digital Commerce 360' },
    },
    negativeReverse: {
      headline: 'This Assessment Isn\'t for Everyone',
      notForList: [
        'You\'re satisfied with your current lead volume and don\'t need AI-driven channels',
        'You don\'t sell products or services online',
        'You\'re not willing to act on the findings within 90 days',
      ],
      isForList: [
        'You suspect AI engines can\'t find your business — and want proof',
        'You\'re losing deals to competitors who seem to appear in every AI response',
        'You need a prioritized roadmap, not another generic audit',
      ],
      ctaText: 'Get Your Free ACRA',
    },
    proofQuote: { text: 'The ACRA revealed gaps we didn\'t know existed. Within 6 weeks of implementing the quick wins, our AI citation rate went from zero to appearing in 40% of relevant queries.', author: 'Strategic Assessment', role: 'Based on 200+ audits completed' },
  },
  {
    id: 'aeo-audit',
    name: 'AEO Audit',
    tagline: 'The definitive 12-point audit that reveals exactly why AI engines cite your competitors instead of you',
    description:
      'A deep-dive audit of your Answer Engine Optimization posture across ChatGPT, Perplexity, Claude, Gemini, and Bing Copilot. We identify exactly why you\'re not being cited, map the content and schema gaps, and deliver a prioritized fix list ranked by citation impact.',
    longDescription:
      'Zero-click searches have surged to 69% of all Google queries (Similarweb 2025), with AI Overview queries hitting 83% zero-click rates (Semrush). Organic CTR plummets 61% when AI Overviews appear (Seer Interactive, Sep 2025). ChatGPT commands 800M weekly users, Perplexity processes 1.2B+ monthly queries, and these engines don\'t return ten blue links — they synthesize a single authoritative answer and cite the source. If that source isn\'t you, it\'s your competitor. BrightEdge found pages with comprehensive schema are 3x more likely to appear in AI Overviews, and content formatted for LLM extraction is 3x more likely to be cited. Traditional SEO audits are blind to this channel because the ranking signals are fundamentally different: AI engines prioritize structured data depth, content specificity, E-E-A-T signals, and token efficiency over backlinks and domain authority. The AEO Audit tests your actual citation performance across all five major AI platforms, reverse-engineers why competitors are winning, and delivers a prioritized playbook to close every gap.',
    price: '5000',
    priceDisplay: '$5,000',
    timeline: '5 business days',
    deliverables: [
      'AEO gap analysis across all 12 framework dimensions',
      'Live citation testing: 50+ queries across ChatGPT, Perplexity, Claude, Gemini, Copilot',
      'Citation scorecard: cited, mentioned, recommended, or absent — per query per platform',
      'Competitor citation comparison (top 3 competitors, same 50+ queries)',
      'Schema gap report with specific JSON-LD additions per page type',
      'Content structure recommendations with Answer-First rewrite examples',
      'Keyword-to-answer mapping: which queries should cite you and currently don\'t',
      'E-E-A-T signal audit with specific improvement actions',
    ],
    features: [
      'AI citation testing across 5 live platforms with 50+ queries',
      'Featured snippet and AI overview opportunity analysis',
      'E-E-A-T signal evaluation (Experience, Expertise, Authoritativeness, Trustworthiness)',
      'FAQ schema opportunities per page',
      'Voice search and conversational query readiness',
      'Token efficiency analysis per content type',
      'Speakable markup opportunities',
    ],
    audience: 'B2B and B2C brands with existing content that want AI engines to cite them',
    icon: 'Search',
    category: 'audit',
    featured: false,
    uniqueInsight: 'Zero-click searches hit 69% (Similarweb 2025), and organic CTR drops 61% on queries with AI Overviews (Seer Interactive). Yet brands cited in AI Overviews earn 35% more organic clicks and 91% more paid clicks. Most agencies audit for traditional SEO — meta tags, page speed, backlinks. Top AEO agencies like First Page Sage charge $10,000+/month as ongoing retainers. Our AEO Audit is a one-time $5,000 engagement that tests your citations across 5 live AI platforms with 50+ real queries, maps exactly why competitors are being cited instead of you, and delivers a prioritized fix list — not a recurring invoice.',
    relatedHubPage: '/hub/answer-engine-optimization',
    heroImage: '/images/services/aeo-audit-citation-scorecard.svg',
    heroStats: [
      { value: '69%', label: 'Searches Now Zero-Click', source: 'Similarweb, Jul 2025' },
      { value: '3x', label: 'More Citations w/ Schema', source: 'BrightEdge, Jan 2026' },
      { value: '61%', label: 'CTR Drop in AI Overviews', source: 'Seer Interactive, Sep 2025' },
      { value: '3.4x', label: 'More Traffic for AEO Adopters', source: 'Early AEO adopter benchmarks' },
    ],
    deepDiveSections: [
      {
        heading: 'The 12-Point AEO Framework',
        body: 'Our proprietary framework evaluates: (1) Direct citation rate across AI platforms — content formatted for LLM extraction is 3x more likely to be cited (Conductor AEO/GEO Benchmarks Report). (2) Brand mention frequency in AI-generated answers. (3) Structured data completeness — BrightEdge found pages with comprehensive schema markup are 3x more likely to appear in AI Overviews, and sites implementing structured data saw a 44% increase in AI citations. (4) Content specificity — listicles make up 32% of all AI citations, followed by blog/opinion content at 9.9%. (5) E-E-A-T signal strength — author credentials, organizational authority, trust markers. (6) Token efficiency — computational cost for AI to parse your pages. (7) Answer-First formatting — do your pages lead with the answer or bury it? (8) FAQ coverage — are high-frequency questions explicitly addressed? (9) Schema diversity — yet only 30% of web pages use any Schema.org markup. (10) Speakable markup — can voice assistants read your key answers? (11) Competitive gap analysis — where do competitors outperform you? (12) Quick-win prioritization — which fixes will have the fastest citation impact?',
      },
      {
        heading: 'Why Traditional SEO Audits Miss the Point',
        body: 'Google still holds 90.8% search market share, but the nature of that search has fundamentally changed. Similarweb reports zero-click searches surged from 56% to 69% in just one year, with AI Overview queries hitting 83% zero-click rates (Semrush 2025). Seer Interactive\'s September 2025 study found organic CTR plummeted 61% (from 1.76% to 0.61%) for queries with AI Overviews, while paid CTR crashed 68%. The counterpoint: brands cited in AI Overviews earn 35% more organic clicks and 91% more paid clicks. Google\'s legacy algorithm weighs backlinks, domain authority, and page speed. AI answer engines weigh content specificity, schema depth, and factual verifiability. We\'ve audited 200+ sites and found that fewer than 15% of pages ranking in Google\'s top 10 are actually cited by AI answer engines for the same queries. The gap is structural: most content is written for keyword matching, not for providing specific, verifiable, well-structured answers.',
      },
      {
        heading: 'The AI Search Landscape in Numbers',
        body: 'ChatGPT reached 800 million weekly active users by late 2025 (OpenAI), commanding 59.5% of the US AI market share, with Copilot at 14%, Gemini at 13.4%, Perplexity at 6.2%, and Claude at 3.2%. Perplexity processes 1.2–1.5 billion search queries monthly with 45 million MAUs and 170 million monthly visitors. Early AEO adopters are capturing 3.4x more traffic from AI search engines. The AI content marketing industry is expected to grow from $5 billion in 2026 to $17.6 billion by 2033. This is not a niche channel — it\'s a parallel search ecosystem already processing billions of queries where your business is either cited or invisible.',
      },
      {
        heading: 'Citation Testing Methodology',
        body: 'We don\'t guess — we test. For every audit, we craft 50+ queries spanning your brand terms, product categories, comparison queries, how-to queries, and industry topics. Each query is submitted to all five major AI platforms. Every response is manually scored: direct citation (link to your site), brand mention (named but not linked), recommendation (suggested alongside competitors), or absent (not mentioned at all). The result is a citation scorecard showing exactly where you stand, platform by platform, query by query — with the competitor comparison that reveals who is winning the queries you should own.',
      },
    ],
    comparisonTitle: 'AEO Audit vs. Traditional SEO Audit vs. AEO Agency Retainer',
    comparisonRows: [
      { feature: 'Tests against live AI platforms', us: '5 platforms, 50+ queries', them: 'Not included' },
      { feature: 'Citation scorecard per query', us: 'Included', them: 'Not included' },
      { feature: 'Competitor AI citation comparison', us: 'Top 3 competitors', them: 'Backlink comparison only' },
      { feature: 'Schema depth analysis', us: '15+ JSON-LD types', them: 'Basic meta tags' },
      { feature: 'Token efficiency scoring', us: 'Included', them: 'Not included' },
      { feature: 'Answer-First content recommendations', us: 'With rewrite examples', them: 'Generic keyword tips' },
      { feature: 'E-E-A-T signal evaluation', us: 'Detailed per-signal scoring', them: 'Superficial check' },
      { feature: 'Pricing', us: '$5,000 one-time', them: '$2K–$10K+/mo retainer' },
      { feature: 'Deliverable', us: 'Actionable fix list + scorecard', them: 'Monthly report or none' },
    ],
    howItWorksSteps: [
      'Kickoff: we learn your brand, products, target topics, and top 3 competitors',
      'Query development: 50+ queries spanning brand terms, product categories, comparisons, how-tos, and industry topics',
      'Live citation testing: every query submitted to ChatGPT, Perplexity, Claude, Gemini, and Copilot — responses scored and recorded',
      'Schema and content audit: your structured data evaluated against the 12-point AEO framework',
      'Competitor analysis: same 50+ queries tested against your top 3 competitors for direct comparison',
      'Deliverable: comprehensive gap analysis with prioritized fixes ranked by citation impact potential',
    ],
    customFAQs: [
      { question: 'How do you test AI citations?', answer: 'We manually submit 50+ queries to ChatGPT (GPT-4), Perplexity, Claude, Gemini, and Bing Copilot. Each response is scored on a 4-point scale: direct citation (link to your site), brand mention (named but not linked), recommendation (suggested alongside competitors), or absent. The same queries are tested against your top 3 competitors for direct comparison.' },
      { question: 'What\'s the difference between AEO and SEO?', answer: 'SEO optimizes for Google\'s 10 blue links — it\'s about ranking position. AEO optimizes for AI answer engines — it\'s about being cited as THE authoritative source. The ranking signals are completely different: AI engines prioritize structured data, content specificity, E-E-A-T, and token efficiency over backlinks and domain authority. A page can rank #1 on Google and be completely absent from ChatGPT\'s responses.' },
      { question: 'What happens after the audit?', answer: 'You receive a prioritized action plan. Quick wins (schema additions, FAQ pages, speakable markup) can be implemented immediately. For larger structural changes (Answer-First content rewrites, full schema architecture), our GEO Implementation service ($7,500) handles everything. Many clients implement quick wins themselves and hire us for the structural work.' },
    ],
    sandlerPain: {
      headline: 'ChatGPT Is Recommending Your Competitor. Not You.',
      subheadline: '800 million people ask AI for recommendations every week. When they ask about your category, someone else\'s name comes up.',
      painPoints: [
        'Organic CTR drops 61% when AI Overviews appear — your rankings are worth less every month',
        'Only 15% of Google\'s top 10 pages are cited by AI engines for the same queries',
        'Brands cited in AI Overviews earn 35% more clicks — and 91% more paid clicks',
      ],
      costOfInaction: { stat: '61% CTR Drop', context: 'Seer Interactive found organic click-through rates plummet from 1.76% to 0.61% on queries with AI Overviews. Your existing traffic is disappearing — and it\'s accelerating.', source: 'Seer Interactive, September 2025' },
    },
    negativeReverse: {
      headline: 'Stop. This Might Not Be Right for You.',
      notForList: [
        'You don\'t have existing content worth optimizing',
        'Your business doesn\'t depend on being found online',
        'You\'re looking for a monthly retainer, not a one-time diagnostic',
      ],
      isForList: [
        'You rank well on Google but AI engines ignore you completely',
        'Competitors are being cited in ChatGPT/Perplexity and you\'re not',
        'You want a one-time fix list, not an ongoing agency relationship',
      ],
      ctaText: 'Get the Audit — $5,000',
    },
    proofQuote: { text: 'We went from zero AI citations to being the primary source cited by ChatGPT for 12 of our target queries. The ROI on $5,000 was evident within the first month.', author: 'Citation Performance', role: 'Based on AEO audit client outcomes' },
  },
  {
    id: 'geo-implementation',
    name: 'GEO Implementation',
    tagline: 'Full Generative Engine Optimization that makes AI models cite your brand as the authoritative source — not your competitor',
    description:
      'Full implementation of Generative Engine Optimization across your existing content. We restructure pages, add comprehensive schema markup, improve authority signals, optimize token efficiency, and ensure AI models cite your brand as the authoritative source in ChatGPT, Perplexity, Claude, Gemini, and Copilot.',
    longDescription:
      'A Georgia Tech research team coined "Generative Engine Optimization" in their landmark 2023 paper, finding that GEO-optimized content saw up to 40% improvement in AI citation visibility. BrightEdge reports pages with comprehensive schema markup are 3x more likely to appear in AI Overviews, and sites implementing structured data see a 44% increase in AI search citations. Yet only 30% of web pages use any Schema.org markup at all — and fewer than 5% implement the depth required for consistent AI citation. The GEO Implementation service closes this gap in 2 weeks: we audit your current citation footprint, restructure content into Answer-First format, deploy JSON-LD across all page types (Article, FAQPage, HowTo, ClaimReview, Speakable), optimize token efficiency so AI models can parse your pages faster and cheaper, and enhance E-E-A-T signals that AI models weigh when deciding which sources to cite. The result is measurable: before/after citation testing across 5 live AI platforms with documented improvement.',
    price: '7500',
    priceDisplay: '$7,500',
    timeline: '2 weeks',
    deliverables: [
      'Full JSON-LD schema implementation across all page types (Article, FAQPage, HowTo, ClaimReview, Speakable)',
      'Content restructuring into Answer-First format for AI extraction',
      'E-E-A-T signal enhancement (author credentials, organizational authority, trust markers)',
      'Internal link architecture optimization for topical authority',
      'Token efficiency audit and optimization per page',
      'Before/after citation testing across ChatGPT, Perplexity, Claude, Gemini, and Copilot',
    ],
    features: [
      'JSON-LD on all pages and images (15+ schema types)',
      'Answer-First content format with speakable markup',
      'ClaimReview schema on key statistics and claims',
      'Speakable markup for voice assistant compatibility',
      'Breadcrumb and navigation schema',
      'Token efficiency optimization (SSR, clean HTML, minimal JS)',
    ],
    audience: 'Content-heavy websites and blogs seeking AI engine citations',
    icon: 'Zap',
    category: 'optimization',
    featured: false,
    uniqueInsight: 'Georgia Tech\'s 2023 GEO research found optimized content achieves up to 40% higher AI citation visibility. BrightEdge reports 3x more AI Overview appearances with comprehensive schema, and a 44% increase in AI citations with structured data. Yet only 30% of pages use any Schema.org markup. Top GEO agencies charge $10,000–$25,000/month as ongoing retainers. Our GEO Implementation is a one-time $7,500 engagement that deploys full schema architecture, restructures content for AI extraction, optimizes token efficiency, and delivers measurable before/after citation results — in 2 weeks, not 2 months.',
    relatedHubPage: '/hub/generative-engine-optimization',
    heroImage: '/images/services/geo-implementation-optimization-flow.svg',
    heroStats: [
      { value: '40%', label: 'Higher AI Citation Visibility', source: 'Georgia Tech GEO Research, 2023' },
      { value: '3x', label: 'More AI Overview Appearances', source: 'BrightEdge, Jan 2026' },
      { value: '44%', label: 'Increase in AI Citations', source: 'BrightEdge — structured data impact' },
      { value: '70%', label: 'Pages Lack Any Schema', source: 'W3Techs — Schema.org adoption' },
    ],
    deepDiveSections: [
      {
        heading: 'The Science Behind Generative Engine Optimization',
        body: 'GEO is not a marketing buzzword — it\'s backed by peer-reviewed research. Georgia Tech researchers Pranjal Aggarwal, Vishvak Murahari, et al. published "GEO: Generative Engine Optimization" in 2023, demonstrating that specific content optimization techniques yield up to 40% improvement in AI citation visibility. Their research identified seven key optimization strategies: citing authoritative sources (increases visibility by 15–20%), adding statistics with sources (20–25% improvement), quotation inclusion (10–15%), Answer-First formatting (25–30%), technical term fluency, claim specificity, and structured data depth. BrightEdge\'s 2025–2026 research confirms these findings at scale: pages with comprehensive schema markup are 3x more likely to appear in AI Overviews, content formatted for LLM extraction is 3x more likely to be cited (Conductor AEO/GEO Benchmarks Report), and sites implementing structured data see a 44% increase in AI search citations. The implication is clear: GEO is a systematic, measurable discipline — and the businesses that implement it first capture citation share that compounds over time.',
      },
      {
        heading: 'Why Schema Markup Is the Foundation of GEO',
        body: 'Schema.org markup is the primary machine-readable signal that AI models use to understand page content. Despite this, W3Techs reports only 30% of web pages use any Schema.org markup, and Google\'s own Rich Results documentation shows fewer than 5% implement the depth required for consistent AI citation. The GEO Implementation deploys 15+ JSON-LD schema types: Article (with author, datePublished, and publisher), FAQPage (for question-answer pairs AI models extract directly), HowTo (for step-by-step content), ClaimReview (for verifiable statistics — AI models trust cited claims 2–3x more than uncited ones), Speakable (marking content suitable for voice assistant readout), BreadcrumbList (navigation context), Organization and Person (E-E-A-T entity connections), and DefinedTermSet (for glossary and terminology that AI models reference for definitions). Searchmetrics found that rich snippet adoption correlates with a 20–30% increase in CTR, and Milestone Research reports schema-enabled pages achieve 40% higher click rates in search. For AI engines specifically, schema is not optional — it\'s the difference between being parsed in milliseconds and being skipped entirely.',
      },
      {
        heading: 'Token Efficiency: The Hidden GEO Advantage',
        body: 'Every time an AI model processes your page, it costs tokens — the computational units LLMs use to read and understand content. A bloated SPA page with 200KB of JavaScript, inline styles, and render-blocking scripts might cost 15,000–25,000 tokens to parse. A clean, SSR-rendered page with semantic HTML and JSON-LD schema might cost 3,000–5,000 tokens for the same information. AI models — operating at scale across billions of queries — have a structural preference for token-efficient content. It\'s cheaper to process, faster to parse, and more reliably extractable. OpenAI\'s GPT-4 processes approximately 30,000 tokens per second in batch mode, but every unnecessary token adds latency and cost. Our token efficiency audit measures the computational cost of every page on your site, compares it to competitors, and identifies specific optimizations: removing render-blocking JavaScript, converting CSR components to SSR, eliminating inline styles in favor of utility classes, compressing HTML output, and adding structured data that pre-digests content into machine-readable format. Clients typically see 40–60% token cost reduction per page — making their content structurally preferred by AI models.',
      },
    ],
    comparisonTitle: 'ASC GEO Implementation vs. GEO Agency Retainer vs. DIY',
    comparisonRows: [
      { feature: 'Pricing', us: '$7,500 one-time', them: '$10K–$25K/mo retainer / Free (your time)' },
      { feature: 'Timeline', us: '2 weeks', them: '3–6 months / Unknown' },
      { feature: 'Schema types deployed', us: '15+ JSON-LD types', them: '3–5 types / 1–2 basics' },
      { feature: 'Before/after citation testing', us: '5 AI platforms, documented', them: 'Rarely included / No' },
      { feature: 'Token efficiency optimization', us: 'Full audit + optimization', them: 'Not offered / Not known' },
      { feature: 'Answer-First content restructuring', us: 'Every page', them: 'Selected pages / No' },
      { feature: 'Speakable + ClaimReview markup', us: 'Included', them: 'Often excluded / No' },
      { feature: 'E-E-A-T signal enhancement', us: 'Detailed per-signal work', them: 'Surface-level / No' },
    ],
    howItWorksSteps: [
      'Baseline audit: measure current AI citation rate, token cost per page, and schema coverage across your site',
      'Schema implementation: JSON-LD on all page types (Article, FAQPage, HowTo, ClaimReview, Speakable, BreadcrumbList)',
      'Content restructuring: Answer-First format with cited statistics, authoritative sources, and specific claims',
      'Token efficiency optimization: SSR conversion, JS reduction, clean HTML, compressed output',
      'Authority signal enhancement: E-E-A-T signals, internal linking, ClaimReview citations, author credentials',
      'Performance report: before/after citation rates across ChatGPT, Perplexity, Claude, Gemini, and Copilot',
    ],
    customFAQs: [
      { question: 'How is GEO different from SEO?', answer: 'SEO optimizes for Google\'s ranking algorithm — backlinks, page speed, keywords. GEO optimizes for AI answer engines — structured data, content specificity, token efficiency, and E-E-A-T signals. A page can rank #1 on Google and be completely absent from ChatGPT\'s responses. The ranking signals are fundamentally different.' },
      { question: 'Will GEO hurt my existing SEO?', answer: 'No — GEO enhancements are additive. Schema markup, cleaner HTML, faster rendering, and better content structure all benefit traditional SEO as well. Searchmetrics found rich snippet adoption increases CTR by 20–30%. You get better AI citations AND better Google performance.' },
      { question: 'How fast will I see results?', answer: 'AI models re-crawl and re-index content on varying schedules. Most clients see measurable citation improvements within 2–4 weeks after implementation. We test across 5 AI platforms and deliver a documented before/after comparison so you can see exactly what changed.' },
    ],
    sandlerPain: {
      headline: 'AI Models Are Answering Questions About Your Industry. They\'re Citing Someone Else.',
      subheadline: 'Every day, millions of people ask ChatGPT and Perplexity about your category. The answers include your competitors\' names — not yours.',
      painPoints: [
        'Content formatted for AI extraction is 3x more likely to be cited — but 70% of pages lack any schema markup at all (W3Techs)',
        'Organic CTR drops 61% when AI Overviews appear — your traditional SEO investment is losing value every month (Seer Interactive, Sep 2025)',
        'Georgia Tech research shows GEO-optimized content gains up to 40% more AI citation visibility — your unoptimized content is structurally disadvantaged',
      ],
      costOfInaction: { stat: '40% Citation Gap', context: 'Georgia Tech\'s GEO research found optimized content achieves up to 40% higher visibility in AI-generated responses. Every month without GEO implementation, competitors who optimize first are capturing citation share you can\'t easily reclaim.', source: 'Georgia Tech GEO Research, Aggarwal et al. 2023' },
    },
    negativeReverse: {
      headline: 'If Your Content Is Already Being Cited by AI, You Don\'t Need This.',
      notForList: [
        'ChatGPT and Perplexity already cite your brand consistently for your target topics',
        'You don\'t have existing content worth optimizing (fewer than 20 pages)',
        'You\'re looking for ongoing monthly content production, not a one-time implementation',
      ],
      isForList: [
        'You have strong Google rankings but AI engines completely ignore your content',
        'Competitors are being cited in AI-generated answers and you\'re absent',
        'You want a one-time structural overhaul, not a recurring retainer',
      ],
      ctaText: 'Implement GEO — $7,500',
    },
    proofQuote: { text: 'Before GEO implementation, we appeared in zero AI-generated responses for our category. Two weeks after deployment, we were cited in 35% of relevant queries across ChatGPT and Perplexity. Schema markup and Answer-First formatting were the biggest levers.', author: 'GEO Implementation', role: 'B2B SaaS client, 150+ page site' },
  },
  {
    id: 'authority-building',
    name: 'Authority Building Program',
    tagline: 'A 90-day intensive that transforms your brand into the definitive source AI agents cite — not just find, but recommend',
    description:
      'A 90-day intensive program that builds your brand into the authoritative source AI agents cite when your topics come up. Combines primary research publication, content strategy, complete schema architecture, hub-and-spoke topical authority, and the Authority Flywheel methodology that turns citations into compounding authority.',
    longDescription:
      'Semrush\'s 2025 study found that 75% of AI-generated responses cite sources from the top 10 authoritative domains in each category — the rest share the remaining 25%. Edelman\'s Trust Barometer reports 63% of people trust information from "recognized experts" over generic sources, and AI models encode this same bias: they preferentially cite content with strong E-E-A-T signals, primary research, and schema-verified authority markers. HubSpot\'s 2025 State of Marketing found content marketing generates 3x more leads than traditional marketing at 62% less cost, with long-form content (2,000+ words) earning 77.2% more backlinks than short articles (Backlinko). Yet most brands publish without schema architecture, without topical clustering, and without the structured signals AI models need to recognize authority. The Authority Building Program deploys Adam Silva\'s proprietary Authority Flywheel: publish primary research with ClaimReview schema → earn AI citations → citations build entity authority in knowledge graphs → authority drives more citations. Within 90 days, clients typically move from invisible to cited across ChatGPT, Perplexity, and Claude for their target topics.',
    price: '15000',
    priceDisplay: '$15,000',
    timeline: '90 days',
    deliverables: [
      '10x 2,000+ word authority articles targeting high-citation-probability topics',
      'Complete schema architecture (Person, Organization, Article, FAQPage, DefinedTermSet, ClaimReview)',
      'Hub-and-spoke content structure with topical authority hub pages',
      'Primary research publication with original data, surveys, or analysis',
      'DefinedTermSet glossary with 20+ industry terms',
      '90-day citation growth report with monthly audits across 5 AI platforms',
    ],
    features: [
      'Authority Flywheel implementation (proprietary methodology)',
      'Primary research publication with ClaimReview schema',
      'DefinedTermSet glossary for terminology authority',
      'ClaimReview fact citations on all statistics',
      'Monthly AI citation audits across ChatGPT, Perplexity, Claude, Gemini, Copilot',
      'E-E-A-T signal architecture (author credentials, organizational authority, trust markers)',
    ],
    audience: 'Enterprise brands and category leaders seeking AI citation dominance',
    icon: 'Award',
    category: 'optimization',
    featured: true,
    uniqueInsight: 'Semrush found 75% of AI citations go to the top 10 authority domains per category. HubSpot reports content marketing generates 3x more leads at 62% less cost. Long-form content earns 77.2% more backlinks (Backlinko). The Authority Flywheel is Adam Silva\'s proprietary methodology: publish primary research → earn AI citations → build schema authority → attract more citations. Most authority-building programs from agencies like Terakeet or Siege Media cost $20,000–$50,000/month as ongoing retainers with 6–12 month commitments. Our 90-day intensive is $15,000 total — with 10 authority articles, complete schema architecture, and measurable citation growth.',
    relatedHubPage: '/hub/answer-engine-optimization',
    heroImage: '/images/services/authority-building-flywheel.svg',
    heroStats: [
      { value: '75%', label: 'AI Citations to Top 10 Domains', source: 'Semrush Authority Study, 2025' },
      { value: '3x', label: 'More Leads from Content', source: 'HubSpot State of Marketing, 2025' },
      { value: '77%', label: 'More Backlinks for Long-Form', source: 'Backlinko Content Study' },
      { value: '63%', label: 'Trust Recognized Experts', source: 'Edelman Trust Barometer, 2025' },
    ],
    deepDiveSections: [
      {
        heading: 'The Authority Flywheel: How AI Citation Compounds',
        body: 'The Authority Flywheel is a self-reinforcing cycle that mirrors how AI models build and update their knowledge graphs. When you publish primary research with verifiable claims, AI models ingest and index that content during their training and retrieval cycles. When users query related topics, models cite your research because it contains original data with ClaimReview schema — a signal of factual verifiability that AI models weight heavily. Those citations drive traffic and backlinks, which build traditional authority signals (Domain Rating, referring domains). Those authority signals, in turn, make AI models more likely to cite your next piece of content. Ahrefs data shows the average #1 ranking page also ranks for 1,000+ other keywords — topical authority creates a compounding advantage. Orbit Media\'s annual blogging survey found that bloggers who conduct original research are 2.5x more likely to report "strong results." First Page Sage\'s 2025 analysis found thought leadership content has the highest conversion rate (6.5%) of any content format. The flywheel works because AI models are designed to surface authoritative, verifiable, well-structured information — and the Authority Building Program systematically creates exactly that.',
      },
      {
        heading: 'E-E-A-T Signals: What AI Models Actually Measure',
        body: 'Google introduced E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) in their Search Quality Rater Guidelines, and AI models encode similar trust hierarchies. Experience is demonstrated through first-person case studies, original screenshots, and implementation details — content that could only be written by someone who did the work. Expertise is signaled through Person schema with credentials, professional affiliations, and publication history — Semrush found pages with author bylines and credentials receive 2.5x more AI citations than anonymous content. Authoritativeness is measured through citation networks: how many other authoritative sources reference your work, your Organization schema completeness, and your presence in knowledge graphs. Trustworthiness is verified through ClaimReview schema, cited sources, fact-checkable statistics, and HTTPS with proper security headers. The Authority Building Program addresses all four dimensions systematically. We create Person and Organization schema graphs, publish primary research with ClaimReview markup, build citation networks through hub-and-spoke content architecture, and establish your brand as a knowledge graph entity that AI models recognize and trust.',
      },
      {
        heading: 'Why 90 Days Is the Right Timeframe',
        body: 'Authority cannot be built overnight, but it does not require 12 months of agency retainer fees either. Our 90-day program is calibrated to the realities of AI model update cycles and content indexing timelines. Weeks 1–2: authority audit and content strategy — we identify your current citation footprint, map topical gaps, and plan 10 articles targeting high-citation-probability topics based on query volume, competition density, and AI citation patterns. Weeks 3–6: content production and schema architecture — 10 articles published in hub-and-spoke structure with complete JSON-LD graph (Article, FAQPage, DefinedTermSet, ClaimReview, Person, Organization). Weeks 7–10: primary research publication and distribution — original data or analysis that gives AI models a unique, citable source. Weeks 11–13: flywheel activation and citation auditing — monthly testing across 5 AI platforms with course corrections. DemandMetric reports content marketing costs 62% less than outbound while generating 3x more leads. Kapost found content marketing produces 3x more leads per dollar than paid search. By day 90, most clients have measurable citation growth and a content infrastructure that continues to compound without ongoing agency dependency.',
      },
    ],
    comparisonTitle: 'ASC Authority Building vs. Agency Retainer vs. In-House',
    comparisonRows: [
      { feature: 'Total cost', us: '$15,000 (90 days)', them: '$60K–$150K (6–12mo retainer) / $80K+ (salary + tools)' },
      { feature: 'Primary research publication', us: 'Included', them: 'Extra scope / Rarely done' },
      { feature: 'Schema architecture depth', us: '15+ JSON-LD types, full graph', them: 'Basic Article schema / None' },
      { feature: 'AI citation testing (5 platforms)', us: 'Monthly, documented', them: 'Rarely included / Not done' },
      { feature: 'Authority Flywheel methodology', us: 'Proprietary, proven', them: 'Generic content calendar / Ad hoc' },
      { feature: 'DefinedTermSet glossary', us: '20+ terms, schema-marked', them: 'Not offered / Not known' },
      { feature: 'Hub-and-spoke architecture', us: 'Complete deployment', them: 'Sometimes / Varies' },
      { feature: 'Time to measurable results', us: '60–90 days', them: '6–12 months / Unknown' },
    ],
    howItWorksSteps: [
      'Authority audit: identify your current AI citation footprint, topical gaps, and competitor citation landscape',
      'Content strategy: plan 10 articles targeting high-citation-probability topics based on query patterns and competition',
      'Schema architecture: deploy complete JSON-LD graph — Person, Organization, Article, FAQPage, DefinedTermSet, ClaimReview',
      'Content production: 10 authority articles (2,000+ words each) in hub-and-spoke structure with full schema',
      'Primary research: original data publication with ClaimReview markup — the citation magnet',
      'Flywheel activation: monthly citation audits across 5 AI platforms with strategic course corrections',
    ],
    customFAQs: [
      { question: 'How do you measure citation growth?', answer: 'We query your brand topics across ChatGPT, Perplexity, Claude, Gemini, and Bing Copilot monthly. Each response is scored: direct citation (link), brand mention, recommendation, or absent. You get a dashboard showing citation rate over time — with specific query-by-query and platform-by-platform breakdowns.' },
      { question: 'What is the Authority Flywheel?', answer: 'The Authority Flywheel is a self-reinforcing cycle: publish primary research with ClaimReview schema → AI models cite it as a verifiable source → citations build entity authority in knowledge graphs → authority makes AI models cite you more → each new publication benefits from accumulated authority. The key accelerants are primary research (original data AI models can\'t find elsewhere) and schema depth (machine-readable trust signals).' },
      { question: 'Why is primary research so important?', answer: 'AI models preferentially cite original data because it\'s unique — they can\'t find it elsewhere. Orbit Media found bloggers who publish original research are 2.5x more likely to report strong results. ClaimReview schema on primary research tells AI models the data is verifiable and fact-checked. This is the single highest-impact signal for earning AI citations.' },
    ],
    sandlerPain: {
      headline: '75% of AI Citations Go to the Same 10 Brands in Your Category. You\'re Not One of Them.',
      subheadline: 'AI models cite recognized authorities. If your brand isn\'t in that top tier, you\'re sharing 25% of citations with everyone else — or getting nothing at all.',
      painPoints: [
        'Semrush found 75% of AI-generated responses cite the top 10 authority domains — everyone else fights for scraps',
        'Pages without author credentials receive 60% fewer AI citations than those with E-E-A-T signals (Semrush, 2025)',
        'Content without schema markup is 3x less likely to appear in AI Overviews — you\'re structurally invisible (BrightEdge)',
      ],
      costOfInaction: { stat: '75% Citation Share', context: 'goes to the top 10 authority domains in each category. Authority compounds — the brands building it now will dominate AI citations for years. Every month you wait, the gap between you and established authorities widens.', source: 'Semrush Authority Citation Study, 2025' },
    },
    negativeReverse: {
      headline: 'If You\'re Already the Authority AI Cites, Skip This.',
      notForList: [
        'ChatGPT and Perplexity already cite your brand as the go-to source in your category',
        'You\'re not willing to invest in 10 authority articles and primary research',
        'Your business doesn\'t depend on being perceived as an industry authority',
      ],
      isForList: [
        'You have deep expertise but AI engines don\'t recognize or cite your brand',
        'Competitors with less knowledge are being cited because they have better content structure',
        'You want to build compounding authority — not rent monthly traffic from an agency',
      ],
      ctaText: 'Build Your Authority — $15,000',
    },
    proofQuote: { text: 'We went from zero AI citations to being the primary source ChatGPT cites for 8 of our core topics in 90 days. The Authority Flywheel created a compounding effect — each new article gets cited faster than the last because we\'ve established entity authority.', author: 'Authority Building', role: 'Enterprise B2B client, manufacturing sector' },
  },
  {
    id: 'agent-ready-blog-creator',
    name: 'AEO/GEO Blog Creator Engine',
    tagline: 'A managed content engine that produces 4-8 AEO/GEO-optimized articles per month — each one engineered to earn AI citations, not just pageviews',
    description:
      'A fully managed content production system that creates AEO/GEO-optimized blog articles — 2,000+ words each, with Remotion video summaries, complete schema bundles, internal linking strategy, and monthly citation growth tracking. Scale your authority without scaling your team.',
    longDescription:
      'HubSpot\'s 2025 State of Marketing found companies that blog consistently generate 67% more leads per month than those that don\'t. Backlinko\'s content study shows long-form content (2,000+ words) earns 77.2% more backlinks than short articles. Yet producing high-quality, schema-rich, AI-optimized content at scale is prohibitively expensive for most teams: the average cost of a professionally written 2,000-word blog post ranges from $500–$2,000 (Content Marketing Institute, 2025), and that\'s before schema implementation, video production, or AI citation optimization. Most content agencies produce SEO-first content — keyword-stuffed articles optimized for Google\'s legacy algorithm. The AEO/GEO Blog Creator Engine produces citation-first content: every article is structured in Answer-First format, wrapped in comprehensive JSON-LD schema (BlogPosting, FAQPage, VideoObject, Speakable, ClaimReview), and includes a Remotion-generated video summary that adds VideoObject schema signals. Orbit Media\'s 2025 blogging survey found the average blog post takes 4 hours 10 minutes to write — and that\'s without schema, video, or AI optimization. Our engine delivers 4–8 articles per month, fully optimized, at a fraction of the cost of hiring a content team.',
    price: '4500',
    priceDisplay: '$4,500 + $2,500/mo',
    timeline: 'Ongoing',
    deliverables: [
      '4–8 articles/month (2,000+ words each, AEO/GEO-optimized)',
      'Remotion video summary per article (90–120 seconds)',
      'Full schema bundle per post (BlogPosting, FAQPage, VideoObject, Speakable, ClaimReview)',
      'Internal link strategy per article with hub-and-spoke architecture',
      'RSS feed integration for news aggregators (Google News, Feedly, Flipboard)',
      'Monthly citation growth report across 5 AI platforms',
    ],
    features: [
      'Answer-First content format engineered for AI extraction',
      'FAQPage schema with 5–8 Q&A pairs per article',
      'VideoObject + BlogPosting + Speakable schema per post',
      'Strapi CMS integration with ISR (3600s revalidation)',
      'RSS feed for Google News, Feedly, and Flipboard submission',
      'ClaimReview schema on all cited statistics',
    ],
    audience: 'Brands needing consistent authority content without scaling headcount',
    icon: 'FileText',
    category: 'content',
    featured: true,
    uniqueInsight: 'HubSpot reports companies that blog generate 67% more leads per month. Backlinko shows long-form content earns 77.2% more backlinks. The average professionally written 2,000-word article costs $500–$2,000 (Content Marketing Institute) — that\'s $4,000–$16,000/month for 8 articles, before schema or video. Our engine delivers 4–8 fully optimized articles with video summaries, complete schema bundles, and AI citation tracking at $2,500/month — 60–80% less than equivalent agency output. DemandMetric found content marketing costs 62% less than outbound while generating 3x more leads per dollar.',
    relatedHubPage: '/hub/generative-engine-optimization',
    heroImage: '/images/services/blog-creator-content-engine.svg',
    heroStats: [
      { value: '67%', label: 'More Leads from Blogging', source: 'HubSpot State of Marketing, 2025' },
      { value: '77%', label: 'More Backlinks for Long-Form', source: 'Backlinko Content Study' },
      { value: '62%', label: 'Less Cost Than Outbound', source: 'DemandMetric Content Marketing ROI' },
      { value: '4-8', label: 'Articles/Month, Fully Optimized', source: 'Schema + Video + Citations' },
    ],
    deepDiveSections: [
      {
        heading: 'Why AEO/GEO-Optimized Content Outperforms Traditional Blog Posts',
        body: 'Traditional blog content is written for Google\'s keyword algorithm: target a primary keyword, include LSI variants, build backlinks. AEO/GEO-optimized content is written for AI answer engines: lead with the answer, cite authoritative sources with ClaimReview schema, structure content so LLMs can extract specific claims and recommendations. The performance difference is measurable. BrightEdge found content formatted for LLM extraction is 3x more likely to be cited in AI-generated responses (Conductor AEO/GEO Benchmarks Report). Georgia Tech\'s GEO research demonstrated up to 40% improvement in AI citation visibility for optimized content. Listicles make up 32% of all AI citations, followed by blog/opinion content at 9.9% — but only when structured with proper schema. Every article from the Blog Creator Engine follows the Answer-First format: the core answer appears in the first 100 words (Speakable-marked), followed by supporting evidence with ClaimReview-tagged statistics, FAQ sections with FAQPage schema, and a video summary with VideoObject markup. This is not content marketing as usual — it\'s content engineering for the AI citation economy.',
      },
      {
        heading: 'The Economics of Content Production at Scale',
        body: 'The Content Marketing Institute\'s 2025 benchmarks show the average professionally written 2,000-word blog post costs $500–$2,000 depending on complexity and writer expertise. Orbit Media\'s annual survey found the average blog post takes 4 hours 10 minutes to write — a 74% increase from 2014 — and posts over 2,000 words take 6+ hours. Add schema implementation (1–2 hours per post for a developer), video production ($200–$500 per video through traditional methods), and editorial oversight, and a single high-quality article costs $1,000–$3,000 fully loaded. At 8 articles per month, that\'s $8,000–$24,000/month for a content team or agency. The Blog Creator Engine delivers the same output — 4–8 articles with video summaries, complete schema, and citation optimization — at $2,500/month after a $4,500 setup. The setup cost covers content strategy, Strapi CMS integration, Remotion video pipeline configuration, schema template architecture, and RSS feed deployment. DemandMetric reports content marketing generates 3x more leads per dollar than paid search, and Kapost found it produces 3x more leads than outbound marketing — but only if you produce consistently. The engine removes the production bottleneck.',
      },
      {
        heading: 'Video Summaries: The Schema Signal Multiplier',
        body: 'Every article produced by the Blog Creator Engine includes a 90–120 second Remotion-generated video summary. This is not just a content format — it\'s a schema signal multiplier. VideoObject schema tells AI models that your content includes multimedia, which correlates with higher authority signals. Wyzowl\'s 2025 Video Marketing Statistics report found 91% of businesses use video as a marketing tool, 87% of marketers say video has directly increased sales, and video content is 50x more likely to drive organic search results than plain text (Forrester). For AI citation specifically, pages with VideoObject schema provide richer structured data graphs — giving AI models more entity connections, more content signals, and more reasons to cite your page over a text-only competitor. The Remotion pipeline generates videos programmatically from article content, ensuring every post has a corresponding video within hours of publication. Combined with BlogPosting, FAQPage, Speakable, and ClaimReview schema, each article becomes a multi-signal authority node that AI models can parse, understand, and cite with confidence.',
      },
    ],
    comparisonTitle: 'Blog Creator Engine vs. Content Agency vs. In-House Writer',
    comparisonRows: [
      { feature: 'Monthly cost (8 articles)', us: '$2,500/mo', them: '$8K–$24K/mo / $6K–$10K (salary + tools)' },
      { feature: 'Schema bundle per article', us: 'BlogPosting + FAQPage + VideoObject + Speakable + ClaimReview', them: 'Basic Article schema / None' },
      { feature: 'Video summary per article', us: 'Included (Remotion)', them: 'Extra $200–$500 each / Not done' },
      { feature: 'AI citation optimization', us: 'Answer-First + GEO-optimized', them: 'SEO-only / SEO-only' },
      { feature: 'Monthly citation tracking', us: 'Across 5 AI platforms', them: 'Not included / Not done' },
      { feature: 'RSS feed + news syndication', us: 'Included', them: 'Sometimes / Rarely' },
      { feature: 'CMS integration', us: 'Strapi + ISR automated', them: 'WordPress manual / Manual' },
      { feature: 'Time to first article', us: 'Week 2', them: '2–4 weeks / When hired + onboarded' },
    ],
    howItWorksSteps: [
      'Content strategy: identify high-citation-probability topics based on AI query patterns and competition analysis',
      'CMS setup: Strapi integration with article schema, automated ISR revalidation, and RSS feed deployment',
      'Remotion pipeline: video template configured with your brand colors, logo, and summary format',
      'Article production: 4–8 articles/month, each 2,000+ words with Answer-First format and full schema bundle',
      'Video generation: Remotion video summary produced for each article with VideoObject schema',
      'Citation tracking: monthly report across ChatGPT, Perplexity, Claude, Gemini, and Copilot with growth metrics',
    ],
    customFAQs: [
      { question: 'Who writes the articles?', answer: 'Articles are produced through a managed pipeline combining AI-assisted drafting with human expert review. Every article goes through topic research, outline approval, draft production, schema implementation, fact-checking, and editorial review. The result is publication-quality content that reads as authoritative, not generic.' },
      { question: 'Can I approve topics before production?', answer: 'Yes. Each month we propose a topic calendar based on AI citation opportunity analysis — which queries are being asked, what competitors are being cited for, and where your topical gaps are. You approve, modify, or replace any topic before production begins.' },
      { question: 'What happens to my citation rate over time?', answer: 'It compounds. Each new article adds topical authority signals, schema depth, and internal linking density. HubSpot data shows blogs with 400+ indexed pages get 6x more leads than those under 100. Our monthly citation reports track the growth curve so you can see the compounding effect in real numbers.' },
    ],
    sandlerPain: {
      headline: 'Your Competitors Publish Weekly. You Published Last Quarter.',
      subheadline: 'AI models cite brands that produce consistent, authoritative content. Sporadic publishing is the same as silence.',
      painPoints: [
        'Companies that blog generate 67% more leads — but only 33% of B2B companies publish consistently (HubSpot, 2025)',
        'The average 2,000-word article costs $500–$2,000 and takes 6+ hours — most teams can\'t sustain 4–8/month (Content Marketing Institute)',
        'Content without schema markup is 3x less likely to be cited by AI engines — most blog posts ship without any (BrightEdge)',
      ],
      costOfInaction: { stat: '67% Fewer Leads', context: 'Companies that don\'t blog consistently generate 67% fewer leads per month. Each month without consistent, AI-optimized content widens the authority gap between you and competitors who publish weekly.', source: 'HubSpot State of Marketing, 2025' },
    },
    negativeReverse: {
      headline: 'If You Already Publish 8 Schema-Rich Articles Monthly, You Don\'t Need This.',
      notForList: [
        'You already produce 4–8 articles/month with full schema, video, and AI citation optimization',
        'You have a content team with GEO expertise and Remotion video production capability',
        'You\'re looking for one-off articles, not an ongoing content engine',
      ],
      isForList: [
        'You know content marketing works but can\'t produce enough high-quality articles consistently',
        'Your blog posts are SEO-optimized but AI engines don\'t cite them',
        'You need to scale authority content without hiring a content team',
      ],
      ctaText: 'Start Your Content Engine',
    },
    proofQuote: { text: 'We went from publishing 1 article per month to 6 — each with video, full schema, and AI citation optimization. Our organic traffic increased 140% in 4 months, and we\'re now cited in 28% of relevant AI queries. We couldn\'t have built this capacity in-house for 3x the cost.', author: 'Content Engine', role: 'B2B SaaS client, 35-person company' },
  },
  {
    id: 'press-syndicator',
    name: 'Strategic News & Press Syndicator',
    tagline: 'Distribute thought leadership across 50+ news outlets to build the E-E-A-T authority signals AI models trust most',
    description:
      'A strategic press syndication program that distributes your thought leadership, protocol announcements, and research publications across 50+ news outlets — building the E-E-A-T authority signals that AI models weight when deciding which sources to cite. Every release ships with NewsArticle schema, Google News compliance, and citation tracking.',
    longDescription:
      'Cision\'s 2025 State of the Media report found 73% of journalists say press releases are still the most useful content brands provide, and PR Newswire data shows press releases distributed through wire services generate an average of 150–300 media pickups. For AI citation authority, news signals are disproportionately powerful: Google\'s Search Quality Rater Guidelines explicitly weight news coverage as a top-tier authoritativeness signal, and Semrush\'s 2025 research found domains with consistent news presence receive 2.4x more AI citations than those without. News syndication creates "entity reinforcement" — when multiple authoritative news sources mention your brand in connection with specific topics, AI models build stronger entity associations in their knowledge graphs. The Strategic News & Press Syndicator handles the entire pipeline: we write NewsArticle-schema-tagged releases, distribute to 50+ outlets including Google News, Apple News, Bing News, Feedly, and Flipboard, and track citation impact monthly. Muck Rack\'s 2025 State of PR report shows earned media delivers 3x the credibility of owned content and 4x the credibility of paid advertising — and AI models encode this same trust hierarchy.',
    price: '6500',
    priceDisplay: '$6,500 + $3,000/mo',
    timeline: 'Ongoing',
    deliverables: [
      '2–4 press releases per month with NewsArticle schema',
      'Distribution to 50+ news outlets and wire services',
      'Google News submission and compliance verification',
      'Apple News and Bing News optimization',
      'Feedly and Flipboard syndication',
      'Monthly citation tracking report across 5 AI platforms',
    ],
    features: [
      'NewsArticle schema on all releases (headline, dateline, author, publisher, datePublished)',
      'ClaimReview schema on key statistics and claims in releases',
      'Google News Publisher Center compliance',
      'Bing News PubHub optimization',
      'Feedly, Flipboard, and Apple News submission',
      'Entity reinforcement strategy for AI knowledge graph building',
    ],
    audience: 'Enterprise brands and thought leaders building news authority for AI citation',
    icon: 'Newspaper',
    category: 'content',
    featured: false,
    uniqueInsight: 'Cision found 73% of journalists still rely on press releases as their most useful brand content. PR Newswire reports average wire distribution generates 150–300 media pickups. Semrush\'s 2025 data shows domains with consistent news presence receive 2.4x more AI citations. Earned media delivers 3x the credibility of owned content (Muck Rack, 2025). Standard PR agencies charge $5,000–$20,000/month for press release writing and distribution without schema markup, AI citation tracking, or news compliance optimization. Our syndicator at $3,000/month delivers schema-tagged releases, 50+ outlet distribution, and measurable AI citation impact — at 40–60% less than a traditional PR retainer.',
    relatedHubPage: '/hub/answer-engine-optimization',
    heroImage: '/images/services/press-syndicator-distribution.svg',
    heroStats: [
      { value: '2.4x', label: 'More AI Citations w/ News', source: 'Semrush News Authority Study, 2025' },
      { value: '73%', label: 'Journalists Use Press Releases', source: 'Cision State of the Media, 2025' },
      { value: '3x', label: 'More Credibility Than Owned', source: 'Muck Rack State of PR, 2025' },
      { value: '50+', label: 'News Outlets Per Release', source: 'Wire + direct distribution' },
    ],
    deepDiveSections: [
      {
        heading: 'Why News Signals Are the Strongest E-E-A-T Authority Builders',
        body: 'Google\'s Search Quality Rater Guidelines — the 176-page document that trains human evaluators to assess page quality — explicitly identifies news coverage as a primary signal of authoritativeness. When multiple independent news sources report on your brand, product, or research, it creates what search quality raters call "independent reputation information." AI models encode this same signal hierarchy. Semrush\'s 2025 citation study found domains with consistent news presence (at least 2 news mentions per month) receive 2.4x more AI citations than comparable domains without news coverage. The mechanism is entity reinforcement: each news mention strengthens the association between your brand entity and specific topics in AI knowledge graphs. Google\'s Knowledge Graph, which feeds both traditional search and AI Mode, heavily weights news corpus data for entity resolution. Muck Rack\'s 2025 State of PR report quantifies the credibility advantage: earned media delivers 3x the credibility of owned content and 4x the credibility of paid advertising. For AI models making citation decisions, news-corroborated claims are treated as more trustworthy than self-published claims — which is exactly why press syndication is a high-leverage authority play.',
      },
      {
        heading: 'The NewsArticle Schema Advantage',
        body: 'Standard press releases are distributed as unstructured text. The Strategic News & Press Syndicator ships every release with comprehensive NewsArticle schema — the structured data format that tells AI models this content is news, not marketing. NewsArticle schema includes: headline, alternativeHeadline, dateline, datePublished, dateModified, author (linked to Person schema), publisher (linked to Organization schema), articleBody, and inLanguage. We add ClaimReview schema on all statistics and claims within the release, creating fact-checkable assertions that AI models can verify and cite with confidence. Google\'s Structured Data Testing Tool confirms that NewsArticle markup enables inclusion in Google News, Top Stories, and AI Overviews — placements that standard blog content rarely achieves. According to Google\'s own documentation, properly structured NewsArticle pages see 20–30% higher click-through rates from search results. For AI citation specifically, the structured signals in NewsArticle schema — dateline freshness, publisher authority, author credentials — are exactly the metadata AI models use to assess source credibility when generating answers.',
      },
      {
        heading: 'Distribution Strategy: Beyond the Wire Service',
        body: 'Traditional wire services (PR Newswire, Business Wire) charge $1,500–$4,000 per release for broad distribution. They blast your release to thousands of outlets — most of which ignore it. Our approach is surgical: we combine wire distribution for baseline reach with targeted placement at outlets that matter most for AI citation authority. Google News Publisher Center submission ensures your releases appear in Google News — a corpus that AI models explicitly reference for current-events queries. Apple News optimization reaches 125+ million monthly active users (Apple, 2024). Bing News PubHub feeds Microsoft Copilot\'s news corpus directly. Feedly (15M+ users) and Flipboard (30M+ monthly users) provide additional syndication channels that build entity mentions across independent platforms. The PR Council\'s 2025 benchmarks show well-targeted releases achieve 3–8x higher engagement than broad wire blasts. We track every release\'s impact on AI citations: did the release cause new citations in ChatGPT, Perplexity, or Claude? Which outlets picked it up? How did entity associations shift? This feedback loop lets us optimize distribution targeting month over month — investing more in channels that drive citation impact.',
      },
    ],
    comparisonTitle: 'ASC Press Syndicator vs. PR Agency vs. Wire Service Only',
    comparisonRows: [
      { feature: 'Monthly cost', us: '$3,000/mo', them: '$5K–$20K/mo / $1.5K–$4K per release' },
      { feature: 'NewsArticle schema', us: 'Every release', them: 'Never / Never' },
      { feature: 'ClaimReview schema on stats', us: 'Included', them: 'Not offered / Not offered' },
      { feature: 'Google News compliance', us: 'Verified submission', them: 'Sometimes / Wire default' },
      { feature: 'AI citation tracking', us: 'Monthly, 5 platforms', them: 'Not offered / Not offered' },
      { feature: 'Releases per month', us: '2–4', them: '1–2 / Pay per release' },
      { feature: 'Entity reinforcement strategy', us: 'Strategic, targeted', them: 'Generic / Blast distribution' },
      { feature: 'Apple News + Bing News + Feedly', us: 'All included', them: 'Varies / Wire default only' },
    ],
    howItWorksSteps: [
      'Authority mapping: identify your key topics, claims, and research that warrant news distribution',
      'Editorial calendar: plan 2–4 releases per month timed to industry events, product launches, and research publications',
      'Release production: write NewsArticle-schema-tagged releases with ClaimReview on all statistics',
      'Distribution: syndicate to 50+ outlets including Google News, Apple News, Bing News, Feedly, and Flipboard',
      'Placement tracking: monitor pickups across outlets and verify Google News/Apple News/Bing News inclusion',
      'Citation reporting: monthly AI citation impact analysis across ChatGPT, Perplexity, Claude, Gemini, and Copilot',
    ],
    customFAQs: [
      { question: 'What qualifies as a press release topic?', answer: 'Product launches, research publications, industry analysis, executive thought leadership, partnership announcements, and milestone achievements. We help identify which topics have the highest AI citation potential — not every announcement deserves a release, and we\'ll tell you which ones don\'t.' },
      { question: 'How does press syndication affect AI citations?', answer: 'News coverage creates entity reinforcement in AI knowledge graphs. When multiple independent news sources mention your brand in connection with specific topics, AI models strengthen those entity associations — making them more likely to cite you when users ask about those topics. Semrush data shows 2.4x more AI citations for domains with consistent news presence.' },
      { question: 'What\'s the difference between this and traditional PR?', answer: 'Traditional PR measures impressions, reach, and media mentions. We measure AI citation impact. Every release ships with NewsArticle and ClaimReview schema that traditional PR agencies don\'t implement. We optimize for Google News inclusion, Bing News PubHub, and Apple News — the specific channels that feed AI model training and retrieval corpora.' },
    ],
    sandlerPain: {
      headline: 'AI Models Trust News Sources. Your Brand Has Zero News Presence.',
      subheadline: 'When AI models choose which sources to cite, news-corroborated brands win. Self-published claims without news validation are treated as unverified.',
      painPoints: [
        'Domains with consistent news presence receive 2.4x more AI citations than those without (Semrush, 2025)',
        'Google\'s Quality Rater Guidelines explicitly weight news coverage as a top authoritativeness signal — AI models encode the same hierarchy',
        'Earned media delivers 3x the credibility of owned content — AI models distinguish between self-published and news-corroborated claims (Muck Rack, 2025)',
      ],
      costOfInaction: { stat: '2.4x Citation Gap', context: 'Brands with consistent news presence receive 2.4x more AI citations. Without news authority signals, your self-published content competes at a structural disadvantage — AI models treat news-corroborated claims as more trustworthy.', source: 'Semrush News Authority Study, 2025' },
    },
    negativeReverse: {
      headline: 'If Your Brand Already Appears in Google News Weekly, This Isn\'t for You.',
      notForList: [
        'You already have a PR agency producing schema-tagged releases with AI citation tracking',
        'Your brand appears consistently in Google News and major industry publications',
        'You don\'t have newsworthy content, research, or announcements to distribute',
      ],
      isForList: [
        'You have thought leadership and research but no distribution strategy',
        'Competitors appear in news results and AI citations while you\'re invisible',
        'You need E-E-A-T authority signals that go beyond self-published content',
      ],
      ctaText: 'Launch Press Syndication',
    },
    proofQuote: { text: 'After 3 months of press syndication, our brand appeared in Google News for 15 industry queries. AI citation rate doubled — ChatGPT now cites us as a primary source for topics where we had zero presence before. The NewsArticle schema made our releases instantly recognizable to AI models.', author: 'Press Syndication', role: 'Enterprise fintech client' },
  },
  {
    id: 'unified-sales-agent',
    name: '24/7 Unified Sales & CS Agent',
    tagline: 'A custom AI agent that sells, supports, and closes — trained on your products, integrated with ACP checkout, available 24/7/365',
    description:
      'A custom AI sales and customer service agent trained on your products, pricing, protocols, and policies. Handles inbound inquiries, qualifies leads, answers product questions, resolves support tickets, and initiates ACP checkout — all 24/7/365 without human intervention for routine interactions.',
    longDescription:
      'IBM reports AI chatbots can handle 80% of routine customer queries without human intervention, reducing customer service costs by up to 30%. Juniper Research projects AI chatbots will save businesses $11 billion annually by 2025, up from $6 billion in 2023. Salesforce found 69% of consumers prefer chatbots for quick communication with brands, and Tidio\'s 2025 research shows 62% of consumers would rather interact with an AI assistant than wait 15 minutes for a human agent. Yet most chatbot deployments are glorified FAQ widgets — they can\'t sell, they can\'t process payments, and they can\'t integrate with agentic commerce protocols. The 24/7 Unified Sales & CS Agent is different: it\'s a full-stack AI agent trained on your product catalog, pricing matrix, policies, and brand voice, with ACP checkout capability that lets AI shopping agents and human customers complete purchases directly through conversation. Drift\'s 2024 State of Conversational Marketing found conversational AI increases qualified lead generation by 67% and reduces sales cycle length by 30%. Intercom reports AI-first customer service reduces resolution time by 44% while maintaining 95%+ customer satisfaction scores.',
    price: '45000',
    priceDisplay: '$45,000 + $5,000/mo',
    timeline: '4 weeks',
    deliverables: [
      'Custom AI agent trained on your products, pricing, policies, and brand voice',
      'ACP checkout integration for agent-initiated and conversational purchases',
      'UCP manifest for AI shopping agent discovery',
      'CRM/Supabase integration with lead scoring and qualification rules',
      'Human escalation workflows with context handoff',
      'Monthly performance report (conversations, conversions, CSAT, resolution rate)',
    ],
    features: [
      'UCP manifest for external AI agent discovery',
      'ACP checkout capability — purchases completed in conversation',
      'Natural language product queries and comparisons',
      'Lead capture and qualification to Supabase/CRM',
      'Intelligent escalation to human rep with full conversation context',
      'Multi-channel: website widget, API, and agent-to-agent (A2A) protocol',
    ],
    audience: 'E-commerce and SaaS companies needing 24/7 sales and support automation',
    icon: 'Bot',
    category: 'automation',
    featured: false,
    uniqueInsight: 'IBM found AI chatbots handle 80% of routine queries and cut service costs by 30%. Juniper Research projects $11 billion in annual savings from AI chatbots by 2025. Drift reports conversational AI increases qualified leads by 67% and shortens sales cycles by 30%. A full-time sales rep costs $60,000–$100,000/year; a CS rep costs $35,000–$55,000/year (Bureau of Labor Statistics). The Unified Agent replaces both for after-hours and routine interactions at $45,000 + $5,000/month — less than one full-time employee — while operating 24/7/365 with ACP checkout capability that no generic chatbot offers. Enterprise conversational AI platforms (Drift, Intercom, Ada) cost $50,000–$200,000/year without ACP integration or agent protocol support.',
    relatedHubPage: '/hub/agentic-commerce-protocol',
    heroImage: '/images/services/unified-sales-agent-architecture.svg',
    heroStats: [
      { value: '80%', label: 'Queries Handled Without Humans', source: 'IBM AI Customer Service Report' },
      { value: '$11B', label: 'Annual Chatbot Savings by 2025', source: 'Juniper Research, 2023' },
      { value: '67%', label: 'More Qualified Leads', source: 'Drift State of Conversational Marketing, 2024' },
      { value: '24/7', label: 'Availability, 365 Days/Year', source: 'Zero downtime, no shifts' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Generic Chatbots Fail — and What a Unified Agent Changes',
        body: 'The chatbot market is flooded with FAQ widgets that deflect rather than resolve. Gartner\'s 2025 survey found 64% of customers prefer that companies NOT use AI for customer service — but the same survey reveals this sentiment is driven by poor chatbot experiences, not AI capability. When AI is done well, the numbers reverse: Intercom reports AI-first customer service achieves 44% faster resolution times with 95%+ CSAT scores. Zendesk found 73% of consumers believe AI improves customer service quality when it\'s properly implemented. The difference is depth of training and integration. A generic chatbot reads from a static FAQ database and escalates everything else. The Unified Sales & CS Agent is trained on your complete product catalog, pricing matrix, return policies, shipping rules, competitive positioning, and brand voice. It can answer "how does your Enterprise plan compare to Competitor X?" with specific, accurate detail — not a redirect to a pricing page. It qualifies leads using your criteria, scores them against your ICP, and captures structured data directly to your CRM. Most critically, it can sell: ACP checkout integration means customers and AI shopping agents can complete purchases within the conversation, not on a separate checkout page.',
      },
      {
        heading: 'The Economics of 24/7 Coverage',
        body: 'The Bureau of Labor Statistics reports median salaries of $62,400 for sales representatives and $39,680 for customer service representatives (2024). With benefits, the fully loaded cost is $75,000–$120,000 for sales and $48,000–$65,000 for customer service — per person, per shift. 24/7 coverage requires 3–4 shifts, meaning $200,000–$400,000+ annually for round-the-clock human staffing. Harvard Business Review found companies that respond to leads within 5 minutes are 100x more likely to connect and 21x more likely to qualify the lead compared to companies that respond within 30 minutes. Yet InsideSales.com reports only 7% of companies respond within 5 minutes, and 55% take more than 5 business days. The Unified Sales & CS Agent responds in under 3 seconds, 24/7/365 — no shifts, no overtime, no sick days, no training ramp. At $45,000 setup + $5,000/month ($105,000/year), it costs less than a single full-time employee while providing unlimited concurrent conversations. Forrester found AI-powered customer service reduces cost per interaction from $7–$13 (phone) and $3–$5 (live chat) to $0.50–$1.00 per AI-handled interaction — an 85–95% cost reduction.',
      },
      {
        heading: 'ACP Checkout: The Capability No Other Chatbot Offers',
        body: 'Standard chatbot platforms (Drift, Intercom, Ada, Zendesk AI) can answer questions and capture leads. None of them can process purchases natively through agentic commerce protocols. The Unified Sales & CS Agent includes ACP (Agentic Commerce Protocol) checkout capability — meaning both human customers and AI shopping agents can browse products, configure orders, and complete purchases entirely within the conversation. When a customer asks "I need 500 units of Product X, shipped to Chicago by Friday — what\'s the total?", the agent calculates pricing (including volume discounts, shipping, and tax), presents the order, and processes payment through Stripe SPT (Secure Payment Tokens) without redirecting to a checkout page. For AI shopping agents — like those from Google AI Mode, Perplexity Shopping, or enterprise procurement systems — the agent exposes ACP endpoints that enable machine-to-machine negotiation and purchase. The UCP manifest advertises your agent\'s capabilities so external AI agents can discover and interact with your business programmatically. This is not a chatbot with a payment link — it\'s a fully protocol-compliant commerce agent that participates in the emerging $15 trillion agent economy.',
      },
    ],
    comparisonTitle: 'Unified Sales Agent vs. Enterprise Chatbot vs. Human Team',
    comparisonRows: [
      { feature: 'Annual cost (24/7)', us: '$105K/yr', them: '$50K–$200K/yr / $200K–$400K+ (3-4 shifts)' },
      { feature: 'ACP checkout capability', us: 'Yes — in-conversation purchase', them: 'No / N/A' },
      { feature: 'UCP manifest for agent discovery', us: 'Included', them: 'Not offered / N/A' },
      { feature: 'Response time', us: '<3 seconds, 24/7', them: '5–30 seconds / 5 min–5 days' },
      { feature: 'Concurrent conversations', us: 'Unlimited', them: 'Plan-limited / 1 per rep' },
      { feature: 'Cost per interaction', us: '$0.50–$1.00', them: '$2–$5 / $7–$13' },
      { feature: 'Product catalog training', us: 'Complete — pricing, policies, competitive', them: 'FAQ-based / Human knowledge' },
      { feature: 'Human escalation with context', us: 'Full conversation handoff', them: 'Basic / N/A' },
    ],
    howItWorksSteps: [
      'Knowledge base creation: we ingest your product catalog, pricing, policies, competitive positioning, and brand voice',
      'Agent training: custom AI agent trained and tested against 200+ conversation scenarios',
      'ACP integration: checkout endpoints configured with Stripe SPT for in-conversation purchases',
      'UCP manifest: agent capabilities published for external AI shopping agent discovery',
      'CRM integration: lead capture, qualification scoring, and structured data writeback to Supabase/CRM',
      'Launch + monitoring: 24/7 deployment with escalation rules, monthly performance reporting, and continuous improvement',
    ],
    customFAQs: [
      { question: 'Can the agent actually process purchases?', answer: 'Yes. ACP checkout integration means customers and AI shopping agents can complete purchases within the conversation. The agent calculates pricing (including volume discounts, shipping, tax), presents the order summary, and processes payment through Stripe SPT — no redirect to a separate checkout page.' },
      { question: 'What happens when the agent can\'t handle a query?', answer: 'Intelligent escalation: the agent detects queries outside its confidence threshold, complex negotiations, or emotional customer interactions and escalates to a human rep with full conversation context. The human sees everything discussed — no customer repetition required. You define the escalation triggers and routing rules.' },
      { question: 'How does this work with AI shopping agents?', answer: 'The UCP manifest advertises your agent\'s capabilities to external AI shopping agents (Google AI Mode, Perplexity Shopping, enterprise procurement systems). These agents can discover your business, query your product catalog, and initiate ACP checkout — all machine-to-machine, without human involvement. Your Unified Agent handles both human customers and AI agent customers through the same infrastructure.' },
      { question: 'What does the $5,000/month cover?', answer: 'Hosting, monitoring, continuous model improvement, knowledge base updates (up to 2 per month), escalation rule adjustments, and monthly performance reporting (conversation volume, conversion rate, CSAT score, resolution rate, revenue attributed). The agent improves over time as we analyze conversation patterns and refine responses.' },
    ],
    sandlerPain: {
      headline: 'Your Sales Team Sleeps. Your Competitors\' AI Agent Doesn\'t.',
      subheadline: 'Every after-hours inquiry, every weekend lead, every 2am shopping agent query — they all go to whoever answers first. Right now, that\'s not you.',
      painPoints: [
        'Companies that respond within 5 minutes are 100x more likely to connect with leads — only 7% of companies achieve this (Harvard Business Review / InsideSales)',
        'AI chatbots handle 80% of routine queries and cut service costs by 30% — but generic chatbots can\'t sell or process payments (IBM)',
        '$15 trillion in B2B purchases will flow through AI agents by 2028 — they can\'t buy from you if you don\'t have an agent endpoint (Gartner)',
      ],
      costOfInaction: { stat: '100x Disadvantage', context: 'Harvard Business Review found companies responding within 5 minutes are 100x more likely to connect with leads. Every lead that arrives after hours, on weekends, or during lunch hits voicemail — and 55% of companies take 5+ business days to respond at all.', source: 'Harvard Business Review / InsideSales.com' },
    },
    negativeReverse: {
      headline: 'If a $29/Month Chatbot Widget Solves Your Problem, Use That Instead.',
      notForList: [
        'Your customer queries are simple enough for a FAQ widget',
        'You don\'t need AI-to-AI commerce capability or ACP checkout',
        'Your sales volume doesn\'t justify $45,000 in automation infrastructure',
      ],
      isForList: [
        'You\'re losing leads after-hours and on weekends to competitors who respond instantly',
        'You need an AI agent that can actually sell — process orders, handle pricing, close deals',
        'You want to participate in agent-to-agent commerce as AI shopping agents scale',
      ],
      ctaText: 'Deploy Your Sales Agent',
    },
    proofQuote: { text: 'The Unified Agent handles 73% of our inbound conversations without human involvement. After-hours conversion rate went from 0% to 12% — revenue we were leaving on the table every night and weekend. The ACP checkout integration means customers buy during the conversation, not after a redirect.', author: 'Unified Agent Deployment', role: 'E-commerce client, $8M annual revenue' },
  },
  {
    id: 'ucp-implementation',
    name: 'UCP Protocol Implementation',
    tagline: 'Make your business discoverable by every AI shopping agent — the foundational protocol that determines whether agents even know you exist',
    description:
      'Complete implementation of the Universal Commerce Protocol (UCP) — enabling AI agents to discover your capabilities, products, and services through standardized manifest files, capability declarations, and multi-transport bindings. Without UCP, your business is invisible to the fastest-growing commerce channel on the planet.',
    longDescription:
      'AI shopping agents are the new front door to commerce. Google AI Mode, Perplexity Shopping, ChatGPT plugins, and autonomous purchasing agents all need a machine-readable way to discover what your business offers. UCP provides that standard: a .well-known manifest that declares your capabilities, products, services, and API endpoints in a format any AI agent can parse in milliseconds. Think of it as the robots.txt of agentic commerce — except instead of telling crawlers what to ignore, it tells agents what you sell and how to buy it. Businesses without UCP manifests are structurally invisible to agent-mediated commerce, regardless of their Google ranking or ad spend.',
    price: '15000',
    priceDisplay: '$15,000',
    timeline: '2 weeks',
    deliverables: [
      '.well-known/ucp/manifest.json with full capability declarations',
      'Capability profile configuration for every product and service',
      'REST, MCP, and A2A transport bindings — all three transport layers',
      'Product capability declarations with pricing, availability, and constraints',
      'UCP v2 compliance verification against the latest spec',
      'Agent discovery testing across Google AI Mode, Perplexity Shopping, and custom agents',
      'Monitoring dashboard for manifest validation and compliance alerts',
    ],
    features: [
      'UCP v2 spec compliance (latest specification)',
      'Agent discovery testing with real AI shopping agents',
      'Google AI Mode compatibility verification',
      'Perplexity Shopping integration and testing',
      'Manifest validation and ongoing monitoring',
      'Multi-transport: REST API, MCP server, and A2A protocol bindings',
      'Product feed synchronization with your catalog',
    ],
    audience: 'E-commerce brands, marketplaces, and SaaS platforms',
    icon: 'Network',
    category: 'protocol',
    featured: false,
    uniqueInsight: 'Salesforce predicts AI agents will handle $194B in commerce transactions by 2026. Gartner forecasts a 25% drop in traditional search volume as AI agents displace search engines. Capgemini found 70% of consumers will delegate purchasing decisions to AI within 3 years. UCP is the foundational layer — without a .well-known/ucp/manifest.json, AI agents cannot discover your business exists. It is the robots.txt of agentic commerce: businesses that published robots.txt in 1994 got indexed by Google; businesses that publish UCP manifests get indexed by AI shopping agents. We are the only consultancy implementing all three transport bindings (REST, MCP, A2A) in a single 2-week engagement at $15K — vs. enterprise consultancies charging $100K+ over 6 months.',
    relatedProtocol: 'ucp',
    relatedHubPage: '/hub/universal-commerce-protocol',
    heroImage: '/images/services/ucp-protocol-manifest-architecture.svg',
    heroStats: [
      { value: '$194B', label: 'Agent Commerce by 2026', source: 'Salesforce prediction' },
      { value: '25%', label: 'Search Volume Drop', source: 'Gartner — AI agents displacing search' },
      { value: '70%', label: 'Consumers Delegating Purchases', source: 'Capgemini — within 3 years' },
      { value: '3', label: 'Transport Layers', source: 'REST + MCP + A2A — full coverage' },
    ],
    deepDiveSections: [
      {
        heading: 'What Is UCP and Why Is It the Foundation of Everything',
        body: 'The Universal Commerce Protocol is a standardized way for businesses to declare their capabilities to AI agents. At its core, it\'s a JSON manifest file hosted at .well-known/ucp/manifest.json — following the same RFC 8615 convention used by /.well-known/security.txt, /.well-known/openid-configuration, and Apple\'s App Site Association files. The manifest lists every product, service, and API endpoint your business offers — with pricing, availability, constraints, and transport bindings. The AI in retail market is valued at $9.4B (2024) and projected to reach $45.7B by 2032 at 21.8% CAGR (Statista). Without this manifest, AI shopping agents have no structured way to discover your business. Google AI Mode reaches 1B+ users monthly. Perplexity Shopping processes millions of shopping queries daily. OpenAI\'s Operator agent navigates websites to complete purchases — but scrapes because most merchants lack machine-readable commerce interfaces. UCP eliminates that friction: your entire business becomes machine-readable in a single request.',
      },
      {
        heading: 'The Three Transport Layers: REST, MCP, and A2A',
        body: 'UCP supports three transport bindings, and the most future-proof implementations support all three. REST is the familiar HTTP API — any agent that can make HTTP requests can interact with your UCP endpoints. MCP (Model Context Protocol) is Anthropic\'s standard for AI tool use — it enables Claude, and any MCP-compatible agent, to natively interact with your business as a "tool." A2A (Agent-to-Agent) is Google\'s protocol for autonomous agent communication — enabling multi-agent workflows where a shopping agent negotiates with your sales agent directly. We implement all three transport layers because the agent ecosystem is fragmented: some agents speak REST, some speak MCP, some speak A2A. Full coverage means no agent is locked out.',
      },
      {
        heading: 'Agent Discovery: The New SEO',
        body: 'In traditional commerce, Google ranking determined who got found. In agentic commerce, manifest completeness determines who gets discovered. The precedent is clear: sites that adopted schema.org markup early (2011–2015) saw 20–30% increases in CTR from rich snippets. Businesses that claimed Google My Business profiles early dominated local search for years. UCP is the same inflection point for AI commerce. When Klarna launched its AI shopping assistant (built on OpenAI) in 2024, merchants with structured product APIs saw 2.3 million conversations in the first month — with average sessions of 2.5 minutes vs 11+ minutes for traditional browsing. Klarna reported the assistant performed the work of 700 full-time agents. The businesses with the most complete, well-structured UCP manifests get presented first. Early adopters build agent-discovery authority that compounds — crawl history, capability match data, and transport sophistication scores create a moat that late adopters cannot easily overcome.',
      },
    ],
    comparisonTitle: 'ASC UCP Implementation vs. Enterprise Consultancy vs. DIY',
    comparisonRows: [
      { feature: 'Cost', us: '$15,000', them: '$100K–$300K / Free (your time)' },
      { feature: 'Timeline', us: '2 weeks', them: '3–6 months / Unknown' },
      { feature: 'All 3 transports (REST + MCP + A2A)', us: 'Yes', them: 'Maybe 1–2 / REST only' },
      { feature: 'UCP v2 spec compliance', us: 'Verified', them: 'Varies / Unverified' },
      { feature: 'Google AI Mode testing', us: 'Included', them: 'Extra scope / No' },
      { feature: 'Perplexity Shopping testing', us: 'Included', them: 'Extra scope / No' },
      { feature: 'Live agent discovery testing', us: '5+ AI platforms', them: '1–2 / None' },
      { feature: 'Ongoing manifest monitoring', us: '24/7 alerts', them: 'Manual / None' },
      { feature: 'Published protocol authority', us: '52+ pages, live manifests', them: 'None / None' },
    ],
    howItWorksSteps: [
      'Capability mapping: we document every product, service, API, and constraint your business offers',
      'Manifest creation: .well-known/ucp/manifest.json built to UCP v2 spec with full capability declarations',
      'Transport binding: REST API, MCP server, and A2A protocol endpoints configured and deployed',
      'Product feed sync: your manifest stays current with real-time catalog changes',
      'Agent testing: verification by Google AI Mode, Perplexity Shopping, Claude, and custom agent frameworks',
      'Monitoring: 24/7 manifest validation with compliance alerts and version tracking',
    ],
    customFAQs: [
      { question: 'What happens if I don\'t implement UCP?', answer: 'Your business is invisible to AI shopping agents. When a user asks ChatGPT, Perplexity, or Google AI Mode to find a product or service in your category, agents query UCP manifests to discover options. Without a manifest, you are structurally excluded — regardless of your Google ranking, ad spend, or brand recognition.' },
      { question: 'Do I need all three transport layers?', answer: 'For maximum coverage, yes. REST reaches the broadest set of agents. MCP enables deep integration with Claude and MCP-compatible systems. A2A supports Google\'s agent-to-agent workflows. We implement all three because the ecosystem is fragmented and you don\'t want to bet on a single protocol winning.' },
      { question: 'How does UCP relate to ACP and AP2?', answer: 'UCP handles discovery (agents find you), ACP handles checkout (agents buy from you), and AP2 handles trust (agents verify transactions cryptographically). UCP is the foundation — without it, ACP and AP2 have nothing to connect to. Most clients start with UCP and add ACP and AP2 as they mature.' },
    ],
    sandlerPain: {
      headline: 'AI Agents Can\'t Buy From You. They Don\'t Even Know You Exist.',
      subheadline: 'The Universal Commerce Protocol is how AI agents discover, evaluate, and transact with businesses. Without it, you\'re invisible to the $15 trillion agent economy.',
      painPoints: [
        '$194B in enterprise commerce is shifting to AI-first discovery — without UCP, agents skip you entirely',
        'Klarna\'s AI assistant handles 2.3M conversations — replacing 700 full-time agents. Your competitors\' products are in that catalog.',
        'Only 5% of websites have agent-ready structured data — the early movers will lock in market share',
      ],
      costOfInaction: { stat: '$194 Billion', context: 'in enterprise software commerce is shifting to AI-first discovery channels. Businesses without UCP endpoints don\'t appear in agent queries — period.', source: 'Salesforce Commerce Cloud, 2025' },
    },
    negativeReverse: {
      headline: 'Honestly? Most Businesses Don\'t Need This Yet.',
      notForList: [
        'You don\'t sell products or services that AI agents would discover',
        'Your average deal size is under $1,000 and volume is low',
        'You\'re not ready to maintain protocol endpoints after launch',
      ],
      isForList: [
        'Enterprise or mid-market B2B with complex product catalogs',
        'E-commerce brands competing for AI shopping agent recommendations',
        'You\'ve already done the ACRA and UCP compliance scored below 40%',
      ],
      ctaText: 'Implement UCP — $15,000',
    },
    proofQuote: { text: 'Within 3 weeks of UCP deployment, our product catalog appeared in Perplexity Shopping and ChatGPT product recommendations. That channel now drives 18% of qualified leads.', author: 'Protocol Implementation', role: 'B2B commerce platform client' },
  },
  {
    id: 'acp-integration',
    name: 'ACP Checkout API Integration',
    tagline: 'Enable AI agents to complete purchases in your store',
    description:
      'Full integration of the Agentic Commerce Protocol (ACP) — enabling AI agents to execute checkout directly in your platform. Includes Stripe SPT setup, delegated payment authorization, and ChatGPT Instant Checkout compatibility.',
    price: '25000',
    priceDisplay: '$25,000',
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
    uniqueInsight: 'ACP enables what no traditional checkout can: an AI agent browsing, selecting, and purchasing on behalf of a human — with cryptographic authorization. ChatGPT Instant Checkout is the first mass-market implementation.',
    relatedProtocol: 'acp',
    relatedHubPage: '/hub/agentic-commerce-protocol',
    howItWorksSteps: [
      'Payment infrastructure audit: verify Stripe account and product catalog readiness',
      'ACP endpoint development: /api/acp/negotiate and /api/acp/checkout routes',
      'Stripe SPT integration: delegated payment tokens for agent-initiated transactions',
      'Agent authentication: identity verification layer for purchasing agents',
      'ChatGPT Instant Checkout: configuration and compliance testing',
    ],
    longDescription:
      'The conversational commerce market is projected to reach $43.7 billion by 2030 (Grand View Research, 2024), growing at 23.4% CAGR as consumers shift from clicking "Add to Cart" to telling an AI agent "buy me the best option under $200." Checkout abandonment still runs at 69.8% (Baymard Institute, 2024 meta-analysis of 49 studies) — largely because traditional checkout flows are designed for humans navigating forms, not AI agents executing transactions programmatically. Salesforce found that AI agents influenced $67 billion in sales during Cyber Week 2025, with 20% of all global orders touched by agent-driven recommendations. ChatGPT Instant Checkout, powered by Stripe Payment Tokens (SPTs), allows AI agents to complete purchases in a single conversational turn — no cart page, no form fields, no friction. Shopify reported merchants with headless checkout APIs see 18% higher conversion rates than traditional checkout (Shopify Unite 2024). The ACP Checkout API Integration gives your platform the endpoints AI agents need: /api/acp/negotiate for price and availability queries, /api/acp/checkout for transaction execution, and full Stripe SPT support for delegated payment authorization.',
    heroImage: '/images/services/acp-checkout-transaction-flow.svg',
    heroStats: [
      { value: '$43.7B', label: 'Conversational Commerce by 2030', source: 'Grand View Research, 2024' },
      { value: '69.8%', label: 'Cart Abandonment Rate', source: 'Baymard Institute, 2024 (49 studies)' },
      { value: '$67B', label: 'AI Agent-Influenced Sales', source: 'Salesforce Cyber Week 2025' },
      { value: '18%', label: 'Higher Conversion (Headless)', source: 'Shopify Unite 2024' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Traditional Checkout Fails the Agent Economy',
        body: 'Traditional e-commerce checkout was designed for humans: browse a catalog, click "Add to Cart," fill in shipping and payment forms, click "Place Order." Baymard Institute\'s 2024 meta-analysis of 49 studies found an average cart abandonment rate of 69.8% — meaning 7 out of 10 humans who intend to buy don\'t complete the purchase. The top reasons are forced account creation (26%), too long or complicated checkout (22%), and lack of trust with credit card information (25%). AI agents don\'t have these problems — they don\'t need to type, they don\'t get distracted, and they authenticate via tokens rather than credit card forms. But they need an API. Without ACP endpoints, an AI agent attempting to buy from your store must scrape your website, navigate your checkout flow like a human using browser automation, and hope nothing breaks. OpenAI\'s Operator agent does exactly this — and it fails frequently because checkout flows were not designed for programmatic interaction. ACP provides the structured API layer: negotiate availability and price, execute the transaction with a Stripe Payment Token, and return a cryptographically signed confirmation. The result is near-zero abandonment for agent-initiated transactions.',
      },
      {
        heading: 'Stripe Payment Tokens and Delegated Authorization',
        body: 'Stripe Payment Tokens (SPTs) are the mechanism that makes agent commerce financially secure. When a human delegates purchasing authority to an AI agent, the agent doesn\'t receive their credit card number — it receives a scoped, time-limited payment token that can only be used for specific transaction types within defined spending limits. Stripe processes over $1 trillion in total payment volume annually (Stripe Annual Letter, 2024), and their token infrastructure handles 99.999% uptime with PCI DSS Level 1 compliance. SPTs support spending caps per transaction and per day, merchant category restrictions, and expiration windows — giving humans granular control over what their AI agent can purchase. The ACP integration we build connects your checkout flow to Stripe\'s tokenized payment infrastructure, so every agent-initiated transaction is authorized, auditable, and reversible. Juniper Research projects that digital commerce fraud losses will reach $362 billion globally between 2023 and 2028 — tokenized payments reduce fraud exposure by eliminating raw credential transmission entirely.',
      },
      {
        heading: 'The Competitive Advantage of Early ACP Adoption',
        body: 'Gartner predicts that by 2028, 33% of enterprise software interactions will involve agentic AI, up from less than 1% in 2024. The businesses that deploy ACP endpoints now will be the businesses that AI shopping agents default to — because agents optimize for reliability and speed. When an AI agent can complete a purchase via structured API in 200ms versus spending 30-60 seconds scraping a website, the API merchant wins every time. Klarna\'s AI assistant processed 2.3 million conversations in its first month (Klarna Press Release, Feb 2024), performing the work of 700 full-time agents. Merchants with structured APIs saw dramatically higher transaction completion rates than those requiring browser-based checkout. McKinsey estimates that AI-enabled commerce platforms will capture 20-30% of digital commerce market share by 2027 — with structured checkout APIs as the primary enabler. The first-mover advantage is real: agent systems build merchant reliability scores based on API uptime, response latency, and transaction success rates. Early adopters accumulate trust scores that late entrants cannot replicate quickly.',
      },
    ],
    comparisonTitle: 'ASC ACP Integration vs. Enterprise Commerce vs. DIY',
    comparisonRows: [
      { feature: 'Cost', us: '$25,000', them: '$150K-$500K / Free (your time)' },
      { feature: 'Timeline', us: '3-4 weeks', them: '4-8 months / Unknown' },
      { feature: 'ACP v1 spec compliance', us: 'Full compliance', them: 'Partial / Unverified' },
      { feature: 'Stripe SPT integration', us: 'Included', them: 'Custom build / DIY' },
      { feature: 'ChatGPT Instant Checkout', us: 'Configured + tested', them: 'Not supported / Manual' },
      { feature: 'Agent authentication layer', us: 'Built-in', them: 'Custom / None' },
      { feature: 'Transaction audit logging', us: 'Every transaction logged', them: 'Varies / None' },
      { feature: 'Live agent testing', us: '5+ AI platforms', them: '1-2 / None' },
    ],
    customFAQs: [
      { question: 'Do I need UCP before ACP?', answer: 'Technically no, but practically yes. UCP is how agents discover you; ACP is how they buy from you. Without UCP, agents won\'t find your ACP endpoints. Most clients implement UCP first, then add ACP as the checkout layer.' },
      { question: 'What payment methods does ACP support?', answer: 'ACP works through Stripe, which supports credit/debit cards, ACH, Apple Pay, Google Pay, and 135+ currencies. The Stripe Payment Token layer adds delegated authorization for agent-initiated transactions with spending controls.' },
      { question: 'How does this affect my existing checkout?', answer: 'ACP runs alongside your existing checkout — it doesn\'t replace it. Human customers use your normal checkout flow. AI agents use the ACP API endpoints. Both converge on the same Stripe payment processing and order management system.' },
    ],
    sandlerPain: {
      headline: 'AI Agents Want to Buy From You. Your Checkout Won\'t Let Them.',
      subheadline: 'While your checkout flow was built for humans filling out forms, AI agents are completing purchases at competitors with structured APIs — in under 200 milliseconds.',
      painPoints: [
        '69.8% of human shoppers abandon checkout — AI agents would convert at near-100% if you gave them an API (Baymard Institute, 2024)',
        'AI agents influenced $67B in Cyber Week sales — but only at merchants with agent-ready checkout infrastructure (Salesforce, 2025)',
        'OpenAI\'s Operator agent fails frequently on traditional checkouts because they weren\'t built for programmatic interaction',
      ],
      costOfInaction: { stat: '$43.7 Billion', context: 'The conversational commerce market is growing at 23.4% CAGR. Every month without ACP endpoints, AI agents route transactions to competitors who can process them programmatically.', source: 'Grand View Research, 2024' },
    },
    negativeReverse: {
      headline: 'This Isn\'t a Checkout Widget.',
      notForList: [
        'You sell fewer than 50 products and don\'t plan to scale',
        'You\'re not on Stripe and aren\'t willing to migrate',
        'Your average order value is under $25 and volume is low',
      ],
      isForList: [
        'Your catalog has hundreds or thousands of SKUs that AI agents should be able to purchase',
        'You\'re losing conversions because AI agents can\'t complete checkout programmatically',
        'You want to be in the first wave of merchants supporting ChatGPT Instant Checkout',
      ],
      ctaText: 'Enable Agent Checkout — $25,000',
    },
    proofQuote: { text: 'After ACP integration, our agent-initiated transactions hit a 94% completion rate versus 31% through our traditional checkout. The average agent order is 2.3x larger because there\'s no friction to upsell acceptance.', author: 'ACP Integration', role: 'E-commerce platform, 2,400+ SKUs' },
  },
  {
    id: 'ap2-trust-layer',
    name: 'AP2 Mandate & Trust Service',
    tagline: 'Cryptographic trust infrastructure for agentic transactions',
    description:
      'Implementation of the Agent Payments Protocol (AP2) — including Intent and Cart mandates, Verifiable Credentials, x402 crypto payment support, and non-repudiation audit trails. The trust layer that makes agentic commerce legally defensible.',
    price: '35000',
    priceDisplay: '$35,000',
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
    uniqueInsight: 'AP2 is the legal backbone of agentic commerce. Without cryptographic mandates, agent-initiated transactions have no audit trail and no dispute resolution. AP2 makes agentic payments legally defensible.',
    relatedProtocol: 'ap2',
    relatedHubPage: '/hub/agent-payments-protocol',
    howItWorksSteps: [
      'Trust architecture design: define mandate types (Intent, Cart), signing authorities, and verification flow',
      'Mandate implementation: .well-known/ap2/mandates.json with cryptographic schemas',
      'Verifiable Credentials: agent identity verification and credential issuance',
      'x402 integration: crypto payment protocol support for cross-border agent transactions',
      'Audit trail deployment: non-repudiation logging with dispute resolution framework',
    ],
    longDescription:
      'Digital payment fraud losses are projected to reach $362 billion globally between 2023 and 2028 (Juniper Research, 2023). As AI agents begin executing financial transactions autonomously, the attack surface expands dramatically — because agent-initiated payments lack the identity verification, intent confirmation, and audit trails that human-initiated payments take for granted. When a human clicks "Buy Now," there is an implicit chain of intent: they browsed, they selected, they entered payment details, they confirmed. When an AI agent executes that same transaction, there is no click trail — only an API call. Without cryptographic proof of authorization, any dispute becomes a "he said, she said" between the merchant and the agent operator. AP2 solves this with cryptographic mandates: machine-readable, signed documents that prove a human authorized a specific transaction scope before the agent acted. The W3C Verifiable Credentials standard (used by over 150 organizations globally) provides the identity layer — proving which agent acted, on whose behalf, with what authority. The x402 payment protocol adds cryptocurrency support for cross-border agent transactions where traditional payment rails are too slow or too expensive. Every mandate, credential, and transaction is logged in a non-repudiation audit trail that makes agentic commerce legally defensible in any jurisdiction.',
    heroImage: '/images/services/ap2-trust-mandate-architecture.svg',
    heroStats: [
      { value: '$362B', label: 'Projected Fraud Losses (2023-2028)', source: 'Juniper Research, 2023' },
      { value: '$48B', label: 'Annual E-Commerce Fraud', source: 'Juniper Research, 2023' },
      { value: '150+', label: 'Orgs Using W3C Verifiable Credentials', source: 'W3C VC Working Group' },
      { value: '$3.75', label: 'True Cost per $1 of Fraud', source: 'LexisNexis Risk Solutions' },
    ],
    deepDiveSections: [
      {
        heading: 'The $362 Billion Fraud Problem That Agentic Commerce Makes Worse',
        body: 'Juniper Research projects cumulative digital payment fraud losses of $362 billion between 2023 and 2028, with annual e-commerce fraud alone reaching $48 billion by 2023. The Federal Trade Commission reported $10 billion in fraud losses in the US alone in 2023 — a 14% increase over 2022. These figures assume human-initiated transactions with existing verification layers (CVV, 3D Secure, biometric authentication). Agentic commerce strips away every one of those layers: an AI agent doesn\'t have a fingerprint, doesn\'t pass 3D Secure challenges, and doesn\'t enter a CVV. Without AP2, agent-initiated transactions rely on API keys alone — and a compromised API key means unlimited unauthorized purchasing with no cryptographic proof of who authorized what. LexisNexis Risk Solutions found that every dollar of fraud costs merchants $3.75 in chargebacks, investigation, and operational overhead. For enterprise merchants processing $10M+ annually, even a 0.5% fraud rate costs $187,500 per year in direct losses — before accounting for brand damage, customer churn, and regulatory scrutiny. AP2 mandates create an unbreakable chain: human authorization, agent identity, transaction scope, and cryptographic signature — all verifiable after the fact.',
      },
      {
        heading: 'How Cryptographic Mandates Work',
        body: 'An AP2 mandate is a JSON document signed with the authorizing human\'s private key. It specifies exactly what the agent is permitted to do: purchase categories, spending limits, merchant restrictions, time windows, and approval requirements. There are two mandate types: Intent Mandates (the human authorizes a general purchasing intent — "buy office supplies under $500 from approved vendors this month") and Cart Mandates (the human authorizes a specific cart — "buy these 3 items from this merchant at this price"). Intent Mandates enable autonomous agent purchasing within defined guardrails. Cart Mandates enable human-in-the-loop confirmation for high-value or unusual transactions. Both are cryptographically signed using Ed25519 or ECDSA algorithms, timestamped, and published to the merchant\'s .well-known/ap2/mandates.json endpoint. The merchant can verify any mandate in under 10ms — confirming the authorizing human, the agent identity, the permitted scope, and the signature validity. The National Institute of Standards and Technology (NIST) recommends Ed25519 for its speed (76,000 verifications per second on commodity hardware) and resistance to side-channel attacks. This verification cost is negligible compared to the $3.75-per-dollar cost of processing a fraudulent transaction.',
      },
      {
        heading: 'Verifiable Credentials and the x402 Payment Layer',
        body: 'The W3C Verifiable Credentials specification — developed by over 150 organizations including Microsoft, Google, IBM, and the US Department of Homeland Security — provides a standardized way to issue, hold, and verify digital credentials. In the AP2 context, Verifiable Credentials prove agent identity: which AI system is acting, which organization operates it, what certifications or compliance standards it meets, and what purchasing authority it holds. This is critical for enterprise procurement where vendor compliance requirements (SOC 2, ISO 27001, GDPR) must extend to automated purchasing agents. The x402 protocol layer adds cryptocurrency payment support for scenarios where traditional payment rails are inadequate: cross-border transactions where SWIFT takes 3-5 business days and costs $25-50 per transfer, micropayments where credit card minimum fees make sub-$1 transactions uneconomical, and jurisdictions where traditional payment infrastructure is limited. Chainalysis reports that cross-border cryptocurrency transfers reached $2.8 trillion in 2023, with average settlement times under 15 minutes. For agentic commerce operating across borders, x402 provides instant settlement at negligible cost — with the same cryptographic audit trail that AP2 mandates require.',
      },
    ],
    comparisonTitle: 'ASC AP2 Implementation vs. Enterprise PKI vs. No Trust Layer',
    comparisonRows: [
      { feature: 'Cost', us: '$35,000', them: '$200K-$1M / $0 (and $0 protection)' },
      { feature: 'Timeline', us: '4-6 weeks', them: '6-12 months / N/A' },
      { feature: 'Cryptographic mandate signing', us: 'Ed25519 + ECDSA', them: 'Custom PKI / None' },
      { feature: 'W3C Verifiable Credentials', us: 'Full integration', them: 'Partial / None' },
      { feature: 'Dispute resolution framework', us: 'Built-in', them: 'Legal team required / None' },
      { feature: 'x402 crypto payment support', us: 'Included', them: 'Separate vendor / None' },
      { feature: 'Non-repudiation audit trail', us: 'Every transaction', them: 'Varies / None' },
      { feature: 'Agent-specific (not generic PKI)', us: 'Purpose-built for agents', them: 'Generic / None' },
    ],
    customFAQs: [
      { question: 'Do I need AP2 if I already have ACP?', answer: 'ACP handles the transaction mechanics — how an agent completes a purchase. AP2 handles the trust layer — proving the agent was authorized to make that purchase. Without AP2, you have no cryptographic proof of authorization, no audit trail for disputes, and no legal defensibility if a transaction is contested. For low-value transactions, the risk may be acceptable. For enterprise commerce, AP2 is essential.' },
      { question: 'What happens if a mandate is compromised?', answer: 'Mandates are scoped and time-limited by design. A compromised Intent Mandate can only be used within its defined spending limits, merchant restrictions, and time window. Cart Mandates are single-use. Mandate revocation is supported — the authorizing human can invalidate any mandate instantly, and merchants verify revocation status before processing.' },
      { question: 'Is x402 required?', answer: 'No — x402 is optional and only relevant for businesses processing cross-border transactions or micropayments where traditional payment rails are inadequate. Most clients start with fiat-only AP2 mandates and add x402 later if their use case requires it.' },
    ],
    sandlerPain: {
      headline: 'One Unauthorized Agent Transaction Could Cost You Everything.',
      subheadline: 'AI agents are executing purchases with no audit trail, no mandate verification, and no legal defensibility. When the first major dispute hits, you\'ll wish you\'d built the trust layer.',
      painPoints: [
        '$362 billion in digital payment fraud projected through 2028 — and agentic commerce has zero verification standards (Juniper Research)',
        'Every $1 of fraud costs merchants $3.75 in chargebacks, investigation, and overhead (LexisNexis Risk Solutions)',
        'No existing payment standard addresses AI-agent-initiated transactions — AP2 is the only purpose-built trust layer',
      ],
      costOfInaction: { stat: '$3.75 per Dollar', context: 'Every fraudulent dollar costs you $3.75. With agent-initiated transactions growing exponentially and zero audit trail standards, the first major dispute could trigger regulatory scrutiny, class action exposure, and irreversible brand damage.', source: 'LexisNexis Risk Solutions, True Cost of Fraud Study' },
    },
    negativeReverse: {
      headline: 'If Your Average Transaction Is Under $50, You Probably Don\'t Need This.',
      notForList: [
        'Your transactions are low-value and chargebacks are an acceptable cost of business',
        'You don\'t plan to support AI agent purchasing within 2 years',
        'You operate in a single country with simple payment requirements',
      ],
      isForList: [
        'Enterprise B2B with high-value transactions where a single dispute could cost $100K+',
        'You\'re already implementing ACP and need the trust layer to make it legally defensible',
        'Regulatory compliance requires cryptographic audit trails for automated transactions',
      ],
      ctaText: 'Build Your Trust Layer — $35,000',
    },
    proofQuote: { text: 'We process $2.4M/month in agent-initiated B2B orders. AP2 mandates eliminated our dispute rate entirely — every transaction has a cryptographic chain of authorization that makes chargebacks impossible to win against us.', author: 'AP2 Trust Implementation', role: 'Enterprise B2B procurement platform' },
  },

  // -- AI Agent Modules --
  {
    id: 'quoting-agent',
    name: 'Quoting Agent',
    tagline: 'Instant, rules-based pricing quotes with a built-in booking flow — no hallucinated prices, no rep inconsistency, no delays',
    description:
      'A specialized AI quoting engine that delivers consistent, rules-based pricing in real time based on your variables and closes the loop with a booking flow. Governed by deterministic rules from your actual pricing matrix — not LLM guessing.',
    longDescription:
      'CPQ (Configure, Price, Quote) software has existed for years, but it was built for enterprise: expensive, complex, and requiring months of implementation. Service businesses with custom pricing — HVAC, roofing, landscaping, insurance, professional services — need quotes that are fast, accurate, and consistent across every rep and location, but they don\'t need a $50,000 Salesforce CPQ deployment. The Quoting Agent bridges this gap: we codify your pricing matrix into deterministic rules, build an intake flow that captures the right variables, and deliver instant quotes via email, SMS, or chat — with a booking calendar attached so prospects can schedule immediately after seeing the price. No LLM hallucination. No rep inconsistency. No delays.',
    price: '8500',
    priceDisplay: '$8,500 + $1,200/mo',
    timeline: '3 weeks',
    deliverables: [
      'Rules/logic model built from your actual pricing matrix (tiers, modifiers, exceptions)',
      'Quoting intake flow with required fields, conditional logic, and disqualifiers',
      'Quote output template (email/SMS/chat) with full audit trail',
      'Quoting Calendar with territory routing, round-robin, and buffer logic',
      'Exception/approval workflow for edge cases outside standard rules',
      'CRM writeback with quote record, status, notes, and reporting hooks',
    ],
    features: [
      'Deterministic pricing rules — no LLM guessing, no hallucinated prices',
      'Exception/approval workflow for edge cases',
      'Consistent quotes across all reps and locations',
      'Quote-to-booking in one seamless flow',
      'Full audit trail: every quote recorded with inputs, rules applied, and output',
      'Up to 2 iterations/month on support plan',
    ],
    audience: 'Service businesses with complex or custom pricing (HVAC, roofing, insurance, professional services)',
    icon: 'FileText',
    category: 'automation',
    featured: true,
    uniqueInsight: 'The global CPQ market is $2.4B (Grand View Research, 2023), growing at 17% CAGR — but 90%+ of that revenue comes from enterprise tools costing $100K+. Unlike chatbot "quote generators" that hallucinate prices at 3–10% error rates, the Quoting Agent uses deterministic rules from your actual pricing matrix. Aberdeen Group found 50% of deals go to the first vendor to respond. Salesforce reports the average manual B2B quote takes 24–72 hours. The Quoting Agent responds in seconds — with 100% accuracy, full audit trail, and a built-in booking calendar.',
    heroImage: '/images/services/quoting-agent-rules-engine.svg',
    heroStats: [
      { value: '10x', label: 'More Likely to Win', source: 'InsideSales — quote in <5 min' },
      { value: '0%', label: 'Hallucination Risk', source: 'Deterministic rules, not LLM guessing' },
      { value: '50%', label: 'Deals to First Responder', source: 'Aberdeen Group — first vendor wins' },
      { value: '$2.4B', label: 'CPQ Market (2023)', source: 'Grand View Research — 17% CAGR' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Deterministic Rules Beat LLM-Generated Quotes',
        body: 'LLM-powered chatbots can do many things well, but pricing isn\'t one of them. GPT-4 hallucination rates run 3–10% depending on domain — and for pricing, even 1% error is unacceptable. A roofer\'s pricing depends on square footage, pitch, material grade, number of layers to remove, chimney count, and local permit costs. An LLM will "estimate" a price based on training data patterns — not your actual rules. The Quoting Agent uses deterministic logic: your exact pricing rules, tiers, modifiers, and exceptions are codified into a rules engine. The output is mathematically identical every time the same inputs are provided — computed in under 100ms vs. 2–10 seconds for LLM inference. Gartner reports manual quoting error rates of 12–25%, causing 40% more post-signature revisions (Aberdeen Group). Salesforce CPQ data shows organizations using rules-based quoting achieve 2x higher quote-to-close rates. No hallucination. No variation. No risk of quoting $5,000 for a $15,000 job.',
      },
      {
        heading: 'The Quote-to-Book Flow: Closing the Loop',
        body: 'Forrester research shows 50% of sales go to the first vendor to respond. Yet the average B2B quote takes 24–72 hours to produce manually (Salesforce), and for SMB services like HVAC and roofing, 2–5 business days is common. Most businesses treat quoting and scheduling as separate processes: send a quote, wait for the prospect to respond, then try to schedule. This creates a gap where leads go cold. The Quoting Agent integrates both: after the prospect receives their quote, they immediately see available times to book a consultation, walkthrough, or assessment — with territory routing, round-robin distribution, buffer times, and calendar hygiene enforced automatically. Aberdeen Group found best-in-class CPQ users achieve 105% higher quota attainment, 28% shorter sales cycles, and 17% higher lead-to-opportunity conversion. The conversion from quote-received to appointment-booked is highest when the prospect can act in the same flow.',
      },
      {
        heading: 'Edge Cases and Approval Workflows',
        body: 'Not every quote fits standard rules. Unusual scope, volume discounts, competitive pricing pressure, or VIP customers may require human judgment. The Quoting Agent handles this with an exception workflow: when inputs fall outside defined rules, the system flags the quote for manual approval, routes it to the right person based on exception type, and holds the prospect in a "pending" state with clear expectations. The approved or adjusted price is delivered automatically. Every exception is logged for analysis — over time, recurring exceptions reveal rules that should be codified, reducing the approval burden.',
      },
    ],
    comparisonTitle: 'Quoting Agent vs. Enterprise CPQ vs. LLM Chatbots',
    comparisonRows: [
      { feature: 'Pricing accuracy', us: 'Deterministic (100%)', them: 'Rules-based (100%) / 3–10% hallucination' },
      { feature: 'Setup cost', us: '$8,500', them: '$100K–$300K / Free–$500/mo' },
      { feature: 'Time to deploy', us: '3 weeks', them: '3–9 months / 1 week' },
      { feature: 'Quote speed', us: '<60 seconds', them: 'Minutes / 2–10 seconds' },
      { feature: 'Built-in booking flow', us: 'Yes', them: 'Separate tool / No' },
      { feature: '24/7 availability', us: 'Yes', them: 'Only if rep online / Yes' },
      { feature: 'Approval workflows', us: 'Built-in', them: 'Yes / No' },
      { feature: 'Audit trail', us: 'Every quote logged', them: 'Yes / No' },
      { feature: 'SMB-friendly', us: 'Yes', them: 'No / Somewhat' },
    ],
    howItWorksSteps: [
      'Pricing matrix extraction: we interview your team, codify every rule, tier, modifier, and exception',
      'Intake flow design: required fields, conditional logic, disqualifiers, and edge-case triggers',
      'Rules engine deployment: deterministic pricing with instant quote delivery via email/SMS/chat',
      'Booking integration: calendar with territory routing, round-robin, buffer logic, and buffer times',
      'Approval workflow: edge cases flagged, routed, and resolved with automatic prospect notification',
      'CRM writeback: quote record, status, outcome, and reporting hooks deployed',
    ],
    customFAQs: [
      { question: 'What if my pricing is really complex?', answer: 'Complex pricing is exactly what the Quoting Agent is built for. We\'ve codified pricing matrices with 50+ variables, tiered modifiers, geographic adjustments, volume discounts, and seasonal surcharges. The more complex your pricing, the more value the rules engine provides — because that complexity is what causes rep inconsistency and customer frustration.' },
      { question: 'Can customers get quotes 24/7?', answer: 'Yes. The Quoting Agent runs around the clock. A prospect visiting your website at 11pm on a Saturday gets the same instant, accurate quote as one calling during business hours. This is particularly valuable for service businesses competing on response speed.' },
      { question: 'What industries is this best for?', answer: 'Any service business with custom pricing: HVAC, roofing, landscaping, painting, insurance, legal services, IT managed services, commercial cleaning, and professional services. If your pricing depends on multiple variables (not just a flat rate), the Quoting Agent eliminates the delay and inconsistency in your quoting process.' },
    ],
    sandlerPain: {
      headline: 'Every Slow Quote Is a Lost Deal.',
      subheadline: 'Your prospects request a quote, wait 4-24 hours, and buy from the competitor who responded in 60 seconds. It happens every single day.',
      painPoints: [
        'Companies that respond first win 50% of deals — but only 7% respond within 5 minutes',
        'Manual quoting has 12-25% error rates that destroy trust and trigger revision cycles',
        'Your best salespeople spend 40% of their time on quotes instead of closing',
      ],
      costOfInaction: { stat: '50% of Deals', context: 'go to whoever responds first. If your quoting process takes hours while competitors respond in seconds, you\'re systematically losing half your pipeline.', source: 'Aberdeen Group / InsideSales.com' },
    },
    negativeReverse: {
      headline: 'This Is Not a Chatbot.',
      notForList: [
        'You have fewer than 20 SKUs with simple, fixed pricing',
        'You\'re looking for a basic FAQ bot or customer service widget',
        'Your sales cycle doesn\'t involve custom quotes or configurations',
      ],
      isForList: [
        'Complex product catalogs where quoting requires configuration or approval',
        'High-volume quote requests overwhelming your sales team',
        'Revenue lost to competitors with faster response times',
      ],
      ctaText: 'Deploy Your Quoting Agent',
    },
    proofQuote: { text: 'Quote turnaround went from 4 hours to 47 seconds. Our close rate doubled in the first quarter because we were simply responding before the competition.', author: 'Quoting Automation', role: 'Industrial distribution client' },
  },
  {
    id: 'off-hours-voice-agent',
    name: 'Off-Hours Voice Agent',
    tagline: 'Human-sounding AI answers every call 24/7/365 — zero missed leads, zero missed revenue, zero robotic IVR menus',
    description:
      'A human-sounding voice AI that answers calls after-hours and during overflow, handles FAQs, qualifies leads, captures structured data, and routes urgent calls by your rules. An owned asset trained on your scripts and brand — not a generic answering service.',
    longDescription:
      'Studies show that 80% of callers who reach voicemail don\'t leave a message — they call a competitor instead. For service businesses, after-hours and weekend calls represent 35–40% of total call volume, and those callers often have the highest intent (emergency HVAC, legal consultation, urgent plumbing). The Off-Hours Voice Agent ensures every call is answered by a human-sounding AI that knows your business: it handles FAQs from your grounded knowledge base, qualifies leads using your criteria, captures structured data (name, address, issue type, urgency), and routes urgent calls to on-call staff based on your escalation rules. Every call generates a full transcript with extracted fields written directly to your CRM — no manual data entry, no lost details.',
    price: '6500',
    priceDisplay: '$6,500 + $950/mo',
    timeline: '3 weeks',
    deliverables: [
      'Voice agent trained on your scripts, FAQ grounding documents, and guardrails',
      'Call flow design: qualify, capture required fields, route/escalate, handle edge cases',
      'Full transcription with structured data extraction to CRM/webhook',
      'Opt-out/stop handling and do-not-contact logic (TCPA compliant)',
      'Monitoring dashboard with transcript review, escalation alerts, and call analytics',
      'Escalation rules: urgent calls routed to on-call staff with configurable triggers',
    ],
    features: [
      'Human-sounding voice — natural conversation, not robotic IVR',
      'Trained on your brand voice, scripts, products, and policies',
      'Full transcripts with structured CRM writeback (name, phone, issue, urgency)',
      'Escalation to human rep on custom trigger rules',
      'TCPA-compliant opt-out and do-not-contact handling',
      'Up to 2 script/FAQ updates per month on support plan',
    ],
    audience: 'Service businesses that miss after-hours, weekend, and overflow calls',
    icon: 'Bot',
    category: 'automation',
    featured: true,
    uniqueInsight: '62% of calls to small businesses go unanswered (Numa/RingCentral), and 85% of callers who can\'t reach you won\'t call back (BIA/Kelsey) — they call a competitor. Phone calls convert to revenue 10–15x more than web leads (Invoca). With standard 9-5 hours, businesses are unreachable for 128 out of 168 weekly hours (76% of the time). Service businesses see 27–40% of call volume after hours — HVAC emergencies, legal consultations, dental appointments. At $6,500 + $950/mo, the Off-Hours Voice Agent costs ~$5.94/lead vs Smith.ai at ~$11.18/lead and a full-time receptionist at $18–26/lead. Modern voice AI (ElevenLabs, Deepgram) achieves 300–800ms latency and is rated human by 60–70%+ of listeners. This is an owned asset trained on YOUR scripts — not a generic answering service handling 10 businesses simultaneously.',
    heroImage: '/images/services/off-hours-voice-agent-call-flow.svg',
    heroStats: [
      { value: '62%', label: 'SMB Calls Unanswered', source: 'Numa/RingCentral research' },
      { value: '85%', label: 'Won\'t Call Back', source: 'BIA/Kelsey — one chance to answer' },
      { value: '76%', label: 'Weekly Hours Unreachable', source: '128/168 hrs with 9-5 coverage' },
      { value: '$75K', label: 'Lost Revenue/Year', source: 'Avg small business from missed calls' },
    ],
    deepDiveSections: [
      {
        heading: 'The Revenue Hidden in Missed Calls',
        body: 'Phone calls convert to revenue 10–15x more than web leads (Invoca). BrightLocal found 60% of consumers prefer calling local businesses, especially for urgent needs. Yet 62% of small business calls go unanswered (Numa/RingCentral), and Forbes reports businesses miss 40–60% of inbound calls. The cost: $75,000+ per year in lost revenue for the average small business. For HVAC, a single missed emergency call = $500–$2,000 lost to a competitor who answers. For legal, one missed intake call = $3,000–$10,000 case value. Hiya\'s State of the Call report found 33% of consumers move on to a competitor after just one unanswered call. With 27–40% of calls coming after hours and businesses unreachable for 76% of every week (128 of 168 hours with 9-5 coverage), the Off-Hours Voice Agent captures every call that would otherwise go to voicemail — and 85% of those callers won\'t call you back (BIA/Kelsey).',
      },
      {
        heading: 'Owned Asset vs. Generic Answering Service',
        body: 'Smith.ai charges ~$9.75/call ($1,900+/mo at 200 calls). Ruby bills per minute at $3.30–$4.70 ($1,500–$2,500/mo). Both use human operators handling 5–10+ businesses simultaneously from a 1-page brief — they give you a message slip, not structured data. DIY platforms (Bland.ai at $0.07–$0.12/min, Vapi at $0.05/min + LLM costs) are cheap per-minute but require $10K+ in engineering to build, deploy, and maintain. The Off-Hours Voice Agent at $6,500 + $950/mo is the managed middle: custom-trained on YOUR service catalog, FAQ database, pricing matrix, qualification criteria, and brand voice. It extracts structured data (name, phone, issue type, urgency, service area, preferred appointment) and writes directly to your CRM fields — not unstructured notes requiring manual entry. It\'s an owned asset that compounds in value, not a rental that leaves you with nothing when you stop paying.',
      },
      {
        heading: 'How Modern Voice AI Sounds',
        body: 'If your experience with phone AI is robotic IVR menus ("Press 1 for sales"), modern voice AI has crossed the uncanny valley. State-of-the-art systems achieve 300–800ms response latency (natural human pause is 200–500ms). In blind tests, ElevenLabs voices were rated as human by 60–70%+ of listeners. Modern systems handle interruptions (barge-in detection), implement backchanneling ("mm-hmm", "I see"), and use semantic completion detection to avoid premature responses. The Off-Hours Voice Agent uses streaming speech-to-text (Deepgram) + fast LLM inference + streaming TTS for sub-500ms latency that feels natural in conversation. Guardrails prevent commitments outside your defined scope, and human escalation paths ensure complex or emotional calls always reach a real person. For structured business calls — booking, intake, FAQ — the technology is production-ready and most callers don\'t realize they\'re speaking to AI.',
      },
    ],
    comparisonTitle: 'ASC Voice Agent vs. Smith.ai vs. Ruby vs. DIY (Bland/Vapi)',
    comparisonRows: [
      { feature: 'Monthly cost (200 calls)', us: '$950', them: '~$1,900 / ~$1,500–2,500 / $50–80 + eng' },
      { feature: 'Setup cost', us: '$6,500', them: '$0 / $0 / $10K+ engineering' },
      { feature: '24/7 coverage', us: 'Yes', them: 'Extra $$ / Extra $$ / Yes' },
      { feature: 'Custom-trained on your business', us: 'Yes', them: 'No (generic) / No / If you build it' },
      { feature: 'Structured CRM writeback', us: 'Automatic', them: 'Email notes / Email notes / If you build it' },
      { feature: 'Cost per lead', us: '~$5.94', them: '~$11.18 / ~$10–15 / Varies' },
      { feature: 'Dedicated to your business', us: '100%', them: 'Shared (5–10+ clients) / Shared / Yes' },
      { feature: 'Ongoing maintenance', us: 'Included', them: 'N/A / N/A / You maintain' },
      { feature: 'Voice quality', us: 'Near-human (sub-500ms)', them: 'Human / Human / Varies' },
    ],
    howItWorksSteps: [
      'Script and FAQ grounding: we train the agent on your brand voice, products, services, and policies',
      'Call flow design: qualification criteria, required capture fields, escalation triggers, and edge-case handling',
      'Voice deployment: human-sounding agent deployed to answer calls after-hours and during overflow',
      'CRM integration: structured data extraction from every call (name, phone, issue, urgency) written to your CRM',
      'Escalation rules: urgent calls routed to on-call staff via phone transfer, SMS alert, or both',
      'Monitoring: transcript review dashboard with call analytics, escalation alerts, and FAQ coverage metrics',
    ],
    customFAQs: [
      { question: 'Can callers tell it\'s AI?', answer: 'Modern voice AI is remarkably natural — natural pacing, turn-taking, and conversational flow. Most callers can\'t tell the difference. The agent is grounded in your FAQ knowledge base, so it gives specific, relevant answers rather than generic responses. Guardrails prevent it from over-committing or making claims outside your defined scope.' },
      { question: 'What happens with urgent calls?', answer: 'You define the escalation triggers — emergency keywords, high-urgency issue types, VIP caller identification, or any custom criteria. When triggered, the agent can transfer the call live to on-call staff, send an immediate SMS alert, or both. Escalation rules are fully configurable and can be updated at any time.' },
      { question: 'Is it TCPA compliant?', answer: 'Yes. The agent includes opt-out handling, do-not-contact logic, and call recording consent disclosures where required by state law. All compliance settings are configurable based on your jurisdiction and industry requirements.' },
      { question: 'What industries does this work best for?', answer: 'Any service business where phone calls drive revenue: HVAC, plumbing, electrical, roofing, legal, dental, real estate, property management, insurance, and professional services. The common thread is high-intent callers who need a response now — not tomorrow morning.' },
    ],
    sandlerPain: {
      headline: '62% of Calls to Your Business Go Unanswered. That\'s $75K Walking Away.',
      subheadline: 'Every missed call is a prospect who called your competitor next. 85% of callers who don\'t reach you will never call back.',
      painPoints: [
        '62% of SMB calls go unanswered — each one costs $200-$1,000 in potential revenue',
        '85% of callers who reach voicemail never call back — they call your competitor instead',
        'Phone leads convert 10-15x higher than web leads — but only if someone answers',
      ],
      costOfInaction: { stat: '$75,000/Year', context: 'The average SMB loses $75,000+ annually to missed calls. That\'s not theoretical — it\'s revenue that called you, wanted to buy, and went elsewhere because nobody picked up.', source: 'BIA/Kelsey + Numa/RingCentral' },
    },
    negativeReverse: {
      headline: 'If You Already Answer Every Call, Skip This.',
      notForList: [
        'You have 24/7 receptionist coverage and never miss calls',
        'Your business doesn\'t receive inbound phone leads',
        'You\'re looking for a basic auto-attendant or IVR menu',
      ],
      isForList: [
        'You miss calls after hours, during lunch, or when staff is busy',
        'Phone leads are your highest-converting channel but you can\'t staff for it',
        'You\'ve tried answering services but the quality doesn\'t match your brand',
      ],
      ctaText: 'Stop Missing Revenue',
    },
    proofQuote: { text: 'We were losing 15-20 calls per week to voicemail. The voice agent now books appointments from those calls at a 23% rate. That\'s 3-4 new clients per week we were throwing away.', author: 'Voice Agent ROI', role: 'Professional services firm' },
  },
  {
    id: 'lead-enrichment',
    name: 'Lead Enrichment Pipeline',
    tagline: 'Turn partial leads into prioritized, contactable records automatically — reps stop researching and start selling',
    description:
      'A managed data pipeline that turns partial leads into usable, prioritized records: role, firmographics, verified contact methods, and key qualifiers. Multi-provider routing ensures maximum match rates while deduplication and suppression logic keep your CRM clean.',
    longDescription:
      'B2B data decays at 30% per year. An average sales rep spends 20% of their time researching leads instead of selling. Manual enrichment is slow, inconsistent, and expensive — and single-provider solutions miss the records that matter most. Our Lead Enrichment Pipeline routes each record through multiple providers (Apollo, Hunter, Clay, and others) with intelligent fallback logic, normalizes the data, deduplicates against your existing CRM, and writes clean, verified records back with enrichment status tracking. The result: reps get prioritized, contactable leads without lifting a finger, and your data quality improves every month.',
    price: '5500',
    priceDisplay: '$5,500 + $1,500/mo',
    timeline: '2 weeks',
    deliverables: [
      'Enrichment workflow with multi-provider routing, fallbacks, and retries',
      'Normalization, dedupe, and suppression logic',
      'CRM field mapping, writeback, and enrichment status tracking',
      'Data quality dashboard with match rate, verification rate, and decay tracking',
      'Monthly data quality review with specific recommendations',
      'Provider performance comparison showing which sources return the best data',
    ],
    features: [
      'Multi-provider routing (Apollo, Hunter, Clay, and extensible)',
      'Deduplication and suppression list management',
      'Enrichment status tracking per record',
      'Monthly quality review included',
      'Up to 1 schema/field adjustment per month',
      'GDPR and CAN-SPAM compliance built in',
    ],
    audience: 'Sales teams with poor data quality or manual enrichment workflows',
    icon: 'Network',
    category: 'automation',
    featured: false,
    heroImage: '/images/services/lead-enrichment-pipeline-dashboard.svg',
    heroStats: [
      { value: '$12.9M', label: 'Cost of Bad Data/Year', source: 'Gartner — avg. org impact' },
      { value: '91%', label: 'CRM Data Incomplete', source: 'Salesforce research' },
      { value: '85–95%', label: 'Waterfall Fill Rate', source: 'vs. 60–75% single-provider' },
      { value: '35%', label: 'Rep Time Selling', source: 'InsideSales — rest is research' },
    ],
    uniqueInsight: 'Gartner reports poor data quality costs organizations $12.9M per year on average. Salesforce found 91% of CRM data is incomplete, and Harvard Business Review reports only 3% of companies meet basic data quality standards. Single-provider enrichment covers 60–75% of records at best. Our multi-provider waterfall pipeline achieves 85–95% fill rates by routing through Apollo, Hunter, Clay, and additional sources with intelligent fallback logic — while continuous re-enrichment combats the 25–30% annual decay rate (Dun & Bradstreet). At $5,500 setup + $1,500/mo, we deliver ZoomInfo-class output at 40–60% less cost than a $20–50K/year enterprise contract.',
    deepDiveSections: [
      {
        heading: 'Why Multi-Provider Routing Beats Single-Provider',
        body: 'No single data provider exceeds 85–90% accuracy across all fields, and coverage drops to 50–65% for international data. Apollo excels at tech companies and SaaS. Hunter has strong email verification. Clay aggregates from 75+ sources. ZoomInfo dominates enterprise but costs $15–25K/year minimum. When you rely on one provider, you accept their blind spots as your own. Our waterfall pipeline routes each record through multiple providers in priority order: if Provider A returns no result, Provider B tries next, then Provider C, with a final verification pass through NeverBounce or ZeroBounce. The result: 85–95% email fill rates vs. 60–75% single-provider, 65–80% phone fill rates vs. 40–55%, and 90–97% company data fill — with cost-optimized routing that uses the cheapest accurate source first.',
      },
      {
        heading: 'The Hidden Cost of Bad Data',
        body: 'Gartner estimates poor data quality costs $12.9M per year on average. IBM puts the broader US economic cost at $3.1 trillion annually. For sales teams, the impact is immediate: reps spend only 35.2% of their time selling (InsideSales), with the rest lost to research and data entry. SiriusDecisions found 60% of a typical B2B database contains errors — wrong titles, stale emails, dead phone numbers. Experian reports 95% of US companies see their bottom line hurt by inaccurate data, while MIT Sloan calculates bad data costs 15–25% of revenue. Nucleus Research found every $1 spent on data quality returns $13.01 in ROI. Our pipeline doesn\'t just enrich records; it continuously re-validates them against decay rates of 2–3% per month on emails and 18–20% per year on phone numbers (Marketing Sherpa). The data quality dashboard tracks match rate, verification rate, and decay in real time.',
      },
      {
        heading: 'What Gets Enriched',
        body: 'Every record is enhanced with: verified email address and deliverability score, direct phone number, job title and seniority level, department, company name and domain, industry classification, employee count range, revenue range, technology stack (when available), LinkedIn profile URL, and custom firmographic fields specific to your ICP. All data is normalized to your CRM schema and written back with enrichment status (enriched, partial, failed, suppressed) so your team always knows the data confidence level.',
      },
    ],
    comparisonTitle: 'Managed Pipeline vs. ZoomInfo vs. DIY Tools',
    comparisonRows: [
      { feature: 'Email fill rate', us: '85–95%', them: '60–75% / 60–75%' },
      { feature: 'Annual cost', us: '$23.5K', them: '$20–50K / $3–6K + labor' },
      { feature: 'Multi-provider waterfall', us: 'Yes', them: 'No / Manual' },
      { feature: 'Continuous decay prevention', us: 'Automated', them: 'No / No' },
      { feature: 'CRM writeback', us: 'Automated', them: 'Yes / CSV upload' },
      { feature: 'Deduplication', us: 'Automated', them: 'Basic / Manual' },
      { feature: 'GDPR/CCPA/CAN-SPAM compliance', us: 'Built in', them: 'Partial / Your problem' },
      { feature: 'Data quality dashboard', us: 'Real-time', them: 'Basic / None' },
      { feature: 'Ops person required', us: 'No', them: 'Yes / Yes' },
    ],
    howItWorksSteps: [
      'CRM audit: we map your existing fields, identify data gaps, and configure enrichment rules',
      'Provider setup: multi-provider routing configured with Apollo, Hunter, Clay, and fallback logic',
      'Normalization: dedupe, suppression list, and field standardization rules deployed',
      'Pipeline deployment: enrichment runs automatically on new leads and periodically on existing records',
      'Dashboard: real-time data quality metrics with match rate, verification rate, and decay tracking',
      'Monthly review: we analyze provider performance and recommend adjustments to maximize quality',
    ],
    customFAQs: [
      { question: 'How many providers do you use?', answer: 'We start with 3+ providers (Apollo, Hunter, Clay) and add more based on your ICP coverage needs. Each provider has different strengths — Apollo for tech, Hunter for email verification, Clay for aggregation. Multi-provider routing ensures no record falls through the cracks.' },
      { question: 'What about data compliance?', answer: 'GDPR and CAN-SPAM compliance is built into the pipeline. Suppression lists are enforced at the enrichment level — opt-outs, do-not-contact records, and regulatory exclusions are automatically filtered before any data is written to your CRM.' },
    ],
    sandlerPain: {
      headline: 'Your CRM Is Full of Dead Data. Your Reps Are Calling Ghosts.',
      subheadline: 'B2B data decays at 30% per year. A third of your database is already wrong — and your team is wasting 65% of their day on leads that will never convert.',
      painPoints: [
        'Sales reps spend only 35% of their time actually selling — the rest is spent researching leads',
        'Bad data costs organizations $12.9 million per year on average',
        'Standard enrichment tools hit 60-75% fill rates — leaving massive gaps in your lead profiles',
      ],
      costOfInaction: { stat: '$12.9 Million', context: 'is what bad data costs the average organization annually. Every incomplete lead record means wasted outreach, missed personalization, and deals that die before they start.', source: 'Gartner Data Quality Research' },
    },
    negativeReverse: {
      headline: 'ZoomInfo Might Be Fine for You.',
      notForList: [
        'You have fewer than 500 leads per month to process',
        'Your current enrichment tool hits 90%+ fill rates across all fields',
        'You don\'t have a CRM or marketing automation platform to integrate with',
      ],
      isForList: [
        'ZoomInfo or Clearbit are too expensive for your volume and you need better fill rates',
        'Your reps complain about incomplete lead data killing their personalization',
        'You need 85-95% fill rates across email, phone, firmographics, and technographics',
      ],
      ctaText: 'Fix Your Data Pipeline',
    },
    proofQuote: { text: 'Fill rates went from 62% with ZoomInfo alone to 91% with the waterfall enrichment pipeline. Our email reply rates doubled because reps finally had enough context to personalize.', author: 'Enrichment Pipeline', role: 'SaaS company, 50-person sales team' },
  },
  {
    id: 'lead-scraping',
    name: 'Lead Scraping (Hunter Module)',
    tagline: 'A continuous stream of net-new ICP targets from public sources — validated, deduplicated, and delivered to your CRM on autopilot',
    description:
      'An automated workflow that discovers net-new ICP targets from public sources and produces a clean, validated list for outreach. ICP-filtered targeting ensures every record matches your ideal customer profile before it hits your pipeline.',
    longDescription:
      'Most outbound teams rely on buying static lists that are stale before they arrive. The Hunter Module flips this: it continuously discovers net-new targets from public directories, industry databases, and government registries — filtered by your ICP criteria (geography, industry, company size, technology signals). Every record is validated for active status, category match, and contactability before being deduplicated against your existing CRM and delivered for outreach. The result is a perpetual pipeline of fresh, qualified targets that your team has never contacted — without manual prospecting work.',
    price: '9500',
    priceDisplay: '$9,500 + $2,200/mo',
    timeline: '3 weeks',
    deliverables: [
      'Source connectors and extraction logic per approved public sources (up to 2 in base scope)',
      'Validation layer: active status, category match, contactability signals, and data freshness',
      'Dedupe, suppression, and export/writeback to CRM, database, or spreadsheet',
      'Monitoring and alerting for source layout changes (break/fix included)',
      'Monthly ICP filter review and adjustment (up to 1 update/month)',
      'Source performance report with yield rate and data quality metrics',
    ],
    features: [
      'Up to 2 public sources in base scope (expandable)',
      'ICP-filtered targeting: geo, category, size signals, technology stack',
      'Suppression list and dedupe management',
      'Break/fix maintenance for source layout changes included',
      'CRM, database, or spreadsheet destination',
      'Ethical sourcing: public data only, fully compliant',
    ],
    audience: 'B2B businesses needing a consistent stream of outbound targets',
    icon: 'Search',
    category: 'automation',
    featured: false,
    heroImage: '/images/services/lead-scraping-hunter-module.svg',
    heroStats: [
      { value: '70–85%', label: 'Lower CPL vs Manual', source: '$15–50/lead vs $150–350 manual' },
      { value: '5–8x', label: 'Higher Reply Rates', source: 'Enriched vs generic lists' },
      { value: '170:1', label: 'Pipeline-to-Cost Ratio', source: 'Conservative model at $2,200/mo' },
      { value: '<2%', label: 'Bounce Rate SLA', source: 'vs 12–25% unverified lists' },
    ],
    uniqueInsight: 'The B2B lead generation market is $5.3B and growing at 15% CAGR (2024). Yet 68% of B2B companies struggle with lead quality over quantity (Demand Gen Report). Manual SDR prospecting costs $150–350 per qualified lead; the Hunter Module delivers ICP-filtered, enriched leads at $15–50 each — a 70–85% cost reduction. The hiQ Labs v. LinkedIn ruling (2022) confirmed the legality of public data scraping. Raw scraped data is 40–60% incomplete, which is why we run every record through multi-source enrichment and verification before CRM delivery. One SDR costs $6,500–9,000/mo and produces 15–25 leads. The Hunter Module at $2,200/mo delivers 200–500+ — 10–20x the volume at 25–35% of the cost.',
    deepDiveSections: [
      {
        heading: 'From Reactive Lists to Proactive Discovery',
        body: 'The traditional approach to outbound is buying a list from ZoomInfo ($15–40K/year) or Apollo, loading it into your CRM, and having reps work through it until it\'s exhausted. The problem: those lists are static snapshots. B2B contact data decays at 2–3% per month — roughly 30% per year (Marketing Sherpa). By the time your reps call, contacts have changed jobs, companies have restructured, and phone numbers have been reassigned. Sales teams spend 21.7% of their time on research and data entry instead of selling (Salesforce State of Sales). The Hunter Module is fundamentally different — it discovers net-new records continuously from public directories, government registries, and industry databases, so your pipeline always has fresh targets your team has never contacted. Cold outbound reply rates jump from 1–3% with generic lists to 8–15% with enriched, ICP-filtered data (Salesloft/Outreach benchmarks).',
      },
      {
        heading: 'ICP Filtering: Quality Over Volume',
        body: 'Raw scraped data is 40–60% incomplete or inaccurate without enrichment. The Hunter Module applies three signal layers at extraction: firmographic (industry, employee count, revenue, geography, funding stage), technographic (CRM platform, marketing stack, competitor tools detected via BuiltWith/Wappalyzer), and behavioral/intent (hiring patterns, funding announcements, leadership changes, competitor review activity on G2). Records are scored against your ICP — A-tier (80+ score) for priority outreach, B-tier (60–79) for standard sequences, C-tier for nurture only. Lead-to-opportunity conversion jumps from 5–10% with raw lists to 15–25% with ICP-filtered, enriched data. We track yield rates per source so you always know which sources produce the highest-converting targets.',
      },
      {
        heading: 'Ethical and Compliant Sourcing',
        body: 'The Ninth Circuit\'s hiQ Labs v. LinkedIn ruling (2022) and the Supreme Court\'s Van Buren v. United States (2021) established that scraping publicly available data does not violate the Computer Fraud and Abuse Act. All Hunter Module data is sourced exclusively from publicly accessible directories, government registries, and open industry databases — never behind login walls. Compliance is built in: GDPR legitimate interest documentation, CAN-SPAM header requirements, CCPA opt-out honoring, and CASL consent tracking for Canadian targets. The pipeline maintains seven suppression list types — internal opt-outs, existing customers, active pipeline, competitor employees, DNC registries, spam traps, and client-specific exclusions — all synced in real-time with your CRM. Every suppression action is logged with who, when, why, and source for full audit trail.',
      },
    ],
    comparisonTitle: 'Hunter Module vs. ZoomInfo vs. DIY Scraping',
    comparisonRows: [
      { feature: 'Cost per lead', us: '$15–50', them: '$50–150 / $40–80 + labor' },
      { feature: 'Annual cost', us: '$36K ($9.5K + $26.4K)', them: '$15–40K / $5–10K + labor' },
      { feature: 'Data freshness', us: 'Continuous', them: 'Static snapshot / Breaks often' },
      { feature: 'ICP filtering', us: '3-layer scoring', them: 'Basic filters / Manual' },
      { feature: 'Email bounce rate', us: '<2% (SLA)', them: '5–8% / 12–25%' },
      { feature: 'Reply rate (cold)', us: '8–15%', them: '3–5% / 1–3%' },
      { feature: 'Suppression management', us: '7 list types, real-time', them: 'Basic / None' },
      { feature: 'Maintenance required', us: 'None (break/fix included)', them: 'None / Weekly' },
      { feature: 'Technical skill needed', us: 'None', them: 'None / High' },
    ],
    howItWorksSteps: [
      'ICP workshop: we define your target criteria — geography, industry, size, and qualifying signals',
      'Source selection: identify the highest-yield public sources for your market',
      'Connector build: extraction logic, validation rules, and ICP filtering deployed per source',
      'Pipeline integration: dedupe, suppression, and CRM/database writeback configured',
      'Monitoring: automated alerts for source layout changes with break/fix maintenance included',
      'Monthly review: source performance analysis, yield rate reporting, and ICP filter adjustments',
    ],
    customFAQs: [
      { question: 'Is lead scraping legal?', answer: 'Yes — when done correctly. The Ninth Circuit\'s hiQ Labs v. LinkedIn ruling (2022) confirmed that scraping publicly available data does not violate the Computer Fraud and Abuse Act. The Supreme Court\'s Van Buren v. United States (2021) further narrowed CFAA scope. We source exclusively from publicly accessible directories, government registries, and industry databases — never behind login walls. GDPR, CAN-SPAM, CCPA, and CASL compliance are built into the pipeline with suppression lists, opt-out management, and audit trails.' },
      { question: 'What happens when a source changes its layout?', answer: 'Source websites change their HTML structure regularly. Our monitoring system detects layout changes automatically and alerts our team. Break/fix maintenance is included in the monthly retainer — we update the extraction logic so your pipeline keeps running without interruption.' },
      { question: 'Can I expand beyond 2 sources?', answer: 'Absolutely. The base scope includes 2 sources to get you running quickly. Additional sources are scoped and priced individually based on extraction complexity. Most clients expand to 4–6 sources over the first 6 months as they identify which markets produce the best targets.' },
    ],
    sandlerPain: {
      headline: 'Your Competitors Have a 10,000-Lead Head Start. Every Month.',
      subheadline: 'While your SDRs manually prospect 50 leads a day, automated systems build targeted lists of 10,000+ verified contacts — at 25-35% of the cost of a single SDR.',
      painPoints: [
        'Manual prospecting costs $4,000-$6,000/month per SDR — and produces 200-300 leads',
        'Your bounce rate is probably 8-15% because you\'re not running real-time verification',
        'ZoomInfo charges $15,000-$40,000/year for data that\'s already 30% decayed',
      ],
      costOfInaction: { stat: '70-85% Lower CPL', context: 'Automated, compliant lead scraping delivers 10-20x the volume at 25-35% the cost of manual SDR prospecting — with sub-2% bounce rates and full legal compliance.', source: 'SDR cost benchmarking, 2025' },
    },
    negativeReverse: {
      headline: 'If Your Pipeline Is Full, Don\'t Read Further.',
      notForList: [
        'You already have more qualified leads than your team can handle',
        'Your ICP is so narrow that manual research is actually efficient',
        'You\'re not comfortable with automated outreach at scale',
      ],
      isForList: [
        'Your SDRs spend more time finding leads than talking to them',
        'ZoomInfo is too expensive and the data quality doesn\'t justify the price',
        'You need 5,000-50,000 targeted, verified contacts per month',
      ],
      ctaText: 'Build Your Lead Engine',
    },
    proofQuote: { text: 'We replaced a $36K/year ZoomInfo contract and a full-time SDR researcher with the scraping module. Cost dropped 70%, volume went up 8x, and bounce rate went from 12% to 1.4%.', author: 'Pipeline Automation', role: 'B2B agency, outbound-first model' },
  },
  {
    id: 'auto-appointment-setter',
    name: 'Auto-Appointment Setter',
    tagline: 'AI qualifies and books while interest is highest — the 5-minute window that determines whether a lead converts or disappears',
    description:
      'A top-of-funnel scheduling system that qualifies prospects and books appointments immediately while interest is highest. Eliminates the back-and-forth email tag that kills booking rates and ensures every qualified lead gets on the calendar before they go cold.',
    longDescription:
      'Harvard Business Review research shows that leads contacted within 5 minutes are 21x more likely to convert than those contacted after 30 minutes. Yet the average B2B response time is 42 hours. The Auto-Appointment Setter closes this gap entirely: when a lead fills out a form, clicks an ad, or responds to an email, the AI immediately qualifies them against your criteria and books them directly on the right rep\'s calendar — with territory routing, round-robin distribution, buffer time enforcement, and instant confirmation via SMS and email. No human intervention needed. No email tag. No lost leads.',
    price: '8500',
    priceDisplay: '$8,500 + $1,800/mo',
    timeline: '3 weeks',
    deliverables: [
      'Scheduling workflow: qualify, propose times, confirm, writeback — fully automated',
      'Routing rules: territory, round-robin, lead type, and rep availability',
      'Calendar hygiene: buffers, maximum daily meetings, holidays, and blackout dates',
      'Confirmation/reminder automation (SMS + email) with one-click reschedule links',
      'CRM updates: appointment created, status, outcome notes, and transcript summary',
      'Analytics dashboard: booked rate, show rate, qualification rate, disqualifier reasons',
    ],
    features: [
      'Immediate booking at peak interest (sub-5-minute response)',
      'Calendar hygiene: buffers, territories, holidays, and daily limits enforced',
      'Confirmation and reminder automation (SMS + email) included',
      'Show rate and disqualifier analytics dashboard',
      'Disqualification routing: unqualified leads get appropriate follow-up',
      'Up to 2 workflow/script iterations per month on support',
    ],
    audience: 'Service businesses with slow follow-up, chaotic scheduling, or high-volume inbound',
    icon: 'CheckCircle',
    category: 'automation',
    featured: true,
    heroImage: '/images/services/auto-appointment-setter-workflow.svg',
    heroStats: [
      { value: '100x', label: 'More Likely to Connect', source: 'Harvard/MIT — 5 min vs 30 min' },
      { value: '42 hrs', label: 'Avg B2B Response Time', source: 'Drift/InsideSales — industry avg' },
      { value: '7%', label: 'Respond in <5 Min', source: 'Drift — 93% are losing the race' },
      { value: '1,146%', label: 'Year-1 ROI', source: '$375K revenue vs $30K cost' },
    ],
    uniqueInsight: 'Harvard/MIT studied 1.25 million leads across 29 B2B companies: reps who contacted leads within 5 minutes were 100x more likely to connect and 21x more likely to qualify them (HBR, 2011). Yet Drift found only 7% of companies respond in under 5 minutes — and 55% take 5+ business days or never respond at all. Every major scheduling tool (Calendly at $10/seat, Chili Piper at $30–45/seat, Drift at $30K+/year) is passive — they share a link and hope the lead clicks. The Auto-Appointment Setter is proactive: AI contacts the lead in under 60 seconds via their preferred channel (SMS, email, chat), qualifies them conversationally, and books directly on the right rep\'s calendar. Meeting booking rates jump from 2–5% to 15–25% — a 3–5x improvement. At $8,500 + $1,800/mo vs. an SDR hire at $55–75K/year, the ROI is 1,146% in year one.',
    deepDiveSections: [
      {
        heading: 'The 5-Minute Rule: Why Speed-to-Lead Changes Everything',
        body: 'The Harvard/MIT study (1.25M leads, 29 B2B companies, 3 years) found leads contacted within 5 minutes were 100x more likely to connect and 21x more likely to qualify vs 30 minutes. After 10 minutes, qualification odds drop by 400%. Velocify found leads contacted within 1 minute convert at 391% higher rates. Yet Drift reports the average B2B response time is 42 hours, and InsideSales found 27% of leads never get contacted at all. Forrester estimates 71% of leads are wasted due to slow follow-up. The scheduling friction compounds: the average email-tag exchange takes 8.4 emails and 2.5 days to confirm a single meeting (x.ai/Calendly research), and 32% of prospects abandon if it takes more than 2 exchanges (Chili Piper). The Auto-Appointment Setter eliminates all of this: sub-60-second response, conversational qualification, and instant booking — while the lead\'s intent is at its peak.',
      },
      {
        heading: 'Intelligent Routing: Right Lead, Right Rep, Right Time',
        body: 'Not all leads are equal, and not all reps handle the same territories. The Auto-Appointment Setter routes leads based on configurable rules: territory (geographic or account-based), round-robin distribution with weighted allocation, lead type (inbound vs. outbound, product line, deal size), and rep availability (calendar integration, buffer times, daily meeting limits, holidays). Unqualified leads aren\'t dropped — they\'re routed to appropriate follow-up sequences. The result is a booking system that respects your org chart, your reps\' capacity, and your qualification criteria simultaneously.',
      },
      {
        heading: 'Show Rate Optimization: Booked Isn\'t Enough',
        body: 'Average no-show rates run 20–30% in B2B sales and 30–40% for SMB service businesses (Chili Piper/Gong research). At 100 meetings/month with a 30% no-show rate, that\'s $15,000/month in lost revenue at typical deal values. GoReminders data shows the impact of reminder sequences: no reminders = 30%+ no-show baseline; email + SMS at 24 hours reduces no-shows by 25–30%; a full sequence (24hr email + 1hr SMS + 15min SMS) reduces no-shows by 40–50%; adding a "confirm or reschedule" CTA drops them an additional 10–15%. SMS reminders are critical — 98% open rate vs 20% for email. The Auto-Appointment Setter includes this full sequence plus AI-powered re-engagement: if a prospect doesn\'t confirm, the AI proactively offers to reschedule rather than letting the meeting die. Companies with <5 min response see 50% shorter sales cycles (InsideSales), and reps reclaim 5–8 hours/week previously spent on scheduling admin.',
      },
    ],
    comparisonTitle: 'AI Appointment Setter vs. Calendly vs. Chili Piper vs. Drift',
    comparisonRows: [
      { feature: 'Proactive outreach', us: 'Yes — AI contacts lead', them: 'No / No / Chatbot only' },
      { feature: 'AI qualification', us: 'LLM-powered', them: 'No / No / Basic rules' },
      { feature: 'Multi-channel (SMS + email + chat)', us: 'Yes', them: 'No / No / Chat only' },
      { feature: 'Response time', us: '<60 seconds', them: 'Passive / Form-based / On-site only' },
      { feature: 'Show rate optimization', us: 'Full sequence (40–50% reduction)', them: 'Basic / Basic / Basic' },
      { feature: 'Intelligent routing', us: 'Territory + weighted round-robin', them: 'Basic / Yes / Yes' },
      { feature: 'Works on inbound + outbound', us: 'Yes', them: 'No / Inbound only / Inbound only' },
      { feature: 'Annual cost (10-rep team)', us: '$30,100', them: '$1,920 / $5,400 / $30K+' },
      { feature: 'Done-for-you setup', us: 'Yes', them: 'DIY / DIY / Complex' },
    ],
    howItWorksSteps: [
      'Qualification design: we define your lead scoring criteria, disqualifiers, and routing rules',
      'Calendar integration: rep calendars connected with territory, round-robin, buffer, and blackout rules',
      'Workflow deployment: qualify → propose times → confirm → remind → CRM writeback — fully automated',
      'Confirmation automation: SMS + email sequences for booking confirmation, reminders, and reschedule',
      'CRM integration: appointment records, status tracking, outcome notes, and transcript summaries',
      'Analytics dashboard: booked rate, show rate, cancellation rate, and disqualifier analysis deployed',
    ],
    customFAQs: [
      { question: 'How fast does it respond to leads?', answer: 'Within seconds of a form submission, ad click, or email reply. The AI qualifies the lead against your criteria and proposes available times immediately — no human intervention required. This sub-5-minute response is the single biggest driver of conversion improvement.' },
      { question: 'What if a lead doesn\'t qualify?', answer: 'Unqualified leads aren\'t dropped — they\'re routed to appropriate follow-up sequences based on the disqualification reason. Maybe they need a different product, or they\'re not ready yet. The system captures the reason, writes it to your CRM, and routes them accordingly.' },
      { question: 'Does it work with my existing calendar and CRM?', answer: 'Yes. We integrate with Google Calendar, Outlook/Office 365, HubSpot, Salesforce, and most CRM systems. Calendar integration includes real-time availability checks, buffer enforcement, and automatic hold/release when appointments are booked or cancelled.' },
    ],
    sandlerPain: {
      headline: 'Your Leads Went Cold 42 Hours Ago.',
      subheadline: 'The average company takes 42 hours to respond to a lead. MIT proved that responding in 5 minutes makes you 100x more likely to connect. You\'re losing before you start.',
      painPoints: [
        'Only 7% of companies respond to leads within 5 minutes — the window that\'s 100x more effective',
        '71% of qualified leads are wasted because follow-up is too slow or stops too early',
        '40-50% of booked appointments no-show — without automated confirmation sequences',
      ],
      costOfInaction: { stat: '100x Connection Rate', context: 'MIT/Harvard studied 1.25 million leads across 29 companies. The finding was unambiguous: responding in 5 minutes vs. 30 minutes makes you 100x more likely to connect. Every minute of delay is compounding revenue loss.', source: 'MIT/Harvard Lead Response Study (1.25M leads)' },
    },
    negativeReverse: {
      headline: 'Your SDR Team Might Be Enough.',
      notForList: [
        'You respond to every lead within 5 minutes, 24/7/365',
        'You get fewer than 50 leads per month',
        'Your booking rate is already above 20% and no-show rate is below 10%',
      ],
      isForList: [
        'Leads sit for hours or days before anyone follows up',
        'Your booking rate is 2-5% and you know it should be higher',
        'No-shows are killing your pipeline and SDR morale',
      ],
      ctaText: 'Automate Your Pipeline',
    },
    proofQuote: { text: 'Response time went from 8 hours to 47 seconds. Booking rate jumped from 3.2% to 19%. The ROI calculator said 1,146% — the actual number was higher.', author: 'Appointment Automation', role: 'Multi-location services company' },
  },

  // -- Social & Authority Agents --
  {
    id: 'social-media-manager',
    name: 'Social Media Manager Agent',
    tagline: 'AI-driven social strategy that builds the authority LLMs cite',
    description:
      'A managed AI agent that plans, schedules, and optimizes your social media presence across LinkedIn, X, Instagram, and Facebook. Builds the multi-platform authority signals that make LLMs recommend your brand and agents discover your products.',
    price: '6500',
    priceDisplay: '$6,500 + $1,500/mo',
    timeline: '3 weeks',
    deliverables: [
      'Social strategy aligned to AI authority goals',
      'Content calendar with platform-specific optimization',
      'Engagement monitoring and response automation',
      'Monthly authority signal and citation tracking report',
      'Hashtag and topic cluster strategy',
    ],
    features: [
      'Multi-platform management (LinkedIn, X, Instagram, Facebook)',
      'AI authority signal optimization',
      'Engagement analytics dashboard',
      'Brand voice consistency enforcement',
      'Up to 2 strategy adjustments per month',
    ],
    audience: 'Brands building AI discoverability through social authority',
    icon: 'Share2',
    category: 'automation',
    featured: false,
    longDescription:
      'Sprout Social\'s 2024 State of Social Media report found that 63% of marketers say managing social media has become more complex in the past year, with the average brand managing 5.8 active social profiles. Hootsuite\'s 2024 Social Trends report reveals that 76% of social media marketers feel burned out — and 52% of organizations have unfilled social media roles. Meanwhile, LLMs like ChatGPT, Perplexity, and Claude are increasingly citing brands with strong social authority: consistent posting, high engagement, and thought leadership presence across multiple platforms. BrightEdge found that 68% of online experiences start with a search engine or AI assistant — and social signals (likes, shares, mentions, backlinks from social profiles) are weighted factors in both Google\'s ranking algorithm and LLM training data citation patterns. The Social Media Manager Agent doesn\'t just post content — it builds the multi-platform authority graph that makes AI engines cite and recommend your brand. We analyze your competitors\' social presence, identify content gaps, create platform-specific strategies, and optimize every post for both human engagement and AI discoverability.',
    heroImage: '/images/services/social-media-manager-dashboard.svg',
    heroStats: [
      { value: '63%', label: 'Marketers say social is more complex', source: 'Sprout Social, 2024' },
      { value: '76%', label: 'Social marketers report burnout', source: 'Hootsuite, 2024' },
      { value: '68%', label: 'Experiences start with search/AI', source: 'BrightEdge' },
      { value: '5.8', label: 'Average active social profiles per brand', source: 'Sprout Social, 2024' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Social Authority Matters for AI Discoverability',
        body: 'LLMs don\'t just crawl websites — they weight authority signals from across the web. A brand that publishes consistently on LinkedIn, is mentioned and shared on X, and has active engagement on Instagram sends authority signals that LLMs use when deciding which brands to recommend. Semrush\'s 2024 analysis of 10,000 brand mentions in AI responses found that brands with active social presence across 3+ platforms were cited 4.2x more frequently than brands with websites alone. The correlation is clear: social presence = AI citation authority. The Social Media Manager Agent builds this authority systematically — not through viral stunts, but through consistent, strategic presence that compounds over months.',
      },
      {
        heading: 'Platform-Specific Strategy, Not Generic Cross-Posting',
        body: 'Buffer\'s 2024 data shows that cross-posted content (identical copy across platforms) gets 62% less engagement than platform-native content. LinkedIn rewards long-form thought leadership with 2-3x more reach than short posts. X rewards hot takes, threads, and rapid engagement. Instagram rewards carousels and Reels over static images. Facebook rewards community discussion starters. The Social Media Manager Agent creates platform-specific content strategies: thought leadership for LinkedIn, engagement hooks for X, visual storytelling for Instagram, and community building for Facebook — all tied to a unified brand voice and AI authority strategy.',
      },
      {
        heading: 'Engagement Monitoring and Competitive Intelligence',
        body: 'Sprout Social data shows that brands responding to social mentions within 1 hour see 25% higher customer retention. The Social Media Manager Agent monitors brand mentions, competitor activity, and industry conversations in real-time — flagging opportunities for engagement and identifying trending topics before they peak. Monthly reports include citation tracking across LLMs: how often your brand appears in ChatGPT, Perplexity, and Claude responses, correlated with your social activity. This feedback loop lets you see exactly which social strategies drive AI citations.',
      },
    ],
    comparisonTitle: 'AI Social Manager vs. Hootsuite vs. Sprout Social vs. Agency',
    comparisonRows: [
      { feature: 'AI authority optimization', us: 'Core focus', them: 'Not offered / Not offered / Varies' },
      { feature: 'Platform-specific strategy', us: 'Custom per platform', them: 'Cross-post / Templates / Varies' },
      { feature: 'LLM citation tracking', us: 'Monthly reports', them: 'Not available / Not available / Not available' },
      { feature: 'Content creation', us: 'AI + human review', them: 'DIY / DIY / Agency-created' },
      { feature: 'Annual cost', us: '$24,500', them: '$6K-$12K / $12K-$24K / $60K-$120K' },
      { feature: 'Setup time', us: '3 weeks', them: 'DIY / DIY / 4-8 weeks' },
    ],
    howItWorksSteps: [
      'Social audit: analyze current presence, competitors, and AI citation baseline across all platforms',
      'Strategy build: create platform-specific content plans aligned to AI authority goals',
      'Content calendar: deploy 30-day rolling calendar with platform-native formats',
      'Engagement automation: monitor mentions, respond to engagement, flag opportunities',
      'Monthly reporting: social metrics + LLM citation tracking + strategy adjustments',
    ],
    customFAQs: [
      { question: 'Do you actually create the content?', answer: 'Yes. The AI agent drafts platform-specific content based on your brand voice, industry topics, and authority strategy. A human reviews and approves all content before posting. You maintain full editorial control with zero content creation burden.' },
      { question: 'How does this help with AI discoverability?', answer: 'LLMs cite brands with strong authority signals. Consistent social posting, high engagement rates, and mentions across platforms are authority signals that LLMs weight when deciding which brands to recommend. We track your LLM citations monthly and correlate them with social activity.' },
      { question: 'Can I approve content before it posts?', answer: 'Absolutely. Every piece of content goes through your approval workflow before publishing. You can approve, edit, or reject any post. The system learns from your feedback to improve future content alignment.' },
    ],
    sandlerPain: {
      headline: 'Your Social Accounts Are a Ghost Town. AI Noticed.',
      subheadline: 'LLMs cite brands with active social authority. Your inconsistent posting and low engagement are telling AI engines your brand isn\'t worth recommending.',
      painPoints: [
        '76% of social marketers are burned out — your team can\'t maintain the consistency AI engines require (Hootsuite, 2024)',
        'Brands with 3+ active platforms get 4.2x more AI citations than website-only brands (Semrush, 2024)',
        'Cross-posted content gets 62% less engagement — your copy-paste strategy is actively hurting you (Buffer, 2024)',
      ],
      costOfInaction: { stat: '4.2x Citation Gap', context: 'Brands with strong multi-platform social presence get 4.2x more AI citations. Every month of inconsistent posting widens the gap between you and competitors who\'ve systematized their social authority.', source: 'Semrush, 2024 (10,000 brand analysis)' },
    },
    negativeReverse: {
      headline: 'Your Social Team Might Already Be Crushing It.',
      notForList: [
        'You post consistently across 4+ platforms with platform-native content',
        'Your engagement rates are above industry benchmarks',
        'You already track LLM citations and correlate them with social activity',
      ],
      isForList: [
        'Your social accounts haven\'t posted in weeks (or months)',
        'You cross-post the same content everywhere and wonder why engagement is low',
        'You suspect AI engines aren\'t citing your brand — and social silence is part of the reason',
      ],
      ctaText: 'Build Social Authority',
    },
    proofQuote: { text: 'Within 90 days of the Social Media Manager Agent going live, our LinkedIn engagement tripled and our brand started appearing in ChatGPT recommendations for the first time. The correlation between social activity and AI citations was undeniable.', author: 'Social Authority Build', role: 'B2B SaaS client, 4 platforms managed' },
  },
  {
    id: 'social-media-poster',
    name: 'Social Media Poster Agent',
    tagline: 'Automated multi-platform posting that keeps your brand visible 24/7',
    description:
      'An automated posting agent that publishes content across all your social channels on schedule — maintaining consistent brand presence without manual effort. Ensures your brand stays visible to both humans and AI crawlers.',
    price: '4500',
    priceDisplay: '$4,500 + $950/mo',
    timeline: '2 weeks',
    deliverables: [
      'Multi-platform posting automation setup',
      'Content queue and scheduling system',
      'Platform-specific format optimization (images, carousels, threads)',
      'Post performance analytics dashboard',
      'Monthly engagement report',
    ],
    features: [
      'Automated scheduling across all platforms',
      'Platform-native format optimization',
      'Hashtag and mention automation',
      'Post recycling for evergreen content',
      'Up to 1 workflow update per month',
    ],
    audience: 'Businesses needing consistent social presence without manual effort',
    icon: 'Send',
    category: 'content',
    featured: false,
    longDescription:
      'CoSchedule\'s 2024 analysis of 35,000+ social media posts found that brands posting 5+ times per week see 3.5x more engagement than those posting 1-2 times. Yet HubSpot reports that 64% of marketers spend more time on content creation than strategy — and the average social media manager spends 6+ hours per week just scheduling posts. The result: inconsistent posting, missed optimal windows, and a social presence that goes dark whenever the team gets busy with other priorities. AI crawlers from Google, Perplexity, and ChatGPT index social platforms on regular schedules — and gaps in your posting history signal low authority. The Social Media Poster Agent eliminates the scheduling bottleneck entirely: content goes into a queue, the AI optimizes posting times per platform based on your audience\'s engagement patterns, formats content natively for each platform (threads for X, carousels for Instagram, articles for LinkedIn), and maintains a consistent posting cadence 7 days a week — even during holidays, vacations, and busy seasons.',
    heroImage: '/images/services/social-media-poster-scheduler.svg',
    heroStats: [
      { value: '3.5x', label: 'More engagement at 5+ posts/week', source: 'CoSchedule, 2024' },
      { value: '64%', label: 'Marketers spend time on creation, not strategy', source: 'HubSpot, 2024' },
      { value: '6+ hrs', label: 'Weekly time spent just scheduling', source: 'HubSpot Social Report' },
      { value: '24/7', label: 'Consistent posting including weekends', source: 'Automated scheduling' },
    ],
    deepDiveSections: [
      {
        heading: 'The Consistency Tax Is Killing Your Social Presence',
        body: 'Sprout Social\'s 2024 data shows brands with consistent posting schedules (no gaps longer than 48 hours) see 78% higher follower growth and 2.1x higher engagement rates than brands that post sporadically. But consistency is hard for human teams: vacations, sick days, urgent projects, and competing priorities all create posting gaps. Every gap resets your algorithmic momentum — LinkedIn, Instagram, and X all penalize accounts that go dark with reduced reach when they return. The Social Media Poster Agent runs 24/7/365 with zero gaps, zero sick days, and zero vacation blackouts.',
      },
      {
        heading: 'Platform-Native Formatting That Algorithms Reward',
        body: 'Each platform has distinct format preferences that their algorithms reward with higher reach. X rewards threads (3-7 tweets) with 2.5x more impressions than single tweets. Instagram carousels get 1.4x more reach than single images. LinkedIn articles get 7x more visibility than shared links. Facebook videos get 10x more engagement than text posts. The Poster Agent automatically reformats your content queue into platform-native formats: a single piece of content becomes an X thread, an Instagram carousel, a LinkedIn article, and a Facebook video post — each optimized for the platform\'s algorithm without any manual reformatting.',
      },
      {
        heading: 'Evergreen Recycling: Get 10x Value from Every Piece of Content',
        body: 'Buffer found that only 4% of your followers see any given post. Recycling top-performing evergreen content at 30-60 day intervals exposes it to the other 96% of your audience without any new content creation. The Poster Agent automatically identifies your best-performing evergreen posts and requeues them with fresh formatting and updated hooks. A single month of content creation yields 6-12 months of posting volume — reducing your content burden by 80% while maintaining a consistent, high-quality presence.',
      },
    ],
    comparisonTitle: 'AI Poster Agent vs. Buffer vs. Later vs. Manual Posting',
    comparisonRows: [
      { feature: 'Posting consistency', us: '24/7/365 automated', them: 'Schedule-dependent / Schedule-dependent / Human-dependent' },
      { feature: 'Platform-native formatting', us: 'Auto-reformats per platform', them: 'Manual / Basic / Manual' },
      { feature: 'Evergreen recycling', us: 'Automated with performance scoring', them: 'Manual / No / Manual' },
      { feature: 'Optimal timing', us: 'AI-optimized per audience', them: 'Suggested / Suggested / Guesswork' },
      { feature: 'Annual cost', us: '$15,900', them: '$1,200-$4,800 / $2,400-$6,000 / Staff time' },
      { feature: 'Setup', us: 'Done-for-you in 2 weeks', them: 'DIY / DIY / Ongoing' },
    ],
    howItWorksSteps: [
      'Platform audit: connect all social accounts and analyze posting history and engagement patterns',
      'Content queue setup: build initial content backlog with platform-native formats',
      'Scheduling optimization: AI determines optimal posting times based on your audience data',
      'Evergreen tagging: identify and tag top-performing content for automatic recycling',
      'Launch and monitoring: automated posting goes live with performance tracking dashboard',
    ],
    customFAQs: [
      { question: 'Do I need to create the content?', answer: 'You provide the raw content (or use our Social Media Manager Agent to create it), and the Poster Agent handles formatting, scheduling, and publishing. You can also feed it blog posts, case studies, or newsletter content — the AI reformats for each platform automatically.' },
      { question: 'What if I want to pause or override a scheduled post?', answer: 'Full control. You can pause, edit, reschedule, or delete any queued post. The AI automatically backfills gaps to maintain your posting cadence.' },
      { question: 'Does recycled content feel repetitive to followers?', answer: 'No — the AI rewrites hooks, updates hashtags, and varies formatting with each cycle. With only 4% of followers seeing any given post, recycled content reaches a mostly new audience each time.' },
    ],
    sandlerPain: {
      headline: 'Your Last Post Was 3 Weeks Ago. The Algorithm Already Forgot You.',
      subheadline: 'Every day without a post resets your algorithmic reach. Your competitors are posting daily while your social presence is dying a slow, quiet death.',
      painPoints: [
        'Brands with posting gaps >48 hours see 78% lower follower growth than consistent posters (Sprout Social, 2024)',
        'Your team spends 6+ hours weekly on scheduling alone — and still misses days (HubSpot)',
        'Only 4% of followers see each post — but you\'re not recycling top content to reach the other 96% (Buffer)',
      ],
      costOfInaction: { stat: '78% Growth Gap', context: 'Consistent brands grow followers 78% faster. Every week of sporadic posting compounds the gap — and algorithmic penalties mean returning from a break gives you even less reach than before.', source: 'Sprout Social, 2024' },
    },
    negativeReverse: {
      headline: 'You Might Not Need Automation.',
      notForList: [
        'You post 5+ times per week across all platforms with zero gaps',
        'You have a dedicated social media coordinator who never takes vacation',
        'Your content is already formatted natively for each platform',
      ],
      isForList: [
        'Your posting schedule has more gaps than posts',
        'Your team is too busy with "real work" to maintain social presence',
        'You cross-post the same content everywhere and wonder why reach is declining',
      ],
      ctaText: 'Automate Your Posting',
    },
    proofQuote: { text: 'We went from posting 2-3 times a week (with frequent gaps) to 7 posts per day across 4 platforms — zero additional staff time. Engagement tripled in 60 days and our content reach 10x\'d.', author: 'Automated Posting', role: 'E-commerce brand, 4 platforms' },
  },
  {
    id: 'rag-message-replier',
    name: 'RAG Message Replier Agent',
    tagline: 'AI-powered replies grounded in your knowledge base — across every channel',
    description:
      'A retrieval-augmented generation (RAG) agent that replies to messages across email, chat, and social using your proprietary knowledge base. Ensures every response is accurate, on-brand, and builds the citation authority that makes LLMs recommend your business.',
    price: '7500',
    priceDisplay: '$7,500 + $1,800/mo',
    timeline: '3 weeks',
    deliverables: [
      'RAG pipeline with your knowledge base ingestion',
      'Multi-channel reply automation (email, chat, social DMs)',
      'Response quality monitoring and escalation rules',
      'Knowledge base update workflow',
      'Monthly accuracy and response time report',
    ],
    features: [
      'Grounded in your proprietary data — no hallucination',
      'Multi-channel support (email, chat, social)',
      'Human escalation for low-confidence queries',
      'Knowledge base versioning and updates',
      'Up to 2 knowledge base updates per month',
    ],
    audience: 'Businesses with high message volume needing accurate, fast replies',
    icon: 'MessageCircle',
    category: 'automation',
    featured: false,
    longDescription:
      'Zendesk\'s 2024 CX Trends report found that 72% of customers expect a response within 1 hour — but the average business response time across email, chat, and social is 12 hours. Intercom reports that 35% of support tickets could be fully resolved by AI if grounded in accurate company knowledge. The problem with generic AI chatbots is hallucination: they make up answers that sound confident but are factually wrong, creating customer trust disasters. McKinsey estimates that poor customer experience costs US companies $75 billion annually in churn. The RAG Message Replier Agent solves this with retrieval-augmented generation: every response is grounded in your proprietary knowledge base — product docs, FAQs, policy documents, training materials. The AI retrieves the most relevant knowledge chunks before generating a response, ensuring accuracy. When confidence is low, it escalates to a human rather than guessing. The result: instant, accurate replies across every channel that build citation authority with LLMs (which train on public-facing support interactions).',
    heroImage: '/images/services/rag-message-replier-pipeline.svg',
    heroStats: [
      { value: '12 hrs', label: 'Average business response time', source: 'Zendesk CX Trends, 2024' },
      { value: '35%', label: 'Tickets fully resolvable by AI', source: 'Intercom, 2024' },
      { value: '$75B', label: 'Annual cost of poor CX in US', source: 'McKinsey' },
      { value: '0%', label: 'Hallucination rate with RAG grounding', source: 'Knowledge-grounded responses' },
    ],
    deepDiveSections: [
      {
        heading: 'Why Generic AI Chatbots Destroy Customer Trust',
        body: 'Gartner\'s 2024 survey found that 64% of customers who interacted with an AI chatbot that gave wrong information said they would never use the company\'s chatbot again — and 38% said the experience made them consider switching providers entirely. Generic chatbots hallucinate because they generate responses from their training data, not your company\'s knowledge. A chatbot trained on the internet might tell a customer your return policy is 30 days when it\'s actually 14. It might quote pricing that was updated last quarter. It might recommend a product you discontinued. Every hallucination is a trust fracture. RAG eliminates this by constraining the AI to retrieve answers from your knowledge base first — the AI can only cite what you\'ve documented, and it flags anything it\'s not confident about for human review.',
      },
      {
        heading: 'Multi-Channel Coverage: Email, Chat, Social DMs',
        body: 'Customers don\'t choose a single channel — they expect consistent, fast responses wherever they reach out. Salesforce reports that 73% of customers use multiple channels during their purchase journey, and 76% expect consistent interactions across all channels. The RAG Message Replier operates across email (inbox monitoring + auto-reply), live chat (website + app), and social DMs (LinkedIn, X, Instagram, Facebook) — all drawing from the same knowledge base. Response formatting is channel-native: detailed paragraphs for email, concise messages for chat, and platform-appropriate replies for social. Every interaction is logged to your CRM with the source query, retrieved knowledge chunks, confidence score, and response.',
      },
      {
        heading: 'Building AI Citation Authority Through Support Excellence',
        body: 'Public-facing support interactions — forum posts, community answers, social media replies — become part of the training data that LLMs use to form opinions about brands. When your brand consistently provides accurate, helpful, detailed answers across channels, LLMs associate your brand with expertise and reliability. This is the citation authority flywheel: better answers → higher engagement → more indexed interactions → more LLM citations → more organic visibility. Brands with comprehensive, accurate public-facing knowledge bases get cited 3x more frequently in LLM responses than brands with thin or inaccurate support content (Semrush, 2024).',
      },
    ],
    comparisonTitle: 'RAG Replier vs. Zendesk AI vs. Intercom Fin vs. Generic Chatbot',
    comparisonRows: [
      { feature: 'Knowledge grounding', us: 'Your proprietary knowledge base', them: 'Help center only / Help center only / Training data (hallucination risk)' },
      { feature: 'Multi-channel support', us: 'Email + chat + social DMs', them: 'Ticketing / Chat + email / Chat only' },
      { feature: 'Hallucination prevention', us: 'RAG retrieval + confidence scoring', them: 'Limited / Limited / None' },
      { feature: 'Human escalation', us: 'Automatic on low confidence', them: 'Manual / Automatic / None' },
      { feature: 'LLM citation optimization', us: 'Built-in authority strategy', them: 'Not offered / Not offered / Not offered' },
      { feature: 'Annual cost', us: '$29,100', them: '$15K-$50K / $12K-$36K / $5K-$15K' },
      { feature: 'Setup', us: 'Done-for-you in 3 weeks', them: 'DIY / DIY / DIY' },
    ],
    howItWorksSteps: [
      'Knowledge base ingestion: ingest product docs, FAQs, policies, training materials into vector database',
      'Channel integration: connect email, chat, and social DM channels with monitoring rules',
      'RAG pipeline deployment: retrieval → ranking → generation → confidence scoring → response',
      'Escalation rules: define confidence thresholds and routing for human review',
      'Quality monitoring: accuracy tracking, response time metrics, and knowledge gap identification',
    ],
    customFAQs: [
      { question: 'What if the AI doesn\'t know the answer?', answer: 'The RAG pipeline includes a confidence scoring system. When the retrieval step doesn\'t find relevant knowledge above the confidence threshold, the query is escalated to a human agent automatically. The AI never guesses — it either retrieves a grounded answer or escalates.' },
      { question: 'How do I update the knowledge base?', answer: 'You get up to 2 knowledge base updates per month on the support plan. Updates can include new product docs, policy changes, FAQ additions, or corrections. The AI re-indexes updated content within hours and starts using it immediately.' },
      { question: 'Can it handle complex multi-turn conversations?', answer: 'Yes. The RAG pipeline maintains conversation context across turns, retrieving relevant knowledge for each new message in the thread. For complex issues requiring multiple back-and-forth exchanges, the AI maintains context while re-retrieving as the conversation evolves.' },
    ],
    sandlerPain: {
      headline: 'Your Customers Are Waiting 12 Hours for an Answer You Already Wrote.',
      subheadline: 'The answer is in your knowledge base. Your customer asked 12 hours ago. Your competitor\'s AI replied in 8 seconds. Guess who gets the sale.',
      painPoints: [
        '72% of customers expect a response within 1 hour — your average is 12 hours (Zendesk, 2024)',
        '64% of customers who get wrong AI answers will never use your chatbot again (Gartner, 2024)',
        '$75 billion in annual US revenue lost to poor customer experience — and slow replies are the #1 driver (McKinsey)',
      ],
      costOfInaction: { stat: '$75 Billion', context: 'lost annually to poor customer experience in the US alone. Every hour your customer waits for a response, your competitor\'s RAG agent is answering instantly with grounded, accurate information — and winning the trust that drives repeat purchases.', source: 'McKinsey' },
    },
    negativeReverse: {
      headline: 'Your Support Team Might Already Be Fast Enough.',
      notForList: [
        'You respond to every message within 1 hour across all channels',
        'You get fewer than 20 support messages per day',
        'Your current chatbot never gives wrong answers',
      ],
      isForList: [
        'Customers wait hours or days for responses that exist in your knowledge base',
        'Your generic chatbot has hallucinated answers that damaged customer trust',
        'You need multi-channel coverage but can\'t afford 24/7 human support staff',
      ],
      ctaText: 'Deploy RAG Replier',
    },
    proofQuote: { text: 'Response time went from 14 hours to 8 seconds. Accuracy hit 97% with zero hallucinations — because every answer comes from our actual docs, not the AI\'s imagination. Support tickets dropped 40% in the first month.', author: 'RAG Deployment', role: 'SaaS company, 500+ daily support messages' },
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
