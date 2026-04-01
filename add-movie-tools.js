const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 影视资源分类工具
const movieTools = [
  { name: '低端影视', url: 'https://www.ddys.run', desc: '高质量影视资源网站', tags: ['影视', '高清'] },
  { name: '1905 电影网', url: 'https://www.1905.com', desc: 'CCTV6 官方电影网站', tags: ['电影', '官方'] },
  { name: '耐看 Vlog', url: 'https://www.nkvlog.com', desc: 'Vlog 视频分享平台', tags: ['Vlog', '视频'] },
  { name: '1080 电影网', url: 'https://www.sdlhl.com', desc: '高清电影在线观看', tags: ['电影', '高清'] },
  { name: '猴子电影', url: 'https://monkey-flix.com', desc: '精选电影资源', tags: ['电影', '精选'] },
  { name: '青禾影视', url: 'https://tv.qhdaohang.cn', desc: '在线影视播放平台', tags: ['影视', '在线'] },
  { name: '滴嗒影视', url: 'https://www.didahd.pro', desc: 'HD 高清影视资源', tags: ['影视', '高清'] },
  { name: '乐兔影视', url: 'https://www.letu.me', desc: '免费在线影视', tags: ['影视', '免费'] },
  { name: 'HD 茉莉', url: 'https://hdmoli.org', desc: '高清电影资源', tags: ['电影', '高清'] },
  { name: '影猫的仓库', url: 'https://www.ymck.pro', desc: '影视资源聚合平台', tags: ['影视', '聚合'] },
  { name: '真狼电影', url: 'https://www.zhenlang.cc', desc: '电影在线观看', tags: ['电影', '在线'] },
  { name: '注视影视', url: 'https://gaze.run', desc: '精选影视资源', tags: ['影视', '精选'] },
  { name: '樱花动漫', url: 'https://www.yinghuajinju.com', desc: '动漫在线观看', tags: ['动漫', '在线'] },
  { name: '花子动漫', url: 'https://www.huazidm.com', desc: '动漫资源平台', tags: ['动漫', '资源'] },
  { name: '动漫窝', url: 'https://www.dmwo.cc', desc: '动漫聚合平台', tags: ['动漫', '聚合'] },
  { name: '西瓜卡通', url: 'https://cn.xgcartoon.co', desc: '卡通动漫资源', tags: ['卡通', '动漫'] },
]

async function addMovieTools() {
  console.log('=== 添加影视资源分类工具 ===\n')
  
  // 获取影视资源分类 ID
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('name', '影视资源')
    .single()
  
  if (!category) {
    console.log('❌ 影视资源分类不存在')
    return
  }
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of movieTools) {
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
      description: tool.desc + '。资源丰富，值得收藏。',
      features: ['高清画质', '流畅播放', '资源丰富'],
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
  
  console.log(`\n影视资源分类总计：${count || 0}个工具`)
}

addMovieTools().catch(console.error)
