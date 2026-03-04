'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const KEY_POINTS = [
  { text: 'UCP — AI agents discover your catalog', color: '#0ea5e9' },
  { text: 'ACP — agents complete checkout via Stripe', color: '#a855f7' },
  { text: 'AP2 — cryptographic trust for every transaction', color: '#10b981' },
  { text: 'Full stack deployed in 16 weeks', color: '#f59e0b' },
]

export function ExplainerVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <section
      className="section bg-[var(--color-surface)]"
      aria-labelledby="explainer-video-heading"
      id="explainer-video"
      style={{ scrollMarginTop: '6rem' }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center">
          {/* Video */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(37,99,235,0.1), 0 0 0 1px rgba(37,99,235,0.08)',
            }}
          >
            <video
              ref={videoRef}
              controls
              preload="metadata"
              poster="/images/hero/business-hero.jpg"
              className="w-full h-auto block"
              style={{ aspectRatio: '16/9', background: '#000' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/videos/homepage-explainer.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>

            {/* Play overlay — hidden once video is playing */}
            {!isPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.15)' }}
                aria-label="Play explainer video"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: 'rgba(37,99,235,0.9)',
                    boxShadow: '0 0 0 8px rgba(37,99,235,0.2)',
                  }}
                >
                  <Play size={24} fill="#fff" stroke="#fff" />
                </div>
              </button>
            )}
          </div>

          {/* Content */}
          <div>
            <span className="badge mb-4">
              <Play size={10} />
              Watch
            </span>
            <h2
              id="explainer-video-heading"
              className="mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Agentic Commerce Explained
            </h2>
            <p
              className="mb-6"
              style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', lineHeight: 1.7 }}
            >
              See how three protocols enable AI agents to discover, purchase, and verify — all without a human visiting your website.
            </p>

            {/* Key points */}
            <ul className="space-y-3 mb-8">
              {KEY_POINTS.map((point) => (
                <li key={point.text} className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: point.color }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
                  >
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/services/ai-readiness-check" className="btn-primary text-sm">
              Free AI Readiness Check
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
