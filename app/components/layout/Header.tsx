'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    children: [
      { label: 'AI Readiness Check', href: '/services/ai-readiness-check', tag: '$100' },
      { label: 'AEO Audit', href: '/services/aeo-audit', tag: '$500' },
      { label: 'GEO Implementation', href: '/services/geo-implementation', tag: '$2,500' },
      { label: 'Authority Building', href: '/services/authority-building', tag: '$5,000' },
      { label: 'Blog Creator Engine', href: '/services/agent-ready-blog-creator', tag: 'Custom' },
      { label: 'UCP Implementation', href: '/services/ucp-implementation', tag: 'Custom' },
      { label: 'ACP Integration', href: '/services/acp-integration', tag: 'Custom' },
      { label: 'AP2 Trust Layer', href: '/services/ap2-trust-layer', tag: 'Custom' },
    ],
  },
  {
    label: 'Protocols',
    href: '/protocols',
    hasDropdown: true,
    children: [
      { label: 'Protocol Overview', href: '/protocols', tag: null },
      { label: 'UCP — Universal Commerce', href: '/protocols/ucp', tag: 'Google' },
      { label: 'ACP — Agentic Checkout', href: '/protocols/acp', tag: 'OpenAI' },
      { label: 'AP2 — Agent Payments', href: '/protocols/ap2', tag: 'Google' },
    ],
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
        scrolled ? 'nav-glass' : 'bg-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between h-16" aria-label="Main navigation">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Adam Silva Consulting — Home">
          <Image
            src="/images/logo-clear.png"
            alt="Adam Silva Consulting"
            width={160}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="relative">
              {item.hasDropdown ? (
                <div
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive(item.href)
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 opacity-60 ${
                        openDropdown === item.href ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openDropdown === item.href && item.children && (
                    <div className="absolute top-full left-0 mt-2 w-60 rounded-xl overflow-hidden z-50"
                      style={{
                        background: 'rgba(6, 13, 31, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(14,165,233,0.1)',
                      }}
                    >
                      <div className="p-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                              pathname === child.href
                                ? 'text-[var(--color-accent)] bg-[rgba(14,165,233,0.08)]'
                                : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.04)]'
                            }`}
                          >
                            <span>{child.label}</span>
                            {child.tag && (
                              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
                                style={{
                                  background: 'rgba(14,165,233,0.1)',
                                  color: 'rgba(14,165,233,0.8)',
                                  border: '1px solid rgba(14,165,233,0.15)',
                                }}
                              >
                                {child.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive(item.href)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA + Theme */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-primary text-sm py-2 px-4"
          >
            <Zap size={13} className="opacity-80" />
            Get Started
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-muted)' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            background: 'rgba(6, 13, 31, 0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="container py-4 flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-muted)]'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-0.5 flex flex-col gap-0.5 pb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-colors"
                        style={{ color: 'var(--color-muted-2)' }}
                      >
                        <span>{child.label}</span>
                        {child.tag && (
                          <span className="text-[10px] font-mono opacity-60">{child.tag}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                <Zap size={13} />
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
