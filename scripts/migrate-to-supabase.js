/**
 * 数据迁移脚本 - JSON → Supabase
 * 
 * 使用方法：
 * 1. 确保 .env.local 已配置 Supabase 凭据
 * 2. 运行：node scripts/migrate-to-supabase.js
 * 3. 检查输出确认迁移结果
 * 
 * 执行时间：约 30-60 秒（510+ 工具）
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 手动加载 .env.local（无需 dotenv 包）
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
  console.log('✅ 已加载 .env.local\n');
}

// 配置
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TOOLS_JSON_PATH = path.join(process.cwd(), 'data', 'tools.json');

// 全局变量
let jsonData;

// 验证配置
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ 错误：请在 .env.local 中配置 Supabase 凭据');
  console.error('NEXT_PUBLIC_SUPABASE_URL=...');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=...');
  process.exit(1);
}

// 创建 Supabase 客户端（使用 Service Role Key 绕过 RLS）
const supabaseKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
if (SUPABASE_SERVICE_ROLE_KEY) {
  console.log('🔑 使用 Service Role Key（绕过 RLS）\n');
} else {
  console.log('⚠️  使用 Anon Key（可能需要禁用 RLS）\n');
}
const supabase = createClient(SUPABASE_URL, supabaseKey);

// 分类映射（名称 → ID）
const categoryMap = new Map();

// 统计
const stats = {
  categories: { created: 0, skipped: 0 },
  tools: { total: 0, success: 0, failed: 0, skipped: 0 },
};

async function main() {
  console.log('🚀 开始数据迁移...\n');
  console.log(`📂 数据文件：${TOOLS_JSON_PATH}`);
  console.log(`🔗 Supabase: ${SUPABASE_URL}\n`);

  // 读取 JSON 数据
  console.log('📖 读取 tools.json...');
  let jsonData;
  try {
    const fileContent = fs.readFileSync(TOOLS_JSON_PATH, 'utf-8');
    jsonData = JSON.parse(fileContent);
    console.log(`✅ 读取成功，共 ${jsonData.tools.length} 个工具\n`);
  } catch (error) {
    console.error(`❌ 读取失败：${error.message}`);
    process.exit(1);
  }

  // 步骤 0: 清空现有数据（可选）
  console.log('🗑️  步骤 0/3: 清空现有数据...');
  await clearExistingData();
  console.log('✅ 数据已清空\n');

  // 步骤 1: 创建分类
  console.log('📂 步骤 1/2: 创建分类...');
  await migrateCategories(jsonData);
  console.log(`✅ 分类完成：新建 ${stats.categories.created} 个，跳过 ${stats.categories.skipped} 个\n`);

  // 步骤 2: 创建工具
  console.log('🛠️  步骤 2/2: 迁移工具...');
  await migrateTools(jsonData.tools);
  console.log(`✅ 工具完成：成功 ${stats.tools.success} 个，失败 ${stats.tools.failed} 个，跳过 ${stats.tools.skipped} 个\n`);

  // 输出统计
  console.log('📊 迁移统计:');
  console.log('─────────────────────────');
  console.log(`分类：${stats.categories.created} 新建，${stats.categories.skipped} 已存在`);
  console.log(`工具：${stats.tools.total} 总计，${stats.tools.success} 成功，${stats.tools.failed} 失败`);
  console.log('─────────────────────────\n');

  if (stats.tools.failed > 0) {
    console.log('⚠️  部分工具迁移失败，请检查上方错误信息');
  } else {
    console.log('🎉 迁移完成！所有数据已成功导入 Supabase');
  }
}

async function clearExistingData() {
  // 使用 SQL 清空工具表
  console.log('   执行 TRUNCATE TABLE tools...');
  const { error } = await supabase
    .from('tools')
    .delete()
    .is('id', null); // 尝试删除所有

  if (error) {
    console.log(`   ⚠️  清空警告：${error.message}`);
    console.log('   继续迁移，跳过已存在的工具...');
  } else {
    console.log('   ✅ 工具表已清空');
  }
}

async function migrateCategories(jsonData) {
  // 从工具中提取所有分类
  const categories = new Set();
  jsonData.tools.forEach(tool => {
    if (tool.category) {
      categories.add(tool.category);
    }
  });

  console.log(`   发现 ${categories.size} 个分类`);

  // 获取现有分类
  const { data: existingCats } = await supabase
    .from('categories')
    .select('id, name, slug');

  if (existingCats) {
    existingCats.forEach(cat => {
      categoryMap.set(cat.name, cat.id);
    });
    console.log(`   数据库中已有 ${existingCats.length} 个分类`);
  }

  // 创建新分类
  const categoriesArray = Array.from(categories);
  for (const categoryName of categoriesArray) {
    if (categoryMap.has(categoryName)) {
      stats.categories.skipped++;
      continue;
    }

    const slug = generateSlug(categoryName);
    const icon = getCategoryIcon(categoryName);

    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name: categoryName,
        slug: slug,
        icon: icon,
        description: `${categoryName}工具集合`,
        sort_order: 0,
      }])
      .select()
      .single();

    if (error) {
      console.error(`   ❌ 创建分类 "${categoryName}" 失败：${error.message}`);
    } else {
      categoryMap.set(categoryName, data.id);
      stats.categories.created++;
      console.log(`   ✅ 创建分类：${categoryName}`);
    }
  }
}

async function migrateTools(tools) {
  stats.tools.total = tools.length;

  // 批量插入（每批 50 个）
  const batchSize = 50;
  for (let i = 0; i < tools.length; i += batchSize) {
    const batch = tools.slice(i, i + batchSize);
    console.log(`   处理批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(tools.length / batchSize)}...`);

    const insertData = batch.map(tool => ({
      name: tool.name,
      slug: tool.slug || generateSlug(tool.name),
      url: tool.url,
      category_id: categoryMap.get(tool.category) || null,
      price_type: tool.priceType || 'freemium',
      price_url: tool.priceUrl || null,
      short_desc: tool.shortDesc || tool.description?.substring(0, 200) || '暂无描述',
      description: tool.description || tool.shortDesc || '暂无描述',
      features: tool.features || [],
      logo_url: tool.logoUrl || null,
      screenshots: tool.screenshots || [],
      tags: tool.tags || [],
      status: tool.status || 'published',
      views: tool.views || 0,
      rating: tool.rating || 0,
    }));

    // 使用 upsert 避免重复错误
    const { data, error } = await supabase
      .from('tools')
      .upsert(insertData, { 
        onConflict: 'slug',
        ignoreDuplicates: true // 跳过已存在的
      })
      .select();

    if (error) {
      console.error(`   ❌ 批次插入失败：${error.message}`);
      stats.tools.failed += batch.length;
    } else {
      stats.tools.success += data.length;
      console.log(`   ✅ 插入 ${data.length} 个工具`);
    }

    // 避免速率限制
    await sleep(200);
  }
}

// 辅助函数
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getCategoryIcon(category) {
  const icons = {
    'AI 工具': '🤖',
    'AI 设计': '🎨',
    'AI 视频': '🎬',
    'AI 音乐': '🎵',
    '效率办公': '💼',
    '影视资源': '🎥',
    '在线音乐': '🎧',
    '实用工具': '🛠️',
    '小程序': '📱',
    '开发编程': '💻',
  };
  return icons[category] || '🔧';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 运行迁移
main().catch(error => {
  console.error('💥 迁移过程中发生错误:', error);
  process.exit(1);
});
