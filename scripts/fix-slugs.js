const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 生成 slug - 支持中文
function generateSlug(name, id) {
  // 尝试保留英文名称
  const english = name.match(/[a-zA-Z0-9\-_.]+/);
  if (english && english[0].length > 2) {
    return english[0].toLowerCase();
  }
  
  // 中文名称：使用拼音首字母 + ID
  // 简单处理：移除特殊字符，保留中文和数字
  const cleaned = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '');
  if (cleaned.length > 0) {
    return `tool-${id}-${cleaned.substring(0, 10)}`;
  }
  
  // 最后方案：使用 ID
  return `tool-${id}`;
}

// 为每个工具添加 slug
let updatedCount = 0;
const updatedTools = tools.map(tool => {
  const slug = generateSlug(tool.name, tool.id);
  if (!tool.slug || tool.slug === '') {
    console.log(`📝 ${tool.name} → /tool/${slug}`);
    updatedCount++;
  }
  return { ...tool, slug };
});

console.log(`\n✅ 更新了 ${updatedCount} 个工具的 slug`);

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools: updatedTools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类的工具 slug
console.log('\n🎬 影视资源分类工具链接：');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const movieTools = updatedTools.filter(t => t.category === '影视资源');
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} → /tool/${t.slug}`);
});

// 显示所有工具的 slug 统计
console.log('\n📊 Slug 统计：');
const emptySlugs = updatedTools.filter(t => !t.slug || t.slug === '');
console.log(`总工具数：${updatedTools.length}`);
console.log(`有 slug: ${updatedTools.length - emptySlugs.length}`);
console.log(`无 slug: ${emptySlugs.length}`);
