import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <nav className="glass sticky top-0 z-50 border-b border-gray-100/50">
        <div className="container-wide">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-9 h-9 gradient-primary rounded-xl shadow-lg flex items-center justify-center">
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
          <h1 className="text-4xl font-bold gradient-text mb-8">用户协议</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-500 mb-8">最后更新：2026 年 3 月 26 日</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. 接受条款</h2>
            <p className="text-gray-600 mb-4">
              欢迎使用松果工具箱（以下简称"本服务"）。通过访问或使用本网站，您同意受本用户协议的约束。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. 服务说明</h2>
            <p className="text-gray-600 mb-4">
              松果工具箱是一个工具导航平台，提供：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>工具发现和推荐服务</li>
              <li>工具分类和搜索功能</li>
              <li>用户投稿和审核服务</li>
              <li>工具使用统计和评分</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. 用户责任</h2>
            <p className="text-gray-600 mb-4">您同意：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>提供真实、准确的信息</li>
              <li>不滥用或干扰服务运行</li>
              <li>遵守相关法律法规</li>
              <li>尊重知识产权</li>
              <li>不进行反向工程或爬取数据</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. 投稿内容</h2>
            <p className="text-gray-600 mb-4">如果您投稿工具：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>您保证内容真实、合法</li>
              <li>您拥有投稿内容的权利</li>
              <li>我们有权审核和编辑投稿</li>
              <li>我们有权拒绝或删除投稿</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. 免责声明</h2>
            <p className="text-gray-600 mb-4">
              本服务按"现状"提供，不提供任何明示或暗示的保证：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>不保证服务不间断或无错误</li>
              <li>不保证工具的质量和安全性</li>
              <li>不承担使用工具造成的损失</li>
              <li>不保证信息的准确性和完整性</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. 责任限制</h2>
            <p className="text-gray-600 mb-4">
              在适用法律允许的最大范围内，我们不对任何间接、特殊、附带或后果性损害承担责任。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. 服务修改</h2>
            <p className="text-gray-600 mb-4">
              我们保留随时修改或终止服务的权利，无需事先通知。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. 第三方链接</h2>
            <p className="text-gray-600 mb-4">
              本网站可能包含第三方网站的链接。我们不对第三方网站的内容负责。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. 知识产权</h2>
            <p className="text-gray-600 mb-4">
              本网站的所有内容（除用户投稿外）归松果工具箱所有。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. 终止账号</h2>
            <p className="text-gray-600 mb-4">
              如违反本协议，我们有权终止您的账号访问权限。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. 法律适用</h2>
            <p className="text-gray-600 mb-4">
              本协议受中华人民共和国法律管辖。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. 联系方式</h2>
            <ul className="list-none space-y-2 text-gray-600 mb-6">
              <li>📧 邮箱：1335979521@qq.com</li>
              <li>📱 电话：18611697817</li>
              <li>📍 地址：安徽合肥</li>
            </ul>
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
