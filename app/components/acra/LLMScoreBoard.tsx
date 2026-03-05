'use client'

import type { LLMScores } from '@/lib/acra/scoring'
import Link from 'next/link'

interface Props {
  scores: LLMScores
}

const LLM_META = [
  {
    key: 'chatgpt' as keyof LLMScores,
    name: 'ChatGPT',
    detail: 'Shopping + function-calling agent',
    icon: '🤖',
    weights: 'UCP manifest, ACP checkout, agent.json',
  },
  {
    key: 'perplexity' as keyof LLMScores,
    name: 'Perplexity',
    detail: 'Answer + product discovery engine',
    icon: '🔍',
    weights: 'Press coverage, E-E-A-T, FAQPage schema',
  },
  {
    key: 'claude' as keyof LLMScores,
    name: 'Claude',
    detail: 'Research + procurement agent',
    icon: '📚',
    weights: 'Entity clarity, sameAs schema, llms.txt',
  },
  {
    key: 'gemini' as keyof LLMScores,
    name: 'Gemini',
    detail: 'Google Shopping + knowledge graph',
    icon: '✨',
    weights: 'Schema.org, social authority, E-E-A-T',
  },
  {
    key: 'copilot' as keyof LLMScores,
    name: 'Bing Copilot',
    detail: 'B2B procurement + web search agent',
    icon: '🪟',
    weights: 'LinkedIn, press coverage, structured data',
  },
]

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
  if (score >= 35) return 'Low Confidence'
  if (score >= 20) return 'Very Low'
  return 'Will Not Recommend'
}

export function LLMScoreBoard({ scores }: Props) {
  const avg = Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / 5)

  return (
    <div className="card overflow-hidden">
      <div className="p-5 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">LLM Recommendation Scores</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              How likely each AI model is to recommend or facilitate a purchase from your brand
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: scoreColor(avg) }}>{avg}</div>
            <div className="text-xs text-[var(--color-muted-2)]">avg / 100</div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {LLM_META.map(({ key, name, detail, icon, weights }) => {
          const score = scores[key]
          const color = scoreColor(score)
          return (
            <div key={key} className="p-4 flex items-center gap-4">
              <div className="text-2xl w-8 text-center shrink-0">{icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-[var(--color-text)]">{name}</span>
                  <span className="text-xs text-[var(--color-muted-2)]">— {detail}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${score}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs font-bold w-6 text-right" style={{ color }}>{score}</span>
                </div>
                <div className="text-xs text-[var(--color-muted-2)] mt-0.5">
                  Key signals: {weights}
                </div>
              </div>
              <div
                className="text-xs font-semibold px-2 py-1 rounded-full shrink-0"
                style={{ background: `${color}18`, color }}
              >
                {scoreLabel(score)}
              </div>
            </div>
          )
        })}
      </div>

      {avg < 50 && (
        <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            <strong className="text-[var(--color-text)]">What this means:</strong> With an average LLM recommendation score of {avg}/100,
            the majority of AI models will not recommend your brand for relevant queries, and AI agents
            cannot facilitate purchases on your behalf. Agentic commerce is projected to drive
            <strong className="text-[var(--color-text)]"> 31% of e-commerce by 2027.</strong>
          </p>
          <Link href="/contact" className="btn-primary mt-3 inline-flex items-center gap-2 text-sm">
            Fix My LLM Scores — Talk to Our Team
          </Link>
        </div>
      )}
    </div>
  )
}
