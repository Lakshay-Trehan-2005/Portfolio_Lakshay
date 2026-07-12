import type { MetadataRoute } from "next"
export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lakshay Trehan - Cybersecurity Analyst",
    short_name: "Lakshay Trehan",
    description: "Portfolio of Lakshay Trehan, Cybersecurity Analyst and Ethical Hacker",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#22d3ee",
    icons: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqmAhJyMIZGtj3NzWuZHgkdYjDULli.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
