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
import {
  Calendar,
  Clock,
  ExternalLink,
  FileSearch,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare
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
      name: "Frédéric Noppe",
      role: "Open Source Security & Cybersecurity Management",
      company: "L3montree Cybersecurity GmbH",
      quote:
        "I would like to recommend Lakshay, who worked for us as a working student in the field of technical communication (including the technical integration of new services). During his time with us, he was responsible for technical communication and familiarised himself with the challenging field of modern, secure software development. This is an achievement I would particularly like to highlight, given the complexity of the subject area.\n\nFurthermore, he played a key role in optimising the process for creating infographics. He devised his own designs, which he continuously refined and which can now be seen on our public channels. He also represented my company competently and confidently at all times during public events.\n\nI was particularly impressed by his exceptionally proactive approach to work. He engages enthusiastically in substantive discussions and quickly familiarises himself with new technologies. His solution-oriented approach has noticeably enriched our collaboration. I can recommend him to any future employer!",
    },
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

  // Reusable slider component used for Projects and Certifications
  function Slider({
    items,
    renderItem,
    itemsPerView = 3,
  }: any) {
    const [index, setIndex] = useState(0)
    const total = items.length
    const maxIndex = Math.max(0, total - itemsPerView)

    const prev = () => setIndex((i: number) => Math.max(0, i - 1))
    const next = () => setIndex((i: number) => Math.min(maxIndex, i + 1))

    const itemWidth = `${100 / itemsPerView}%`

    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
          >
            {items.map((it: any, idx: number) => (
              <div key={`${idx}-${idx}`} style={{ flex: `0 0 ${itemWidth}` }} className="px-0">
                {renderItem(it, idx)}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-2">
          <button
            aria-label="Previous"
            onClick={prev}
            className="rounded-full bg-black/60 border border-white/10 p-2 hover:bg-black/70"
          >
            ‹
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-2">
          <button
            aria-label="Next"
            onClick={next}
            className="rounded-full bg-black/60 border border-white/10 p-2 hover:bg-black/70"
          >
            ›
          </button>
        </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center lg:justify-start">
              <InteractivePhoto
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg"
                alt="Lakshay Trehan - Cybersecurity Analyst"
                className="w-72 h-72 rounded-2xl object-cover object-center shadow-xl"
              />
            </div>

            <div className="text-left lg:text-left">
              <div className="mb-2 inline-block px-4 py-1 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-full">
                <p className="text-sm font-mono text-cyan-400">{t("hero.title")}</p>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" itemProp="headline">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-white drop-shadow-2xl">
                  Lakshay Trehan
                </span>
              </h1>

              <meta itemProp="name" content="Lakshay Trehan" />
              <meta itemProp="jobTitle" content="Cybersecurity Analyst" />
              <meta
                itemProp="description"
                content="Experienced cybersecurity analyst specialising in threat analysis, security automation, ISO 27001, GDPR, and AI-driven security solutions."
              />

              <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-lg" itemProp="description">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 shadow-lg shadow-cyan-500/25"
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t("hero.button.projects")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-400 hover:bg-gray-800/80 text-gray-100 font-medium px-6 backdrop-blur-sm bg-transparent"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t("hero.button.contact")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <Link href="#about" className="text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* About Section (simplified to fix JSX nesting) */}
      <section
        id="about"
        className="relative py-20 bg-gray-950 overflow-hidden"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute inset-0 opacity-10">
          <HexScanner className="w-full h-full" />
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <SEOBreadcrumb />

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("about.title")} <span className="text-cyan-400">{t("about.me")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(1fr,520px)] gap-10 items-start">
            <div className="hidden lg:block" />

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t("about.topSkillsTitle")}</h3>
                <p className="text-gray-300 leading-8 mb-6">{t("about.description")}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {topSkills.map((skill) => (
                    <div key={skill.name} className="rounded-3xl border border-white/10 bg-slate-950/85 p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-sm font-semibold text-white">{skill.name}</span>
                        <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] uppercase tracking-[0.24em]">
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" style={{ width: `${skill.percent}%` }} />
                      </div>
                      <p className="mt-3 text-xs text-gray-400 uppercase tracking-[0.18em]">{skill.percent}% proficiency</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-300">{t("about.toolsTitle")}</h3>
                    <p className="text-gray-400 text-sm">Modern tools that power my workflows.</p>
                  </div>
                  <div className="inline-flex rounded-full bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-purple-200">
                    Focused stack
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {toolsByCategory.map((cat) => (
                    <div key={cat.category} className="rounded-xl border border-white/6 bg-black/40 p-3">
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
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t("about.education")}</h3>
            <div className="space-y-4" itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization">
              <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium text-white" itemProp="programName">{t("about.education.cs")}</h4>
                  <p className="text-purple-400" itemProp="name">{t("about.education.university")}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-400" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span itemProp="addressLocality">{t("about.education.location")}</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{t("about.education.graduation")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium text-white">{t("about.education.highschool")}</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-gray-300">{t("about.education.class12")} <span className="text-purple-400">79.2%</span></span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">{t("about.education.class10")} <span className="text-cyan-400">87.6%</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="relative py-20 bg-black overflow-hidden"
        itemScope
        itemType="https://schema.org/WorkExperience"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-transparent to-transparent"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" itemProp="headline">
              {t("experience.title")} <span className="text-purple-400">{t("experience.highlight")}</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <ExperienceTimeline />
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="mt-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("feedback.title")} <span className="text-cyan-400">{t("feedback.highlight")}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">{t("feedback.description")}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.name}
                    className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_15px_60px_-30px_rgba(56,189,248,0.55)] backdrop-blur-xl"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-lg font-semibold text-white">{feedback.name}</p>
                          <p className="text-sm text-gray-400">
                            {feedback.role}
                            {feedback.company ? ` · ${feedback.company}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 text-gray-300 text-sm leading-7">
                        <p>{feedback.quote.split("\n\n")[0]}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <a
                        href="https://www.linkedin.com/in/lakshaytrehan/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-full rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                      >
                        See more on LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-20 bg-black overflow-hidden"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" itemProp="headline">
              {t("projects.title")} <span className="text-cyan-400">{t("projects.highlight")}</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <Tabs defaultValue="all" className="w-full mb-8">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex bg-gray-900 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                  {t("projects.tabs.all")}
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
                >
                  {t("projects.tabs.security")}
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
                >
                  {t("projects.tabs.research")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="relative">
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
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects
                    .filter((project) =>
                      ["CipherEase", "Keylogger", "EthicalSniff", "PixelCrypt", "Password Strength Meter"].includes(
                        project.title,
                      ),
                    )
                    .map((project, index) => (
                      <SectionReveal key={project.title} delay={0.3 + index * 0.1}>
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
                      </SectionReveal>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="research" className="mt-6">
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <FileSearch className="h-16 w-16 text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">{t("projects.research.title")}</h3>
                  <p className="text-gray-500 max-w-md">{t("projects.research.description")}</p>
                </div>
              </TabsContent>
            </Tabs>
          </SectionReveal>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="relative py-20 bg-gray-950 overflow-hidden"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="absolute inset-0 opacity-10">
          <HexScanner className="w-full h-full" />
        </div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" itemProp="name">
              {t("certifications.title")} <span className="text-green-400">{t("certifications.highlight")}</span>
            </h2>
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

      {/* Contact Section - Enhanced */}
      <section
        id="contact"
        className="relative py-20 bg-gray-950 overflow-hidden"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <div className="absolute inset-0 opacity-10">
          <HexScanner className="w-full h-full" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>

        <div className="absolute left-0 top-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Add SEO breadcrumb */}
          <SEOBreadcrumb />

          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium mb-3">
                {t("contact.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" itemProp="headline">
                {t("contact.title")} <span className="text-purple-400">{t("contact.highlight")}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto" itemProp="description">
                {t("contact.description")}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info Cards - 2 columns on lg screens */}
            <div className="lg:col-span-2 space-y-6">
              <SectionReveal delay={0.2}>
                <div
                  className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-500/10 p-3 rounded-lg mr-4">
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
                  className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-cyan-500/10 p-3 rounded-lg mr-4">
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
                  className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-start">
                    <div className="bg-green-500/10 p-3 rounded-lg mr-4">
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
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-400" />
                    {t("contact.response.title")}
                  </h3>
                  <p className="text-gray-400">{t("contact.response.description")}</p>
                </div>
              </SectionReveal>
            </div>

            {/* Contact Form - 3 columns on lg screens */}
            <div className="lg:col-span-3">
              <SectionReveal delay={0.6}>
                <div
                  className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <div className="flex items-center mb-6">
                    <MessageSquare className="w-6 h-6 text-cyan-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">{t("contact.form.title")}</h3>
                  </div>
                  <ContactForm />
                  <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">{t("contact.form.privacy")}</p>
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
