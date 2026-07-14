import { type NextRequest, NextResponse } from "next/server"

// Define the response type
type GeoResponse = {
  country: string
  language: "en" | "de"
  source: string
}

// List of German-speaking countries (ISO codes)
const GERMAN_SPEAKING_COUNTRIES = ["DE", "AT", "CH", "LI", "LU"]

export async function GET(request: NextRequest) {
  // Get client IP address from headers
  const forwardedFor = request.headers.get("x-forwarded-for")
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1"

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
        return NextResponse.json({
          country: data.country,
          language,
          source: "ipapi.co",
        } as GeoResponse)
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
        return NextResponse.json({
          country: fallbackData.country,
          language,
          source: "ipinfo.io",
        } as GeoResponse)
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
        return NextResponse.json({
          country: lastResortData.country,
          language,
          source: "geojs.io",
        } as GeoResponse)
      }
    }
  } catch (error) {
    console.error("Error detecting geo-location:", error)
  }

  // Default fallback if all services fail
  return NextResponse.json({
    country: "UNKNOWN",
    language: "en",
    source: "default",
  } as GeoResponse)
}
