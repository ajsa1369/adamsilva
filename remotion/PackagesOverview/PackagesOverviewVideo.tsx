import React from 'react'
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
  staticFile,
} from 'remotion'

const COLORS = {
  bg: '#0a0f1e',
  accent: '#2563eb',
  ucp: '#0ea5e9',
  acp: '#a855f7',
  ap2: '#10b981',
  text: '#ffffff',
  muted: '#94a3b8',
  cardBg: '#111827',
  cardBorder: '#1e293b',
}

const FPS = 30

/**
 * Full narration script (must match public/audio/packages-overview-narration.mp3):
 *
 * Scene 1 (0-4s): "Eighty-three percent of Google searches now show AI Overviews.
 *   If your business isn't visible to AI agents, you're already losing customers."
 *
 * Scene 2 (4-8s): "Fourteen million commercial queries flow through AI agents every
 *   single day. ChatGPT, Perplexity, and Gemini are where your buyers are searching now."
 *
 * Scene 3 (8-12s): "Traditional single-page applications lose forty percent of AI crawl
 *   traffic to hydration tax. Server-side rendered architecture eliminates this entirely,
 *   making every page instantly readable by AI agents."
 *
 * Scene 4 (12-17s): "Adam Silva Consulting offers four agentic commerce packages. Starter
 *   at sixteen thousand. Pro at twenty-eight thousand. Max, our most popular, at forty-eight
 *   thousand. And Elite, starting at seventy-five thousand for enterprise-scale deployments."
 *
 * Scene 5 (17-21s): "Every tier ships with the same battle-tested agent fleet. Full SSR
 *   architecture, AI discovery files, and protocol compliance are standard, not add-ons.
 *   The difference is scope and scale."
 *
 * Scene 6 (21-25s): "All packages include Gold Standard protocol compliance. UCP for
 *   universal commerce discovery. ACP for agentic checkout. And AP2 for cryptographic
 *   agent payments. These are the protocols that make your business transactable by AI."
 *
 * Scene 7 (25-29s): "Ready to make your business visible to the fourteen million AI agents
 *   searching right now? Get your custom proposal today. Book a call at adam silva
 *   consulting dot com."
 *
 * Scene 8 (29-32s): "Adam Silva Consulting. Global infrastructure for agentic commerce."
 */
export const PACKAGES_NARRATION_TRANSCRIPT =
  'Eighty-three percent of Google searches now show AI Overviews. If your business isn\'t visible to AI agents, you\'re already losing customers. ' +
  'Fourteen million commercial queries flow through AI agents every single day. ChatGPT, Perplexity, and Gemini are where your buyers are searching now. ' +
  'Traditional single-page applications lose forty percent of AI crawl traffic to hydration tax. Server-side rendered architecture eliminates this entirely, making every page instantly readable by AI agents. ' +
  'Adam Silva Consulting offers four agentic commerce packages. Starter at sixteen thousand. Pro at twenty-eight thousand. Max, our most popular, at forty-eight thousand. And Elite, starting at seventy-five thousand for enterprise-scale deployments. ' +
  'Every tier ships with the same battle-tested agent fleet. Full SSR architecture, AI discovery files, and protocol compliance are standard, not add-ons. The difference is scope and scale. ' +
  'All packages include Gold Standard protocol compliance. UCP for universal commerce discovery. ACP for agentic checkout. And AP2 for cryptographic agent payments. These are the protocols that make your business transactable by AI. ' +
  'Ready to make your business visible to the fourteen million AI agents searching right now? Get your custom proposal today. Book a call at adam silva consulting dot com. ' +
  'Adam Silva Consulting. Global infrastructure for agentic commerce.'

// Scene durations in frames (30fps) — timed to narration paragraphs
const S1 = 4 * FPS   // 0-4s: 83% stat
const S2 = 4 * FPS   // 4-8s: 14M queries
const S3 = 4 * FPS   // 8-12s: SPA hydration tax
const S4 = 5 * FPS   // 12-17s: Tier cards (longer — 4 tiers to name)
const S5 = 4 * FPS   // 17-21s: Same agent fleet
const S6 = 4 * FPS   // 21-25s: Protocols
const S7 = 4 * FPS   // 25-29s: CTA
const S8 = 3 * FPS   // 29-32s: Logo outro

export const PACKAGES_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7 + S8 // 960

/* ─── Shared fade-in helper ─── */
function useFadeIn(delay = 0) {
  const frame = useCurrentFrame()
  return interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

/* ─── Scene 1: 83% AI Overviews ─── */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } })
  const textOpacity = useFadeIn(15)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: COLORS.accent,
          transform: `scale(${scale})`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        83%
      </div>
      <div
        style={{
          fontSize: 42,
          fontWeight: 600,
          color: COLORS.text,
          opacity: textOpacity,
          textAlign: 'center',
          maxWidth: 1200,
          marginTop: 24,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        of searches now show AI Overviews.
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.muted,
          opacity: textOpacity,
          textAlign: 'center',
          marginTop: 16,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Is your business visible?
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 2: 14M+ Agent Queries ─── */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const numberScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  })

  const textOpacity = useFadeIn(20)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: COLORS.accent,
          transform: `scale(${numberScale})`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        14M+
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: COLORS.text,
          opacity: textOpacity,
          textAlign: 'center',
          maxWidth: 1100,
          marginTop: 24,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        AI agents process 14M+ commercial queries daily
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 3: SPA Hydration Tax ─── */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const barWidth = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 40 },
    from: 0,
    to: 1,
  })

  const textOpacity = useFadeIn(10)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          opacity: textOpacity,
          textAlign: 'center',
          maxWidth: 1200,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        SPA sites lose{' '}
        <span style={{ color: '#ef4444' }}>40%</span> of AI crawl traffic
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.muted,
          opacity: textOpacity,
          marginTop: 12,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        to hydration tax
      </div>

      {/* Visual bar */}
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          height: 40,
          backgroundColor: '#1e293b',
          borderRadius: 20,
          marginTop: 60,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${barWidth * 40}%`,
            height: '100%',
            backgroundColor: '#ef4444',
            borderRadius: 20,
          }}
        />
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#ef4444',
          marginTop: 12,
          opacity: textOpacity,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        40% traffic lost
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 4: Tier Cards ─── */
const TIERS = [
  { name: 'Starter', price: '$16K', color: '#3b82f6' },
  { name: 'Pro', price: '$28K', color: '#6366f1' },
  { name: 'Max', price: '$48K', color: COLORS.accent, highlighted: true },
  { name: 'Elite', price: 'From $75K', color: '#8b5cf6' },
]

const Scene4: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 50,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Choose Your Tier
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        {TIERS.map((tier, i) => {
          const delay = i * 5
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          })
          const isMax = tier.highlighted

          return (
            <div
              key={tier.name}
              style={{
                width: 320,
                height: 280,
                borderRadius: 24,
                backgroundColor: COLORS.cardBg,
                border: isMax
                  ? `3px solid ${COLORS.accent}`
                  : `1px solid ${COLORS.cardBorder}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${cardSpring}) ${isMax ? 'translateY(-20px)' : ''}`,
                boxShadow: isMax
                  ? `0 0 60px rgba(37, 99, 235, 0.4)`
                  : '0 4px 30px rgba(0,0,0,0.4)',
              }}
            >
              {isMax && (
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: COLORS.text,
                    backgroundColor: COLORS.accent,
                    padding: '4px 16px',
                    borderRadius: 20,
                    marginBottom: 16,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: tier.color,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {tier.name}
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: COLORS.text,
                  marginTop: 12,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {tier.price}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 5: Same Agent Fleet ─── */
const Scene5: React.FC = () => {
  const textOpacity = useFadeIn(0)

  const highlights = [
    'Full SSR architecture on every tier',
    'AI discovery files included',
    'Protocol-compliant from day one',
  ]

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.text,
          opacity: textOpacity,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Same Agent Fleet. Different Scope.
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 50,
        }}
      >
        {highlights.map((h, i) => {
          const itemOpacity = useFadeIn(15 + i * 10)
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                opacity: itemOpacity,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: COLORS.accent,
                }}
              />
              <div
                style={{
                  fontSize: 32,
                  color: COLORS.muted,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {h}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 6: Gold Standard Protocols ─── */
const PROTOCOLS = [
  { name: 'UCP', label: 'Universal Commerce Protocol', color: COLORS.ucp },
  { name: 'ACP', label: 'Agentic Commerce Protocol', color: COLORS.acp },
  { name: 'AP2', label: 'Agent Payments Protocol', color: COLORS.ap2 },
]

const Scene6: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const titleOpacity = useFadeIn(0)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.text,
          opacity: titleOpacity,
          marginBottom: 50,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Gold Standard Protocol Compliance
      </div>
      <div style={{ display: 'flex', gap: 48 }}>
        {PROTOCOLS.map((p, i) => {
          const badgeScale = spring({
            frame: frame - i * 8,
            fps,
            config: { damping: 10, stiffness: 60 },
          })

          return (
            <div
              key={p.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${badgeScale})`,
              }}
            >
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  border: `4px solid ${p.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 40px ${p.color}44`,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: p.color,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {p.name}
                </div>
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.muted,
                  marginTop: 16,
                  textAlign: 'center',
                  maxWidth: 220,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {p.label}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 7: CTA ─── */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const btnScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 80 },
  })
  const textOpacity = useFadeIn(0)
  const urlOpacity = useFadeIn(30)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.text,
          opacity: textOpacity,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Get Your Custom Proposal
      </div>
      <div
        style={{
          marginTop: 40,
          padding: '20px 60px',
          backgroundColor: COLORS.accent,
          borderRadius: 16,
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.text,
          transform: `scale(${btnScale})`,
          boxShadow: `0 0 40px ${COLORS.accent}66`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Book a Call
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.muted,
          marginTop: 30,
          opacity: urlOpacity,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        adamsilvaconsulting.com
      </div>
    </AbsoluteFill>
  )
}

/* ─── Scene 8: Logo Outro ─── */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  })
  const fadeOut = interpolate(frame, [60, 85], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.text,
          transform: `scale(${logoScale})`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Adam Silva Consulting
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.accent,
          marginTop: 16,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Global Infrastructure for Agentic Commerce
      </div>
    </AbsoluteFill>
  )
}

/* ─── Main Composition ─── */
export const PackagesOverviewVideo: React.FC = () => {
  let offset = 0
  const scenes = [
    { Component: Scene1, dur: S1 },
    { Component: Scene2, dur: S2 },
    { Component: Scene3, dur: S3 },
    { Component: Scene4, dur: S4 },
    { Component: Scene5, dur: S5 },
    { Component: Scene6, dur: S6 },
    { Component: Scene7, dur: S7 },
    { Component: Scene8, dur: S8 },
  ]

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile('audio/packages-overview-narration.mp3')} />
      {scenes.map(({ Component, dur }, i) => {
        const from = offset
        offset += dur
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <Component />
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}
