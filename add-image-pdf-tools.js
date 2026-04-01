const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 新增图片/PDF 工具
const newTools = [
  // AI 设计分类 - 图片处理
  { name: 'Remove.bg', url: 'https://www.remove.bg', desc: '智能抠图，一键去除图片背景，免费下载低分辨率', category: 'AI 设计', tags: ['智能抠图', '证件照', '背景去除'] },
  { name: 'Photopea', url: 'https://www.photopea.com', desc: '完全免费的在线 Photoshop，可制作证件照、去水印', category: 'AI 设计', tags: ['在线 PS', '证件照', '图片编辑'] },
  { name: '证件照在线生成', url: 'https://id.photofunia.com', desc: '自动生成不同规格证件照，支持换底色', category: 'AI 设计', tags: ['证件照', '免登录', '在线'] },
  
  // 实用工具分类 - 图片/PDF 工具
  { name: 'TinyPNG', url: 'https://tinypng.com', desc: 'PNG/JPG 无损压缩，单次最多上传 20 张', category: '实用工具', tags: ['图片压缩', 'PNG', 'JPG'] },
  { name: '草料二维码', url: 'https://cli.im', desc: '免费生成网址、文本二维码', category: '实用工具', tags: ['二维码生成', '免费', '在线'] },
  { name: 'iLovePDF', url: 'https://www.ilovepdf.com', desc: '全功能 PDF 处理，免费版无次数限制', category: '实用工具', tags: ['PDF', '转换', '合并'] },
  { name: 'SmallPDF', url: 'https://smallpdf.com', desc: '支持 PDF 转 Word、Excel、PPT', category: '实用工具', tags: ['PDF', '转换', '压缩'] },
  { name: 'PDF24 Tools', url: 'https://tools.pdf24.org', desc: '完全免费的 PDF 工具集，无使用次数限制', category: '实用工具', tags: ['PDF', '免费', '工具集'] },
  { name: 'Convertio', url: 'https://convertio.co', desc: '支持文档、音视频、图片等格式转换', category: '实用工具', tags: ['格式转换', '多格式', '在线'] },
  { name: 'Online OCR', url: 'https://www.onlineocr.net', desc: '免费提取 PDF/图片中的文字，支持多语言', category: '实用工具', tags: ['OCR', '文字识别', 'PDF'] },
]

async function addNewTools() {
  console.log('=== 添加图片/PDF 工具 ===\n')
  
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
      price_type: 'freemium',
      short_desc: tool.desc,
      description: tool.desc + '。功能强大，无需登录即可使用基础功能。',
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
  const categories = ['AI 设计', '实用工具']
  for (const catName of categories) {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', catName).single()
    if (cat) {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
      console.log(`${catName}: ${count || 0}个工具`)
    }
  }
}

addNewTools().catch(console.error)
