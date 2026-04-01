const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 统计分类
const categories = {};
tools.forEach(tool => {
  const cat = tool.category || '未分类';
  if (!categories[cat]) {
    categories[cat] = 0;
  }
  categories[cat]++;
});

console.log('📊 工具分类统计：\n');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`${cat}: ${count} 个`);
});

console.log(`\n总工具数：${tools.length}`);

// 检查影视资源分类
console.log('\n🎬 影视资源分类工具：');
const movieTools = tools.filter(t => t.category === '影视资源');
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
