"use client"

import { useEffect, useRef } from "react"

interface CodeRainProps {
  className?: string
}

export default function CodeRain({ className }: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)

    // Code rain parameters - fewer columns
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize / 2) // Half the number of columns
    const drops: number[] = []
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?"

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100)
    }

    // Animation loop with frame limiting
    let animationFrameId: number
    let lastTime = 0
    const fps = 24 // Lower FPS for better performance
    const fpsInterval = 1000 / fps

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw)

      // Throttle the frame rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      // Semi-transparent black background
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Vary color based on position
        const greenIntensity = Math.floor(255 * (1 - drops[i] / canvas.height))
        ctx.fillStyle = `rgba(0, ${greenIntensity}, ${greenIntensity / 2}, 0.8)`

        // Position and draw the character
        ctx.fillText(text, i * fontSize * 2, drops[i] * fontSize) // Double spacing

        // Move drop down
        drops[i] += 0.5 // Slower fall speed

        // Reset drop position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -100)
        }
      }
    }

    // Start animation
    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full absolute inset-0 ${className}`}
      style={{ transform: "translateZ(0)" }} // Hardware acceleration
    />
  )
}
