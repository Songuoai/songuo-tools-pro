'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // 简单验证（实际应该调用 API）
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      alert('账号或密码错误！\n提示：admin / admin123');
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
      {/* 装饰背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 登录卡片 */}
      <div className="w-full max-w-md relative">
        {/* 光晕效果 */}
        <div className="absolute inset-0 gradient-primary rounded-3xl blur-xl opacity-20"></div>
        
        {/* 卡片主体 */}
        <div className="relative card p-8 backdrop-blur-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 relative group">
              <div className="absolute inset-0 gradient-primary rounded-2xl shadow-lg group-hover:shadow-orange-500/30 transition-shadow"></div>
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center">
                <span className="text-white text-4xl group-hover:scale-110 transition-transform">🌰</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">管理后台</h1>
            <p className="text-gray-500">松果工具箱 Pro</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                账号
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="请输入账号"
                  required
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm pr-12"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-4 text-base shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn size={20} className="mr-2" />
                  登录
                </span>
              )}
            </button>
          </form>

          {/* 提示信息 */}
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-start space-x-3">
              <Sparkles size={18} className="text-orange-500 mt-0.5" />
              <div className="text-sm text-orange-700">
                <p className="font-medium mb-1">测试账号</p>
                <p className="text-orange-600">账号：admin</p>
                <p className="text-orange-600">密码：admin123</p>
              </div>
            </div>
          </div>

          {/* 返回链接 */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-orange-600 transition-colors text-sm font-medium"
            >
              ← 返回前台
            </Link>
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2026 松果工具箱 Pro. All rights reserved.
        </div>
      </div>
    </div>
  );
}
