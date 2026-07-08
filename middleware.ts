import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of German-speaking countries (ISO codes)
const GERMAN_SPEAKING_COUNTRIES = ["DE", "AT", "CH", "LI", "LU"]

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static assets
  if (
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  // Check if user already has a language preference
  const languageCookie = request.cookies.get("language")?.value
  const manuallySelectedCookie = request.cookies.get("manuallySelected")?.value

  // If user has manually selected a language, respect that choice
  if (languageCookie && manuallySelectedCookie === "true") {
    return response
  }

  // Get country from Vercel's geo headers (only works in production)
  const country = request.geo?.country || "UNKNOWN"

  // Set language based on country
  const language = GERMAN_SPEAKING_COUNTRIES.includes(country) ? "de" : "en"

  // Set cookies with a 30-day expiration
  response.cookies.set("language", language, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })

  response.cookies.set("detectedCountry", country, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
