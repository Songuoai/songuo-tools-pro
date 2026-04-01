import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './globals-aesthetic.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '松果工具箱 Pro - 精选 510+ 免费实用工具导航平台',
    template: '%s | 松果工具箱 Pro'
  },
  description: '松果工具箱收录 510+ 优质免费工具，包含 AI 工具、AI 设计、效率办公等 9 大分类。智能搜索、分类浏览、用户收藏，一站式发现提升效率的利器。',
  keywords: ['工具导航', '免费工具', 'AI 工具', '效率工具', '在线工具', '软件推荐', 'AI 设计', '办公工具', ' productivity tools', 'AI tools'],
  authors: [{ name: '松果工具箱', url: 'https://tools.hefeiapp.top' }],
  creator: '松果工具箱',
  publisher: '松果工具箱',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://tools.hefeiapp.top',
    siteName: '松果工具箱 Pro',
    title: '松果工具箱 Pro - 精选 510+ 免费实用工具',
    description: '一站式发现提升效率的利器',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '松果工具箱 Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '松果工具箱 Pro - 精选 510+ 免费实用工具',
    description: '一站式发现提升效率的利器',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
