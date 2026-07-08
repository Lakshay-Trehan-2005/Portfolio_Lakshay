"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage, isLoading, detectedCountry, isAutoDetected, t } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)

    // Show tooltip after a delay to prevent it from showing on page load
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    if (mounted) {
      setLanguage(language === "en" ? "de" : "en")
    }
  }

  // Get country name from ISO code
  const getCountryName = (code: string) => {
    const countries: Record<string, string> = {
      DE: "Germany",
      AT: "Austria",
      CH: "Switzerland",
      LI: "Liechtenstein",
      LU: "Luxembourg",
      // Add more as needed
    }
    return countries[code] || code
  }

  // Server-side or initial client render
  if (!mounted) {
    return (
      <div className={cn("relative", className)}>
        <div className="relative group">
          <div className="relative bg-gray-900 p-1 rounded-full flex items-center justify-center border border-gray-700 overflow-hidden">
            <div className="relative flex items-center space-x-1 p-0.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden opacity-50">
                <div className="w-full h-full bg-gray-800"></div>
              </div>
              <div className="h-6 w-0.5 bg-gray-500 mx-0.5"></div>
              <div className="relative w-8 h-8 rounded-full overflow-hidden opacity-50">
                <div className="w-full h-full bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            {/* Sci-fi container with glow effect */}
            <div className="relative group cursor-pointer" onClick={toggleLanguage}>
              {/* Background glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-all duration-150"></div>

              {/* Main container */}
              <div className="relative bg-gray-900 p-1 rounded-full flex items-center justify-center border border-gray-700 overflow-hidden">
                {/* Flag container */}
                <div className="relative flex items-center space-x-1 p-0.5">
                  {/* UK Flag */}
                  <div
                    className={cn(
                      "relative w-8 h-8 rounded-full overflow-hidden transition-all duration-150",
                      language === "en"
                        ? "ring-2 ring-cyan-400 shadow-sm shadow-cyan-400/50"
                        : "opacity-50 hover:opacity-80",
                    )}
                  >
                    <Image
                      src="/images/uk-flag.png"
                      alt="English"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-6 w-0.5 bg-gray-500 mx-0.5"></div>

                  {/* German Flag */}
                  <div
                    className={cn(
                      "relative w-8 h-8 rounded-full overflow-hidden transition-all duration-150",
                      language === "de"
                        ? "ring-2 ring-purple-400 shadow-sm shadow-purple-400/50"
                        : "opacity-50 hover:opacity-80",
                    )}
                  >
                    <Image
                      src="/images/germany-flag.png"
                      alt="German"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Auto-detection indicator */}
              {isAutoDetected && showTooltip && (
                <div className="absolute -top-1 -right-1">
                  <Globe className="h-4 w-4 text-cyan-400" />
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gray-900 border-gray-700 text-gray-200">
            <div className="text-xs">
              {isLoading ? (
                <p>{t("language.detecting")}</p>
              ) : (
                <>
                  <p className="font-medium">
                    {language === "en" ? "English" : "Deutsch"}
                    {isAutoDetected && detectedCountry && (
                      <span className="text-gray-400"> ({t("language.detected")})</span>
                    )}
                  </p>
                  {detectedCountry && detectedCountry !== "UNKNOWN" && (
                    <p className="text-gray-400 mt-1">
                      {t("language.location")} {getCountryName(detectedCountry)}
                    </p>
                  )}
                  <p className="text-gray-400 mt-1">{t("language.switch")}</p>
                </>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
