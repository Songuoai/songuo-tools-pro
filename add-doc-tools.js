const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 新增文档/格式转换工具
const docTools = [
  // 实用工具分类 - 文档处理
  { name: 'Google Docs', url: 'https://docs.google.com', desc: '免费在线编辑 Word/Excel，支持导出 PDF', category: '实用工具', tags: ['文档编辑', '在线办公', 'Google'] },
  { name: 'Word to PDF Online', url: 'https://www.wordtopdf.com', desc: '免费 Word/PDF 互转，无需登录', category: '实用工具', tags: ['PDF', 'Word', '转换'] },
  { name: 'Aconvert', url: 'https://www.aconvert.com', desc: '万能格式转换，支持视频分割、音频合并、文档转换', category: '实用工具', tags: ['格式转换', '万能', '多功能'] },
]

async function addDocTools() {
  console.log('=== 添加文档/格式转换工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of docTools) {
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
      description: tool.desc + '。功能实用，无需登录即可使用基础功能。',
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
  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', (await supabase.from('categories').select('id').eq('name', '实用工具').single()).data.id)
  
  console.log(`\n实用工具分类总计：${count || 0}个工具`)
}

addDocTools().catch(console.error)
