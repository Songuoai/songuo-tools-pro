const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function fixDuplicates() {
  console.log('=== 修复重复工具 ===\n')
  
  // 重复的工具列表（保留第一个，删除其他）
  const duplicates = [
    { name: 'TryMusicAI', keepId: '62866a39-4e59-4156-a0e8-1dcbafe2232b' },
    { name: '音剪', keepId: '55986c5b-bc41-468e-a019-c9cb25b37ab6' },
    { name: '图咖 AI', keepId: 'b3c44b94-ca3a-49a2-b80b-5be0afe21ca1' },
    { name: 'ReaddyAI', keepId: 'e8e89ca9-ccc0-41d5-a9eb-71fb914865dc' },
    { name: 'MeshyAI', keepId: '58bc7327-824f-4047-b3c9-4e92b3cf0404' },
    { name: 'TripoAI', keepId: 'a6a56cc6-fdd0-47ee-82cd-14f761e5a030' },
    { name: 'Evai 建筑大师', keepId: '8ccbe9a5-d58a-4cc3-83d2-4fb00e90b0c0' },
  ]
  
  let deleted = 0
  for (const dup of duplicates) {
    const { data: all } = await supabase.from('tools').select('id').eq('name', dup.name)
    if (all && all.length > 1) {
      const toDelete = all.filter(t => t.id !== dup.keepId)
      for (const t of toDelete) {
        const { error } = await supabase.from('tools').delete().eq('id', t.id)
        if (error) {
          console.log(`❌ 删除失败：${dup.name} (${t.id})`)
        } else {
          console.log(`✅ 删除重复：${dup.name} (${t.id})`)
          deleted++
        }
      }
    }
  }
  
  console.log(`\n=== 删除完成：${deleted}个重复工具 ===`)
}

fixDuplicates().catch(console.error)
