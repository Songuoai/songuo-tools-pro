import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

const CATEGORY_MAP: Record<string, string> = {
  'video': '影视资源',
  'music': '在线音乐',
  'ai': 'AI 工具',
  'office': '效率办公',
  'design': 'AI 设计',
  'utility': '实用工具',
  'dev': '开发编程',
  'ai-gongju': 'AI 工具',
  'xiaolv-bangong': '效率办公',
  'yingshi-ziyuan': '影视资源',
  'zaixian-yinyue': '在线音乐',
  'ai-sheji': 'AI 设计',
  'shiyong-gongju': '实用工具',
  'kaifa-biancheng': '开发编程',
};

const CATEGORY_ICONS: Record<string, string> = {
  'AI 工具': '🤖',
  '效率办公': '💼',
  '影视资源': '🎥',
  '在线音乐': '🎧',
  'AI 设计': '🎨',
  '实用工具': '🛠️',
  '开发编程': '💻',
};

// 生成所有可能的分类页面
export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug: slug,
  }));
}

// 工具数据（从 data 目录加载）
const TOOLS_DATA = [
  { id: 1, name: '即梦 AI', slug: 'jimeng-ai', category: 'AI 工具', url: 'https://jimeng.jianying.com/', shortDesc: '字节跳动产品，效果最佳', tags: ['视频生成', 'AI'] },
  { id: 2, name: '可灵 AI', slug: 'kling-ai', category: 'AI 工具', url: 'https://klingai.kuaishou.com/', shortDesc: '快手产品，中文优化', tags: ['视频生成', 'AI'] },
  { id: 3, name: '海螺 AI', slug: 'hailuo-ai', category: 'AI 工具', url: 'https://hailuoai.com/', shortDesc: 'MiniMax 产品，免费', tags: ['视频生成', 'AI'] },
  { id: 4, name: 'VIDU', slug: 'vidu', category: 'AI 工具', url: 'https://www.vidu.cn/', shortDesc: '清华团队，国产之光', tags: ['视频生成', 'AI'] },
  { id: 5, name: "Pika", slug: 'pika', category: 'AI 工具', url: 'https://pika.art/', shortDesc: 'Pika Labs 产品，动画优秀', tags: ['视频生成', 'AI'] },
  { id: 6, name: "Runway", slug: 'runway', category: 'AI 工具', url: 'https://runwayml.com/', shortDesc: 'Gen-3 模型，专业级', tags: ['视频生成', 'AI'] },
  { id: 7, name: 'Luma', slug: 'luma', category: 'AI 工具', url: 'https://lumalabs.ai/', shortDesc: 'Dream Machine 模型', tags: ['视频生成', 'AI'] },
  { id: 8, name: 'PixVerse', slug: 'pixverse', category: 'AI 工具', url: 'https://pixverse.ai/', shortDesc: '免费额度，适合新手', tags: ['视频生成', 'AI'] },
  { id: 9, name: 'Haiper', slug: 'haiper', category: 'AI 工具', url: 'https://haiper.ai/', shortDesc: '哈珀 AI，英国团队', tags: ['视频生成', 'AI'] },
  { id: 10, name: 'Viggle', slug: 'viggle', category: 'AI 工具', url: 'https://viggle.ai/', shortDesc: '角色动画，舞蹈视频', tags: ['视频生成', 'AI'] },
  { id: 11, name: 'Adobe Firefly', slug: 'adobe-firefly', category: 'AI 工具', url: 'https://firefly.adobe.com/', shortDesc: 'Adobe 官方，商业安全', tags: ['视频生成', 'AI'] },
  { id: 12, name: 'Fliki', slug: 'fliki', category: 'AI 工具', url: 'https://fliki.ai/', shortDesc: '文生视频，营销友好', tags: ['视频生成', 'AI'] },
  { id: 13, name: 'D-ID', slug: 'd-id', category: 'AI 工具', url: 'https://www.d-id.com/', shortDesc: '数字人播报', tags: ['视频生成', 'AI'] },
  { id: 14, name: 'HeyGen', slug: 'heygen', category: 'AI 工具', url: 'https://www.heygen.com/', shortDesc: '数字人视频，口型同步', tags: ['视频生成', 'AI'] },
  { id: 15, name: 'Synthesia', slug: 'synthesia', category: 'AI 工具', url: 'https://www.synthesia.io/', shortDesc: '企业级数字人', tags: ['视频生成', 'AI'] },
  { id: 16, name: 'InVideo', slug: 'invideo', category: 'AI 工具', url: 'https://invideo.io/', shortDesc: '模板丰富，易上手', tags: ['视频生成', 'AI'] },
  { id: 17, name: 'Elai.io', slug: 'elai-io', category: 'AI 工具', url: 'https://elai.io/', shortDesc: '数字人视频', tags: ['视频生成', 'AI'] },
  { id: 18, name: 'Colossyan', slug: 'colossyan', category: 'AI 工具', url: 'https://www.colossyan.com/', shortDesc: '企业培训视频', tags: ['视频生成', 'AI'] },
  { id: 19, name: 'DeepBrain AI', slug: 'deepbrain-ai', category: 'AI 工具', url: 'https://www.deepbrain.io/', shortDesc: '韩国数字人', tags: ['视频生成', 'AI'] },
  { id: 20, name: 'Veed.io', slug: 'veed-io', category: 'AI 工具', url: 'https://www.veed.io/', shortDesc: '在线视频编辑', tags: ['视频生成', 'AI'] },
  { id: 21, name: '网易云音乐', slug: 'netease-music', category: '在线音乐', url: 'https://music.163.com/', shortDesc: '网易出品，华语音乐库丰富', tags: ['音乐', '流媒体'] },
  { id: 22, name: 'QQ 音乐', slug: 'qq-music', category: '在线音乐', url: 'https://y.qq.com/', shortDesc: '腾讯出品，版权丰富', tags: ['音乐', '流媒体'] },
  { id: 23, name: '酷狗音乐', slug: 'kugou-music', category: '在线音乐', url: 'https://www.kugou.com/', shortDesc: '老牌音乐平台，音质出色', tags: ['音乐', '流媒体'] },
  { id: 24, name: '酷我音乐', slug: 'kuwo-music', category: '在线音乐', url: 'https://www.kuwo.cn/', shortDesc: '海量音乐，无损音质', tags: ['音乐', '流媒体'] },
  { id: 25, name: '咪咕音乐', slug: 'migu-music', category: '在线音乐', url: 'https://music.migu.cn/', shortDesc: '中国移动出品，免费听', tags: ['音乐', '流媒体'] },
  { id: 26, name: 'Bilibili 音乐', slug: 'bilibili-music', category: '在线音乐', url: 'https://www.bilibili.com/v/audio', shortDesc: 'B 站音乐区，UP 主创作', tags: ['音乐', '视频'] },
  { id: 27, name: 'YouTube Music', slug: 'youtube-music', category: '在线音乐', url: 'https://music.youtube.com/', shortDesc: '谷歌出品，全球音乐', tags: ['音乐', '流媒体'] },
  { id: 28, name: 'Spotify', slug: 'spotify', category: '在线音乐', url: 'https://open.spotify.com/', shortDesc: '全球最大流媒体音乐平台', tags: ['音乐', '流媒体'] },
  { id: 29, name: 'Apple Music', slug: 'apple-music', category: '在线音乐', url: 'https://music.apple.com/', shortDesc: '苹果出品，无损音质', tags: ['音乐', '流媒体'] },
  { id: 30, name: 'SoundCloud', slug: 'soundcloud', category: '在线音乐', url: 'https://soundcloud.com/', shortDesc: '独立音乐人平台', tags: ['音乐', '流媒体'] },
  { id: 31, name: '爱奇艺', slug: 'iqiyi', category: '影视资源', url: 'https://www.iqiyi.com/', shortDesc: '爱奇艺在线视频', tags: ['影视', '流媒体'] },
  { id: 32, name: '腾讯视频', slug: 'tencent-video', category: '影视资源', url: 'https://v.qq.com/', shortDesc: '腾讯视频在线视频', tags: ['影视', '流媒体'] },
  { id: 33, name: '优酷', slug: 'youku', category: '影视资源', url: 'https://www.youku.com/', shortDesc: '优酷在线视频', tags: ['影视', '流媒体'] },
  { id: 34, name: '芒果 TV', slug: 'mgtv', category: '影视资源', url: 'https://www.mgtv.com/', shortDesc: '芒果 TV 在线视频', tags: ['影视', '流媒体'] },
  { id: 35, name: '哔哩哔哩', slug: 'bilibili', category: '影视资源', url: 'https://www.bilibili.com/', shortDesc: 'B 站在线视频', tags: ['影视', '流媒体'] },
  { id: 36, name: '搜狐视频', slug: 'sohu-video', category: '影视资源', url: 'https://tv.sohu.com/', shortDesc: '搜狐视频在线视频', tags: ['影视', '流媒体'] },
  { id: 37, name: '乐视视频', slug: 'le-video', category: '影视资源', url: 'https://www.le.com/', shortDesc: '乐视视频在线视频', tags: ['影视', '流媒体'] },
  { id: 38, name: 'PPTV', slug: 'pptv', category: '影视资源', url: 'https://www.pptv.com/', shortDesc: 'PPTV 在线视频', tags: ['影视', '流媒体'] },
  { id: 39, name: 'YouTube', slug: 'youtube', category: '影视资源', url: 'https://www.youtube.com/', shortDesc: 'YouTube 在线视频', tags: ['影视', '流媒体'] },
  { id: 40, name: 'Netflix', slug: 'netflix', category: '影视资源', url: 'https://www.netflix.com/', shortDesc: 'Netflix 在线视频', tags: ['影视', '流媒体'] },
  { id: 41, name: 'Notion', slug: 'notion', category: '效率办公', url: 'https://www.notion.so/', shortDesc: '强大的笔记和项目管理工具', tags: ['办公', '笔记'] },
  { id: 42, name: 'ProcessOn', slug: 'processon', category: '效率办公', url: 'https://www.processon.com/', shortDesc: '在线流程图工具', tags: ['办公', '图表'] },
  { id: 43, name: 'Canva', slug: 'canva', category: 'AI 设计', url: 'https://www.canva.com/', shortDesc: '在线设计工具', tags: ['设计', 'AI'] },
  { id: 44, name: 'Figma', slug: 'figma', category: 'AI 设计', url: 'https://www.figma.com/', shortDesc: '在线设计协作工具', tags: ['设计', '协作'] },
  { id: 45, name: '即时设计', slug: 'jsdesign', category: 'AI 设计', url: 'https://js.design/', shortDesc: '国产在线设计工具', tags: ['设计', '协作'] },
  { id: 46, name: 'MasterGo', slug: 'mastergo', category: 'AI 设计', url: 'https://mastergo.com/', shortDesc: '国产在线设计协作工具', tags: ['设计', '协作'] },
  { id: 47, name: 'Pixso', slug: 'pixso', category: 'AI 设计', url: 'https://pixso.cn/', shortDesc: '国产在线设计协作工具', tags: ['设计', '协作'] },
  { id: 48, name: '兰空图床', slug: 'lsky-pro', category: '实用工具', url: 'https://www.lsky.pro/', shortDesc: '开源图床程序', tags: ['工具', '图床'] },
  { id: 49, name: 'SM.MS', slug: 'sm-ms', category: '实用工具', url: 'https://sm.ms/', shortDesc: '免费图床', tags: ['工具', '图床'] },
  { id: 50, name: 'Imgur', slug: 'imgur', category: '实用工具', url: 'https://imgur.com/', shortDesc: '国外知名图床', tags: ['工具', '图床'] },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const categoryName = CATEGORY_MAP[slug];

  if (!categoryName) {
    notFound();
  }

  const tools = TOOLS_DATA.filter((tool) => tool.category === categoryName);
  const icon = CATEGORY_ICONS[categoryName] || '📁';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 分类头部 */}
      <section className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">{icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                <p className="text-sm text-gray-500 mt-2">
                  共 <span className="font-semibold text-orange-600">{tools.length}</span> 个工具
                </p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回
            </button>
          </div>
        </div>
      </section>

      {/* 工具列表 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tools.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">暂无工具</h3>
              <p className="text-gray-500">该分类下还没有工具</p>
              <Link href="/" className="mt-4 inline-block text-orange-600 hover:underline">
                返回首页
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool) => {
                const colors = [
                  'bg-gradient-to-br from-blue-500 to-blue-600',
                  'bg-gradient-to-br from-purple-500 to-purple-600',
                  'bg-gradient-to-br from-pink-500 to-pink-600',
                  'bg-gradient-to-br from-green-500 to-green-600',
                  'bg-gradient-to-br from-teal-500 to-teal-600',
                  'bg-gradient-to-br from-indigo-500 to-indigo-600',
                  'bg-gradient-to-br from-yellow-500 to-yellow-600',
                  'bg-gradient-to-br from-red-500 to-red-600',
                ];
                const colorIndex = tool.name.charCodeAt(0) % colors.length;
                const bgColor = colors[colorIndex];

                return (
                  <Link
                    key={tool.id}
                    href={`/tool/${tool.slug}`}
                    className="group p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 mb-4 rounded-2xl ${bgColor} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                      <span className="text-white font-bold text-2xl">{tool.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">{tool.name}</h3>
                    <p className="text-xs text-gray-400 mb-3 truncate">{new URL(tool.url).hostname.replace('www.', '')}</p>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{tool.shortDesc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags && tool.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
