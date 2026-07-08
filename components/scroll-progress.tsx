"use client"

import { useEffect, useState, useCallback } from "react"
import { Lock, Unlock } from "lucide-react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLocked, setIsLocked] = useState(true)

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)

        // Toggle lock icon based on scroll progress
        if (progress > 75 && isLocked) {
          setIsLocked(false)
        } else if (progress < 75 && !isLocked) {
          setIsLocked(true)
        }

        ticking = false
      })
      ticking = true
    }
  }, [isLocked])

  let ticking = false

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      <div className="h-48 w-1 bg-gray-800 rounded-full relative">
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full transition-all duration-300 will-change-transform"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="mt-2 bg-gray-900 p-2 rounded-full border border-gray-700">
        {isLocked ? <Lock className="w-5 h-5 text-cyan-400" /> : <Unlock className="w-5 h-5 text-green-400" />}
      </div>

      <div className="mt-2 text-xs font-mono text-gray-400">{Math.round(scrollProgress)}%</div>
    </div>
  )
}
