const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 效率办公分类工具
const productivityTools = [
  { name: 'TinyWow', url: 'https://tinywow.com', desc: '免费在线工具合集，PDF 转换、视频编辑等', tags: ['在线工具', '免费', '合集'] },
  { name: 'Miku Tools', url: 'https://tools.miku.ac', desc: '在线工具合集，提升工作效率', tags: ['效率', '工具合集'] },
  { name: 'LOGO Galleria', url: 'https://logogalleria.com/zh-CN', desc: '一键生成 LOGO 设计', tags: ['LOGO', '设计', 'AI'] },
  { name: 'Hey Watcher', url: 'https://heywatcher.com/zh', desc: 'YouTube 视频 AI 翻译工具，无需字幕轻松观看', tags: ['翻译', 'YouTube', 'AI'] },
  { name: 'FlowSpeech', url: 'https://flowspeech.io', desc: 'AI 语音合成工作室，捕捉文案情绪和节奏', tags: ['语音合成', 'TTS', 'AI'] },
  { name: '文赋 AI 论文', url: 'https://www.novatools.cn/tools/Wenfual', desc: '专为学术写作设计的 AI 助手，10 分钟生成万字论文', tags: ['论文', '写作', 'AI'] },
  { name: 'ChatGirafe', url: 'https://www.chatgiafe.a/zh', desc: 'AI 记账助手，通过聊天自动追踪开支', tags: ['记账', '财务', 'AI'] },
  { name: 'EvoMap', url: 'https://www.novatools.cn/tools/evomap-ai', desc: '打破 AI 孤岛，Agent 能力跨平台共享', tags: ['Agent', 'AI', '协作'] },
  { name: 'NOVATOOLS', url: 'https://www.novatools.cn', desc: '发现优质 AI 工具平台', tags: ['AI 工具', '导航', '发现'] },
]

async function addProductivityTools() {
  console.log('=== 添加效率办公分类工具 ===\n')
  
  // 获取效率办公分类 ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('name', '效率办公')
    .single()
  
  if (!category) {
    console.log('❌ 效率办公分类不存在')
    return
  }
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of productivityTools) {
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
      description: tool.desc + '。功能强大，提升工作效率。',
      features: ['核心功能 1', '核心功能 2', '核心功能 3'],
      tags: tool.tags || [],
      status: 'published',
      logo_url: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
    })
    
    if (error) {
      console.log(`❌ 添加失败：${tool.name} - ${error.message}`)
      failed++
    } else {
      console.log(`✅ 添加成功：${tool.name}`)
      added++
    }
  }
  
  console.log('\n=== 添加完成 ===')
  console.log(`✅ 成功：${added} 个`)
  console.log(`⏭️  跳过：${skipped} 个`)
  console.log(`❌ 失败：${failed} 个`)
  
  // 最终统计
  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', category.id)
  
  console.log(`\n效率办公分类总计：${count || 0}个工具`)
}

addProductivityTools().catch(console.error)
