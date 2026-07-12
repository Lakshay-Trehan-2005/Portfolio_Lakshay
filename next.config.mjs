/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true,
  },
  // Disable static generation for error pages
  output: 'export',
  // Ignore build errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable experimental features
  experimental: {
    // Empty to avoid issues
  },
  // Disable static optimization for error pages
  staticPageGenerationTimeout: 120,
  // Disable compression to simplify build
  compress: false,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
}

export default nextConfig
