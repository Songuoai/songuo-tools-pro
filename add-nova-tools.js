const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 从 NOVATOOLS 精选的新工具
const novaTools = [
  // AI 对话/助手
  { name: 'Monica', url: 'https://www.novatools.cn/tools/monica-ai', desc: '集成 GPT-5、Claude 等尖端 AI 模型的全平台一站式 AI 助手', category: 'AI 工具', tags: ['AI 助手', '多模型', '全平台'] },
  { name: 'Z.ai', url: 'https://www.novatools.cn/tools/chat-z-ai', desc: '智谱 AI 基于 GLM 4.6 推出的智能对话与创作平台', category: 'AI 工具', tags: ['对话', '大模型', '智谱'] },
  
  // AI 设计/图像
  { name: '美图设计室', url: 'https://www.novatools.cn/tools/designkit', desc: '美图出品的 AI 智能设计神器，一键生成高质感商拍图', category: 'AI 设计', tags: ['设计', '商拍', '美图'] },
  { name: 'PicWish', url: 'https://www.novatools.cn/tools/picwish', desc: '多功能 AI 图像处理工具，支持抠图、去水印、图片放大与修复', category: 'AI 设计', tags: ['图像处理', '抠图', '修复'] },
  { name: 'LiblibAI', url: 'https://www.novatools.cn/tools/liblib-art', desc: '领先的 AI 创作社区，提供在线绘画、模型训练与原创模型资源共享', category: 'AI 设计', tags: ['AI 绘画', '模型', '社区'] },
  { name: 'SeaArt AI', url: 'https://www.novatools.cn/tools/seaart-ai', desc: '集合绘图、视频生成与模型训练的综合创作平台', category: 'AI 设计', tags: ['绘图', '视频', '综合'] },
  
  // AI 视频
  { name: '可灵 AI', url: 'https://www.novatools.cn/tools/klingai', desc: '快手大模型团队打造的 AI 视频与图像生成工具', category: 'AI 视频', tags: ['视频生成', '快手', '大模型'] },
  { name: 'AI STUDIOS', url: 'https://www.novatools.cn/tools/ai-studios', desc: '高质量数字人视频生成与多语言配音翻译', category: 'AI 视频', tags: ['数字人', '视频', '配音'] },
  { name: 'RunningHub', url: 'https://www.novatools.cn/tools/runninghub-ai', desc: '基于云端 ComfyUI 的高可用 AI 创作平台', category: 'AI 视频', tags: ['ComfyUI', '云端', '工作流'] },
  
  // AI 音乐/语音
  { name: 'Fish Audio', url: 'https://www.novatools.cn/tools/fish-audio', desc: '提供真实感极强的文本转语音和快速语音克隆功能', category: 'AI 音乐', tags: ['TTS', '语音克隆', '配音'] },
  { name: 'LOVO AI', url: 'https://www.novatools.cn/tools/lovo-ai', desc: '集文本转语音、声音克隆和视频编辑于一体的专业级 AI 语音平台', category: 'AI 音乐', tags: ['TTS', '语音', '视频'] },
  { name: 'Tunee', url: 'https://www.novatools.cn/tools/tunee-ai', desc: '用聊天的方式就能生成旋律、歌词与完整编曲', category: 'AI 音乐', tags: ['音乐生成', '聊天', '编曲'] },
  
  // 效率办公
  { name: 'Accio Work', url: 'https://www.novatools.cn/tools/accio', desc: '一站式 AI 商业 Agent 平台，依托阿里亿级产业数据', category: '效率办公', tags: ['商业', 'Agent', '阿里'] },
  
  // 实用工具
  { name: 'LogoAI', url: 'https://www.novatools.cn/tools/logoai', desc: 'AI 驱动的 Logo 设计与品牌视觉一体化平台', category: '实用工具', tags: ['Logo', '设计', '品牌'] },
]

async function addNovaTools() {
  console.log('=== 添加 NOVATOOLS 精选工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of novaTools) {
    // 获取分类 ID
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('name', tool.category)
      .single()
    
    if (!category) {
      console.log(`❌ 分类不存在：${tool.category}`)
      failed++
      continue
    }
    
    // 检查是否已存在
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('name', tool.name)
      .single()
    
    if (existing) {
      console.log(`⏭️  已存在：${tool.name}`)
      skipped++
      continue
    }
    
    // 生成 slug
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)
    
    // 添加工具
    const { error } = await supabase.from('tools').insert({
      name: tool.name,
      slug: slug,
      url: tool.url,
      category_id: category.id,
      price_type: 'freemium',
      short_desc: tool.desc,
      description: tool.desc + '。功能强大，值得尝试。',
      features: ['核心功能 1', '核心功能 2', '核心功能 3'],
      tags: tool.tags || [],
      status: 'published',
      logo_url: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
    })
    
    if (error) {
      console.log(`❌ 添加失败：${tool.name} - ${error.message}`)
      failed++
    } else {
      console.log(`✅ 添加成功：${tool.name} (${tool.category})`)
      added++
    }
  }
  
  console.log('\n=== 添加完成 ===')
  console.log(`✅ 成功：${added} 个`)
  console.log(`⏭️  跳过：${skipped} 个`)
  console.log(`❌ 失败：${failed} 个`)
  
  // 最终统计
  console.log('\n=== 最终统计 ===')
  const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true })
  console.log(`总工具数：${count || 0}个`)
}

addNovaTools().catch(console.error)
