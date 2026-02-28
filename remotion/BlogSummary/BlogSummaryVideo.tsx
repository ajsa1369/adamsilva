import { AbsoluteFill, Sequence, useVideoConfig, spring, useCurrentFrame, interpolate } from 'remotion'
import { COLORS } from '../shared/colors'

export interface BlogSummaryProps {
  title: string
  excerpt: string
  keyPoints: string[]
  author?: string
  category?: string
  slug: string
  protocols?: ('UCP' | 'ACP' | 'AP2')[]
}

function TitleCard({ title, category, protocols = [] }: { title: string; category?: string; protocols?: string[] }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' })

  const protocolColors: Record<string, string> = {
    UCP: COLORS.ucp,
    ACP: COLORS.acp,
    AP2: COLORS.ap2,
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #000000 0%, #111111 50%, #1e40af 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
        transform: `translateY(${slideUp}px)`,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="https://www.adamsilvaconsulting.com/images/logo-clear.png"
          alt="Adam Silva Consulting"
          style={{ height: 48, filter: 'brightness(0) invert(1)' }}
        />
      </div>

      {/* Category badge */}
      {category && (
        <div style={{
          background: `${COLORS.accent}33`,
          border: `1px solid ${COLORS.accent}66`,
          borderRadius: 999,
          padding: '6px 16px',
          color: COLORS.accent,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.05em',
          marginBottom: 24,
          textTransform: 'uppercase',
        }}>
          {category}
        </div>
      )}

      {/* Title */}
      <h1 style={{
        color: COLORS.text,
        fontSize: 52,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.2,
        marginBottom: 24,
        maxWidth: 900,
        fontFamily: 'Inter, sans-serif',
      }}>
        {title}
      </h1>

      {/* Protocol badges */}
      {protocols.length > 0 && (
        <div style={{ display: 'flex', gap: 12 }}>
          {protocols.map(p => (
            <span key={p} style={{
              background: `${protocolColors[p] || COLORS.accent}33`,
              border: `1px solid ${protocolColors[p] || COLORS.accent}`,
              borderRadius: 999,
              padding: '4px 14px',
              color: protocolColors[p] || COLORS.accent,
              fontSize: 13,
              fontWeight: 700,
            }}>
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Tagline */}
      <p style={{
        color: COLORS.muted2,
        fontSize: 16,
        marginTop: 32,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        Global Infrastructure for Agentic Commerce
      </p>
    </AbsoluteFill>
  )
}

function KeyPointSlide({ point, index, total }: { point: string; index: number; total: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const fadeIn = spring({ frame, fps, config: { damping: 25, stiffness: 80 } })
  const slideIn = interpolate(frame, [0, 15], [40, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: COLORS.surface,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
      }}
    >
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: COLORS.border,
      }}>
        <div style={{
          height: '100%',
          width: `${((index + 1) / total) * 100}%`,
          background: COLORS.accent,
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Step indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
        transform: `translateX(${slideIn}px)`,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: COLORS.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: 800,
        }}>
          {index + 1}
        </div>
        <span style={{ color: COLORS.muted2, fontSize: 14, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Key Insight {index + 1} of {total}
        </span>
      </div>

      {/* Key point text */}
      <p style={{
        color: COLORS.text,
        fontSize: 42,
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Inter, sans-serif',
        maxWidth: 900,
        transform: `translateX(${slideIn}px)`,
      }}>
        {point}
      </p>

      {/* Logo watermark */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 40,
        color: COLORS.muted2,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>adamsilvaconsulting.com</span>
      </div>
    </AbsoluteFill>
  )
}

function CTASlide({ slug }: { slug: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)`,
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
        alt="Adam Silva Consulting"
        style={{ height: 56, filter: 'brightness(0) invert(1)', marginBottom: 32 }}
      />
      <h2 style={{
        color: '#ffffff',
        fontSize: 52,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.2,
        fontFamily: 'Inter, sans-serif',
        marginBottom: 16,
      }}>
        Global Infrastructure for Agentic Commerce
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.85)',
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
        padding: '16px 40px',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 800,
        fontFamily: 'Inter, sans-serif',
      }}>
        adamsilvaconsulting.com/insights/{slug}
      </div>
    </AbsoluteFill>
  )
}

export function BlogSummaryVideo({
  title,
  excerpt,
  keyPoints,
  author = 'Adam Silva',
  category,
  slug,
  protocols = [],
}: BlogSummaryProps) {
  const { fps } = useVideoConfig()
  const titleDuration = fps * 4
  const pointDuration = fps * 5
  const ctaDuration = fps * 4
  const totalKeyPoints = Math.min(keyPoints.length, 4)

  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Title card */}
      <Sequence from={0} durationInFrames={titleDuration}>
        <TitleCard title={title} category={category} protocols={protocols} />
      </Sequence>

      {/* Key point slides */}
      {keyPoints.slice(0, totalKeyPoints).map((point, i) => (
        <Sequence
          key={i}
          from={titleDuration + i * pointDuration}
          durationInFrames={pointDuration}
        >
          <KeyPointSlide point={point} index={i} total={totalKeyPoints} />
        </Sequence>
      ))}

      {/* CTA slide */}
      <Sequence
        from={titleDuration + totalKeyPoints * pointDuration}
        durationInFrames={ctaDuration}
      >
        <CTASlide slug={slug} />
      </Sequence>
    </AbsoluteFill>
  )
}
