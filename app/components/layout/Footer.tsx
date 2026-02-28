import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Linkedin, Twitter, Rss, Zap } from 'lucide-react'

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
    { label: 'Insights', href: '/insights' },
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
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>

      {/* Newsletter CTA */}
      <div style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="badge mb-3">
                <Zap size={10} />
                Agentic Commerce Weekly
              </div>
              <h2
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                Stay ahead of the protocol curve
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                UCP, ACP, and AP2 updates, implementation guides, and AI commerce intelligence — every week.
              </p>
            </div>
            <form
              className="flex gap-2 w-full lg:w-auto"
              action="/api/newsletter"
              method="POST"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 lg:w-64 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(14,165,233,0.4)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button type="submit" className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap">
                Subscribe
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Adam Silva Consulting — Home">
              <Image
                src="/images/logo-clear.png"
                alt="Adam Silva Consulting"
                width={140}
                height={36}
                className="h-8 w-auto mb-5"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-muted-2)' }}>
              Global Infrastructure for Agentic Commerce — the definitive authority for UCP, ACP, and AP2 protocol implementation.
            </p>
            <div className="flex items-center gap-1">
              {[
                { href: 'https://www.linkedin.com/company/adam-silva-consulting', label: 'LinkedIn', icon: Linkedin },
                { href: 'https://twitter.com/adamsilvacons', label: 'Twitter', icon: Twitter },
                { href: '/feed.xml', label: 'RSS Feed', icon: Rss },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2 rounded-lg transition-all duration-150"
                  style={{ color: 'var(--color-muted-2)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(14,165,233,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted-2)'
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-2)' }}
              >
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150 hover:text-[var(--color-accent)]"
                      style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}
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
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-sans)' }}>
            © {new Date().getFullYear()} Adam Silva Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ fontFamily: 'var(--font-sans)' }}>
            {[
              { label: 'Glossary', href: '/glossary' },
              { label: 'Sitemap', href: '/sitemap' },
              { label: 'UCP Manifest', href: '/.well-known/ucp/manifest.json', title: 'AI Agent Discovery' },
            ].map(({ label, href, title }) => (
              <a
                key={label}
                href={href}
                title={title}
                className="transition-colors hover:text-[var(--color-accent)]"
                style={{ color: 'var(--color-muted-2)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
