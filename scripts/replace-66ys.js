const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换片源网为 66 影视
const index = tools.findIndex(t => t.name === '片源网');
if (index !== -1) {
  console.log(`🔄 替换片源网:`);
  console.log(`   旧：片源网 - https://www.pianyuan.org`);
  console.log(`   新：66 影视 - https://www.66ys.cc`);
  
  tools[index] = {
    ...tools[index],
    name: '66 影视',
    url: 'https://www.66ys.cc',
    shortDesc: '66 影视 - 免费电影在线观看',
    description: '66 影视 - 提供免费电影电视剧在线观看服务',
    slug: '66-ys'
  };
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示当前影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
