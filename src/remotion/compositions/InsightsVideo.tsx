import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

// AI Iridescence color palette
const colors = {
  primary: '#00F5D4',    // Plasma Teal
  secondary: '#B9A7FF',  // Holo Lilac
  base: '#07070A',       // Void Black
};

interface InsightsVideoProps {
  title: string;
  subtitle: string;
  category: string;
  date: string;
}

export const InsightsVideo: React.FC<InsightsVideoProps> = ({
  title,
  subtitle,
  category,
  date
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation values
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [30, 60], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const categoryOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const gradientRotation = interpolate(frame, [0, durationInFrames], [0, 360]);

  const pulseScale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.02, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.base,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 20%, ${colors.primary}20 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, ${colors.secondary}20 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, ${colors.primary}10 0%, transparent 60%)
          `,
          transform: `rotate(${gradientRotation}deg) scale(${pulseScale})`,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${colors.primary}08 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}08 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
        }}
      />

      {/* Main content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 60px ${colors.primary}40`,
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        {/* Category badge */}
        <div
          style={{
            opacity: categoryOpacity,
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
              border: `1px solid ${colors.primary}50`,
              color: colors.primary,
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            maxWidth: '1400px',
            lineHeight: 1.1,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: '32px',
            textShadow: `0 0 40px ${colors.primary}40`,
          }}
        >
          {title}
        </h1>

        {/* Subtitle / Tagline */}
        <p
          style={{
            fontSize: '32px',
            fontWeight: 500,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            opacity: subtitleOpacity,
            marginBottom: '24px',
          }}
        >
          {subtitle}
        </p>

        {/* Date */}
        {date && (
          <p
            style={{
              fontSize: '20px',
              color: '#888',
              opacity: subtitleOpacity,
            }}
          >
            {date}
          </p>
        )}

        {/* Bottom branding bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: categoryOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '20px' }}>
                Adam Silva Consulting
              </div>
              <div style={{ color: colors.primary, fontSize: '14px' }}>
                adamsilvaconsulting.com
              </div>
            </div>
          </div>
          <div style={{ color: '#666', fontSize: '16px' }}>
            Global Infrastructure for Agentic Commerce
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
