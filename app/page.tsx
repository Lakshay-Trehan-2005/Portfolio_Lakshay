"use client"

import BinaryBackground from "@/components/binary-background"
import CertificationCard from "@/components/certification-card"
import CodeRain from "@/components/code-rain"
import ContactForm from "@/components/contact-form"
import CyberHeader from "@/components/cyber-header"
import CyberScanEffect from "@/components/cyber-scan-effect"
import ExperienceTimeline from "@/components/experience-timeline"
import HexScanner from "@/components/hex-scanner"
import InteractivePhoto from "@/components/interactive-photo"
import LanguageLoading from "@/components/language-loading"
import MatrixBackground from "@/components/matrix-background"
import NetworkLines from "@/components/network-lines"
import ProjectCard from "@/components/project-card"
import ScrollProgress from "@/components/scroll-progress"
import SectionReveal from "@/components/section-reveal"
import SecurityScan from "@/components/security-scan"
import SEOBreadcrumb from "@/components/seo-breadcrumb"
import SEOEnhancer from "@/components/seo-enhancer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YouTubeBackground from "@/components/youtube-background"
import { useLanguage } from "@/context/language-context"
import { useLanguageShortcut } from "@/hooks/use-language-shortcut"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Crosshair,
  ExternalLink,
  FileSearch,
  Github,
  GraduationCap,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Shield,
  Workflow
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const { t, isLoading } = useLanguage()

  // Enable keyboard shortcut for language switching
  useLanguageShortcut()

  // Prevent content flash during language detection
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isLoading])

  // Define projects array to reuse in multiple tabs
  const projects = [
    {
      title: t("projects.autonomous.title"),
      description: t("projects.autonomous.description"),
      technologies: ["Robotics", "Sensor Integration", "Autonomous Systems", "Electronics"],
      githubLink: "#",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_autonomousvehicle-engineering-innovation-activity-7240399940265373697-tOb9",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-15%20at%2003.25.22_9af8918d.jpg-iNf9SaYU8RGvE9o2EyrWYG0jFOKB1E.jpeg",
      isConfidential: true,
    },
    {
      title: t("projects.cipherease.title"),
      description: t("projects.cipherease.description"),
      technologies: ["HTML/CSS", "JavaScript", "Java Servlets", "CryptoJS", "Apache Tomcat"],
      githubLink: "#",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_cipherease-cybersecurity-dataencryption-activity-7286238690534637568-bRf-",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-15%20at%2003.24.57_884abf01.jpg-vYXOKLQqZ3C5Gmjje0WAtdyghhdkUb.jpeg",
      isConfidential: true,
    },
    {
      title: t("projects.keylogger.title"),
      description: t("projects.keylogger.description"),
      technologies: ["Python", "GUI Development", "Security Tools", "Ethical Hacking"],
      githubLink: "#",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_cybersecurity-python-ethicalhacking-activity-7291146008271474688-dsag?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEk6hQcBrDaLS6SNc0pC8ojEU6eCFLDAbjI",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vy7FW389j7sTsKnkQl2CL94b580LOo.png",
      isConfidential: true,
    },
    {
      title: t("projects.ethicalsniff.title"),
      description: t("projects.ethicalsniff.description"),
      technologies: ["Python", "Network Analysis", "UI/UX"],
      githubLink: "#",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_prodigyinfotech-cybersecurity-internship-activity-7289328406263930883-WV4J",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1737911320079.jpg-Es8NE2dCfeT80Q5kA8uuBzgKWQraBk.jpeg",
      isConfidential: true,
    },
    {
      title: t("projects.pixelcrypt.title"),
      description: t("projects.pixelcrypt.description"),
      technologies: ["Python", "Cryptography", "Image Processing"],
      githubLink: "https://github.com/Lakshay-Trehan-2005/PRODIGY_CS_02",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_pixelcrypt-imageencryption-cybersecurity-activity-7283404952947847169-ltkU",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PixelCrypt.jpg-IunLiHYXEmA0biYth7cfvGHCdijbX8.jpeg",
      isConfidential: true,
    },
    {
      title: t("projects.password.title"),
      description: t("projects.password.description"),
      technologies: ["JavaScript", "Security Analysis", "UI/UX"],
      githubLink: "#",
      demoLink:
        "https://www.linkedin.com/posts/lakshaytrehan_cybersecurity-passwordsecurity-techinnovation-activity-7287341860790902784-nplW",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1737437562623.jpg-alcaPcMxESXNQWXk2YsT3Hk8fPDJ3Q.jpeg",
      isConfidential: true,
    },
  ]

  const topSkills = [
    { name: t("about.skill.cybersecurity"), level: t("about.skill.level.expert"), percent: 96 },
    { name: t("about.skill.agentic_ai"), level: t("about.skill.level.advanced"), percent: 90 },
    { name: t("about.skill.software_security"), level: t("about.skill.level.advanced"), percent: 92 },
    { name: t("about.skill.iso27001"), level: t("about.skill.level.advanced"), percent: 88 },
    { name: t("about.skill.gdpr"), level: t("about.skill.level.intermediate"), percent: 82 },
    { name: t("about.skill.cra"), level: t("about.skill.level.intermediate"), percent: 80 },
    { name: t("about.skill.technical_communication"), level: t("about.skill.level.expert"), percent: 94 },
    { name: t("about.skill.automations"), level: t("about.skill.level.advanced"), percent: 91 },
  ]

  // Categorized cyber-focused tools (compact, table-like structure)
  const toolsByCategory = [
    { category: "Observability", items: ["Grafana", "Prometheus"] },
    { category: "Logging", items: ["ELK Stack"] },
    { category: "SIEM & Analytics", items: ["Splunk"] },
    { category: "BI & Data", items: ["Power BI"] },
    { category: "Automation & Workflows", items: ["Power Automate", "n8n", "MCP Connections"] },
    { category: "AI & LLMs", items: ["Claude", "OpenAI API"] },
    { category: "Cloud & Infra", items: ["Azure", "AWS", "GCP", "Terraform"] },
    { category: "Containers & Orchestration", items: ["Docker", "Kubernetes"] },
    { category: "Security & Pentest", items: ["Burp Suite", "Metasploit", "Wireshark"] },
    { category: "Secrets & Vaults", items: ["HashiCorp Vault"] },
    { category: "Dev & CI", items: ["GitHub", "VS Code"] },
    { category: "Creative space", items: ["Canva", "Figma", "Adobe"] },
  ]

  const feedbacks = [
    {
      name: "Adalbert Rizov",
      role: "Software Developer / Application Design Analyst",
      company: "TARGOBANK",
      quote:
        "I had the pleasure of tutoring Lakshay in computer science at IU, and I was consistently impressed by his dedication and curiosity. He has a remarkable eye for detail and asks precise, well-thought-out questions that reflect a deep understanding of complex concepts.\n\nHis passion for computer science, particularly in the field of cybersecurity, is evident in the way he engages with new challenges and his ability to learn independently. Beyond his technical strengths, he brings a friendly demeanor and excellent social skills, making him a pleasure to work with and collaborate with.\n\nI am confident that Lakshay will excel in any academic or professional setting he pursues, and I wholeheartedly recommend him.",
    },
    {
      name: "Gaurav Singh Chauhan",
      role: "Cybersecurity & Risk Management Professional",
      company: "Protiviti",
      quote:
        "It was a pleasure having Lakshay Trehan as an intern at Protiviti, where he demonstrated exceptional enthusiasm and aptitude for cybersecurity. During his tenure, Lakshay showcased a strong understanding of essential frameworks and actively worked on cutting-edge technologies like cloud services and Generative AI.\n\nHis ability to grasp complex concepts, apply them in practical scenarios, and deliver results in risk and compliance within technology consulting was impressive. Beyond his technical skills, Lakshay’s professionalism, eagerness to learn, and collaborative spirit stood out.\n\nI am confident that his dedication and proactive approach will take him far in his career. I wish Lakshay the very best in his future endeavors and look forward to seeing him achieve remarkable milestones in the field of cybersecurity.",
    },
    {
      name: "Khwahish Kushwah",
      role: "UX Designer, Vibe Coder & Psychology Researcher",
      company: "Independent",
      quote:
        "I wholeheartedly endorse Lakshay Trehan for his outstanding expertise in cybersecurity, complemented by his superb leadership and interpersonal abilities. Lakshay has consistently demonstrated a deep commitment to mastering the complexities of cybersecurity, showcasing a keen analytical mind paired with a strategic approach to security challenges.\n\nHis communication skills set him apart, enabling effective teamwork and fostering a collaborative environment. Lakshay has the unique ability to bring diverse viewpoints together, ensuring that all voices are heard and valued. This not only strengthens our security strategies but also cultivates a workplace where innovation thrives.\n\nLakshay also excels in leadership, steering our team through challenges with a positive and motivational demeanor. His resilience and ability to inspire his peers have significantly contributed to our successes, making him a pillar of any security initiative.\n\nIn conclusion, Lakshay Trehan is not just a skilled cybersecurity expert but a visionary leader whose interpersonal skills and commitment to excellence make him a tremendous asset to any organization. His presence in a team guarantees not just enhanced security but a dynamic, inclusive, and innovative working environment.",
    },
    {
      name: "Cecilia Freitas",
      role: "Career Transition Coach",
      company: "UpGrad",
      quote:
        "I have had the pleasure of working closely with Lakshay during his journey of career exploration and development, and I am delighted to provide this recommendation for him. Lakshay is a remarkable individual, driven by a genuine passion for learning and growth.\n\nThroughout our coaching sessions, I consistently observed Lakshay's exceptional intellect and insatiable curiosity. He approaches challenges with a proactive mindset, always eager to dive deep into new concepts and explore innovative solutions. His ability to grasp complex ideas quickly and ask insightful questions truly sets him apart.\n\nOne of Lakshay's most admirable qualities is his openness to feedback. He actively seeks constructive criticism and views it as an opportunity for personal and professional improvement. His willingness to reflect on his actions and make adjustments demonstrates a high level of maturity and self-awareness.\n\nMoreover, Lakshay has demonstrated a strong commitment to enhancing his time management skills. He recognizes the importance of prioritization and efficiency, and he has made significant strides in organizing his tasks and optimizing his productivity.\n\nIn summary, Lakshay Trehan is an exceptional individual with a bright future ahead of him. His intelligence, curiosity, receptiveness to feedback, and dedication to self-improvement make him a valuable asset to any team or organization. I wholeheartedly recommend Lakshay and am confident that he will continue to excel in all his endeavors.",
    },
    {
      name: "Sukrat Kaushik",
      role: "Principal Cloud Consultant",
      company: "SAP",
      quote:
        "Lakshay has consistently delivered a high level of professionalism, blending cybersecurity expertise with sharp technical communication and smart automation. He is able to translate complex security challenges into clear, business-ready messaging while also driving efficiency through tools like n8n and AI-assisted workflows.\n\nHis work reflects strong adherence to compliance and security best practices, especially around ISO 27001 and GDPR, and he brings a thoughtful, proactive approach to every task. I strongly recommend Lakshay for roles that need both technical depth and polished communication in cybersecurity.",
    },
  ]

  // Reusable responsive slider component used for Projects, Certifications, and Endorsements
  function Slider({
    items,
    renderItem,
    itemsPerView = 3,
  }: any) {
    const [index, setIndex] = useState(0)
    const [effectiveItemsPerView, setEffectiveItemsPerView] = useState(itemsPerView)

    useEffect(() => {
      const updatePerView = () => {
        if (typeof window !== "undefined") {
          if (window.innerWidth < 640) {
            setEffectiveItemsPerView(1)
          } else if (window.innerWidth < 1024) {
            setEffectiveItemsPerView(Math.min(2, itemsPerView))
          } else {
            setEffectiveItemsPerView(itemsPerView)
          }
        }
      }
      updatePerView()
      window.addEventListener("resize", updatePerView)
      return () => window.removeEventListener("resize", updatePerView)
    }, [itemsPerView])

    const total = items.length
    const maxIndex = Math.max(0, total - effectiveItemsPerView)

    const prev = () => setIndex((i: number) => Math.max(0, i - 1))
    const next = () => setIndex((i: number) => Math.min(maxIndex, i + 1))

    const gap = 24
    const itemWidth = `calc((100% - ${(effectiveItemsPerView - 1) * gap}px) / ${effectiveItemsPerView})`

    return (
      <div className="relative group/slider">
        <div className="overflow-hidden py-3 px-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(calc(-${index} * (${itemWidth} + ${gap}px)))`,
            }}
          >
            {items.map((it: any, idx: number) => (
              <div
                key={`${idx}-${idx}`}
                style={{ flex: `0 0 ${itemWidth}`, minWidth: 0 }}
                className="h-full flex flex-col"
              >
                {renderItem(it, idx)}
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        {index > 0 && (
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-5 w-11 h-11 rounded-full bg-slate-950/90 border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-2xl backdrop-blur-md z-20 text-xl font-bold"
          >
            ‹
          </button>
        )}

        {/* Next Button */}
        {index < maxIndex && (
          <button
            aria-label="Next"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-5 w-11 h-11 rounded-full bg-slate-950/90 border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 shadow-2xl backdrop-blur-md z-20 text-xl font-bold"
          >
            ›
          </button>
        )}

        {/* Dots Pagination */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === i ? "w-8 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]" : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Add SEO enhancer component */}
      <SEOEnhancer />

      {/* Show loading overlay while detecting language */}
      <LanguageLoading />

      <CyberHeader />
      <ScrollProgress />
      <BinaryBackground />
      <NetworkLines />

      {/* Hero Section with YouTube Background + All Original Effects */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        itemScope
        itemType="https://schema.org/WebPageElement"
        itemProp="mainContentOfPage"
      >
        {/* YouTube Background Video (Bottom Layer) */}
        <YouTubeBackground />

        {/* All Original Cybersecurity Effects (Layered on top) */}
        <MatrixBackground />
        <CyberScanEffect />
        <SecurityScan />

        {/* Code Rain on sides */}
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-20 pointer-events-none">
          <CodeRain />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
          <CodeRain />
        </div>

        <div className="container relative z-10 px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Holographic Photo Showcase (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Ambient Multidimensional Backlight */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-purple-600/20 to-blue-500/25 rounded-[2.5rem] filter blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Cyber HUD Frame Container */}
                <div className="relative p-3 sm:p-3.5 rounded-[2.25rem] border border-white/15 bg-slate-950/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cyan-500/40">
                  <InteractivePhoto
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg"
                    alt="Lakshay Trehan - IT Security Consultant"
                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[330px] lg:h-[330px] rounded-2xl object-cover object-center shadow-2xl"
                  />

                  {/* Floating Status Badge: Available & Location */}
                  <div className="absolute -top-3.5 -right-3 sm:-right-4 bg-slate-950/95 border border-emerald-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-xl shadow-xl flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-medium text-emerald-300 tracking-wide">Walldorf, Germany</span>
                  </div>

                  {/* Floating Role Badge: Consultant */}
                  <div className="absolute -bottom-3.5 -left-3 sm:-left-4 bg-slate-950/95 border border-white/15 px-4 py-2 rounded-xl backdrop-blur-xl shadow-2xl flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-mono tracking-widest text-cyan-400/80 leading-none">Role</p>
                      <p className="text-xs font-semibold text-white mt-0.5">IT Security Consultant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Typography & CTAs (7 cols) */}
            <div className="lg:col-span-7 text-left">
              {/* Identity Chip */}
              <div className="mb-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <p className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  {t("hero.title")}
                </p>
              </div>

              {/* Grand Display Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-[1.08]" itemProp="headline">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white">
                  Lakshay
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                  Trehan
                </span>
              </h1>

              <meta itemProp="name" content="Lakshay Trehan" />
              <meta itemProp="jobTitle" content="IT Security Consultant & Cybersecurity Analyst" />
              <meta
                itemProp="description"
                content="Specializing in ISO 27001 & NIS2 governance, threat intelligence, and security automation."
              />

              {/* Mission Statement Subtitle */}
              <p className="text-base sm:text-lg text-gray-300 mb-6 drop-shadow-lg leading-relaxed max-w-xl" itemProp="description">
                {t("hero.description")}
              </p>

              {/* Strategic Domain Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-gray-200 font-medium hover:border-cyan-500/40 hover:bg-slate-900 transition-all shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  ISO 27001 & NIS2
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-gray-200 font-medium hover:border-purple-500/40 hover:bg-slate-900 transition-all shadow-sm">
                  <Crosshair className="w-3.5 h-3.5 text-purple-400" />
                  Threat Intelligence
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-gray-200 font-medium hover:border-emerald-500/40 hover:bg-slate-900 transition-all shadow-sm">
                  <Workflow className="w-3.5 h-3.5 text-emerald-400" />
                  Security Automation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-gray-200 font-medium hover:border-blue-500/40 hover:bg-slate-900 transition-all shadow-sm">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  Secured AI
                </span>
              </div>

              {/* CTA Buttons & Social Connect */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:via-teal-400 hover:to-blue-500 text-white font-semibold px-7 py-6 rounded-xl shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span>{t("hero.button.projects")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:border-cyan-400/50 bg-slate-950/70 hover:bg-slate-900/90 text-gray-200 hover:text-white font-medium px-7 py-6 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>{t("hero.button.contact")}</span>
                </Button>

                {/* Social Quick Connect */}
                <div className="flex items-center gap-2 pl-2">
                  <a
                    href="https://www.linkedin.com/in/lakshaytrehan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/Lakshay-Trehan-2005"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 hover:border-green-400/50 flex items-center justify-center text-green-400 hover:text-white hover:bg-green-500/20 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Futuristic Mouse Scroll Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center pointer-events-auto z-20">
          <Link href="#about" className="text-gray-400 hover:text-cyan-400 flex flex-col items-center transition-colors group">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 group-hover:text-cyan-300 mb-1.5 transition-colors">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 group-hover:border-cyan-400/50 transition-colors bg-slate-950/40 backdrop-blur-sm">
              <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 bg-gradient-to-b from-black via-slate-950/70 to-black overflow-hidden"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="absolute inset-0 opacity-10">
          <HexScanner className="w-full h-full" />
        </div>

        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          <SEOBreadcrumb />

          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Profile
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {t("about.title")} <span className="text-cyan-400">{t("about.me")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Top Skills & Core Pillars */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">{t("about.topSkillsTitle")}</h3>
                  <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] uppercase tracking-[0.2em] px-2.5 py-0.5">
                    Core Profile
                  </Badge>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">
                  {t("about.description")}
                </p>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  {t("about.extendedBio")}
                </p>
              </div>

              {/* 4 Core Security Pillars */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90 mb-3 flex items-center gap-2">
                  <span>Specialized Domains</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-950/90">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{t("about.pillars.governance.title")}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{t("about.pillars.governance.desc")}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-950/90">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                        <Crosshair className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{t("about.pillars.threat.title")}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{t("about.pillars.threat.desc")}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-950/90">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Workflow className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{t("about.pillars.automation.title")}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{t("about.pillars.automation.desc")}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-950/90">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{t("about.pillars.ai.title")}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{t("about.pillars.ai.desc")}</p>
                  </div>
                </div>
              </div>

              {/* Skill Proficiency Gauges */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <span>Proficiency Metrics</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {topSkills.map((skill) => (
                    <div key={skill.name} className="rounded-xl border border-white/10 bg-slate-950/85 p-3.5">
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <span className="text-xs sm:text-sm font-semibold text-white">{skill.name}</span>
                        <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[9px] uppercase tracking-[0.2em] px-2 py-0.5">
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" style={{ width: `${skill.percent}%` }} />
                      </div>
                      <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-[0.16em]">{skill.percent}% proficiency</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Tools & Education */}
            <div className="space-y-8 flex flex-col justify-between">
              {/* Tools Card */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 md:p-8 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-300">{t("about.toolsTitle")}</h3>
                    <p className="text-gray-400 text-sm">Modern tools that power my workflows.</p>
                  </div>
                  <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-purple-200">
                    Focused stack
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                  {toolsByCategory.map((cat) => (
                    <div key={cat.category} className="rounded-xl border border-white/10 bg-black/40 p-3">
                      <div className="text-sm font-semibold text-purple-300 mb-2">{cat.category}</div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((it) => (
                          <span key={it} className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900/60 to-slate-800/40 px-3 py-1 rounded-full text-xs text-gray-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 block" />
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
                <h3 className="text-xl font-semibold mb-5 text-cyan-400">{t("about.education")}</h3>
                <div className="grid gap-4 sm:grid-cols-2" itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization">
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-cyan-500/20 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-white" itemProp="programName">{t("about.education.cs")}</h4>
                      <p className="text-purple-400 text-sm mt-1" itemProp="name">{t("about.education.university")}</p>
                    </div>
                    <div className="mt-4 space-y-1.5 text-xs text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                        <span itemProp="addressLocality">{t("about.education.location")}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                        <span>{t("about.education.graduation")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-5 rounded-xl border border-cyan-500/20 flex flex-col justify-between">
                    <h4 className="text-base font-semibold text-white">{t("about.education.highschool")}</h4>
                    <div className="mt-4 space-y-2.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 flex items-center text-xs">
                          <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                          {t("about.education.class12")}
                        </span>
                        <span className="text-purple-400 font-semibold text-xs">79.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 flex items-center text-xs">
                          <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                          {t("about.education.class10")}
                        </span>
                        <span className="text-cyan-400 font-semibold text-xs">87.6%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Recommendations Section */}
      <section
        id="experience"
        className="relative py-24 bg-black overflow-hidden"
        itemScope
        itemType="https://schema.org/WorkExperience"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Career History
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white" itemProp="headline">
                {t("experience.title")} <span className="text-purple-400">{t("experience.highlight")}</span>
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <ExperienceTimeline />
          </SectionReveal>

          {/* Branded Section Separator */}
          <div className="relative my-24">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-5 py-1 rounded-full border border-white/10 text-xs uppercase tracking-widest text-cyan-400/80 font-mono">
                Professional Endorsements
              </span>
            </div>
          </div>

          <SectionReveal delay={0.4}>
            <div>
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Recommendations
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                  {t("feedback.title")} <span className="text-cyan-400">{t("feedback.highlight")}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">{t("feedback.description")}</p>
              </div>

              <Slider
                items={feedbacks}
                itemsPerView={3}
                renderItem={(feedback: any) => (
                  <div
                    key={feedback.name}
                    className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-xl backdrop-blur-xl hover:border-white/20 transition-all duration-300 min-h-[340px]"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-white">{feedback.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {feedback.role}
                            {feedback.company ? ` · ${feedback.company}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 text-gray-300 text-sm leading-relaxed line-clamp-6">
                        <p>{feedback.quote.split("\n\n")[0]}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <a
                        href="https://www.linkedin.com/in/lakshaytrehan/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                      >
                        See more on LinkedIn
                      </a>
                    </div>
                  </div>
                )}
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-24 bg-gradient-to-b from-black via-slate-950/70 to-black overflow-hidden"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white" itemProp="headline">
                {t("projects.title")} <span className="text-cyan-400">{t("projects.highlight")}</span>
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-10">
                <TabsList className="inline-flex rounded-xl bg-slate-950/80 border border-white/10 p-1">
                  <TabsTrigger
                    value="all"
                    className="rounded-lg px-5 py-2 text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                  >
                    {t("projects.tabs.all")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="rounded-lg px-5 py-2 text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                  >
                    {t("projects.tabs.security")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="research"
                    className="rounded-lg px-5 py-2 text-xs sm:text-sm font-medium transition-all data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                  >
                    {t("projects.tabs.research")}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-2">
                <Slider
                  items={projects}
                  itemsPerView={3}
                  renderItem={(project: any) => (
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      technologies={project.technologies}
                      githubLink={project.githubLink}
                      demoLink={project.demoLink}
                      image={project.image}
                      embedCode={project.embedCode}
                      isConfidential={project.isConfidential}
                    />
                  )}
                />
              </TabsContent>

              <TabsContent value="security" className="mt-2">
                <Slider
                  items={projects.filter((project) =>
                    ["CipherEase", "Keylogger", "EthicalSniff", "PixelCrypt", "Password Strength Meter"].includes(
                      project.title,
                    ),
                  )}
                  itemsPerView={3}
                  renderItem={(project: any) => (
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      technologies={project.technologies}
                      githubLink={project.githubLink}
                      demoLink={project.demoLink}
                      image={project.image}
                      embedCode={project.embedCode}
                      isConfidential={project.isConfidential}
                    />
                  )}
                />
              </TabsContent>

              <TabsContent value="research" className="mt-2">
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl">
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-4">
                    <FileSearch className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t("projects.research.title")}</h3>
                  <p className="text-gray-400 max-w-md text-sm leading-relaxed">{t("projects.research.description")}</p>
                </div>
              </TabsContent>
            </Tabs>
          </SectionReveal>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="relative py-24 bg-black overflow-hidden"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <HexScanner className="w-full h-full" />
        </div>

        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Credentials
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white" itemProp="name">
                {t("certifications.title")} <span className="text-green-400">{t("certifications.highlight")}</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="overflow-hidden">
            {(() => {
              const certs = [
                {
                  title: t("certifications.prodigy.title"),
                  organization: t("certifications.prodigy.organization"),
                  date: "January 2025",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PgyNIUjVGWOdc9SWVJgjpXNWACMG9e.png",
                  skills: [
                    t("certifications.prodigy.skills.1"),
                    t("certifications.prodigy.skills.2"),
                    t("certifications.prodigy.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.mastercard.title"),
                  organization: t("certifications.mastercard.organization"),
                  date: "March 2025",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740851062781.jpg-xU0uF9n1g4unjCCzQL98uVy2ItK5eb.jpeg",
                  skills: [
                    t("certifications.mastercard.skills.1"),
                    t("certifications.mastercard.skills.2"),
                    t("certifications.mastercard.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.microsoft.title"),
                  organization: t("certifications.microsoft.organization"),
                  date: "August 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1723231349549.jpg-NqVy42E6PwLq4AZ2BbsRVBJip6N3gF.jpeg",
                  skills: [
                    t("certifications.microsoft.skills.1"),
                    t("certifications.microsoft.skills.2"),
                    t("certifications.microsoft.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.linkedin.title"),
                  organization: t("certifications.linkedin.organization"),
                  date: "July 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GemPeSnoRZIrP7Y7uS9KBVWTcVhon3.png",
                  skills: [
                    t("certifications.linkedin.skills.1"),
                    t("certifications.linkedin.skills.2"),
                    t("certifications.linkedin.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.upgrad.title"),
                  organization: t("certifications.upgrad.organization"),
                  date: "May 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1716476398441.jpg-6pb2PzIjr04t8rV7K8wLlYjwLgSpXw.jpeg",
                  skills: [
                    t("certifications.upgrad.skills.1"),
                    t("certifications.upgrad.skills.2"),
                    t("certifications.upgrad.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.programming.title"),
                  organization: t("certifications.programming.organization"),
                  date: "April 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1713612106290.jpg-9RPWpHqlueXpe2XEwniTm3cyyX23ng.jpeg",
                  skills: [
                    t("certifications.programming.skills.1"),
                    t("certifications.programming.skills.2"),
                    t("certifications.programming.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.simplilearn.title"),
                  organization: t("certifications.simplilearn.organization"),
                  date: "April 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1713611265670.jpg-dnHY3giNcsjoLVsXcJzVMQSh1D03b0.jpeg",
                  skills: [
                    t("certifications.simplilearn.skills.1"),
                    t("certifications.simplilearn.skills.2"),
                    t("certifications.simplilearn.skills.3"),
                  ],
                  isCertificateImage: true,
                },
                {
                  title: t("certifications.knowbe4.title"),
                  organization: t("certifications.knowbe4.organization"),
                  date: "February 2024",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1713610727868.jpg-f1prgtAwsnjcZtAO5EBd3UaT9Gr5Kb.jpeg",
                  skills: [
                    t("certifications.knowbe4.skills.1"),
                    t("certifications.knowbe4.skills.2"),
                    t("certifications.knowbe4.skills.3"),
                  ],
                  isCertificateImage: true,
                },
              ]

              return (
                <Slider
                  items={certs}
                  itemsPerView={3}
                  renderItem={(cert: any) => (
                    <CertificationCard
                      title={cert.title}
                      organization={cert.organization}
                      date={cert.date}
                      logo={cert.logo}
                      skills={cert.skills}
                      isCertificateImage={cert.isCertificateImage}
                    />
                  )}
                />
              )
            })()}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-b from-black via-slate-950/80 to-black overflow-hidden"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <HexScanner className="w-full h-full" />
        </div>

        <div className="absolute left-0 top-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/4 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
                {t("contact.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4" itemProp="headline">
                {t("contact.title")} <span className="text-purple-400">{t("contact.highlight")}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed" itemProp="description">
                {t("contact.description")}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Contact Info Cards - 2 columns on lg screens */}
            <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
              <SectionReveal delay={0.2}>
                <div
                  className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-500/10 p-3 rounded-xl mr-4">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{t("contact.email.title")}</h3>
                      <p className="text-gray-400 mb-3">{t("contact.email.description")}</p>
                      <a
                        href="mailto:lakshaytrehan44@gmail.com"
                        className="text-purple-400 hover:text-purple-300 flex items-center group"
                        itemProp="email"
                      >
                        lakshaytrehan44@gmail.com
                        <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div
                  className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-cyan-500/10 p-3 rounded-xl mr-4">
                      <Linkedin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{t("contact.linkedin.title")}</h3>
                      <p className="text-gray-400 mb-3">{t("contact.linkedin.description")}</p>
                      <a
                        href="https://www.linkedin.com/in/lakshaytrehan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center group"
                        itemProp="url"
                      >
                        linkedin.com/in/lakshaytrehan
                        <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div
                  className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-green-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-green-500/10 p-3 rounded-xl mr-4">
                      <Github className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{t("contact.github.title")}</h3>
                      <p className="text-gray-400 mb-3">{t("contact.github.description")}</p>
                      <a
                        href="https://github.com/Lakshay-Trehan-2005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 flex items-center group"
                        itemProp="url"
                      >
                        github.com/Lakshay-Trehan-2005
                        <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.5}>
                <div className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-400" />
                    {t("contact.response.title")}
                  </h3>
                  <p className="text-gray-400">{t("contact.response.description")}</p>
                </div>
              </SectionReveal>
            </div>

            {/* Contact Form - 3 columns on lg screens */}
            <div className="lg:col-span-3 h-full flex flex-col">
              <SectionReveal delay={0.6} className="h-full flex flex-col">
                <div
                  className="h-full flex flex-col justify-between bg-slate-950/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                      <div className="flex items-center">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mr-3.5 shrink-0">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{t("contact.form.title")}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">Let's discuss security assessments, governance, or collaboration.</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Encrypted
                      </span>
                    </div>

                    <ContactForm />
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/5 text-center">
                    <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t("contact.form.privacy")}</span>
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800" itemScope itemType="https://schema.org/WPFooter">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {new Date().getFullYear()} Lakshay Trehan.</span>
              <span className="text-gray-600">|</span>
              <span>{t("footer.rights")}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link
                href="/privacy-policy"
                className="hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
