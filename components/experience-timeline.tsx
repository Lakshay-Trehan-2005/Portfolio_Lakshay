"use client"

import { useState } from "react"
import { Calendar, MapPin, ChevronDown, Building, Code } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ExperienceTimeline() {
  const { t } = useLanguage()
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const experiences = [
    {
      title: t("experience.l3montree.title" as any),
      company: t("experience.l3montree.company" as any),
      location: t("experience.l3montree.location" as any),
      period: t("experience.l3montree.period" as any),
      description: t("experience.l3montree.description" as any),
      achievements: [
        t("experience.l3montree.achievements.1" as any),
        t("experience.l3montree.achievements.2" as any),
        t("experience.l3montree.achievements.3" as any),
        t("experience.l3montree.achievements.4" as any),
        t("experience.l3montree.achievements.5" as any),
        t("experience.l3montree.achievements.6" as any),
      ],
      skills: [
        t("experience.l3montree.skills.1" as any),
        t("experience.l3montree.skills.2" as any),
        t("experience.l3montree.skills.3" as any),
        t("experience.l3montree.skills.4" as any),
        t("experience.l3montree.skills.5" as any),
        t("experience.l3montree.skills.6" as any),
        t("experience.l3montree.skills.7" as any),
        t("experience.l3montree.skills.8" as any),
      ],
      type: "current",
      color: "emerald",
    },
    {
      title: t("experience.intern1.title"),
      company: t("experience.intern1.company"),
      location: t("experience.intern1.location"),
      period: t("experience.intern1.period"),
      description: t("experience.intern1.description"),
      achievements: [
        t("experience.intern1.achievements.1"),
        t("experience.intern1.achievements.2"),
        t("experience.intern1.achievements.3"),
        t("experience.intern1.achievements.4"),
      ],
      skills: ["Vulnerability Assessment", "Network Security", "Threat Analysis", "Security Tools"],
      type: "completed",
      color: "cyan",
    },
    {
      title: t("experience.intern2.title"),
      company: t("experience.intern2.company"),
      location: t("experience.intern2.location"),
      period: t("experience.intern2.period"),
      description: t("experience.intern2.description"),
      achievements: [
        t("experience.intern2.achievements.1"),
        t("experience.intern2.achievements.2"),
        t("experience.intern2.achievements.3"),
        t("experience.intern2.achievements.4"),
        t("experience.intern2.achievements.5"),
        t("experience.intern2.achievements.6"),
      ],
      skills: [
        t("experience.intern2.skills.1"),
        t("experience.intern2.skills.2"),
        t("experience.intern2.skills.3"),
        t("experience.intern2.skills.4"),
        t("experience.intern2.skills.5"),
        t("experience.intern2.skills.6"),
        t("experience.intern2.skills.7"),
        t("experience.intern2.skills.8"),
      ],
      type: "completed",
      color: "purple",
    },
  ]

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Continuous background line for the whole timeline */}
      <div className="absolute left-[20px] top-4 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent md:left-[27px]"></div>

      <div className="space-y-16">
        {experiences.map((exp, index) => {
          const colorClasses = {
            emerald: {
              dot: "bg-emerald-500",
              titleColor: "text-emerald-400",
              bullet: "text-emerald-500",
              badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40",
            },
            cyan: {
              dot: "bg-cyan-500",
              titleColor: "text-cyan-400",
              bullet: "text-cyan-500",
              badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40",
            },
            purple: {
              dot: "bg-purple-500",
              titleColor: "text-purple-400",
              bullet: "text-purple-500",
              badge: "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/40",
            },
          }

          const colors = colorClasses[exp.color as keyof typeof colorClasses]
          const isExpanded = expandedItems.includes(index)

          const maxVisible = 5
          const visibleAchievements = isExpanded ? exp.achievements : exp.achievements.slice(0, maxVisible)
          const hasMore = exp.achievements.length > maxVisible

          return (
            <div key={index} className="relative pl-12 md:pl-20 group">
              {/* Timeline Dot */}
              <div
                className={cn(
                  "absolute left-3 md:left-[20px] top-2 w-[14px] h-[14px] rounded-full ring-[5px] ring-gray-950 transition-all duration-300 group-hover:scale-125 z-10",
                  colors.dot,
                  exp.type === "current" ? "shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-opacity-100" : ""
                )}
              >
                {exp.type === "current" && (
                  <div className={cn("absolute inset-0 rounded-full animate-ping opacity-60", colors.dot)}></div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    {exp.title}
                    {exp.type === "current" && (
                      <Badge className={cn("text-[10px] px-2 py-0.5 uppercase tracking-wider", colors.badge)}>Current</Badge>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Building className={cn("w-[18px] h-[18px]", colors.titleColor)} />
                    <h4 className={cn("text-lg font-medium", colors.titleColor)}>{exp.company}</h4>
                  </div>
                </div>

                {/* Dates & Location */}
                <div className="order-1 md:order-2 flex flex-col items-start md:items-end text-sm pt-1">
                  <div className="flex items-center text-gray-300 font-medium mb-1">
                    <Calendar className="w-[15px] h-[15px] mr-1.5 opacity-70" />
                    {exp.period}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-[15px] h-[15px] mr-1.5 opacity-70" />
                    {exp.location}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 max-w-3xl">
                <p className="text-gray-300/90 text-base leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Practical Task Layout */}
              <div className="space-y-3.5 mb-8 max-w-3xl">
                {visibleAchievements.map((achievement, i) => (
                  <div key={i} className="flex items-start group/item">
                    <span className={cn("mr-3.5 mt-[5px] text-lg leading-none opacity-50 transition-opacity duration-300 group-hover/item:opacity-100", colors.bullet)}>
                      •
                    </span>
                    <span className="text-gray-300/90 leading-relaxed text-[15px] group-hover/item:text-white transition-colors">
                      {achievement}
                    </span>
                  </div>
                ))}

                {/* See more toggle if tasks exceed maxVisible */}
                {hasMore && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium mt-4 ml-6 transition-colors",
                      colors.titleColor,
                      "opacity-80 hover:opacity-100"
                    )}
                  >
                    <span>{isExpanded ? t("experience.see_less" as any) : t("experience.see_more" as any)} (+{exp.achievements.length - maxVisible} tasks)</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded && "rotate-180")} />
                  </button>
                )}
              </div>

              {/* Skills Area */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-2.5">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={cn(
                        "inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                        colors.badge
                      )}
                    >
                      <Code className="w-3.5 h-3.5 mr-1.5 opacity-60" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
