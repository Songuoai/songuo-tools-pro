const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fullStats() {
  console.log('=== 完整统计 ===\n')
  
  // 1. 检查所有分类
  const { data: categories } = await supabase.from('categories').select('id, name, slug')
  console.log('数据库分类数:', categories.length)
  console.log('\n分类列表:')
  for (const cat of categories) {
    const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
    console.log(`  ${cat.name}: ${count || 0}个工具`)
  }
  
  // 2. 检查 NOVATOOLS 相关工具
  const novaKeywords = ['novatools', 'nova']
  const { data: allTools } = await supabase.from('tools').select('name, url, category_id')
  const novaTools = allTools.filter(t => 
    novaKeywords.some(k => t.url.toLowerCase().includes(k))
  )
  console.log('\nNOVATOOLS 来源工具:', novaTools.length)
  novaTools.forEach(t => console.log(`  - ${t.name}`))
  
  // 3. 总工具数
  const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true })
  console.log('\n总工具数:', count)
}

fullStats().catch(console.error)
