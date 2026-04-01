const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixTags() {
  console.log('=== 批量修复标签 ===\n')
  
  // 获取所有工具
  const { data: tools } = await supabase.from('tools').select('id, name, category_id, tags')
  
  let updated = 0
  let skipped = 0
  
  for (const tool of tools) {
    // 如果已有标签，跳过
    if (tool.tags && tool.tags.length > 0) {
      skipped++
      continue
    }
    
    // 根据名称生成标签
    const tags = generateTags(tool.name)
    
    // 更新工具
    const { error } = await supabase
      .from('tools')
      .update({ tags })
      .eq('id', tool.id)
    
    if (error) {
      console.log(`❌ 更新失败：${tool.name}`)
    } else {
      updated++
      if (updated <= 10) {
        console.log(`✅ ${tool.name}: ${tags.join(', ')}`)
      }
    }
  }
  
  console.log(`\n=== 修复完成 ===`)
  console.log(`✅ 更新：${updated}个工具`)
  console.log(`⏭️  跳过：${skipped}个工具`)
}

function generateTags(name) {
  const tagMap = {
    'HD 茉莉': ['电影', '高清', '影视'],
    'iLovePDF': ['PDF', '转换', '办公'],
    'Claude': ['AI', '对话', '写作'],
    'Gemini': ['AI', 'Google', '对话'],
    'Evai 建筑大师': ['AI', '建筑设计', '室内设计'],
    'Notion': ['笔记', '办公', '协作'],
    'GitHub': ['编程', '代码', '开源'],
    'Figma': ['设计', 'UI', '协作'],
    'Canva': ['设计', '模板', '在线'],
    'Remove.bg': ['AI', '抠图', '图片处理'],
    'Photopea': ['PS', '图片编辑', '在线'],
    'TinyPNG': ['图片压缩', 'PNG', '工具'],
    'Mark 配音': ['配音', 'TTS', '语音'],
    '讯飞听见': ['语音转文字', 'TTS', '音频'],
  }
  
  // 查找匹配的标签
  for (const [key, tags] of Object.entries(tagMap)) {
    if (name.includes(key)) {
      return tags
    }
  }
  
  // 默认标签
  return ['工具', '在线', '实用']
}

fixTags().catch(console.error)
