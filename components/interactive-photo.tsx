"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface InteractivePhotoProps {
  src: string
  alt: string
  className?: string
}

export default function InteractivePhoto({ src, alt, className }: InteractivePhotoProps) {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // State - initialize everything to false for SSR
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Add hover event listeners
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const container = containerRef.current

    // Only add hover listeners on desktop
    if (!isMobile) {
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)

      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [mounted, isMobile])

  // Matrix animation effect
  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Matrix code parameters
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?"

    // Animation variables
    let animationId: number
    let isRunning = false

    // Animation function
    const animate = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green text
      ctx.fillStyle = "#0fa"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(char, x, y)

        // Reset drop or move it down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      if (isRunning) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Start/stop animation
    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true
        animate()
      }
    }

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false
        cancelAnimationFrame(animationId)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Control animation based on hover state or mobile
    if (isMobile || isHovered) {
      startAnimation()
    } else {
      stopAnimation()
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationId)
      stopAnimation()
    }
  }, [mounted, isHovered, isMobile])

  // Server-side or initial client render
  if (!mounted) {
    return (
      <div className="relative">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={400}
            height={400}
            priority={true}
            className={`w-full h-auto filter grayscale ${className}`}
          />
        </div>
      </div>
    )
  }

  // Client-side render with full functionality
  return (
    <div ref={containerRef} className={`relative group ${isMobile ? "" : "cursor-pointer"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-40 pointer-events-none" />
      <div className="relative">
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur ${
            isMobile ? "opacity-70 animate-pulse" : "opacity-50 group-hover:opacity-100 transition duration-1000"
          }`}
        ></div>
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={400}
            height={400}
            priority={true}
            className={`w-full h-auto filter ${
              isMobile ? "grayscale-[50%]" : "grayscale hover:grayscale-0 transition-all duration-500"
            } ${className}`}
          />
        </div>
      </div>
    </div>
  )
}
