import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

const TOOLS_DATA = [
  { id: 1, name: '即梦 AI', slug: 'jimeng-ai', category: 'AI 工具', url: 'https://jimeng.jianying.com/', shortDesc: '字节跳动产品' },
  { id: 2, name: '可灵 AI', slug: 'kling-ai', category: 'AI 工具', url: 'https://klingai.kuaishou.com/', shortDesc: '快手产品' },
  { id: 3, name: '海螺 AI', slug: 'hailuo-ai', category: 'AI 工具', url: 'https://hailuoai.com/', shortDesc: 'MiniMax 产品' },
  { id: 4, name: 'VIDU', slug: 'vidu', category: 'AI 工具', url: 'https://www.vidu.cn/', shortDesc: '清华团队' },
  { id: 5, name: 'Pika', slug: 'pika', category: 'AI 工具', url: 'https://pika.art/', shortDesc: '动画优秀' },
  { id: 6, name: 'Runway', slug: 'runway', category: 'AI 工具', url: 'https://runwayml.com/', shortDesc: '专业级' },
  { id: 7, name: 'Luma', slug: 'luma', category: 'AI 工具', url: 'https://lumalabs.ai/', shortDesc: 'Dream Machine' },
  { id: 8, name: 'PixVerse', slug: 'pixverse', category: 'AI 工具', url: 'https://pixverse.ai/', shortDesc: '适合新手' },
  { id: 9, name: '网易云音乐', slug: 'netease-music', category: '在线音乐', url: 'https://music.163.com/', shortDesc: '华语音乐库丰富' },
  { id: 10, name: 'QQ 音乐', slug: 'qq-music', category: '在线音乐', url: 'https://y.qq.com/', shortDesc: '版权丰富' },
  { id: 11, name: '爱奇艺', slug: 'iqiyi', category: '影视资源', url: 'https://www.iqiyi.com/', shortDesc: '在线视频' },
  { id: 12, name: '腾讯视频', slug: 'tencent-video', category: '影视资源', url: 'https://v.qq.com/', shortDesc: '在线视频' },
  { id: 13, name: 'Notion', slug: 'notion', category: '效率办公', url: 'https://www.notion.so/', shortDesc: '笔记工具' },
  { id: 14, name: 'Canva', slug: 'canva', category: 'AI 设计', url: 'https://www.canva.com/', shortDesc: '在线设计' },
  { id: 15, name: 'Figma', slug: 'figma', category: 'AI 设计', url: 'https://www.figma.com/', shortDesc: '设计协作' },
];

export function generateStaticParams() {
  return TOOLS_DATA.map((tool) => ({ slug: tool.slug }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS_DATA.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => window.history.back()} className="mb-6 text-gray-600 hover:text-orange-600">← 返回</button>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
          <p className="text-gray-600 mb-4">{tool.shortDesc}</p>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700">访问网站 →</a>
        </div>
      </main>
    </div>
  );
}
