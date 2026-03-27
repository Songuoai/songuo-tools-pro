'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X,
  Plus,
  Image as ImageIcon
} from 'lucide-react';

const categories = [
  'AI 工具',
  'AI 设计',
  'AI 视频',
  'AI 音乐',
  'AI 3D',
  'AI 编程',
  '效率办公',
  '影视资源',
  '在线音乐',
  '实用工具',
  '小程序',
];

const priceTypes = [
  { value: 'free', label: '🆓 完全免费', desc: '完全免费使用，无任何付费内容' },
  { value: 'freemium', label: '🎁 免费额度', desc: '基础功能免费，高级功能付费' },
  { value: 'limited-free', label: '⏰ 限时免费', desc: '限时免费，之后恢复付费' },
  { value: 'trial', label: '🧪 免费试用', desc: '提供试用期，之后付费' },
  { value: 'paid', label: '💰 付费', desc: '需要付费购买或订阅' },
  { value: 'contact', label: '📞 联系询价', desc: '需要联系获取价格' },
];

// 模拟数据（后续从 Supabase 获取）
const mockTool = {
  id: 1,
  name: 'ChatGPT',
  url: 'https://chat.openai.com',
  category: 'AI 工具',
  priceType: 'freemium',
  priceUrl: 'https://openai.com/pricing',
  shortDesc: 'OpenAI 开发的 AI 对话助手，支持多种任务',
  description: 'ChatGPT 是 OpenAI 开发的大型语言模型，能够进行自然对话、回答问题、创作文字等。支持多种语言，广泛应用于客服、内容创作、编程辅助等场景。',
  features: '自然对话\n内容创作\n编程辅助\n翻译服务\n问答解答',
  logoUrl: '',
  screenshots: ['https://example.com/screenshot1.png'],
  tags: ['AI', '对话', '生产力'],
  status: 'published',
  views: 1250,
  rating: 4.9,
};

export default function AdminToolEdit() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'AI 工具',
    priceType: 'freemium',
    priceUrl: '',
    shortDesc: '',
    description: '',
    features: '',
    logoUrl: '',
    screenshots: [] as string[],
    tags: [] as string[],
    status: 'draft',
  });

  useEffect(() => {
    // 模拟加载工具数据（后续从 Supabase 获取）
    setTimeout(() => {
      const tool = mockTool;
      setFormData({
        name: tool.name,
        url: tool.url,
        category: tool.category,
        priceType: tool.priceType,
        priceUrl: tool.priceUrl,
        shortDesc: tool.shortDesc,
        description: tool.description,
        features: tool.features,
        logoUrl: tool.logoUrl,
        screenshots: tool.screenshots,
        tags: tool.tags,
        status: tool.status,
      });
      setScreenshots(tool.screenshots);
      setTags(tool.tags);
      setLoading(false);
    }, 500);
  }, [params.slug]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleAddScreenshot = () => {
    setScreenshots([...screenshots, '']);
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const handleScreenshotChange = (index: number, value: string) => {
    const newScreenshots = [...screenshots];
    newScreenshots[index] = value;
    setScreenshots(newScreenshots);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // 模拟保存（后续接入 Supabase）
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('更新的数据:', {
      ...formData,
      screenshots,
      tags,
    });

    setSaving(false);
    router.push('/admin/tools');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <p className="mt-4 text-gray-500">加载工具信息中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">编辑工具</h1>
            <p className="text-sm text-gray-500">修改工具信息，保存后生效</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          <Save size={20} className="mr-2" />
          {saving ? '保存中...' : '保存更改'}
        </button>
      </div>

      {/* 表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">基本信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                官方网站 <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类 <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
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
                required
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {priceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                价格/购买链接
              </label>
              <input
                type="url"
                value={formData.priceUrl}
                onChange={(e) => setFormData({ ...formData, priceUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 描述信息 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">描述信息</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                简短描述 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.shortDesc.length}/100</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细介绍 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                核心功能
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 图片和素材 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">图片和素材</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {formData.logoUrl && (
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                截图列表
              </label>
              <div className="space-y-2">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={screenshot}
                      onChange={(e) => handleScreenshotChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveScreenshot(index)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddScreenshot}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  添加截图
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 标签和发布设置 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">标签和发布设置</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-orange-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                发布状态
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    checked={formData.status === 'draft'}
                    onChange={() => setFormData({ ...formData, status: 'draft' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">📝 草稿（不公开）</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    checked={formData.status === 'published'}
                    onChange={() => setFormData({ ...formData, status: 'published' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">✅ 发布（立即公开）</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            {saving ? '保存中...' : '保存更改'}
          </button>
        </div>
      </form>
    </div>
  );
}
