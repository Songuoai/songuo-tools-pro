const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换电影港为 555 电影
const index = tools.findIndex(t => t.name === '电影港');
if (index !== -1) {
  console.log(`🔄 替换电影港:`);
  console.log(`   旧：电影港 - https://www.dygang.cc`);
  console.log(`   新：555 电影 - https://www.555dy.com`);
  
  tools[index] = {
    ...tools[index],
    name: '555 电影',
    url: 'https://www.555dy.com',
    shortDesc: '555 电影 - 免费在线电影观看',
    description: '555 电影 - 提供免费电影电视剧在线观看服务',
    slug: '555-dianying'
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
