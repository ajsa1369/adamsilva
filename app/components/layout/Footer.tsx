import Link from 'next/link'
import { ArrowRight, Linkedin, Twitter, Rss } from 'lucide-react'

const FOOTER_LINKS = {
  Services: [
    { label: 'AI Readiness Check', href: '/services/ai-readiness-check' },
    { label: 'AEO Audit', href: '/services/aeo-audit' },
    { label: 'GEO Implementation', href: '/services/geo-implementation' },
    { label: 'Authority Building', href: '/services/authority-building' },
    { label: 'Blog Creator Engine', href: '/services/agent-ready-blog-creator' },
    { label: 'UCP Implementation', href: '/services/ucp-implementation' },
    { label: 'ACP Integration', href: '/services/acp-integration' },
    { label: 'AP2 Trust Layer', href: '/services/ap2-trust-layer' },
  ],
  Protocols: [
    { label: 'Protocol Overview', href: '/protocols' },
    { label: 'Universal Commerce (UCP)', href: '/protocols/ucp' },
    { label: 'Agentic Commerce (ACP)', href: '/protocols/acp' },
    { label: 'Agent Payments (AP2)', href: '/protocols/ap2' },
  ],
  Resources: [
    { label: 'Insights & Blog', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Research', href: '/resources' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Free Tools', href: '/tools/token-calculator' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      {/* Newsletter CTA */}
      <div className="border-b border-[var(--color-border)]">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">
                Agentic Commerce Weekly
              </h2>
              <p className="text-[var(--color-muted)] text-sm">
                Protocol updates, implementation guides, and AI commerce insights — every week.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 px-4 py-2.5 bg-[var(--color-base)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted-2)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button type="submit" className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Adam Silva Consulting — Home">
              <img
                src="/images/logo-clear.png"
                alt="Adam Silva Consulting logo"
                width={140}
                height={36}
                className="h-8 w-auto mb-4"
              />
            </Link>
            <p className="text-[var(--color-muted-2)] text-sm leading-relaxed mb-4">
              Global Infrastructure for Agentic Commerce — the definitive authority for UCP, ACP, and AP2 protocol implementation.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/adam-silva-consulting"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-[var(--color-muted-2)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com/adamsilvacons"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="p-2 rounded-lg text-[var(--color-muted-2)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="/feed.xml"
                aria-label="RSS Feed"
                className="p-2 rounded-lg text-[var(--color-muted-2)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[var(--color-text)] font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-muted-2)] hover:text-[var(--color-accent)] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-muted-2)] text-sm">
            © {new Date().getFullYear()} Adam Silva Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/glossary" className="text-[var(--color-muted-2)] hover:text-[var(--color-accent)] transition-colors">
              Glossary
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/sitemap" className="text-[var(--color-muted-2)] hover:text-[var(--color-accent)] transition-colors">
              Sitemap
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <a
              href="/.well-known/ucp/manifest.json"
              className="text-[var(--color-muted-2)] hover:text-[var(--color-accent)] transition-colors"
              title="UCP Manifest — AI Agent Discovery"
            >
              UCP Manifest
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
