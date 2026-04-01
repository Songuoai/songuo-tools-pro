const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 需要补充的分类
const categoriesToFill = {
  'AI 视频': [
    { name: 'Runway ML', url: 'https://runwayml.com', desc: 'AI 视频生成和编辑工具', tags: ['视频生成', 'AI'] },
    { name: 'Pika Labs', url: 'https://pika.art', desc: '文本到视频 AI 工具', tags: ['视频生成'] },
    { name: 'Luma Dream Machine', url: 'https://lumalabs.ai', desc: '高质量 AI 视频生成', tags: ['视频生成'] },
    { name: '可灵 AI', url: 'https://klingai.com', desc: '快手 AI 视频生成', tags: ['视频生成', '国产'] },
    { name: '即梦 AI', url: 'https://jimeng.com', desc: '字节跳动视频生成', tags: ['视频生成'] },
  ],
  'AI 音乐': [
    { name: 'Suno AI', url: 'https://suno.com', desc: 'AI 音乐生成平台', tags: ['音乐生成', 'AI'] },
    { name: 'Udio', url: 'https://udio.com', desc: 'AI 歌曲创作工具', tags: ['音乐生成'] },
    { name: 'AIVA', url: 'https://aiva.ai', desc: 'AI 作曲助手', tags: ['作曲'] },
    { name: 'Soundraw', url: 'https://soundraw.io', desc: 'AI 背景音乐生成', tags: ['背景音乐'] },
    { name: 'Boomy', url: 'https://boomy.com', desc: 'AI 音乐创作平台', tags: ['音乐创作'] },
  ],
  '效率办公': [
    { name: 'Notion AI', url: 'https://notion.so', desc: 'AI 笔记和文档工具', tags: ['笔记', 'AI'] },
    { name: 'Grammarly', url: 'https://grammarly.com', desc: 'AI 写作助手', tags: ['写作'] },
    { name: 'Otter.ai', url: 'https://otter.ai', desc: 'AI 会议记录', tags: ['会议'] },
    { name: 'Zapier', url: 'https://zapier.com', desc: '自动化工作流', tags: ['自动化'] },
  ],
  '小程序': [
    { name: '微信小程序', url: 'https://mp.weixin.qq.com', desc: '微信小程序开发', tags: ['微信'] },
    { name: '支付宝小程序', url: 'https://opendocs.alipay.com', desc: '支付宝小程序', tags: ['支付宝'] },
    { name: '抖音小程序', url: 'https://microapp.bytedance.com', desc: '抖音小程序开发', tags: ['抖音'] },
  ]
}

async function fillCategories() {
  console.log('=== 开始补充分类数据 ===\n')
  
  // 获取所有分类
  const { data: categories } = await supabase.from('categories').select('id, name, slug')
  
  for (const [catName, tools] of Object.entries(categoriesToFill)) {
    const category = categories.find(c => c.name === catName)
    if (!category) {
      console.log(`❌ 分类不存在：${catName}`)
      continue
    }
    
    console.log(`📝 补充分类：${catName} (${tools.length}个工具)`)
    
    for (const tool of tools) {
      // 检查是否已存在
      const { data: existing } = await supabase
        .from('tools')
        .select('id')
        .eq('name', tool.name)
        .single()
      
      if (existing) {
        console.log(`  ⏭️  已存在：${tool.name}`)
        continue
      }
      
      // 生成 slug
      const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
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
        console.log(`  ❌ 添加失败：${tool.name} - ${error.message}`)
      } else {
        console.log(`  ✅ 添加成功：${tool.name}`)
      }
    }
    
    console.log('')
  }
  
  // 统计结果
  console.log('=== 最终统计 ===')
  for (const cat of categories) {
    const { count } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id)
    
    console.log(`${cat.name}: ${count || 0}个工具`)
  }
}

fillCategories().catch(console.error)
