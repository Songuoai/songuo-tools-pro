const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 补充小程序分类
const miniPrograms = [
  { name: '支付宝小程序', url: 'https://opendocs.alipay.com', desc: '支付宝小程序开发平台', tags: ['支付宝', '开发'] },
  { name: '抖音小程序', url: 'https://microapp.bytedance.com', desc: '抖音小程序开发平台', tags: ['抖音', '开发'] },
  { name: '百度小程序', url: 'https://smartprogram.baidu.com', desc: '百度小程序开发平台', tags: ['百度', '开发'] },
  { name: '京东小程序', url: 'https://mp.jd.com', desc: '京东小程序开发平台', tags: ['京东', '电商'] },
  { name: '有赞', url: 'https://www.youzan.com', desc: '微信商城搭建工具', tags: ['电商', '商城'] },
  { name: '即速应用', url: 'https://www.jisuapp.cn', desc: '小程序制作平台', tags: ['制作', '模板'] },
]

async function addMiniPrograms() {
  console.log('=== 补充小程序分类 ===\n')
  
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('name', '小程序')
    .single()
  
  if (!category) {
    console.log('❌ 小程序分类不存在')
    return
  }
  
  for (const tool of miniPrograms) {
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('name', tool.name)
      .single()
    
    if (existing) {
      console.log(`⏭️  已存在：${tool.name}`)
      continue
    }
    
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
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
    } else {
      console.log(`✅ 添加成功：${tool.name}`)
    }
  }
  
  console.log('\n=== 最终统计 ===')
  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', category.id)
  
  console.log(`小程序：${count || 0}个工具`)
}

addMiniPrograms().catch(console.error)
