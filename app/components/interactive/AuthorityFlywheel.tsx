'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Network, Search, Zap, Megaphone, Users, Bot, ArrowRight, RotateCcw } from 'lucide-react'
import { JsonLd } from '../seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

// Flywheel order: each service feeds the next, forming a revenue cycle
const PILLARS = [
  {
    num: '01',
    id: 'protocols',
    label: 'AI Protocols',
    sublabel: 'UCP · ACP · AP2',
    icon: Network,
    color: '#0ea5e9',
    rgb: '14,165,233',
    feedsInto: 'AEO / GEO visibility',
    services: ['UCP Protocol Implementation', 'ACP Checkout Integration', 'AP2 Trust Layer'],
    description: 'Make your business discoverable and transactable by every AI shopping agent. The foundation layer that lets AI agents find you, negotiate, and buy from you — without a human in the loop.',
    href: '/protocols',
    connects: ['aeo', 'agents'],
  },
  {
    num: '02',
    id: 'aeo',
    label: 'AEO / GEO',
    sublabel: 'AI Search Visibility',
    icon: Search,
    color: '#8b5cf6',
    rgb: '139,92,246',
    feedsInto: 'Content authority',
    services: ['AI Readiness Check ($100)', 'AEO Audit ($500)', 'GEO Implementation ($2,500)', 'Authority Building ($5,000)'],
    description: 'Appear in every AI answer — ChatGPT, Perplexity, Gemini, and Claude. AEO and GEO optimization that makes AI cite your brand as the authoritative source.',
    href: '/services/aeo-audit',
    connects: ['protocols', 'content', 'leads'],
  },
  {
    num: '03',
    id: 'content',
    label: 'Content & Authority',
    sublabel: 'Blog · Press · Research',
    icon: Zap,
    color: '#f59e0b',
    rgb: '245,158,11',
    feedsInto: 'Advertising fuel',
    services: ['AEO/GEO Blog Creator Engine', 'Strategic Press Syndicator', 'Authority Building Program'],
    description: '2,000+ word authority articles, press syndication, and original research that compound AI citation authority month after month.',
    href: '/services/agent-ready-blog-creator',
    connects: ['aeo', 'advertising'],
  },
  {
    num: '04',
    id: 'advertising',
    label: 'Advertising',
    sublabel: 'Paid · Social · Retargeting',
    icon: Megaphone,
    color: '#ec4899',
    rgb: '236,72,153',
    feedsInto: 'Lead pipeline',
    services: ['Paid Media Management', 'Social Advertising', 'Retargeting Campaigns'],
    description: 'Amplify authority content and drive qualified leads into your pipeline at scale. Paid media engineered to work with your AI infrastructure.',
    href: '/contact',
    connects: ['content', 'leads', 'agents'],
  },
  {
    num: '05',
    id: 'leads',
    label: 'Lead Generation',
    sublabel: 'Scraping · Enrichment',
    icon: Users,
    color: '#10b981',
    rgb: '16,185,129',
    feedsInto: 'AI agent fuel',
    services: ['Lead Scraping / Hunter ($5,000)', 'Lead Enrichment Pipeline ($2,000)'],
    description: 'Continuous supply of verified, enriched ICP targets. No more buying stale lists — fresh net-new targets on demand from any public source.',
    href: '/services/lead-scraping',
    connects: ['advertising', 'agents'],
  },
  {
    num: '06',
    id: 'agents',
    label: 'AI Agents',
    sublabel: 'Voice · Quoting · Booking',
    icon: Bot,
    color: '#ef4444',
    rgb: '239,68,68',
    feedsInto: 'Protocol data & revenue',
    services: ['Off-Hours Voice Agent ($2,500)', 'Quoting Agent ($3,500)', 'Auto-Appointment Setter ($5,000)', '24/7 Sales & CS Agent'],
    description: 'Custom AI agents that answer every call, qualify leads, deliver quotes, and book appointments — 24/7, zero missed revenue. Each interaction feeds data back into your protocol stack.',
    href: '/services/off-hours-voice-agent',
    connects: ['leads', 'protocols'],
  },
] as const

type PillarId = typeof PILLARS[number]['id']

function isConnected(aId: string, bId: string): boolean {
  const a = PILLARS.find(p => p.id === aId)
  return a ? (a.connects as readonly string[]).includes(bId) : false
}

const ecosystemSchema = {
  '@type': 'HowTo',
  name: 'The ASC Revenue Flywheel: 6 Pillars That Compound Into Revenue',
  description: "Adam Silva Consulting's 6 interconnected service pillars form a compounding revenue cycle where each pillar feeds the next.",
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
  const activePillar = activeId ? PILLARS.find(p => p.id === activeId) : null

  const connectedPillars = activeId
    ? PILLARS.filter(p => p.id !== activeId && (isConnected(activeId, p.id) || isConnected(p.id, activeId)))
    : []

  return (
    <div>
      <JsonLd data={ecosystemSchema} />

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

        {/* ── Left: 6-pillar circuit grid ── */}
        <div>
          {/* Circuit hint */}
          <div
            className="flex items-center gap-2 mb-5"
            style={{ color: 'var(--color-muted-2)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
          >
            <RotateCcw size={12} style={{ color: 'var(--color-accent)' }} />
            <span>Each pillar feeds the next — click any to explore</span>
          </div>

          {/* 3 × 2 pillar grid */}
          <div className="grid grid-cols-3 gap-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              const isActive = activeId === pillar.id
              const connected = activeId ? (isConnected(activeId, pillar.id) || isConnected(pillar.id, activeId)) : false
              const dimmed = !!(activeId && !isActive && !connected)

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveId(isActive ? null : (pillar.id as PillarId))}
                  aria-label={`Explore ${pillar.label}`}
                  className="group text-left rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    padding: '1rem',
                    background: isActive
                      ? `rgba(${pillar.rgb}, 0.12)`
                      : connected
                      ? `rgba(${pillar.rgb}, 0.05)`
                      : 'var(--color-surface)',
                    border: `1px solid ${isActive ? pillar.color : connected ? `rgba(${pillar.rgb}, 0.35)` : 'var(--color-border)'}`,
                    borderTop: `3px solid ${pillar.color}`,
                    opacity: dimmed ? 0.35 : 1,
                    boxShadow: isActive ? `0 0 20px rgba(${pillar.rgb}, 0.2)` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: isActive ? pillar.color : 'var(--color-muted-2)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center"
                      style={{
                        background: `rgba(${pillar.rgb}, 0.12)`,
                        border: `1px solid rgba(${pillar.rgb}, 0.2)`,
                      }}
                    >
                      <Icon size={13} style={{ color: pillar.color }} />
                    </div>
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: isActive ? pillar.color : 'var(--color-text)',
                      lineHeight: 1.25,
                      marginBottom: '3px',
                    }}
                  >
                    {pillar.label}
                  </div>

                  {/* Sublabel */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--color-muted-2)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {pillar.sublabel}
                  </div>

                  {/* Feeds into arrow */}
                  {isActive && (
                    <div
                      className="mt-2.5 flex items-center gap-1"
                      style={{ fontSize: '9px', color: pillar.color, fontFamily: 'var(--font-mono)' }}
                    >
                      <ArrowRight size={9} />
                      {pillar.feedsInto}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Flow indicator */}
          <div
            className="mt-4 flex items-center justify-center gap-1"
            style={{ fontSize: '10px', color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}
          >
            {PILLARS.map((p, i) => (
              <span key={p.id} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveId(activeId === p.id ? null : (p.id as PillarId))}
                  style={{
                    color: activeId === p.id ? p.color : 'var(--color-muted-2)',
                    fontWeight: activeId === p.id ? 700 : 400,
                    transition: 'color 0.2s',
                  }}
                >
                  {p.num}
                </button>
                {i < PILLARS.length - 1 && (
                  <ArrowRight size={8} style={{ opacity: 0.4 }} />
                )}
              </span>
            ))}
            <span style={{ marginLeft: '4px', opacity: 0.5 }}>↺ Revenue</span>
          </div>
        </div>

        {/* ── Right: Detail panel ── */}
        <div
          className="rounded-lg p-6"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            minHeight: '320px',
          }}
        >
          {!activePillar ? (
            /* Default / overview state */
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{
                  background: 'rgba(14,165,233,0.1)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(14,165,233,0.2)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <RotateCcw size={10} />
                Revenue Flywheel
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.375rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.2,
                }}
              >
                Every Service Compounds the Next
              </h3>

              <p
                className="mb-5 speakable-answer"
                style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-sans)' }}
              >
                ASC is a full-stack AI agency where each of the 6 pillars feeds the others.
                Protocols enable AI discovery. Discovery drives content. Content fuels advertising.
                Advertising fills the lead pipeline. Agents close leads and feed data back into protocols.
              </p>

              <div className="space-y-2 mb-5">
                {PILLARS.map((p) => {
                  const Icon = p.icon
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveId(p.id as PillarId)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 hover:scale-[1.01]"
                      style={{
                        background: `rgba(${p.rgb}, 0.05)`,
                        border: `1px solid rgba(${p.rgb}, 0.15)`,
                      }}
                    >
                      <Icon size={13} style={{ color: p.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
                        {p.num}. {p.label}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
                        {p.sublabel}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Active pillar detail */
            <div>
              {/* Back */}
              <button
                onClick={() => setActiveId(null)}
                className="flex items-center gap-1.5 mb-4 transition-opacity hover:opacity-100 opacity-50"
                style={{ color: 'var(--color-muted-2)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
              >
                ← All pillars
              </button>

              {/* Pillar badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
                style={{
                  background: `rgba(${activePillar.rgb}, 0.12)`,
                  color: activePillar.color,
                  border: `1px solid rgba(${activePillar.rgb}, 0.25)`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {(() => { const Icon = activePillar.icon; return <Icon size={10} /> })()}
                {activePillar.num} · {activePillar.sublabel}
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.375rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.2,
                }}
              >
                {activePillar.label}
              </h3>

              <p
                className="mb-4"
                style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--font-sans)' }}
              >
                {activePillar.description}
              </p>

              {/* Services */}
              <div className="mb-4">
                <div
                  className="mb-2 uppercase tracking-wider"
                  style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}
                >
                  Services included
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePillar.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded"
                      style={{
                        background: `rgba(${activePillar.rgb}, 0.08)`,
                        color: activePillar.color,
                        border: `1px solid rgba(${activePillar.rgb}, 0.18)`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feeds into */}
              <div
                className="flex items-center gap-2 mb-5 px-3 py-2 rounded"
                style={{
                  background: `rgba(${activePillar.rgb}, 0.06)`,
                  border: `1px solid rgba(${activePillar.rgb}, 0.14)`,
                }}
              >
                <ArrowRight size={12} style={{ color: activePillar.color, flexShrink: 0 }} />
                <span
                  style={{ fontSize: '11px', color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                >
                  Feeds into:{' '}
                  <strong style={{ color: activePillar.color }}>{activePillar.feedsInto}</strong>
                </span>
              </div>

              {/* Connects to */}
              {connectedPillars.length > 0 && (
                <div className="mb-5">
                  <div
                    className="mb-2 uppercase tracking-wider"
                    style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-muted-2)', fontFamily: 'var(--font-mono)' }}
                  >
                    Connected pillars
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {connectedPillars.map((conn) => {
                      const ConnIcon = conn.icon
                      return (
                        <button
                          key={conn.id}
                          onClick={() => setActiveId(conn.id as PillarId)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold transition-all hover:scale-105"
                          style={{
                            border: `1px solid rgba(${conn.rgb}, 0.25)`,
                            background: `rgba(${conn.rgb}, 0.07)`,
                            color: conn.color,
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          <ConnIcon size={10} />
                          {conn.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <Link
                href={activePillar.href}
                className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                style={{ color: activePillar.color, fontFamily: 'var(--font-sans)' }}
              >
                Explore {activePillar.label}
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
