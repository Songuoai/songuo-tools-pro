const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 修复 MP4 电影 - 使用更多备选域名
const mp4 = tools.find(t => t.name === 'MP4 电影');
if (mp4) {
  console.log(`🔧 修复 MP4 电影:`);
  console.log(`   旧：${mp4.url}`);
  console.log(`   新：https://www.mp4pa.com`);
  mp4.url = 'https://www.mp4pa.com';
  mp4.shortDesc = 'MP4 电影网 - 高清 MP4 电影下载';
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
