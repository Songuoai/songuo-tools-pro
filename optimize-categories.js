const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function optimizeCategories() {
  console.log('=== 优化 PDF 工具分类 ===\n')
  
  // 获取分类 ID
  const { data: categories } = await supabase.from('categories').select('id, name')
  const aiToolsCat = categories.find(c => c.name === 'AI 工具')
  const aiDesignCat = categories.find(c => c.name === 'AI 设计')
  const aiMusicCat = categories.find(c => c.name === 'AI 音乐')
  const onlineMusicCat = categories.find(c => c.name === '在线音乐')
  
  // 需要调整的工具
  const updates = [
    // NVIDIA 从 AI 设计 改为 AI 工具
    { name: 'NVIDIA', from: aiDesignCat.id, to: aiToolsCat.id },
    
    // 音乐生成工具从在线音乐改为AI音乐（可选，保持在线音乐也合理）
    // 这里保持在线音乐分类，因为用户更容易找到
  ]
  
  let updated = 0
  for (const update of updates) {
    const { data: tool } = await supabase.from('tools').select('id, name').eq('name', update.name).eq('category_id', update.from).single()
    
    if (tool) {
      const { error } = await supabase.from('tools').update({ category_id: update.to }).eq('id', tool.id)
      if (error) {
        console.log(`❌ 更新失败：${tool.name}`)
      } else {
        console.log(`✅ ${tool.name}: AI 设计 → AI 工具`)
        updated++
      }
    }
  }
  
  console.log(`\n=== 优化完成：${updated}个工具 ===`)
  
  // 最终统计
  console.log('\n=== 最终分类统计 ===')
  for (const cat of categories) {
    const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
    console.log(`${cat.name}: ${count || 0}个工具`)
  }
}

optimizeCategories().catch(console.error)
