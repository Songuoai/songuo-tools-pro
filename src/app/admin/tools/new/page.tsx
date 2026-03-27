'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, Sparkles, Upload } from 'lucide-react';

const categories = [
  'AI 工具', 'AI 设计', 'AI 视频', 'AI 音乐',
  '效率办公', '影视资源', '在线音乐', '实用工具', '开发编程'
];

const priceTypes = [
  { value: 'free', label: '🆓 完全免费', desc: '无需付费，完全免费使用' },
  { value: 'freemium', label: '🎁 免费额度', desc: '基础功能免费，高级功能付费' },
  { value: 'paid', label: '💰 付费', desc: '需要付费才能使用' },
  { value: 'limited-free', label: '⏰ 限时免费', desc: '限时免费，之后可能收费' },
  { value: 'trial', label: '🧪 试用', desc: '提供试用期' },
];

export default function AdminToolsNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    priceType: 'freemium',
    shortDesc: '',
    description: '',
    features: '',
    tags: '',
    logoUrl: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          url: formData.url,
          category: formData.category,
          price_type: formData.priceType,
          short_desc: formData.shortDesc,
          description: formData.description,
          features: formData.features.split('\n').filter(f => f.trim()),
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
          logo_url: formData.logoUrl,
          status: 'published',
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ 工具添加成功！');
        router.push('/admin/tools');
      } else {
        alert('❌ 添加失败：' + data.error);
      }
    } catch (error) {
      alert('❌ 添加失败：' + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/60 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold gradient-text">添加工具</h1>
            <p className="text-gray-500 text-sm">填写工具信息，添加到工具箱</p>
          </div>
        </div>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Sparkles size={20} className="mr-2 text-orange-500" />
            基本信息
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                placeholder="例如：Claude"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                官网地址 <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                placeholder="https://..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                required
              >
                <option value="">选择分类...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                价格类型 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                required
              >
                {priceTypes.map(pt => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                placeholder="https://..."
              />
              {formData.logoUrl && (
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={formData.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 描述信息 */}
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Sparkles size={20} className="mr-2 text-orange-500" />
            描述信息
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                简短描述 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                placeholder="一句话介绍这个工具..."
                maxLength={200}
                required
              />
              <p className="text-xs text-gray-400 mt-1">{formData.shortDesc.length}/200</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 min-h-[150px]"
                placeholder="详细介绍这个工具的功能、特点..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                功能列表
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 min-h-[100px]"
                placeholder="每行一个功能，例如：&#10;支持多语言&#10;AI 智能对话&#10;长文本处理"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                placeholder="用逗号分隔，例如：AI，对话，写作"
              />
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-secondary px-6 py-3"
          >
            <X size={18} className="mr-2" />
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary px-8 py-3 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                添加中...
              </span>
            ) : (
              <span className="flex items-center">
                <Save size={18} className="mr-2" />
                添加工具
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
