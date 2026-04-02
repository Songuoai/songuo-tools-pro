/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  // 禁用静态生成，使用 SSR
  experimental: {
    serverComponents: true,
  },
}

module.exports = nextConfig
