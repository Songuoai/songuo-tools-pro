'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Sparkles } from 'lucide-react';

const submissions = [
  { id: 1, toolName: 'Runway ML', url: 'https://runwayml.com', category: 'AI 视频', submitter: 'user1@example.com', date: '2026-03-25', status: 'pending', desc: 'AI 视频生成和编辑工具' },
  { id: 2, toolName: 'Descript', url: 'https://descript.com', category: 'AI 视频', submitter: 'user2@example.com', date: '2026-03-24', status: 'pending', desc: 'AI 驱动的视频和音频编辑软件' },
  { id: 3, toolName: 'ElevenLabs', url: 'https://elevenlabs.io', category: 'AI 音乐', submitter: 'user3@example.com', date: '2026-03-24', status: 'approved', desc: 'AI 语音生成平台' },
];

export default function AdminSubmissionsPage() {
  const [selectedStatus, setSelectedStatus] = useState('全部');

  const filteredSubmissions = submissions.filter(sub =>
    selectedStatus === '全部' || sub.status === selectedStatus
  );

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="text-3xl font-bold gradient-text mb-2">{stats.total}</div>
          <div className="text-gray-500 text-sm font-medium">投稿总数</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-orange-600 mb-2">{stats.pending}</div>
          <div className="text-gray-500 text-sm font-medium">待审核</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.approved}</div>
          <div className="text-gray-500 text-sm font-medium">已通过</div>
        </div>
        <div className="card p-6">
          <div className="text-3xl font-bold text-red-600 mb-2">{stats.rejected}</div>
          <div className="text-gray-500 text-sm font-medium">已拒绝</div>
        </div>
      </div>

      {/* 筛选 */}
      <div className="flex items-center space-x-2">
        {['全部', 'pending', 'approved', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedStatus === status
                ? 'gradient-primary text-white shadow-md'
                : 'bg-white/60 text-gray-600 hover:bg-white/80'
            }`}
          >
            {status === '全部' && '全部'}
            {status === 'pending' && '⏳ 待审核'}
            {status === 'approved' && '✅ 已通过'}
            {status === 'rejected' && '❌ 已拒绝'}
          </button>
        ))}
      </div>

      {/* 投稿列表 */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">工具信息</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">分类</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">提交人</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">提交日期</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">状态</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub) => (
              <tr key={sub.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-gray-900">{sub.toolName}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{sub.desc}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {sub.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{sub.submitter}</td>
                <td className="py-4 px-6 text-gray-600">{sub.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sub.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                    sub.status === 'approved' ? 'bg-green-50 text-green-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {sub.status === 'pending' && '⏳ 待审核'}
                    {sub.status === 'approved' && '✅ 已通过'}
                    {sub.status === 'rejected' && '❌ 已拒绝'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <a
                      href={sub.url}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={18} />
                    </a>
                    {sub.status === 'pending' && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
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
