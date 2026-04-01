const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 删除三个耐看系列网站
const needDelete = [
  '耐看影视',
  '1080 影视',
  'VS 影视'
];

console.log('❌ 删除失效的耐看系列网站:\n');

let deletedCount = 0;
tools = tools.filter(tool => {
  if (needDelete.includes(tool.name) && tool.category === '影视资源') {
    console.log(`   ${tool.name} - ${tool.url}`);
    deletedCount++;
    return false;
  }
  return true;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 删除了 ${deletedCount} 个失效网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);

// 显示当前影视资源列表
console.log('\n📋 当前影视资源分类:');
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
