// Inline SVG logo — theme-aware via CSS classes in globals.css
// (.logo-text-primary / .logo-text-blue / .logo-tagline)

interface LogoSvgProps {
  className?: string
  showTagline?: boolean
}

export function LogoSvg({ className = '', showTagline = true }: LogoSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 950 ${showTagline ? 262 : 185}`}
      aria-label="Adam Silva Consulting"
      role="img"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <style>{`
          .logo-quad {
            animation: logoScaleIn 0.8s cubic-bezier(0.175,0.885,0.32,1.275) both;
          }
          .logo-q1 { transform-origin: 68px 68px; animation-delay: 0.1s; }
          .logo-q2 { transform-origin: 172px 68px; animation-delay: 0.2s; }
          .logo-q3 { transform-origin: 68px 172px; animation-delay: 0.3s; }
          .logo-q4 { transform-origin: 172px 172px; animation-delay: 0.4s; }
          .logo-white-center {
            transform-origin: 120px 120px;
            animation: logoScaleInFade 0.8s cubic-bezier(0.2,0.8,0.2,1) 0.6s both;
          }
          .logo-trace {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: logoDrawLine 1.5s cubic-bezier(0.4,0,0.2,1) both;
          }
          .logo-trace-circle {
            opacity: 0;
            animation: logoPopIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both;
          }
          .logo-t1 { animation-delay: 0.8s; }
          .logo-t2 { animation-delay: 1.0s; }
          .logo-t3 { animation-delay: 1.2s; }
          .logo-arrow {
            opacity: 0;
            animation: logoSlideUpFade 1s cubic-bezier(0.2,0.8,0.2,1) both;
          }
          .logo-a1 { animation-delay: 1.5s; }
          .logo-a2 { animation-delay: 1.7s; }
          .logo-text-reveal {
            opacity: 0;
            animation: logoSlideLeftFade 1.2s cubic-bezier(0.2,0.8,0.2,1) both;
          }
          .logo-txt1 { animation-delay: 0.7s; }
          .logo-txt2 { animation-delay: 0.9s; }
          .logo-txt3 { animation-delay: 1.1s; }
          @keyframes logoScaleIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes logoScaleInFade {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes logoDrawLine {
            100% { stroke-dashoffset: 0; }
          }
          @keyframes logoPopIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes logoSlideUpFade {
            0% { opacity: 0; transform: translateY(25px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes logoSlideLeftFade {
            0% { opacity: 0; transform: translateX(30px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}</style>
        <clipPath id="logo-clip">
          <rect x="20" y="20" width="200" height="200" rx="45" />
        </clipPath>
      </defs>

      {/* ── Icon ── */}
      <g clipPath="url(#logo-clip)">
        <rect x="20" y="20" width="200" height="200" fill="#ffffff" />
        <rect className="logo-quad logo-q1" x="20" y="20" width="96" height="96" fill="#0d243f" />
        <rect className="logo-quad logo-q2" x="124" y="20" width="96" height="96" fill="#5c95bd" />
        <rect className="logo-quad logo-q3" x="20" y="124" width="96" height="96" fill="#81b6d7" />
        <rect className="logo-quad logo-q4" x="124" y="124" width="96" height="96" fill="#a5d2eb" />
        <circle className="logo-white-center" cx="120" cy="120" r="42" fill="#ffffff" />

        {/* Circuit traces */}
        <g fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          <path className="logo-trace logo-t1" d="M 64 60 L 85 60 L 105 80 L 116 80" />
          <circle className="logo-trace-circle logo-t1" cx="60" cy="60" r="5" />
          <path className="logo-trace logo-t2" d="M 55 80 L 55 105" />
          <path className="logo-trace logo-t2" d="M 70 90 L 70 100" />
          <path className="logo-trace logo-t2" d="M 85 100 L 95 100 L 105 110 L 116 110" />
          <path className="logo-trace logo-t1" d="M 64 176 L 90 150" />
          <circle className="logo-trace-circle logo-t1" cx="60" cy="180" r="5" />
          <path className="logo-trace logo-t3" d="M 85 180 L 105 180" />
          <path className="logo-trace logo-t3" d="M 85 195 L 105 195" />
          <path className="logo-trace logo-t3" d="M 116 145 L 105 145 L 105 165 L 116 165" />
          <path className="logo-trace logo-t2" d="M 124 140 L 140 140 L 160 160 L 170 160" />
          <circle className="logo-trace-circle logo-t2" cx="175" cy="160" r="5" />
          <path className="logo-trace logo-t3" d="M 124 165 L 130 165 L 145 180 L 155 180" />
          <circle className="logo-trace-circle logo-t3" cx="160" cy="180" r="5" />
        </g>

        {/* Center arrows */}
        <g transform="rotate(45 120 120)">
          <g className="logo-arrow logo-a1">
            <line x1="120" y1="162" x2="120" y2="120" stroke="#0d243f" strokeWidth="11" strokeLinecap="round" />
            <polygon points="120,90 102,125 138,125" fill="#0d243f" />
          </g>
          <g className="logo-arrow logo-a2">
            <polygon points="120,20 82,75 158,75" fill="#81b6d7" />
          </g>
        </g>
      </g>

      {/* ── Text ── */}
      <text
        x="250" y="95"
        fontSize="78"
        fontWeight="800"
        fontFamily="var(--font-display), 'Roboto Condensed', sans-serif"
        letterSpacing="-0.5"
        className="logo-text-reveal logo-txt1 logo-text-primary"
      >
        ADAM SILVA
      </text>
      <text
        x="250" y="172"
        fontSize="78"
        fontWeight="800"
        fontFamily="var(--font-display), 'Roboto Condensed', sans-serif"
        letterSpacing="0"
        className="logo-text-reveal logo-txt2 logo-text-blue"
        fill="#5c95bd"
      >
        CONSULTING
      </text>
      {showTagline && (
        <text
          x="250" y="242"
          fontSize="42"
          fontWeight="500"
          fontFamily="var(--font-sans), 'Roboto', sans-serif"
          letterSpacing="1"
          className="logo-text-reveal logo-txt3 logo-tagline"
        >
          Global Infrastructure for Agentic Commerce
        </text>
      )}
    </svg>
  )
}
