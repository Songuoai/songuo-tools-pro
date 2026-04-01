const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// PDF 中的工具列表
const pdfTools = [
  'Music FX', 'AI Home Design', 'X-FUJN', '图咖 AI', 'ReaddyAI',
  'MeshyAI', 'TripoAI', 'NVIDIA', 'TryMusicAI', '音剪',
  'UBERDUCK', 'AI Mastering', 'Rap Generator', 'YouMusic.AI',
  'MusicStar.AI', 'Suno-Top', 'MusicHero.ai'
]

async function checkPdfTools() {
  console.log('=== 检查 PDF 工具分类 ===\n')
  
  const { data: allTools } = await supabase.from('tools').select('name, category_id')
  
  for (const toolName of pdfTools) {
    const tool = allTools.find(t => t.name === toolName)
    if (tool) {
      const { data: cat } = await supabase.from('categories').select('name').eq('id', tool.category_id).single()
      console.log(`✅ ${toolName}: ${cat?.name || '未知分类'}`)
    } else {
      console.log(`❌ ${toolName}: 未找到`)
    }
  }
}

checkPdfTools().catch(console.error)
