import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50">
        <div className="container-wide">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 gradient-primary rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-white text-xl">🌰</span>
              </div>
              <span className="text-lg font-bold gradient-text">松果工具箱</span>
            </Link>
            <Link href="/" className="btn btn-ghost text-sm">返回首页</Link>
          </div>
        </div>
      </nav>

      <div className="container-prose py-12">
        <div className="card p-8 md:p-12">
          <h1 className="text-4xl font-bold gradient-text mb-8">免责声明</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-500 mb-8">最后更新：2026 年 3 月 26 日</p>

            <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 mb-8">
              <p className="text-orange-700 font-medium">
                ⚠️ 重要提示：使用本服务前请仔细阅读本免责声明。
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. 服务性质</h2>
            <p className="text-gray-600 mb-4">
              松果工具箱是一个工具导航平台，仅提供工具的发现和推荐服务，不提供工具本身。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. 工具来源</h2>
            <p className="text-gray-600 mb-4">
              本网站展示的工具均来自第三方：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>工具由各自的开发者所有和运营</li>
              <li>我们不开发、维护或控制这些工具</li>
              <li>工具的功能和安全性由开发者负责</li>
              <li>使用工具的风险由用户自行承担</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. 信息准确性</h2>
            <p className="text-gray-600 mb-4">
              我们尽力确保信息的准确性，但不保证：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>工具描述的完全准确</li>
              <li>价格信息的实时更新</li>
              <li>功能特性的完整描述</li>
              <li>链接的永久有效性</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. 使用风险</h2>
            <p className="text-gray-600 mb-4">
              使用本网站链接的工具，您理解并同意：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>自行承担所有风险</li>
              <li>自行评估工具的安全性</li>
              <li>遵守工具的使用条款</li>
              <li>保护个人信息和财产安全</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. 损失免责</h2>
            <p className="text-gray-600 mb-4">
              对于以下情况，我们不承担责任：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>使用工具造成的数据丢失</li>
              <li>工具故障导致的工作中断</li>
              <li>工具收费或扣费问题</li>
              <li>工具隐私政策变更</li>
              <li>第三方服务的中断</li>
              <li>任何直接或间接损失</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. 外部链接</h2>
            <p className="text-gray-600 mb-4">
              本网站包含外部链接：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>链接到第三方网站仅供便利</li>
              <li>我们不控制外部网站的内容</li>
              <li>不对外部网站的安全性负责</li>
              <li>访问外部网站的风险自负</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. 专业建议</h2>
            <p className="text-gray-600 mb-4">
              本网站信息不构成专业建议：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>不提供法律建议</li>
              <li>不提供财务建议</li>
              <li>不提供技术建议</li>
              <li>重大决策请咨询专业人士</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. 服务变更</h2>
            <p className="text-gray-600 mb-4">
              我们保留随时变更服务的权利：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>修改或删除内容</li>
              <li>暂停或终止服务</li>
              <li>更改功能特性</li>
              <li>无需事先通知</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如有疑问，请联系我们：
            </p>
            <ul className="list-none space-y-2 text-gray-600 mb-6">
              <li>📧 邮箱：1335979521@qq.com</li>
              <li>📱 电话：18611697817</li>
              <li>📍 地址：安徽合肥</li>
            </ul>

            <div className="mt-12 p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-700 font-medium">
                ⚠️ 使用本服务即表示您理解并同意本免责声明的所有条款。
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-12">
        <div className="container-wide">
          <div className="text-sm text-gray-500">
            © 2026 松果工具箱。All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
