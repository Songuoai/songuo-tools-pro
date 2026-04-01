'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

const CATEGORY_MAP: Record<string, string> = {
  // 英文 slug（首页使用）
  'video': '影视资源',
  'music': '在线音乐',
  'ai': 'AI 工具',
  'office': '效率办公',
  'design': 'AI 设计',
  'utility': '实用工具',
  'dev': '开发编程',
  
  // 拼音 slug（兼容旧链接）
  'ai-gongju': 'AI 工具',
  'xiaolv-bangong': '效率办公',
  'yingshi-ziyuan': '影视资源',
  'zaixian-yinyue': '在线音乐',
  'ai-sheji': 'AI 设计',
  'shiyong-gongju': '实用工具',
  'kaifa-biancheng': '开发编程',
};

const CATEGORY_ICONS: Record<string, string> = {
  'AI 工具': '🤖',
  '效率办公': '💼',
  '影视资源': '🎥',
  '在线音乐': '🎧',
  'AI 设计': '🎨',
  '实用工具': '🛠️',
  '开发编程': '💻',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      const allTools = data.tools || [];

      // 从 slug 获取分类名
      const name = CATEGORY_MAP[slug] || slug;
      setCategoryName(name);

      // 筛选当前分类的工具
      const filteredTools = allTools.filter((t: any) => t.category === name);
      setTools(filteredTools);
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

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
      <Header />

      {/* 分类头部 */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">{CATEGORY_ICONS[categoryName] || '📁'}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                <p className="text-sm text-gray-500 mt-2">
                  共 <span className="font-semibold text-orange-600">{tools.length}</span> 个工具
                </p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回
            </button>
          </div>
        </div>
      </section>

      {/* 工具列表 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tools.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">暂无工具</h3>
              <p className="text-gray-500">该分类下还没有工具</p>
              <Link href="/" className="mt-4 inline-block text-orange-600 hover:underline">
                返回首页
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool) => {
                const colors = [
                  'bg-gradient-to-br from-blue-500 to-blue-600',
                  'bg-gradient-to-br from-purple-500 to-purple-600',
                  'bg-gradient-to-br from-pink-500 to-pink-600',
                  'bg-gradient-to-br from-green-500 to-green-600',
                  'bg-gradient-to-br from-teal-500 to-teal-600',
                  'bg-gradient-to-br from-indigo-500 to-indigo-600',
                  'bg-gradient-to-br from-yellow-500 to-yellow-600',
                  'bg-gradient-to-br from-red-500 to-red-600',
                ];
                const colorIndex = tool.name.charCodeAt(0) % colors.length;
                const bgColor = colors[colorIndex];

                return (
                  <Link
                    key={tool.id}
                    href={`/tool/${encodeURIComponent(tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
                    className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 mb-4 rounded-2xl ${bgColor} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                      <span className="text-white font-bold text-2xl">{tool.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">{tool.name}</h3>
                    <p className="text-xs text-gray-400 mb-3 truncate">{new URL(tool.url).hostname.replace('www.', '')}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{tool.shortDesc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags && tool.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
