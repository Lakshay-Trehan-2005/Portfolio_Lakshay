"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchFactor?: number
}

export default function GlitchText({ text, className, glitchFactor = 0.3 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initial glitch effect on load
    const initialDelay = setTimeout(() => {
      triggerGlitch()
    }, 1000)

    // Set up random glitch intervals
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchFactor) {
        triggerGlitch()
      }
    }, 3000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(glitchInterval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [glitchFactor])

  const triggerGlitch = () => {
    setIsGlitching(true)

    // Reset glitch state after a short duration
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, 200)
  }

  return (
    <div className={cn("relative inline-block", className)} onMouseEnter={() => triggerGlitch()}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      <span
        className={cn(
          "absolute left-0 top-0 text-cyan-400 clip-path-glitch-1 z-0",
          isGlitching ? "animate-glitch-1" : "opacity-0",
        )}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className={cn(
          "absolute left-0 top-0 text-purple-500 clip-path-glitch-2 z-0",
          isGlitching ? "animate-glitch-2" : "opacity-0",
        )}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  )
}
