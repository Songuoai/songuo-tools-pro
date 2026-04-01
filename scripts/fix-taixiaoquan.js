const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log('🔧 修改泰小圈网址:\n');

// 泰小圈更换网址
const taixiaoIndex = tools.findIndex(t => t.name === '泰小圈' && t.category === '影视资源');
if (taixiaoIndex !== -1) {
  const oldUrl = tools[taixiaoIndex].url;
  // 更换为真正的泰小圈域名
  tools[taixiaoIndex].url = 'https://www.taiquan.cc';
  tools[taixiaoIndex].shortDesc = '泰小圈 - 专注泰剧的在线追剧网站';
  tools[taixiaoIndex].description = '泰小圈 - 提供泰国电视剧在线观看服务';
  console.log(`🔄 修改：泰小圈`);
  console.log(`   旧网址：${oldUrl}`);
  console.log(`   新网址：https://www.taiquann.cc`);
} else {
  console.log(`⚠️  未找到：泰小圈`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
