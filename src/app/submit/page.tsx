'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, CheckCircle, Link as LinkIcon, Tag, FileText } from 'lucide-react';
import { supabase, submissionsApi, useMockData } from '@/lib/supabase';

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    toolName: '',
    toolUrl: '',
    category: '',
    description: '',
    submitterName: '',
    submitterEmail: '',
  });

  const categories = [
    'AI 工具',
    'AI 设计',
    'AI 视频',
    'AI 音乐',
    '效率办公',
    '影视资源',
    '在线音乐',
    '实用工具',
    '小程序',
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isMock = useMockData();

      if (isMock) {
        // 模拟提交
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (formData.toolName && formData.toolUrl && formData.submitterEmail) {
          setSubmitted(true);
        } else {
          setError('请填写必填项');
        }
      } else {
        // Supabase 提交
        await submissionsApi.create({
          tool_name: formData.toolName,
          tool_url: formData.toolUrl,
          category: formData.category,
          description: formData.description,
          submitter_name: formData.submitterName,
          submitter_email: formData.submitterEmail,
        });

        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || '提交失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            返回首页
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">提交成功！</h1>
            <p className="text-gray-600 mb-6">
              感谢你的投稿！我们会尽快审核，审核结果将发送到你的邮箱。
            </p>
            <div className="space-y-3">
              <Link
                href="/profile"
                className="block w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                查看我的投稿
              </Link>
              <Link
                href="/"
                className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
              <Link href="/search" className="text-gray-600 hover:text-orange-600 transition-colors">搜索</Link>
              <Link href="/category/ai-tools" className="text-gray-600 hover:text-orange-600 transition-colors">分类</Link>
              <Link href="/login" className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors">登录</Link>
              <Link href="/register" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">注册</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          返回首页
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 头部 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">投稿工具</h1>
            <p className="text-gray-600 mt-2">分享你发现的好工具，让更多人受益</p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* 投稿表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 工具信息 */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">工具信息</h2>

              {/* 工具名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工具名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="例如：ChatGPT"
                />
              </div>

              {/* 官方网站 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  官方网站 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    pattern="https?://.+"
                    title="请输入有效的网址，以 http:// 或 https:// 开头"
                    value={formData.toolUrl}
                    onChange={(e) => setFormData({ ...formData, toolUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">例如：https://www.example.com</p>
              </div>

              {/* 分类 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分类
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">请选择分类</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* 描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工具描述
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="介绍这个工具的功能、特点等"
                  />
                </div>
              </div>
            </div>

            {/* 提交者信息 */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">提交者信息</h2>

              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.submitterName}
                  onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="你的名字"
                />
              </div>

              {/* 邮箱 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500 mt-1">审核结果将发送到此邮箱</p>
              </div>
            </div>

            {/* 收录标准 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-blue-900 mb-2">收录标准</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 工具必须是合法合规的</li>
                <li>• 工具应该有一定的用户基础或独特价值</li>
                <li>• 不允许提交纯营销、广告类工具</li>
                <li>• 审核时间：1-3 个工作日</li>
              </ul>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={20} className="mr-2" />
              {loading ? '提交中...' : '提交工具'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
