/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/LIA_CPSR',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "liawow.com"]
    }
  }
}

export default nextConfig 