const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 修复阳光电影网
const yangguang = tools.find(t => t.name === '阳光电影网');
if (yangguang) {
  console.log(`🔧 修复阳光电影网:`);
  console.log(`   旧：${yangguang.url}`);
  console.log(`   新：https://www.ygydy.net`);
  yangguang.url = 'https://www.ygydy.net';
  yangguang.shortDesc = '阳光电影网 - 最新电影电视剧在线观看（新域名）';
  yangguang.description = '阳光电影网 - 提供免费电影电视剧在线观看服务';
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
