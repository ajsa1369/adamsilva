'use client'

import { useEffect, useState } from 'react'
import type { LLMScores } from '@/lib/acra/scoring'
import Link from 'next/link'

interface Props {
  scores: LLMScores
}

// ── Score utilities ───────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 70) return '#10b981'
  if (score >= 50) return '#22c55e'
  if (score >= 35) return '#f59e0b'
  if (score >= 20) return '#f97316'
  return '#ef4444'
}

function scoreLabel(score: number): string {
  if (score >= 70) return 'High Confidence'
  if (score >= 50) return 'Moderate'
  if (score >= 35) return 'Low'
  if (score >= 20) return 'Very Low'
  return 'Will Not Recommend'
}

// ── SVG brand logos ───────────────────────────────────────────────────────────

function OpenAILogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.911 6.048 6.048 0 0 0-6.51-2.9A5.985 5.985 0 0 0 11.838 1a6.04 6.04 0 0 0-5.765 4.143 5.985 5.985 0 0 0-3.989 2.898 6.048 6.048 0 0 0 .745 7.073 5.985 5.985 0 0 0 .516 4.911 6.048 6.048 0 0 0 6.51 2.9A5.985 5.985 0 0 0 13.162 23a6.04 6.04 0 0 0 5.765-4.143 5.985 5.985 0 0 0 3.989-2.898 6.048 6.048 0 0 0-.634-7.138zM13.162 21.5a4.48 4.48 0 0 1-2.879-1.04l.141-.081 4.779-2.759a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.491 4.495zm-9.667-4.587a4.48 4.48 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.945 19.52a4.5 4.5 0 0 1-6.45-1.607zm-1.24-10.63A4.48 4.48 0 0 1 4.6 5.274v5.683a.77.77 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.29 13.67a4.504 4.504 0 0 1-2.035-5.387zm16.618 3.864-5.815-3.355 2.016-1.163a.076.076 0 0 1 .072 0l4.422 2.549a4.5 4.5 0 0 1-.687 8.12v-5.692a.77.77 0 0 0-.008-.459zm2.008-3.047-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.34 8.601V6.27a.071.071 0 0 1 .028-.065l4.423-2.553a4.5 4.5 0 0 1 6.676 4.665zm-12.65 4.141-2.02-1.164a.08.08 0 0 1-.038-.057V6.437a4.5 4.5 0 0 1 7.375-3.453l-.142.08L7.627 5.82a.795.795 0 0 0-.392.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  )
}

function PerplexityLogo() {
  // 8-pointed asterisk — clean and bold like Perplexity's brand mark
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <line x1="12" y1="2.5" x2="12" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="21.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="2.5" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="12" x2="21.5" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="5.99" y1="5.99" x2="9.76" y2="9.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14.24" y1="14.24" x2="18.01" y2="18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.01" y1="5.99" x2="14.24" y2="9.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9.76" y1="14.24" x2="5.99" y2="18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ClaudeLogo() {
  // Anthropic's official A-mark glyph
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.827 3.52h-3.654L5 20.52h3.2l1.261-3.753h5.079l1.261 3.753H19L13.827 3.52zm-3.476 10.5 1.649-4.91 1.649 4.91H10.35z" />
    </svg>
  )
}

function GeminiLogo() {
  // Google Gemini's iconic 4-pointed diamond star
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C12 7.523 7.523 12 2 12c5.523 0 10 4.477 10 10 0-5.523 4.477-10 10-10-5.523 0-10-4.477-10-10z" />
    </svg>
  )
}

function CopilotLogo() {
  // Microsoft Copilot — nested C / dual-arc mark
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M20 12a8 8 0 1 0-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 12a5 5 0 1 0-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <circle cx="19" cy="19" r="2.5" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

// ── LLM brand configurations ──────────────────────────────────────────────────

const LLM_META = [
  {
    key: 'chatgpt' as keyof LLMScores,
    name: 'OpenAI',
    detail: 'Shopping + function-calling agent',
    color: '#10a37f',
    weights: 'UCP manifest, ACP checkout, agent.json',
    Logo: OpenAILogo,
  },
  {
    key: 'perplexity' as keyof LLMScores,
    name: 'Perplexity',
    detail: 'Answer + product discovery engine',
    color: '#1fb8cd',
    weights: 'Press coverage, E-E-A-T, FAQPage schema',
    Logo: PerplexityLogo,
  },
  {
    key: 'claude' as keyof LLMScores,
    name: 'Claude',
    detail: 'Research + procurement agent',
    color: '#d97757',
    weights: 'Entity clarity, sameAs schema, llms.txt',
    Logo: ClaudeLogo,
  },
  {
    key: 'gemini' as keyof LLMScores,
    name: 'Gemini',
    detail: 'Google Shopping + knowledge graph',
    color: '#4285f4',
    weights: 'Schema.org, social authority, E-E-A-T',
    Logo: GeminiLogo,
  },
  {
    key: 'copilot' as keyof LLMScores,
    name: 'Copilot',
    detail: 'B2B procurement + web search agent',
    color: '#0078d4',
    weights: 'LinkedIn, press coverage, structured data',
    Logo: CopilotLogo,
  },
]

// ── Pentagon radar chart ──────────────────────────────────────────────────────

function RadarChart({ scores }: { scores: LLMScores }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150)
    return () => clearTimeout(t)
  }, [])

  const cx = 100, cy = 105, r = 72
  const n = LLM_META.length
  const angles = LLM_META.map((_, i) => ((-90 + (360 / n) * i) * Math.PI) / 180)

  const pt = (level: number, i: number) => ({
    x: cx + level * r * Math.cos(angles[i]),
    y: cy + level * r * Math.sin(angles[i]),
  })

  const gridPath = (level: number) => {
    const pts = LLM_META.map((_, i) => pt(level, i))
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z'
  }

  const dataPoints = LLM_META.map(({ key }, i) => pt(scores[key] / 100, i))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z'

  return (
    <svg viewBox="0 0 200 210" className="w-full max-w-[200px] mx-auto">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((lvl) => (
        <path key={lvl} d={gridPath(lvl)} fill="none" stroke="var(--color-border)" strokeWidth="1" />
      ))}
      {/* Spokes */}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx} y1={cy}
          x2={(cx + r * Math.cos(a)).toFixed(1)}
          y2={(cy + r * Math.sin(a)).toFixed(1)}
          stroke="var(--color-border)" strokeWidth="1"
        />
      ))}
      {/* Data fill — fades in */}
      <path
        d={dataPath}
        fill="var(--color-accent)"
        fillOpacity={mounted ? 0.18 : 0}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeOpacity={mounted ? 1 : 0}
        strokeLinejoin="round"
        style={{ transition: 'fill-opacity 0.9s ease-out, stroke-opacity 0.9s ease-out' }}
      />
      {/* Score dots — staggered fade */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x.toFixed(1)}
          cy={p.y.toFixed(1)}
          r={3.5}
          fill={LLM_META[i].color}
          opacity={mounted ? 1 : 0}
          style={{ transition: `opacity 0.4s ease-out ${0.3 + i * 0.08}s` }}
        />
      ))}
      {/* Labels */}
      {LLM_META.map(({ name, color }, i) => {
        const lx = cx + (r + 20) * Math.cos(angles[i])
        const ly = cy + (r + 20) * Math.sin(angles[i])
        return (
          <text key={name} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fontWeight="700" fill={color}>
            {name}
          </text>
        )
      })}
      {/* Center avg */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="900" fill="var(--color-text)">
        {Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / 5)}
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="7.5" fill="var(--color-muted-2)">avg / 100</text>
    </svg>
  )
}

// ── Circular gauge card ───────────────────────────────────────────────────────

function GaugeCard({
  score,
  color,
  Logo,
  name,
  delay,
}: {
  score: number
  color: string
  Logo: () => React.JSX.Element
  name: string
  delay: number
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  // r=15.9 → circumference ≈ 99.9 — score maps directly to dasharray
  const dash = mounted ? `${score} 100` : '0 100'
  const label = scoreLabel(score)
  const badgeColor = scoreColor(score)

  return (
    <div
      className="flex flex-col items-center p-4 rounded-2xl border border-[var(--color-border)] transition-all duration-500"
      style={{
        background: `linear-gradient(145deg, ${color}0a, ${color}04)`,
        borderColor: `${color}30`,
      }}
    >
      {/* Ring */}
      <div className="relative w-[72px] h-[72px]">
        <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-surface-2)" strokeWidth="2.8" />
          {/* Score arc */}
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray={dash}
            style={{ transition: `stroke-dasharray 1.1s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay * 0.3}ms` }}
          />
        </svg>
        {/* Logo centered in ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6" style={{ color }}>
            <Logo />
          </div>
        </div>
      </div>

      {/* Name + score */}
      <div className="mt-2.5 text-center">
        <div className="text-xs font-bold text-[var(--color-text)]">{name}</div>
        <div className="text-2xl font-black leading-none mt-1" style={{ color }}>{score}</div>
        <div
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 inline-block"
          style={{ background: `${badgeColor}18`, color: badgeColor }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function LLMScoreBoard({ scores }: Props) {
  const avg = Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / 5)
  const avgColor = scoreColor(avg)

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="p-5 border-b border-[var(--color-border)]"
        style={{ background: 'linear-gradient(135deg, var(--color-surface), var(--color-surface-2))' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">LLM Recommendation Scores</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1 leading-relaxed">
              Probability each major AI model will recommend or facilitate a purchase from your brand — scored against their known ranking signals.
            </p>
          </div>
          {/* Overall badge */}
          <div
            className="shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black"
            style={{ background: `${avgColor}18`, border: `2px solid ${avgColor}40` }}
          >
            <span className="text-2xl leading-none" style={{ color: avgColor }}>{avg}</span>
            <span className="text-[10px] text-[var(--color-muted-2)] leading-none mt-0.5">avg</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Radar + gauge cards side by side */}
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          {/* Pentagon radar chart */}
          <div className="w-full lg:w-52 shrink-0 flex flex-col items-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-2)] mb-1">AI Coverage Map</div>
            <RadarChart scores={scores} />
          </div>

          {/* 5 gauge cards */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {LLM_META.map(({ key, name, color, Logo }, i) => (
                <GaugeCard
                  key={key}
                  score={scores[key]}
                  color={color}
                  Logo={Logo}
                  name={name}
                  delay={200 + i * 130}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Signal breakdown table */}
        <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[var(--color-surface-2)]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-2)]">
              Key Ranking Signals by AI Model
            </span>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {LLM_META.map(({ key, name, color, Logo, weights }) => {
              const score = scores[key]
              const sc = scoreColor(score)
              return (
                <div key={key} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-5 h-5 shrink-0" style={{ color }}>
                    <Logo />
                  </div>
                  <div className="font-semibold text-xs text-[var(--color-text)] w-20 shrink-0">{name}</div>
                  <div className="flex-1 min-w-0">
                    <div className="h-1.5 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${score}%`, background: sc, transition: 'width 1s ease-out' }}
                      />
                    </div>
                    <div className="text-[10px] text-[var(--color-muted-2)] mt-0.5 truncate">{weights}</div>
                  </div>
                  <div className="text-xs font-bold w-6 text-right shrink-0" style={{ color: sc }}>{score}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Low score CTA */}
      {avg < 50 && (
        <div className="px-5 pb-5 border-t border-[var(--color-border)]">
          <div className="p-4 rounded-xl" style={{ background: '#ef444410', border: '1px solid #ef444428' }}>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              <strong className="text-[var(--color-text)]">What this means:</strong> With an average score of {avg}/100,
              the majority of AI models will not recommend your brand for relevant queries — and AI agents
              cannot facilitate purchases on your behalf. Agentic commerce is projected to drive{' '}
              <strong className="text-[var(--color-text)]">31% of e-commerce by 2027.</strong>
            </p>
            <Link href="/contact" className="btn-primary mt-3 inline-flex items-center gap-2 text-sm">
              Fix My LLM Scores — Talk to Our Team
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
