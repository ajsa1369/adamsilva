'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Services', href: '/services', hasDropdown: true,
    children: [
      { label: 'AI Readiness Check', href: '/services/ai-readiness-check' },
      { label: 'AEO Audit', href: '/services/aeo-audit' },
      { label: 'GEO Implementation', href: '/services/geo-implementation' },
      { label: 'Authority Building', href: '/services/authority-building' },
      { label: 'Blog Creator Engine', href: '/services/agent-ready-blog-creator' },
      { label: 'UCP Implementation', href: '/services/ucp-implementation' },
      { label: 'ACP Integration', href: '/services/acp-integration' },
      { label: 'AP2 Trust Layer', href: '/services/ap2-trust-layer' },
    ]
  },
  { label: 'Protocols', href: '/protocols', hasDropdown: true,
    children: [
      { label: 'Protocol Overview', href: '/protocols' },
      { label: 'UCP — Universal Commerce', href: '/protocols/ucp' },
      { label: 'ACP — Agentic Checkout', href: '/protocols/acp' },
      { label: 'AP2 — Agent Payments', href: '/protocols/ap2' },
    ]
  },
  { label: 'Insights', href: '/insights', hasDropdown: false },
  { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
  { label: 'Resources', href: '/resources', hasDropdown: false },
  { label: 'About', href: '/about', hasDropdown: false },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-base)] border-b border-[var(--color-border)] shadow-sm'
          : 'bg-[var(--color-base)]/90 backdrop-blur-md'
      }`}
    >
      <nav className="container flex items-center justify-between h-16" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Adam Silva Consulting — Home">
          <img
            src="/images/logo-clear.png"
            alt="Adam Silva Consulting logo"
            width={160}
            height={40}
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="relative">
              {item.hasDropdown ? (
                <div
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[var(--color-accent)] bg-[var(--color-surface)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === item.href && item.children && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl shadow-lg py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            pathname === child.href
                              ? 'text-[var(--color-accent)] bg-[var(--color-surface)]'
                              : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--color-accent)] bg-[var(--color-surface)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA + Theme */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-primary text-sm py-2 px-4"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-base)]">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--color-accent)] bg-[var(--color-surface)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 rounded-lg text-xs text-[var(--color-muted-2)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[var(--color-border)] mt-2">
              <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
