"use client"

import { useEffect, useRef } from "react"

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    const resizeHandler = () => {
      // Debounce resize to improve performance
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }
    let resizeTimeout: NodeJS.Timeout

    window.addEventListener("resize", resizeHandler)

    // Matrix effect
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize) / 2 // Reduce number of columns by half

    // Track horizontal positions and vertical positions separately
    const drops: number[] = []
    const horizontalPos: number[] = []

    // Initialize drops and horizontal positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height)
      horizontalPos[i] = i * fontSize * 2 // More spacing between columns
    }

    // Characters to display
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    // Mouse position tracking
    let mouseX = -100
    let mouseY = -100
    const magnetRadius = 150 // Radius of magnetic influence

    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const mouseLeaveHandler = () => {
      mouseX = -100
      mouseY = -100
    }

    canvas.addEventListener("mousemove", mouseMoveHandler)
    canvas.addEventListener("mouseleave", mouseLeaveHandler)

    // Use requestAnimationFrame for smoother animation
    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Limit to 30 FPS for better performance
    const fpsInterval = 1000 / fps

    // Drawing function
    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw)

      // Throttle the frame rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      // Semi-transparent black background to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Calculate distance from mouse
        const x = horizontalPos[i]
        const y = drops[i] * fontSize
        const distX = mouseX - x
        const distY = mouseY - y
        const distance = Math.sqrt(distX * distX + distY * distY)

        // Apply magnetic attraction if within radius
        if (distance < magnetRadius) {
          // Strength of attraction (stronger when closer)
          const strength = (magnetRadius - distance) / magnetRadius

          // Move horizontal position toward mouse
          horizontalPos[i] += distX * 0.02 * strength // Reduced movement speed

          // Slow down vertical fall when near mouse
          drops[i] += 0.5 - strength * 0.3

          // Brighter color when affected by cursor
          ctx.fillStyle = `rgba(0, 255, 255, ${0.7 + strength * 0.3})`
        } else {
          // Normal fall speed
          drops[i] += 0.5 // Reduced fall speed

          // Gradually return to original horizontal position
          const originalX = i * fontSize * 2
          horizontalPos[i] += (originalX - horizontalPos[i]) * 0.03

          // Normal color
          ctx.fillStyle = Math.random() > 0.1 ? "#0ff" : "#0fa"
        }

        // Position and draw the character
        ctx.fillText(text, horizontalPos[i], y)

        // Reset drop position if it's at the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
          horizontalPos[i] = i * fontSize * 2 // Reset horizontal position too
        }
      }

      // Draw a subtle glow around the cursor when on canvas
      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 5, mouseX, mouseY, magnetRadius)
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.1)") // Reduced opacity
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, magnetRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Start animation
    animationFrameId = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeHandler)
      canvas.removeEventListener("mousemove", mouseMoveHandler)
      canvas.removeEventListener("mouseleave", mouseLeaveHandler)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-30 will-change-transform"
      style={{ transform: "translateZ(0)" }} // Hardware acceleration
    />
  )
}
