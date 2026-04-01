'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, Filter, X, TrendingUp, Star, ArrowRight } from 'lucide-react';

function SearchContent() {
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
    const q = searchParams?.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => filterTools(), 300);
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
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.shortDesc.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) filtered = filtered.filter(t => t.categoryId === selectedCategory);
    if (selectedPrice) filtered = filtered.filter(t => t.priceType === selectedPrice);
    
    if (sortBy === 'popular') filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setTools(filtered);
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPrice('');
    setSortBy('popular');
    router.push('/search');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* 页面头部 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">搜索工具</h1>
          <p className="text-gray-600">找到你需要的工具</p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索工具名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">全部分类</option>
            </select>
            
            {/* 价格筛选 */}
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">全部价格</option>
              <option value="free">🆓 免费</option>
              <option value="freemium">🎁 免费额度</option>
              <option value="paid">💰 付费</option>
            </select>
            
            {/* 排序 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
            >
              <option value="popular">🔥 热门</option>
              <option value="rating">⭐ 评分</option>
              <option value="newest">🆕 最新</option>
            </select>
          </div>
          
          {/* 结果统计 */}
          <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-orange-600">{tools.length}</span> 个工具
            </p>
            {(searchQuery || selectedCategory || selectedPrice) && (
              <button 
                onClick={clearFilters} 
                className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <X className="w-4 h-4 mr-1" /> 
                清除筛选
              </button>
            )}
          </div>
        </div>

        {/* 工具列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.id} 
              href={`/tool/${tool.slug}`} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                {tool.logoUrl ? (
                  <img src={tool.logoUrl} alt={tool.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">{tool.name.charAt(0)}</span>
                  </div>
                )}
                <span className="text-xs px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full font-medium">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{tool.shortDesc}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="font-medium">{(tool.rating || 0).toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{tool.views || 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {tools.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">未找到相关工具</h3>
            <p className="text-gray-500 mb-6">试试其他关键词或清除筛选条件</p>
            <button 
              onClick={clearFilters}
              className="btn btn-primary px-6 py-2.5"
            >
              清除所有筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
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
  );
}
