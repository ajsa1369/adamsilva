import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Calendar, ArrowLeft, User } from 'lucide-react'
import { JsonLd } from '../../components/seo/JsonLd'
import { getInsightBySlug, getInsightSlugs, FALLBACK_POSTS } from '@/lib/strapi/queries'
import { buildBlogPostSchema } from '@/lib/schemas/blog'
import { SITE_URL } from '@/lib/schemas/organization'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  let slugs: string[]
  try {
    slugs = await getInsightSlugs()
  } catch {
    slugs = []
  }
  // Always include fallback slugs
  const fallbackSlugs = FALLBACK_POSTS.map(p => p.slug)
  const seen = new Set<string>()
  const allSlugs = [...slugs, ...fallbackSlugs].filter(s => {
    if (seen.has(s)) return false
    seen.add(s)
    return true
  })
  return allSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post = FALLBACK_POSTS.find(p => p.slug === slug)
  try {
    const strapiPost = await getInsightBySlug(slug)
    if (strapiPost) post = strapiPost
  } catch {}

  if (!post) return { title: 'Article Not Found' }

  const seoTitle = post.seo_title || post.title
  const seoDesc = post.seo_description || post.excerpt

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: `${SITE_URL}/insights/${slug}` },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDesc,
      url: `${SITE_URL}/insights/${slug}`,
      publishedTime: post.published_at,
      modifiedTime: post.updatedAt,
      images: post.cover_image
        ? [{ url: post.cover_image.url, width: 1200, height: 630, alt: post.title }]
        : [],
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params

  let post = FALLBACK_POSTS.find(p => p.slug === slug)
  try {
    const strapiPost = await getInsightBySlug(slug)
    if (strapiPost) post = strapiPost
  } catch {}

  if (!post) notFound()

  const coverSrc = post.cover_image?.url || `/images/insights/${slug}-cover.jpg`

  const schemas = buildBlogPostSchema({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: coverSrc,
    publishedAt: post.published_at,
    updatedAt: post.updatedAt,
    readTime: post.read_time,
    keywords: post.tags,
    faqs: post.json_ld_faq,
    videoUrl: post.video_url,
    videoDuration: post.video_duration,
    wordCount: post.word_count,
  })

  const hasFallbackContent = !post.content || post.content.trim() === ''

  return (
    <>
      <JsonLd data={schemas} />

      {/* Breadcrumb */}
      <nav className="border-b border-[var(--color-border)]" aria-label="Breadcrumb">
        <div className="container py-3">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted-2)]">
            <li><Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/insights" className="hover:text-[var(--color-accent)] transition-colors">Insights</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-text)] truncate max-w-xs">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <article className="section">
        <div className="container max-w-3xl">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-2)] mb-8 pb-8 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>Adam Silva</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.read_time || 8} min read</span>
            </div>
            {post.word_count && (
              <span>{post.word_count.toLocaleString()} words</span>
            )}
          </div>

          {/* Answer-First excerpt */}
          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-8 p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] speakable-answer article-excerpt">
            {post.excerpt}
          </p>

          {/* Cover image */}
          {coverSrc && (
            <figure className="mb-8">
              <img
                src={coverSrc}
                alt={`${post.title} — cover image`}
                className="w-full rounded-xl object-cover"
                width={800}
                height={450}
                loading="eager"
              />
            </figure>
          )}

          {/* Video player (if available) */}
          {post.video_url && (
            <div className="mb-8 aspect-video bg-[var(--color-surface-2)] rounded-xl overflow-hidden">
              <video
                src={post.video_url}
                controls
                className="w-full h-full"
                poster={coverSrc}
                aria-label={`Video summary: ${post.title}`}
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose-asc">
            {hasFallbackContent ? (
              <div className="text-[var(--color-muted)] leading-relaxed space-y-6">
                <p>
                  This article is part of Adam Silva Consulting&apos;s comprehensive series on agentic commerce protocols and implementation strategy. The full 2,000+ word version is available after subscribing to our Insights newsletter.
                </p>
                <p>
                  <strong>Key topics covered in this article:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  {post.tags?.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <p>
                  Subscribe below to get immediate access to all articles, including this one, plus weekly agentic commerce intelligence delivered to your inbox.
                </p>
              </div>
            ) : (
              // Render Strapi markdown/HTML content
              <div
                className="prose-asc"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>

          {/* FAQ Section (from Strapi json_ld_faq) */}
          {post.json_ld_faq && post.json_ld_faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.json_ld_faq.map((faq, i) => (
                  <details key={i} className="card p-5 group" open={i === 0}>
                    <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                      <span>{faq.question}</span>
                      <span className="text-[var(--color-muted-2)] group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-12 p-8 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] text-center">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Get Weekly Agentic Commerce Intelligence
            </h3>
            <p className="text-sm text-[var(--color-muted)] mb-6">
              2,000+ word articles on UCP, ACP, AP2, AEO, and GEO — every week.
            </p>
            <form className="flex gap-2 max-w-sm mx-auto" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-2.5 bg-[var(--color-base)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button type="submit" className="btn-primary text-sm py-2.5 px-4">Subscribe</button>
            </form>
          </div>

          {/* Back + Read more */}
          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
            <Link href="/insights" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
              <ArrowLeft size={14} />
              All Insights
            </Link>
            <Link href="/contact" className="btn-primary text-sm py-2 px-4">
              Work with Adam
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
