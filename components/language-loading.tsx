"use client"

import { useLanguage } from "@/context/language-context"
import { Loader2 } from "lucide-react"

export default function LanguageLoading() {
  const { isLoading } = useLanguage()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl border border-cyan-500/20 flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-4" />
        <p className="text-gray-300 text-sm">Detecting language preferences...</p>
      </div>
    </div>
  )
}
