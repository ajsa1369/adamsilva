'use client'

import { useState, useRef } from 'react'
import { Search, Database, ShieldCheck, Bot, ChevronRight } from 'lucide-react'
import { JsonLd } from '../seo/JsonLd'
import { SITE_URL, ORG_ID } from '@/lib/schemas/organization'

const FLYWHEEL_STEPS = [
  {
    id: 'identify',
    step: 1,
    icon: Search,
    title: 'Identify Gaps',
    color: '#3b82f6',
    summary: 'Audit your current AEO/GEO posture',
    detail:
      'We run a comprehensive analysis of which queries in your market are being answered by AI agents and whether your content is being cited. Using 12-point AEO scoring and competitor citation mapping, we pinpoint exactly where your authority is missing.',
    schemaAction: 'AEO Audit',
    service: '/services/aeo-audit',
  },
  {
    id: 'structure',
    step: 2,
    icon: Database,
    title: 'Structure Data',
    color: '#8b5cf6',
    summary: 'Add JSON-LD schema and UCP protocols',
    detail:
      'Every page gets proper JSON-LD schema. Every image gets ImageObject markup. Your .well-known directory gets UCP, ACP, and AP2 manifests. We make your entire digital presence machine-readable — primed for AI agent ingestion.',
    schemaAction: 'GEO Implementation',
    service: '/services/geo-implementation',
  },
  {
    id: 'verify',
    step: 3,
    icon: ShieldCheck,
    title: 'Verify Trust',
    color: '#10b981',
    summary: 'Build E-E-A-T and AP2 credentials',
    detail:
      'Trust signals compound. We implement E-E-A-T authorship signals, ClaimReview citations on all key statistics, Verifiable Credentials via AP2, and external authority citations. AI agents trust sources that other trusted sources reference.',
    schemaAction: 'Authority Building',
    service: '/services/authority-building',
  },
  {
    id: 'citation',
    step: 4,
    icon: Bot,
    title: 'Agent Citation',
    color: '#f59e0b',
    summary: 'AI agents cite you as the definitive source',
    detail:
      'Once your authority flywheel is spinning, AI agents begin citing your content preferentially. More citations drive more traffic, which signals more authority, which drives more citations. The flywheel compounds — and competitors can\'t catch up.',
    schemaAction: 'Sustained Authority',
    service: '/services/authority-building',
  },
]

const flywheelHowToSchema = {
  '@type': 'HowTo',
  name: 'The Authority Flywheel: Building Agent Citation Dominance',
  description:
    'A 4-step compounding cycle that positions your brand as the definitive source AI agents cite when your topics come up.',
  totalTime: 'P90D',
  step: FLYWHEEL_STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.detail,
    url: `${SITE_URL}${s.service}`,
  })),
  performer: { '@id': ORG_ID },
}

const flywheelFAQSchema = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Authority Flywheel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Authority Flywheel is a 4-step compounding cycle: Identify Gaps → Structure Data → Verify Trust → Agent Citation. Each rotation of the flywheel compounds your authority, making it progressively harder for competitors to displace you as the AI-cited authority in your market.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to see agent citations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most clients begin seeing measurable increases in AI agent citations within 30–60 days of implementing the full flywheel. Full authority dominance typically takes 90 days for the cycle to compound significantly.',
      },
    },
  ],
}

export function AuthorityFlywheel() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const schemaRef = useRef<HTMLScriptElement>(null)

  const active = activeStep !== null ? FLYWHEEL_STEPS[activeStep] : null

  return (
    <div className="relative">
      {/* Pre-rendered schema — agents parse this regardless of interaction */}
      <JsonLd data={flywheelHowToSchema} />
      <JsonLd data={flywheelFAQSchema} />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Flywheel Visualization */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Center circle */}
            <div className="absolute inset-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center z-10">
              <div className="text-center text-white p-4">
                <div className="text-xs font-bold uppercase tracking-widest mb-1">Authority</div>
                <div className="text-2xl font-black">Flywheel</div>
              </div>
            </div>

            {/* Step nodes */}
            {FLYWHEEL_STEPS.map((step, i) => {
              const angle = (i * 90 - 45) * (Math.PI / 180)
              const radius = 108
              const x = 50 + Math.cos(angle) * (radius / 1.6)
              const y = 50 + Math.sin(angle) * (radius / 1.6)
              const Icon = step.icon
              const isActive = activeStep === i

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    borderColor: isActive ? step.color : undefined,
                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${step.color} 20%, var(--color-surface))`
                      : undefined,
                  }}
                  className={`absolute w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 ${
                    isActive
                      ? 'shadow-lg scale-110'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:scale-105'
                  }`}
                  aria-label={`Step ${step.step}: ${step.title}`}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive ? step.color : undefined }}
                    className={isActive ? '' : 'text-[var(--color-muted)]'}
                  />
                </button>
              )
            })}

            {/* Connecting arrows (decorative) */}
            <svg
              className="absolute inset-0 w-full h-full flywheel-ring"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="var(--color-border)"
                strokeWidth="0.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>

        {/* Step Detail */}
        <div>
          <div className="mb-6">
            <span className="badge mb-3">The 4-Step Cycle</span>
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] mb-3">
              Authority Flywheel
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed speakable-answer">
              Once set in motion, the flywheel compounds. Each rotation makes your authority harder to displace — creating a compounding moat against competitors.
            </p>
          </div>

          {/* Step list */}
          <div className="space-y-3">
            {FLYWHEEL_STEPS.map((step, i) => {
              const Icon = step.icon
              const isActive = activeStep === i
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? 'border-[var(--color-accent)] bg-[var(--color-surface)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-sm ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'}`}>
                          {step.title}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`text-[var(--color-muted-2)] transition-transform ${isActive ? 'rotate-90' : ''}`}
                        />
                      </div>
                      <p className="text-xs text-[var(--color-muted-2)] mt-0.5">{step.summary}</p>
                    </div>
                  </div>
                  {isActive && (
                    <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                      {step.detail}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
