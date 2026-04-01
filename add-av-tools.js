const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 新增音频/视频工具
const avTools = [
  // AI 音乐/配音类
  { name: '讯飞听见', url: 'https://www.ifyrec.com', desc: '免费语音转文字、文字转语音，音频剪辑', category: 'AI 音乐', tags: ['语音转文字', 'TTS', '免费'] },
  { name: 'Kapwing', url: 'https://www.kapwing.com', desc: '免费音频拼接、剪辑、去噪', category: 'AI 音乐', tags: ['音频剪辑', '拼接', '免费'] },
  
  // 影视资源类 - 视频下载/去水印
  { name: 'SaveFrom', url: 'https://en.savefrom.net', desc: '多平台视频解析下载，支持抖音、B 站、YouTube', category: '影视资源', tags: ['视频下载', '去水印', '多平台'] },
  { name: '抖音去水印', url: 'https://douyin.wtf', desc: '专门解析抖音链接，无水印下载', category: '影视资源', tags: ['抖音', '去水印', '下载'] },
  { name: 'B 站视频解析', url: 'https://www.jjidown.com', desc: '解析 B 站视频，支持无水印下载', category: '影视资源', tags: ['B 站', '去水印', '下载'] },
  { name: 'Clipchamp', url: 'https://clipchamp.com', desc: '微软旗下在线剪辑，支持拼接、去水印', category: '影视资源', tags: ['视频剪辑', '微软', '在线'] },
  
  // 实用工具类 - 视频工具
  { name: '视频去水印', url: 'https://www.67tool.com/video/edit/dellmg', desc: '在线视频去水印工具', category: '实用工具', tags: ['视频', '去水印', '在线'] },
  { name: '视频剪辑', url: 'https://www.67tool.com/video/edit/cut', desc: '在线视频剪辑工具', category: '实用工具', tags: ['视频剪辑', '在线', '工具'] },
  { name: '视频在线编辑', url: 'https://online-video-cutter.com/cn/video-editor', desc: '在线视频编辑器', category: '实用工具', tags: ['视频编辑', '在线', '工具'] },
  { name: '123Apps', url: 'https://123apps.com/cn', desc: '视频、音频、PDF 和文件转换在线工具', category: '实用工具', tags: ['文件转换', '在线', '合集'] },
  { name: '即时工具', url: 'https://www.67tool.com', desc: '视频、音频、PDF 和文件转换在线工具合集', category: '实用工具', tags: ['工具合集', '在线', '多功能'] },
]

async function addAVTools() {
  console.log('=== 添加音频/视频工具 ===\n')
  
  let added = 0
  let skipped = 0
  let failed = 0
  
  for (const tool of avTools) {
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
      description: tool.desc + '。功能实用，无需登录即可使用。',
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
  const categories = ['AI 音乐', '影视资源', '实用工具']
  for (const catName of categories) {
    const { data: cat } = await supabase.from('categories').select('id').eq('name', catName).single()
    if (cat) {
      const { count } = await supabase.from('tools').select('*', { count: 'exact', head: true }).eq('category_id', cat.id)
      console.log(`${catName}: ${count || 0}个工具`)
    }
  }
}

addAVTools().catch(console.error)
