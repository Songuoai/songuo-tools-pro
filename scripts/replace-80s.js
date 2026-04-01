const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换片吧为 80S 影视
const index = tools.findIndex(t => t.name === '片吧');
if (index !== -1) {
  console.log(`🔄 替换片吧:`);
  console.log(`   旧：片吧 - https://www.pianba.cc`);
  console.log(`   新：80S 影视 - https://www.80s.tw`);
  
  tools[index] = {
    ...tools[index],
    name: '80S 影视',
    url: 'https://www.80s.tw',
    shortDesc: '80S 影视 - 免费电影下载',
    description: '80S 影视 - 提供免费电影迅雷下载服务',
    slug: '80s-dianying'
  };
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
