'use client';

import Link from 'next/link';
import { ArrowLeft, Scale, Copyright } from 'lucide-react';

export default function CopyrightPage() {
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
              <Link href="/search" className="text-gray-600 hover:text-orange-600 transition-colors">搜索</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          返回首页
        </Link>

        {/* 头部 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Copyright size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">版权声明</h1>
          <p className="text-gray-600">
            最后更新：2026-03-25
          </p>
        </div>

        {/* 内容区域 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">版权所有</h2>
            <p className="text-gray-700 mb-6">
              松果工具箱 Pro（https://tools.hefeiapp.top）版权所有 © 2026 松果工具箱
            </p>
            <p className="text-gray-700 mb-6">
              本网站所有内容（包括但不限于文字、图片、代码、设计）受著作权法保护。未经授权不得转载或使用。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">使用许可</h2>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">允许的行为</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>个人学习和研究</li>
              <li>非商业性质的引用</li>
              <li>分享本网站链接</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">禁止的行为</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>未经授权的商业使用</li>
              <li>大规模抓取网站内容</li>
              <li>修改、复制、传播本站内容</li>
              <li>用于训练 AI 模型（除非获得授权）</li>
              <li>其他侵犯知识产权的行为</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">第三方内容</h2>
            <p className="text-gray-700 mb-6">
              本网站收录的工具均为第三方所有，其版权归原作者所有。我们仅作为导航平台提供链接和简介。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">侵权处理</h2>
            <p className="text-gray-700 mb-4">
              如您认为本网站内容侵犯您的知识产权，请联系我们：
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>提供权利证明</li>
              <li>说明侵权内容位置</li>
              <li>提供联系方式</li>
            </ul>
            <p className="text-gray-700 mb-6">
              我们将在收到通知后及时处理。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">DMCA 通知</h2>
            <p className="text-gray-700 mb-6">
              对于美国版权法（DMCA）相关的侵权通知，请发送详细邮件至 tools@hefeiapp.top，我们将按照 DMCA 流程处理。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">法律责任</h2>
            <p className="text-gray-700 mb-6">
              对于侵犯本网站版权的行为，我们将依法追究法律责任，包括但不限于：
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>要求停止侵权</li>
              <li>要求赔偿损失</li>
              <li>向相关部门举报</li>
              <li>提起诉讼</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">联系授权</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Scale size={20} className="mr-2" />
                商业合作或授权请联系
              </h3>
              <p className="text-gray-700 mb-2"><strong>邮箱：</strong>tools@hefeiapp.top</p>
              <p className="text-gray-700 mb-2"><strong>电话：</strong>18611697817</p>
              <p className="text-gray-700"><strong>地址：</strong>安徽合肥</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-12">
              <p className="text-sm text-gray-500 text-center">
                本声明最终解释权归松果工具箱所有
              </p>
            </div>
          </div>
        </div>

        {/* 相关链接 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">相关法律文档</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/terms" className="text-orange-600 hover:underline flex items-center">
              <Scale size={16} className="mr-2" />
              用户协议
            </Link>
            <Link href="/privacy" className="text-orange-600 hover:underline flex items-center">
              <Scale size={16} className="mr-2" />
              隐私政策
            </Link>
            <Link href="/disclaimer" className="text-orange-600 hover:underline flex items-center">
              <Scale size={16} className="mr-2" />
              免责声明
            </Link>
            <Link href="/cookie" className="text-orange-600 hover:underline flex items-center">
              <Scale size={16} className="mr-2" />
              Cookie 政策
            </Link>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌰</span>
              </div>
              <span className="text-lg font-bold text-white">松果工具箱</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
              <Link href="/terms" className="hover:text-white transition-colors">用户协议</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">免责声明</Link>
              <Link href="/copyright" className="hover:text-white transition-colors">版权声明</Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 松果工具箱。All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
