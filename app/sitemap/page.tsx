import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL } from '@/lib/schemas/organization'
import { SERVICES } from '@/lib/data/services'
import { FALLBACK_POSTS } from '@/lib/strapi/queries'

export const metadata: Metadata = {
  title: 'Sitemap | Adam Silva Consulting',
  description:
    'Full HTML sitemap for Adam Silva Consulting — all pages, services, protocol guides, insights, tools, and machine-readable endpoints.',
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Sitemap', url: '/sitemap' },
])

const corePages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Protocols', href: '/protocols' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const protocolPages = [
  { label: 'UCP — Universal Commerce Protocol', href: '/protocols/ucp' },
  { label: 'ACP — Agentic Commerce Protocol', href: '/protocols/acp' },
  { label: 'AP2 — Agent Payments Protocol', href: '/protocols/ap2' },
]

const resourcePages = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources & Guides', href: '/resources' },
  { label: 'Glossary', href: '/glossary' },
]

const toolPages = [
  { label: 'Token Efficiency Calculator', href: '/tools/token-calculator' },
  { label: 'Protocol Compliance Checker', href: '/tools/protocol-checker' },
  { label: 'AEO Score Analyzer', href: '/tools/aeo-score' },
]

const machineReadableEndpoints = [
  { label: 'UCP Manifest', href: '/.well-known/ucp/manifest.json', external: false },
  { label: 'ACP Config', href: '/.well-known/acp/config.json', external: false },
  { label: 'AP2 Mandates', href: '/.well-known/ap2/mandates.json', external: false },
  { label: 'RSS Feed', href: '/feed.xml', external: false },
  { label: 'UCP API Endpoint', href: '/api/ucp', external: false },
]

interface SitemapSectionProps {
  title: string
  description?: string
  links: Array<{ label: string; href: string; meta?: string; external?: boolean }>
}

function SitemapSection({ title, description, links }: SitemapSectionProps) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-[var(--color-text)] mb-1">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--color-muted-2)] mb-4">{description}</p>
      )}
      <ul className="space-y-2 mt-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline group"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
                {link.label}
                <ExternalLink
                  size={11}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                />
                {link.meta && (
                  <span className="ml-auto text-xs text-[var(--color-muted-2)]">
                    {link.meta}
                  </span>
                )}
              </a>
            ) : (
              <Link
                href={link.href}
                className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
                {link.label}
                {link.meta && (
                  <span className="ml-auto text-xs text-[var(--color-muted-2)]">
                    {link.meta}
                  </span>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SitemapPage() {
  const serviceLinks = SERVICES.map((s) => ({
    label: s.name,
    href: `/services/${s.id}`,
    meta: s.priceDisplay !== 'Custom' ? s.priceDisplay : undefined,
  }))

  const insightLinks = FALLBACK_POSTS.map((post) => ({
    label: post.title,
    href: `/insights/${post.slug}`,
    meta: post.read_time ? `${post.read_time} min` : undefined,
  }))

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="sitemap-heading">
        <div className="container">
          <div className="max-w-2xl">
            <span className="badge mb-6">Site Navigation</span>
            <h1
              id="sitemap-heading"
              className="text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight"
            >
              Sitemap
            </h1>
            <p className="text-lg text-[var(--color-muted)] leading-relaxed">
              Every page, service, protocol guide, article, tool, and machine-readable
              endpoint on Adam Silva Consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="section" aria-label="Sitemap sections">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Core Pages */}
            <SitemapSection
              title="Core Pages"
              description="Primary navigation pages"
              links={corePages}
            />

            {/* Protocol Pages */}
            <SitemapSection
              title="Protocol Pages"
              description="Deep-dive guides for each agentic commerce protocol"
              links={protocolPages}
            />

            {/* Resources */}
            <SitemapSection
              title="Resources"
              description="Case studies, guides, and glossary"
              links={resourcePages}
            />

            {/* Tools */}
            <SitemapSection
              title="Free Tools"
              description="Diagnostic tools for protocol and AEO readiness"
              links={toolPages}
            />

            {/* Service Pages */}
            <div className="card p-6 md:col-span-2 xl:col-span-1">
              <h2 className="text-lg font-bold text-[var(--color-text)] mb-1">
                Service Pages
              </h2>
              <p className="text-sm text-[var(--color-muted-2)] mb-4">
                All {SERVICES.length} consulting services
              </p>
              <ul className="space-y-2 mt-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        aria-hidden="true"
                      />
                      {link.label}
                      {link.meta && (
                        <span className="ml-auto text-xs text-[var(--color-muted-2)]">
                          {link.meta}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Machine-Readable Endpoints */}
            <SitemapSection
              title="Machine-Readable Endpoints"
              description="Protocol manifests, feeds, and API endpoints for AI agents"
              links={machineReadableEndpoints}
            />
          </div>

          {/* Insights — full width */}
          <div className="mt-6">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-[var(--color-text)] mb-1">Insights</h2>
              <p className="text-sm text-[var(--color-muted-2)] mb-4">
                All {FALLBACK_POSTS.length} published articles on agentic commerce
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 mt-3">
                {insightLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline py-1"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 min-w-0 truncate">{link.label}</span>
                    {link.meta && (
                      <span className="shrink-0 text-xs text-[var(--color-muted-2)]">
                        {link.meta}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* XML Sitemap Note */}
      <section className="section-sm bg-[var(--color-surface)]">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-[var(--color-muted)]">
            Looking for the XML sitemap?{' '}
            <a
              href="/sitemap.xml"
              className="text-[var(--color-accent)] hover:underline font-medium"
            >
              /sitemap.xml
            </a>{' '}
            is available for crawlers and search engines. Machine-readable UCP discovery is
            at{' '}
            <a
              href="/.well-known/ucp/manifest.json"
              className="text-[var(--color-accent)] hover:underline font-medium"
            >
              /.well-known/ucp/manifest.json
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
