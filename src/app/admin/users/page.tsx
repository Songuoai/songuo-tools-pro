'use client';

import { useState, useEffect } from 'react';
import { Search, Shield, Ban, CheckCircle, Sparkles } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 模拟数据（实际应该从 API 获取）
    setUsers([
      { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'user', status: 'active', joinedAt: '2026-03-20' },
      { id: 2, name: '李四', email: 'lisi@example.com', role: 'admin', status: 'active', joinedAt: '2026-03-18' },
      { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'banned', joinedAt: '2026-03-15' },
    ]);
    setLoading(false);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <p className="text-gray-500 text-sm font-medium animate-pulse">正在加载...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="text-3xl font-bold gradient-text mb-2">{users.length}</div>
          <div className="text-gray-500 text-sm font-medium">用户总数</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-gray-500 text-sm font-medium">管理员</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-gray-500 text-sm font-medium">活跃用户</div>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50"
          />
        </div>
      </div>

      {/* 用户列表 */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">用户信息</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">角色</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">状态</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">加入时间</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role === 'admin' ? '🛡️ 管理员' : '👤 普通用户'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {user.status === 'active' ? '✅ 活跃' : '❌ 已封禁'}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{user.joinedAt}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Ban size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
