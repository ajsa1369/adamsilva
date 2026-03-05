'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export function ShareReportButton({ shareToken }: { shareToken: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = `${window.location.origin}/acra/share/${shareToken}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
      title="Copy shareable link"
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Share2 size={12} />}
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
