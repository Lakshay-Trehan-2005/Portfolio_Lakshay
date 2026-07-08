"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function SEOBreadcrumb() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("home")

  // Navigation items with translation keys and schema data
  const navItems = [
    { key: "nav.home", href: "#home", schema: "Home" },
    { key: "nav.about", href: "#about", schema: "About" },
    { key: "nav.experience", href: "#experience", schema: "Experience" },
    { key: "nav.projects", href: "#projects", schema: "Projects" },
    { key: "nav.trainings", href: "#certifications", schema: "Trainings" },
    { key: "nav.contact", href: "#contact", schema: "Contact" },
  ]

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
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

  // Get current breadcrumb items based on active section
  const getBreadcrumbItems = () => {
    const activeIndex = navItems.findIndex((item) => item.href === `#${activeSection}`)
    if (activeIndex === -1) return [navItems[0]]
    return navItems.slice(0, activeIndex + 1)
  }

  const breadcrumbItems = getBreadcrumbItems()

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden md:flex items-center text-sm text-gray-400 mb-6"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {breadcrumbItems.map((item, index) => (
        <div
          key={item.key}
          className="flex items-center"
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
        >
          {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />}

          <Link
            href={item.href}
            className={`hover:text-cyan-400 transition-colors ${
              index === breadcrumbItems.length - 1 ? "text-cyan-400 font-medium" : ""
            }`}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
            }}
            itemProp="item"
          >
            {index === 0 ? <Home className="h-4 w-4" /> : <span itemProp="name">{t(item.key)}</span>}
          </Link>
          <meta itemProp="position" content={`${index + 1}`} />
        </div>
      ))}
    </nav>
  )
}
