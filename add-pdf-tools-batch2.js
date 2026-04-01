const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 第二批 PDF 工具
const toolsBatch2 = [
  // AI 音乐
  { name: 'Brev AI', url: 'https://www.novatools.cn/tools/brev-ai-ai-music-generator-free-online', desc: '免费在线 AI 音乐生成器，文字转专业音乐', category: 'AI 音乐', tags: ['音乐生成', '免费', 'AI'] },
  
  // 开发编程
  { name: '文心快码', url: 'https://www.novatools.cn/tools/comate-baidu', desc: '源自百度 20 年技术沉淀，更懂中文语境的 AI 编程辅助工具', category: '开发编程', tags: ['编程', '百度', 'AI'] },
  { name: 'Tempo', url: 'https://www.novatools.cn/tools/tempo', desc: '打破设计与开发的边界，让 React 应用开发效率提升 10 倍的视觉化协作工具', category: '开发编程', tags: ['React', '协作', '开发'] },
  { name: 'Cursor', url: 'https://cursor.com/cn', desc: '深度集成 AI 的代码编辑器，支持自然语言编辑，智能补全和代码库理解', category: '开发编程', tags: ['代码编辑器', 'AI', '开发'] },
  
  // 实用工具
  { name: 'PaywallBuster', url: 'https://www.novatools.cn/tools/paywallbuster', desc: '免费在线工具，帮助用户快速绕过新闻网站的付费墙', category: '实用工具', tags: ['新闻', '免费', '工具'] },
  { name: 'RankAI', url: 'https://www.novatools.cn/tools/rankai', desc: '全自动 AI SEO/GEO 代理，助您的网站在 AI 搜索中脱颖而出', category: '实用工具', tags: ['SEO', 'AI', '优化'] },
  
  // AI 设计
  { name: 'Evai 建筑大师', url: 'https://www.openevai.com', desc: '深耕于建筑、室内、景观及家具设计领域的全流程 AI 创作平台', category: 'AI 设计', tags: ['建筑设计', '室内设计', 'AI'] },
  { name: 'JoyPix', url: 'https://www.novatools.cn/tools/joypix-ai', desc: '让照片开口说话，集成全球顶级模型的全能型 AI 视觉故事创作平台', category: 'AI 设计', tags: ['照片', '视频生成', 'AI'] },
  { name: 'RemoveBGVideo', url: 'https://removebgvideo.com', desc: '一键移除视频背景，发丝级处理效果', category: 'AI 设计', tags: ['视频处理', '背景移除', 'AI'] },
  { name: 'BeautyPlus', url: 'https://www.novatools.cn/tools/beautyplus-com', desc: '风靡全球的 AI 图像与视频处理工具，智能修图', category: 'AI 设计', tags: ['图像处理', '修图', 'AI'] },
  
  // AI 视频
  { name: 'CrePal', url: 'https://www.novatools.cn/tools/crepal-ai', desc: '脚本、图像与视频生成无缝融合的全流程 AI 视频创作智能体', category: 'AI 视频', tags: ['视频创作', '脚本生成', 'AI'] },
  
  // AI 工具
  { name: 'iMini AI', url: 'https://www.novatools.cn/tools/mini-ai', desc: '将 AI 图片生成、视频创作和智能模板整合在一起的创作平台', category: 'AI 工具', tags: ['图片生成', '视频创作', 'AI'] },
]

async function addBatch2() {
  console.log('=== 开始添加第二批 PDF 工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of toolsBatch2) {
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
      description: tool.desc + '。功能强大，值得尝试。',
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
  const categories = ['AI 音乐', '开发编程', '实用工具', 'AI 设计', 'AI 视频', 'AI 工具']
  for (const catName of categories) {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', catName).single()
    if (cat) {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
      console.log(`${catName}: ${count || 0}个工具`)
    }
  }
}

addBatch2().catch(console.error)
