import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lakshaytrehan.com"
  const lastModified = new Date()

  // Define all sections of the site
  const sections = [
    { path: "", priority: 1.0 },
    { path: "about", priority: 0.9 },
    { path: "experience", priority: 0.8 },
    { path: "projects", priority: 0.8 },
    { path: "certifications", priority: 0.7 },
    { path: "contact", priority: 0.9 },
  ]

  // Create sitemap entries for main page and sections
  const mainEntries = sections.map((section) => ({
    url: section.path ? `${baseUrl}/#${section.path}` : baseUrl,
    lastModified,
    changeFrequency: section.path ? ("monthly" as const) : ("weekly" as const),
    priority: section.priority,
  }))

  // Add separate pages
  const pageEntries = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2025-03-15"),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]

  // Add language alternates
  const languageEntries = [
    {
      url: `${baseUrl}/en-US`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/de-DE`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]

  return [...mainEntries, ...pageEntries, ...languageEntries]
}
