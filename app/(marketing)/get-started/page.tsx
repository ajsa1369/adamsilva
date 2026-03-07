'use client'

/**
 * app/(marketing)/get-started/page.tsx
 *
 * Agentic intake agent UI. Uses Vercel AI SDK v6 useChat hook to stream responses
 * from /api/intake/chat. Renders Phase 1 components for chat messages,
 * platform warnings, and proposal cards.
 *
 * INTAKE-01: Full 6-step conversational flow without page reloads
 * INTAKE-02: Legacy platform warning rendered when detectPlatformTier returns 'legacy'
 */

import React, { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage, type DynamicToolUIPart } from 'ai'
import {
  ChatBubble,
  IntakeStep,
  PlatformWarning,
  ProposalCard,
  Button,
  Badge,
} from '@/components/ui'

// Detect proposal data in assistant messages
interface ProposalResult {
  packageSlug: string
  setupTotal: number
  monthlyTotal: number
  includedIntegrations: Array<{ name: string; tier: number }>
  overageIntegrations: Array<{ name: string; tier: number }>
  tierReasoning: string
}

// Detect platform warning in tool results
interface PlatformTierResult {
  platformTier: 'legacy' | 'full' | 'migration'
  platform: string
}

// Map package slug to ProposalCard tier prop
function slugToTier(slug: string): 'genesis' | 'essentials' | 'prime' | 'scale' | 'legacy' {
  if (slug.includes('genesis')) return 'genesis'
  if (slug.includes('essentials')) return 'essentials'
  if (slug.includes('prime')) return 'prime'
  if (slug.includes('scale')) return 'scale'
  return 'legacy'
}

// Extract text content from a UIMessage
function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { type: 'text'; text: string }).text)
    .join('')
}

// Find a tool invocation part by name from a UIMessage
function findToolPart(
  msg: UIMessage,
  toolName: string
): (DynamicToolUIPart & { state: 'output-available'; output: unknown }) | null {
  const part = msg.parts.find(
    (p): p is DynamicToolUIPart =>
      p.type === 'dynamic-tool' && (p as DynamicToolUIPart).toolName === toolName
  )
  if (part && part.state === 'output-available') {
    return part as DynamicToolUIPart & { state: 'output-available'; output: unknown }
  }
  return null
}

export default function GetStartedPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [legacyPathChosen, setLegacyPathChosen] = useState<'addon' | 'migrate' | null>(null)
  const [proposal, setProposal] = useState<ProposalResult | null>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/intake/chat' }),
    onFinish: ({ message }) => {
      // Scan tool invocations in finished messages for platform and proposal results
      const proposalPart = findToolPart(message, 'calculateProposal')
      if (proposalPart) {
        setProposal(proposalPart.output as ProposalResult)
      }
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue.trim() })
    setInputValue('')
  }

  const handleQuickSend = (text: string) => {
    if (isLoading) return
    sendMessage({ text })
  }

  // Send legacy path choice as a user message
  const handleLegacyAddon = () => {
    setLegacyPathChosen('addon')
    handleQuickSend('I want to continue with the Legacy Add-On path.')
  }

  const handleLegacyMigrate = () => {
    setLegacyPathChosen('migrate')
    handleQuickSend('I want to explore the Migration path to a headless stack.')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base)' }}>
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-[var(--color-text)]">
              Get Your Proposal
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-0.5">
              Adam Silva Consulting · Agentic Commerce Platform
            </p>
          </div>
          <Badge variant="default">Free Assessment</Badge>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            'Business Context',
            'Stack Discovery',
            'Goals',
            'Platform',
            'Proposal',
            'Delivery',
          ].map((step, i) => {
            const stepNum = i + 1
            // Simple heuristic: step is complete if messages count passes threshold
            const msgCount = messages.length
            const status: 'upcoming' | 'current' | 'completed' =
              msgCount >= stepNum * 3
                ? 'completed'
                : msgCount >= (stepNum - 1) * 3
                ? 'current'
                : 'upcoming'
            return (
              <IntakeStep
                key={step}
                stepNumber={stepNum}
                totalSteps={6}
                title={step}
                status={status}
                className="min-w-[120px]"
              />
            )
          })}
        </div>
      </div>

      {/* Chat Area */}
      <main className="container mx-auto px-4 pb-32">
        <div className="max-w-2xl mx-auto">

          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="py-8">
              <ChatBubble
                variant="assistant"
                content="Hi! I'm Adam Silva Consulting's qualification agent. I'll ask you a few questions about your business and tech stack, then generate a personalized proposal — usually takes about 5 minutes. Ready to get started?"
              />
              <div className="flex gap-3 mt-4 ml-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleQuickSend("Yes, let's get started!")}
                >
                  Yes, let&apos;s get started
                </Button>
              </div>
            </div>
          )}

          {/* Message history */}
          <div className="space-y-1 py-4">
            {messages.map((msg) => {
              if (msg.role === 'user') {
                return (
                  <ChatBubble
                    key={msg.id}
                    variant="user"
                    content={getMessageText(msg)}
                  />
                )
              }

              if (msg.role === 'assistant') {
                const text = getMessageText(msg)
                const platformPart = findToolPart(msg, 'detectPlatformTier')
                const proposalPart = findToolPart(msg, 'calculateProposal')

                return (
                  <div key={msg.id}>
                    {text && (
                      <ChatBubble variant="assistant" content={text} />
                    )}

                    {/* Platform warning card */}
                    {platformPart && legacyPathChosen === null && (() => {
                      const r = platformPart.output as PlatformTierResult
                      if (r.platformTier === 'legacy') {
                        return (
                          <PlatformWarning
                            platform={r.platform}
                            onContinueWithLegacy={handleLegacyAddon}
                            onExploreMigration={handleLegacyMigrate}
                            className="my-4"
                          />
                        )
                      }
                      return null
                    })()}

                    {/* Proposal card */}
                    {proposalPart && proposal && (
                      <div className="my-4 space-y-3">
                        <ProposalCard
                          tier={slugToTier(proposal.packageSlug)}
                          setupTotal={proposal.setupTotal}
                          monthlyTotal={proposal.monthlyTotal}
                          integrationCount={proposal.includedIntegrations.length}
                        />
                        <div className="flex gap-3 mt-4">
                          <Button
                            variant="primary"
                            size="md"
                            href="https://calendly.com/adamsilva/strategy"
                          >
                            Book Strategy Call
                          </Button>
                          <Button
                            variant="secondary"
                            size="md"
                            href="/api/intake/pdf"
                          >
                            Download PDF Proposal
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return null
            })}

            {/* Loading indicator */}
            {isLoading && (
              <ChatBubble variant="assistant" content="" isLoading={true} />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <form
          onSubmit={handleSubmit}
          className="container mx-auto max-w-2xl flex gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-base)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:opacity-50"
          />
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  )
}
