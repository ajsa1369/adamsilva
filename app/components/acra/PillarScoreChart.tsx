'use client'

/**
 * PillarScoreChart
 *
 * Two-panel interactive chart for the 9 ACRA pillar scores:
 *  1. Recharts RadarChart — spider/radar view of all 9 pillars at a glance
 *  2. Animated horizontal bar chart — sorted by score, color-coded by grade
 *
 * Animates on mount so bars and radar fill grow in visually.
 */

import { useEffect, useState } from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface Pillar {
  label: string
  short: string   // 2-3 char abbreviation for radar axis
  score: number
}

interface Props {
  pillars: Pillar[]
}

// ── Color helpers ─────────────────────────────────────────────────────────────

function gradeColor(score: number) {
  if (score >= 75) return { fill: '#10b981', bg: '#10b98118', text: '#10b981', grade: 'A' }
  if (score >= 60) return { fill: '#22c55e', bg: '#22c55e18', text: '#22c55e', grade: 'B' }
  if (score >= 40) return { fill: '#f59e0b', bg: '#f59e0b18', text: '#f59e0b', grade: 'C' }
  if (score >= 20) return { fill: '#f97316', bg: '#f9731618', text: '#f97316', grade: 'D' }
  return { fill: '#ef4444', bg: '#ef444418', text: '#ef4444', grade: 'F' }
}

// ── Custom radar tooltip ──────────────────────────────────────────────────────

function RadarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Pillar; value: number }> }) {
  if (!active || !payload?.length) return null
  const { payload: p, value } = payload[0]
  const c = gradeColor(value)
  return (
    <div
      className="rounded-xl px-3 py-2 shadow-lg text-xs"
      style={{ background: 'var(--color-base)', border: `1px solid ${c.fill}40` }}
    >
      <div className="font-bold" style={{ color: c.fill }}>{p.label}</div>
      <div className="text-[var(--color-muted-2)] mt-0.5">Score: <strong style={{ color: c.fill }}>{value}/100</strong></div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function PillarScoreChart({ pillars }: Props) {
  const [mounted, setMounted] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const radarData = pillars.map((p) => ({
    ...p,
    fullScore: 100,
  }))

  const sorted = [...pillars].sort((a, b) => b.score - a.score)

  return (
    <div className="card overflow-hidden">
      <div className="p-5 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)]">9-Pillar Score Breakdown</h2>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Interactive radar and bar analysis — hover any pillar for details.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border)]">

        {/* ── Left: Recharts Radar ── */}
        <div className="flex-1 p-4 flex flex-col items-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-2)] mb-2">
            Coverage Radar
          </div>
          <div className="w-full" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid
                  stroke="var(--color-border)"
                  strokeOpacity={0.7}
                />
                <PolarAngleAxis
                  dataKey="short"
                  tick={{ fill: 'var(--color-muted-2)', fontSize: 10, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                  tickCount={5}
                />
                {/* Ideal / full coverage ghost */}
                <Radar
                  name="Ideal"
                  dataKey="fullScore"
                  stroke="#6366f120"
                  fill="#6366f108"
                  strokeWidth={1}
                  dot={false}
                  isAnimationActive={false}
                />
                {/* Actual scores */}
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="var(--color-accent)"
                  fill="var(--color-accent)"
                  fillOpacity={mounted ? 0.22 : 0}
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: 'var(--color-accent)' }}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
                <Tooltip content={<RadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Right: Animated horizontal bars ── */}
        <div className="flex-1 p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted-2)] mb-3">
            Score Ranking
          </div>
          <div className="space-y-2.5">
            {sorted.map((p, i) => {
              const c = gradeColor(p.score)
              const isActive = activeIdx === i
              return (
                <div
                  key={p.label}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-black w-5 h-5 rounded flex items-center justify-center shrink-0"
                        style={{ background: c.bg, color: c.fill }}
                      >
                        {c.grade}
                      </span>
                      <span className="text-xs font-semibold text-[var(--color-text)]">{p.label}</span>
                    </div>
                    <span className="text-xs font-black" style={{ color: c.fill }}>{p.score}</span>
                  </div>
                  <div
                    className="h-2.5 rounded-full overflow-hidden"
                    style={{ background: isActive ? c.bg : 'var(--color-surface-2)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: mounted ? `${p.score}%` : '0%',
                        background: `linear-gradient(90deg, ${c.fill}cc, ${c.fill})`,
                        transition: `width 0.85s cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 80}ms`,
                        boxShadow: isActive ? `0 0 10px ${c.fill}80` : 'none',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Grade legend */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { grade: 'A', label: '75+', color: '#10b981' },
              { grade: 'B', label: '60–74', color: '#22c55e' },
              { grade: 'C', label: '40–59', color: '#f59e0b' },
              { grade: 'D', label: '20–39', color: '#f97316' },
              { grade: 'F', label: '0–19', color: '#ef4444' },
            ].map(({ grade, label, color }) => (
              <div key={grade} className="flex items-center gap-1 text-[10px]">
                <span
                  className="w-4 h-4 rounded text-[9px] font-black flex items-center justify-center"
                  style={{ background: `${color}18`, color }}
                >
                  {grade}
                </span>
                <span className="text-[var(--color-muted-2)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
