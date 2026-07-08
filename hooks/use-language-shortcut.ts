"use client"

import { useEffect } from "react"
import { useLanguage } from "@/context/language-context"

export function useLanguageShortcut() {
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt+L shortcut to toggle language
      if (event.altKey && event.key === "l") {
        setLanguage(language === "en" ? "de" : "en")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [language, setLanguage])
}
