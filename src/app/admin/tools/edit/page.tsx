'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

const categories = ['AI 工具', 'AI 设计', 'AI 视频', 'AI 音乐', '效率办公', '影视资源', '在线音乐', '实用工具'];
const priceTypes = [
  { value: 'free', label: '🆓 免费' },
  { value: 'freemium', label: '🎁 免费额度' },
  { value: 'paid', label: '💰 付费' },
];

export default function AdminToolEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    logoUrl: '',
    category: 'AI 工具',
    priceType: 'freemium',
    shortDesc: '',
    description: '',
    tags: '',
    status: 'published',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    if (editId) {
      loadTool(editId);
    }
  }, [editId, router]);

  async function loadTool(id: string) {
    try {
      const res = await fetch(`/api/tools/${id}`);
      const tool = await res.json();
      setFormData({
        name: tool.name || '',
        url: tool.url || '',
        logoUrl: tool.logoUrl || '',
        category: tool.category || 'AI 工具',
        priceType: tool.priceType || 'freemium',
        shortDesc: tool.shortDesc || '',
        description: tool.description || '',
        tags: tool.tags ? tool.tags.join(', ') : '',
        status: tool.status || 'published',
      });
    } catch (error) {
      alert('加载失败');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editId ? `/api/tools/${editId}` : '/api/tools';
      const method = editId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(editId ? '更新成功！' : '添加成功！');
        router.push('/admin/tools');
      } else {
        alert(result.error || '操作失败');
      }
    } catch (error) {
      alert('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/admin/tools" className="flex items-center text-gray-600 hover:text-orange-600">
                <ArrowLeft size={20} className="mr-2" />
                返回工具列表
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-600 hover:text-orange-600">仪表盘</Link>
              <Link href="/" className="text-gray-600 hover:text-orange-600">返回首页</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {editId ? '编辑工具' : '添加工具'}
          </h1>
          <p className="text-gray-600">填写工具信息</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">基本信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">工具名称 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="例如：ChatGPT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">官方网站 *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://cdn.worldvectorlogo.com/logos/logo.svg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分类 *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">价格类型 *</label>
                  <select
                    required
                    value={formData.priceType}
                    onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {priceTypes.map(pt => (
                      <option key={pt.value} value={pt.value}>{pt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 描述信息 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">描述信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">简短描述 *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="一句话介绍这个工具（50 字内）"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.shortDesc.length}/50</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">详细介绍 *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="详细介绍工具的功能、特点等（200 字内）"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/200</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="用逗号分隔，例如：AI, 对话，生产力"
                />
              </div>
            </div>
          </div>

          {/* 发布设置 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">发布设置</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/tools"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium disabled:opacity-50 shadow-md hover:shadow-lg flex items-center"
            >
              <Save size={20} className="mr-2" />
              {loading ? '保存中...' : (editId ? '更新工具' : '添加工具')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
