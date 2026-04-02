'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search } from 'lucide-react';

const mainCategories = [
  { id: 'ai', name: 'AI 工具', icon: '🤖', color: 'from-purple-500 to-purple-600', category: 'AI 工具', slug: 'ai-gongju' },
  { id: 'office', name: '效率办公', icon: '💼', color: 'from-blue-500 to-blue-600', category: '效率办公', slug: 'xiaolv-bangong' },
  { id: 'media', name: '影视娱乐', icon: '🎥', color: 'from-red-500 to-red-600', category: '影视资源', slug: 'yingshi-ziyuan' },
  { id: 'music', name: '在线音乐', icon: '🎵', color: 'from-yellow-500 to-yellow-600', category: '在线音乐', slug: 'zaixian-yinyue' },
  { id: 'design', name: '设计创作', icon: '🎨', color: 'from-pink-500 to-pink-600', category: 'AI 设计', slug: 'ai-sheji' },
  { id: 'tools', name: '实用工具', icon: '🛠️', color: 'from-orange-500 to-orange-600', category: '实用工具', slug: 'shiyong-gongju' },
  { id: 'dev', name: '开发编程', icon: '💻', color: 'from-green-500 to-green-600', category: '开发编程', slug: 'kaifa-biancheng' },
];

export default function HomePage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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

  const getCategoryCount = (name: string) => {
    const count = tools.filter(t => t.category === name).length;
    return count > 0 ? count : 0;
  };

  // 检查工具数据
  useEffect(() => {
    if (!loading && tools.length > 0) {
      console.log('工具总数:', tools.length);
      console.log('分类统计:', mainCategories.map(cat => ({
        name: cat.category,
        count: getCategoryCount(cat.category)
      })));
    }
  }, [loading, tools]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 gradient-primary rounded-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">🌰</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium animate-pulse">正在加载工具箱...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero 区域 - 渐变背景 */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fff7ed 100%)' }}>
        <div className="container-wide text-center relative">
          <div className="w-28 h-28 mx-auto mb-8 relative">
            <div className="absolute inset-0 gradient-primary rounded-3xl shadow-2xl"></div>
            <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center">
              <span className="text-white text-6xl">🌰</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            精选 170+ 优质工具
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            一站式解决工作生活需求，发现提升效率的利器
          </p>
          
          <div className="max-w-2xl mx-auto">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input');
                if (input && input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="flex items-center gap-3"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="搜索你需要的工具..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors rounded-none"
                />
              </div>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 rounded-none"
              >
                <Search size={18} />
                <span>搜索</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 分类导航 - 纯白背景 */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 gradient-text">探索分类</h2>
            <p className="text-gray-500">找到最适合你的工具类型</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 max-w-6xl mx-auto">
            {mainCategories.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group"
              >
                <div 
                  className="rounded-2xl p-5 flex flex-col items-center transition-all duration-300 ease-out group-hover:-translate-y-2"
                  style={{ 
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    outline: 'none !important',
                    border: `2px solid ${cat.color.includes('purple') ? '#c084fc' : cat.color.includes('blue') ? '#60a5fa' : cat.color.includes('red') ? '#f87171' : cat.color.includes('yellow') ? '#facc15' : cat.color.includes('pink') ? '#f472b6' : cat.color.includes('orange') ? '#fb923c' : '#4ade80'} !important`,
                    filter: 'none !important',
                    isolation: 'isolate !important'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = cat.color.includes('purple') ? '0 10px 40px -10px rgba(168, 85, 247, 0.5)' :
                                                       cat.color.includes('blue') ? '0 10px 40px -10px rgba(59, 130, 246, 0.5)' :
                                                       cat.color.includes('red') ? '0 10px 40px -10px rgba(239, 68, 68, 0.5)' :
                                                       cat.color.includes('yellow') ? '0 10px 40px -10px rgba(234, 179, 8, 0.5)' :
                                                       cat.color.includes('pink') ? '0 10px 40px -10px rgba(236, 72, 153, 0.5)' :
                                                       cat.color.includes('orange') ? '0 10px 40px -10px rgba(249, 115, 22, 0.5)' :
                                                       '0 10px 40px -10px rgba(34, 197, 94, 0.5)';
                    e.currentTarget.style.borderColor = cat.color.includes('purple') ? '#c084fc' :
                                                         cat.color.includes('blue') ? '#60a5fa' :
                                                         cat.color.includes('red') ? '#f87171' :
                                                         cat.color.includes('yellow') ? '#facc15' :
                                                         cat.color.includes('pink') ? '#f472b6' :
                                                         cat.color.includes('orange') ? '#fb923c' :
                                                         '#4ade80';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#f3f4f6';
                  }}
                >
                  <div 
                    className={`rounded-2xl w-14 h-14 mb-3 flex items-center justify-center bg-gradient-to-br ${cat.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                  >
                    <span className="text-3xl">{cat.icon}</span>
                  </div>
                  
                  <h3 className="text-sm md:text-base font-semibold text-gray-700 whitespace-nowrap transition-colors duration-300 group-hover:text-orange-600">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 transition-colors duration-300 group-hover:text-orange-500">
                    {getCategoryCount(cat.category)} 个工具
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="container-wide">
          <div className="flex justify-center items-center space-x-4 mb-4 text-xs">
            <Link href="/terms" className="text-gray-400 hover:text-orange-600 transition-colors">
              用户协议
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-gray-400 hover:text-orange-600 transition-colors">
              隐私政策
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/disclaimer" className="text-gray-400 hover:text-orange-600 transition-colors">
              免责声明
            </Link>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            © 2026 松果工具箱。All rights reserved. | 皖 ICP 备 2021005484 号 -3
          </div>
        </div>
      </footer>
    </div>
  );
}
