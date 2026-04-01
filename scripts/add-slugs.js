const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 生成 slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// 为每个工具添加 slug
let addedCount = 0;
const updatedTools = tools.map(tool => {
  if (!tool.slug) {
    const slug = generateSlug(tool.name);
    console.log(`📝 ${tool.name} → /tool/${slug}`);
    addedCount++;
    return { ...tool, slug };
  }
  return tool;
});

console.log(`\n✅ 为 ${addedCount} 个工具添加了 slug`);

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
