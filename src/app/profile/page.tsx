'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Heart,
  FileText,
  Settings,
  LogOut,
  Mail,
  Calendar,
  Shield,
  Edit2,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isLoggedIn, getSession, clearSession } from '@/lib/auth';
import { Tool } from '@/types/database';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'favorites' | 'submissions' | 'settings'>('favorites');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      console.log('🔍 开始加载用户数据...');
      setLoading(true);
      
      // 检查登录状态
      const session = getSession();
      console.log('📋 Session:', session);
      
      if (!session) {
        console.log('❌ 未登录，跳转到登录页');
        router.push('/login');
        return;
      }
      
      console.log('✅ 登录状态正常，设置用户信息');
      setUser({
        name: session.name || '用户',
        email: session.email || '',
        avatar_url: session.avatar_url,
        created_at: new Date().toISOString(),
      });

      // 加载收藏（简化：暂时显示空列表）
      setFavorites([]);

      // 加载投稿
      try {
        console.log('📥 加载投稿数据...');
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('submitter_email', session.email)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('❌ 加载投稿失败:', error);
        } else {
          console.log('✅ 投稿数据加载成功:', data?.length);
        }
        setSubmissions(data || []);
      } catch (dbError) {
        console.error('❌ 加载投稿异常:', dbError);
        setSubmissions([]);
      }
      
      console.log('✅ 用户数据加载完成');
    } catch (error) {
      console.error('❌ 加载用户数据失败:', error);
    } finally {
      console.log('⏹️  设置 loading 为 false');
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
      clearSession();
      router.push('/');
    }
  }

  async function handleSaveProfile() {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: '松果' },
      });
      
      if (error) throw error;
      
      alert('✅ 资料已更新');
      loadUserData();
    } catch (error: any) {
      alert('❌ 更新失败：' + error.message);
    }
  }

  async function handleChangePassword() {
    try {
      const { error } = await supabase.auth.updateUser({
        password: 'newpassword123',
      });
      
      if (error) throw error;
      
      alert('✅ 密码已更新（演示：新密码为 newpassword123）');
    } catch (error: any) {
      alert('❌ 修改失败：' + error.message);
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
      {/* 导航栏 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌰</span>
              </div>
              <span className="text-lg font-bold text-gray-900">松果工具箱</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">首页</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-orange-600 transition-colors">
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          返回首页
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧：用户信息 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* 头像 */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name || '用户'}</h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
              </div>

              {/* 统计 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{favorites.length}</div>
                  <div className="text-xs text-gray-500 mt-1">收藏</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{submissions.length}</div>
                  <div className="text-xs text-gray-500 mt-1">投稿</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-xs text-gray-500 mt-1">评论</div>
                </div>
              </div>

              {/* 菜单 */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'favorites'
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={20} className="mr-3" />
                  我的收藏
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'submissions'
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText size={20} className="mr-3" />
                  我的投稿
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  账号设置
                </button>
              </nav>

              {/* 退出登录 */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-3 mt-4 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} className="mr-2" />
                退出登录
              </button>
            </div>
          </div>

          {/* 右侧：内容区 */}
          <div className="lg:col-span-3">
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Heart size={24} className="text-orange-600 mr-3" />
                  我的收藏
                </h2>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">暂无收藏</h3>
                    <p className="text-gray-500 mb-6">去发现一些好工具吧！</p>
                    <Link href="/search" className="text-orange-600 hover:underline">
                      浏览工具
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 font-bold">{tool.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{tool.name}</h3>
                            <p className="text-sm text-gray-500">{tool.short_desc}</p>
                          </div>
                        </div>
                        <Link
                          href={`/tool/${tool.slug}`}
                          className="text-orange-600 hover:underline text-sm"
                        >
                          查看详情
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText size={24} className="text-orange-600 mr-3" />
                  我的投稿
                </h2>
                {submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">暂无投稿</h3>
                    <p className="text-gray-500 mb-6">分享你发现的好工具吧！</p>
                    <Link href="/submit" className="text-orange-600 hover:underline">
                      投稿工具
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{submission.tool_name}</h3>
                          <p className="text-sm text-gray-500">{submission.tool_url}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === 'pending' && (
                            <span className="flex items-center text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
                              <Clock size={12} className="mr-1" />
                              审核中
                            </span>
                          )}
                          {submission.status === 'approved' && (
                            <span className="flex items-center text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                              <CheckCircle size={12} className="mr-1" />
                              已通过
                            </span>
                          )}
                          {submission.status === 'rejected' && (
                            <span className="flex items-center text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                              <XCircle size={12} className="mr-1" />
                              已拒绝
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Settings size={24} className="text-orange-600 mr-3" />
                  账号设置
                </h2>
                <div className="space-y-6">
                  {/* 基本信息 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">基本信息</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          姓名
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.name || ''}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          邮箱
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email || ''}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">邮箱不可修改</p>
                      </div>
                      <button onClick={handleSaveProfile} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        保存修改
                      </button>
                    </div>
                  </div>

                  {/* 修改密码 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">修改密码</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          当前密码
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          新密码
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <button onClick={handleChangePassword} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        修改密码
                      </button>
                    </div>
                  </div>

                  {/* 账号信息 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">账号信息</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">注册时间</span>
                        <span className="text-gray-900">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">账号状态</span>
                        <span className="text-green-600 flex items-center">
                          <CheckCircle size={14} className="mr-1" />
                          正常
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">角色</span>
                        <span className="text-gray-900">普通用户</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
