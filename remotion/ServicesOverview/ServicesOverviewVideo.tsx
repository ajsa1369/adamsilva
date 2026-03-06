import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
} from 'remotion'
import { COLORS, GRADIENTS } from '../shared/colors'

const LOGO_SRC = staticFile('images/logo-clear.png')
const FPS = 30

// --- Slide 1: Pain (0-6s, frames 0-179) — Sandler: lead with pain ---
function PainSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
  })
  const statFade = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 18 },
  })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2d0a0a 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      <img
        src={LOGO_SRC}
        alt="Adam Silva Consulting"
        style={{
          height: 70,
          marginBottom: 36,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          color: '#ef4444',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginBottom: 24,
          fontFamily: 'Inter, sans-serif',
          opacity: fadeIn,
        }}
      >
        The Cost of Waiting
      </div>
      <h1
        style={{
          color: COLORS.text,
          fontSize: 56,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.15,
          fontFamily: 'Inter, sans-serif',
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          maxWidth: 1100,
        }}
      >
        69% of Searches End Without a Click.
      </h1>
      <h2
        style={{
          color: '#ef4444',
          fontSize: 36,
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.3,
          fontFamily: 'Inter, sans-serif',
          opacity: statFade,
          marginTop: 20,
          maxWidth: 900,
        }}
      >
        Your SEO Investment Is Evaporating.
      </h2>
      <p
        style={{
          color: COLORS.muted,
          fontSize: 22,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginTop: 28,
          opacity: statFade,
          maxWidth: 800,
        }}
      >
        AI agents influenced $67 billion in sales last Cyber Week. Were any of those yours?
      </p>
    </AbsoluteFill>
  )
}

// --- Slide 2: Cost of Inaction (6-12s, frames 180-359) ---
const LOSSES = [
  { stat: '$15T', label: 'B2B Purchases via AI Agents by 2028', color: '#ef4444' },
  { stat: '83%', label: 'Zero-Click Rate on AI Overviews', color: '#f59e0b' },
  { stat: '61%', label: 'CTR Drop When AI Overviews Appear', color: '#ef4444' },
  { stat: '82%', label: 'Enterprises Deploying Agents in 1-3 Years', color: '#f59e0b' },
]

function CostSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        background: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      <img
        src={LOGO_SRC}
        alt=""
        style={{
          position: 'absolute',
          top: 24,
          right: 40,
          height: 36,
          opacity: 0.6,
        }}
      />

      <div
        style={{
          color: '#ef4444',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          marginBottom: 48,
          fontFamily: 'Inter, sans-serif',
          opacity: spring({ frame, fps, config: { damping: 20 } }),
        }}
      >
        What You Are Losing Right Now
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 48,
          maxWidth: 1400,
        }}
      >
        {LOSSES.map((loss, i) => {
          const delay = i * 10
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 18, stiffness: 80 },
          })
          const scaleIn = interpolate(s, [0, 1], [0.6, 1])

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 280,
                opacity: s,
                transform: `scale(${scaleIn})`,
              }}
            >
              <div
                style={{
                  color: loss.color,
                  fontSize: 72,
                  fontWeight: 900,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {loss.stat}
              </div>
              <div
                style={{
                  color: COLORS.muted,
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                }}
              >
                {loss.label}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 3: The Solution — 18 Services (12-18s, frames 360-539) ---
const SERVICE_CATEGORIES = [
  { name: 'Audit', count: '3 services', color: '#3b82f6', examples: 'ACRA, AEO Audit, Schema Audit' },
  { name: 'Optimization', count: '4 services', color: '#8b5cf6', examples: 'GEO, AEO, SSR Migration, Token Optimization' },
  { name: 'Protocol', count: '3 services', color: '#10b981', examples: 'UCP, ACP, AP2 Implementation' },
  { name: 'Automation', count: '4 services', color: '#f59e0b', examples: 'MCP Servers, RAG, Voice Agent, Lead Gen' },
  { name: 'Content', count: '4 services', color: '#ef4444', examples: 'Authority Building, Hub Pages, Blog Strategy' },
]

function SolutionSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surface2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 80px',
      }}
    >
      <img
        src={LOGO_SRC}
        alt=""
        style={{
          position: 'absolute',
          top: 24,
          right: 40,
          height: 36,
          opacity: 0.6,
        }}
      />

      <div
        style={{
          color: COLORS.text,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          marginBottom: 40,
          fontFamily: 'Inter, sans-serif',
          opacity: spring({ frame, fps, config: { damping: 20 } }),
        }}
      >
        18 Services. 5 Categories. One Infrastructure.
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: '100%',
          maxWidth: 1100,
        }}
      >
        {SERVICE_CATEGORIES.map((cat, i) => {
          const delay = i * 12
          const cardSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 20, stiffness: 60 },
          })
          const slideX = interpolate(cardSpring, [0, 1], [-80, 0])

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: `${cat.color}11`,
                border: `1px solid ${cat.color}44`,
                borderRadius: 14,
                padding: '20px 28px',
                opacity: cardSpring,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <div
                style={{
                  minWidth: 110,
                  height: 54,
                  borderRadius: 10,
                  background: cat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {cat.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div
                  style={{
                    color: cat.color,
                    fontSize: 20,
                    fontWeight: 800,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {cat.count}
                </div>
                <div
                  style={{
                    color: COLORS.muted,
                    fontSize: 15,
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {cat.examples}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 4: The 16-Week Roadmap (18-24s, frames 540-719) ---
const PHASES = [
  { phase: 'Wk 1-2', title: 'ACRA Assessment', color: '#3b82f6' },
  { phase: 'Wk 3-6', title: 'Foundation Layer', color: '#8b5cf6' },
  { phase: 'Wk 7-10', title: 'Execution Layer', color: '#10b981' },
  { phase: 'Wk 11-14', title: 'Authority Layer', color: '#f59e0b' },
  { phase: 'Wk 15-16', title: 'Launch', color: '#ef4444' },
]

function RoadmapSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headerFade = spring({ frame, fps, config: { damping: 20 } })

  return (
    <AbsoluteFill
      style={{
        background: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      <img
        src={LOGO_SRC}
        alt=""
        style={{
          position: 'absolute',
          top: 24,
          right: 40,
          height: 36,
          opacity: 0.6,
        }}
      />

      <div
        style={{
          color: COLORS.accent,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
          opacity: headerFade,
        }}
      >
        Proven Methodology
      </div>

      <h2
        style={{
          color: COLORS.text,
          fontSize: 44,
          fontWeight: 900,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 48,
          opacity: headerFade,
        }}
      >
        The 16-Week Protocol Roadmap
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 20,
          maxWidth: 1400,
        }}
      >
        {PHASES.map((phase, i) => {
          const delay = 10 + i * 10
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 18, stiffness: 100 },
          })
          const scaleIn = interpolate(s, [0, 1], [0.5, 1])

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: `${phase.color}15`,
                border: `1px solid ${phase.color}44`,
                borderRadius: 14,
                padding: '28px 20px',
                textAlign: 'center',
                opacity: s,
                transform: `scale(${scaleIn})`,
              }}
            >
              <div
                style={{
                  color: phase.color,
                  fontSize: 14,
                  fontWeight: 800,
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  marginBottom: 12,
                }}
              >
                {phase.phase}
              </div>
              <div
                style={{
                  color: COLORS.text,
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {phase.title}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 5: Negative Reverse CTA (24-30s, frames 720-899) — Sandler: "This isn't for everyone" ---
function NegativeReverseCTA() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: 'clamp',
  })
  const buttonSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 18, stiffness: 80 },
  })
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.8, 1])

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.accent,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      <img
        src={LOGO_SRC}
        alt="Adam Silva Consulting"
        style={{
          height: 80,
          marginBottom: 36,
          opacity: fadeIn,
        }}
      />
      <div
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          marginBottom: 20,
          fontFamily: 'Inter, sans-serif',
          opacity: fadeIn,
        }}
      >
        Fair Warning
      </div>
      <h2
        style={{
          color: '#ffffff',
          fontSize: 52,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.2,
          fontFamily: 'Inter, sans-serif',
          marginBottom: 20,
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          maxWidth: 900,
        }}
      >
        This Isn&apos;t for Everyone.
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: 24,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 44,
          opacity: fadeIn,
          maxWidth: 700,
        }}
      >
        If you are not ready to act on findings within 90 days, this is not for you.
      </p>
      <div
        style={{
          background: '#ffffff',
          color: '#000',
          padding: '18px 48px',
          borderRadius: 14,
          fontSize: 22,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          opacity: buttonSpring,
          transform: `scale(${buttonScale})`,
        }}
      >
        Start with a Free ACRA Assessment
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 16,
          fontFamily: 'Inter, sans-serif',
          marginTop: 16,
          opacity: buttonSpring,
        }}
      >
        adamsilvaconsulting.com/acra/run
      </div>
    </AbsoluteFill>
  )
}

const NARRATION_SRC = staticFile('audio/services-overview-narration.mp3')

// --- Main Composition ---
export function ServicesOverviewVideo() {
  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, sans-serif' }}>
      <Audio src={NARRATION_SRC} volume={1} />

      {/* Slide 1: Pain — 0-6s (frames 0-179) */}
      <Sequence from={0} durationInFrames={FPS * 6}>
        <PainSlide />
      </Sequence>

      {/* Slide 2: Cost of Inaction — 6-12s (frames 180-359) */}
      <Sequence from={FPS * 6} durationInFrames={FPS * 6}>
        <CostSlide />
      </Sequence>

      {/* Slide 3: The Solution — 12-18s (frames 360-539) */}
      <Sequence from={FPS * 12} durationInFrames={FPS * 6}>
        <SolutionSlide />
      </Sequence>

      {/* Slide 4: The Roadmap — 18-24s (frames 540-719) */}
      <Sequence from={FPS * 18} durationInFrames={FPS * 6}>
        <RoadmapSlide />
      </Sequence>

      {/* Slide 5: Negative Reverse CTA — 24-30s (frames 720-899) */}
      <Sequence from={FPS * 24} durationInFrames={FPS * 6}>
        <NegativeReverseCTA />
      </Sequence>
    </AbsoluteFill>
  )
}
