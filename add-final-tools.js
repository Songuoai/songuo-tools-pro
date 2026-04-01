const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 新增工具列表
const newTools = [
  // AI 音乐分类 - TTS 工具
  { name: '文本转语音', url: 'https://easyvoice.ioplus.tech/generate', desc: '免费在线文本转语音工具', category: 'AI 音乐', tags: ['TTS', '语音', '免费'] },
  { name: '马克配音', url: 'https://ttsmaker.cn', desc: '专业在线配音工具，多音色选择', category: 'AI 音乐', tags: ['配音', 'TTS', '多音色'] },
  
  // 实用工具分类 - 图片工具
  { name: '图片拼接', url: 'https://kejiweixun.com/tools/merge-images', desc: '在线图片拼接工具，支持长图拼接', category: '实用工具', tags: ['图片', '拼接', '在线'] },
  { name: '图改改', url: 'https://tugaigai.com', desc: '在线图片编辑工具，简单便捷', category: '实用工具', tags: ['图片编辑', '在线', '工具'] },
]

async function addNewTools() {
  console.log('=== 添加新增工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of newTools) {
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
      price_type: 'free',
      short_desc: tool.desc,
      description: tool.desc + '。功能实用，值得收藏。',
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
  const categories = ['AI 音乐', '实用工具']
  for (const catName of categories) {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', catName).single()
    if (cat) {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
      console.log(`${catName}: ${count || 0}个工具`)
    }
  }
}

addNewTools().catch(console.error)
