'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { TrendingUp, Star, ArrowRight } from 'lucide-react';

const categoryIcons: any = {
  'AI 工具': '🤖',
  'AI 设计': '🎨',
  'AI 视频': '🎬',
  'AI 音乐': '🎵',
  '效率办公': '💼',
  '影视资源': '🎥',
  '在线音乐': '🎧',
  '实用工具': '🛠️',
  '开发编程': '💻',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tools, setTools] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // 筛选标签
  const filterTags = ['all', '视频', '去水印', '图片', '音频', 'PDF', '二维码', '转换'];

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      const allTools = data.tools || [];

      // 获取所有分类
      const categories: Record<string, number> = {};
      allTools.forEach((tool: any) => {
        categories[tool.category] = (categories[tool.category] || 0) + 1;
      });

      const categoryList = Object.entries(categories).map(([name, count]) => ({
        id: name,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        count,
      }));

      setAllCategories(categoryList);

      // 查找当前分类（通过 slug 反推分类名称）
      const slugToCategory: Record<string, string> = {
        'ai-gongju': 'AI 工具',
        'xiaolv-bangong': '效率办公',
        'yingshi-ziyuan': '影视资源',
        'zaixian-yinyue': '在线音乐',
        'ai-sheji': 'AI 设计',
        'shiyong-gongju': '实用工具',
        'kaifa-biancheng': '开发编程',
      };

      const categoryName = slugToCategory[slug] || slug;
      const foundCategory = categoryList.find(c => c.name === categoryName);
      setCategory(foundCategory || null);

      // 筛选当前分类的工具
      let filteredTools = foundCategory
        ? allTools.filter((t: any) => t.category === foundCategory.name)
        : allTools;

      // 根据筛选标签过滤
      if (selectedFilter !== 'all') {
        filteredTools = filteredTools.filter((t: any) =>
          t.tags && t.tags.some((tag: string) => tag.includes(selectedFilter))
        );
      }

      // 排序
      if (sortBy === 'popular') {
        filteredTools.sort((a: any, b: any) => b.views - a.views);
      } else if (sortBy === 'rating') {
        filteredTools.sort((a: any, b: any) => b.rating - a.rating);
      }

      setTools(filteredTools);
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

  const priceLabels: any = {
    free: '🆓 免费',
    freemium: '🎁 免费额度',
    paid: '💰 付费',
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
      <Header />

      {/* 分类头部 */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">{categoryIcons[category?.name] || '📁'}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{category ? category.name : '全部工具'}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-sm text-gray-500">
                    {category === 'AI 工具' && '发现优质 AI 工具，提升工作效率'}
                    {category === '效率办公' && '发现优质办公工具，提升工作效率'}
                    {category === '影视资源' && '发现优质影视平台，畅享高清视频'}
                    {category === '在线音乐' && '发现优质音乐平台，畅听海量音乐'}
                    {category === 'AI 设计' && '发现优质设计工具，激发创作灵感'}
                    {category === '实用工具' && '发现优质实用工具，解决日常需求'}
                    {category === '开发编程' && '发现优质开发工具，提升 coding 效率'}
                    {!category && '发现优质工具，提升工作效率'}
                  </p>
                  <span className="text-sm text-gray-400">·</span>
                  <span className="text-sm font-medium text-orange-600">共 {tools.length} 个工具</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <span>←</span>
              <span>返回</span>
            </button>
          </div>
        </div>
      </section>

      {/* 主体内容 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 工具列表 */}
          {tools.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">暂无工具</h3>
              <p className="text-gray-500">该分类下还没有工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {tools.map((tool) => {
                // 根据工具名称生成不同颜色的图标背景
                const colors = [
                  'bg-blue-500',
                  'bg-purple-500',
                  'bg-pink-500',
                  'bg-green-500',
                  'bg-teal-500',
                  'bg-indigo-500',
                  'bg-yellow-500',
                  'bg-red-500',
                ];
                const colorIndex = tool.name.charCodeAt(0) % colors.length;
                const bgColor = colors[colorIndex];

                return (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.slug}`}
                    className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
                  >
                    {/* 图标 */}
                    <div className={`w-14 h-14 mb-4 rounded-2xl ${bgColor} flex items-center justify-center`}>
                      <span className="text-white font-bold text-xl">{tool.name.charAt(0)}</span>
                    </div>

                    {/* 名称 */}
                    <h3 className="font-bold text-gray-900 text-base mb-1">{tool.name}</h3>

                    {/* 网址 */}
                    <p className="text-xs text-gray-400 mb-3 truncate">{new URL(tool.url).hostname.replace('www.', '')}</p>

                    {/* 描述 */}
                    <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">{tool.shortDesc}</p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
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
