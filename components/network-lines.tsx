"use client"

import { useEffect, useRef } from "react"

export default function NetworkLines() {
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

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }

    window.addEventListener("resize", handleResize)

    // Network nodes - reduce the number
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = []

    // Create fewer nodes
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
      })
    }

    // Animation variables
    let scrollY = window.scrollY
    let ticking = false

    // Handle scroll with throttling
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Animation loop with frame limiting
    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Lower FPS for better performance
    const fpsInterval = 1000 / fps

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      // Throttle the frame rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 255, 200, 0.5)"
        ctx.fill()

        // Connect nodes with lines if close enough - limit connections
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x
          const dy = nodes[j].y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 255, 200, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })

      // Adjust node speed based on scroll - less sensitive
      const scrollSpeed = Math.abs(scrollY - window.scrollY) * 0.005
      nodes.forEach((node) => {
        node.vx = (node.vx + (Math.random() - 0.5) * 0.005) * (1 + scrollSpeed)
        node.vy = (node.vy + (Math.random() - 0.5) * 0.005) * (1 + scrollSpeed)

        // Limit speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > 1) {
          // Lower max speed
          node.vx = (node.vx / speed) * 1
          node.vy = (node.vy / speed) * 1
        }
      })

      scrollY = window.scrollY
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
