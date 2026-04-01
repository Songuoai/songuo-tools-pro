const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// PDF 中的 AI 工具列表（用户确认）
const aiToolsFromPDF = [
  { name: 'Brev AI', url: 'https://www.novatools.cn/tools/brev-ai-ai-music-generator-free-online', desc: '免费在线 AI 音乐生成器，文字转专业音乐', tags: ['音乐生成', '免费', 'AI'] },
  { name: '文心快码', url: 'https://www.novatools.cn/tools/comate-baidu', desc: '源自百度 20 年技术沉淀，更懂中文语境的 AI 编程辅助工具', tags: ['编程', '百度', 'AI'] },
  { name: 'Tempo', url: 'https://www.novatools.cn/tools/tempo', desc: '打破设计与开发的边界，React 应用开发效率提升 10 倍', tags: ['React', '协作', '开发'] },
  { name: 'Cursor', url: 'https://cursor.com/cn', desc: '深度集成 AI 的代码编辑器，支持自然语言编辑', tags: ['代码编辑器', 'AI', '开发'] },
  { name: 'PaywallBuster', url: 'https://www.novatools.cn/tools/paywallbuster', desc: '免费在线工具，绕过新闻网站付费墙', tags: ['新闻', '免费', '工具'] },
  { name: 'RankAI', url: 'https://www.novatools.cn/tools/rankai', desc: '全自动 AI SEO/GEO 代理，AI 搜索优化', tags: ['SEO', 'AI', '优化'] },
  { name: 'Evai 建筑大师', url: 'https://www.openevai.com', desc: '建筑、室内、景观及家具设计领域的全流程 AI 创作平台', tags: ['建筑设计', '室内设计', 'AI'] },
  { name: 'JoyPix', url: 'https://www.novatools.cn/tools/joypix-ai', desc: '让照片开口说话，AI 视觉故事创作平台', tags: ['照片', '视频生成', 'AI'] },
  { name: 'RemoveBGVideo', url: 'https://removebgvideo.com', desc: '一键移除视频背景，发丝级处理效果', tags: ['视频处理', '背景移除', 'AI'] },
  { name: 'BeautyPlus', url: 'https://www.novatools.cn/tools/beautyplus-com', desc: '风靡全球的 AI 图像与视频处理工具', tags: ['图像处理', '修图', 'AI'] },
  { name: 'CrePal', url: 'https://www.novatools.cn/tools/crepal-ai', desc: '脚本、图像与视频生成无缝融合的全流程 AI 视频创作', tags: ['视频创作', '脚本生成', 'AI'] },
  { name: 'iMini AI', url: 'https://www.novatools.cn/tools/mini-ai', desc: 'AI 图片生成、视频创作和智能模板整合平台', tags: ['图片生成', '视频创作', 'AI'] },
]

async function categorizeAsAITools() {
  console.log('=== 将 PDF 工具分类为 AI 工具 ===\n')
  
  // 获取 AI 工具分类 ID
  const { data: aiCategory } = await supabase
    .from('categories')
    .select('id')
    .eq('name', 'AI 工具')
    .single()
  
  if (!aiCategory) {
    console.log('❌ AI 工具分类不存在')
    return
  }
  
  let updated = 0
  let notFound = 0
  
  for (const tool of aiToolsFromPDF) {
    // 查找工具
    const { data: existing } = await supabase
      .from('tools')
      .select('id, category_id')
      .eq('name', tool.name)
      .single()
    
    if (!existing) {
      console.log(`⚠️  未找到：${tool.name}`)
      notFound++
      continue
    }
    
    // 更新分类为 AI 工具
    const { error } = await supabase
      .from('tools')
      .update({ category_id: aiCategory.id })
      .eq('id', existing.id)
    
    if (error) {
      console.log(`❌ 更新失败：${tool.name} - ${error.message}`)
    } else {
      console.log(`✅ 已分类：${tool.name} → AI 工具`)
      updated++
    }
  }
  
  console.log('\n=== 分类完成 ===')
  console.log(`✅ 已更新：${updated} 个`)
  console.log(`⚠️  未找到：${notFound} 个`)
  
  // 统计 AI 工具分类
  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', aiCategory.id)
  
  console.log(`\nAI 工具分类总计：${count || 0}个工具`)
}

categorizeAsAITools().catch(console.error)
