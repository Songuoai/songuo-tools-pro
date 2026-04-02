import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { ExternalLink } from 'lucide-react';

const TOOLS_DATA = [
  { id: 1, name: '即梦 AI', slug: 'jimeng-ai', category: 'AI 工具', url: 'https://jimeng.jianying.com/', shortDesc: '字节跳动产品，效果最佳', tags: ['视频生成', 'AI'], description: '即梦 AI 是字节跳动推出的 AI 视频生成工具，基于豆包大模型，支持文生视频、图生视频等多种创作方式。', pricing: 'freemium' },
  { id: 2, name: '可灵 AI', slug: 'kling-ai', category: 'AI 工具', url: 'https://klingai.kuaishou.com/', shortDesc: '快手产品，中文优化', tags: ['视频生成', 'AI'], description: '可灵 AI 是快手推出的 AI 视频生成大模型，支持文生视频、图生视频，中文理解能力优秀。', pricing: 'freemium' },
  { id: 3, name: '海螺 AI', slug: 'hailuo-ai', category: 'AI 工具', url: 'https://hailuoai.com/', shortDesc: 'MiniMax 产品，免费', tags: ['视频生成', 'AI'], description: '海螺 AI 是 MiniMax 推出的 AI 助手，支持视频生成、对话等多种功能。', pricing: 'free' },
  { id: 4, name: 'VIDU', slug: 'vidu', category: 'AI 工具', url: 'https://www.vidu.cn/', shortDesc: '清华团队，国产之光', tags: ['视频生成', 'AI'], description: 'VIDU 是清华团队研发的 AI 视频生成模型，支持一键生成高质量视频。', pricing: 'freemium' },
  { id: 5, name: 'Pika', slug: 'pika', category: 'AI 工具', url: 'https://pika.art/', shortDesc: 'Pika Labs 产品，动画优秀', tags: ['视频生成', 'AI'], description: 'Pika 是 Pika Labs 推出的 AI 视频生成工具，擅长动画风格视频。', pricing: 'freemium' },
  { id: 6, name: 'Runway', slug: 'runway', category: 'AI 工具', url: 'https://runwayml.com/', shortDesc: 'Gen-3 模型，专业级', tags: ['视频生成', 'AI'], description: 'Runway 是专业级 AI 视频编辑工具，Gen-3 模型效果出色。', pricing: 'paid' },
  { id: 7, name: 'Luma', slug: 'luma', category: 'AI 工具', url: 'https://lumalabs.ai/', shortDesc: 'Dream Machine 模型', tags: ['视频生成', 'AI'], description: 'Luma AI 的 Dream Machine 模型，支持高质量视频生成。', pricing: 'freemium' },
  { id: 8, name: 'PixVerse', slug: 'pixverse', category: 'AI 工具', url: 'https://pixverse.ai/', shortDesc: '免费额度，适合新手', tags: ['视频生成', 'AI'], description: 'PixVerse 是免费的 AI 视频生成工具，适合新手入门。', pricing: 'free' },
  { id: 9, name: 'Haiper', slug: 'haiper', category: 'AI 工具', url: 'https://haiper.ai/', shortDesc: '哈珀 AI，英国团队', tags: ['视频生成', 'AI'], description: 'Haiper 是英国团队开发的 AI 视频生成工具。', pricing: 'freemium' },
  { id: 10, name: 'Viggle', slug: 'viggle', category: 'AI 工具', url: 'https://viggle.ai/', shortDesc: '角色动画，舞蹈视频', tags: ['视频生成', 'AI'], description: 'Viggle 专注于角色动画和舞蹈视频生成。', pricing: 'freemium' },
  { id: 11, name: 'Adobe Firefly', slug: 'adobe-firefly', category: 'AI 工具', url: 'https://firefly.adobe.com/', shortDesc: 'Adobe 官方，商业安全', tags: ['视频生成', 'AI'], description: 'Adobe Firefly 是 Adobe 官方的 AI 生成工具，商业使用安全。', pricing: 'paid' },
  { id: 12, name: 'Fliki', slug: 'fliki', category: 'AI 工具', url: 'https://fliki.ai/', shortDesc: '文生视频，营销友好', tags: ['视频生成', 'AI'], description: 'Fliki 是文生视频工具，适合营销内容创作。', pricing: 'freemium' },
  { id: 13, name: 'D-ID', slug: 'd-id', category: 'AI 工具', url: 'https://www.d-id.com/', shortDesc: '数字人播报', tags: ['视频生成', 'AI'], description: 'D-ID 专注于数字人播报视频生成。', pricing: 'paid' },
  { id: 14, name: 'HeyGen', slug: 'heygen', category: 'AI 工具', url: 'https://www.heygen.com/', shortDesc: '数字人视频，口型同步', tags: ['视频生成', 'AI'], description: 'HeyGen 是数字人视频生成工具，支持口型同步。', pricing: 'paid' },
  { id: 15, name: 'Synthesia', slug: 'synthesia', category: 'AI 工具', url: 'https://www.synthesia.io/', shortDesc: '企业级数字人', tags: ['视频生成', 'AI'], description: 'Synthesia 是企业级数字人视频生成平台。', pricing: 'paid' },
  { id: 16, name: 'InVideo', slug: 'invideo', category: 'AI 工具', url: 'https://invideo.io/', shortDesc: '模板丰富，易上手', tags: ['视频生成', 'AI'], description: 'InVideo 提供丰富的视频模板，易于上手。', pricing: 'freemium' },
  { id: 17, name: 'Elai.io', slug: 'elai-io', category: 'AI 工具', url: 'https://elai.io/', shortDesc: '数字人视频', tags: ['视频生成', 'AI'], description: 'Elai.io 是数字人视频生成工具。', pricing: 'paid' },
  { id: 18, name: 'Colossyan', slug: 'colossyan', category: 'AI 工具', url: 'https://www.colossyan.com/', shortDesc: '企业培训视频', tags: ['视频生成', 'AI'], description: 'Colossyan 专注于企业培训视频生成。', pricing: 'paid' },
  { id: 19, name: 'DeepBrain AI', slug: 'deepbrain-ai', category: 'AI 工具', url: 'https://www.deepbrain.io/', shortDesc: '韩国数字人', tags: ['视频生成', 'AI'], description: 'DeepBrain AI 是韩国数字人视频生成平台。', pricing: 'paid' },
  { id: 20, name: 'Veed.io', slug: 'veed-io', category: 'AI 工具', url: 'https://www.veed.io/', shortDesc: '在线视频编辑', tags: ['视频生成', 'AI'], description: 'Veed.io 是在线视频编辑工具。', pricing: 'freemium' },
  { id: 21, name: '网易云音乐', slug: 'netease-music', category: '在线音乐', url: 'https://music.163.com/', shortDesc: '网易出品，华语音乐库丰富', tags: ['音乐', '流媒体'], description: '网易云音乐是网易出品的音乐流媒体平台。', pricing: 'freemium' },
  { id: 22, name: 'QQ 音乐', slug: 'qq-music', category: '在线音乐', url: 'https://y.qq.com/', shortDesc: '腾讯出品，版权丰富', tags: ['音乐', '流媒体'], description: 'QQ 音乐是腾讯出品的音乐流媒体平台。', pricing: 'freemium' },
  { id: 23, name: '酷狗音乐', slug: 'kugou-music', category: '在线音乐', url: 'https://www.kugou.com/', shortDesc: '老牌音乐平台，音质出色', tags: ['音乐', '流媒体'], description: '酷狗音乐是老牌音乐平台。', pricing: 'freemium' },
  { id: 24, name: '酷我音乐', slug: 'kuwo-music', category: '在线音乐', url: 'https://www.kuwo.cn/', shortDesc: '海量音乐，无损音质', tags: ['音乐', '流媒体'], description: '酷我音乐提供海量音乐和无损音质。', pricing: 'freemium' },
  { id: 25, name: '咪咕音乐', slug: 'migu-music', category: '在线音乐', url: 'https://music.migu.cn/', shortDesc: '中国移动出品，免费听', tags: ['音乐', '流媒体'], description: '咪咕音乐是中国移动出品的音乐平台。', pricing: 'free' },
  { id: 26, name: 'Bilibili 音乐', slug: 'bilibili-music', category: '在线音乐', url: 'https://www.bilibili.com/v/audio', shortDesc: 'B 站音乐区，UP 主创作', tags: ['音乐', '视频'], description: 'B 站音乐区提供 UP 主创作的音乐内容。', pricing: 'free' },
  { id: 27, name: 'YouTube Music', slug: 'youtube-music', category: '在线音乐', url: 'https://music.youtube.com/', shortDesc: '谷歌出品，全球音乐', tags: ['音乐', '流媒体'], description: 'YouTube Music 是谷歌出品的音乐流媒体。', pricing: 'freemium' },
  { id: 28, name: 'Spotify', slug: 'spotify', category: '在线音乐', url: 'https://open.spotify.com/', shortDesc: '全球最大流媒体音乐平台', tags: ['音乐', '流媒体'], description: 'Spotify 是全球最大的流媒体音乐平台。', pricing: 'freemium' },
  { id: 29, name: 'Apple Music', slug: 'apple-music', category: '在线音乐', url: 'https://music.apple.com/', shortDesc: '苹果出品，无损音质', tags: ['音乐', '流媒体'], description: 'Apple Music 是苹果出品的音乐流媒体。', pricing: 'paid' },
  { id: 30, name: 'SoundCloud', slug: 'soundcloud', category: '在线音乐', url: 'https://soundcloud.com/', shortDesc: '独立音乐人平台', tags: ['音乐', '流媒体'], description: 'SoundCloud 是独立音乐人平台。', pricing: 'freemium' },
  { id: 31, name: '爱奇艺', slug: 'iqiyi', category: '影视资源', url: 'https://www.iqiyi.com/', shortDesc: '爱奇艺在线视频', tags: ['影视', '流媒体'], description: '爱奇艺是在线视频平台。', pricing: 'freemium' },
  { id: 32, name: '腾讯视频', slug: 'tencent-video', category: '影视资源', url: 'https://v.qq.com/', shortDesc: '腾讯视频在线视频', tags: ['影视', '流媒体'], description: '腾讯视频是在线视频平台。', pricing: 'freemium' },
  { id: 33, name: '优酷', slug: 'youku', category: '影视资源', url: 'https://www.youku.com/', shortDesc: '优酷在线视频', tags: ['影视', '流媒体'], description: '优酷是在线视频平台。', pricing: 'freemium' },
  { id: 34, name: '芒果 TV', slug: 'mgtv', category: '影视资源', url: 'https://www.mgtv.com/', shortDesc: '芒果 TV 在线视频', tags: ['影视', '流媒体'], description: '芒果 TV 是在线视频平台。', pricing: 'freemium' },
  { id: 35, name: '哔哩哔哩', slug: 'bilibili', category: '影视资源', url: 'https://www.bilibili.com/', shortDesc: 'B 站在线视频', tags: ['影视', '流媒体'], description: '哔哩哔哩是在线视频平台。', pricing: 'freemium' },
  { id: 36, name: '搜狐视频', slug: 'sohu-video', category: '影视资源', url: 'https://tv.sohu.com/', shortDesc: '搜狐视频在线视频', tags: ['影视', '流媒体'], description: '搜狐视频是在线视频平台。', pricing: 'freemium' },
  { id: 37, name: '乐视视频', slug: 'le-video', category: '影视资源', url: 'https://www.le.com/', shortDesc: '乐视视频在线视频', tags: ['影视', '流媒体'], description: '乐视视频是在线视频平台。', pricing: 'freemium' },
  { id: 38, name: 'PPTV', slug: 'pptv', category: '影视资源', url: 'https://www.pptv.com/', shortDesc: 'PPTV 在线视频', tags: ['影视', '流媒体'], description: 'PPTV 是在线视频平台。', pricing: 'freemium' },
  { id: 39, name: 'YouTube', slug: 'youtube', category: '影视资源', url: 'https://www.youtube.com/', shortDesc: 'YouTube 在线视频', tags: ['影视', '流媒体'], description: 'YouTube 是在线视频平台。', pricing: 'free' },
  { id: 40, name: 'Netflix', slug: 'netflix', category: '影视资源', url: 'https://www.netflix.com/', shortDesc: 'Netflix 在线视频', tags: ['影视', '流媒体'], description: 'Netflix 是在线视频平台。', pricing: 'paid' },
  { id: 41, name: 'Notion', slug: 'notion', category: '效率办公', url: 'https://www.notion.so/', shortDesc: '强大的笔记和项目管理工具', tags: ['办公', '笔记'], description: 'Notion 是强大的笔记和项目管理工具。', pricing: 'freemium' },
  { id: 42, name: 'ProcessOn', slug: 'processon', category: '效率办公', url: 'https://www.processon.com/', shortDesc: '在线流程图工具', tags: ['办公', '图表'], description: 'ProcessOn 是在线流程图工具。', pricing: 'freemium' },
  { id: 43, name: 'Canva', slug: 'canva', category: 'AI 设计', url: 'https://www.canva.com/', shortDesc: '在线设计工具', tags: ['设计', 'AI'], description: 'Canva 是在线设计工具。', pricing: 'freemium' },
  { id: 44, name: 'Figma', slug: 'figma', category: 'AI 设计', url: 'https://www.figma.com/', shortDesc: '在线设计协作工具', tags: ['设计', '协作'], description: 'Figma 是在线设计协作工具。', pricing: 'freemium' },
  { id: 45, name: '即时设计', slug: 'jsdesign', category: 'AI 设计', url: 'https://js.design/', shortDesc: '国产在线设计工具', tags: ['设计', '协作'], description: '即时设计是国产在线设计工具。', pricing: 'free' },
  { id: 46, name: 'MasterGo', slug: 'mastergo', category: 'AI 设计', url: 'https://mastergo.com/', shortDesc: '国产在线设计协作工具', tags: ['设计', '协作'], description: 'MasterGo 是国产在线设计协作工具。', pricing: 'freemium' },
  { id: 47, name: 'Pixso', slug: 'pixso', category: 'AI 设计', url: 'https://pixso.cn/', shortDesc: '国产在线设计协作工具', tags: ['设计', '协作'], description: 'Pixso 是国产在线设计协作工具。', pricing: 'freemium' },
  { id: 48, name: '兰空图床', slug: 'lsky-pro', category: '实用工具', url: 'https://www.lsky.pro/', shortDesc: '开源图床程序', tags: ['工具', '图床'], description: '兰空图床是开源图床程序。', pricing: 'free' },
  { id: 49, name: 'SM.MS', slug: 'sm-ms', category: '实用工具', url: 'https://sm.ms/', shortDesc: '免费图床', tags: ['工具', '图床'], description: 'SM.MS 是免费图床。', pricing: 'free' },
  { id: 50, name: 'Imgur', slug: 'imgur', category: '实用工具', url: 'https://imgur.com/', shortDesc: '国外知名图床', tags: ['工具', '图床'], description: 'Imgur 是国外知名图床。', pricing: 'free' },
];

const CATEGORY_ICONS: Record<string, string> = {
  'AI 工具': '🤖',
  '效率办公': '💼',
  '影视资源': '🎥',
  '在线音乐': '🎧',
  'AI 设计': '🎨',
  '实用工具': '🛠️',
  '开发编程': '💻',
};

const pricingLabels: Record<string, { text: string; color: string; bg: string }> = {
  free: { text: '完全免费', color: 'text-green-600', bg: 'bg-green-50' },
  freemium: { text: '免费额度', color: 'text-blue-600', bg: 'bg-blue-50' },
  paid: { text: '付费', color: 'text-purple-600', bg: 'bg-purple-50' },
  'limited-free': { text: '限时免费', color: 'text-orange-600', bg: 'bg-orange-50' },
  trial: { text: '免费试用', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  contact: { text: '联系询价', color: 'text-gray-600', bg: 'bg-gray-50' },
};

export function generateStaticParams() {
  return TOOLS_DATA.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS_DATA.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const categoryIcon = CATEGORY_ICONS[tool.category] || '📁';
  const priceInfo = pricingLabels[tool.pricing] || pricingLabels.freemium;
  const similarTools = TOOLS_DATA.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <button
          onClick={() => window.history.back()}
          className="group flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all mb-6"
        >
          <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回
        </button>

        {/* 工具卡片 */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* 头部 */}
          <div className="gradient-primary p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                  {categoryIcon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                  <div className="flex items-center space-x-3 text-white/90">
                    <span className="text-sm">{tool.category}</span>
                    <span>•</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${priceInfo.bg} ${priceInfo.color} font-medium`}>
                      {priceInfo.text}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
              >
                访问网站
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 内容 */}
          <div className="p-8">
            {/* 描述 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">工具介绍</h2>
              <p className="text-gray-600 leading-relaxed">{tool.description}</p>
            </div>

            {/* 短描述 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">简介</h2>
              <p className="text-gray-600">{tool.shortDesc}</p>
            </div>

            {/* 标签 */}
            {tool.tags && tool.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3">标签</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* URL */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">网址</h2>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:underline break-all"
              >
                {tool.url}
              </a>
            </div>
          </div>
        </div>

        {/* 相似工具 */}
        {similarTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相似工具</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarTools.map((t) => {
                const colors = [
                  'bg-gradient-to-br from-blue-500 to-blue-600',
                  'bg-gradient-to-br from-purple-500 to-purple-600',
                  'bg-gradient-to-br from-pink-500 to-pink-600',
                  'bg-gradient-to-br from-green-500 to-green-600',
                ];
                const colorIndex = t.name.charCodeAt(0) % colors.length;
                const bgColor = colors[colorIndex];

                return (
                  <Link
                    key={t.id}
                    href={`/tool/${t.slug}`}
                    className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 mb-4 rounded-2xl ${bgColor} flex items-center justify-center shadow-md`}>
                      <span className="text-white font-bold text-2xl">{t.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600">{t.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{t.shortDesc}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
