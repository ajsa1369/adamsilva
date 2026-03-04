import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getRelatedLinks } from '@/lib/data/content-clusters'

const TYPE_LABELS: Record<string, string> = {
  protocol: 'Protocol',
  service: 'Service',
  insight: 'Article',
  tool: 'Tool',
  glossary: 'Glossary',
  'case-study': 'Case Study',
  research: 'Research',
  hub: 'Hub',
}

const TYPE_COLORS: Record<string, string> = {
  protocol: '#3b82f6',
  service: '#8b5cf6',
  insight: '#f59e0b',
  tool: '#10b981',
  glossary: '#6366f1',
  'case-study': '#ec4899',
  research: '#14b8a6',
  hub: '#3b82f6',
}

export function RelatedContent({ currentPath, limit = 5 }: { currentPath: string; limit?: number }) {
  const links = getRelatedLinks(currentPath, limit)
  if (links.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-[var(--color-border)]" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-2xl font-bold text-[var(--color-text)] mb-6"
      >
        Related Resources
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="group flex items-start gap-3 p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span
                className="inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1.5"
                style={{
                  color: TYPE_COLORS[link.type] || '#6b7280',
                  backgroundColor: `${TYPE_COLORS[link.type] || '#6b7280'}15`,
                }}
              >
                {TYPE_LABELS[link.type] || link.type}
              </span>
              <div className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                {link.label}
              </div>
            </div>
            <ArrowRight
              size={14}
              className="mt-1 shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
