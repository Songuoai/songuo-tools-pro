const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 第二批 PDF 工具
const batch2Tools = [
  'Brev AI', '文心快码', 'Tempo', 'Cursor', 'PaywallBuster',
  'RankAI', 'Evai 建筑大师', 'JoyPix', 'RemoveBGVideo',
  'BeautyPlus', 'CrePal', 'iMini AI'
]

async function checkBatch2() {
  console.log('=== 检查第二批 PDF 工具分类 ===\n')
  
  const { data: allTools } = await supabase.from('tools').select('name, category_id')
  
  for (const toolName of batch2Tools) {
    const tool = allTools.find(t => t.name === toolName)
    if (tool) {
      const { data: cat } = await supabase.from('categories').select('name').eq('id', tool.category_id).single()
      console.log(`✅ ${toolName}: ${cat?.name || '未知分类'}`)
    } else {
      console.log(`❌ ${toolName}: 未找到`)
    }
  }
}

checkBatch2().catch(console.error)
