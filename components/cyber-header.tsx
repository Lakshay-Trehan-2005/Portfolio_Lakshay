"use client"

import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { ChevronRight, Menu, Shield, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import LanguageSwitcher from "./language-switcher"

export default function CyberHeader() {
  const { t, language } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")


  // Navigation items with translation keys
  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.experience", href: "#experience" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.trainings", href: "#certifications" },
    { key: "nav.contact", href: "#contact" },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update header style based on scroll position
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Smooth scroll function
  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-cyan-500/20 py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("#home")
            }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition duration-300"></div>
              <div className="relative bg-black rounded-full p-1.5">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              LT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  activeSection === item.href.substring(1) ? "text-cyan-400" : "text-gray-300 hover:text-white",
                )}
              >
                {t(item.key)}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transform origin-left animate-[slideIn_0.3s_ease-in-out]"></span>
                )}
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher className="ml-2" />

            {/* resume button removed */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Switcher for Mobile */}
            <LanguageSwitcher />

            <button
              className="relative group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-md opacity-70 group-hover:opacity-100 blur-sm group-hover:blur transition duration-300"></div>
              <div className="relative bg-gray-900 p-2 rounded-md">
                {mobileMenuOpen ? <X className="h-5 w-5 text-cyan-400" /> : <Menu className="h-5 w-5 text-cyan-400" />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className={cn(
                  "flex items-center py-3 px-4 rounded-md transition-colors",
                  activeSection === item.href.substring(1)
                    ? "bg-gray-800/50 text-cyan-400 border-l-2 border-cyan-400"
                    : "text-gray-300 hover:bg-gray-800/30 hover:text-white",
                )}
              >
                <ChevronRight
                  className={cn(
                    "mr-2 h-4 w-4 transition-transform",
                    activeSection === item.href.substring(1) ? "text-cyan-400 translate-x-1" : "text-gray-500",
                  )}
                />
                {t(item.key)}
              </Link>
            ))}

            {/* mobile resume button removed */}
          </nav>
          <div className="mt-auto">
            <div className="pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} Lakshay Trehan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
