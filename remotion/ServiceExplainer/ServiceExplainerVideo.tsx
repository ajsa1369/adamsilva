import { AbsoluteFill, Sequence, Audio, useVideoConfig, spring, useCurrentFrame, interpolate, staticFile } from 'remotion'
import { COLORS } from '../shared/colors'

export interface ServiceExplainerProps {
  serviceName: string
  description: string
  features: string[]
  uniqueInsight?: string
  accentColor: string
  serviceSlug: string
  audioSrc?: string
}

const LOGO_SRC = staticFile('images/logo-clear.png')

function IntroSlide({ serviceName, description, accentColor }: {
  serviceName: string
  description: string
  accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const slideUp = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #000000 0%, #111111 50%, ${accentColor} 100%)`,
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
        src={LOGO_SRC}
        alt="Adam Silva Consulting"
        style={{ height: 80, marginBottom: 32 }}
      />
      <div style={{
        background: `${accentColor}33`,
        border: `1px solid ${accentColor}66`,
        borderRadius: 999,
        padding: '8px 20px',
        color: accentColor,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '0.08em',
        marginBottom: 28,
        textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
      }}>
        Service Overview
      </div>
      <h1 style={{
        color: COLORS.text,
        fontSize: 56,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.15,
        marginBottom: 24,
        maxWidth: 900,
        fontFamily: 'Inter, sans-serif',
      }}>
        {serviceName}
      </h1>
      <p style={{
        color: COLORS.muted,
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: 700,
        fontFamily: 'Inter, sans-serif',
      }}>
        {description}
      </p>
    </AbsoluteFill>
  )
}

function FeatureSlide({ feature, index, total, accentColor }: {
  feature: string
  index: number
  total: number
  accentColor: string
}) {
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
          background: accentColor,
        }} />
      </div>

      {/* Logo watermark top-right */}
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

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
        transform: `translateX(${slideIn}px)`,
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 20,
          fontWeight: 800,
        }}>
          {index + 1}
        </div>
        <span style={{
          color: COLORS.muted2,
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Feature {index + 1} of {total}
        </span>
      </div>

      <p style={{
        color: COLORS.text,
        fontSize: 44,
        fontWeight: 700,
        lineHeight: 1.3,
        fontFamily: 'Inter, sans-serif',
        maxWidth: 900,
        transform: `translateX(${slideIn}px)`,
      }}>
        {feature}
      </p>

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

function InsightSlide({ insight, accentColor }: {
  insight: string
  accentColor: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })
  const scaleIn = interpolate(frame, [0, 20], [0.92, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.surface2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 100px',
        opacity: fadeIn,
        transform: `scale(${scaleIn})`,
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

      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: `${accentColor}22`,
        border: `2px solid ${accentColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        fontSize: 28,
      }}>
        💡
      </div>
      <div style={{
        color: accentColor,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 20,
        fontFamily: 'Inter, sans-serif',
      }}>
        Key Insight
      </div>
      <p style={{
        color: COLORS.text,
        fontSize: 36,
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.4,
        maxWidth: 800,
        fontFamily: 'Inter, sans-serif',
      }}>
        {insight}
      </p>
    </AbsoluteFill>
  )
}

function CTASlide({ serviceName, accentColor, serviceSlug }: {
  serviceName: string
  accentColor: string
  serviceSlug: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const fadeIn = spring({ frame, fps, config: { damping: 20 } })

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeIn,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="Adam Silva Consulting"
        style={{ height: 80, marginBottom: 32 }}
      />
      <h2 style={{
        color: '#ffffff',
        fontSize: 48,
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.2,
        fontFamily: 'Inter, sans-serif',
        marginBottom: 16,
      }}>
        Ready to Get Started?
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.85)',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        marginBottom: 40,
      }}>
        {serviceName}
      </p>
      <div style={{
        background: '#ffffff',
        color: '#000',
        padding: '16px 40px',
        borderRadius: 12,
        fontSize: 20,
        fontWeight: 800,
        fontFamily: 'Inter, sans-serif',
      }}>
        adamsilvaconsulting.com/services/{serviceSlug}
      </div>
    </AbsoluteFill>
  )
}

export function ServiceExplainerVideo({
  serviceName,
  description,
  features,
  uniqueInsight,
  accentColor,
  serviceSlug,
  audioSrc,
}: ServiceExplainerProps) {
  const { fps, durationInFrames } = useVideoConfig()
  const introDuration = fps * 5
  const featureDuration = fps * 4
  const insightDuration = uniqueInsight ? fps * 5 : 0
  const maxFeatures = Math.min(features.length, 6)
  const ctaFrom = introDuration + maxFeatures * featureDuration + insightDuration
  const ctaDuration = Math.max(fps * 4, durationInFrames - ctaFrom)

  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Narration audio track — plays across the entire video */}
      {audioSrc && (
        <Audio src={audioSrc} volume={1} />
      )}

      <Sequence from={0} durationInFrames={introDuration}>
        <IntroSlide
          serviceName={serviceName}
          description={description}
          accentColor={accentColor}
        />
      </Sequence>

      {features.slice(0, maxFeatures).map((feature, i) => (
        <Sequence
          key={i}
          from={introDuration + i * featureDuration}
          durationInFrames={featureDuration}
        >
          <FeatureSlide
            feature={feature}
            index={i}
            total={maxFeatures}
            accentColor={accentColor}
          />
        </Sequence>
      ))}

      {uniqueInsight && (
        <Sequence
          from={introDuration + maxFeatures * featureDuration}
          durationInFrames={insightDuration}
        >
          <InsightSlide insight={uniqueInsight} accentColor={accentColor} />
        </Sequence>
      )}

      <Sequence
        from={ctaFrom}
        durationInFrames={ctaDuration}
      >
        <CTASlide
          serviceName={serviceName}
          accentColor={accentColor}
          serviceSlug={serviceSlug}
        />
      </Sequence>
    </AbsoluteFill>
  )
}
