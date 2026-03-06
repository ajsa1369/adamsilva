'use client'

import { useEffect, useRef, useState, lazy, Suspense } from 'react'

const LazyPlayer = lazy(() =>
  import('@remotion/player').then((mod) => ({ default: mod.Player }))
)

const accentColor = '#3b82f6'

export function ServicesVideoShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [VideoComponent, setVideoComponent] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    import('../../../remotion/ServicesOverview/ServicesOverviewVideo').then((mod) => {
      setVideoComponent(() => mod.ServicesOverviewVideo)
    })
  }, [])

  const fps = 30
  const durationInFrames = 900 // 30 seconds

  return (
    <section className="section relative overflow-hidden" aria-label="Services Visual Overview">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, ${accentColor} 4%, transparent), transparent)`,
        }}
      />

      <div className="container relative" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-8 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="enterprise-eyebrow justify-center">
              <span className="section-label" style={{ color: accentColor }}>
                Visual Overview
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight">
              The Agentic Commerce Infrastructure
            </h2>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
              transitionDelay: '200ms',
              border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
              boxShadow: `0 20px 60px color-mix(in srgb, ${accentColor} 10%, transparent), 0 0 0 1px color-mix(in srgb, ${accentColor} 8%, transparent)`,
            }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: `color-mix(in srgb, ${accentColor} 6%, var(--color-surface))`,
                borderBottom: `1px solid color-mix(in srgb, ${accentColor} 10%, transparent)`,
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div
                className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-[var(--color-muted-2)] font-mono"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                adamsilvaconsulting.com/services
              </div>
            </div>

            {/* Remotion Player */}
            <div className="relative bg-black aspect-video">
              {VideoComponent ? (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center bg-[#111]">
                    <div className="text-white/50 text-sm">Loading video...</div>
                  </div>
                }>
                  <LazyPlayer
                    component={VideoComponent}
                    durationInFrames={durationInFrames}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={fps}
                    style={{ width: '100%', height: '100%' }}
                    controls
                    autoPlay={false}
                  />
                </Suspense>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#111]">
                  <div className="text-white/50 text-sm">Loading video...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
