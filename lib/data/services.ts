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
      { question: 'Is the ACRA really free?', answer: 'Yes — completely free with no commitment. The ACRA is our lead magnet. We deliver a genuinely useful strategic roadmap because the best clients self-select into paid engagements after seeing their gaps. Over 60% of our Gold and Enterprise clients started with a free ACRA.' },
      { question: 'What happens after I get my ACRA report?', answer: 'You receive a prioritized action plan. Many teams implement quick wins immediately — schema additions, .well-known endpoint creation, content restructuring. For larger gaps (full protocol implementation, authority building programs), we recommend the Gold or Enterprise package — but there is zero pressure. The report is yours regardless.' },
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
    tagline: 'Optimize your content for generative AI engines',
    description:
      'Full implementation of Generative Engine Optimization across your existing content. We restructure pages, add schema, improve authority signals, and ensure AI models cite your brand as the authoritative source.',
    price: '7500',
    priceDisplay: '$7,500',
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
    uniqueInsight: 'GEO goes beyond SEO: we restructure your content so AI models generate answers that cite your brand. The key insight is token efficiency — AI models prefer concise, schema-rich, SSR-rendered pages over bloated SPA bundles.',
    relatedHubPage: '/hub/generative-engine-optimization',
    howItWorksSteps: [
      'Baseline audit: measure current AI citation rate and token cost per page',
      'Schema implementation: JSON-LD on all page types (Article, FAQPage, HowTo, ClaimReview)',
      'Content restructuring: Answer-First format with speakable markup',
      'Authority signal enhancement: E-E-A-T signals, internal linking, ClaimReview citations',
      'Performance report: before/after citation rates across 5 AI platforms',
    ],
  },
  {
    id: 'authority-building',
    name: 'Authority Building Program',
    tagline: 'Become the definitive source AI agents cite in your market',
    description:
      'A 90-day intensive program that builds your brand into the authoritative source AI agents cite when your topics come up. Combines content strategy, schema architecture, protocol implementation, and flywheel activation.',
    price: '15000',
    priceDisplay: '$15,000',
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
    uniqueInsight: 'The Authority Flywheel is Adam Silva\'s proprietary methodology: publish primary research → earn AI citations → build schema authority → attract more citations. Within 90 days, clients go from invisible to cited by ChatGPT and Perplexity.',
    relatedHubPage: '/hub/answer-engine-optimization',
    howItWorksSteps: [
      'Authority audit: identify your current citation footprint and topical gaps',
      'Content strategy: 10 articles targeting high-citation-probability topics',
      'Schema architecture: complete JSON-LD graph with Person, Organization, Article, FAQPage, DefinedTermSet',
      'Hub-and-spoke deployment: topical authority pages linking to all related content',
      'Flywheel activation: monthly citation audits with course corrections',
    ],
    customFAQs: [
      { question: 'How do you measure citation growth?', answer: 'We query your brand topics across ChatGPT, Perplexity, Claude, Gemini, and Bing Copilot monthly. Each response is scored: direct citation (link), brand mention, recommendation, or absent. You get a dashboard showing citation rate over time.' },
      { question: 'What is the Authority Flywheel?', answer: 'The Authority Flywheel is a self-reinforcing cycle: publish authoritative content → AI models cite it → citations build authority signals → authority signals make AI models cite you more. The key is primary research and schema depth — these are the signals AI models trust most.' },
    ],
  },
  {
    id: 'agent-ready-blog-creator',
    name: 'AEO/GEO Blog Creator Engine',
    tagline: 'Automated 2,000+ word articles that dominate AI citations',
    description:
      'A fully automated content production system that creates AEO/GEO-optimized blog articles — 2,000+ words each, with video summaries, proper schema, and internal linking. Scale your authority without scaling your team.',
    price: '4500',
    priceDisplay: '$4,500 + $2,500/mo',
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
    price: '6500',
    priceDisplay: '$6,500 + $3,000/mo',
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
    price: '45000',
    priceDisplay: '$45,000 + $5,000/mo',
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
    featured: false,
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
