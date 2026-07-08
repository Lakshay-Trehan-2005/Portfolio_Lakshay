"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
  // Start with false to avoid hydration mismatches
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side
    setIsClient(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  // Always return false during SSR to avoid hydration mismatches
  return isClient ? isMobile : false
}
