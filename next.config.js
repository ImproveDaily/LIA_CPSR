/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bij ontwikkeling gebruiken we geen static export
  ...(process.env.NODE_ENV === 'development' ? {} : { output: 'export' }),
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