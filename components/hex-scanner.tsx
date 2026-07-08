"use client"

import { useEffect, useRef } from "react"

interface HexScannerProps {
  className?: string
}

export default function HexScanner({ className }: HexScannerProps) {
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

    // Hex grid parameters - larger hexagons, fewer of them
    const hexSize = 20
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalOffset = hexHeight * 0.75
    const hexHorizontalOffset = hexWidth * 0.5

    // Grid cells - store fewer cells
    const gridCells: { x: number; y: number; active: boolean; opacity: number; hex: string }[] = []

    // Initialize grid
    const initGrid = () => {
      gridCells.length = 0

      const cols = Math.ceil(canvas.width / hexHorizontalOffset / 2) + 1 // Fewer columns
      const rows = Math.ceil(canvas.height / hexVerticalOffset / 2) + 1 // Fewer rows

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offset = row % 2 === 0 ? 0 : hexHorizontalOffset / 2
          const x = col * hexHorizontalOffset * 2 + offset // More spacing
          const y = row * hexVerticalOffset * 2 // More spacing

          gridCells.push({
            x,
            y,
            active: false,
            opacity: 0,
            hex: getRandomHex(),
          })
        }
      }
    }

    // Get random hex value
    const getRandomHex = () => {
      const hex = "0123456789ABCDEF"
      return hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)]
    }

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, opacity: number, hex: string) => {
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

      ctx.strokeStyle = `rgba(0, 255, 200, ${opacity * 0.5})`
      ctx.lineWidth = 1
      ctx.stroke()

      if (opacity > 0.5) {
        ctx.font = "8px monospace"
        ctx.fillStyle = `rgba(0, 255, 200, ${opacity})`
        ctx.fillText(hex, x - 6, y + 3)
      }
    }

    // Scan line parameters
    let scanY = 0
    let scanDirection = 1

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

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update scan line
      scanY += scanDirection * 2 // Slower scan
      if (scanY > canvas.height) {
        scanDirection = -1
      } else if (scanY < 0) {
        scanDirection = 1
      }

      // Draw scan line
      const gradient = ctx.createLinearGradient(0, scanY - 5, 0, scanY + 5)
      gradient.addColorStop(0, "rgba(0, 255, 200, 0)")
      gradient.addColorStop(0.5, "rgba(0, 255, 200, 0.2)")
      gradient.addColorStop(1, "rgba(0, 255, 200, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 5, canvas.width, 10)

      // Update grid cells
      gridCells.forEach((cell) => {
        // Activate cells near scan line
        if (Math.abs(cell.y - scanY) < 50) {
          cell.active = true
          cell.opacity = Math.max(cell.opacity, 1 - Math.abs(cell.y - scanY) / 50)

          // Occasionally change hex value (less frequently)
          if (Math.random() < 0.02) {
            cell.hex = getRandomHex()
          }
        } else {
          cell.opacity *= 0.95
          if (cell.opacity < 0.05) {
            cell.active = false
            cell.opacity = 0
          }
        }

        // Draw active cells
        if (cell.active) {
          drawHexagon(cell.x, cell.y, hexSize, cell.opacity, cell.hex)
        }
      })
    }

    initGrid()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ transform: "translateZ(0)" }} // Hardware acceleration
    />
  )
}
