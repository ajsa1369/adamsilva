import React from 'react'

export interface ChatBubbleProps {
  variant: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string  // optional display string e.g. "2:34 PM"
  isLoading?: boolean // shows typing indicator dots
  className?: string
}

function LoadingDots(): React.JSX.Element {
  return (
    <span className="flex gap-1">
      <span
        className="w-2 h-2 rounded-full bg-current animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-current animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <span
        className="w-2 h-2 rounded-full bg-current animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
    </span>
  )
}

export function ChatBubble({
  variant,
  content,
  timestamp,
  isLoading = false,
  className = '',
}: ChatBubbleProps): React.JSX.Element {
  if (variant === 'system') {
    return (
      <div className={`mb-3 ${className}`}>
        <div className="bg-[var(--color-surface)] text-[var(--color-muted)] rounded-lg px-4 py-2 text-xs text-center border border-[var(--color-border)]">
          {isLoading ? <LoadingDots /> : content}
        </div>
        {timestamp && (
          <p className="text-[0.625rem] text-[var(--color-muted-2)] mt-1 text-center">
            {timestamp}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'user') {
    return (
      <div className={`flex items-end gap-2 mb-3 justify-end ${className}`}>
        <div>
          <div className="bg-[var(--color-accent)] text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] ml-auto text-sm">
            {isLoading ? <LoadingDots /> : content}
          </div>
          {timestamp && (
            <p className="text-[0.625rem] text-[var(--color-muted-2)] mt-1 text-right">
              {timestamp}
            </p>
          )}
        </div>
      </div>
    )
  }

  // variant === 'assistant'
  return (
    <div className={`flex items-end gap-2 mb-3 ${className}`}>
      <div>
        <div className="bg-[var(--color-surface-2)] text-[var(--color-text)] rounded-2xl rounded-bl-sm border border-[rgba(77,142,192,0.3)] px-4 py-2.5 max-w-[85%] text-sm">
          {isLoading ? <LoadingDots /> : content}
        </div>
        {timestamp && (
          <p className="text-[0.625rem] text-[var(--color-muted-2)] mt-1">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  )
}
