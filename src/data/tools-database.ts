// 松果工具箱 - 完整工具数据库
// 包含截图中的所有网站

export interface Tool {
  id: number;
  slug: string;
  name: string;
  url: string;
  logoUrl: string;
  category: string;
  priceType: string;
  shortDesc: string;
  description: string;
  tags: string[];
  views: number;
  rating: number;
  status: 'published' | 'draft';
}

function createTool(
  id: number,
  name: string,
  url: string,
  logoUrl: string,
  category: string,
  priceType: string,
  shortDesc: string,
  description: string,
  tags: string[]
): Tool {
  return {
    id,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name,
    url,
    logoUrl,
    category,
    priceType,
    shortDesc,
    description,
    tags,
    views: Math.floor(Math.random() * 2000) + 100,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    status: 'published' as const
  };
}

export const toolsDatabase: Tool[] = [
  // ========== AI 工具 (10 个) ==========
  createTool(1, 'ChatGPT', 'https://chat.openai.com', 'https://cdn.worldvectorlogo.com/logos/chatgpt.svg', 'AI 工具', 'freemium', 'OpenAI 开发的 AI 对话助手', 'ChatGPT 是 OpenAI 开发的大型语言模型，能够进行自然对话、回答问题、创作文字、编程辅助等。', ['AI', '对话', '生产力']),
  createTool(2, 'Claude', 'https://claude.ai', 'https://cdn.worldvectorlogo.com/logos/claude-ai.svg', 'AI 工具', 'freemium', 'Anthropic 开发的 AI 助手', 'Claude 是 Anthropic 开发的 AI 助手，擅长长文本处理、文档分析、内容创作。', ['AI', '对话', '写作']),
  createTool(3, 'Gemini', 'https://gemini.google.com', 'https://cdn.worldvectorlogo.com/logos/google-gemini.svg', 'AI 工具', 'free', 'Google 的多模态 AI 模型', 'Gemini 是 Google 开发的多模态 AI 模型，能够理解文本、图像、代码等多种输入。', ['AI', 'Google', '多模态']),
  createTool(4, 'Copilot', 'https://copilot.microsoft.com', 'https://cdn.worldvectorlogo.com/logos/microsoft-copilot.svg', 'AI 工具', 'freemium', 'Microsoft AI 助手', 'Microsoft Copilot 是微软开发的 AI 助手，集成在 Windows、Office 等产品中。', ['AI', 'Microsoft', '办公']),
  createTool(5, 'Perplexity', 'https://perplexity.ai', 'https://cdn.worldvectorlogo.com/logos/perplexity-ai.svg', 'AI 工具', 'freemium', 'AI 驱动的搜索引擎', 'Perplexity AI 是 AI 驱动的搜索引擎，结合传统搜索和大语言模型。', ['AI', '搜索', '研究']),
  createTool(6, 'Character.ai', 'https://character.ai', 'https://cdn.worldvectorlogo.com/logos/character-ai.svg', 'AI 工具', 'freemium', '创建和对话 AI 角色', 'Character.ai 允许用户创建自定义 AI 角色并与之对话。', ['AI', '娱乐', '对话']),
  createTool(7, 'Poe', 'https://poe.com', 'https://cdn.worldvectorlogo.com/logos/poe-ai.svg', 'AI 工具', 'freemium', '多合一 AI 聊天平台', 'Poe 是 Quora 开发的多合一 AI 聊天平台，集成多个 AI 模型。', ['AI', '聚合', '对话']),
  createTool(8, 'You.com', 'https://you.com', 'https://cdn.worldvectorlogo.com/logos/you-com.svg', 'AI 工具', 'freemium', 'AI 搜索引擎', 'You.com 是 AI 驱动的搜索引擎，提供个性化搜索结果。', ['AI', '搜索', '隐私']),
  createTool(9, 'Phind', 'https://phind.com', 'https://cdn.worldvectorlogo.com/logos/phind.svg', 'AI 工具', 'free', 'AI 编程搜索引擎', 'Phind 是专为开发者设计的 AI 搜索引擎。', ['AI', '编程', '搜索']),
  createTool(10, 'Hugging Chat', 'https://huggingface.co/chat', 'https://cdn.worldvectorlogo.com/logos/huggingface.svg', 'AI 工具', 'free', '开源 AI 对话平台', 'Hugging Chat 是 Hugging Face 开发的开源 AI 对话平台。', ['AI', '开源', '对话']),

  // ========== AI 设计 (10 个) ==========
  createTool(11, 'Midjourney', 'https://midjourney.com', 'https://cdn.worldvectorlogo.com/logos/midjourney.svg', 'AI 设计', 'paid', 'AI 图像生成工具', 'Midjourney 是 AI 图像生成工具，通过 Discord 机器人操作。', ['AI', '图像生成', '艺术']),
  createTool(12, 'DALL-E 3', 'https://openai.com/dall-e-3', 'https://cdn.worldvectorlogo.com/logos/dall-e.svg', 'AI 设计', 'paid', 'OpenAI 图像生成', 'DALL-E 3 是 OpenAI 开发的图像生成模型。', ['AI', '图像生成', 'OpenAI']),
  createTool(13, 'Stable Diffusion', 'https://stability.ai', 'https://cdn.worldvectorlogo.com/logos/stability-ai.svg', 'AI 设计', 'free', '开源 AI 图像生成', 'Stable Diffusion 是开源 AI 图像生成模型。', ['AI', '开源', '图像']),
  createTool(14, 'Leonardo.ai', 'https://leonardo.ai', 'https://cdn.worldvectorlogo.com/logos/leonardo-ai.svg', 'AI 设计', 'freemium', 'AI 艺术创作平台', 'Leonardo.ai 是 AI 艺术创作平台，提供游戏素材、概念艺术。', ['AI', '艺术', '游戏']),
  createTool(15, 'Canva', 'https://canva.com', 'https://cdn.worldvectorlogo.com/logos/canva.svg', 'AI 设计', 'freemium', '在线设计工具', 'Canva 是在线设计工具，提供海量模板、素材、AI 设计功能。', ['设计', '模板', '在线']),
  createTool(16, 'Figma', 'https://figma.com', 'https://cdn.worldvectorlogo.com/logos/figma.svg', 'AI 设计', 'freemium', '协作设计工具', 'Figma 是协作设计工具，支持 UI/UX 设计、原型制作。', ['设计', 'UI/UX', '协作']),
  createTool(17, 'Adobe Firefly', 'https://firefly.adobe.com', 'https://cdn.worldvectorlogo.com/logos/adobe-firefly.svg', 'AI 设计', 'freemium', 'Adobe AI 创意工具', 'Adobe Firefly 是 Adobe 的 AI 创意工具家族。', ['AI', 'Adobe', '创意']),
  createTool(18, 'Runway', 'https://runwayml.com', 'https://cdn.worldvectorlogo.com/logos/runway.svg', 'AI 设计', 'freemium', 'AI 视频编辑工具', 'Runway 是 AI 视频编辑工具，提供视频生成、特效、剪辑。', ['AI', '视频', '编辑']),
  createTool(19, 'Clipdrop', 'https://clipdrop.co', 'https://cdn.worldvectorlogo.com/logos/clipdrop.svg', 'AI 设计', 'freemium', 'AI 图像处理工具', 'Clipdrop 是 AI 图像处理工具，提供背景移除、图像放大。', ['AI', '图像', '处理']),
  createTool(20, 'Remove.bg', 'https://remove.bg', 'https://cdn.worldvectorlogo.com/logos/remove-bg.svg', 'AI 设计', 'freemium', 'AI 抠图工具', 'Remove.bg 是 AI 抠图工具，自动移除图像背景。', ['AI', '抠图', '背景']),

  // ========== AI 视频 (10 个) ==========
  createTool(21, 'Pika Labs', 'https://pika.art', 'https://cdn.worldvectorlogo.com/logos/pika-labs.svg', 'AI 视频', 'freemium', 'AI 视频创作', 'Pika Labs 是 AI 视频创作工具，提供视频生成、编辑。', ['AI', '视频', '创作']),
  createTool(22, 'Luma Dream Machine', 'https://lumalabs.ai', 'https://cdn.worldvectorlogo.com/logos/luma-ai.svg', 'AI 视频', 'freemium', 'AI 视频生成', 'Luma Dream Machine 是 AI 视频生成工具。', ['AI', '视频', '生成']),
  createTool(23, 'HeyGen', 'https://heygen.com', 'https://cdn.worldvectorlogo.com/logos/heygen.svg', 'AI 视频', 'freemium', 'AI 数字人视频', 'HeyGen 是 AI 数字人视频工具。', ['AI', '数字人', '视频']),
  createTool(24, 'D-ID', 'https://d-id.com', 'https://cdn.worldvectorlogo.com/logos/d-id.svg', 'AI 视频', 'freemium', 'AI 照片说话', 'D-ID 是 AI 照片说话工具。', ['AI', '数字人', '照片']),
  createTool(25, 'Descript', 'https://descript.com', 'https://cdn.worldvectorlogo.com/logos/descript.svg', 'AI 视频', 'freemium', 'AI 视频编辑', 'Descript 是 AI 视频编辑工具。', ['AI', '视频', '编辑']),
  createTool(26, 'CapCut', 'https://capcut.com', 'https://cdn.worldvectorlogo.com/logos/capcut.svg', 'AI 视频', 'free', '视频编辑', 'CapCut 是视频编辑工具。', ['视频', '编辑', '免费']),
  createTool(27, 'InVideo', 'https://invideo.io', 'https://cdn.worldvectorlogo.com/logos/invideo.svg', 'AI 视频', 'freemium', '在线视频制作', 'InVideo 是在线视频制作工具。', ['视频', '制作', '在线']),
  createTool(28, 'Veed.io', 'https://veed.io', 'https://cdn.worldvectorlogo.com/logos/veed.svg', 'AI 视频', 'freemium', '在线视频编辑', 'Veed.io 是在线视频编辑工具。', ['视频', '编辑', '在线']),
  createTool(29, 'Clipchamp', 'https://clipchamp.com', 'https://cdn.worldvectorlogo.com/logos/clipchamp.svg', 'AI 视频', 'freemium', '视频编辑', 'Clipchamp 是视频编辑工具。', ['视频', '编辑', '微软']),
  createTool(30, 'FlexClip', 'https://flexclip.com', 'https://cdn.worldvectorlogo.com/logos/flexclip.svg', 'AI 视频', 'freemium', '视频制作', 'FlexClip 是视频制作工具。', ['视频', '制作', '在线']),

  // ========== AI 音乐 (10 个) ==========
  createTool(31, 'Suno AI', 'https://suno.ai', 'https://cdn.worldvectorlogo.com/logos/suno-ai.svg', 'AI 音乐', 'freemium', 'AI 歌曲生成', 'Suno AI 是 AI 歌曲生成工具，根据文本生成完整歌曲。', ['AI', '音乐', '歌曲']),
  createTool(32, 'Udio', 'https://udio.com', 'https://cdn.worldvectorlogo.com/logos/udio.svg', 'AI 音乐', 'freemium', 'AI 音乐创作', 'Udio 是 AI 音乐创作工具，提供歌曲生成、编曲。', ['AI', '音乐', '创作']),
  createTool(33, 'ElevenLabs', 'https://elevenlabs.io', 'https://cdn.worldvectorlogo.com/logos/elevenlabs.svg', 'AI 音乐', 'freemium', 'AI 语音生成', 'ElevenLabs 是 AI 语音生成工具，提供逼真的语音合成。', ['AI', '语音', '合成']),
  createTool(34, 'AIVA', 'https://aiva.ai', 'https://cdn.worldvectorlogo.com/logos/aiva.svg', 'AI 音乐', 'freemium', 'AI 作曲工具', 'AIVA 是 AI 作曲工具，提供背景音乐、配乐生成。', ['AI', '作曲', '配乐']),
  createTool(35, 'Soundraw', 'https://soundraw.io', 'https://cdn.worldvectorlogo.com/logos/soundraw.svg', 'AI 音乐', 'paid', 'AI 背景音乐', 'Soundraw 是 AI 背景音乐生成工具。', ['AI', '音乐', '背景音乐']),
  createTool(36, 'Music FX', 'https://aitestkitchen.withgoogle.com/tools/music-fx', 'https://cdn.worldvectorlogo.com/logos/google.svg', 'AI 音乐', 'free', 'Google AI 音乐生成', 'Music FX 是 Google 开发的 AI 音乐生成工具。', ['AI', '音乐', 'Google']),
  createTool(37, 'Boomy', 'https://boomy.com', 'https://cdn.worldvectorlogo.com/logos/boomy.svg', 'AI 音乐', 'freemium', 'AI 音乐创作', 'Boomy 是 AI 音乐创作工具。', ['AI', '音乐', '创作']),
  createTool(38, 'VoiceMod', 'https://voicemod.net', 'https://cdn.worldvectorlogo.com/logos/voicemod.svg', 'AI 音乐', 'freemium', 'AI 变声工具', 'VoiceMod 是 AI 变声工具。', ['AI', '语音', '变声']),
  createTool(39, 'Kits AI', 'https://kits.ai', 'https://cdn.worldvectorlogo.com/logos/kits-ai.svg', 'AI 音乐', 'freemium', 'AI 声音转换', 'Kits AI 是 AI 声音转换工具。', ['AI', '语音', '转换']),
  createTool(40, 'Uberduck', 'https://uberduck.ai', 'https://cdn.worldvectorlogo.com/logos/uberduck.svg', 'AI 音乐', 'freemium', 'AI 语音合成', 'Uberduck 是 AI 语音合成工具。', ['AI', '语音', '合成']),

  // ========== 效率办公 (10 个) ==========
  createTool(41, 'Notion', 'https://notion.so', 'https://cdn.worldvectorlogo.com/logos/notion.svg', '效率办公', 'freemium', '全能工作空间', 'Notion 是全能工作空间，提供笔记、数据库、任务管理。', ['办公', '笔记', '协作']),
  createTool(42, '飞书', 'https://feishu.cn', 'https://cdn.worldvectorlogo.com/logos/feishu.svg', '效率办公', 'freemium', '企业协作平台', '飞书是企业协作平台，提供即时通讯、文档、日历。', ['办公', '协作', '企业']),
  createTool(43, '钉钉', 'https://dingtalk.com', 'https://cdn.worldvectorlogo.com/logos/dingtalk.svg', '效率办公', 'freemium', '企业办公平台', '钉钉是阿里巴巴推出的企业办公平台。', ['办公', '协作', '企业']),
  createTool(44, '腾讯文档', 'https://docs.qq.com', 'https://cdn.worldvectorlogo.com/logos/tencent-docs.svg', '效率办公', 'free', '在线协作文档', '腾讯文档是在线协作文档工具。', ['办公', '文档', '协作']),
  createTool(45, '石墨文档', 'https://shimo.im', 'https://cdn.worldvectorlogo.com/logos/shimo.svg', '效率办公', 'freemium', '在线协作文档', '石墨文档是在线协作文档工具。', ['办公', '文档', '协作']),
  createTool(46, 'TinyWow', 'https://tinywow.com', 'https://cdn.worldvectorlogo.com/logos/tinywow.svg', '效率办公', 'free', '免费在线工具集', 'TinyWow 提供多种免费在线工具。', ['工具', '免费', '在线']),
  createTool(47, '语雀', 'https://yuque.com', 'https://cdn.worldvectorlogo.com/logos/yuque.svg', '效率办公', 'freemium', '知识库平台', '语雀是知识库平台。', ['办公', '文档', '知识']),
  createTool(48, '金山文档', 'https://kdocs.cn', 'https://cdn.worldvectorlogo.com/logos/kdocs.svg', '效率办公', 'free', '在线文档', '金山文档是在线文档工具。', ['办公', '文档', '在线']),
  createTool(49, 'FlowSpeech', 'https://flowspeech.com', 'https://cdn.worldvectorlogo.com/logos/flowspeech.svg', '效率办公', 'freemium', '语音转文字', 'FlowSpeech 是语音转文字工具。', ['办公', '语音', '转换']),
  createTool(50, 'Hey Watcher', 'https://heywatcher.com', 'https://cdn.worldvectorlogo.com/logos/heywatcher.svg', '效率办公', 'freemium', '社交媒体管理', 'Hey Watcher 是社交媒体管理工具。', ['办公', '社交', '管理']),

  // ========== 影视资源 (10 个) ==========
  createTool(51, 'Netflix', 'https://netflix.com', 'https://cdn.worldvectorlogo.com/logos/netflix.svg', '影视资源', 'paid', '流媒体平台', 'Netflix 是流媒体平台，提供电影、剧集、纪录片。', ['视频', '流媒体', '电影']),
  createTool(52, 'Disney+', 'https://disneyplus.com', 'https://cdn.worldvectorlogo.com/logos/disney-plus.svg', '影视资源', 'paid', '迪士尼流媒体', 'Disney+ 是迪士尼流媒体平台。', ['视频', '迪士尼', '流媒体']),
  createTool(53, 'YouTube', 'https://youtube.com', 'https://cdn.worldvectorlogo.com/logos/youtube.svg', '影视资源', 'freemium', '视频分享平台', 'YouTube 是视频分享平台。', ['视频', '免费', '分享']),
  createTool(54, 'Bilibili', 'https://bilibili.com', 'https://cdn.worldvectorlogo.com/logos/bilibili.svg', '影视资源', 'freemium', '哔哩哔哩视频站', 'Bilibili 是中国视频平台。', ['视频', '弹幕', '动画']),
  createTool(55, '爱奇艺', 'https://iqiyi.com', 'https://cdn.worldvectorlogo.com/logos/iqiyi.svg', '影视资源', 'freemium', '中国视频平台', '爱奇艺是中国视频平台。', ['视频', '国产', '流媒体']),
  createTool(56, '低端影视', 'https://ddys.tv', 'https://cdn.worldvectorlogo.com/logos/ddys.svg', '影视资源', 'free', '免费影视', '低端影视是免费影视网站。', ['视频', '免费', '国产']),
  createTool(57, '1905 电影网', 'https://www.1905.com', 'https://cdn.worldvectorlogo.com/logos/1905.svg', '影视资源', 'free', '电影网站', '1905 电影网是电影网站。', ['视频', '电影', '国产']),
  createTool(58, 'HD 茉莉', 'https://hdmol.com', 'https://cdn.worldvectorlogo.com/logos/hdmol.svg', '影视资源', 'free', '高清影视', 'HD 茉莉是高清影视网站。', ['视频', '高清', '免费']),
  createTool(59, '厂长资源', 'https://czzy.top', 'https://cdn.worldvectorlogo.com/logos/czzy.svg', '影视资源', 'free', '影视资源', '厂长资源是影视资源网站。', ['视频', '免费', '资源']),
  createTool(60, 'LIBVIO', 'https://www.libvio.com', 'https://cdn.worldvectorlogo.com/logos/libvio.svg', '影视资源', 'free', '影视网站', 'LIBVIO 是影视网站。', ['视频', '免费', '影视']),

  // ========== 在线音乐 (10 个) ==========
  createTool(61, 'Spotify', 'https://spotify.com', 'https://cdn.worldvectorlogo.com/logos/spotify.svg', '在线音乐', 'freemium', '音乐流媒体', 'Spotify 是音乐流媒体平台。', ['音乐', '流媒体', '在线']),
  createTool(62, 'Apple Music', 'https://music.apple.com', 'https://cdn.worldvectorlogo.com/logos/apple-music.svg', '在线音乐', 'paid', 'Apple 音乐', 'Apple Music 是 Apple 音乐服务。', ['音乐', 'Apple', '流媒体']),
  createTool(63, 'YouTube Music', 'https://music.youtube.com', 'https://cdn.worldvectorlogo.com/logos/youtube-music.svg', '在线音乐', 'freemium', 'YouTube 音乐', 'YouTube Music 是 YouTube 音乐服务。', ['音乐', 'Google', '在线']),
  createTool(64, 'QQ 音乐', 'https://y.qq.com', 'https://cdn.worldvectorlogo.com/logos/qq-music.svg', '在线音乐', 'freemium', '腾讯音乐', 'QQ 音乐是腾讯音乐平台。', ['音乐', '国产', '流媒体']),
  createTool(65, '网易云音乐', 'https://music.163.com', 'https://cdn.worldvectorlogo.com/logos/netease-cloud-music.svg', '在线音乐', 'freemium', '网易云音乐', '网易云音乐是音乐平台。', ['音乐', '国产', '社区']),
  createTool(66, '放屁音乐', 'https://fpmusic.com', 'https://cdn.worldvectorlogo.com/logos/fpmusic.svg', '在线音乐', 'free', '免费音乐', '放屁音乐是免费音乐网站。', ['音乐', '免费', '在线']),
  createTool(67, '糖果音乐', 'https://tme.com', 'https://cdn.worldvectorlogo.com/logos/tme.svg', '在线音乐', 'freemium', '音乐平台', '糖果音乐是音乐平台。', ['音乐', '流媒体', '在线']),
  createTool(68, 'ACG 漫音社', 'https://acgjc.com', 'https://cdn.worldvectorlogo.com/logos/acgjc.svg', '在线音乐', 'free', '动漫音乐', 'ACG 漫音社是动漫音乐网站。', ['音乐', '动漫', '免费']),
  createTool(69, '耳聆网', 'https://www.ear0.com', 'https://cdn.worldvectorlogo.com/logos/ear0.svg', '在线音乐', 'free', '声音素材', '耳聆网是声音素材网站。', ['音乐', '素材', '免费']),
  createTool(70, '爱给网', 'https://www.aigei.com', 'https://cdn.worldvectorlogo.com/logos/aigei.svg', '在线音乐', 'freemium', '素材网站', '爱给网是素材网站。', ['音乐', '素材', '设计']),

  // ========== 实用工具 (15 个) ==========
  createTool(71, 'iLovePDF', 'https://ilovepdf.com', 'https://cdn.worldvectorlogo.com/logos/ilovepdf.svg', '实用工具', 'freemium', 'PDF 工具', 'iLovePDF 是在线 PDF 工具。', ['PDF', '工具', '在线']),
  createTool(72, 'SmallPDF', 'https://smallpdf.com', 'https://cdn.worldvectorlogo.com/logos/smallpdf.svg', '实用工具', 'freemium', 'PDF 处理', 'SmallPDF 是 PDF 处理工具。', ['PDF', '工具', '处理']),
  createTool(73, 'PDF24', 'https://tools.pdf24.org', 'https://cdn.worldvectorlogo.com/logos/pdf24.svg', '实用工具', 'free', 'PDF 工具', 'PDF24 是 PDF 工具。', ['PDF', '工具', '免费']),
  createTool(74, 'Photopea', 'https://photopea.com', 'https://cdn.worldvectorlogo.com/logos/photopea.svg', '实用工具', 'free', '在线 PS', 'Photopea 是在线 PS 工具。', ['图片', '编辑', '在线']),
  createTool(75, 'TinyPNG', 'https://tinypng.com', 'https://cdn.worldvectorlogo.com/logos/tinypng.svg', '实用工具', 'freemium', '图片压缩', 'TinyPNG 是图片压缩工具。', ['图片', '压缩', '工具']),
  createTool(76, 'SaveFrom', 'https://savefrom.net', 'https://cdn.worldvectorlogo.com/logos/savefrom.svg', '实用工具', 'free', '视频下载', 'SaveFrom 是视频下载工具。', ['下载', '视频', '工具']),
  createTool(77, 'LightPDF', 'https://lightpdf.com', 'https://cdn.worldvectorlogo.com/logos/lightpdf.svg', '实用工具', 'freemium', 'PDF 工具', 'LightPDF 是 PDF 工具。', ['PDF', '工具', '在线']),
  createTool(78, 'PDF Candy', 'https://pdfcandy.com', 'https://cdn.worldvectorlogo.com/logos/pdfcandy.svg', '实用工具', 'freemium', 'PDF 工具', 'PDF Candy 是 PDF 工具。', ['PDF', '工具', '在线']),
  createTool(79, 'Sejda', 'https://www.sejda.com', 'https://cdn.worldvectorlogo.com/logos/sejda.svg', '实用工具', 'freemium', 'PDF 编辑', 'Sejda 是 PDF 编辑工具。', ['PDF', '编辑', '工具']),
  createTool(80, 'CamScanner', 'https://www.camscanner.com', 'https://cdn.worldvectorlogo.com/logos/camscanner.svg', '实用工具', 'freemium', '扫描工具', 'CamScanner 是扫描工具。', ['扫描', '工具', '办公']),
  createTool(81, 'ABBYY', 'https://www.abbyy.com', 'https://cdn.worldvectorlogo.com/logos/abbyy.svg', '实用工具', 'paid', 'OCR 工具', 'ABBYY 是 OCR 工具。', ['OCR', '工具', '识别']),
  createTool(82, 'Adobe Acrobat', 'https://www.adobe.com/acrobat', 'https://cdn.worldvectorlogo.com/logos/adobe-acrobat.svg', '实用工具', 'paid', 'PDF 工具', 'Adobe Acrobat 是 PDF 工具。', ['PDF', '工具', 'Adobe']),
  createTool(83, '稿定设计', 'https://www.gaoding.com', 'https://cdn.worldvectorlogo.com/logos/gaoding.svg', '实用工具', 'freemium', '在线设计', '稿定设计是在线设计工具。', ['设计', '在线', '工具']),
  createTool(84, '创客贴', 'https://www.chuangkit.com', 'https://cdn.worldvectorlogo.com/logos/chuangkit.svg', '实用工具', 'freemium', '在线设计', '创客贴是在线设计工具。', ['设计', '在线', '工具']),
  createTool(85, '讯飞听见', 'https://www.iflyrec.com', 'https://cdn.worldvectorlogo.com/logos/iflyrec.svg', '实用工具', 'freemium', '语音转文字', '讯飞听见是语音转文字工具。', ['语音', '转换', '工具']),
];
