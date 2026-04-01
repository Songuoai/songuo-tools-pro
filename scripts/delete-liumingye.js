const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 删除刘明叶搜索
const index = tools.findIndex(t => t.name === '刘明叶搜索' && t.category === '在线音乐');

if (index !== -1) {
  console.log(`❌ 删除：刘明叶搜索 - ${tools[index].url}`);
  tools.splice(index, 1);
  
  // 保存
  const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
  const outputData = { tools };
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
  
  console.log(`\n💾 已保存到：${outputPath}`);
  
  // 显示在线音乐分类统计
  const musicTools = tools.filter(t => t.category === '在线音乐');
  console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
} else {
  console.log(`⚠️  未找到：刘明叶搜索`);
}
