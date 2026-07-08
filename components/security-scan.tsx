"use client"

import { useEffect, useRef } from "react"
import { Shield, Lock, AlertCircle, CheckCircle } from "lucide-react"

export default function SecurityScan() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.offsetWidth
    const height = container.offsetHeight

    // Reduce the number of elements created
    const maxElements = 15 // Fewer elements
    let activeElements = 0

    // Create security elements less frequently
    const createSecurityElement = () => {
      if (activeElements >= maxElements) return

      const elements = [Shield, Lock, AlertCircle, CheckCircle]
      const ElementComponent = elements[Math.floor(Math.random() * elements.length)]

      const element = document.createElement("div")
      element.className = "absolute text-cyan-400/30 animate-float"
      element.style.left = `${Math.random() * width}px`
      element.style.top = `${Math.random() * height}px`
      element.style.animationDuration = `${5 + Math.random() * 5}s` // Slower animation
      element.style.transform = `scale(${0.5 + Math.random() * 1.5})`

      // Create SVG icon
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "24")
      svg.setAttribute("height", "24")
      svg.setAttribute("viewBox", "0 0 24 24")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "currentColor")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      svg.setAttribute("stroke-linejoin", "round")

      // Add the appropriate path based on the icon
      if (ElementComponent === Shield) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")
        svg.appendChild(path)
      } else if (ElementComponent === Lock) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", "3")
        rect.setAttribute("y", "11")
        rect.setAttribute("width", "18")
        rect.setAttribute("height", "11")
        rect.setAttribute("rx", "2")
        rect.setAttribute("ry", "2")
        svg.appendChild(rect)

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", "M7 11V7a5 5 0 0 1 10 0v4")
        svg.appendChild(path)
      } else if (ElementComponent === AlertCircle) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", "12")
        circle.setAttribute("cy", "12")
        circle.setAttribute("r", "10")
        svg.appendChild(circle)

        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line1.setAttribute("x1", "12")
        line1.setAttribute("y1", "8")
        line1.setAttribute("x2", "12")
        line1.setAttribute("y2", "12")
        svg.appendChild(line1)

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line2.setAttribute("x1", "12")
        line2.setAttribute("y1", "16")
        line2.setAttribute("x2", "12.01")
        line2.setAttribute("y2", "16")
        svg.appendChild(line2)
      } else if (ElementComponent === CheckCircle) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", "M22 11.08V12a10 10 0 1 1-5.93-9.14")
        svg.appendChild(path)

        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        polyline.setAttribute("points", "22 4 12 14.01 9 11.01")
        svg.appendChild(polyline)
      }

      element.appendChild(svg)
      container.appendChild(element)
      activeElements++

      // Remove element after animation
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element)
          activeElements--
        }
      }, 7000)
    }

    // Create binary code elements less frequently
    const createBinaryElement = () => {
      if (activeElements >= maxElements) return

      const element = document.createElement("div")
      element.className = "absolute text-green-400/20 font-mono text-xs animate-float"
      element.style.left = `${Math.random() * width}px`
      element.style.top = `${Math.random() * height}px`
      element.style.animationDuration = `${5 + Math.random() * 5}s` // Slower animation

      // Generate random binary string
      let binary = ""
      for (let i = 0; i < 8; i++) {
        binary += Math.round(Math.random())
      }
      element.textContent = binary

      container.appendChild(element)
      activeElements++

      // Remove element after animation
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element)
          activeElements--
        }
      }, 7000)
    }

    // Create elements at intervals - less frequently
    const securityInterval = setInterval(createSecurityElement, 1200) // Slower interval
    const binaryInterval = setInterval(createBinaryElement, 800) // Slower interval

    return () => {
      clearInterval(securityInterval)
      clearInterval(binaryInterval)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />
}
