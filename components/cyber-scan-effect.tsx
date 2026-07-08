"use client"

import { useEffect, useRef } from "react"

export default function CyberScanEffect() {
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

    // Scan line effect - simplified
    let scanLineY = 0
    let scanDirection = 1

    // Hexagonal grid parameters - fewer hexagons
    const hexSize = 40 // Larger hexagons
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalOffset = hexHeight * 0.75
    const hexHorizontalOffset = hexWidth * 0.5

    // Grid cells state - fewer cells
    const gridCells: { x: number; y: number; active: boolean; opacity: number }[] = []

    // Initialize grid with fewer cells
    const initGrid = () => {
      gridCells.length = 0

      const cols = Math.ceil(canvas.width / hexHorizontalOffset / 2) + 1
      const rows = Math.ceil(canvas.height / hexVerticalOffset / 2) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offset = row % 2 === 0 ? 0 : hexHorizontalOffset / 2
          const x = col * hexHorizontalOffset * 2 + offset
          const y = row * hexVerticalOffset * 2

          gridCells.push({
            x,
            y,
            active: false,
            opacity: 0,
          })
        }
      }
    }

    initGrid()

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const xPos = x + size * Math.cos(angle)
        const yPos = y + size * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          ctx.lineTo(xPos, yPos)
        }
      }
      ctx.closePath()

      ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.5})`
      ctx.lineWidth = 1
      ctx.stroke()

      if (Math.random() < 0.2 && opacity > 0.5) {
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.1})`
        ctx.fill()
      }
    }

    // Animation loop with frame limiting
    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Lower FPS for better performance
    const fpsInterval = 1000 / fps

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw)

      // Throttle the frame rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update scan line
      scanLineY += scanDirection * 3
      if (scanLineY > canvas.height) {
        scanDirection = -1
      } else if (scanLineY < 0) {
        scanDirection = 1
      }

      // Draw scan line
      const gradient = ctx.createLinearGradient(0, scanLineY - 10, 0, scanLineY + 10)
      gradient.addColorStop(0, "rgba(0, 255, 255, 0)")
      gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.2)")
      gradient.addColorStop(1, "rgba(0, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, scanLineY - 10, canvas.width, 20)

      // Update grid cells
      gridCells.forEach((cell) => {
        // Activate cells near scan line
        if (Math.abs(cell.y - scanLineY) < 100) {
          cell.active = true
          cell.opacity = Math.max(cell.opacity, 1 - Math.abs(cell.y - scanLineY) / 100)
        } else {
          cell.opacity *= 0.95
          if (cell.opacity < 0.05) {
            cell.active = false
            cell.opacity = 0
          }
        }

        // Draw active cells
        if (cell.active) {
          drawHexagon(cell.x, cell.y, hexSize, cell.opacity)
        }
      })
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
      className="absolute inset-0 z-0 opacity-30 pointer-events-none"
      style={{ transform: "translateZ(0)" }} // Hardware acceleration
    />
  )
}
