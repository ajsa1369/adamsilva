import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, Rss } from 'lucide-react'
import { JsonLd } from '../components/seo/JsonLd'
import { getInsights, FALLBACK_POSTS, type StrapiPost } from '@/lib/strapi/queries'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'
import { buildImageObjectSchema } from '@/lib/schemas/image'

export const metadata: Metadata = {
  title: 'Insights — Agentic Commerce, UCP, ACP, AP2 | Adam Silva Consulting',
  description:
    'Expert articles on agentic commerce, UCP, ACP, AP2 protocol implementation, AEO, and GEO. 2,000+ word deep dives with video summaries.',
  alternates: {
    canonical: `${SITE_URL}/insights`,
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
}

const insightsBlogSchema = {
  '@type': 'Blog',
  '@id': `${SITE_URL}/insights#blog`,
  name: 'Adam Silva Consulting Insights',
  description: 'Expert analysis on agentic commerce, UCP, ACP, AP2, AEO, and GEO — 2,000+ word articles with video summaries.',
  url: `${SITE_URL}/insights`,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
  isAccessibleForFree: true,
}

function PostCard({ post }: { post: StrapiPost }) {
  const coverSrc = post.cover_image?.url ||
    `/images/insights/${post.slug}-cover.jpg`

  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={`/insights/${post.slug}`} className="block">
        <div className="aspect-video bg-[var(--color-surface-2)] overflow-hidden">
          <img
            src={coverSrc}
            alt={`${post.title} — cover image`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={600}
            height={338}
          />
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge text-xs">{tag}</span>
            ))}
          </div>
        )}
        <Link href={`/insights/${post.slug}`}>
          <h2 className="font-bold text-lg text-[var(--color-text)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-[var(--color-muted-2)] border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.read_time || 8} min read</span>
            </div>
            {post.word_count && (
              <span>{post.word_count.toLocaleString()} words</span>
            )}
          </div>
          <Link
            href={`/insights/${post.slug}`}
            className="flex items-center gap-1 text-[var(--color-accent)] font-semibold hover:underline"
          >
            Read
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default async function InsightsPage() {
  let posts: StrapiPost[]
  try {
    posts = await getInsights()
    if (!posts || posts.length === 0) posts = FALLBACK_POSTS
  } catch {
    posts = FALLBACK_POSTS
  }

  const featured = posts.filter(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  const pageSchemas = [
    insightsBlogSchema,
    buildBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights' }]),
    {
      '@type': 'ItemList',
      name: 'Agentic Commerce Insights',
      description: 'All articles from Adam Silva Consulting on agentic commerce, UCP, ACP, AP2, AEO, and GEO.',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/insights/${post.slug}`,
        name: post.title,
      })),
    },
    buildImageObjectSchema({
      filename: 'insights/agentic-commerce-protocols-ucp-acp-ap2-cover.jpg',
      name: 'Adam Silva Consulting Insights — Agentic Commerce Blog',
      description: 'Expert articles on agentic commerce protocol implementation, AEO, GEO, and AI agent optimization.',
      width: 1200,
      height: 630,
      representativeOfPage: true,
    }),
  ]

  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="badge mb-4">Insights</span>
              <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
                Agentic Commerce Intelligence
              </h1>
              <p className="text-lg text-[var(--color-muted)] max-w-xl speakable-answer">
                2,000+ word deep dives on UCP, ACP, AP2, AEO, and GEO — with video summaries and full JSON-LD schema bundles. The definitive resource for agentic commerce knowledge.
              </p>
            </div>
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm shrink-0"
            >
              <Rss size={14} />
              RSS Feed
            </a>
          </div>
        </div>
      </section>

      {/* Featured articles */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Featured Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
            All Articles ({posts.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(rest.length > 0 ? rest : posts).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-sm border-t border-[var(--color-border)]">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
              Never Miss an Insight
            </h2>
            <p className="text-[var(--color-muted)] text-sm mb-6">
              Subscribe for weekly agentic commerce analysis — or add our RSS feed to your reader.
            </p>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-2.5 bg-[var(--color-base)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button type="submit" className="btn-primary text-sm py-2.5 px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
