const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log('🔧 执行修改:\n');

// 1. 删除花子动漫
const huaziIndex = tools.findIndex(t => t.name === '花子动漫' && t.category === '影视资源');
if (huaziIndex !== -1) {
  console.log(`❌ 删除：花子动漫 - ${tools[huaziIndex].url}`);
  tools.splice(huaziIndex, 1);
} else {
  console.log(`⚠️  未找到：花子动漫`);
}

// 2. 66 影视改名为电影港（网址不变）
const index66 = tools.findIndex(t => t.name === '66 影视' && t.category === '影视资源');
if (index66 !== -1) {
  const oldUrl = tools[index66].url;
  tools[index66].name = '电影港';
  tools[index66].slug = 'dianyinggang';
  tools[index66].shortDesc = '电影港 - 免费电影下载';
  tools[index66].description = '电影港 - 提供免费电影迅雷下载服务';
  console.log(`🔄 改名：66 影视 → 电影港`);
  console.log(`   网址：${oldUrl}（保持不变）`);
} else {
  console.log(`⚠️  未找到：66 影视`);
}

// 3. 电影天堂更换网址（原链接打开是优酷）
const oldTiantangIndex = tools.findIndex(t => t.name === '电影天堂' && t.category === '影视资源');
if (oldTiantangIndex !== -1) {
  const oldUrl = tools[oldTiantangIndex].url;
  // 更换为真正的电影天堂域名
  tools[oldTiantangIndex].url = 'https://www.dytt8.net';
  tools[oldTiantangIndex].shortDesc = '电影天堂 - 免费电影下载';
  tools[oldTiantangIndex].description = '电影天堂 - 提供免费电影迅雷下载服务';
  console.log(`🔄 修改：电影天堂`);
  console.log(`   旧网址：${oldUrl}`);
  console.log(`   新网址：https://www.dytt8.net`);
} else {
  console.log(`⚠️  未找到：电影天堂`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);

// 显示修改后的相关网站
console.log('\n📋 修改后的网站:');
const relatedTools = movieTools.filter(t => 
  t.name.includes('电影') || t.name.includes('港') || t.name.includes('花子')
);
relatedTools.forEach(t => {
  console.log(`  - ${t.name} - ${t.url}`);
});
