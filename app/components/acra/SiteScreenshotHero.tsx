'use client'

/**
 * SiteScreenshotHero
 *
 * GTmetrix-style hero: site screenshot thumbnail with grade badge overlay,
 * plus report metadata (domain, company, date, score, framework).
 * Screenshot from thum.io (free, no API key).
 */

import { useState } from 'react'
import { Globe, Calendar, Cpu, ExternalLink } from 'lucide-react'

interface Props {
  url: string
  domain: string
  companyName: string | null
  framework: string | null
  overallScore: number
  grade: string
  reportDate: string
}

const GRADE_COLORS: Record<string, { bg: string; ring: string }> = {
  A: { bg: '#10b981', ring: '#059669' },
  B: { bg: '#22c55e', ring: '#16a34a' },
  C: { bg: '#f59e0b', ring: '#d97706' },
  D: { bg: '#f97316', ring: '#ea580c' },
  F: { bg: '#ef4444', ring: '#dc2626' },
}

const GRADE_LABELS: Record<string, string> = {
  A: 'Excellent',
  B: 'Good',
  C: 'Needs Work',
  D: 'Poor',
  F: 'Critical',
}

export function SiteScreenshotHero({ url, domain, companyName, framework, overallScore, grade, reportDate }: Props) {
  const [imgError, setImgError] = useState(false)
  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  const thumbUrl = `https://image.thum.io/get/width/600/crop/380/noanimate/${fullUrl}`
  const gradeStyle = GRADE_COLORS[grade] ?? GRADE_COLORS['F']
  const gradeLabel = GRADE_LABELS[grade] ?? 'Unknown'
  const dateStr = new Date(reportDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Left: Screenshot with grade overlay */}
        <div className="relative shrink-0 sm:w-[280px] h-[180px] sm:h-auto bg-[var(--color-surface-2)] overflow-hidden">
          {!imgError ? (
            <img
              src={thumbUrl}
              alt={`Screenshot of ${domain}`}
              className="w-full h-full object-cover object-top"
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-muted-2)]">
              <div className="text-center">
                <Globe size={32} className="mx-auto mb-2 opacity-40" />
                <div className="text-sm font-semibold">{domain}</div>
              </div>
            </div>
          )}

          {/* Grade badge overlay — bottom-right of screenshot */}
          <div
            className="absolute bottom-3 right-3 flex flex-col items-center justify-center w-[72px] h-[72px] rounded-full shadow-lg"
            style={{
              background: gradeStyle.bg,
              border: `3px solid ${gradeStyle.ring}`,
              boxShadow: `0 4px 20px ${gradeStyle.bg}60`,
            }}
          >
            <span className="text-[28px] font-black text-white leading-none">{grade}</span>
            <span className="text-[9px] font-bold text-white/90">{overallScore}/100</span>
          </div>

          {/* Dark gradient at bottom for badge readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
          />
        </div>

        {/* Right: Report metadata */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-accent)] mb-2">
            ACRA Report
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text)] leading-tight mb-1">
            {companyName || domain}
          </h1>

          {companyName && (
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] inline-flex items-center gap-1 mb-3"
            >
              {domain}
              <ExternalLink size={11} />
            </a>
          )}

          {!companyName && (
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-muted-2)] hover:text-[var(--color-accent)] inline-flex items-center gap-1 mb-3"
            >
              Visit site
              <ExternalLink size={10} />
            </a>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted-2)]">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {dateStr}
            </span>
            {framework && (
              <span className="inline-flex items-center gap-1">
                <Cpu size={12} />
                {framework}
              </span>
            )}
          </div>

          {/* Score + grade summary */}
          <div className="flex items-center gap-3 mt-4">
            <div
              className="text-sm font-extrabold px-3 py-1 rounded-full"
              style={{ background: `${gradeStyle.bg}15`, color: gradeStyle.bg }}
            >
              Grade {grade} — {gradeLabel}
            </div>
            <div className="text-sm font-bold text-[var(--color-text)]">
              {overallScore}/100
            </div>
          </div>

          {/* Score bar */}
          <div className="mt-3 h-2 rounded-full bg-[var(--color-surface-2)] overflow-hidden max-w-xs">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${overallScore}%`,
                background: `linear-gradient(90deg, ${gradeStyle.bg}, ${gradeStyle.ring})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
