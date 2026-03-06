'use client'

import { Quote } from 'lucide-react'

interface Props {
  text: string
  author: string
  role: string
  accentColor: string
}

export function ProofQuote({ text, author, role, accentColor }: Props) {
  return (
    <section className="section-sm" aria-label="Social proof">
      <div className="container max-w-3xl">
        <div
          className="relative rounded-2xl p-8 lg:p-10"
          style={{
            background: `color-mix(in srgb, ${accentColor} 8%, var(--color-surface, #ffffff))`,
            border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
          }}
        >
          {/* Quote mark */}
          <div
            className="absolute -top-4 left-8 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: accentColor,
              boxShadow: `0 4px 12px color-mix(in srgb, ${accentColor} 30%, transparent)`,
            }}
          >
            <Quote size={14} fill="#fff" stroke="#fff" />
          </div>

          <blockquote
            className="text-base lg:text-lg leading-relaxed italic mb-6 mt-2"
            style={{ color: 'var(--color-text, #0a0f1e)' }}
          >
            &ldquo;{text}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: accentColor }}
            >
              {author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--color-text, #0a0f1e)' }}>{author}</div>
              <div className="text-xs" style={{ color: 'var(--color-muted-2, #6b7280)' }}>{role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
