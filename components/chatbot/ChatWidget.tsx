'use client'

/**
 * components/chatbot/ChatWidget.tsx
 *
 * Embeddable chat widget component — used by the iframe route at /chatbot-widget
 * and can also be embedded directly in Next.js pages.
 *
 * Uses Vercel AI SDK v6 useChat with DefaultChatTransport pointing to
 * /api/chatbot/[clientId].
 *
 * CHAT-01 compliance: floating button + panel UI
 * CHAT-04 compliance: session ID passed on every request for persistence
 */

import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { ChatBubble, Button } from '@/components/ui'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ChatWidgetProps {
  clientId: string       // from data-client-id on the script tag
  primaryColor?: string  // defaults to '#4D8EC0'
  greeting?: string      // opening message shown before first user message
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { type: 'text'; text: string }).text)
    .join('')
}

// Inline SVG chat icon — avoids lucide-react dependency in iframe context
function ChatIcon(): React.JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon(): React.JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SendIcon(): React.JSX.Element {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// ChatWidget
// ---------------------------------------------------------------------------

export function ChatWidget({
  clientId,
  primaryColor = '#4D8EC0',
  greeting,
}: ChatWidgetProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate a stable session ID once on mount — persists for the lifecycle of this widget instance
  const sessionId = useRef<string>(crypto.randomUUID())

  const defaultGreeting =
    greeting ??
    "Hi! I'm here to help. Ask me anything about our services or how we can help your business."

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chatbot/${clientId}`,
      body: { sessionId: sessionId.current, channel: 'web' },
    }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Close panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue.trim() })
    setInputValue('')
  }

  const handleToggle = () => setIsOpen((prev) => !prev)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999999,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '68px',
            right: '0',
            width: '360px',
            height: '500px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-base)',
            border: '1px solid var(--color-border)',
          }}
          role="dialog"
          aria-label="Chat with us"
        >
          {/* Panel header */}
          <div
            style={{
              padding: '16px',
              background: primaryColor,
              color: 'white',
              flexShrink: 0,
            }}
          >
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
              Chat with us
            </h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', opacity: 0.85 }}>
              Typically replies instantly
            </p>
          </div>

          {/* Messages list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Greeting — shown before any messages */}
            <ChatBubble
              variant="assistant"
              content={defaultGreeting}
            />

            {/* Conversation messages */}
            {messages.map((msg) => {
              const text = getMessageText(msg)
              if (!text) return null
              return (
                <ChatBubble
                  key={msg.id}
                  variant={msg.role === 'user' ? 'user' : 'assistant'}
                  content={text}
                />
              )
            })}

            {/* Loading indicator */}
            {isLoading && (
              <ChatBubble
                variant="assistant"
                content=""
                isLoading={true}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '12px',
              display: 'flex',
              gap: '8px',
              background: 'var(--color-surface)',
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              aria-label="Chat message"
              style={{
                flex: 1,
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                color: 'var(--color-text)',
                background: 'var(--color-base)',
                outline: 'none',
              }}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <SendIcon />
            </Button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: isOpen ? '#1B2E4B' : primaryColor,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  )
}
