import { fetchStrapi, fetchStrapiSafe } from './client'

export interface StrapiImage {
  url: string
  alternativeText?: string
  width?: number
  height?: number
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  }
}

export interface StrapiAuthor {
  id: number
  name: string
  bio?: string
  avatar?: StrapiImage
  social_url?: string
}

export interface StrapiCategory {
  id: number
  name: string
  slug: string
  description?: string
}

export interface StrapiPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: StrapiImage
  author?: StrapiAuthor
  category?: StrapiCategory
  published_at: string
  updatedAt: string
  read_time?: number
  tags?: string[]
  json_ld_faq?: Array<{ question: string; answer: string }>
  seo_title?: string
  seo_description?: string
  featured?: boolean
  video_url?: string
  video_duration?: number
  word_count?: number
}

const BLOG_POPULATE = '?populate[cover_image]=true&populate[author][populate][avatar]=true&populate[category]=true&sort=published_at:desc'
const BLOG_LIST_FIELDS = '&fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=published_at&fields[4]=read_time&fields[5]=featured&fields[6]=tags&fields[7]=word_count'

export async function getInsights(limit = 50): Promise<StrapiPost[]> {
  const data = await fetchStrapiSafe<StrapiPost[]>(
    `/blog-posts${BLOG_POPULATE}${BLOG_LIST_FIELDS}&pagination[limit]=${limit}`,
    [],
    { revalidate: 3600, tags: ['insights'] }
  )
  return data || []
}

export async function getFeaturedInsights(limit = 3): Promise<StrapiPost[]> {
  const data = await fetchStrapiSafe<StrapiPost[]>(
    `/blog-posts${BLOG_POPULATE}${BLOG_LIST_FIELDS}&filters[featured][$eq]=true&pagination[limit]=${limit}`,
    [],
    { revalidate: 3600, tags: ['insights-featured'] }
  )
  return data || []
}

export async function getInsightBySlug(slug: string): Promise<StrapiPost | null> {
  const data = await fetchStrapiSafe<StrapiPost[] | null>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate[cover_image]=true&populate[author][populate][avatar]=true&populate[category]=true`,
    null,
    { revalidate: 3600, tags: [`insight-${slug}`] }
  )
  if (!data || !Array.isArray(data) || data.length === 0) return null
  return data[0]
}

export async function getInsightSlugs(): Promise<string[]> {
  const data = await fetchStrapiSafe<StrapiPost[]>(
    '/blog-posts?fields[0]=slug',
    [],
    { revalidate: 3600 }
  )
  return (data || []).map((post) => post.slug).filter(Boolean)
}

// Fallback blog posts (static) used when Strapi is not yet configured
export const FALLBACK_POSTS: StrapiPost[] = [
  {
    id: 1,
    documentId: '1',
    title: 'The Agentic Commerce Protocols: UCP, ACP, and AP2',
    slug: 'agentic-commerce-protocols-ucp-acp-ap2',
    excerpt:
      'Three new protocols — UCP, ACP, and AP2 — define how AI agents discover merchants, execute checkouts, and authorize payments. Here\'s everything you need to know about the infrastructure powering agentic commerce.',
    content: '',
    published_at: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
    read_time: 12,
    featured: true,
    tags: ['UCP', 'ACP', 'AP2', 'agentic commerce'],
    word_count: 2500,
  },
  {
    id: 2,
    documentId: '2',
    title: 'Why Legacy Platforms Fail in the Agentic Era',
    slug: 'why-legacy-platforms-fail-agentic-era',
    excerpt:
      'Traditional e-commerce platforms were built for human shoppers clicking through websites. When AI agents become the primary buyers, these platforms have no way to respond. Here\'s why legacy infrastructure fails.',
    content: '',
    published_at: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
    read_time: 10,
    featured: false,
    tags: ['legacy platforms', 'agentic commerce', 'digital transformation'],
    word_count: 2200,
  },
  {
    id: 3,
    documentId: '3',
    title: 'Token Efficiency: Make Your Pages Cheap to Parse',
    slug: 'token-efficiency-make-pages-cheap-to-parse',
    excerpt:
      'Every token your page wastes on navigation boilerplate, repeated scripts, and bloated HTML costs AI agents money. Token efficiency is the new page speed — here\'s how to optimize for it.',
    content: '',
    published_at: '2025-01-05T00:00:00Z',
    updatedAt: '2025-01-05T00:00:00Z',
    read_time: 8,
    featured: false,
    tags: ['token efficiency', 'AEO', 'AI agents'],
    word_count: 2000,
  },
  {
    id: 4,
    documentId: '4',
    title: 'The Hydration Tax: Why Client-Side Rendering Kills Agent Discovery',
    slug: 'hydration-tax-client-side-rendering',
    excerpt:
      'React SPAs have a dirty secret: AI agents and search crawlers often see a blank page. The hydration tax — the performance penalty of client-side rendering — is killing your discoverability in the agentic era.',
    content: '',
    published_at: '2024-12-28T00:00:00Z',
    updatedAt: '2024-12-28T00:00:00Z',
    read_time: 9,
    featured: false,
    tags: ['hydration tax', 'CSR', 'SSR', 'agent discovery'],
    word_count: 2200,
  },
  {
    id: 5,
    documentId: '5',
    title: "Gartner's 50% Traffic Decline Prediction: What It Means for Your Business",
    slug: 'gartner-50-percent-traffic-decline',
    excerpt:
      "Gartner predicts that by 2028, AI will reduce traditional search engine traffic by 50%. But this isn't just about losing Google clicks — it's about a fundamental shift in how customers find and buy from you.",
    content: '',
    published_at: '2024-12-20T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
    read_time: 8,
    featured: false,
    tags: ['Gartner', 'traffic decline', 'AEO', 'GEO'],
    word_count: 2000,
  },
  {
    id: 6,
    documentId: '6',
    title: 'The Authority Flywheel: How to Build Agent Citation Dominance',
    slug: 'authority-flywheel-agent-citation-dominance',
    excerpt:
      'The Authority Flywheel is a 4-step compounding cycle that positions your brand as the definitive source AI agents cite. Once set in motion, it accelerates your authority with every published piece of content.',
    content: '',
    published_at: '2025-01-20T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
    read_time: 11,
    featured: true,
    tags: ['authority flywheel', 'agent citation', 'AEO', 'content strategy'],
    word_count: 2400,
  },
  {
    id: 7,
    documentId: '7',
    title: 'AP2 Mandates: Cryptographic Trust for Agentic Transactions',
    slug: 'ap2-mandates-cryptographic-trust',
    excerpt:
      'AP2 introduces cryptographic mandates — signed, verifiable authorizations that give AI agents the authority to transact on your behalf. Here\'s how Intent and Cart mandates work, and why they matter.',
    content: '',
    published_at: '2025-01-25T00:00:00Z',
    updatedAt: '2025-01-25T00:00:00Z',
    read_time: 10,
    featured: false,
    tags: ['AP2', 'mandates', 'cryptographic trust', 'agentic transactions'],
    word_count: 2100,
  },
  {
    id: 8,
    documentId: '8',
    title: 'UCP vs. ACP: Choosing the Right Protocol Stack',
    slug: 'ucp-vs-acp-protocol-comparison',
    excerpt:
      'UCP and ACP serve different purposes in the agentic commerce stack. Understanding when to use each — and how they work together with AP2 — is essential for any enterprise building agentic readiness.',
    content: '',
    published_at: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z',
    read_time: 9,
    featured: false,
    tags: ['UCP', 'ACP', 'protocol comparison', 'agentic commerce'],
    word_count: 2200,
  },
  {
    id: 9,
    documentId: '9',
    title: '16 Weeks to Agentic Readiness: The Implementation Roadmap',
    slug: '16-weeks-agentic-readiness-roadmap',
    excerpt:
      'A complete 16-week roadmap for implementing the full UCP/ACP/AP2 protocol stack, structured data strategy, and authority flywheel. This is the exact methodology Adam Silva Consulting uses with enterprise clients.',
    content: '',
    published_at: '2025-02-08T00:00:00Z',
    updatedAt: '2025-02-08T00:00:00Z',
    read_time: 14,
    featured: true,
    tags: ['roadmap', '16 weeks', 'implementation', 'agentic readiness'],
    word_count: 2800,
  },
  {
    id: 10,
    documentId: '10',
    title: "AEO vs. GEO: What's the Difference and Why It Matters",
    slug: 'aeo-vs-geo-difference',
    excerpt:
      'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are often confused — but they target different AI systems with different strategies. Here\'s the definitive breakdown.',
    content: '',
    published_at: '2025-02-15T00:00:00Z',
    updatedAt: '2025-02-15T00:00:00Z',
    read_time: 8,
    featured: false,
    tags: ['AEO', 'GEO', 'answer engine optimization', 'generative engine optimization'],
    word_count: 2000,
  },
  // --- Old site articles (previously indexed by Google) ---
  {
    id: 11,
    documentId: '11',
    title: 'Marketing Pain Points 2025: From Resource Crunch to AI Solution',
    slug: 'marketing-pain-points-2025-resource-crunch-to-ai-solution',
    excerpt:
      'Marketing teams in 2025 face a perfect storm: shrinking budgets, exploding channel complexity, and AI-native competitors moving faster than legacy tools allow. Here\'s how AI automation resolves each pain point.',
    content: '',
    published_at: '2024-11-15T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z',
    read_time: 9,
    featured: false,
    tags: ['marketing automation', 'AI solutions', 'resource efficiency', '2025'],
    word_count: 2100,
  },
  {
    id: 12,
    documentId: '12',
    title: 'AI Content Operations: Scaling Quality with Automation',
    slug: 'ai-content-operations-scaling-quality-with-automation',
    excerpt:
      'Publishing at scale without sacrificing quality is the holy grail for content teams. AI content operations frameworks let you produce authoritative, well-structured articles faster than any human-only workflow.',
    content: '',
    published_at: '2024-11-22T00:00:00Z',
    updatedAt: '2024-11-22T00:00:00Z',
    read_time: 10,
    featured: false,
    tags: ['AI content', 'content operations', 'scaling', 'automation'],
    word_count: 2200,
  },
  {
    id: 13,
    documentId: '13',
    title: 'The Integrated Service Ecosystem: Strategic Flywheel Analysis',
    slug: 'the-integrated-service-ecosystem-strategic-flywheel-analysis',
    excerpt:
      'When AI agents, lead generation, advertising, and agentic commerce protocols work together, each channel amplifies the others. This is the compounding logic behind Adam Silva Consulting\'s integrated service flywheel.',
    content: '',
    published_at: '2024-12-05T00:00:00Z',
    updatedAt: '2024-12-05T00:00:00Z',
    read_time: 11,
    featured: false,
    tags: ['service ecosystem', 'flywheel', 'integrated strategy', 'AI agency'],
    word_count: 2300,
  },
  {
    id: 14,
    documentId: '14',
    title: 'Zero-Click Searches: The New Reality of Information Discovery',
    slug: 'zero-click-searches-the-new-reality-of-information-discovery',
    excerpt:
      'Over 60% of Google searches now end without a click. AI-generated answers, featured snippets, and knowledge panels satisfy users before they ever visit a website. Winning in zero-click means winning in AEO.',
    content: '',
    published_at: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z',
    read_time: 8,
    featured: false,
    tags: ['zero-click search', 'AEO', 'featured snippets', 'AI search'],
    word_count: 2000,
  },
  {
    id: 15,
    documentId: '15',
    title: 'Building Topical Authority: The Complete Framework',
    slug: 'building-topical-authority',
    excerpt:
      'Topical authority is how AI systems decide which sources to cite. Building it requires a deliberate hub-and-spoke content architecture, consistent E-E-A-T signals, and schema markup that tells AI what you\'re the expert on.',
    content: '',
    published_at: '2024-12-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
    read_time: 12,
    featured: false,
    tags: ['topical authority', 'content strategy', 'E-E-A-T', 'AEO'],
    word_count: 2400,
  },
  {
    id: 16,
    documentId: '16',
    title: 'E-E-A-T in the Age of Generative AI: Building Unshakeable Authority',
    slug: 'e-e-a-t-in-the-age-of-generative-ai-building-unshakeable-authority',
    excerpt:
      'Google\'s E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) has become the primary signal AI systems use to rank and cite sources. Here\'s how to build E-E-A-T that survives every AI update.',
    content: '',
    published_at: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
    read_time: 11,
    featured: false,
    tags: ['E-E-A-T', 'generative AI', 'authority', 'Google'],
    word_count: 2300,
  },
]
