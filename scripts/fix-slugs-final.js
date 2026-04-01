const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 分类名映射
const categoryMap = {
  'AI 工具': 'ai',
  '影视资源': 'movie',
  '效率办公': 'office',
  'AI 设计': 'ai-design',
  '实用工具': 'tools',
  '开发编程': 'dev',
  'AI 视频': 'ai-video',
  '在线音乐': 'music'
};

// 为所有工具生成正确的 slug
tools = tools.map((tool, index) => {
  const categorySlug = categoryMap[tool.category] || 'other';
  const toolSlug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
