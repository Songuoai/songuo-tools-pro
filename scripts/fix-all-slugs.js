const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 为所有工具生成正确的 slug
tools = tools.map((tool, index) => {
  // 使用 分类 + 工具 ID 生成唯一 slug
  const categorySlug = tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const toolSlug = tool.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-');
  const newSlug = `${categorySlug}-${tool.id}-${toolSlug}`;
  
  return {
    ...tool,
    slug: newSlug
  };
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`✅ 已为所有 ${tools.length} 个工具生成正确的 slug`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类的 slug
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类 (${musicTools.length}个):`);
musicTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name}`);
  console.log(`   slug: ${t.slug}`);
  console.log(`   url: ${t.url}\n`);
});
