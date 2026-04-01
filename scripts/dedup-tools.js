const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 去重（保留第一个）
const seen = new Set();
const uniqueTools = [];
let removedCount = 0;

tools.forEach(tool => {
  const key = `${tool.name}-${tool.url}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueTools.push(tool);
  } else {
    console.log(`❌ 移除重复：${tool.name} - ${tool.url}`);
    removedCount++;
  }
});

// 保存
tools = uniqueTools;
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 移除了 ${removedCount} 个重复工具`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
console.log('\n📋 当前影视资源列表:');
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
