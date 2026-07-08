"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  startDelay?: number
  className?: string
  cursorClassName?: string
  onComplete?: () => void
}

export default function TerminalText({
  text,
  typingSpeed = 50,
  startDelay = 500,
  className,
  cursorClassName,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Start typing after delay
    timeout = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          if (onComplete) onComplete()
        }
      }, typingSpeed)

      return () => clearInterval(typeInterval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, typingSpeed, startDelay, onComplete])

  // Blinking cursor effect
  useEffect(() => {
    if (!isTyping && displayedText === text) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [isTyping, displayedText, text])

  return (
    <div className={cn("font-mono", className)}>
      {displayedText}
      <span
        className={cn(
          "inline-block w-2 h-4 ml-0.5 bg-cyan-400",
          showCursor ? "opacity-100" : "opacity-0",
          cursorClassName,
        )}
      />
    </div>
  )
}
