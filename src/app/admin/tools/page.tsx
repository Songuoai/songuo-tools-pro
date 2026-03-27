'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Sparkles, AlertTriangle } from 'lucide-react';

export default function AdminToolsPage() {
  const router = useRouter();
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedPrice, setSelectedPrice] = useState('全部');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = ['全部', 'AI 工具', 'AI 设计', 'AI 视频', 'AI 音乐', '效率办公', '影视资源', '在线音乐', '实用工具', '开发编程'];
  const prices = ['全部', 'free', 'freemium', 'paid', 'limited-free'];

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    try {
      const res = await fetch('/api/tools', { 
        cache: 'no-store',
        next: { revalidate: 60 } // 1 分钟重新验证
      });
      const data = await res.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTool(toolId: string, toolName: string) {
    if (!confirm(`确定要删除工具"${toolName}"吗？此操作不可恢复！`)) return;

    try {
      const res = await fetch(`/api/tools/${toolId}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        setTools(tools.filter(t => t.id !== toolId));
        setDeleteConfirm(null);
        alert('✅ 工具已删除');
      } else {
        alert('❌ 删除失败：' + data.error);
      }
    } catch (error) {
      alert('❌ 删除失败：' + error);
    }
  }

  async function toggleStatus(toolId: string, currentStatus: string) {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const res = await fetch(`/api/tools/${toolId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        setTools(tools.map(t => t.id === toolId ? { ...t, status: newStatus } : t));
      }
    } catch (error) {
      console.error('更新状态失败:', error);
    }
  }

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || tool.category === selectedCategory;
    const matchesPrice = selectedPrice === '全部' || tool.priceType === selectedPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const stats = {
    total: tools.length,
    published: tools.filter(t => t.status === 'published').length,
    draft: tools.filter(t => t.status === 'draft').length,
  };

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
          <p className="text-gray-500 text-sm font-medium animate-pulse">正在加载工具列表...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部统计 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="text-3xl font-bold gradient-text mb-2">{stats.total}</div>
          <div className="text-gray-500 text-sm font-medium">工具总数</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.published}</div>
          <div className="text-gray-500 text-sm font-medium">已发布</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-gray-600 mb-2">{stats.draft}</div>
          <div className="text-gray-500 text-sm font-medium">草稿</div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex items-center space-x-4">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* 分类筛选 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-white/50 backdrop-blur-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* 价格筛选 */}
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-white/50 backdrop-blur-sm"
          >
            <option value="全部">全部价格</option>
            {prices.map(price => (
              <option key={price} value={price}>
                {price === 'free' && '🆓 免费'}
                {price === 'freemium' && '🎁 免费额度'}
                {price === 'paid' && '💰 付费'}
                {price === 'limited-free' && '⏰ 限时免费'}
              </option>
            ))}
          </select>
        </div>

        {/* 添加按钮 */}
        <Link
          href="/admin/tools/new"
          className="btn btn-primary px-6 py-2.5 shadow-md hover:shadow-lg"
        >
          <Plus size={18} className="mr-2" />
          添加工具
        </Link>
      </div>

      {/* 工具列表 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">工具信息</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">分类</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">价格类型</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">状态</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">访问量</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">评分</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <AlertTriangle size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">没有找到工具</p>
                      <p className="text-gray-400 text-sm mt-1">尝试调整搜索或筛选条件</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-lg">{tool.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {tool.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{tool.shortDesc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {tool.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tool.priceType === 'free' ? 'bg-green-50 text-green-600' :
                        tool.priceType === 'freemium' ? 'bg-blue-50 text-blue-600' :
                        tool.priceType === 'paid' ? 'bg-purple-50 text-purple-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {tool.priceType === 'free' && '🆓 免费'}
                        {tool.priceType === 'freemium' && '🎁 免费额度'}
                        {tool.priceType === 'paid' && '💰 付费'}
                        {tool.priceType === 'limited-free' && '⏰ 限时免费'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(tool.id, tool.status)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          tool.status === 'published'
                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tool.status === 'published' ? (
                          <>
                            <ToggleRight size={16} />
                            <span>已发布</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={16} />
                            <span>草稿</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{tool.views?.toLocaleString() || 0}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="text-gray-600 font-medium">{tool.rating || 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/tool/${tool.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="查看"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/tools/edit/${tool.id}`}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="编辑"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(tool.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="删除"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">确认删除</h3>
                <p className="text-sm text-gray-500">此操作不可恢复</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              确定要删除这个工具吗？所有相关数据都将被永久删除。
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn btn-secondary py-2.5"
              >
                取消
              </button>
              <button
                onClick={() => deleteTool(deleteConfirm, '')}
                className="flex-1 btn bg-red-500 hover:bg-red-600 text-white py-2.5"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
