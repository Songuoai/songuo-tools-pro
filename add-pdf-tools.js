const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// PDF 中的工具列表
const toolsFromPDF = [
  // AI 音乐
  { name: 'Music FX', url: 'https://musicfx.net', desc: 'AI 音乐生成器 - 快速创作歌曲', category: 'AI 音乐', tags: ['音乐生成', 'AI'] },
  { name: 'TryMusicAI', url: 'https://trymusic.ai/zh', desc: '将创意灵感转化为高品质音轨的 AI 音乐生成工具', category: 'AI 音乐', tags: ['音乐生成', 'AI'] },
  { name: 'YouMusic.AI', url: 'https://youmusic.ai/zh', desc: '一键生成独特、免版权的高质量音乐', category: 'AI 音乐', tags: ['音乐生成', '免版权'] },
  { name: 'MusicStar.AI', url: 'https://www.novatools.cn/tools/musicstar-ai', desc: '超酷的 AI 音乐生成器，帮你轻松搞定原创歌曲', category: 'AI 音乐', tags: ['音乐生成', '免版税'] },
  { name: 'MusicHero.ai', url: 'https://musichero.ai/zh-CN', desc: '免费在线 AI 音乐生成器，文本创作音乐', category: 'AI 音乐', tags: ['音乐生成', '免费'] },
  { name: 'Suno-Top', url: 'https://suno-top.com', desc: '免费的 Suno 音乐下载服务', category: 'AI 音乐', tags: ['音乐下载', '免费'] },
  { name: 'AI Mastering', url: 'https://www.novatools.cn/tools/ai-mastering', desc: '自动化的在线音频母带处理服务', category: 'AI 音乐', tags: ['音频处理', '母带'] },
  { name: 'Rap Generator', url: 'https://www.novatools.cn/tools/rap-generator', desc: '免费 AI 工具，快速生成说唱歌曲和歌词', category: 'AI 音乐', tags: ['说唱', '歌词生成'] },
  { name: 'UBERDUCK', url: 'https://www.uberduck.ai', desc: '行业领先的 AI 音频创作平台，高精准合成人声', category: 'AI 音乐', tags: ['人声合成', '音频'] },
  { name: '音剪', url: 'https://audioeditor.ximalaya.com', desc: '一站式 AI 音频创作，专业音频制作', category: 'AI 音乐', tags: ['音频编辑', '喜马拉雅'] },
  
  // AI 设计
  { name: 'AI Home Design', url: 'https://aihomedesign.io', desc: 'AI 家居设计服务的网站', category: 'AI 设计', tags: ['家居设计', '室内设计'] },
  { name: 'X-FUJN', url: 'https://xfun.design', desc: 'X-FUJN 智能包装设计平台', category: 'AI 设计', tags: ['包装设计', '智能设计'] },
  { name: '图咖 AI', url: 'https://www.katuai.cn', desc: '领先的图层化平面设计工具', category: 'AI 设计', tags: ['平面设计', '图层'] },
  { name: 'ReaddyAI', url: 'https://readdy.ai', desc: 'AI 网站构建器轻松创建网站', category: 'AI 设计', tags: ['网站构建', 'AI'] },
  { name: 'MeshyAI', url: 'https://www.meshy.ai', desc: '创建 3D 模型的最简单方法', category: 'AI 设计', tags: ['3D 模型', '建模'] },
  { name: 'TripoAI', url: 'https://www.tripo3d.ai', desc: '更好的 AI 3D 工作站', category: 'AI 设计', tags: ['3D', '工作站'] },
  
  // 开发编程
  { name: 'NVIDIA', url: 'https://www.nvidia.com/en-us', desc: 'NVIDIA 的人工智能计算领导力', category: '开发编程', tags: ['AI', '计算', 'GPU'] },
]

async function addToolsFromPDF() {
  console.log('=== 开始添加 PDF 中的工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of toolsFromPDF) {
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
    
    // 生成 slug（添加时间戳避免重复）
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
  const categories = ['AI 音乐', 'AI 设计', '开发编程']
  for (const catName of categories) {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', catName).single()
    if (cat) {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
      console.log(`${catName}: ${count || 0}个工具`)
    }
  }
}

addToolsFromPDF().catch(console.error)
