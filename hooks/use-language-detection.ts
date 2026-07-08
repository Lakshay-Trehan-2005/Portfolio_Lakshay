"use client"

import { useState, useEffect } from "react"
import { detectLanguage } from "@/utils/geo-detection"
import type { Language } from "@/utils/translations"

interface UseLanguageDetectionResult {
  detectedLanguage: Language
  country: string | null
  isLoading: boolean
  source: string
  error: Error | null
}

export function useLanguageDetection(): UseLanguageDetectionResult {
  const [result, setResult] = useState<UseLanguageDetectionResult>({
    detectedLanguage: "en",
    country: null,
    isLoading: true,
    source: "initializing",
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const detectUserLanguage = async () => {
      try {
        // Add a small delay to prevent layout shifts
        // This is optional but improves user experience
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 300))

        const detection = await detectLanguage()
        await minLoadingTime

        if (isMounted) {
          setResult({
            detectedLanguage: detection.language,
            country: detection.country,
            isLoading: false,
            source: detection.source,
            error: null,
          })

          // Save to localStorage for future visits
          if (typeof window !== "undefined" && !localStorage.getItem("manuallySelected")) {
            localStorage.setItem("language", detection.language)
            if (detection.country) {
              localStorage.setItem("detectedCountry", detection.country)
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          setResult({
            detectedLanguage: "en", // Default to English on error
            country: null,
            isLoading: false,
            source: "error-fallback",
            error: error instanceof Error ? error : new Error("Unknown error"),
          })
        }
      }
    }

    detectUserLanguage()

    return () => {
      isMounted = false
    }
  }, [])

  return result
}
