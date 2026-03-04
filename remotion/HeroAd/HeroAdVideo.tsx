import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion'

export interface HeroAdProps {
  tagline: string
}

// Slide durations in frames (30fps) — matched to Aurora narration
const hookDur = 168      // 5.6s
const agentsDur = 273    // 9.1s
const leadgenDur = 260   // 8.7s
const adsDur = 177       // 5.9s
const resultsDur = 264   // 8.8s
const ctaDur = 237       // 7.9s

const TOTAL = hookDur + agentsDur + leadgenDur + adsDur + resultsDur + ctaDur

// Brand colors
const BLUE = '#2563eb'
const PURPLE = '#7c3aed'
const CYAN = '#0ea5e9'
const GREEN = '#10b981'
const AMBER = '#f59e0b'

function AnimatedText({
  text,
  delay = 0,
  fontSize = 52,
  color = '#ffffff',
  maxWidth = 900,
}: {
  text: string
  delay?: number
  fontSize?: number
  color?: string
  maxWidth?: number
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.8 } })
  const y = interpolate(s, [0, 1], [60, 0])
  const opacity = interpolate(s, [0, 1], [0, 1])
  return (
    <h2
      style={{
        color,
        fontSize,
        fontWeight: 800,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        lineHeight: 1.15,
        opacity,
        transform: `translateY(${y}px)`,
        maxWidth,
        letterSpacing: '-0.03em',
      }}
    >
      {text}
    </h2>
  )
}

function AccentBar({ color, delay = 0 }: { color: string; delay?: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 20 } })
  const width = interpolate(s, [0, 1], [0, 200])
  return (
    <div
      style={{
        width,
        height: 4,
        borderRadius: 2,
        background: color,
        margin: '0 auto',
      }}
    />
  )
}

function PulsingDot({ color, size = 12 }: { color: string; size?: number }) {
  const frame = useCurrentFrame()
  const pulse = Math.sin(frame * 0.15) * 0.3 + 1
  return (
    <div
      style={{
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  )
}

// Slide 1: Hook — attention-grabbing opening
function HookSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const bgShift = interpolate(frame, [0, hookDur], [0, 30], { extrapolateRight: 'clamp' })
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + bgShift}deg, #0f172a 0%, #1e1b4b 50%, #0c0a1d 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Animated grid lines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i / 20) * 100}%`,
              top: 0,
              bottom: 0,
              width: 1,
              background: CYAN,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <PulsingDot color="#ef4444" size={16} />
        <AnimatedText
          text="Your Competitors Are Sleeping."
          fontSize={64}
          delay={5}
        />
        <AnimatedText
          text="AI Agents Are Buying Right Now."
          fontSize={48}
          color={CYAN}
          delay={25}
        />
        <div style={{ marginTop: 16 }}>
          <AccentBar color="#ef4444" delay={40} />
        </div>
        <AnimatedText
          text="And They Can't Find Your Business."
          fontSize={42}
          color="rgba(255,255,255,0.7)"
          delay={55}
        />
      </div>
    </AbsoluteFill>
  )
}

// Slide 2: AI Agents — what we build
function AgentsSlide() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0f172a 0%, #1e3a5f 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Floating orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%' }}>
        <PulsingDot color={BLUE} size={24} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%' }}>
        <PulsingDot color={PURPLE} size={18} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: BLUE,
            fontFamily: 'monospace',
          }}
        >
          AI AGENTS
        </div>
        <AccentBar color={BLUE} delay={5} />
        <AnimatedText
          text="Custom AI Agents That Work 24/7"
          fontSize={58}
          delay={8}
        />
        <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
          {['Qualify Leads', 'Close Deals', 'Never Sleep'].map((item, i) => {
            const { fps } = useVideoConfig()
            const s = spring({ frame: frame - 30 - i * 10, fps, config: { damping: 12 } })
            return (
              <div
                key={item}
                style={{
                  opacity: s,
                  transform: `translateY(${(1 - s) * 30}px)`,
                  padding: '12px 24px',
                  borderRadius: 8,
                  background: 'rgba(37,99,235,0.15)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Slide 3: Lead Generation
function LeadGenSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const barWidth = spring({ frame: frame - 20, fps, config: { damping: 15 } })
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0f172a 0%, #064e3b 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: GREEN,
            fontFamily: 'monospace',
          }}
        >
          LEAD GENERATION
        </div>
        <AccentBar color={GREEN} delay={5} />
        <AnimatedText
          text="Your Pipeline, Automated"
          fontSize={58}
          delay={8}
        />
        <AnimatedText
          text="No Cold Calls. No Wasted Spend. Just Results."
          fontSize={30}
          color="rgba(255,255,255,0.7)"
          delay={20}
        />
        {/* Animated pipeline bar */}
        <div
          style={{
            width: 600,
            height: 8,
            borderRadius: 4,
            background: 'rgba(16,185,129,0.15)',
            marginTop: 30,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${barWidth * 100}%`,
              height: '100%',
              borderRadius: 4,
              background: `linear-gradient(90deg, ${GREEN}, ${CYAN})`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Slide 4: Advertising
function AdvertisingSlide() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0f172a 0%, #4a1d96 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ position: 'absolute', top: '20%', right: '20%' }}>
        <PulsingDot color={AMBER} size={20} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: PURPLE,
            fontFamily: 'monospace',
          }}
        >
          AI-POWERED ADVERTISING
        </div>
        <AccentBar color={PURPLE} delay={5} />
        <AnimatedText
          text="Target. Optimize. Convert."
          fontSize={62}
          delay={8}
        />
        <AnimatedText
          text="Faster Than Any Human Team"
          fontSize={36}
          color={AMBER}
          delay={22}
        />
      </div>
    </AbsoluteFill>
  )
}

// Slide 5: Results
function ResultsSlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0f172a 0%, #1e3a5f 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: AMBER,
            fontFamily: 'monospace',
          }}
        >
          PROVEN RESULTS
        </div>
        <AccentBar color={AMBER} delay={5} />
        <AnimatedText
          text="Measurable ROI in Weeks"
          fontSize={58}
          delay={8}
        />
        <div style={{ display: 'flex', gap: 60, marginTop: 20 }}>
          {[
            { value: '5.0', label: 'Client Rating', color: AMBER },
            { value: '16', label: 'Weeks to Readiness', color: CYAN },
            { value: '15+', label: 'Services', color: BLUE },
          ].map((stat, i) => {
            const s = spring({ frame: frame - 25 - i * 8, fps, config: { damping: 12 } })
            return (
              <div
                key={stat.label}
                style={{
                  opacity: s,
                  transform: `scale(${0.8 + s * 0.2})`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: stat.color,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Inter, sans-serif',
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}

// Slide 6: CTA
function CTASlide() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pulse = Math.sin(frame * 0.1) * 0.05 + 1
  const btnSpring = spring({ frame: frame - 30, fps, config: { damping: 12 } })
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${BLUE} 0%, #1e40af 50%, #1e3a8a 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <AnimatedText
          text="Start with a Free ACRA"
          fontSize={62}
          delay={5}
        />
        <AnimatedText
          text="Agentic Commerce Readiness Assessment"
          fontSize={28}
          color="rgba(255,255,255,0.75)"
          delay={15}
        />
        <div
          style={{
            marginTop: 24,
            opacity: btnSpring,
            transform: `scale(${pulse * btnSpring})`,
            padding: '20px 48px',
            borderRadius: 12,
            background: '#ffffff',
            color: BLUE,
            fontSize: 24,
            fontWeight: 800,
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 0 40px rgba(255,255,255,0.3)',
          }}
        >
          No Commitment. No Cost. →
        </div>
        <AnimatedText
          text="adamsilvaconsulting.com"
          fontSize={20}
          color="rgba(255,255,255,0.5)"
          delay={40}
        />
      </div>
    </AbsoluteFill>
  )
}

export const HeroAdVideo: React.FC<HeroAdProps> = () => {
  let offset = 0
  const slides = [
    { Component: HookSlide, dur: hookDur },
    { Component: AgentsSlide, dur: agentsDur },
    { Component: LeadGenSlide, dur: leadgenDur },
    { Component: AdvertisingSlide, dur: adsDur },
    { Component: ResultsSlide, dur: resultsDur },
    { Component: CTASlide, dur: ctaDur },
  ]

  return (
    <AbsoluteFill style={{ background: '#0f172a' }}>
      <Audio src={staticFile('audio/hero-ad-narration.mp3')} />
      {slides.map(({ Component, dur }, i) => {
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
