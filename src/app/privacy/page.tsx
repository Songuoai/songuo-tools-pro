import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      {/* 导航栏 */}
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50">
        <div className="container-wide">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 gradient-primary rounded-xl shadow-lg"></div>
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🌰</span>
                </div>
              </div>
              <span className="text-lg font-bold gradient-text">松果工具箱</span>
            </Link>
            <Link href="/" className="btn btn-ghost text-sm">返回首页</Link>
          </div>
        </div>
      </nav>

      {/* 内容区 */}
      <div className="container-prose py-12">
        <div className="card p-8 md:p-12">
          <h1 className="text-4xl font-bold gradient-text mb-8">隐私政策</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-500 mb-8">最后更新：2026 年 3 月 26 日</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. 信息收集</h2>
            <p className="text-gray-600 mb-4">
              松果工具箱（以下简称"我们"）非常重视您的隐私保护。我们不会主动收集您的个人信息。
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.1 自动收集的信息</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>访问日志：IP 地址、浏览器类型、访问时间</li>
              <li>使用数据：访问的页面、点击的工具链接</li>
              <li>设备信息：操作系统、屏幕分辨率</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.2 用户主动提供的信息</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>注册账号：邮箱地址、用户名</li>
              <li>投稿工具：工具名称、描述、联系方式</li>
              <li>反馈建议：您提供的任何信息</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. 信息使用</h2>
            <p className="text-gray-600 mb-4">我们收集的信息用于以下目的：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>提供和改进我们的服务</li>
              <li>分析用户行为，优化用户体验</li>
              <li>处理您的投稿和反馈</li>
              <li>防范欺诈和滥用行为</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. 信息分享</h2>
            <p className="text-gray-600 mb-4">
              我们不会向第三方出售、出租或交易您的个人信息。但在以下情况下，我们可能会分享信息：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>获得您的明确同意</li>
              <li>遵守法律法规要求</li>
              <li>与服务提供商合作（如 hosting、analytics）</li>
              <li>保护我们的合法权益</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookie 使用</h2>
            <p className="text-gray-600 mb-4">
              我们使用 Cookie 来提升用户体验：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>必要 Cookie：确保网站正常运行</li>
              <li>分析 Cookie：了解网站使用情况</li>
              <li>功能 Cookie：记住您的偏好设置</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. 数据安全</h2>
            <p className="text-gray-600 mb-4">
              我们采取合理的安全措施保护您的信息：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>使用 HTTPS 加密传输</li>
              <li>定期安全审计</li>
              <li>限制员工访问权限</li>
              <li>数据备份和灾难恢复</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. 您的权利</h2>
            <p className="text-gray-600 mb-4">您有权：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>撤回同意</li>
              <li>数据可携带性</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. 儿童隐私</h2>
            <p className="text-gray-600 mb-4">
              我们的服务不面向 13 岁以下儿童。如果我们发现收集了儿童的个人信息，我们会立即删除。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. 政策更新</h2>
            <p className="text-gray-600 mb-4">
              我们可能会不时更新本隐私政策。更新后的政策将在网站上发布，重大变更会通知您。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. 联系我们</h2>
            <p className="text-gray-600 mb-4">
              如有任何疑问，请联系我们：
            </p>
            <ul className="list-none space-y-2 text-gray-600 mb-6">
              <li>📧 邮箱：1335979521@qq.com</li>
              <li>📱 电话：18611697817</li>
              <li>📍 地址：安徽合肥</li>
            </ul>

            <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-orange-700 font-medium">
                继续使用我们的服务即表示您同意本隐私政策。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌰</span>
              </div>
              <span className="font-semibold text-gray-700">松果工具箱 Pro</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2026 松果工具箱。All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
