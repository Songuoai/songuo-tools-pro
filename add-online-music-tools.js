const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 在线音乐分类工具
const onlineMusicTools = [
  { name: '放屁音乐', url: 'https://www.fangpi.net', desc: '免费在线音乐播放平台', tags: ['音乐', '免费', '在线'] },
  { name: '糖果音乐', url: 'https://www.tgws.cc', desc: '高品质音乐分享平台', tags: ['音乐', '高音质'] },
  { name: '爱玩音乐', url: 'https://www.22a5.com', desc: '流行音乐聚合平台', tags: ['音乐', '流行'] },
  { name: 'ACG 漫音社', url: 'https://www.acgjc.com', desc: 'ACG 动漫音乐专区', tags: ['ACG', '动漫音乐'] },
  { name: '我爱无损', url: 'http://www.52wusun.com', desc: '无损音乐下载平台', tags: ['无损', '高音质'] },
  { name: '布谷音乐', url: 'https://www.buguyy.top', desc: '免费无损音乐下载', tags: ['音乐', '无损'] },
  { name: '凤梨音乐', url: 'https://www.flmp3.pro', desc: 'MP3 音乐下载', tags: ['MP3', '下载'] },
  { name: '魔石音乐', url: 'https://music.yym4.com', desc: '在线音乐播放', tags: ['音乐', '在线'] },
  { name: '鲸鱼无损', url: 'https://www.jywav.com', desc: '高品质无损音乐', tags: ['无损', 'WAV'] },
  { name: 'SPlayer', url: 'https://splayer.uncley.cc', desc: '简约音乐播放器', tags: ['播放器', '简约'] },
]

async function addOnlineMusicTools() {
  console.log('=== 添加在线音乐分类工具 ===\n')
  
  // 获取在线音乐分类 ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('name', '在线音乐')
    .single()
  
  if (!category) {
    console.log('❌ 在线音乐分类不存在')
    return
  }
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of onlineMusicTools) {
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
      description: tool.desc + '。音质优秀，值得收藏。',
      features: ['高音质', '流畅播放', '资源丰富'],
      tags: tool.tags || [],
      status: 'published',
      logo_url: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
    })
    
    if (error) {
      console.log(`❌ 添加失败：${tool.name} - ${error.message}`)
      failed++
    } else {
      console.log(`✅ 添加成功：${tool.name}`)
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
    .eq('category_id', category.id)
  
  console.log(`\n在线音乐分类总计：${count || 0}个工具`)
}

addOnlineMusicTools().catch(console.error)
