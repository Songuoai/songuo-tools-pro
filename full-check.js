const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fullCheck() {
  console.log('=== 松果工具箱 - 全面检查报告 ===\n')
  
  // 1. 检查分类和工具分布
  console.log('[1/5] 检查分类和工具分布...')
  const { data: categories } = await supabase.from('categories').select('id, name, slug')
  
  const categoryStats = {}
  for (const cat of categories) {
    const { data: tools } = await supabase.from('tools').select('id, name, url, category_id').eq('category_id', cat.id)
    categoryStats[cat.id] = tools.length
    console.log(`  ✅ ${cat.name}: ${tools.length}个工具`)
  }
  
  // 2. 检查重复工具（按名称）
  console.log('\n[2/5] 检查重复工具...')
  const { data: allTools } = await supabase.from('tools').select('id, name, url, slug')
  const nameMap = {}
  const urlMap = {}
  let duplicateNames = 0
  let duplicateUrls = 0
  
  for (const tool of allTools) {
    // 检查名称重复
    if (nameMap[tool.name]) {
      console.log(`  ⚠️  重复名称：${tool.name} (ID: ${nameMap[tool.name]}, ${tool.id})`)
      duplicateNames++
    } else {
      nameMap[tool.name] = tool.id
    }
    
    // 检查 URL 重复
    if (urlMap[tool.url]) {
      console.log(`  ⚠️  重复 URL：${tool.url}`)
      duplicateUrls++
    } else {
      urlMap[tool.url] = tool.id
    }
  }
  
  if (duplicateNames === 0 && duplicateUrls === 0) {
    console.log('  ✅ 无重复工具名称和 URL')
  } else {
    console.log(`  ⚠️  发现 ${duplicateNames} 个重复名称，${duplicateUrls} 个重复 URL`)
  }
  
  // 3. 检查标签完整性
  console.log('\n[3/5] 检查标签完整性...')
  const toolsWithoutTags = allTools.filter(t => !t.tags || t.tags.length === 0)
  if (toolsWithoutTags.length > 0) {
    console.log(`  ⚠️  ${toolsWithoutTags.length} 个工具缺少标签`)
    toolsWithoutTags.slice(0, 5).forEach(t => console.log(`    - ${t.name}`))
  } else {
    console.log('  ✅ 所有工具都有标签')
  }
  
  // 4. 检查分类分配
  console.log('\n[4/5] 检查分类分配...')
  const uncategorizedTools = allTools.filter(t => !t.category_id)
  if (uncategorizedTools.length > 0) {
    console.log(`  ⚠️  ${uncategorizedTools.length} 个工具未分配分类`)
  } else {
    console.log('  ✅ 所有工具都已分配分类')
  }
  
  // 5. 统计总数
  console.log('\n[5/5] 数据统计...')
  console.log(`  总工具数：${allTools.length}个`)
  console.log(`  总分类数：${categories.length}个`)
  console.log(`  平均每个分类：${(allTools.length / categories.length).toFixed(1)}个工具`)
  
  // 6. 检查 slug 唯一性
  console.log('\n[6/5] 检查 Slug 唯一性...')
  const slugMap = {}
  let duplicateSlugs = 0
  for (const tool of allTools) {
    if (slugMap[tool.slug]) {
      console.log(`  ⚠️  重复 Slug：${tool.slug}`)
      duplicateSlugs++
    } else {
      slugMap[tool.slug] = tool.id
    }
  }
  if (duplicateSlugs === 0) {
    console.log('  ✅ 所有 Slug 唯一')
  }
  
  console.log('\n=== 检查完成 ===')
}

fullCheck().catch(console.error)
