/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable Next.js debug/development indicators
  poweredByHeader: false,
  // Suppress async params warnings in development
  experimental: {
    // This helps with Next.js 16 async params handling
  },
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

export default nextConfig
