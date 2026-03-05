'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play, Volume2, Pause } from 'lucide-react'

interface Props {
  heroImage: string
  serviceName: string
  audioSrc: string
  accentColor: string
}

export function VideoShowcase({ heroImage, serviceName, audioSrc, accentColor }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

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

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause() } else { audio.play() }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  return (
    <section className="section relative overflow-hidden" aria-label={`${serviceName} visual overview`}>
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, ${accentColor} 4%, transparent), transparent)`,
        }}
      />

      <div className="container relative" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div
            className="text-center mb-8 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="enterprise-eyebrow justify-center">
              <span className="section-label" style={{ color: accentColor }}>
                How It Works
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display tracking-tight">
              See It in Action
            </h2>
          </div>

          {/* Visual showcase card */}
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
                adamsilvaconsulting.com/services/{serviceName.toLowerCase().replace(/\s+/g, '-')}
              </div>
            </div>

            {/* Image */}
            <div className="relative bg-[var(--color-surface)]">
              <Image
                src={heroImage}
                alt={`${serviceName} — system architecture and workflow`}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />

              {/* Gradient overlay at bottom for audio player */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.03))',
                }}
              />
            </div>

            {/* Integrated audio player */}
            <div
              className="px-5 py-4 flex items-center gap-4"
              style={{
                background: `color-mix(in srgb, ${accentColor} 4%, var(--color-surface))`,
                borderTop: `1px solid color-mix(in srgb, ${accentColor} 10%, transparent)`,
              }}
            >
              <audio
                ref={audioRef}
                src={audioSrc}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => { setIsPlaying(false); setProgress(0) }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (audioRef.current) setDuration(audioRef.current.duration)
                }}
              />

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110"
                style={{
                  background: accentColor,
                  boxShadow: `0 2px 12px color-mix(in srgb, ${accentColor} 30%, transparent)`,
                }}
                aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
              >
                {isPlaying ? (
                  <Pause size={14} fill="#fff" stroke="#fff" />
                ) : (
                  <Play size={14} fill="#fff" stroke="#fff" className="ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Volume2 size={12} style={{ color: accentColor }} />
                    <span className="text-xs font-semibold text-[var(--color-text)]">
                      Listen: {serviceName} Overview
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--color-muted-2)] font-mono">
                    {duration > 0 ? formatTime((progress / 100) * duration) + ' / ' + formatTime(duration) : ''}
                  </span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden cursor-pointer"
                  style={{ background: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
                  onClick={handleSeek}
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{ width: `${progress}%`, background: accentColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
