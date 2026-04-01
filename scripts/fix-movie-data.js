const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 移除 NovoplN（分类不对，不是影视资源）
tools = tools.filter(t => {
  if (t.name === 'NovoplN' && t.category === '影视资源') {
    console.log('❌ 移除：NovoplN（分类不对）');
    return false;
  }
  return true;
});

// 修复 MP4 电影链接
const mp4Movie = tools.find(t => t.name === 'MP4 电影');
if (mp4Movie) {
  console.log(`🔧 修复 MP4 电影：${mp4Movie.url} → https://www.mp4dy.cc`);
  mp4Movie.url = 'https://www.mp4dy.cc';
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 完成修复`);
console.log(`当前影视资源工具数：${tools.filter(t => t.category === '影视资源').length}`);
