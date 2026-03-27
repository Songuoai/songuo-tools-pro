// 导入工具数据到 Supabase
// 使用方法：node scripts/import-tools.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 读取环境变量
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 错误：请检查 .env.local 中的 Supabase 配置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 读取工具数据
const toolsPath = path.join(__dirname, '..', 'data', 'tools.json');
const data = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
const tools = data.tools || [];

console.log(`📦 准备导入 ${tools.length} 个工具...`);

// 分类映射
const categoryMap = {};

async function main() {
  try {
    // 1. 先获取所有分类
    console.log('📂 获取分类...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');

    if (catError) {
      console.error('❌ 获取分类失败:', catError);
      return;
    }

    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
      categoryMap[cat.slug] = cat.id;
    });

    console.log(`✅ 找到 ${categories.length} 个分类`);

    // 2. 导入工具
    console.log('🔧 开始导入工具...');
    let successCount = 0;
    let failCount = 0;

    for (const tool of tools) {
      try {
        // 生成 slug
        const slug = tool.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        // 查找分类 ID
        let categoryId = categoryMap[tool.category];
        
        // 如果找不到，尝试模糊匹配
        if (!categoryId) {
          const categoryName = Object.keys(categoryMap).find(key => 
            tool.category.includes(key) || key.includes(tool.category)
          );
          if (categoryName) {
            categoryId = categoryMap[categoryName];
          }
        }

        // 准备数据
        const toolData = {
          name: tool.name,
          slug: slug,
          url: tool.url,
          category_id: categoryId,
          price_type: tool.priceType || 'freemium',
          short_desc: tool.shortDesc || '',
          description: tool.description || '',
          logo_url: tool.logoUrl || null,
          tags: tool.tags || [],
          status: tool.status || 'published',
          views: tool.views || 0,
          rating: tool.rating || 0,
        };

        // 插入或更新
        const { error } = await supabase
          .from('tools')
          .upsert(toolData, { onConflict: 'slug' });

        if (error) {
          console.error(`❌ 导入失败 [${tool.name}]:`, error.message);
          failCount++;
        } else {
          successCount++;
          console.log(`✅ 导入成功：${tool.name}`);
        }

        // 避免请求过快
        if ((successCount + failCount) % 50 === 0) {
          console.log(`⏳ 已处理 ${successCount + failCount}/${tools.length} 个工具...`);
          await new Promise(resolve => setTimeout(resolve, 500));
        }

      } catch (err) {
        console.error(`❌ 处理失败 [${tool.name}]:`, err.message);
        failCount++;
      }
    }

    console.log('\n🎉 导入完成！');
    console.log(`✅ 成功：${successCount} 个`);
    console.log(`❌ 失败：${failCount} 个`);
    console.log(`📊 总计：${tools.length} 个`);

  } catch (error) {
    console.error('❌ 导入过程出错:', error);
  }
}

main();
