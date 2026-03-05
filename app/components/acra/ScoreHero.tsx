'use client'

/**
 * ScoreHero
 *
 * Animated overall score hero card — replaces the static mini bars in the report page.
 * Shows: large gauge + 9 animated pillar mini bars that grow in on mount.
 */

import { useEffect, useState } from 'react'
import { ScoreGauge } from '@/app/components/acra/ScoreGauge'

interface Props {
  overallScore: number
  grade: string
  pillars: Array<{ label: string; score: number }>
}

const GRADE_COLOR: Record<string, string> = {
  A: '#10b981', B: '#22c55e', C: '#f59e0b', D: '#f97316', F: '#ef4444',
}

function pillarGrade(score: number) {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 60) return 'C'
  if (score >= 40) return 'D'
  return 'F'
}

export function ScoreHero({ overallScore, grade, pillars }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150)
    return () => clearTimeout(t)
  }, [])

  const gradeColor = GRADE_COLOR[grade] ?? '#6b7280'

  return (
    <div className="card p-6">
      <div className="grid sm:grid-cols-4 gap-6 items-center">
        {/* Overall gauge */}
        <div className="flex flex-col items-center sm:border-r border-[var(--color-border)] sm:pr-6">
          <ScoreGauge score={overallScore} grade={grade} size="lg" />
          <div className="text-sm font-semibold text-[var(--color-muted-2)] mt-2 text-center">
            Overall ACRA Score
          </div>
          <div
            className="mt-2 text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: `${gradeColor}18`, color: gradeColor }}
          >
            Grade {grade}
          </div>
        </div>

        {/* Animated pillar mini bars */}
        <div className="sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {pillars.map(({ label, score }, i) => {
            const g = pillarGrade(score)
            const c = GRADE_COLOR[g]
            return (
              <div key={label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-[var(--color-muted-2)] font-medium">{label}</span>
                  <span className="text-[11px] font-black" style={{ color: c }}>{score}</span>
                </div>
                <div className="h-1.5 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: mounted ? `${score}%` : '0%',
                      background: `linear-gradient(90deg, ${c}99, ${c})`,
                      transition: `width 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) ${i * 70}ms`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
