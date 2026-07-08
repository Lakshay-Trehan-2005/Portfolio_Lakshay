"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])

  // Check if device supports hover (desktop)
  const [supportsHover, setSupportsHover] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSupportsHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (!mounted || !supportsHover) return

    let animationFrameId: number

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }

      // Use requestAnimationFrame for smooth cursor movement
      animationFrameId = requestAnimationFrame(() => {
        setPosition(newPosition)

        // Create trail effect
        createTrail(newPosition.x, newPosition.y)
      })
    }

    // Mouse down handler
    const handleMouseDown = () => {
      setIsClicking(true)
    }

    // Mouse up handler
    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Mouse enter handler for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement

      if (target.matches('a, button, input, textarea, select, [role="button"], .cursor-pointer')) {
        setIsHovering(true)
      }

      if (target.matches('input[type="text"], input[type="email"], textarea, [contenteditable]')) {
        setIsText(true)
      }

      if (target.matches('.loading, [data-loading="true"]')) {
        setIsLoading(true)
      }
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsText(false)
      setIsLoading(false)
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [mounted, supportsHover])

  // Create trail effect
  const createTrail = (x: number, y: number) => {
    if (!supportsHover) return

    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`

    document.body.appendChild(trail)

    // Remove trail after animation
    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail)
      }
    }, 500)
  }

  // Don't render on mobile or if not mounted
  if (!mounted || !supportsHover) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""} ${
        isText ? "text" : ""
      } ${isLoading ? "loading" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  )
}
