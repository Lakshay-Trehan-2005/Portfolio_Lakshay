"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translations, type Language } from "@/utils/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
  detectedCountry: string | null
  isAutoDetected: boolean
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  isLoading: true,
  detectedCountry: null,
  isAutoDetected: false,
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(true)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const [isAutoDetected, setIsAutoDetected] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Translation function
  const t = useCallback(
    (key: string): string => {
      // @ts-ignore - We're using string keys dynamically
      return translations[language][key] || key
    },
    [language],
  )

  // Function to detect geo-location and set language
  const detectGeoLocation = useCallback(async () => {
    if (!mounted) return

    try {
      // First check if user has a saved preference
      const storedLanguage = localStorage.getItem("language") as Language
      const hasManuallySelected = localStorage.getItem("manuallySelected") === "true"

      if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de") && hasManuallySelected) {
        // User has manually selected a language before, respect that choice
        setLanguage(storedLanguage)
        setIsAutoDetected(false)
        setIsLoading(false)
        return
      }

      // Try to detect browser language as a fallback
      const browserLanguage = navigator.language.startsWith("de") ? "de" : "en"

      // Call our geo-detection API
      const response = await fetch("/api/geo-detect")

      if (response.ok) {
        const data = await response.json()
        setDetectedCountry(data.country)

        // If we have a stored language but it wasn't manually selected,
        // we can override it with the geo-detected one
        if (data.language) {
          setLanguage(data.language)
          setIsAutoDetected(true)
          localStorage.setItem("language", data.language)
          localStorage.setItem("detectedCountry", data.country)
        } else if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de")) {
          // Use stored language if geo-detection fails
          setLanguage(storedLanguage)
          setIsAutoDetected(false)
        } else {
          // Fall back to browser language
          setLanguage(browserLanguage)
          setIsAutoDetected(true)
          localStorage.setItem("language", browserLanguage)
        }
      } else {
        // API call failed, use stored language or browser language
        if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de")) {
          setLanguage(storedLanguage)
        } else {
          setLanguage(browserLanguage)
          localStorage.setItem("language", browserLanguage)
        }
        setIsAutoDetected(true)
      }
    } catch (error) {
      console.error("Error detecting language:", error)

      // Fallback to browser language in case of error
      if (mounted) {
        const browserLanguage = navigator.language.startsWith("de") ? "de" : "en"
        setLanguage(browserLanguage)
        setIsAutoDetected(true)
        localStorage.setItem("language", browserLanguage)
      }
    } finally {
      setIsLoading(false)
    }
  }, [mounted])

  // Custom setLanguage function that marks the selection as manual
  const handleSetLanguage = useCallback(
    (lang: Language) => {
      if (!mounted) return

      setLanguage(lang)
      setIsAutoDetected(false)
      localStorage.setItem("language", lang)
      localStorage.setItem("manuallySelected", "true")

      // Update the HTML lang attribute
      document.documentElement.lang = lang
    },
    [mounted],
  )

  // Initialize language detection on component mount
  useEffect(() => {
    if (mounted) {
      detectGeoLocation()
    }
  }, [detectGeoLocation, mounted])

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
    }
  }, [language, mounted])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        isLoading,
        detectedCountry,
        isAutoDetected,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext)
