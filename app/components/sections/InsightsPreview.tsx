import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, BookOpen, Calendar } from 'lucide-react'
import { getFeaturedInsights } from '@/lib/strapi/queries'
import type { StrapiPost } from '@/lib/strapi/queries'
import { FALLBACK_POSTS } from '@/lib/strapi/queries'

function PostCard({ post, featured = false }: { post: StrapiPost; featured?: boolean }) {
  const coverSrc = post.cover_image?.url || `/images/insights/${post.slug}-cover.jpg`
  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="card group flex flex-col overflow-hidden"
      style={{ height: '100%' }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: featured ? '16/9' : '16/9' }}>
        <Image
          src={coverSrc}
          alt={`${post.title} — Adam Silva Consulting`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,13,31,0.4), transparent)' }}
        />
        {post.category && (
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(14,165,233,0.85)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {post.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold leading-snug mb-2.5 group-hover:text-[var(--color-accent)] transition-colors"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1 mb-4 line-clamp-3"
          style={{ color: 'var(--color-muted)' }}
        >
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between text-xs"
          style={{ color: 'var(--color-muted-2)' }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ fontFamily: 'var(--font-mono)' }}>
              <Clock size={11} />
              {post.read_time || 8} min
            </span>
            {dateStr && (
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {dateStr}
              </span>
            )}
          </div>
          <span
            className="flex items-center gap-1 font-semibold group-hover:gap-2 transition-all"
            style={{ color: 'var(--color-accent)' }}
          >
            Read
            <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export async function InsightsPreview() {
  let posts: StrapiPost[]
  try {
    posts = await getFeaturedInsights(3)
    if (!posts || posts.length === 0) {
      posts = FALLBACK_POSTS.filter(p => p.featured).slice(0, 3)
    }
  } catch {
    posts = FALLBACK_POSTS.filter(p => p.featured).slice(0, 3)
  }

  return (
    <section
      className="section"
      style={{ background: 'var(--color-surface)' }}
      aria-labelledby="insights-heading"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge mb-4">Insights</div>
            <h2
              id="insights-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}
            >
              Latest Agentic Commerce Intelligence
            </h2>
            <p className="mt-2 max-w-lg text-sm" style={{ color: 'var(--color-muted)' }}>
              2,000+ word authority articles on UCP, ACP, AP2, AEO, and GEO — full schema bundles, answer-first format.
            </p>
          </div>
          <Link href="/insights" className="btn-secondary text-sm shrink-0">
            All Insights
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} featured={i === 0} />
          ))}
        </div>

        <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/insights" className="btn-primary">
            <BookOpen size={15} />
            Browse All Insights
          </Link>
          <a
            href="/feed.xml"
            className="btn-secondary text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSS Feed
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
