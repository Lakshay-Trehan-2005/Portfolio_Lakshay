"use client"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  // Simple translations for privacy policy
  const translations = {
    en: {
      backToHome: "Back to Home",
      title: "Privacy Policy",
      lastUpdated: "Last Updated: March 15, 2025",
      noPledgeTitle: 'The "No Data Collection" Pledge',
      noPledgeText:
        "As a cybersecurity expert, I practice what I preach. This website collects absolutely zero personal data. No cookies tracking your movements, no analytics monitoring your behavior, no forms storing your information (unless you explicitly contact me). Your privacy isn't just respected—it's prioritized.",
      whyTitle: "Why This Privacy Policy Exists",
      whyText:
        "You might be wondering, \"If you don't collect data, why have a privacy policy at all?\" Good question! Even though I don't collect your data, I believe in transparency. Plus, as someone based in Germany, I respect the EU's GDPR requirements for websites. Consider this my formal declaration of my commitment to your privacy.",
      contactTitle: "What Happens When You Contact Me",
      contactText:
        "If you use the contact form, your message comes to me directly. I don't store it in a database, sell it to third parties, or use it for marketing. It's just between us. I'll only use your contact information to respond to your inquiry, and then we're done. Simple as that.",
      noteTitle: "A Note From Lakshay",
      noteText:
        '"As a cybersecurity professional, I find it ironic that many websites collect vast amounts of user data while claiming to care about security. My approach is different—I believe the most secure data is the data never collected in the first place. This website is designed with that philosophy in mind."',
      technicalTitle: "Technical Details (For The Curious)",
      technicalText:
        "This site is a static website hosted on Vercel. It doesn't use cookies, doesn't run analytics scripts, and doesn't have any database where your information could be stored. The contact form submissions are processed securely and sent directly as emails without persistent storage.",
      rightsTitle: "Your Rights (Which Are Easy To Fulfill)",
      rightsText:
        "Under the GDPR, you have various rights regarding your personal data. Since I don't collect any, most of these rights are automatically fulfilled! But if you ever have questions or concerns about privacy on this site, please don't hesitate to contact me.",
      thirdPartyTitle: "Third-Party Links",
      thirdPartyText:
        "This website contains links to other sites like GitHub and LinkedIn. When you click those links, you'll be subject to their privacy policies, not mine. I recommend checking their policies if you're concerned about your data.",
      changesTitle: "Changes To This Policy",
      changesText:
        "If I ever decide to change how this website works regarding privacy (which is unlikely), I'll update this page. But the core commitment remains: your privacy comes first.",
      summaryTitle: "In Summary",
      summaryText:
        "Your data is safe because it's not collected in the first place. That's the best security a cybersecurity expert can offer. Browse with confidence!",
      contactInfoTitle: "Contact Information",
      contactInfoText:
        "If you have any questions about this privacy policy or my approach to data protection, please contact me at:",
      email: "Email:",
      emailAddress: "lakshaytrehan44@gmail.com",
      safeText: "You're safe with Lakshay! 😉",
      peaceOfMind: "Where cybersecurity meets peace of mind",
    },
    de: {
      backToHome: "Zurück zur Startseite",
      title: "Datenschutzerklärung",
      lastUpdated: "Zuletzt aktualisiert: 15. März 2025",
      noPledgeTitle: 'Das "Keine Datenerfassung"-Versprechen',
      noPledgeText:
        "Als Cybersicherheitsexperte praktiziere ich, was ich predige. Diese Website sammelt absolut keine persönlichen Daten. Keine Cookies, die Ihre Bewegungen verfolgen, keine Analysen, die Ihr Verhalten überwachen, keine Formulare, die Ihre Informationen speichern (es sei denn, Sie kontaktieren mich ausdrücklich). Ihre Privatsphäre wird nicht nur respektiert – sie hat Priorität.",
      whyTitle: "Warum diese Datenschutzerklärung existiert",
      whyText:
        'Sie fragen sich vielleicht: "Wenn Sie keine Daten sammeln, warum überhaupt eine Datenschutzerklärung?" Gute Frage! Auch wenn ich Ihre Daten nicht sammle, glaube ich an Transparenz. Außerdem respektiere ich als jemand, der in Deutschland ansässig ist, die DSGVO-Anforderungen der EU für Websites. Betrachten Sie dies als meine formelle Erklärung meines Engagements für Ihre Privatsphäre.',
      contactTitle: "Was passiert, wenn Sie mich kontaktieren",
      contactText:
        "Wenn Sie das Kontaktformular verwenden, kommt Ihre Nachricht direkt zu mir. Ich speichere sie nicht in einer Datenbank, verkaufe sie nicht an Dritte oder verwende sie für Marketing. Es bleibt unter uns. Ich verwende Ihre Kontaktinformationen nur, um auf Ihre Anfrage zu antworten, und dann sind wir fertig. So einfach ist das.",
      noteTitle: "Eine Anmerkung von Lakshay",
      noteText:
        '"Als Cybersicherheitsexperte finde ich es ironisch, dass viele Websites große Mengen an Benutzerdaten sammeln, während sie behaupten, sich um Sicherheit zu kümmern. Mein Ansatz ist anders – ich glaube, die sichersten Daten sind die Daten, die gar nicht erst gesammelt werden. Diese Website wurde mit dieser Philosophie im Hinterkopf gestaltet."',
      technicalTitle: "Technische Details (für Neugierige)",
      technicalText:
        "Diese Seite ist eine statische Website, die auf Vercel gehostet wird. Sie verwendet keine Cookies, führt keine Analyseskripte aus und verfügt über keine Datenbank, in der Ihre Informationen gespeichert werden könnten. Die Kontaktformularübermittlungen werden sicher verarbeitet und direkt als E-Mails ohne dauerhafte Speicherung gesendet.",
      rightsTitle: "Ihre Rechte (die leicht zu erfüllen sind)",
      rightsText:
        "Gemäß der DSGVO haben Sie verschiedene Rechte bezüglich Ihrer personenbezogenen Daten. Da ich keine sammle, sind die meisten dieser Rechte automatisch erfüllt! Aber wenn Sie jemals Fragen oder Bedenken zum Datenschutz auf dieser Website haben, zögern Sie bitte nicht, mich zu kontaktieren.",
      thirdPartyTitle: "Links zu Drittanbietern",
      thirdPartyText:
        "Diese Website enthält Links zu anderen Seiten wie GitHub und LinkedIn. Wenn Sie diese Links anklicken, unterliegen Sie deren Datenschutzrichtlinien, nicht meinen. Ich empfehle, deren Richtlinien zu überprüfen, wenn Sie besorgt über Ihre Daten sind.",
      changesTitle: "Änderungen dieser Richtlinie",
      changesText:
        "Wenn ich jemals beschließen sollte, die Funktionsweise dieser Website in Bezug auf den Datenschutz zu ändern (was unwahrscheinlich ist), werde ich diese Seite aktualisieren. Aber das Kernversprechen bleibt: Ihre Privatsphäre hat Vorrang.",
      summaryTitle: "Zusammenfassung",
      summaryText:
        "Ihre Daten sind sicher, weil sie gar nicht erst gesammelt werden. Das ist die beste Sicherheit, die ein Cybersicherheitsexperte bieten kann. Surfen Sie mit Vertrauen!",
      contactInfoTitle: "Kontaktinformationen",
      contactInfoText:
        "Wenn Sie Fragen zu dieser Datenschutzerklärung oder meinem Ansatz zum Datenschutz haben, kontaktieren Sie mich bitte unter:",
      email: "E-Mail:",
      emailAddress: "lakshaytrehan44@gmail.com",
      safeText: "Sie sind sicher bei Lakshay! 😉",
      peaceOfMind: "Where cybersecurity meets peace of mind",
    },
  }

  // Get the correct translations based on the current language
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header with navigation */}
      <header className="bg-black/80 backdrop-blur-md border-b border-cyan-500/20 py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12 border-b border-gray-800 pb-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-cyan-400">{t.title}</h1>
          <p className="text-gray-400">{t.lastUpdated}</p>
        </div>

        {/* Two-column layout for desktop */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar navigation for desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h3 className="text-lg font-medium mb-4 text-cyan-400">Contents</h3>
              <nav className="space-y-2">
                {[
                  { id: "pledge", title: t.noPledgeTitle },
                  { id: "why", title: t.whyTitle },
                  { id: "contact", title: t.contactTitle },
                  { id: "note", title: t.noteTitle },
                  { id: "technical", title: t.technicalTitle },
                  { id: "rights", title: t.rightsTitle },
                  { id: "third-party", title: t.thirdPartyTitle },
                  { id: "changes", title: t.changesTitle },
                  { id: "summary", title: t.summaryTitle },
                  { id: "contact-info", title: t.contactInfoTitle },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-400 hover:text-cyan-400 transition-colors py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-12">
            <section id="pledge">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.noPledgeTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.noPledgeText}</p>
            </section>

            <section id="why">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.whyTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.whyText}</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.contactTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.contactText}</p>
            </section>

            <section id="note" className="bg-gray-900 p-6 rounded-lg border-l-4 border-cyan-500">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-cyan-400">{t.noteTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg italic">{t.noteText}</p>
            </section>

            <section id="technical">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.technicalTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.technicalText}</p>
            </section>

            <section id="rights">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.rightsTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.rightsText}</p>
            </section>

            <section id="third-party">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.thirdPartyTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.thirdPartyText}</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.changesTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.changesText}</p>
            </section>

            <section id="summary">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-400">{t.summaryTitle}</h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">{t.summaryText}</p>
            </section>

            <section id="contact-info" className="bg-gray-900 p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-cyan-400">{t.contactInfoTitle}</h2>
              <p className="text-gray-300 mb-4 text-base md:text-lg">{t.contactInfoText}</p>
              <p className="text-gray-300 text-base md:text-lg">
                <span className="font-medium">{t.email}</span> {t.emailAddress}
              </p>
            </section>

            <div className="text-center py-8 text-gray-400">
              <p className="mb-2 text-base md:text-lg">{t.safeText}</p>
              <p className="text-sm md:text-base italic">{t.peaceOfMind}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
