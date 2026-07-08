"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SEOEnhancer() {
  const pathname = usePathname()

  useEffect(() => {
    // Add structured data dynamically based on current page
    const addStructuredData = () => {
      // Create JSON-LD for current page
      const currentPageData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://lakshaytrehan.com${pathname}#webpage`,
        url: `https://lakshaytrehan.com${pathname}`,
        name:
          pathname === "/"
            ? "Lakshay Trehan | Cybersecurity Expert & Ethical Hacker"
            : `${pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2)} | Lakshay Trehan`,
        isPartOf: {
          "@id": "https://lakshaytrehan.com/#website",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
        },
        datePublished: "2025-05-15T12:00:00+00:00",
        dateModified: new Date().toISOString(),
        description:
          "Professional portfolio of Lakshay Trehan, a specialized Cybersecurity Analyst and Ethical Hacker with expertise in threat analysis, security automation, and security solutions.",
        breadcrumb: {
          "@id": "https://lakshaytrehan.com/#breadcrumb",
        },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [`https://lakshaytrehan.com${pathname}`],
          },
        ],
      }

      // Add the structured data to the page
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(currentPageData)
      script.id = "dynamic-structured-data"
      document.head.appendChild(script)

      return () => {
        // Clean up
        const existingScript = document.getElementById("dynamic-structured-data")
        if (existingScript) {
          existingScript.remove()
        }
      }
    }

    // Add semantic HTML improvements
    const addSemanticImprovements = () => {
      // Add article:published_time meta for better social sharing
      const publishedMeta = document.createElement("meta")
      publishedMeta.setAttribute("property", "article:published_time")
      publishedMeta.setAttribute("content", "2025-05-15T12:00:00+00:00")
      document.head.appendChild(publishedMeta)

      // Add article:modified_time meta
      const modifiedMeta = document.createElement("meta")
      modifiedMeta.setAttribute("property", "article:modified_time")
      modifiedMeta.setAttribute("content", new Date().toISOString())
      document.head.appendChild(modifiedMeta)

      // Add article:author meta
      const authorMeta = document.createElement("meta")
      authorMeta.setAttribute("property", "article:author")
      authorMeta.setAttribute("content", "https://lakshaytrehan.com/#person")
      document.head.appendChild(authorMeta)

      return () => {
        // Clean up
        document.head.removeChild(publishedMeta)
        document.head.removeChild(modifiedMeta)
        document.head.removeChild(authorMeta)
      }
    }

    // Implement schema.org Article markup for better visibility
    const addArticleSchema = () => {
      const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Lakshay Trehan: Cybersecurity Expert & Ethical Hacker",
        image: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-15%20at%2020.12.58_43350fef.jpg-MJXAigjR7oeroI7Yu6U8bUwLvS4qTA.jpeg",
        ],
        datePublished: "2025-05-15T12:00:00+00:00",
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Person",
          name: "Lakshay Trehan",
          url: "https://lakshaytrehan.com/#person",
        },
        publisher: {
          "@type": "Person",
          name: "Lakshay Trehan",
          logo: {
            "@type": "ImageObject",
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
          },
        },
        description:
          "Professional portfolio of Lakshay Trehan, a specialized Cybersecurity Analyst and Ethical Hacker with expertise in threat analysis, security automation, and security solutions.",
      }

      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.text = JSON.stringify(articleData)
      script.id = "article-structured-data"
      document.head.appendChild(script)

      return () => {
        const existingScript = document.getElementById("article-structured-data")
        if (existingScript) {
          existingScript.remove()
        }
      }
    }

    // Add all SEO enhancements
    const cleanupStructuredData = addStructuredData()
    const cleanupSemanticImprovements = addSemanticImprovements()
    const cleanupArticleSchema = addArticleSchema()

    // Cleanup function
    return () => {
      cleanupStructuredData()
      cleanupSemanticImprovements()
      cleanupArticleSchema()
    }
  }, [pathname])

  // This component doesn't render anything visible
  return null
}
