/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'extngo-eight.vercel.app',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Generate ETags for caching
  generateEtags: true,
  // Trailing slash configuration
  trailingSlash: false,
  // Power by header removal for security
  poweredByHeader: false,
}

module.exports = nextConfig
