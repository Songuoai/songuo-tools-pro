const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 显示在线音乐分类所有网站
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`🎵 在线音乐分类 (${musicTools.length}个):\n`);

musicTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name}`);
  console.log(`   网址：${t.url}`);
  console.log(`   slug: ${t.slug}\n`);
});
