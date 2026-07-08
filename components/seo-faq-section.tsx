"use client"

import { useLanguage } from "@/context/language-context"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function SEOFAQSection() {
  const { t, language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // FAQ data with translations
  const faqs = [
    {
      question: {
        en: "What services does Lakshay Trehan offer?",
        de: "Welche Dienstleistungen bietet Lakshay Trehan an?",
      },
      answer: {
        en: "Lakshay Trehan offers a comprehensive range of cybersecurity services including security assessments, vulnerability management, network security analysis, secure coding practices, and security consulting for organizations of all sizes.",
        de: "Lakshay Trehan bietet ein umfassendes Spektrum an Cybersicherheitsdienstleistungen an, darunter Sicherheitsbewertungen, Schwachstellenmanagement, Netzwerksicherheitsanalyse, sichere Programmierpraktiken und Sicherheitsberatung für Organisationen aller Größen.",
      },
    },
    {
      question: {
        en: "What is Lakshay Trehan's background in cybersecurity?",
        de: "Was ist Lakshay Trehans Hintergrund in der Cybersicherheit?",
      },
      answer: {
        en: "Lakshay Trehan is a cybersecurity analyst and ethical hacker with expertise in identifying and mitigating digital threats. He specializes in security assessments, vulnerability management, and implementing robust security solutions to protect organizations from evolving cyber threats.",
        de: "Lakshay Trehan ist ein Cybersicherheitsanalyst und ethischer Hacker mit Expertise in der Identifizierung und Minderung digitaler Bedrohungen. Er ist spezialisiert auf Sicherheitsbewertungen, Schwachstellenmanagement und die Implementierung robuster Sicherheitslösungen zum Schutz von Organisationen vor sich entwickelnden Cyberbedrohungen.",
      },
    },
    {
      question: {
        en: "How can I contact Lakshay Trehan for cybersecurity services?",
        de: "Wie kann ich Lakshay Trehan für Cybersicherheitsdienstleistungen kontaktieren?",
      },
      answer: {
        en: "You can contact Lakshay Trehan through the contact form on his website, via email at lakshaytrehan44@gmail.com, or connect with him on LinkedIn at linkedin.com/in/lakshaytrehan.",
        de: "Sie können Lakshay Trehan über das Kontaktformular auf seiner Website, per E-Mail an lakshaytrehan44@gmail.com oder über LinkedIn unter linkedin.com/in/lakshaytrehan kontaktieren.",
      },
    },
    {
      question: {
        en: "What certifications does Lakshay Trehan hold?",
        de: "Welche Zertifizierungen besitzt Lakshay Trehan?",
      },
      answer: {
        en: "Lakshay Trehan holds several certifications in cybersecurity including Cybersecurity Job Simulation from Forage & Mastercard, Career Essentials in Cybersecurity from Microsoft & LinkedIn, and various other specialized certifications in ethical hacking and security analysis.",
        de: "Lakshay Trehan besitzt mehrere Zertifizierungen im Bereich Cybersicherheit, darunter Cybersecurity Job Simulation von Forage & Mastercard, Career Essentials in Cybersecurity von Microsoft & LinkedIn und verschiedene andere spezialisierte Zertifizierungen in ethischem Hacking und Sicherheitsanalyse.",
      },
    },
    {
      question: {
        en: "Does Lakshay Trehan work internationally?",
        de: "Arbeitet Lakshay Trehan international?",
      },
      answer: {
        en: "Yes, Lakshay Trehan offers cybersecurity services internationally. Based in Germany, he works with clients worldwide, providing remote security assessments, consulting, and implementation of security solutions.",
        de: "Ja, Lakshay Trehan bietet Cybersicherheitsdienstleistungen international an. Mit Sitz in Deutschland arbeitet er mit Kunden weltweit und bietet Remote-Sicherheitsbewertungen, Beratung und Implementierung von Sicherheitslösungen an.",
      },
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-16 bg-gray-950 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Frequently Asked <span className="text-cyan-400">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden transition-all duration-200"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-medium text-white" itemProp="name">
                  {faq.question[language as keyof typeof faq.question]}
                </h3>
                <span className="text-cyan-400 ml-2">
                  {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
                itemScope
                itemType="https://schema.org/Answer"
              >
                <p className="text-gray-300" itemProp="text">
                  {faq.answer[language as keyof typeof faq.answer]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
