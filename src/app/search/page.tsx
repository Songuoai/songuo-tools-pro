'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, Filter, X, TrendingUp, Star, ArrowRight } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    loadTools();
    // 如果 URL 有搜索参数，自动填充
    const q = searchParams?.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterTools();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedPrice, sortBy, tools]);

  async function loadTools() {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterTools() {
    let filtered = [...tools];

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      // 精确搜索：只匹配名称和简介中包含关键词的工具
      filtered = filtered.filter(t => {
        const nameMatch = t.name.toLowerCase().includes(query);
        const descMatch = t.shortDesc.toLowerCase().includes(query);
        const categoryMatch = t.category.toLowerCase().includes(query);
        return nameMatch || descMatch || categoryMatch;
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (selectedPrice) {
      filtered = filtered.filter(t => t.priceType === selectedPrice);
    }

    // 排序
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setTools(filtered);
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPrice('');
    setSortBy('popular');
    loadTools();
  }

  const categories = [...new Set(tools.map(t => t.category))];
  const priceLabels: any = {
    free: '🆓 免费',
    freemium: '🎁 免费额度',
    paid: '💰 付费',
    'limited-free': '⏰ 限时免费',
    trial: '🧪 试用',
    contact: '📞 询价',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌰</span>
              </div>
              <span className="text-lg font-bold text-gray-900">松果工具箱</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Link href="/login" className="px-3 py-1.5 text-sm text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50">登录</Link>
              <Link href="/register" className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700">注册</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 搜索头部 */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">搜索工具</h1>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索工具名称或描述..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 主体内容 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 筛选栏 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">全部分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">全部价格</option>
                  <option value="free">🆓 免费</option>
                  <option value="freemium">🎁 免费额度</option>
                  <option value="paid">💰 付费</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="popular">最受欢迎</option>
                  <option value="rating">评分最高</option>
                </select>
              </div>

              {(searchQuery || selectedCategory || selectedPrice) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600"
                >
                  <X size={20} className="mr-1" /> 清除
                </button>
              )}
            </div>
          </div>

          {/* 结果统计 */}
          <div className="mb-6 text-sm text-gray-600">
            找到 <span className="font-bold text-orange-600">{tools.length}</span> 个工具
          </div>

          {/* 工具列表 */}
          {tools.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <Filter size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">未找到工具</h3>
              <p className="text-gray-500 mb-6">尝试更换搜索词或清除筛选条件</p>
              <button onClick={clearFilters} className="text-orange-600 hover:underline">清除所有筛选</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tool/${tool.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl hover:border-orange-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md flex-shrink-0">
                        <span className="text-white font-bold text-xl">{tool.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-orange-600">{tool.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{tool.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded">
                      {priceLabels[tool.priceType] || '付费'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.shortDesc}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <TrendingUp size={14} className="mr-1" />
                        {tool.views}
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
