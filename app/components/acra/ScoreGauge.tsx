'use client'

interface ScoreGaugeProps {
  score: number
  grade: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

function gradeColor(grade: string): string {
  switch (grade) {
    case 'A': return '#10b981'
    case 'B': return '#22c55e'
    case 'C': return '#f59e0b'
    case 'D': return '#f97316'
    default:  return '#ef4444'
  }
}

export function ScoreGauge({ score, grade, size = 'md', label }: ScoreGaugeProps) {
  const r = size === 'lg' ? 60 : size === 'sm' ? 36 : 48
  const strokeWidth = size === 'lg' ? 8 : size === 'sm' ? 5 : 6
  const cx = r + strokeWidth
  const cy = r + strokeWidth
  const viewBox = (r + strokeWidth) * 2

  // Arc: 270° sweep starting from top-left (–135°)
  const sweep = 270
  const startAngle = -225 // degrees from 3-o'clock
  const circumference = Math.PI * 2 * r
  const arcLength = (circumference * sweep) / 360
  const filled = (score / 100) * arcLength

  const toRad = (deg: number) => (deg * Math.PI) / 180
  const polarX = (angle: number) => cx + r * Math.cos(toRad(angle))
  const polarY = (angle: number) => cy + r * Math.sin(toRad(angle))

  const endAngle = startAngle + sweep
  const bgPath = describeArc(cx, cy, r, startAngle, endAngle)
  const fgAngle = startAngle + (score / 100) * sweep
  const fgPath = score > 0 ? describeArc(cx, cy, r, startAngle, fgAngle) : null

  const color = gradeColor(grade)
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 13 : 17
  const gradeFontSize = size === 'lg' ? 13 : size === 'sm' ? 8 : 10

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={viewBox} height={viewBox} viewBox={`0 0 ${viewBox} ${viewBox}`} aria-label={`Score: ${score}/100, Grade: ${grade}`}>
        {/* Track */}
        <path d={bgPath} fill="none" stroke="var(--color-surface-2)" strokeWidth={strokeWidth} strokeLinecap="round" />
        {/* Filled arc */}
        {fgPath && (
          <path d={fgPath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}66)` }} />
        )}
        {/* Score text */}
        <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle"
          fontSize={fontSize} fontWeight="700" fill={color} fontFamily="Roboto Condensed, sans-serif">
          {score}
        </text>
        {/* Grade badge */}
        <text x={cx} y={cy + fontSize * 0.9} textAnchor="middle" dominantBaseline="middle"
          fontSize={gradeFontSize} fontWeight="600" fill="var(--color-muted-2)" fontFamily="Roboto, sans-serif">
          Grade {grade}
        </text>
      </svg>
      {label && <span className="text-xs text-center text-[var(--color-muted-2)] leading-tight">{label}</span>}
    </div>
  )
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => (d * Math.PI) / 180
  const sx = cx + r * Math.cos(toRad(startDeg))
  const sy = cy + r * Math.sin(toRad(startDeg))
  const ex = cx + r * Math.cos(toRad(endDeg))
  const ey = cy + r * Math.sin(toRad(endDeg))
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`
}
