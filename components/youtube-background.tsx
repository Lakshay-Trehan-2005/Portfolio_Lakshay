"use client"

import { useEffect, useState, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface YouTubeBackgroundProps {
  className?: string
}

export default function YouTubeBackground({ className }: YouTubeBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useMobile()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract video IDs from URLs
  const desktopVideoId = "Eu56RQmhhhI" // From https://youtu.be/Eu56RQmhhhI
  const mobileVideoId = "L4paaGvBxH8" // From https://youtube.com/shorts/L4paaGvBxH8

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Add a delay to ensure the iframe loads properly
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [mounted])

  // Don't render on server side
  if (!mounted) {
    return (
      <div className={`absolute inset-0 bg-black ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
      </div>
    )
  }

  const videoId = isMobile ? mobileVideoId : desktopVideoId

  // YouTube embed parameters to hide controls and branding
  const embedParams = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId, // Required for looping
    controls: "0", // Hide controls
    showinfo: "0", // Hide video info
    rel: "0", // Don't show related videos
    iv_load_policy: "3", // Hide annotations
    modestbranding: "1", // Minimal YouTube branding
    disablekb: "1", // Disable keyboard controls
    fs: "0", // Disable fullscreen
    cc_load_policy: "0", // Disable captions
    playsinline: "1", // Play inline on mobile
    enablejsapi: "0", // Disable JS API
    origin: typeof window !== "undefined" ? window.location.origin : "",
  })

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${embedParams.toString()}`

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className={`absolute top-1/2 left-1/2 w-[300%] h-[300%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            objectFit: "cover",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          title="Background Video"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-purple-900/20"></div>

      {/* Fallback background for loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse"></div>
      )}

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #00ffff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #ff00ff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  )
}
