'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { Search, Filter, X, TrendingUp, Star, ArrowRight } from 'lucide-react'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [tools, setTools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    loadTools()
    const q = searchParams?.get('q')
    if (q) setSearchQuery(q)
  }, [searchParams])

  useEffect(() => {
    const timer = setTimeout(() => filterTools(), 300)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedPrice, sortBy, tools])

  async function loadTools() {
    try {
      const res = await fetch('/api/tools')
      const data = await res.json()
      setTools(data.tools || [])
    } catch (error) {
      console.error('加载失败:', error)
    } finally {
      setLoading(false)
    }
  }

  function filterTools() {
    let filtered = [...tools]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.shortDesc.toLowerCase().includes(q)
      )
    }
    if (selectedCategory) filtered = filtered.filter(t => t.categoryId === selectedCategory)
    if (selectedPrice) filtered = filtered.filter(t => t.priceType === selectedPrice)
    
    if (sortBy === 'popular') filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
    else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    else if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    setTools(filtered)
  }

  function clearFilters() {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedPrice('')
    setSortBy('popular')
    router.push('/search')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg p-6 shadow animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">搜索工具</h1>
          <p className="text-gray-600">找到你需要的工具</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部分类</option>
            </select>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部价格</option>
              <option value="free">免费</option>
              <option value="freemium">免费 + 付费</option>
              <option value="paid">付费</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">热门</option>
              <option value="rating">评分</option>
              <option value="newest">最新</option>
            </select>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">找到 {tools.length} 个工具</p>
            {(searchQuery || selectedCategory || selectedPrice) && (
              <button onClick={clearFilters} className="text-sm text-blue-500 hover:underline flex items-center">
                <X className="w-4 h-4 mr-1" /> 清除筛选
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tool/${tool.slug}`} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between mb-4">
                {tool.logoUrl ? (
                  <img src={tool.logoUrl} alt={tool.name} className="w-12 h-12 rounded" />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-2xl">
                    {tool.name[0]}
                  </div>
                )}
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">{tool.category}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.shortDesc}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{(tool.rating || 0).toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{tool.views || 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">未找到相关工具</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
