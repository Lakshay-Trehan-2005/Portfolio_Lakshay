import "@/app/globals.css"
import CookieConsent from "@/components/cookie-consent"
import CustomCursor from "@/components/custom-cursor"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import { Inter } from "next/font/google"
import Script from "next/script"
import type React from "react"

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Lakshay Trehan | Senior Cybersecurity Analyst & Ethical Hacker",
  description:
    "Lakshay Trehan is a specialized Cybersecurity Analyst and Ethical Hacker with expertise in threat analysis, security automation, and implementing robust security solutions for organizations worldwide.",
  keywords:
    "Lakshay Trehan, Cybersecurity Expert, Ethical Hacker, Security Analyst, Cyber Security Professional, Information Security Specialist, Network Security, Security Consultant, Vulnerability Assessment, ISO 27001, GDPR, AI Security",
  authors: [{ name: "Lakshay Trehan", url: "https://lakshaytrehan.de" }],
  creator: "Lakshay Trehan",
  publisher: "Lakshay Trehan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lakshaytrehan.de"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "Lakshay Trehan | Senior Cybersecurity Analyst & Ethical Hacker",
    description:
      "Lakshay Trehan is a specialized Cybersecurity Analyst and Ethical Hacker with expertise in threat analysis, security automation, and implementing robust security solutions for organizations worldwide.",
    url: "https://lakshaytrehan.de",
    siteName: "Lakshay Trehan - Cybersecurity Portfolio",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
        width: 800,
        height: 800,
        alt: "Lakshay Trehan - Cybersecurity Professional",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshay Trehan | Senior Cybersecurity Analyst & Ethical Hacker",
    description:
      "Lakshay Trehan is a specialized Cybersecurity Analyst and Ethical Hacker with expertise in threat analysis, security automation, and implementing robust security solutions for organizations worldwide.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
    ],
    creator: "@lakshaytrehan",
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
    shortcut: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code when available
  },
  category: "technology",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Lakshay Trehan",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#22d3ee",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png"
        />

        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="dns-prefetch" href="https://ipinfo.io" />
        <link rel="dns-prefetch" href="https://get.geojs.io" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        <link rel="preconnect" href="https://ipapi.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ipinfo.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://get.geojs.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg"
          as="image"
          type="image/jpeg"
        />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="en" href="https://lakshaytrehan.de/en-US" />
        <link rel="alternate" hrefLang="de" href="https://lakshaytrehan.de/de-DE" />
        <link rel="alternate" hrefLang="x-default" href="https://lakshaytrehan.de" />

        {/* Social media profiles */}
        <link rel="me" href="https://github.com/Lakshay-Trehan-2005" />
        <link rel="me" href="https://www.linkedin.com/in/lakshaytrehan/" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://lakshaytrehan.de" />
      </head>
      <body className={`dark`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <CustomCursor />
            <CookieConsent />
            {children}
          </ThemeProvider>
        </LanguageProvider>

        {/* EmailJS Script - Load at the end of body for better performance */}
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" strategy="lazyOnload" />

        {/* Advanced Structured Data - Person Schema */}
        <Script id="schema-person" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://lakshaytrehan.de/#person",
              "name": "Lakshay Trehan",
              "givenName": "Lakshay",
              "familyName": "Trehan",
              "url": "https://lakshaytrehan.de",
              "image": {
                "@type": "ImageObject",
                "url": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
                "width": 800,
                "height": 800
              },
              "sameAs": [
                "https://www.linkedin.com/in/lakshaytrehan/",
                "https://github.com/Lakshay-Trehan-2005"
              ],
              "jobTitle": "Cybersecurity Analyst",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Cybersecurity Analyst and Ethical Hacker specializing in penetration testing, threat analysis, and security solutions.",
              "knowsAbout": ["Cybersecurity", "Penetration Testing", "Network Security", "Ethical Hacking", "Web Application Security"],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "International University of Applied Sciences",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bad Honnef",
                  "addressCountry": "Germany"
                }
              },
              "nationality": {
                "@type": "Country",
                "name": "India"
              },
              "knowsLanguage": ["English", "German"],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Cybersecurity Job Simulation",
                  "credentialCategory": "certification",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "Forage & Mastercard"
                  },
                  "validFrom": "2025-03"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Career Essentials in Cybersecurity",
                  "credentialCategory": "certification",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "Microsoft & LinkedIn"
                  },
                  "validFrom": "2024-08"
                }
              ]
            }
          `}
        </Script>

        {/* WebSite Schema */}
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://lakshaytrehan.de/#website",
              "url": "https://lakshaytrehan.de",
              "name": "Lakshay Trehan - Cybersecurity Portfolio",
              "description": "Professional portfolio of Lakshay Trehan, a specialized Cybersecurity Analyst and Ethical Hacker",
              "publisher": {
                "@id": "https://lakshaytrehan.de/#person"
              },
              "inLanguage": ["en-US", "de-DE"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://lakshaytrehan.de/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>

        {/* Professional Service Schema */}
        <Script id="schema-service" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://lakshaytrehan.de/#service",
              "name": "Lakshay Trehan Cybersecurity Services",
              "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
              "url": "https://lakshaytrehan.de",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Germany"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 50.6428,
                "longitude": 7.2262
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.linkedin.com/in/lakshaytrehan/",
                "https://github.com/Lakshay-Trehan-2005"
              ],
              "priceRange": "$$",
              "servesCuisine": ["Cybersecurity", "Penetration Testing", "Security Consulting"],
              "founder": {
                "@id": "https://lakshaytrehan.de/#person"
              }
            }
          `}
        </Script>

        {/* FAQ Schema */}
        <Script id="schema-faq" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does Lakshay Trehan offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lakshay Trehan offers a comprehensive range of cybersecurity services including penetration testing, vulnerability assessment, network security analysis, secure coding practices, and security consulting for organizations of all sizes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Lakshay Trehan's background in cybersecurity?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lakshay Trehan is a cybersecurity analyst and ethical hacker with expertise in identifying and mitigating digital threats. He specializes in penetration testing, vulnerability assessment, and implementing robust security solutions to protect organizations from evolving cyber threats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I contact Lakshay Trehan for cybersecurity services?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can contact Lakshay Trehan through the contact form on his website, via email at lakshaytrehan44@gmail.com, or connect with him on LinkedIn at linkedin.com/in/lakshaytrehan."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What certifications does Lakshay Trehan hold?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Lakshay Trehan holds several certifications in cybersecurity including Cybersecurity Job Simulation from Forage & Mastercard, Career Essentials in Cybersecurity from Microsoft & LinkedIn, and various other specialized certifications in ethical hacking and security analysis."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Lakshay Trehan work internationally?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Lakshay Trehan offers cybersecurity services internationally. Based in Germany, he works with clients worldwide, providing remote security assessments, consulting, and implementation of security solutions."
                  }
                }
              ]
            }
          `}
        </Script>

        {/* BreadcrumbList Schema */}
        <Script id="schema-breadcrumb" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://lakshaytrehan.de"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://lakshaytrehan.de/#about"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Experience",
                  "item": "https://lakshaytrehan.de/#experience"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Projects",
                  "item": "https://lakshaytrehan.de/#projects"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Certifications",
                  "item": "https://lakshaytrehan.de/#certifications"
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "Contact",
                  "item": "https://lakshaytrehan.de/#contact"
                }
              ]
            }
          `}
        </Script>

        {/* Google Tag Manager - Add when you have an account */}
        {/* <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
        </Script> */}

        {/* Performance monitoring */}
        <Script id="performance-monitoring" strategy="afterInteractive">
          {`
            // Web Vitals monitoring
            const reportWebVitals = (metric) => {
              // When ready, send to analytics
              console.log(metric);
            };
            
            // Performance observer for long tasks
            if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
              try {
                const perfObserver = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    // Log long tasks for debugging
                    if (entry.duration > 50) {
                      console.log('Long task detected:', entry);
                    }
                  }
                });
                
                perfObserver.observe({ type: 'longtask', buffered: true });
              } catch (e) {
                console.error('Performance observer error:', e);
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
