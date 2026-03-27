'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Wrench, Users, FileText, Settings, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    tools: 0,
    categories: 0,
    aiTools: 0,
    published: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }
    loadStats();
  }, [router]);

  async function loadStats() {
    try {
      const res = await fetch('/api/tools', { 
        cache: 'no-store',
        next: { revalidate: 60 } // 1 分钟重新验证
      });
      const data = await res.json();
      const tools = data.tools || [];
      
      setStats({
        tools: tools.length,
        categories: new Set(tools.map((t: any) => t.category)).size,
        aiTools: tools.filter((t: any) => t.category === 'AI 工具').length,
        published: tools.filter((t: any) => t.status === 'published').length,
      });
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="card p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold gradient-text mb-2">欢迎回来，管理员！</h2>
            <p className="text-gray-500">今天也是高效管理的一天呢</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-4xl">🎉</span>
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: '工具总数', 
            value: stats.tools, 
            icon: '🛠️', 
            gradient: 'from-orange-500 to-orange-600',
            color: 'text-orange-600'
          },
          { 
            title: '分类数量', 
            value: stats.categories, 
            icon: '📂', 
            gradient: 'from-blue-500 to-blue-600',
            color: 'text-blue-600'
          },
          { 
            title: 'AI 工具', 
            value: stats.aiTools, 
            icon: '🤖', 
            gradient: 'from-purple-500 to-purple-600',
            color: 'text-purple-600'
          },
          { 
            title: '已发布', 
            value: stats.published, 
            icon: '✅', 
            gradient: 'from-green-500 to-green-600',
            color: 'text-green-600'
          },
        ].map((stat, index) => (
          <div key={index} className="card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <Sparkles size={20} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
            <div className="text-gray-500 text-sm font-medium">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* 快捷操作 */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Sparkles size={24} className="mr-2 text-orange-500" />
          快捷操作
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: '/admin/tools',
              icon: Wrench,
              title: '工具管理',
              desc: '添加、编辑、删除工具',
              gradient: 'from-orange-500 to-orange-600',
            },
            {
              href: '/admin/users',
              icon: Users,
              title: '用户管理',
              desc: '查看用户列表',
              gradient: 'from-blue-500 to-blue-600',
            },
            {
              href: '/admin/settings',
              icon: Settings,
              title: '系统设置',
              desc: '配置网站参数',
              gradient: 'from-green-500 to-green-600',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="group card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ArrowRight 
                    size={20} 
                    className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 最近工具 */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <TrendingUp size={24} className="mr-2 text-orange-500" />
            最近工具
          </h3>
          <Link 
            href="/admin/tools" 
            className="btn btn-ghost text-orange-600 hover:text-orange-700 group"
          >
            查看全部
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">工具名称</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">分类</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">价格类型</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">状态</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <span className="font-medium text-gray-900">Claude</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">AI 工具</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    🎁 免费额度
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                    已发布
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link 
                    href="/admin/tools/edit/claude"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold">G</span>
                    </div>
                    <span className="font-medium text-gray-900">Gemini</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">AI 工具</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                    🆓 免费
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                    已发布
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link 
                    href="/admin/tools/edit/gemini"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
