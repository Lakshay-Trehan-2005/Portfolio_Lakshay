"use client"

import { useEffect, useRef } from "react"

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 2 // Just cover visible area plus some extra
    }

    resizeCanvas()

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)

    // Binary strings - reduce the number
    const binaryStrings: { x: number; y: number; opacity: number; speed: number; text: string }[] = []

    // Generate binary strings - fewer elements
    for (let i = 0; i < 25; i++) {
      const text = Array.from({ length: 8 }, () => Math.round(Math.random())).join("")
      binaryStrings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0.05 + Math.random() * 0.05, // Lower opacity
        speed: 0.3 + Math.random() * 0.7, // Slower speed
        text,
      })
    }

    // Animation variables
    let lastScrollY = window.scrollY
    let scrollDirection = 0
    let ticking = false

    // Handle scroll with throttling
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          scrollDirection = currentScrollY - lastScrollY > 0 ? 1 : -1
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Animation loop with frame limiting
    let animationFrameId: number
    let lastTime = 0
    const fps = 24 // Lower FPS for better performance
    const fpsInterval = 1000 / fps

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // Throttle the frame rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw binary strings
      binaryStrings.forEach((string) => {
        // Move based on scroll direction
        string.y += string.speed * scrollDirection

        // Reset position if out of bounds
        if (string.y > canvas.height) {
          string.y = 0
          string.x = Math.random() * canvas.width
        } else if (string.y < 0) {
          string.y = canvas.height
          string.x = Math.random() * canvas.width
        }

        // Draw text
        ctx.font = "12px monospace"
        ctx.fillStyle = `rgba(0, 255, 200, ${string.opacity})`
        ctx.fillText(string.text, string.x, string.y)

        // Occasionally change the binary string (less frequently)
        if (Math.random() < 0.005) {
          string.text = Array.from({ length: 8 }, () => Math.round(Math.random())).join("")
        }
      })
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
      style={{ transform: "translateZ(0)" }} // Hardware acceleration
    />
  )
}
