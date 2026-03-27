'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { saveSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 开发模式：允许任意账号登录
      if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
        const session = {
          userId: 'dev-user',
          email: email,
          name: '演示用户',
          rememberMe: rememberMe,
        };
        
        // 无论是否记住我，都保存到 localStorage（开发模式）
        localStorage.setItem('songguo_user_session', JSON.stringify(session));
        console.log('✅ 登录成功，session 已保存:', session);
        
        // 等待存储完成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        router.push('/profile');
        setLoading(false);
        return;
      }

      // 生产模式：使用 Supabase 认证
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const session = {
          userId: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
          avatarUrl: data.user.user_metadata?.avatar_url,
          accessToken: data.session?.access_token,
          refreshToken: data.session?.refresh_token,
          expiresAt: data.session?.expires_at 
            ? data.session.expires_at * 1000
            : undefined,
          rememberMe: rememberMe,
        };
        
        saveSession(session);
        console.log('✅ 登录成功，session 已保存:', session);
        
        // 等待存储完成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        router.push('/profile');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          返回首页
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">🌰</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            <p className="text-gray-600">登录松果工具箱</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" 
                />
                <span className="ml-2 text-sm text-gray-700">记住我</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline">忘记密码？</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            还没有账号？{' '}
            <Link href="/register" className="text-orange-600 hover:underline font-medium">立即注册</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
