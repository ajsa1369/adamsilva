import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ASC Agentic Commerce Packages — Starter, Pro, Max, Elite'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const tiers = [
    { name: 'Starter', price: '$16K', highlighted: false },
    { name: 'Pro', price: '$28K', highlighted: false },
    { name: 'Max', price: '$48K', highlighted: true },
    { name: 'Elite', price: 'From $75K', highlighted: false },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f3e 100%)',
          fontFamily: 'system-ui, sans-serif',
          padding: '40px 60px',
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            Adam Silva Consulting
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#94a3b8',
              marginTop: '4px',
            }}
          >
            Global Infrastructure for Agentic Commerce
          </div>
        </div>

        {/* Tier Cards */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '32px',
            marginBottom: '32px',
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '220px',
                height: '200px',
                borderRadius: '16px',
                background: tier.highlighted
                  ? 'linear-gradient(180deg, #1e3a5f 0%, #0f1b33 100%)'
                  : 'linear-gradient(180deg, #151b2e 0%, #0d1020 100%)',
                border: tier.highlighted ? '2px solid #2563eb' : '1px solid #1e293b',
                boxShadow: tier.highlighted
                  ? '0 0 40px rgba(37, 99, 235, 0.35), 0 0 80px rgba(37, 99, 235, 0.15)'
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
                padding: '24px',
              }}
            >
              {tier.highlighted && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#ffffff',
                    background: '#2563eb',
                    padding: '3px 12px',
                    borderRadius: '20px',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: tier.highlighted ? '#60a5fa' : '#e2e8f0',
                  marginBottom: '8px',
                }}
              >
                {tier.name}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                {tier.price}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div
          style={{
            fontSize: 14,
            color: '#64748b',
            letterSpacing: '0.05em',
          }}
        >
          SSR Architecture · Zero Hydration Tax · Gold Standard Compliance
        </div>
      </div>
    ),
    { ...size }
  )
}
