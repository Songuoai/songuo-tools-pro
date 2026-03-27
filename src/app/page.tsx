'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search, ArrowRight } from 'lucide-react';

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

  const getCategoryCount = (name: string) => tools.filter(t => t.category === name).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
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
    <div className="min-h-screen gradient-mesh">
      <Header />

      {/* Hero 区域 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh"></div>
        
        <div className="relative container-wide text-center">
          <div className="w-28 h-28 mx-auto mb-8 relative group">
            <div className="absolute inset-0 gradient-primary rounded-3xl shadow-2xl"></div>
            <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center">
              <span className="text-white text-6xl">🌰</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            精选 510+ 优质工具
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            一站式解决工作生活需求，发现提升效率的利器
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input');
                if (input && input.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="relative flex items-center bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl px-6 py-4 shadow-xl"
            >
              <Search size={24} className="text-gray-400 mr-4" />
              <input
                type="text"
                placeholder="搜索你需要的工具..."
                className="flex-1 text-gray-700 placeholder-gray-400 outline-none text-base"
              />
              <button type="submit" className="text-orange-600 hover:text-orange-700">
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="py-16 bg-gradient-to-b from-white/80 to-orange-50/50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">探索分类</h2>
            <p className="text-gray-500">找到最适合你的工具类型</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {mainCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group card p-5 text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-orange-600">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400">
                  {getCategoryCount(cat.category)} 个工具
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 border-t border-gray-100 bg-white/50">
        <div className="container-wide">
          {/* 法律链接 */}
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
          
          {/* 版权信息 */}
          <div className="text-center text-sm text-gray-500">
            © 2026 松果工具箱。All rights reserved. | 皖 ICP 备 2021005484 号 -3
          </div>
        </div>
      </footer>
    </div>
  );
}
