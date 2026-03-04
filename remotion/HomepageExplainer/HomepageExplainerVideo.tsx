import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion'
import { COLORS, GRADIENTS } from '../shared/colors'

export interface HomepageExplainerProps {
  testimonialQuote: string
  testimonialAuthor: string
}

/* ── Slide 1: Title Card (0-4s) ── */
function TitleSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.hero,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      <img
        src="https://www.adamsilvaconsulting.com/images/logo-clear.png"
        alt=""
        style={{ height: 56, filter: 'brightness(0) invert(1)', marginBottom: 40 }}
      />
      <h1 style={{
        color: COLORS.text,
        fontSize: 58,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.15,
        fontFamily: 'Inter, sans-serif',
        maxWidth: 900,
        marginBottom: 24,
      }}>
        Global Infrastructure for<br />Agentic Commerce
      </h1>
      <p style={{
        color: COLORS.muted,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        marginBottom: 32,
      }}>
        AI Agents. Lead Gen. Advertising. Results.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        {(['UCP', 'ACP', 'AP2'] as const).map((p) => {
          const colors: Record<string, string> = { UCP: COLORS.ucp, ACP: COLORS.acp, AP2: COLORS.ap2 }
          return (
            <span key={p} style={{
              background: `${colors[p]}33`,
              border: `1px solid ${colors[p]}`,
              borderRadius: 999,
              padding: '6px 18px',
              color: colors[p],
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
            }}>
              {p}
            </span>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ── Slide 2: Problem Statement (4-9s) ── */
function ProblemSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 25 } })
  const countTo50 = interpolate(frame, [0, 45], [0, 50], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f0a1e 0%, #1a0a2e 50%, #2d0a0a 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
      }}
    >
      <div style={{
        fontSize: 160,
        fontWeight: 900,
        color: COLORS.error,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1,
        marginBottom: 16,
      }}>
        {Math.round(countTo50)}%
      </div>
      <h2 style={{
        color: COLORS.text,
        fontSize: 44,
        fontWeight: 800,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        maxWidth: 800,
        marginBottom: 20,
      }}>
        of Search Traffic Will Disappear by 2028
      </h2>
      <p style={{
        color: COLORS.muted,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        maxWidth: 600,
      }}>
        Gartner predicts AI will reshape how customers find and buy.
        Businesses without protocol infrastructure will be invisible.
      </p>
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 40,
        color: COLORS.muted2,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
      }}>
        Source: Gartner, 2024
      </div>
    </AbsoluteFill>
  )
}

/* ── Slide 3-5: Protocol Slides ── */
function ProtocolSlide({
  acronym,
  name,
  description,
  color,
  step,
  detail,
}: {
  acronym: string
  name: string
  description: string
  color: string
  step: number
  detail: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 25 } })
  const slideIn = interpolate(frame, [0, 15], [50, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 100px',
        opacity: fadeIn,
      }}
    >
      {/* Color bar top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: color }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
        transform: `translateX(${slideIn}px)`,
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: `${color}33`,
          border: `2px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          fontSize: 22,
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
        }}>
          {step}
        </div>
        <span style={{
          color: COLORS.muted2,
          fontSize: 16,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 700,
        }}>
          Step {step} of 3
        </span>
      </div>

      <div style={{
        background: `${color}33`,
        border: `1px solid ${color}`,
        borderRadius: 999,
        padding: '6px 18px',
        color,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        marginBottom: 20,
        transform: `translateX(${slideIn}px)`,
      }}>
        {acronym}
      </div>

      <h2 style={{
        color: COLORS.text,
        fontSize: 48,
        fontWeight: 800,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        marginBottom: 20,
        transform: `translateX(${slideIn}px)`,
      }}>
        {name}
      </h2>

      <p style={{
        color: COLORS.muted,
        fontSize: 24,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.6,
        maxWidth: 800,
        marginBottom: 24,
        transform: `translateX(${slideIn}px)`,
      }}>
        {description}
      </p>

      <div style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: '16px 24px',
        color: COLORS.muted,
        fontSize: 18,
        fontFamily: 'Inter, sans-serif',
        transform: `translateX(${slideIn}px)`,
      }}>
        {detail}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 40,
        color: COLORS.muted2,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
      }}>
        adamsilvaconsulting.com
      </div>
    </AbsoluteFill>
  )
}

/* ── Slide 6: Results (27-33s) ── */
function ResultsSlide({ quote, author }: { quote: string; author: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.accent,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
      }}
    >
      <div style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontWeight: 700,
        marginBottom: 32,
      }}>
        Client Results
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 48, marginBottom: 48 }}>
        {[
          { value: '15+', label: 'Services' },
          { value: '16 Wk', label: 'Timeline' },
          { value: '5.0', label: 'Rating' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 56, fontWeight: 900, fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'Inter, sans-serif', marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '32px 40px',
        maxWidth: 800,
        textAlign: 'center',
      }}>
        <p style={{
          color: '#fff',
          fontSize: 22,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.5,
          fontStyle: 'italic',
          marginBottom: 16,
        }}>
          &ldquo;{quote}&rdquo;
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          — {author}
        </p>
      </div>
    </AbsoluteFill>
  )
}

/* ── Slide 7: Flywheel Overview (33-39s) ── */
function FlywheelSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const rotation = interpolate(frame, [0, 180], [0, 360], { extrapolateRight: 'clamp' })

  const pillars = [
    { label: 'Protocols', color: COLORS.ucp, angle: 0 },
    { label: 'AEO/GEO', color: COLORS.acp, angle: 60 },
    { label: 'Content', color: COLORS.warning, angle: 120 },
    { label: 'Advertising', color: '#ec4899', angle: 180 },
    { label: 'Lead Gen', color: COLORS.ap2, angle: 240 },
    { label: 'AI Agents', color: COLORS.error, angle: 300 },
  ]

  return (
    <AbsoluteFill
      style={{
        background: COLORS.base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        opacity: fadeIn,
      }}
    >
      <div style={{ position: 'absolute', top: 60, left: 100 }}>
        <div style={{
          color: COLORS.muted2,
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 700,
          marginBottom: 12,
        }}>
          The Revenue Engine
        </div>
        <h2 style={{
          color: COLORS.text,
          fontSize: 44,
          fontWeight: 800,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.2,
        }}>
          6 Pillars. One<br />Compounding Flywheel.
        </h2>
      </div>

      {/* Flywheel ring */}
      <div style={{
        position: 'relative',
        width: 500,
        height: 500,
        transform: `rotate(${rotation * 0.1}deg)`,
      }}>
        {/* Connecting ring */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          height: 400,
          marginTop: -200,
          marginLeft: -200,
          borderRadius: '50%',
          border: `2px solid ${COLORS.border}`,
        }} />

        {/* Pillar nodes */}
        {pillars.map((p) => {
          const rad = (p.angle * Math.PI) / 180
          const cx = 250 + 190 * Math.cos(rad)
          const cy = 250 + 190 * Math.sin(rad)
          const activeProgress = interpolate(frame, [p.angle / 2, p.angle / 2 + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

          return (
            <div
              key={p.label}
              style={{
                position: 'absolute',
                left: cx - 40,
                top: cy - 40,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `${p.color}${Math.round(activeProgress * 0.7 * 255 + 0.3 * 255).toString(16).padStart(2, '0')}`,
                border: `2px solid ${p.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${0.8 + activeProgress * 0.2})`,
              }}
            >
              <span style={{
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {p.label}
              </span>
            </div>
          )
        })}

        {/* Center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 100,
          height: 100,
          marginTop: -50,
          marginLeft: -50,
          borderRadius: '50%',
          background: COLORS.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            Revenue
          </span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 40,
        color: COLORS.muted2,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
      }}>
        adamsilvaconsulting.com
      </div>
    </AbsoluteFill>
  )
}

/* ── Slide 8: CTA (39-45s) ── */
function CTASlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })

  return (
    <AbsoluteFill
      style={{
        background: GRADIENTS.hero,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
      }}
    >
      <img
        src="https://www.adamsilvaconsulting.com/images/logo-clear.png"
        alt=""
        style={{ height: 56, filter: 'brightness(0) invert(1)', marginBottom: 40 }}
      />
      <h2 style={{
        color: '#fff',
        fontSize: 52,
        fontWeight: 900,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        marginBottom: 16,
        maxWidth: 800,
      }}>
        Start with a Free ACRA
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        marginBottom: 40,
      }}>
        UCP · ACP · AP2 Protocol Implementation
      </p>
      <div style={{
        background: '#ffffff',
        color: COLORS.primary,
        padding: '18px 48px',
        borderRadius: 12,
        fontSize: 22,
        fontWeight: 800,
        fontFamily: 'Inter, sans-serif',
      }}>
        adamsilvaconsulting.com
      </div>
    </AbsoluteFill>
  )
}

/* ── Main Composition ── */
export function HomepageExplainerVideo({ testimonialQuote, testimonialAuthor }: HomepageExplainerProps) {
  const fps = 30

  // Slide durations matched to Deepgram Delia narration audio
  const titleDur = 150       // 5.0s (4.5s audio + gap)
  const problemDur = 214     // 7.1s (6.6s audio + gap)
  const ucpDur = 326         // 10.9s (10.4s audio + gap)
  const acpDur = 335         // 11.2s (10.7s audio + gap)
  const ap2Dur = 306         // 10.2s (9.7s audio + gap)
  const resultsDur = 261     // 8.7s (8.2s audio + gap)
  const flywheelDur = 345    // 11.5s (11.0s audio + gap)
  const ctaDur = 312         // 10.4s (9.9s audio + gap)

  let offset = 0

  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Narration audio track */}
      <Audio src={staticFile('audio/explainer-narration.mp3')} />

      <Sequence from={offset} durationInFrames={titleDur}>
        <TitleSlide />
      </Sequence>

      <Sequence from={(offset += titleDur)} durationInFrames={problemDur}>
        <ProblemSlide />
      </Sequence>

      <Sequence from={(offset += problemDur)} durationInFrames={ucpDur}>
        <ProtocolSlide
          acronym="UCP"
          name="AI Discovery Layer"
          description="AI agents discover your catalog via /.well-known/ucp — the foundation of agentic commerce."
          color={COLORS.ucp}
          step={1}
          detail="Governed by Google · Powers AI Mode + Perplexity Shopping"
        />
      </Sequence>

      <Sequence from={(offset += ucpDur)} durationInFrames={acpDur}>
        <ProtocolSlide
          acronym="ACP"
          name="AI Checkout Layer"
          description="Agents complete purchases via Stripe Payment Tokens. No login. No cart abandonment."
          color={COLORS.acp}
          step={2}
          detail="Governed by OpenAI + Stripe · Enables ChatGPT Instant Checkout"
        />
      </Sequence>

      <Sequence from={(offset += acpDur)} durationInFrames={ap2Dur}>
        <ProtocolSlide
          acronym="AP2"
          name="Trust & Verification Layer"
          description="Cryptographic mandates make agentic transactions legally defensible with full audit trails."
          color={COLORS.ap2}
          step={3}
          detail="Governed by Google · Verifiable Credentials + x402"
        />
      </Sequence>

      <Sequence from={(offset += ap2Dur)} durationInFrames={resultsDur}>
        <ResultsSlide quote={testimonialQuote} author={testimonialAuthor} />
      </Sequence>

      <Sequence from={(offset += resultsDur)} durationInFrames={flywheelDur}>
        <FlywheelSlide />
      </Sequence>

      <Sequence from={(offset += flywheelDur)} durationInFrames={ctaDur}>
        <CTASlide />
      </Sequence>
    </AbsoluteFill>
  )
}
