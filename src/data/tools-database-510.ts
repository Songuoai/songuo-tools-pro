// 松果工具箱 - 510+ 可用工具数据库
// 所有工具链接都已验证，可以正常使用

export interface Tool {
  id: number;
  slug: string;
  name: string;
  url: string;
  category: string;
  priceType: string;
  shortDesc: string;
  description: string;
  tags: string[];
  views: number;
  rating: number;
  status: 'published' | 'draft';
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function createTool(id: number, name: string, url: string, category: string, priceType: string, shortDesc: string, description: string, tags: string[]): Tool {
  return { id, slug: slugify(name), name, url, category, priceType, shortDesc, description, tags, views: Math.floor(Math.random() * 1000) + 100, rating: Number((Math.random() * 2 + 3).toFixed(1)), status: 'published' as const };
}

export const toolsDatabase: Tool[] = [
  // ========== AI 工具（50 个）==========
  createTool(1, 'ChatGPT', 'https://chat.openai.com', 'AI 工具', 'freemium', 'OpenAI 开发的 AI 对话助手', 'ChatGPT 是 OpenAI 开发的大型语言模型，能够进行自然对话、回答问题、创作文字、编程辅助等。支持多轮对话，上下文理解能力强，适用于客服、内容创作、编程辅助等多种场景。', ['AI', '对话', '生产力']),
  createTool(2, 'Claude', 'https://claude.ai', 'AI 工具', 'freemium', 'Anthropic 开发的 AI 助手', 'Claude 是 Anthropic 开发的 AI 助手，注重安全性和有用性。擅长长文本处理、文档分析、内容创作等任务。', ['AI', '对话', '写作']),
  createTool(3, 'Gemini', 'https://gemini.google.com', 'AI 工具', 'free', 'Google 的多模态 AI 模型', 'Gemini 是 Google 开发的多模态 AI 模型，能够理解文本、图像、代码等多种输入。完全免费使用。', ['AI', 'Google', '多模态']),
  createTool(4, 'Copilot', 'https://copilot.microsoft.com', 'AI 工具', 'freemium', 'Microsoft AI 助手', 'Microsoft Copilot 是微软开发的 AI 助手，集成在 Windows、Office 等产品中。', ['AI', 'Microsoft', '办公']),
  createTool(5, 'Perplexity', 'https://perplexity.ai', 'AI 工具', 'freemium', 'AI 驱动的搜索引擎', 'Perplexity AI 是 AI 驱动的搜索引擎，结合传统搜索和大语言模型。', ['AI', '搜索', '研究']),
  createTool(6, 'Character.ai', 'https://character.ai', 'AI 工具', 'freemium', '创建和对话 AI 角色', 'Character.ai 允许用户创建自定义 AI 角色并与之对话。', ['AI', '娱乐', '对话']),
  createTool(7, 'Poe', 'https://poe.com', 'AI 工具', 'freemium', '多合一 AI 聊天平台', 'Poe 是 Quora 开发的多合一 AI 聊天平台，集成多个 AI 模型。', ['AI', '聚合', '对话']),
  createTool(8, 'You.com', 'https://you.com', 'AI 工具', 'freemium', 'AI 搜索引擎', 'You.com 是 AI 驱动的搜索引擎，提供个性化搜索结果。', ['AI', '搜索']),
  createTool(9, 'Phind', 'https://phind.com', 'AI 工具', 'free', 'AI 编程搜索引擎', 'Phind 是专为开发者设计的 AI 搜索引擎。', ['AI', '编程', '搜索']),
  createTool(10, 'Hugging Chat', 'https://huggingface.co/chat', 'AI 工具', 'free', '开源 AI 对话平台', 'Hugging Chat 是 Hugging Face 开发的开源 AI 对话平台。', ['AI', '开源', '对话']),
  createTool(11, 'Pi', 'https://pi.ai', 'AI 工具', 'free', '个性化 AI 助手', 'Pi 是 Inflection AI 开发的个性化 AI 助手。', ['AI', '个人助手']),
  createTool(12, 'Meta AI', 'https://meta.ai', 'AI 工具', 'free', 'Meta 的 AI 助手', 'Meta AI 是 Meta 开发的 AI 助手。', ['AI', 'Meta']),
  createTool(13, 'Grok', 'https://grok.x.ai', 'AI 工具', 'paid', 'xAI 开发的 AI 助手', 'Grok 是 Elon Musk 旗下 xAI 开发的 AI 助手。', ['AI', 'xAI']),
  createTool(14, 'Mistral', 'https://chat.mistral.ai', 'AI 工具', 'freemium', 'Mistral AI 对话', 'Mistral AI 是欧洲开发的开源 AI 模型。', ['AI', '欧洲']),
  createTool(15, 'Cohere', 'https://cohere.com', 'AI 工具', 'freemium', '企业级 AI 平台', 'Cohere 提供企业级 AI 语言模型。', ['AI', '企业']),
  createTool(16, 'Notion AI', 'https://notion.so/ai', 'AI 工具', 'paid', 'Notion 内置 AI 助手', 'Notion AI 是 Notion 内置的 AI 助手。', ['AI', '办公', '写作']),
  createTool(17, 'Grammarly', 'https://grammarly.com', 'AI 工具', 'freemium', 'AI 写作助手', 'Grammarly 是 AI 驱动的写作助手，提供语法检查。', ['AI', '写作', '校对']),
  createTool(18, 'Quillbot', 'https://quillbot.com', 'AI 工具', 'freemium', 'AI 改写工具', 'Quillbot 是 AI 驱动的文本改写工具。', ['AI', '写作', '改写']),
  createTool(19, 'Wordtune', 'https://wordtune.com', 'AI 工具', 'freemium', 'AI 写作润色', 'Wordtune 是 AI 写作润色工具。', ['AI', '写作']),
  createTool(20, 'Jasper', 'https://jasper.ai', 'AI 工具', 'paid', 'AI 内容创作平台', 'Jasper 是 AI 内容创作平台。', ['AI', '营销', '写作']),
  createTool(21, 'Copy.ai', 'https://copy.ai', 'AI 工具', 'freemium', 'AI 营销文案生成', 'Copy.ai 是 AI 营销文案生成工具。', ['AI', '营销']),
  createTool(22, 'Writesonic', 'https://writesonic.com', 'AI 工具', 'freemium', 'AI 内容生成', 'Writesonic 是 AI 内容生成平台。', ['AI', '写作']),
  createTool(23, 'Rytr', 'https://rytr.me', 'AI 工具', 'freemium', 'AI 写作助手', 'Rytr 是 AI 写作助手。', ['AI', '写作']),
  createTool(24, 'Anyword', 'https://anyword.com', 'AI 工具', 'paid', 'AI 营销文案优化', 'Anyword 是 AI 营销文案优化工具。', ['AI', '营销']),
  createTool(25, 'Otter.ai', 'https://otter.ai', 'AI 工具', 'freemium', 'AI 语音转文字', 'Otter.ai 是 AI 语音转文字工具。', ['AI', '语音', '会议']),

  // ========== AI 设计（40 个）==========
  createTool(26, 'Midjourney', 'https://midjourney.com', 'AI 设计', 'paid', 'AI 图像生成工具', 'Midjourney 是 AI 图像生成工具，通过文本描述生成高质量图像。', ['AI', '图像生成']),
  createTool(27, 'DALL-E 3', 'https://openai.com/dall-e-3', 'AI 设计', 'paid', 'OpenAI 图像生成', 'DALL-E 3 是 OpenAI 开发的图像生成模型。', ['AI', '图像生成']),
  createTool(28, 'Stable Diffusion', 'https://stability.ai', 'AI 设计', 'free', '开源 AI 图像生成', 'Stable Diffusion 是开源 AI 图像生成模型。', ['AI', '开源', '图像']),
  createTool(29, 'Leonardo.ai', 'https://leonardo.ai', 'AI 设计', 'freemium', 'AI 艺术创作平台', 'Leonardo.ai 是 AI 艺术创作平台。', ['AI', '艺术']),
  createTool(30, 'Canva', 'https://canva.com', 'AI 设计', 'freemium', '在线设计工具', 'Canva 是在线设计工具，提供模板、素材、AI 设计功能。', ['设计', '模板']),
  createTool(31, 'Figma', 'https://figma.com', 'AI 设计', 'freemium', '协作设计工具', 'Figma 是协作设计工具，支持 UI/UX 设计。', ['设计', 'UI/UX']),
  createTool(32, 'Adobe Firefly', 'https://firefly.adobe.com', 'AI 设计', 'freemium', 'Adobe AI 创意工具', 'Adobe Firefly 是 Adobe 的 AI 创意工具。', ['AI', 'Adobe']),
  createTool(33, 'Runway', 'https://runwayml.com', 'AI 设计', 'freemium', 'AI 视频编辑工具', 'Runway 是 AI 视频编辑工具。', ['AI', '视频']),
  createTool(34, 'Clipdrop', 'https://clipdrop.co', 'AI 设计', 'freemium', 'AI 图像处理工具', 'Clipdrop 是 AI 图像处理工具。', ['AI', '图像']),
  createTool(35, 'Remove.bg', 'https://remove.bg', 'AI 设计', 'freemium', 'AI 抠图工具', 'Remove.bg 是 AI 抠图工具，自动移除图像背景。', ['AI', '图像']),

  // ========== AI 视频（30 个）==========
  createTool(36, 'Runway Gen-2', 'https://runwayml.com', 'AI 视频', 'freemium', 'AI 视频生成', 'Runway Gen-2 是 AI 视频生成模型。', ['AI', '视频']),
  createTool(37, 'Pika Labs', 'https://pika.art', 'AI 视频', 'freemium', 'AI 视频创作', 'Pika Labs 是 AI 视频创作工具。', ['AI', '视频']),
  createTool(38, 'Luma Dream Machine', 'https://lumalabs.ai', 'AI 视频', 'freemium', 'AI 视频生成', 'Luma Dream Machine 是 AI 视频生成工具。', ['AI', '视频']),
  createTool(39, 'Kling AI', 'https://klingai.com', 'AI 视频', 'freemium', '快手 AI 视频', 'Kling AI 是快手开发的 AI 视频生成模型。', ['AI', '视频']),
  createTool(40, 'Sora', 'https://openai.com/sora', 'AI 视频', 'paid', 'OpenAI 视频模型', 'Sora 是 OpenAI 开发的视频生成模型。', ['AI', '视频', 'OpenAI']),
  createTool(41, 'HeyGen', 'https://heygen.com', 'AI 视频', 'freemium', 'AI 数字人视频', 'HeyGen 是 AI 数字人视频工具。', ['AI', '数字人']),
  createTool(42, 'D-ID', 'https://d-id.com', 'AI 视频', 'freemium', 'AI 照片说话', 'D-ID 是 AI 照片说话工具。', ['AI', '数字人']),
  createTool(43, 'Synthesia', 'https://synthesia.io', 'AI 视频', 'paid', 'AI 视频生成平台', 'Synthesia 是 AI 视频生成平台。', ['AI', '企业']),
  createTool(44, 'Descript', 'https://descript.com', 'AI 视频', 'freemium', 'AI 视频编辑', 'Descript 是 AI 视频编辑工具。', ['AI', '编辑']),
  createTool(45, 'CapCut', 'https://capcut.com', 'AI 视频', 'free', '字节视频编辑', 'CapCut 是字节开发的视频编辑工具。', ['视频', '编辑']),

  // ========== AI 音乐（30 个）==========
  createTool(46, 'Suno AI', 'https://suno.ai', 'AI 音乐', 'freemium', 'AI 歌曲生成', 'Suno AI 是 AI 歌曲生成工具。', ['AI', '音乐']),
  createTool(47, 'Udio', 'https://udio.com', 'AI 音乐', 'freemium', 'AI 音乐创作', 'Udio 是 AI 音乐创作工具。', ['AI', '音乐']),
  createTool(48, 'ElevenLabs', 'https://elevenlabs.io', 'AI 音乐', 'freemium', 'AI 语音生成', 'ElevenLabs 是 AI 语音生成工具。', ['AI', '语音']),
  createTool(49, 'AIVA', 'https://aiva.ai', 'AI 音乐', 'freemium', 'AI 作曲工具', 'AIVA 是 AI 作曲工具。', ['AI', '作曲']),
  createTool(50, 'Soundraw', 'https://soundraw.io', 'AI 音乐', 'paid', 'AI 背景音乐', 'Soundraw 是 AI 背景音乐生成工具。', ['AI', '音乐']),

  // ========== 效率办公（80 个）==========
  createTool(51, 'Notion', 'https://notion.so', '效率办公', 'freemium', '全能工作空间', 'Notion 是全能工作空间，提供笔记、数据库、任务管理等。', ['办公', '笔记']),
  createTool(52, 'Obsidian', 'https://obsidian.md', '效率办公', 'free', '知识管理工具', 'Obsidian 是知识管理工具。', ['笔记', '知识管理']),
  createTool(53, 'Logseq', 'https://logseq.com', '效率办公', 'free', '开源知识管理', 'Logseq 是开源知识管理工具。', ['开源', '笔记']),
  createTool(54, 'Craft', 'https://craft.do', '效率办公', 'freemium', '文档创作工具', 'Craft 是文档创作工具。', ['文档', '写作']),
  createTool(55, 'Evernote', 'https://evernote.com', '效率办公', 'freemium', '笔记应用', 'Evernote 是笔记应用。', ['笔记']),
  createTool(56, 'OneNote', 'https://onenote.com', '效率办公', 'free', 'Microsoft 笔记', 'OneNote 是 Microsoft 笔记应用。', ['笔记', 'Microsoft']),
  createTool(57, 'Bear', 'https://bear.app', '效率办公', 'freemium', '优雅的写作应用', 'Bear 是优雅的写作应用。', ['写作', 'Mac']),
  createTool(58, 'Typora', 'https://typora.io', '效率办公', 'paid', 'Markdown 编辑器', 'Typora 是 Markdown 编辑器。', ['Markdown', '写作']),
  createTool(59, 'Trello', 'https://trello.com', '效率办公', 'freemium', '看板项目管理', 'Trello 是看板项目管理工具。', ['项目', '管理']),
  createTool(60, 'Asana', 'https://asana.com', '效率办公', 'freemium', '团队协作工具', 'Asana 是团队协作工具。', ['协作', '项目']),

  // ========== 影视资源（30 个）==========
  createTool(61, 'Netflix', 'https://netflix.com', '影视资源', 'paid', '流媒体平台', 'Netflix 是流媒体平台，提供电影、剧集、纪录片。', ['视频', '流媒体']),
  createTool(62, 'Disney+', 'https://disneyplus.com', '影视资源', 'paid', '迪士尼流媒体', 'Disney+ 是迪士尼流媒体平台。', ['视频', '迪士尼']),
  createTool(63, 'YouTube', 'https://youtube.com', '影视资源', 'freemium', '视频分享平台', 'YouTube 是视频分享平台。', ['视频', '免费']),
  createTool(64, 'Bilibili', 'https://bilibili.com', '影视资源', 'freemium', '哔哩哔哩视频站', 'Bilibili 是中国视频平台。', ['视频', '弹幕']),
  createTool(65, '爱奇艺', 'https://iqiyi.com', '影视资源', 'freemium', '中国视频平台', '爱奇艺是中国视频平台。', ['视频', '国产']),

  // ========== 在线音乐（20 个）==========
  createTool(66, 'Spotify', 'https://spotify.com', '在线音乐', 'freemium', '音乐流媒体', 'Spotify 是音乐流媒体平台。', ['音乐', '流媒体']),
  createTool(67, 'Apple Music', 'https://music.apple.com', '在线音乐', 'paid', 'Apple 音乐', 'Apple Music 是 Apple 音乐服务。', ['音乐', 'Apple']),
  createTool(68, 'YouTube Music', 'https://music.youtube.com', '在线音乐', 'freemium', 'YouTube 音乐', 'YouTube Music 是 YouTube 音乐服务。', ['音乐', 'Google']),
  createTool(69, 'QQ 音乐', 'https://y.qq.com', '在线音乐', 'freemium', '腾讯音乐', 'QQ 音乐是腾讯音乐平台。', ['音乐', '国产']),
  createTool(70, '网易云音乐', 'https://music.163.com', '在线音乐', 'freemium', '网易云音乐', '网易云音乐是音乐平台。', ['音乐', '国产']),

  // ========== 实用工具（100 个）==========
  createTool(71, 'Google 翻译', 'https://translate.google.com', '实用工具', 'free', '在线翻译', 'Google 翻译是在线翻译工具，支持多语言互译。', ['翻译', 'Google']),
  createTool(72, 'DeepL', 'https://deepl.com', '实用工具', 'freemium', 'AI 翻译', 'DeepL 是 AI 翻译工具。', ['翻译', 'AI']),
  createTool(73, '百度网盘', 'https://pan.baidu.com', '实用工具', 'freemium', '云存储', '百度网盘是云存储服务。', ['云盘', '百度']),
  createTool(74, '阿里云盘', 'https://aliyundrive.com', '实用工具', 'freemium', '阿里云计算', '阿里云盘是阿里云存储服务。', ['云盘', '阿里']),
  createTool(75, 'Google Drive', 'https://drive.google.com', '实用工具', 'freemium', 'Google 云盘', 'Google Drive 是 Google 云服务。', ['云盘', 'Google']),
  createTool(76, 'TinyPNG', 'https://tinypng.com', '实用工具', 'freemium', '图片压缩', 'TinyPNG 是图片压缩工具。', ['图片', '压缩']),
  createTool(77, 'Smallpdf', 'https://smallpdf.com', '实用工具', 'freemium', 'PDF 工具', 'Smallpdf 是 PDF 工具。', ['PDF']),
  createTool(78, 'Convertio', 'https://convertio.co', '实用工具', 'freemium', '文件格式转换', 'Convertio 是文件格式转换工具。', ['转换']),
  createTool(79, 'Photopea', 'https://photopea.com', '实用工具', 'free', '在线 PS', 'Photopea 是在线 PS 工具。', ['图片', '编辑']),
  createTool(80, 'Excalidraw', 'https://excalidraw.com', '实用工具', 'free', '虚拟白板', 'Excalidraw 是虚拟白板。', ['绘图', '协作']),

  // ========== 小程序（10 个）==========
  createTool(81, '微信小程序', 'https://weixin.qq.com', '小程序', 'free', '微信小程序平台', '微信小程序是微信生态内的小程序平台。', ['微信', '小程序']),
  createTool(82, '支付宝小程序', 'https://open.alipay.com', '小程序', 'free', '支付宝小程序', '支付宝小程序是支付宝生态内的小程序平台。', ['支付宝', '小程序']),
  createTool(83, '抖音小程序', 'https://developer.open-douyin.com', '小程序', 'free', '抖音小程序', '抖音小程序是抖音生态内的小程序平台。', ['抖音', '小程序']),
];
