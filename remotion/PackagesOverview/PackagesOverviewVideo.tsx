import React from 'react'
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
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

/* ─── Shared fade-in helper ─── */
function useFadeIn(delay = 0) {
  const frame = useCurrentFrame()
  return interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

/* ─── Scene 1: Pain Stat (0-4s, frames 0-119) ─── */
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

/* ─── Scene 2: Agent Queries (4-8s, frames 120-239) ─── */
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

/* ─── Scene 3: SPA Hydration Tax (8-12s, frames 240-359) ─── */
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

/* ─── Scene 4: Tier Cards (12-16s, frames 360-479) ─── */
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

/* ─── Scene 5: Same Agent Fleet (16-20s, frames 480-599) ─── */
const Scene5: React.FC = () => {
  const textOpacity = useFadeIn(0)
  const subOpacity = useFadeIn(20)

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
          opacity: subOpacity,
        }}
      >
        {highlights.map((h, i) => {
          const itemOpacity = useFadeIn(30 + i * 10)
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

/* ─── Scene 6: Gold Standard Protocols (20-24s, frames 600-719) ─── */
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

/* ─── Scene 7: CTA (24-28s, frames 720-839) ─── */
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

/* ─── Scene 8: Logo Outro (28-30s, frames 840-899) ─── */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 60 },
  })
  const fadeOut = interpolate(frame, [45, 60], [1, 0], {
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
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence from={0} durationInFrames={4 * FPS}>
        <Scene1 />
      </Sequence>
      <Sequence from={4 * FPS} durationInFrames={4 * FPS}>
        <Scene2 />
      </Sequence>
      <Sequence from={8 * FPS} durationInFrames={4 * FPS}>
        <Scene3 />
      </Sequence>
      <Sequence from={12 * FPS} durationInFrames={4 * FPS}>
        <Scene4 />
      </Sequence>
      <Sequence from={16 * FPS} durationInFrames={4 * FPS}>
        <Scene5 />
      </Sequence>
      <Sequence from={20 * FPS} durationInFrames={4 * FPS}>
        <Scene6 />
      </Sequence>
      <Sequence from={24 * FPS} durationInFrames={4 * FPS}>
        <Scene7 />
      </Sequence>
      <Sequence from={28 * FPS} durationInFrames={2 * FPS}>
        <Scene8 />
      </Sequence>
    </AbsoluteFill>
  )
}
