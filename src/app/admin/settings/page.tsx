'use client';

import { useState } from 'react';
import { Save, Sparkles, Globe, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '松果工具箱',
    siteUrl: 'https://tools.hefeiapp.top',
    siteEmail: 'tools@hefeiapp.top',
    sitePhone: '18611697817',
    siteAddress: '安徽合肥',
    adminEmail: 'admin@songguo.com',
    icpLicense: '皖 ICP 备 XXXXXXXX 号',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('✅ 设置已保存！');
      setLoading(false);
    }, 500);
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div>
        <h1 className="text-2xl font-bold gradient-text mb-2">系统设置</h1>
        <p className="text-gray-500">配置网站基本信息和运行参数</p>
      </div>

      {/* 设置表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 网站信息 */}
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Globe size={20} className="mr-2 text-orange-500" />
            网站信息
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站名称
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站地址
              </label>
              <input
                type="url"
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系邮箱
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.siteEmail}
                  onChange={(e) => setFormData({ ...formData, siteEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系电话
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.sitePhone}
                  onChange={(e) => setFormData({ ...formData, sitePhone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地址
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.siteAddress}
                  onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ICP 备案号
              </label>
              <input
                type="text"
                value={formData.icpLicense}
                onChange={(e) => setFormData({ ...formData, icpLicense: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
              />
            </div>
          </div>
        </div>

        {/* 管理员设置 */}
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Shield size={20} className="mr-2 text-orange-500" />
            管理员设置
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                管理员邮箱
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex items-center justify-end">
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
                保存中...
              </span>
            ) : (
              <span className="flex items-center">
                <Save size={18} className="mr-2" />
                保存设置
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
