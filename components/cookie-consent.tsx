"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Cookie, Settings, Check, X, ExternalLink, ChevronUp, ChevronDown, AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"

interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  })

  // Check if consent has been given
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    const consentDate = localStorage.getItem("cookie-consent-date")

    // Show banner if no consent or consent is older than 12 months (GDPR requirement)
    if (!consent || !consentDate) {
      setIsVisible(true)
    } else {
      const consentTimestamp = Number.parseInt(consentDate)
      const twelveMonthsAgo = Date.now() - 365 * 24 * 60 * 60 * 1000

      if (consentTimestamp < twelveMonthsAgo) {
        setIsVisible(true)
      } else {
        // Load saved preferences
        try {
          const savedPreferences = JSON.parse(consent)
          setPreferences(savedPreferences)
        } catch (e) {
          setIsVisible(true)
        }
      }
    }
  }, [])

  // Save consent preferences
  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs))
    localStorage.setItem("cookie-consent-date", Date.now().toString())
    setPreferences(prefs)
    setIsVisible(false)

    // Trigger custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: prefs }))
  }

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    saveConsent(allAccepted)
  }

  // Reject all non-essential cookies
  const rejectAll = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    saveConsent(necessaryOnly)
  }

  // Accept only necessary cookies
  const acceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    saveConsent(essentialOnly)
  }

  // Save custom preferences
  const saveCustomPreferences = () => {
    saveConsent(preferences)
  }

  // Update individual preference
  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Translations
  const translations = {
    en: {
      title: "Cookie Notice",
      description:
        "We use cookies to enhance your experience and analyze site usage. By continuing, you consent to our cookie policy.",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      acceptEssential: "Essential Only",
      customize: "Customize",
      savePreferences: "Save Preferences",
      learnMore: "Learn More",

      // Expanded content
      expandedTitle: "Cookie Preferences",
      expandedDescription: "Choose which cookies you want to accept. You can change these settings at any time.",

      // Cookie categories
      necessary: "Essential Cookies",
      necessaryDesc: "Required for basic site functionality. Cannot be disabled.",

      functional: "Functional Cookies",
      functionalDesc: "Remember your preferences and enhance site features.",

      analytics: "Analytics Cookies",
      analyticsDesc: "Help us understand how you use our site to improve it.",

      marketing: "Marketing Cookies",
      marketingDesc: "Used to show you relevant ads and measure campaign effectiveness.",

      // Legal info
      gdprCompliant: "GDPR Compliant",
      dataController: "Data Controller: Lakshay Trehan",
      contact: "Contact: lakshaytrehan44@gmail.com",
      privacyPolicy: "Privacy Policy",

      // Status
      enabled: "Enabled",
      disabled: "Disabled",
      required: "Required",
    },
    de: {
      title: "Cookie-Hinweis",
      description:
        "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und die Website-Nutzung zu analysieren. Durch Fortfahren stimmen Sie unserer Cookie-Richtlinie zu.",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Alle ablehnen",
      acceptEssential: "Nur wesentliche",
      customize: "Anpassen",
      savePreferences: "Einstellungen speichern",
      learnMore: "Mehr erfahren",

      // Expanded content
      expandedTitle: "Cookie-Einstellungen",
      expandedDescription:
        "Wählen Sie, welche Cookies Sie akzeptieren möchten. Sie können diese Einstellungen jederzeit ändern.",

      // Cookie categories
      necessary: "Wesentliche Cookies",
      necessaryDesc: "Erforderlich für grundlegende Website-Funktionalität. Können nicht deaktiviert werden.",

      functional: "Funktionale Cookies",
      functionalDesc: "Merken sich Ihre Präferenzen und verbessern Website-Funktionen.",

      analytics: "Analytik-Cookies",
      analyticsDesc: "Helfen uns zu verstehen, wie Sie unsere Website nutzen, um sie zu verbessern.",

      marketing: "Marketing-Cookies",
      marketingDesc: "Werden verwendet, um Ihnen relevante Anzeigen zu zeigen und Kampagneneffektivität zu messen.",

      // Legal info
      gdprCompliant: "DSGVO-konform",
      dataController: "Verantwortlicher: Lakshay Trehan",
      contact: "Kontakt: lakshaytrehan44@gmail.com",
      privacyPolicy: "Datenschutzerklärung",

      // Status
      enabled: "Aktiviert",
      disabled: "Deaktiviert",
      required: "Erforderlich",
    },
  }

  const tr = translations[language] || translations.en

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <Card
        className={cn(
          "bg-gray-900/95 backdrop-blur-md border-cyan-500/30 shadow-2xl transition-all duration-500 ease-out",
          "border-t-2 border-t-cyan-400",
          isExpanded ? "max-h-[80vh]" : "max-h-32",
        )}
      >
        <CardContent className="p-0">
          {/* Compact Banner */}
          <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Icon and Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Cookie className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm lg:text-base">{tr.title}</h3>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-400 hidden sm:inline-flex">
                  {tr.gdprCompliant}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 leading-relaxed">{tr.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:gap-3 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="border-red-500/30 hover:bg-red-950/50 text-red-400 bg-transparent text-xs lg:text-sm"
              >
                <X className="h-3 w-3 mr-1 lg:mr-2" />
                {tr.rejectAll}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssential}
                className="border-yellow-500/30 hover:bg-yellow-950/50 text-yellow-400 bg-transparent text-xs lg:text-sm"
              >
                <AlertCircle className="h-3 w-3 mr-1 lg:mr-2" />
                {tr.acceptEssential}
              </Button>

              <Button
                size="sm"
                onClick={acceptAll}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-xs lg:text-sm"
              >
                <Check className="h-3 w-3 mr-1 lg:mr-2" />
                {tr.acceptAll}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <>
                    <Settings className="h-3 w-3 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">{tr.customize}</span>
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Expanded Content */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-out",
              isExpanded ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="border-t border-gray-800 p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">{tr.expandedTitle}</h4>
                <p className="text-sm text-gray-400">{tr.expandedDescription}</p>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white text-sm">{tr.necessary}</h5>
                      <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-400 border-red-500/30">
                        {tr.required}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{tr.necessaryDesc}</p>
                  </div>
                  <Switch checked={true} disabled className="ml-3" />
                </div>

                {/* Functional Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white text-sm">{tr.functional}</h5>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          preferences.functional
                            ? "border-green-500/30 text-green-400"
                            : "border-gray-500/30 text-gray-400",
                        )}
                      >
                        {preferences.functional ? tr.enabled : tr.disabled}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{tr.functionalDesc}</p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) => updatePreference("functional", checked)}
                    className="ml-3"
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white text-sm">{tr.analytics}</h5>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          preferences.analytics
                            ? "border-green-500/30 text-green-400"
                            : "border-gray-500/30 text-gray-400",
                        )}
                      >
                        {preferences.analytics ? tr.enabled : tr.disabled}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{tr.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => updatePreference("analytics", checked)}
                    className="ml-3"
                  />
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white text-sm">{tr.marketing}</h5>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          preferences.marketing
                            ? "border-green-500/30 text-green-400"
                            : "border-gray-500/30 text-gray-400",
                        )}
                      >
                        {preferences.marketing ? tr.enabled : tr.disabled}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{tr.marketingDesc}</p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => updatePreference("marketing", checked)}
                    className="ml-3"
                  />
                </div>
              </div>

              {/* Legal Info and Actions */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>{tr.dataController}</p>
                    <p>{tr.contact}</p>
                    <a
                      href="/privacy-policy"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tr.privacyPolicy}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="border-gray-600 hover:bg-gray-800 text-gray-300 bg-transparent text-xs"
                    >
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Close
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveCustomPreferences}
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      {tr.savePreferences}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
