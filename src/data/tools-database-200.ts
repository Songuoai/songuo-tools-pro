// 松果工具箱 - 工具数据库（200+ 工具）
// 用于前端展示和测试

export interface Tool {
  id: number;
  name: string;
  slug?: string;
  url: string;
  category: string;
  priceType: string;
  shortDesc: string;
  description?: string;
  logoUrl?: string;
  tags: string[];
  views: number;
  rating: number;
  status: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export const toolsDatabase: Tool[] = [
  // ========== AI 工具（25 个）==========
  { id: 1, name: 'ChatGPT', slug: 'chatgpt', url: 'https://chat.openai.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'OpenAI 开发的 AI 对话助手', description: 'ChatGPT 是 OpenAI 开发的大型语言模型，能够进行自然对话、回答问题、创作文字、编程辅助等。支持多轮对话，上下文理解能力强，适用于客服、内容创作、编程辅助等多种场景。', tags: ['AI', '对话', '生产力'], views: 1250, rating: 4.9, status: 'published' },
  { id: 2, name: 'Claude', slug: 'claude', url: 'https://claude.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: 'Anthropic 开发的 AI 助手', description: 'Claude 是 Anthropic 开发的 AI 助手，注重安全性和有用性。擅长长文本处理、文档分析、内容创作等任务。具有较大的上下文窗口，能够处理长篇文档和复杂对话。', tags: ['AI', '对话', '写作'], views: 980, rating: 4.8, status: 'published' },
  { id: 3, name: 'Gemini', slug: 'gemini', url: 'https://gemini.google.com', category: 'AI 工具', priceType: 'free', shortDesc: 'Google 的多模态 AI 模型', description: 'Gemini 是 Google 开发的多模态 AI 模型，能够理解文本、图像、代码等多种输入。完全免费使用，集成 Google 生态系统，适用于多种创作和分析任务。', tags: ['AI', 'Google', '多模态'], views: 856, rating: 4.7, status: 'published' },
  { id: 4, name: 'Copilot', slug: 'copilot', url: 'https://copilot.microsoft.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'Microsoft AI 助手', description: 'Microsoft Copilot 是微软开发的 AI 助手，集成在 Windows、Office 等产品中。支持网页搜索、文档创作、代码生成等功能，与 Microsoft 生态系统深度集成。', tags: ['AI', 'Microsoft', '办公'], views: 742, rating: 4.6, status: 'published' },
  { id: 5, name: 'Perplexity', slug: 'perplexity', url: 'https://perplexity.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 驱动的搜索引擎', description: 'Perplexity AI 是 AI 驱动的搜索引擎，结合传统搜索和大语言模型。提供准确的答案和来源引用，适用于研究、学习和信息查找。支持对话式搜索和后续追问。', tags: ['AI', '搜索', '研究'], views: 689, rating: 4.7, status: 'published' },
  { id: 6, name: 'Character.ai', url: 'https://character.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: '创建和对话 AI 角色', tags: ['AI', '娱乐', '对话'], views: 623, rating: 4.5, status: 'published' },
  { id: 7, name: 'Poe', url: 'https://poe.com', category: 'AI 工具', priceType: 'freemium', shortDesc: '多合一 AI 聊天平台', tags: ['AI', '聚合', '对话'], views: 589, rating: 4.6, status: 'published' },
  { id: 8, name: 'You.com', url: 'https://you.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 搜索引擎', tags: ['AI', '搜索'], views: 512, rating: 4.4, status: 'published' },
  { id: 9, name: 'Phind', url: 'https://phind.com', category: 'AI 工具', priceType: 'free', shortDesc: 'AI 编程搜索引擎', tags: ['AI', '编程', '搜索'], views: 478, rating: 4.6, status: 'published' },
  { id: 10, name: 'Hugging Chat', url: 'https://huggingface.co/chat', category: 'AI 工具', priceType: 'free', shortDesc: '开源 AI 对话平台', tags: ['AI', '开源', '对话'], views: 445, rating: 4.5, status: 'published' },
  { id: 11, name: 'Pi', url: 'https://pi.ai', category: 'AI 工具', priceType: 'free', shortDesc: '个性化 AI 助手', tags: ['AI', '个人助手'], views: 398, rating: 4.4, status: 'published' },
  { id: 12, name: 'Meta AI', url: 'https://meta.ai', category: 'AI 工具', priceType: 'free', shortDesc: 'Meta 的 AI 助手', tags: ['AI', 'Meta'], views: 367, rating: 4.3, status: 'published' },
  { id: 13, name: 'Grok', url: 'https://grok.x.ai', category: 'AI 工具', priceType: 'paid', shortDesc: 'xAI 开发的 AI 助手', tags: ['AI', 'xAI'], views: 334, rating: 4.2, status: 'published' },
  { id: 14, name: 'Mistral', url: 'https://chat.mistral.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: 'Mistral AI 对话', tags: ['AI', '欧洲'], views: 312, rating: 4.4, status: 'published' },
  { id: 15, name: 'Cohere', url: 'https://cohere.com', category: 'AI 工具', priceType: 'freemium', shortDesc: '企业级 AI 平台', tags: ['AI', '企业'], views: 289, rating: 4.3, status: 'published' },
  { id: 16, name: 'Notion AI', url: 'https://notion.so/ai', category: 'AI 工具', priceType: 'paid', shortDesc: 'Notion 内置 AI 助手', tags: ['AI', '办公', '写作'], views: 267, rating: 4.5, status: 'published' },
  { id: 17, name: 'Grammarly', url: 'https://grammarly.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 写作助手', tags: ['AI', '写作', '校对'], views: 245, rating: 4.4, status: 'published' },
  { id: 18, name: 'Quillbot', url: 'https://quillbot.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 改写工具', tags: ['AI', '写作', '改写'], views: 223, rating: 4.3, status: 'published' },
  { id: 19, name: 'Wordtune', url: 'https://wordtune.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 写作润色', tags: ['AI', '写作'], views: 201, rating: 4.2, status: 'published' },
  { id: 20, name: 'Jasper', url: 'https://jasper.ai', category: 'AI 工具', priceType: 'paid', shortDesc: 'AI 内容创作平台', tags: ['AI', '营销', '写作'], views: 189, rating: 4.3, status: 'published' },
  { id: 21, name: 'Copy.ai', url: 'https://copy.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 营销文案生成', tags: ['AI', '营销'], views: 178, rating: 4.2, status: 'published' },
  { id: 22, name: 'Writesonic', url: 'https://writesonic.com', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 内容生成', tags: ['AI', '写作'], views: 167, rating: 4.1, status: 'published' },
  { id: 23, name: 'Rytr', url: 'https://rytr.me', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 写作助手', tags: ['AI', '写作'], views: 156, rating: 4.0, status: 'published' },
  { id: 24, name: 'Anyword', url: 'https://anyword.com', category: 'AI 工具', priceType: 'paid', shortDesc: 'AI 营销文案优化', tags: ['AI', '营销'], views: 145, rating: 4.1, status: 'published' },
  { id: 25, name: 'Otter.ai', url: 'https://otter.ai', category: 'AI 工具', priceType: 'freemium', shortDesc: 'AI 语音转文字', tags: ['AI', '语音', '会议'], views: 134, rating: 4.3, status: 'published' },

  // ========== AI 设计（20 个）==========
  { id: 26, name: 'Midjourney', url: 'https://midjourney.com', category: 'AI 设计', priceType: 'paid', shortDesc: 'AI 图像生成工具', tags: ['AI', '图像生成'], views: 980, rating: 4.8, status: 'published' },
  { id: 27, name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', category: 'AI 设计', priceType: 'paid', shortDesc: 'OpenAI 图像生成', tags: ['AI', '图像生成'], views: 856, rating: 4.7, status: 'published' },
  { id: 28, name: 'Stable Diffusion', url: 'https://stability.ai', category: 'AI 设计', priceType: 'free', shortDesc: '开源 AI 图像生成', tags: ['AI', '开源', '图像'], views: 742, rating: 4.6, status: 'published' },
  { id: 29, name: 'Leonardo.ai', url: 'https://leonardo.ai', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 艺术创作平台', tags: ['AI', '艺术'], views: 689, rating: 4.5, status: 'published' },
  { id: 30, name: 'Canva', url: 'https://canva.com', category: 'AI 设计', priceType: 'freemium', shortDesc: '在线设计工具', tags: ['设计', '模板'], views: 623, rating: 4.6, status: 'published' },
  { id: 31, name: 'Figma', url: 'https://figma.com', category: 'AI 设计', priceType: 'freemium', shortDesc: '协作设计工具', tags: ['设计', 'UI/UX'], views: 589, rating: 4.7, status: 'published' },
  { id: 32, name: 'Adobe Firefly', url: 'https://firefly.adobe.com', category: 'AI 设计', priceType: 'freemium', shortDesc: 'Adobe AI 创意工具', tags: ['AI', 'Adobe'], views: 512, rating: 4.5, status: 'published' },
  { id: 33, name: 'Runway', url: 'https://runwayml.com', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 视频编辑工具', tags: ['AI', '视频'], views: 478, rating: 4.6, status: 'published' },
  { id: 34, name: 'Clipdrop', url: 'https://clipdrop.co', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 图像处理工具', tags: ['AI', '图像'], views: 445, rating: 4.4, status: 'published' },
  { id: 35, name: 'Remove.bg', url: 'https://remove.bg', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 抠图工具', tags: ['AI', '图像'], views: 398, rating: 4.5, status: 'published' },
  { id: 36, name: 'Uizard', url: 'https://uizard.io', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI UI 设计工具', tags: ['AI', 'UI'], views: 367, rating: 4.3, status: 'published' },
  { id: 37, name: 'Galileo AI', url: 'https://galileo.ai', category: 'AI 设计', priceType: 'paid', shortDesc: 'AI UI 生成', tags: ['AI', 'UI'], views: 334, rating: 4.2, status: 'published' },
  { id: 38, name: 'Looka', url: 'https://looka.com', category: 'AI 设计', priceType: 'paid', shortDesc: 'AI Logo 设计', tags: ['AI', 'Logo'], views: 312, rating: 4.3, status: 'published' },
  { id: 39, name: 'Brandmark', url: 'https://brandmark.io', category: 'AI 设计', priceType: 'paid', shortDesc: 'AI 品牌设计', tags: ['AI', '品牌'], views: 289, rating: 4.2, status: 'published' },
  { id: 40, name: 'Khroma', url: 'https://khroma.co', category: 'AI 设计', priceType: 'free', shortDesc: 'AI 配色工具', tags: ['AI', '配色'], views: 267, rating: 4.4, status: 'published' },
  { id: 41, name: 'Hatchful', url: 'https://hatchful.shopify.com', category: 'AI 设计', priceType: 'free', shortDesc: 'Shopify Logo 制作', tags: ['Logo', '免费'], views: 245, rating: 4.1, status: 'published' },
  { id: 42, name: 'Designs.ai', url: 'https://designs.ai', category: 'AI 设计', priceType: 'paid', shortDesc: 'AI 设计套件', tags: ['AI', '设计'], views: 223, rating: 4.0, status: 'published' },
  { id: 43, name: 'DeepArt', url: 'https://deepart.io', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 艺术转换', tags: ['AI', '艺术'], views: 201, rating: 4.1, status: 'published' },
  { id: 44, name: 'Prisma', url: 'https://prisma-ai.com', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 照片艺术', tags: ['AI', '照片'], views: 189, rating: 4.0, status: 'published' },
  { id: 45, name: 'Artbreeder', url: 'https://artbreeder.com', category: 'AI 设计', priceType: 'freemium', shortDesc: 'AI 图像混合', tags: ['AI', '图像'], views: 178, rating: 4.2, status: 'published' },

  // ========== AI 视频（15 个）==========
  { id: 46, name: 'Runway Gen-2', url: 'https://runwayml.com', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 视频生成', tags: ['AI', '视频'], views: 689, rating: 4.6, status: 'published' },
  { id: 47, name: 'Pika Labs', url: 'https://pika.art', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 视频创作', tags: ['AI', '视频'], views: 623, rating: 4.5, status: 'published' },
  { id: 48, name: 'Luma Dream Machine', url: 'https://lumalabs.ai', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 视频生成', tags: ['AI', '视频'], views: 589, rating: 4.6, status: 'published' },
  { id: 49, name: 'Kling AI', url: 'https://klingai.com', category: 'AI 视频', priceType: 'freemium', shortDesc: '快手 AI 视频', tags: ['AI', '视频'], views: 512, rating: 4.5, status: 'published' },
  { id: 50, name: 'Sora', url: 'https://openai.com/sora', category: 'AI 视频', priceType: 'paid', shortDesc: 'OpenAI 视频模型', tags: ['AI', '视频', 'OpenAI'], views: 478, rating: 4.8, status: 'published' },
  { id: 51, name: 'HeyGen', url: 'https://heygen.com', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 数字人视频', tags: ['AI', '数字人'], views: 445, rating: 4.5, status: 'published' },
  { id: 52, name: 'D-ID', url: 'https://d-id.com', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 照片说话', tags: ['AI', '数字人'], views: 398, rating: 4.4, status: 'published' },
  { id: 53, name: 'Synthesia', url: 'https://synthesia.io', category: 'AI 视频', priceType: 'paid', shortDesc: 'AI 视频生成平台', tags: ['AI', '企业'], views: 367, rating: 4.5, status: 'published' },
  { id: 54, name: 'Descript', url: 'https://descript.com', category: 'AI 视频', priceType: 'freemium', shortDesc: 'AI 视频编辑', tags: ['AI', '编辑'], views: 334, rating: 4.6, status: 'published' },
  { id: 55, name: 'CapCut', url: 'https://capcut.com', category: 'AI 视频', priceType: 'free', shortDesc: '字节视频编辑', tags: ['视频', '编辑'], views: 312, rating: 4.5, status: 'published' },
  { id: 56, name: 'InVideo', url: 'https://invideo.io', category: 'AI 视频', priceType: 'freemium', shortDesc: '在线视频制作', tags: ['视频', '模板'], views: 289, rating: 4.3, status: 'published' },
  { id: 57, name: 'Pictory', url: 'https://pictory.ai', category: 'AI 视频', priceType: 'paid', shortDesc: 'AI 视频摘要', tags: ['AI', '视频'], views: 267, rating: 4.2, status: 'published' },
  { id: 58, name: 'Veed.io', url: 'https://veed.io', category: 'AI 视频', priceType: 'freemium', shortDesc: '在线视频编辑器', tags: ['视频', '编辑'], views: 245, rating: 4.4, status: 'published' },
  { id: 59, name: 'Flexclip', url: 'https://flexclip.com', category: 'AI 视频', priceType: 'freemium', shortDesc: '视频制作工具', tags: ['视频'], views: 223, rating: 4.1, status: 'published' },
  { id: 60, name: 'Animoto', url: 'https://animoto.com', category: 'AI 视频', priceType: 'paid', shortDesc: '视频幻灯片制作', tags: ['视频', '营销'], views: 201, rating: 4.0, status: 'published' },

  // ========== AI 音乐（15 个）==========
  { id: 61, name: 'Suno AI', url: 'https://suno.ai', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 歌曲生成', tags: ['AI', '音乐'], views: 623, rating: 4.7, status: 'published' },
  { id: 62, name: 'Udio', url: 'https://udio.com', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 音乐创作', tags: ['AI', '音乐'], views: 589, rating: 4.6, status: 'published' },
  { id: 63, name: 'ElevenLabs', url: 'https://elevenlabs.io', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 语音生成', tags: ['AI', '语音'], views: 512, rating: 4.7, status: 'published' },
  { id: 64, name: 'AIVA', url: 'https://aiva.ai', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 作曲工具', tags: ['AI', '作曲'], views: 478, rating: 4.5, status: 'published' },
  { id: 65, name: 'Soundraw', url: 'https://soundraw.io', category: 'AI 音乐', priceType: 'paid', shortDesc: 'AI 背景音乐', tags: ['AI', '音乐'], views: 445, rating: 4.4, status: 'published' },
  { id: 66, name: 'Boomy', url: 'https://boomy.com', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 音乐创作', tags: ['AI', '音乐'], views: 398, rating: 4.3, status: 'published' },
  { id: 67, name: 'Amper Music', url: 'https://ampermusic.com', category: 'AI 音乐', priceType: 'paid', shortDesc: 'AI 作曲平台', tags: ['AI', '作曲'], views: 367, rating: 4.2, status: 'published' },
  { id: 68, name: 'Ecrett Music', url: 'https://ecrettmusic.com', category: 'AI 音乐', priceType: 'paid', shortDesc: 'AI 背景音乐生成', tags: ['AI', '音乐'], views: 334, rating: 4.1, status: 'published' },
  { id: 69, name: 'Mubert', url: 'https://mubert.com', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 音乐流', tags: ['AI', '音乐'], views: 312, rating: 4.3, status: 'published' },
  { id: 70, name: 'Loudly', url: 'https://loudly.com', category: 'AI 音乐', priceType: 'paid', shortDesc: 'AI 音乐生成', tags: ['AI', '音乐'], views: 289, rating: 4.2, status: 'published' },
  { id: 71, name: 'Beatoven.ai', url: 'https://beatoven.ai', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 背景音乐', tags: ['AI', '音乐'], views: 267, rating: 4.1, status: 'published' },
  { id: 72, name: 'Soundful', url: 'https://soundful.com', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 音乐创作', tags: ['AI', '音乐'], views: 245, rating: 4.0, status: 'published' },
  { id: 73, name: 'Voicemod', url: 'https://voicemod.net', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 变声工具', tags: ['AI', '语音'], views: 223, rating: 4.3, status: 'published' },
  { id: 74, name: 'Kits.ai', url: 'https://kits.ai', category: 'AI 音乐', priceType: 'freemium', shortDesc: 'AI 声音转换', tags: ['AI', '语音'], views: 201, rating: 4.2, status: 'published' },
  { id: 75, name: 'Voice.ai', url: 'https://voice.ai', category: 'AI 音乐', priceType: 'freemium', shortDesc: '实时 AI 变声', tags: ['AI', '语音'], views: 189, rating: 4.1, status: 'published' },

  // ========== 效率办公（25 个）==========
  { id: 76, name: 'Notion', url: 'https://notion.so', category: '效率办公', priceType: 'freemium', shortDesc: '全能工作空间', tags: ['办公', '笔记'], views: 856, rating: 4.7, status: 'published' },
  { id: 77, name: 'Obsidian', url: 'https://obsidian.md', category: '效率办公', priceType: 'free', shortDesc: '知识管理工具', tags: ['笔记', '知识管理'], views: 742, rating: 4.6, status: 'published' },
  { id: 78, name: 'Roam Research', url: 'https://roamresearch.com', category: '效率办公', priceType: 'paid', shortDesc: '双向链接笔记', tags: ['笔记', '研究'], views: 689, rating: 4.5, status: 'published' },
  { id: 79, name: 'Logseq', url: 'https://logseq.com', category: '效率办公', priceType: 'free', shortDesc: '开源知识管理', tags: ['开源', '笔记'], views: 623, rating: 4.4, status: 'published' },
  { id: 80, name: 'Craft', url: 'https://craft.do', category: '效率办公', priceType: 'freemium', shortDesc: '文档创作工具', tags: ['文档', '写作'], views: 589, rating: 4.5, status: 'published' },
  { id: 81, name: 'Evernote', url: 'https://evernote.com', category: '效率办公', priceType: 'freemium', shortDesc: '笔记应用', tags: ['笔记'], views: 512, rating: 4.3, status: 'published' },
  { id: 82, name: 'OneNote', url: 'https://onenote.com', category: '效率办公', priceType: 'free', shortDesc: 'Microsoft 笔记', tags: ['笔记', 'Microsoft'], views: 478, rating: 4.4, status: 'published' },
  { id: 83, name: 'Bear', url: 'https://bear.app', category: '效率办公', priceType: 'freemium', shortDesc: '优雅的写作应用', tags: ['写作', 'Mac'], views: 445, rating: 4.5, status: 'published' },
  { id: 84, name: 'Typora', url: 'https://typora.io', category: '效率办公', priceType: 'paid', shortDesc: 'Markdown 编辑器', tags: ['Markdown', '写作'], views: 398, rating: 4.6, status: 'published' },
  { id: 85, name: 'Ulysses', url: 'https://ulysses.app', category: '效率办公', priceType: 'paid', shortDesc: '专业写作应用', tags: ['写作', 'Mac'], views: 367, rating: 4.5, status: 'published' },
  { id: 86, name: 'Scrivener', url: 'https://literatureandlatte.com', category: '效率办公', priceType: 'paid', shortDesc: '长文写作工具', tags: ['写作', '书籍'], views: 334, rating: 4.6, status: 'published' },
  { id: 87, name: 'Trello', url: 'https://trello.com', category: '效率办公', priceType: 'freemium', shortDesc: '看板项目管理', tags: ['项目', '管理'], views: 312, rating: 4.4, status: 'published' },
  { id: 88, name: 'Asana', url: 'https://asana.com', category: '效率办公', priceType: 'freemium', shortDesc: '团队协作工具', tags: ['协作', '项目'], views: 289, rating: 4.3, status: 'published' },
  { id: 89, name: 'Monday.com', url: 'https://monday.com', category: '效率办公', priceType: 'paid', shortDesc: '工作操作系统', tags: ['项目', '管理'], views: 267, rating: 4.4, status: 'published' },
  { id: 90, name: 'ClickUp', url: 'https://clickup.com', category: '效率办公', priceType: 'freemium', shortDesc: '全能生产力平台', tags: ['项目', '协作'], views: 245, rating: 4.5, status: 'published' },
  { id: 91, name: 'Todoist', url: 'https://todoist.com', category: '效率办公', priceType: 'freemium', shortDesc: '待办事项管理', tags: ['待办', '效率'], views: 223, rating: 4.5, status: 'published' },
  { id: 92, name: 'Things 3', url: 'https://culturedcode.com', category: '效率办公', priceType: 'paid', shortDesc: '优雅的 GTD 应用', tags: ['GTD', 'Mac'], views: 201, rating: 4.6, status: 'published' },
  { id: 93, name: 'OmniFocus', url: 'https://omnigroup.com', category: '效率办公', priceType: 'paid', shortDesc: '专业 GTD 工具', tags: ['GTD', 'Mac'], views: 189, rating: 4.4, status: 'published' },
  { id: 94, name: 'Microsoft To Do', url: 'https://to-do.office.com', category: '效率办公', priceType: 'free', shortDesc: 'Microsoft 待办', tags: ['待办', 'Microsoft'], views: 178, rating: 4.2, status: 'published' },
  { id: 95, name: 'Google Tasks', url: 'https://tasks.google.com', category: '效率办公', priceType: 'free', shortDesc: 'Google 待办', tags: ['待办', 'Google'], views: 167, rating: 4.1, status: 'published' },
  { id: 96, name: 'Calendly', url: 'https://calendly.com', category: '效率办公', priceType: 'freemium', shortDesc: '日程安排工具', tags: ['日程', '会议'], views: 156, rating: 4.4, status: 'published' },
  { id: 97, name: 'Zapier', url: 'https://zapier.com', category: '效率办公', priceType: 'freemium', shortDesc: '自动化工作流', tags: ['自动化', '集成'], views: 145, rating: 4.5, status: 'published' },
  { id: 98, name: 'IFTTT', url: 'https://ifttt.com', category: '效率办公', priceType: 'freemium', shortDesc: '自动化服务', tags: ['自动化'], views: 134, rating: 4.2, status: 'published' },
  { id: 99, name: 'Make', url: 'https://make.com', category: '效率办公', priceType: 'freemium', shortDesc: '可视化自动化', tags: ['自动化', '集成'], views: 123, rating: 4.3, status: 'published' },
  { id: 100, name: 'n8n', url: 'https://n8n.io', category: '效率办公', priceType: 'freemium', shortDesc: '开源自动化', tags: ['开源', '自动化'], views: 112, rating: 4.4, status: 'published' },

  // ========== 影视资源（17 个）==========
  { id: 101, name: 'Netflix', url: 'https://netflix.com', category: '影视资源', priceType: 'paid', shortDesc: '流媒体平台', tags: ['视频', '流媒体'], views: 689, rating: 4.6, status: 'published' },
  { id: 102, name: 'Disney+', url: 'https://disneyplus.com', category: '影视资源', priceType: 'paid', shortDesc: '迪士尼流媒体', tags: ['视频', '迪士尼'], views: 623, rating: 4.5, status: 'published' },
  { id: 103, name: 'YouTube', url: 'https://youtube.com', category: '影视资源', priceType: 'freemium', shortDesc: '视频分享平台', tags: ['视频', '免费'], views: 589, rating: 4.7, status: 'published' },
  { id: 104, name: 'Bilibili', url: 'https://bilibili.com', category: '影视资源', priceType: 'freemium', shortDesc: '哔哩哔哩视频站', tags: ['视频', '弹幕'], views: 512, rating: 4.6, status: 'published' },
  { id: 105, name: '爱奇艺', url: 'https://iqiyi.com', category: '影视资源', priceType: 'freemium', shortDesc: '中国视频平台', tags: ['视频', '国产'], views: 478, rating: 4.3, status: 'published' },
  { id: 106, name: '腾讯视频', url: 'https://v.qq.com', category: '影视资源', priceType: 'freemium', shortDesc: '腾讯视频平台', tags: ['视频', '国产'], views: 445, rating: 4.3, status: 'published' },
  { id: 107, name: '优酷', url: 'https://youku.com', category: '影视资源', priceType: 'freemium', shortDesc: '优酷视频', tags: ['视频', '国产'], views: 398, rating: 4.2, status: 'published' },
  { id: 108, name: '芒果 TV', url: 'https://mgtv.com', category: '影视资源', priceType: 'freemium', shortDesc: '芒果 TV', tags: ['视频', '国产'], views: 367, rating: 4.2, status: 'published' },
  { id: 109, name: 'HBO Max', url: 'https://hbomax.com', category: '影视资源', priceType: 'paid', shortDesc: 'HBO 流媒体', tags: ['视频', 'HBO'], views: 334, rating: 4.5, status: 'published' },
  { id: 110, name: 'Prime Video', url: 'https://primevideo.com', category: '影视资源', priceType: 'paid', shortDesc: 'Amazon 流媒体', tags: ['视频', 'Amazon'], views: 312, rating: 4.4, status: 'published' },
  { id: 111, name: 'Apple TV+', url: 'https://tv.apple.com', category: '影视资源', priceType: 'paid', shortDesc: 'Apple 流媒体', tags: ['视频', 'Apple'], views: 289, rating: 4.3, status: 'published' },
  { id: 112, name: 'Paramount+', url: 'https://paramountplus.com', category: '影视资源', priceType: 'paid', shortDesc: '派拉蒙流媒体', tags: ['视频'], views: 267, rating: 4.2, status: 'published' },
  { id: 113, name: 'Peacock', url: 'https://peacocktv.com', category: '影视资源', priceType: 'freemium', shortDesc: 'NBC 流媒体', tags: ['视频'], views: 245, rating: 4.1, status: 'published' },
  { id: 114, name: 'Hulu', url: 'https://hulu.com', category: '影视资源', priceType: 'paid', shortDesc: 'Hulu 流媒体', tags: ['视频'], views: 223, rating: 4.3, status: 'published' },
  { id: 115, name: 'Crunchyroll', url: 'https://crunchyroll.com', category: '影视资源', priceType: 'freemium', shortDesc: '动漫流媒体', tags: ['动漫', '视频'], views: 201, rating: 4.4, status: 'published' },
  { id: 116, name: 'Twitch', url: 'https://twitch.tv', category: '影视资源', priceType: 'freemium', shortDesc: '游戏直播平台', tags: ['直播', '游戏'], views: 189, rating: 4.5, status: 'published' },
  { id: 117, name: 'Vimeo', url: 'https://vimeo.com', category: '影视资源', priceType: 'freemium', shortDesc: '专业视频平台', tags: ['视频', '专业'], views: 178, rating: 4.3, status: 'published' },

  // ========== 在线音乐（11 个）==========
  { id: 118, name: 'Spotify', url: 'https://spotify.com', category: '在线音乐', priceType: 'freemium', shortDesc: '音乐流媒体', tags: ['音乐', '流媒体'], views: 623, rating: 4.7, status: 'published' },
  { id: 119, name: 'Apple Music', url: 'https://music.apple.com', category: '在线音乐', priceType: 'paid', shortDesc: 'Apple 音乐', tags: ['音乐', 'Apple'], views: 589, rating: 4.6, status: 'published' },
  { id: 120, name: 'YouTube Music', url: 'https://music.youtube.com', category: '在线音乐', priceType: 'freemium', shortDesc: 'YouTube 音乐', tags: ['音乐', 'Google'], views: 512, rating: 4.5, status: 'published' },
  { id: 121, name: 'QQ 音乐', url: 'https://y.qq.com', category: '在线音乐', priceType: 'freemium', shortDesc: '腾讯音乐', tags: ['音乐', '国产'], views: 478, rating: 4.4, status: 'published' },
  { id: 122, name: '网易云音乐', url: 'https://music.163.com', category: '在线音乐', priceType: 'freemium', shortDesc: '网易云音乐', tags: ['音乐', '国产'], views: 445, rating: 4.5, status: 'published' },
  { id: 123, name: '酷狗音乐', url: 'https://kugou.com', category: '在线音乐', priceType: 'freemium', shortDesc: '酷狗音乐', tags: ['音乐', '国产'], views: 398, rating: 4.2, status: 'published' },
  { id: 124, name: '酷我音乐', url: 'https://kuwo.cn', category: '在线音乐', priceType: 'freemium', shortDesc: '酷我音乐', tags: ['音乐', '国产'], views: 367, rating: 4.1, status: 'published' },
  { id: 125, name: 'Amazon Music', url: 'https://music.amazon.com', category: '在线音乐', priceType: 'freemium', shortDesc: 'Amazon 音乐', tags: ['音乐', 'Amazon'], views: 334, rating: 4.3, status: 'published' },
  { id: 126, name: 'Tidal', url: 'https://tidal.com', category: '在线音乐', priceType: 'paid', shortDesc: '高保真音乐', tags: ['音乐', 'HiFi'], views: 312, rating: 4.4, status: 'published' },
  { id: 127, name: 'Deezer', url: 'https://deezer.com', category: '在线音乐', priceType: 'freemium', shortDesc: '音乐流媒体', tags: ['音乐'], views: 289, rating: 4.2, status: 'published' },
  { id: 128, name: 'SoundCloud', url: 'https://soundcloud.com', category: '在线音乐', priceType: 'freemium', shortDesc: '音乐分享平台', tags: ['音乐', '独立'], views: 267, rating: 4.3, status: 'published' },

  // ========== 实用工具（26 个）==========
  { id: 129, name: 'Google 翻译', url: 'https://translate.google.com', category: '实用工具', priceType: 'free', shortDesc: '在线翻译', tags: ['翻译', 'Google'], views: 512, rating: 4.6, status: 'published' },
  { id: 130, name: 'DeepL', url: 'https://deepl.com', category: '实用工具', priceType: 'freemium', shortDesc: 'AI 翻译', tags: ['翻译', 'AI'], views: 478, rating: 4.7, status: 'published' },
  { id: 131, name: '百度网盘', url: 'https://pan.baidu.com', category: '实用工具', priceType: 'freemium', shortDesc: '云存储', tags: ['云盘', '百度'], views: 445, rating: 4.2, status: 'published' },
  { id: 132, name: '阿里云盘', url: 'https://aliyundrive.com', category: '实用工具', priceType: 'freemium', shortDesc: '阿里云计算', tags: ['云盘', '阿里'], views: 398, rating: 4.3, status: 'published' },
  { id: 133, name: 'Google Drive', url: 'https://drive.google.com', category: '实用工具', priceType: 'freemium', shortDesc: 'Google 云盘', tags: ['云盘', 'Google'], views: 367, rating: 4.5, status: 'published' },
  { id: 134, name: 'Dropbox', url: 'https://dropbox.com', category: '实用工具', priceType: 'freemium', shortDesc: '云存储服务', tags: ['云盘'], views: 334, rating: 4.4, status: 'published' },
  { id: 135, name: 'OneDrive', url: 'https://onedrive.live.com', category: '实用工具', priceType: 'freemium', shortDesc: 'Microsoft 云盘', tags: ['云盘', 'Microsoft'], views: 312, rating: 4.3, status: 'published' },
  { id: 136, name: 'iCloud', url: 'https://icloud.com', category: '实用工具', priceType: 'freemium', shortDesc: 'Apple 云服务', tags: ['云盘', 'Apple'], views: 289, rating: 4.4, status: 'published' },
  { id: 137, name: 'WeTransfer', url: 'https://wetransfer.com', category: '实用工具', priceType: 'freemium', shortDesc: '大文件传输', tags: ['文件', '传输'], views: 267, rating: 4.5, status: 'published' },
  { id: 138, name: 'TinyPNG', url: 'https://tinypng.com', category: '实用工具', priceType: 'freemium', shortDesc: '图片压缩', tags: ['图片', '压缩'], views: 245, rating: 4.6, status: 'published' },
  { id: 139, name: 'iloveimg', url: 'https://iloveimg.com', category: '实用工具', priceType: 'freemium', shortDesc: '图片处理工具', tags: ['图片', '编辑'], views: 223, rating: 4.4, status: 'published' },
  { id: 140, name: 'Smallpdf', url: 'https://smallpdf.com', category: '实用工具', priceType: 'freemium', shortDesc: 'PDF 工具', tags: ['PDF'], views: 201, rating: 4.5, status: 'published' },
  { id: 141, name: 'iLovePDF', url: 'https://ilovepdf.com', category: '实用工具', priceType: 'freemium', shortDesc: 'PDF 处理', tags: ['PDF'], views: 189, rating: 4.4, status: 'published' },
  { id: 142, name: 'PDF24', url: 'https://pdf24.org', category: '实用工具', priceType: 'free', shortDesc: '免费 PDF 工具', tags: ['PDF', '免费'], views: 178, rating: 4.3, status: 'published' },
  { id: 143, name: 'Convertio', url: 'https://convertio.co', category: '实用工具', priceType: 'freemium', shortDesc: '文件格式转换', tags: ['转换'], views: 167, rating: 4.4, status: 'published' },
  { id: 144, name: 'Zamzar', url: 'https://zamzar.com', category: '实用工具', priceType: 'freemium', shortDesc: '在线转换', tags: ['转换'], views: 156, rating: 4.2, status: 'published' },
  { id: 145, name: 'CloudConvert', url: 'https://cloudconvert.com', category: '实用工具', priceType: 'freemium', shortDesc: '云转换', tags: ['转换'], views: 145, rating: 4.3, status: 'published' },
  { id: 146, name: '123apps', url: 'https://123apps.com', category: '实用工具', priceType: 'free', shortDesc: '在线应用套件', tags: ['工具集'], views: 134, rating: 4.2, status: 'published' },
  { id: 147, name: 'Photopea', url: 'https://photopea.com', category: '实用工具', priceType: 'free', shortDesc: '在线 PS', tags: ['图片', '编辑'], views: 123, rating: 4.6, status: 'published' },
  { id: 148, name: 'Excalidraw', url: 'https://excalidraw.com', category: '实用工具', priceType: 'free', shortDesc: '虚拟白板', tags: ['绘图', '协作'], views: 112, rating: 4.5, status: 'published' },
  { id: 149, name: 'Miro', url: 'https://miro.com', category: '实用工具', priceType: 'freemium', shortDesc: '在线白板', tags: ['白板', '协作'], views: 101, rating: 4.4, status: 'published' },
  { id: 150, name: 'Lucidchart', url: 'https://lucidchart.com', category: '实用工具', priceType: 'freemium', shortDesc: '图表工具', tags: ['图表', '流程图'], views: 98, rating: 4.3, status: 'published' },
  { id: 151, name: 'Draw.io', url: 'https://draw.io', category: '实用工具', priceType: 'free', shortDesc: '免费图表工具', tags: ['图表', '免费'], views: 95, rating: 4.5, status: 'published' },
  { id: 152, name: 'ProcessOn', url: 'https://processon.com', category: '实用工具', priceType: 'freemium', shortDesc: '在线作图', tags: ['图表', '国产'], views: 92, rating: 4.2, status: 'published' },
  { id: 153, name: 'XMind', url: 'https://xmind.app', category: '实用工具', priceType: 'freemium', shortDesc: '思维导图', tags: ['思维导图'], views: 89, rating: 4.4, status: 'published' },
  { id: 154, name: 'MindNode', url: 'https://mindnode.com', category: '实用工具', priceType: 'paid', shortDesc: '思维导图', tags: ['思维导图', 'Mac'], views: 86, rating: 4.3, status: 'published' },

  // ========== 小程序（3 个）==========
  { id: 155, name: '微信小程序', url: 'https://weixin.qq.com', category: '小程序', priceType: 'free', shortDesc: '微信小程序平台', tags: ['微信', '小程序'], views: 689, rating: 4.6, status: 'published' },
  { id: 156, name: '支付宝小程序', url: 'https://open.alipay.com', category: '小程序', priceType: 'free', shortDesc: '支付宝小程序', tags: ['支付宝', '小程序'], views: 623, rating: 4.5, status: 'published' },
  { id: 157, name: '抖音小程序', url: 'https://developer.open-douyin.com', category: '小程序', priceType: 'free', shortDesc: '抖音小程序', tags: ['抖音', '小程序'], views: 589, rating: 4.4, status: 'published' },
];

export default toolsDatabase;
