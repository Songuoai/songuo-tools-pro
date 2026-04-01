'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Star, TrendingUp, ArrowRight, ArrowLeft, ExternalLink, Heart, Share2, Bookmark } from 'lucide-react';
import { categoryIcons, categoryGradients, priceLabels } from '@/lib/design-system';

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [tool, setTool] = useState<any>(null);
  const [similarTools, setSimilarTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTool();
  }, [slug]);

  async function loadTool() {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      
      // 解码 slug（处理中文 URL 编码）
      const decodedSlug = decodeURIComponent(slug);
      
      const foundTool = data.tools.find((t: any) => {
        const toolSlug = t.slug || generateSlug(t.name);
        // 精确匹配 slug
        return toolSlug === decodedSlug;
      });
      
      if (foundTool) {
        setTool(foundTool);
        const similar = data.tools
          .filter((t: any) => t.category === foundTool.category && t.id !== foundTool.id)
          .slice(0, 4);
        setSimilarTools(similar);
      } else {
        console.log('未找到工具:', decodedSlug);
        console.log('所有工具 slugs:', data.tools.map((t: any) => t.slug));
      }
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

  function generateSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  const priceInfo: any = {
    free: { text: '完全免费', color: 'text-green-600', bg: 'bg-green-50', icon: '🆓' },
    freemium: { text: '免费额度', color: 'text-blue-600', bg: 'bg-blue-50', icon: '🎁' },
    paid: { text: '付费', color: 'text-purple-600', bg: 'bg-purple-50', icon: '💰' },
    'limited-free': { text: '限时免费', color: 'text-orange-600', bg: 'bg-orange-50', icon: '⏰' },
    trial: { text: '免费试用', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '🧪' },
    contact: { text: '联系询价', color: 'text-gray-600', bg: 'bg-gray-50', icon: '📞' },
  };

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
          <p className="text-gray-500 text-sm font-medium animate-pulse">正在加载...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">工具未找到</h1>
          <p className="text-gray-500 mb-6">抱歉，您访问的工具不存在</p>
          <Link href="/" className="btn btn-primary px-6 py-3">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const price = priceInfo[tool.priceType] || priceInfo.paid;
  const categoryIcon = categoryIcons[tool.category] || '🔧';
  const categoryGradient = categoryGradients[tool.category] || 'from-gray-400 to-gray-500';

  return (
    <div className="min-h-screen gradient-mesh">
      {/* ========== 导航栏 ========== */}
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50">
        <div className="container-wide">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 gradient-primary rounded-xl shadow-lg"></div>
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🌰</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold gradient-text">松果工具箱</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/login" className="btn btn-ghost px-4 py-2 text-sm">登录</Link>
              <Link href="/register" className="btn btn-primary px-4 py-2 text-sm">免费注册</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== 工具详情 - 英雄区 ========== */}
      <section className="py-12">
        <div className="container-wide">
          {/* 返回按钮 */}
          <button 
            onClick={() => router.back()} 
            className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-medium">返回</span>
          </button>

          {/* 工具卡片 */}
          <div className="card p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* 左侧信息 */}
              <div className="flex items-start space-x-6 flex-1">
                {/* 图标 */}
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow`}>
                  <span className="text-white text-4xl">{categoryIcon}</span>
                </div>
                
                {/* 内容 */}
                <div className="flex-1">
                  {/* 分类标签 */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${price.bg} ${price.color}`}>
                      {price.icon} {price.text}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {tool.category}
                    </span>
                  </div>
                  
                  {/* 标题 */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                    {tool.name}
                  </h1>
                  
                  {/* 描述 */}
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {tool.shortDesc}
                  </p>
                  
                  {/* 统计数据 */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <Star size={20} className="text-yellow-400 fill-yellow-400 mr-2" />
                      <span className="text-xl font-bold text-gray-900">{tool.rating}</span>
                      <span className="text-gray-400 ml-1">/ 5.0</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp size={20} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{tool.views.toLocaleString()} 次浏览</span>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-3">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink size={18} className="inline mr-2 -mt-0.5" />
                      访问官网
                    </a>
                    <button className="btn btn-secondary px-4 py-3.5">
                      <Bookmark size={18} />
                    </button>
                    <button className="btn btn-secondary px-4 py-3.5">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 详细介绍 ========== */}
      <section className="py-12">
        <div className="container-wide">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">详细介绍</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {tool.description || tool.shortDesc}
              </p>
              {tool.features && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">主要功能</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {(() => {
                      // 安全处理 features：支持字符串、数组、null
                      let featuresList: string[] = [];
                      if (typeof tool.features === 'string') {
                        featuresList = tool.features.split('\n');
                      } else if (Array.isArray(tool.features)) {
                        featuresList = tool.features;
                      }
                      return featuresList.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-600">{feature?.replace(/^[-•*]\s*/, '') || feature}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== 类似工具 ========== */}
      {similarTools.length > 0 && (
        <section className="py-12">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-8 tracking-tight">类似工具推荐</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarTools.map((similar) => (
                <Link key={similar.id} href={`/tool/${similar.slug}`} className="group">
                  <div className="tool-card p-5 h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryGradients[similar.category] || 'from-gray-400 to-gray-500'} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                        <span className="text-xl">{categoryIcons[similar.category] || '🔧'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                          {similar.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {similar.shortDesc}
                        </p>
                        <div className="flex items-center mt-2">
                          <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{similar.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== 页脚 ========== */}
      <footer className="py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌰</span>
              </div>
              <span className="font-semibold text-gray-700">松果工具箱 Pro</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2026 松果工具箱。All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
