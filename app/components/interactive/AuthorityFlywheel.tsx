'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Network, Search, Zap, Megaphone, Users, Bot, ArrowRight, X } from 'lucide-react'
import { JsonLd } from '../seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const PILLARS = [
  {
    id: 'protocols',
    label: 'AI Protocols',
    sublabel: 'UCP \u00b7 ACP \u00b7 AP2',
    icon: Network,
    color: '#0ea5e9',
    rgb: '14,165,233',
    px: 50, py: 14,
    services: ['UCP Protocol Implementation', 'ACP Checkout Integration', 'AP2 Trust Layer'],
    description: 'Make your business discoverable and transactable by every AI shopping agent. The foundation layer that lets AI agents find you, negotiate, and buy from you.',
    href: '/protocols',
    connects: ['aeo', 'agents', 'content'],
  },
  {
    id: 'aeo',
    label: 'AEO / GEO',
    sublabel: 'AI Search Visibility',
    icon: Search,
    color: '#8b5cf6',
    rgb: '139,92,246',
    px: 81, py: 32,
    services: ['AI Readiness Check ($100)', 'AEO Audit ($500)', 'GEO Implementation ($2,500)', 'Authority Building ($5,000)'],
    description: 'Appear in every AI answer \u2014 ChatGPT, Perplexity, Gemini, and Claude. AEO and GEO optimization that makes AI cite your brand as the authoritative source.',
    href: '/services/aeo-audit',
    connects: ['protocols', 'content', 'leads'],
  },
  {
    id: 'content',
    label: 'Content & Authority',
    sublabel: 'Blog \u00b7 Press \u00b7 Research',
    icon: Zap,
    color: '#f59e0b',
    rgb: '245,158,11',
    px: 81, py: 68,
    services: ['AEO/GEO Blog Creator Engine', 'Strategic Press Syndicator', 'Authority Building Program'],
    description: '2,000+ word authority articles, press syndication, and original research that compound AI citation authority over time.',
    href: '/services/agent-ready-blog-creator',
    connects: ['aeo', 'advertising'],
  },
  {
    id: 'advertising',
    label: 'Advertising',
    sublabel: 'Paid \u00b7 Social \u00b7 Retargeting',
    icon: Megaphone,
    color: '#ec4899',
    rgb: '236,72,153',
    px: 50, py: 86,
    services: ['Paid Media Management', 'Social Advertising', 'Retargeting Campaigns'],
    description: 'Amplify authority content and drive qualified leads into your pipeline at scale. Paid media engineered to work with your AI infrastructure.',
    href: '/contact',
    connects: ['content', 'leads', 'agents'],
  },
  {
    id: 'leads',
    label: 'Lead Generation',
    sublabel: 'Scraping \u00b7 Enrichment',
    icon: Users,
    color: '#10b981',
    rgb: '16,185,129',
    px: 19, py: 68,
    services: ['Lead Scraping / Hunter ($5,000)', 'Lead Enrichment Pipeline ($2,000)'],
    description: 'Continuous supply of verified, enriched ICP targets. No more buying stale lists \u2014 fresh targets on demand from any public source.',
    href: '/services/lead-scraping',
    connects: ['advertising', 'agents'],
  },
  {
    id: 'agents',
    label: 'AI Agents',
    sublabel: 'Voice \u00b7 Quoting \u00b7 Booking',
    icon: Bot,
    color: '#ef4444',
    rgb: '239,68,68',
    px: 19, py: 32,
    services: ['Off-Hours Voice Agent ($2,500)', 'Quoting Agent ($3,500)', 'Auto-Appointment Setter ($5,000)', '24/7 Sales & CS Agent'],
    description: 'Custom AI agents that answer every call, qualify leads, deliver quotes, and book appointments \u2014 24/7, zero missed revenue.',
    href: '/services/off-hours-voice-agent',
    connects: ['leads', 'protocols'],
  },
] as const

type PillarId = typeof PILLARS[number]['id']

function buildConnections(): [number, number][] {
  const seen = new Set<string>()
  const result: [number, number][] = []
  PILLARS.forEach((p, i) => {
    p.connects.forEach((targetId) => {
      const j = PILLARS.findIndex((x) => x.id === targetId)
      if (j !== -1) {
        const key = [Math.min(i, j), Math.max(i, j)].join('-')
        if (!seen.has(key)) {
          seen.add(key)
          result.push([i, j])
        }
      }
    })
  })
  return result
}

const CONNECTIONS = buildConnections()

const ecosystemSchema = {
  '@type': 'HowTo',
  name: 'The ASC Full-Stack Agency: How Every Service Compounds Into Revenue',
  description:
    "Adam Silva Consulting's 6 interconnected service pillars form a compounding revenue engine where each pillar feeds the others.",
  step: PILLARS.map((p, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: p.label,
    text: p.description,
    url: `${SITE_URL}${p.href}`,
  })),
  performer: { '@id': ORG_ID },
}

export function AuthorityFlywheel() {
  const [activeId, setActiveId] = useState<PillarId | null>(null)
  const activePillar = activeId ? PILLARS.find((p) => p.id === activeId) : null
  const ActiveIcon = activePillar?.icon

  function isConnectedToActive(pillarId: string): boolean {
    if (!activeId) return false
    return CONNECTIONS.some(
      ([i, j]) =>
        (PILLARS[i].id === activeId && PILLARS[j].id === pillarId) ||
        (PILLARS[j].id === activeId && PILLARS[i].id === pillarId)
    )
  }

  function isConnectionHighlighted(i: number, j: number): boolean {
    if (!activeId) return false
    return PILLARS[i].id === activeId || PILLARS[j].id === activeId
  }

  const connectedPillars = activeId
    ? CONNECTIONS.filter(
        ([i, j]) => PILLARS[i].id === activeId || PILLARS[j].id === activeId
      ).map(([i, j]) => (PILLARS[i].id === activeId ? PILLARS[j] : PILLARS[i]))
    : []

  return (
    <div>
      <JsonLd data={ecosystemSchema} />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Hexagon Network */}
        <div
          className="relative w-full max-w-[420px] mx-auto select-none"
          style={{ aspectRatio: '1' }}
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
            style={{ zIndex: 1 }}
          >
            <defs>
              {PILLARS.map((p) => (
                <filter key={p.id} id={`glow-${p.id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {CONNECTIONS.map(([i, j]) => {
              const from = PILLARS[i]
              const to = PILLARS[j]
              const highlighted = isConnectionHighlighted(i, j)
              return (
                <line
                  key={`${i}-${j}`}
                  x1={from.px} y1={from.py}
                  x2={to.px} y2={to.py}
                  stroke={highlighted ? from.color : 'rgba(255,255,255,0.07)'}
                  strokeWidth={highlighted ? 0.7 : 0.25}
                  strokeDasharray={highlighted ? undefined : '1.5 2.5'}
                  filter={highlighted ? `url(#glow-${from.id})` : undefined}
                  style={{ transition: 'all 0.3s ease' }}
                />
              )
            })}

            <circle cx="50" cy="50" r="11" fill="rgba(14,165,233,0.04)" stroke="rgba(14,165,233,0.12)" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="7" fill="rgba(14,165,233,0.07)" stroke="rgba(14,165,233,0.22)" strokeWidth="0.3" />
          </svg>

          <div
            className="absolute z-20 text-center pointer-events-none"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="text-[7px] font-bold uppercase tracking-widest leading-tight"
              style={{ fontFamily: 'var(--font-mono)', color: 'rgba(14,165,233,0.45)' }}>
              Full-Stack
            </div>
            <div className="text-[8px] font-black uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
              AI Agency
            </div>
          </div>

          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            const isActive = activeId === pillar.id
            const connected = isConnectedToActive(pillar.id)
            const dimmed = !!(activeId && !isActive && !connected)
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveId(isActive ? null : (pillar.id as PillarId))}
                aria-label={pillar.label}
                style={{
                  left: `${pillar.px}%`,
                  top: `${pillar.py}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '19%',
                  height: '19%',
                  borderColor: isActive ? pillar.color : connected ? `rgba(${pillar.rgb}, 0.45)` : 'rgba(255,255,255,0.08)',
                  background: isActive ? `rgba(${pillar.rgb}, 0.18)` : connected ? `rgba(${pillar.rgb}, 0.07)` : 'rgba(6,13,31,0.85)',
                  boxShadow: isActive ? `0 0 24px rgba(${pillar.rgb}, 0.4), inset 0 0 0 1px rgba(${pillar.rgb}, 0.25)` : 'none',
                  opacity: dimmed ? 0.2 : 1,
                  zIndex: 10,
                  transition: 'all 0.25s ease',
                }}
                className="absolute flex flex-col items-center justify-center gap-0.5 rounded-2xl border cursor-pointer hover:scale-110 active:scale-95"
              >
                <Icon size={15}
                  style={{ color: isActive || connected ? pillar.color : 'rgba(255,255,255,0.38)', transition: 'color 0.2s' }} />
                <span className="text-[6.5px] font-bold uppercase tracking-wide leading-tight text-center px-0.5 hidden sm:block"
                  style={{
                    color: isActive ? pillar.color : connected ? `rgba(${pillar.rgb}, 0.8)` : 'rgba(255,255,255,0.28)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'color 0.2s',
                  }}>
                  {pillar.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Detail Panel */}
        <div>
          {!activePillar ? (
            <div>
              <span className="badge mb-4 inline-block">The Full-Stack Ecosystem</span>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                Every Service Compounds
              </h3>
              <p className="text-sm leading-relaxed mb-6 speakable-answer" style={{ color: 'var(--color-muted)' }}>
                ASC is a full-stack AI agency \u2014 not just protocols. Our 6 pillars are deliberately
                interconnected: leads feed agents, agents feed protocols, protocols feed visibility,
                visibility drives content, content powers advertising, advertising fills the pipeline.{' '}
                <strong style={{ color: 'var(--color-text)' }}>Click any node to explore.</strong>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PILLARS.map((p) => {
                  const Icon = p.icon
                  return (
                    <button key={p.id} onClick={() => setActiveId(p.id as PillarId)}
                      className="flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02]"
                      style={{ borderColor: `rgba(${p.rgb}, 0.14)`, background: `rgba(${p.rgb}, 0.04)` }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `rgba(${p.rgb}, 0.12)` }}>
                        <Icon size={13} style={{ color: p.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{p.label}</div>
                        <div className="text-[10px]"
                          style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}>{p.sublabel}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => setActiveId(null)}
                className="flex items-center gap-1.5 text-xs mb-5 opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-muted-2)' }}>
                <X size={12} /> Back to overview
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{
                  background: `rgba(${activePillar.rgb}, 0.1)`,
                  color: activePillar.color,
                  border: `1px solid rgba(${activePillar.rgb}, 0.2)`,
                  fontFamily: 'var(--font-mono)',
                }}>
                {ActiveIcon && <ActiveIcon size={11} />}
                {activePillar.sublabel}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                {activePillar.label}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
                {activePillar.description}
              </p>

              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}>
                  Services in this pillar
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePillar.services.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        background: `rgba(${activePillar.rgb}, 0.08)`,
                        color: activePillar.color,
                        border: `1px solid rgba(${activePillar.rgb}, 0.15)`,
                        fontFamily: 'var(--font-mono)',
                      }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {connectedPillars.length > 0 && (
                <div className="mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}>
                    Connects to
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {connectedPillars.map((conn) => {
                      const ConnIcon = conn.icon
                      return (
                        <button key={conn.id} onClick={() => setActiveId(conn.id as PillarId)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:scale-105"
                          style={{ borderColor: `rgba(${conn.rgb}, 0.2)`, background: `rgba(${conn.rgb}, 0.06)`, color: conn.color }}>
                          <ConnIcon size={11} />{conn.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <Link href={activePillar.href}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                style={{ color: activePillar.color }}>
                Explore {activePillar.label} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
