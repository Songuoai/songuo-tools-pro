const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log('🔧 修改失效网站:\n');

// 1. 茶杯狐更换网址
const chabeiIndex = tools.findIndex(t => t.name === '茶杯狐' && t.category === '影视资源');
if (chabeiIndex !== -1) {
  const oldUrl = tools[chabeiIndex].url;
  // 更换为真正的茶杯狐域名
  tools[chabeiIndex].url = 'https://www.cupfox.cc';
  tools[chabeiIndex].shortDesc = '茶杯狐 - 影视聚合搜索';
  tools[chabeiIndex].description = '茶杯狐 - 提供免费影视资源搜索服务';
  console.log(`🔄 修改：茶杯狐`);
  console.log(`   旧网址：${oldUrl}`);
  console.log(`   新网址：https://www.cupfox.cc`);
} else {
  console.log(`⚠️  未找到：茶杯狐`);
}

// 2. 喵喵影视更换网址
const miaomiaoIndex = tools.findIndex(t => t.name === '喵喵影视' && t.category === '影视资源');
if (miaomiaoIndex !== -1) {
  const oldUrl = tools[miaomiaoIndex].url;
  // 更换为真正的喵喵影视域名
  tools[miaomiaoIndex].url = 'https://www.miaomu.cc';
  tools[miaomiaoIndex].shortDesc = '喵喵影视 - 免费在线电影观看';
  tools[miaomiaoIndex].description = '喵喵影视 - 提供免费电影电视剧在线观看服务';
  console.log(`\n🔄 修改：喵喵影视`);
  console.log(`   旧网址：${oldUrl}`);
  console.log(`   新网址：https://www.miaomu.cc`);
} else {
  console.log(`⚠️  未找到：喵喵影视`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
