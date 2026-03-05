'use client'

import { useRef, useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

interface Props {
  src: string
  title: string
  accentColor: string
}

export function ServiceAudioPlayer({ src, title, accentColor }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  return (
    <div
      className="card p-4 flex items-center gap-4"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setProgress(0) }}
        onTimeUpdate={handleTimeUpdate}
      />

      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
        style={{ background: accentColor }}
        aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
      >
        {isPlaying ? (
          <Pause size={16} fill="#fff" stroke="#fff" />
        ) : (
          <Play size={16} fill="#fff" stroke="#fff" className="ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 size={12} style={{ color: accentColor }} />
          <span className="text-xs font-semibold text-[var(--color-text)] truncate">
            {title}
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, background: accentColor }}
          />
        </div>
      </div>
    </div>
  )
}
