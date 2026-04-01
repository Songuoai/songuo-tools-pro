const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 去重（按名称）
const seen = new Map();
const uniqueTools = [];
let removedCount = 0;

tools.forEach(tool => {
  if (tool.category !== '在线音乐') {
    uniqueTools.push(tool);
    return;
  }
  
  const key = tool.name.toLowerCase();
  if (!seen.has(key)) {
    seen.set(key, true);
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

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
console.log('\n📋 当前在线音乐列表:');
musicTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
