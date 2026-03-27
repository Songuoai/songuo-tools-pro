'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Wrench, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard },
    { href: '/admin/tools', label: '工具管理', icon: Wrench },
    { href: '/admin/users', label: '用户管理', icon: Users },
    { href: '/admin/submissions', label: '投稿审核', icon: FileText },
    { href: '/admin/settings', label: '系统设置', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen gradient-mesh">
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 glass rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 侧边栏 - 玻璃态设计 */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 glass border-r border-gray-100/50 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-xl`}
      >
        {/* Logo 区域 */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100/50">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 gradient-primary rounded-xl shadow-lg group-hover:shadow-orange-500/30 transition-shadow"></div>
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🌰</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text">松果工具箱</span>
              <span className="text-xs text-gray-400 -mt-0.5">管理后台</span>
            </div>
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active
                    ? 'gradient-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-white/80 hover:shadow-sm'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`transition-transform group-hover:scale-110 ${
                    active ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                {active && (
                  <div className="ml-auto">
                    <Sparkles size={14} className="text-white/80" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 底部操作区 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100/50">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-white/80 hover:text-orange-600 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">返回前台</span>
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="lg:ml-72 min-h-screen">
        {/* 顶部栏 */}
        <header className="h-20 glass border-b border-gray-100/50 sticky top-0 z-30">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">
                {navItems.find(item => isActive(item.href))?.label || '管理后台'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* 管理员信息 */}
              <div className="flex items-center space-x-3 px-4 py-2 glass rounded-xl">
                <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-sm">管</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">管理员</span>
                  <span className="text-xs text-gray-400">在线</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* 遮罩层（移动端） */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
