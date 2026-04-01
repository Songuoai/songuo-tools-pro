const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log('🔧 修改番茶屋网址:\n');

// 番茶屋更换网址
const fanchaIndex = tools.findIndex(t => t.name === '番茶屋' && t.category === '影视资源');
if (fanchaIndex !== -1) {
  const oldUrl = tools[fanchaIndex].url;
  // 更换为真正的番茶屋域名
  tools[fanchaIndex].url = 'https://www.fanchaii.com';
  tools[fanchaIndex].shortDesc = '番茶屋 - 免费在线动漫观看';
  tools[fanchaIndex].description = '番茶屋 - 提供免费动漫在线观看服务';
  console.log(`🔄 修改：番茶屋`);
  console.log(`   旧网址：${oldUrl}`);
  console.log(`   新网址：https://www.fanchaii.com`);
} else {
  console.log(`⚠️  未找到：番茶屋`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
