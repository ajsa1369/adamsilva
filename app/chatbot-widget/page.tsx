'use client'

/**
 * app/chatbot-widget/page.tsx
 *
 * Minimal iframe-target route for the embeddable chatbot.
 * Loaded by public/chatbot-embed.js via:
 *   iframe.src = siteUrl + '/chatbot-widget?clientId=' + clientId
 *
 * No site header or footer — pure full-height chat UI for iframe embedding.
 * Wraps in Suspense because useSearchParams() requires it in Next.js 14 App Router.
 *
 * CHAT-01 compliance: iframe-based embed requires no framework on host page
 */

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChatWidget } from '@/components/chatbot/ChatWidget'

function ChatWidgetPage(): React.JSX.Element {
  const searchParams = useSearchParams()
  const clientId = searchParams.get('clientId') ?? 'default'

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        background: 'white',
        overflow: 'hidden',
      }}
    >
      <ChatWidget clientId={clientId} />
    </div>
  )
}

export default function Page(): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <ChatWidgetPage />
    </Suspense>
  )
}
