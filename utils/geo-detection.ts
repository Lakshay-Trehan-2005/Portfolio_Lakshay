// List of German-speaking countries (ISO codes)
export const GERMAN_SPEAKING_COUNTRIES = ["DE", "AT", "CH", "LI", "LU"]

// Type for geo-detection response
export type GeoDetectionResult = {
  country: string
  language: "en" | "de"
  source: string
  success: boolean
}

/**
 * Detects the user's country based on IP address using multiple services
 * with fallbacks for reliability
 */
export async function detectCountryFromIP(ip: string): Promise<GeoDetectionResult> {
  // Try multiple geo-location services for redundancy
  try {
    // Primary service: ipapi.co (free tier: 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (response.ok) {
      const data = await response.json()
      if (data && data.country) {
        const language = GERMAN_SPEAKING_COUNTRIES.includes(data.country) ? "de" : "en"
        return {
          country: data.country,
          language,
          source: "ipapi.co",
          success: true,
        }
      }
    }

    // Fallback service: ipinfo.io (free tier: 50,000 requests/month)
    const fallbackResponse = await fetch(`https://ipinfo.io/${ip}/json`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json()
      if (fallbackData && fallbackData.country) {
        const language = GERMAN_SPEAKING_COUNTRIES.includes(fallbackData.country) ? "de" : "en"
        return {
          country: fallbackData.country,
          language,
          source: "ipinfo.io",
          success: true,
        }
      }
    }

    // Last resort fallback: geojs.io (completely free)
    const lastResortResponse = await fetch(`https://get.geojs.io/v1/ip/country/${ip}.json`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (lastResortResponse.ok) {
      const lastResortData = await lastResortResponse.json()
      if (lastResortData && lastResortData.country) {
        const language = GERMAN_SPEAKING_COUNTRIES.includes(lastResortData.country) ? "de" : "en"
        return {
          country: lastResortData.country,
          language,
          source: "geojs.io",
          success: true,
        }
      }
    }
  } catch (error) {
    console.error("Error detecting geo-location:", error)
  }

  // Default fallback if all services fail
  return {
    country: "UNKNOWN",
    language: "en",
    source: "default",
    success: false,
  }
}

/**
 * Detects language based on browser settings
 */
export function detectLanguageFromBrowser(): "en" | "de" {
  if (typeof navigator === "undefined") return "en"

  // Check navigator.languages array first (more accurate)
  if (navigator.languages && navigator.languages.length) {
    for (const lang of navigator.languages) {
      if (lang.startsWith("de")) return "de"
    }
  }

  // Fallback to navigator.language
  return navigator.language.startsWith("de") ? "de" : "en"
}

/**
 * Comprehensive language detection with multiple fallbacks
 */
export async function detectLanguage(): Promise<{
  language: "en" | "de"
  country: string | null
  source: string
}> {
  // 1. Check localStorage first (user preference)
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language") as "en" | "de" | null
    const manuallySelected = localStorage.getItem("manuallySelected") === "true"
    const detectedCountry = localStorage.getItem("detectedCountry")

    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "de") && manuallySelected) {
      return {
        language: storedLanguage,
        country: detectedCountry,
        source: "user-preference",
      }
    }
  }

  // 2. Check cookies (set by middleware)
  if (typeof document !== "undefined") {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return null
    }

    const languageCookie = getCookie("language") as "en" | "de" | null
    const countryCookie = getCookie("detectedCountry")

    if (languageCookie && (languageCookie === "en" || languageCookie === "de")) {
      return {
        language: languageCookie,
        country: countryCookie || null,
        source: "middleware",
      }
    }
  }

  // 3. Try API-based detection (Client-side)
  try {
    const response = await fetch("https://ipapi.co/json/")
    if (response.ok) {
      const data = await response.json()
      if (data && data.country) {
        const language = GERMAN_SPEAKING_COUNTRIES.includes(data.country) ? "de" : "en"
        return {
          language,
          country: data.country,
          source: "api-ipapi.co",
        }
      }
    }

    const fallbackResponse = await fetch("https://get.geojs.io/v1/ip/country.json")
    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json()
      if (fallbackData && fallbackData.country) {
        const language = GERMAN_SPEAKING_COUNTRIES.includes(fallbackData.country) ? "de" : "en"
        return {
          language,
          country: fallbackData.country,
          source: "api-geojs.io",
        }
      }
    }
  } catch (error) {
    console.error("Error detecting geo-location on client:", error)
  }

  // 4. Fallback to browser language
  const browserLanguage = detectLanguageFromBrowser()
  return {
    language: browserLanguage,
    country: null,
    source: "browser",
  }
}
