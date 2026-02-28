import Link from 'next/link'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import { getFeaturedInsights } from '@/lib/strapi/queries'
import type { StrapiPost } from '@/lib/strapi/queries'
import { FALLBACK_POSTS } from '@/lib/strapi/queries'

function PostCard({ post }: { post: StrapiPost }) {
  const coverSrc = post.cover_image?.url || `/images/insights/${post.slug}-cover.jpg`
  return (
    <Link href={`/insights/${post.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="aspect-video bg-[var(--color-surface-2)] overflow-hidden">
        <img
          src={coverSrc}
          alt={`${post.title} — Adam Silva Consulting`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={600}
          height={338}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {post.category && (
          <span className="badge mb-3 text-xs">{post.category.name}</span>
        )}
        <h3 className="font-bold text-[var(--color-text)] leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-[var(--color-muted-2)]">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{post.read_time || 8} min read</span>
          </div>
          <div className="flex items-center gap-1 text-[var(--color-accent)] font-semibold">
            Read more
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
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
    <section className="section bg-[var(--color-surface)]" aria-labelledby="insights-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge mb-3">Insights</span>
            <h2 id="insights-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
              Latest Agentic Commerce Insights
            </h2>
            <p className="text-[var(--color-muted)] mt-2 max-w-lg">
              2,000+ word articles on UCP, ACP, AP2, AEO, and GEO — with video summaries and full schema bundles.
            </p>
          </div>
          <Link href="/insights" className="btn-secondary text-sm shrink-0">
            All 10 Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/insights" className="btn-primary">
            <BookOpen size={16} />
            Browse All Insights
          </Link>
          <a
            href="/feed.xml"
            className="btn-secondary text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSS Feed
          </a>
        </div>
      </div>
    </section>
  )
}
