import React from 'react'

export interface IntakeStepProps {
  stepNumber: number
  totalSteps: number
  title: string
  description?: string
  status: 'upcoming' | 'current' | 'completed'
  children?: React.ReactNode  // step content slot
  className?: string
}

const indicatorClasses: Record<IntakeStepProps['status'], string> = {
  upcoming:  'bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]',
  current:   'bg-[var(--color-accent)] text-white',
  completed: 'bg-emerald-500 text-white',
}

export function IntakeStep({
  stepNumber,
  totalSteps,
  title,
  description,
  status,
  children,
  className = '',
}: IntakeStepProps): React.JSX.Element {
  const progressPercent = (stepNumber / totalSteps) * 100

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-[var(--color-border)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step header row */}
      <div className="flex items-center gap-3">
        {/* Indicator circle */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${indicatorClasses[status]}`}
        >
          {status === 'completed' ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            stepNumber
          )}
        </div>

        {/* Title + description */}
        <div className="min-w-0">
          <h3
            className={`font-semibold text-[var(--color-text)] leading-tight ${
              status === 'current' ? 'text-lg' : 'text-base'
            }`}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[var(--color-muted)] mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content slot — only visible when current */}
      {status === 'current' && children && (
        <div className="mt-4">{children}</div>
      )}
    </div>
  )
}
