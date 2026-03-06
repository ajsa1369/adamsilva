import {
  AbsoluteFill,
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

// --- Slide 1: Title (0-5s, frames 0-149) ---
function TitleSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
  })
  const subtitleFade = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 25 },
  })

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.hero,
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
          height: 90,
          marginBottom: 40,
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
        }}
      />
      <h1
        style={{
          color: COLORS.text,
          fontSize: 64,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.15,
          fontFamily: 'Inter, sans-serif',
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          maxWidth: 1100,
        }}
      >
        10 Case Studies. 6 Open Protocols.
      </h1>
      <h2
        style={{
          color: COLORS.accent,
          fontSize: 56,
          fontWeight: 800,
          textAlign: 'center',
          lineHeight: 1.2,
          fontFamily: 'Inter, sans-serif',
          opacity: subtitleFade,
          marginTop: 16,
        }}
      >
        Proven Results.
      </h2>
    </AbsoluteFill>
  )
}

// --- Slide 2: Stats (5-10s, frames 150-299) ---
const STATS = [
  { value: '8M+', label: 'Merchants AI-Discoverable' },
  { value: '97M+', label: 'MCP SDK Downloads' },
  { value: '3.2x', label: 'Higher AI Citation Rate' },
  { value: '73%', label: 'Token Cost Reduction' },
]

function StatsSlide() {
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
      {/* Logo watermark */}
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
          marginBottom: 48,
          fontFamily: 'Inter, sans-serif',
          opacity: spring({ frame, fps, config: { damping: 20 } }),
        }}
      >
        Results at Scale
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
        {STATS.map((stat, i) => {
          const delay = i * 8
          const statSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 18, stiffness: 80 },
          })
          const scaleIn = interpolate(statSpring, [0, 1], [0.6, 1])

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 280,
                opacity: statSpring,
                transform: `scale(${scaleIn})`,
              }}
            >
              <div
                style={{
                  color: COLORS.text,
                  fontSize: 72,
                  fontWeight: 900,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: COLORS.muted,
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                }}
              >
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 3: Protocol Stack (10-16s, frames 300-479) ---
const PROTOCOLS = [
  {
    name: 'UCP',
    fullName: 'Universal Commerce Protocol',
    color: '#3b82f6',
    description:
      'AI-readable product catalogs. One manifest endpoint makes your entire inventory discoverable by any agent.',
  },
  {
    name: 'ACP',
    fullName: 'Agentic Commerce Protocol',
    color: '#8b5cf6',
    description:
      'Agent-native checkout. AI agents negotiate, compare, and complete purchases programmatically.',
  },
  {
    name: 'AP2',
    fullName: 'Agent Payments Protocol',
    color: '#10b981',
    description:
      'Cryptographic trust for payments. Verifiable credentials and settlement for every agentic transaction.',
  },
]

function ProtocolStackSlide() {
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
        padding: '60px 80px',
      }}
    >
      {/* Logo watermark */}
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
          marginBottom: 48,
          fontFamily: 'Inter, sans-serif',
          opacity: spring({ frame, fps, config: { damping: 20 } }),
        }}
      >
        The Protocol Stack
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '100%',
          maxWidth: 1100,
        }}
      >
        {PROTOCOLS.map((protocol, i) => {
          const delay = i * 20
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
                gap: 28,
                background: `${protocol.color}11`,
                border: `1px solid ${protocol.color}44`,
                borderRadius: 16,
                padding: '28px 36px',
                opacity: cardSpring,
                transform: `translateX(${slideX}px)`,
              }}
            >
              <div
                style={{
                  minWidth: 80,
                  height: 80,
                  borderRadius: 12,
                  background: protocol.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 24,
                  fontWeight: 900,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {protocol.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    color: protocol.color,
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {protocol.fullName}
                </div>
                <div
                  style={{
                    color: COLORS.muted,
                    fontSize: 17,
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.45,
                  }}
                >
                  {protocol.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 4: Live Results (16-21s, frames 480-629) ---
const COMPANIES = ['Etsy', 'Wayfair', 'Shopify', 'OpenAI', 'Stripe', 'Anthropic']

function LiveResultsSlide() {
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
      {/* Logo watermark */}
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
        In Production
      </div>

      <h2
        style={{
          color: COLORS.text,
          fontSize: 48,
          fontWeight: 900,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 56,
          opacity: headerFade,
        }}
      >
        Deployed With Industry Leaders
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
          maxWidth: 1200,
        }}
      >
        {COMPANIES.map((company, i) => {
          const delay = 10 + i * 10
          const chipSpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 18, stiffness: 100 },
          })
          const scaleIn = interpolate(chipSpring, [0, 1], [0.5, 1])

          return (
            <div
              key={i}
              style={{
                background: `${COLORS.accent}18`,
                border: `1px solid ${COLORS.accent}44`,
                borderRadius: 12,
                padding: '20px 44px',
                opacity: chipSpring,
                transform: `scale(${scaleIn})`,
              }}
            >
              <span
                style={{
                  color: COLORS.text,
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {company}
              </span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// --- Slide 5: CTA (21-26s, frames 630-779) ---
function CTASlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [30, 0], {
    extrapolateRight: 'clamp',
  })
  const buttonSpring = spring({
    frame: Math.max(0, frame - 20),
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
      <h2
        style={{
          color: '#ffffff',
          fontSize: 54,
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
        We Implement This for Your Business
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: 22,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginBottom: 44,
          opacity: fadeIn,
        }}
      >
        Protocol implementation, AI discovery optimization, and agentic commerce infrastructure.
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
        adamsilvaconsulting.com/case-studies
      </div>
    </AbsoluteFill>
  )
}

// --- Main Composition ---
export function CaseStudyVideo() {
  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Slide 1: Title — 0-5s (frames 0-149) */}
      <Sequence from={0} durationInFrames={FPS * 5}>
        <TitleSlide />
      </Sequence>

      {/* Slide 2: Stats — 5-10s (frames 150-299) */}
      <Sequence from={FPS * 5} durationInFrames={FPS * 5}>
        <StatsSlide />
      </Sequence>

      {/* Slide 3: Protocol Stack — 10-16s (frames 300-479) */}
      <Sequence from={FPS * 10} durationInFrames={FPS * 6}>
        <ProtocolStackSlide />
      </Sequence>

      {/* Slide 4: Live Results — 16-21s (frames 480-629) */}
      <Sequence from={FPS * 16} durationInFrames={FPS * 5}>
        <LiveResultsSlide />
      </Sequence>

      {/* Slide 5: CTA — 21-26s (frames 630-779) */}
      <Sequence from={FPS * 21} durationInFrames={FPS * 5}>
        <CTASlide />
      </Sequence>
    </AbsoluteFill>
  )
}
