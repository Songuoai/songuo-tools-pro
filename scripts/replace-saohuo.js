const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换真不卡影视为 骚火电影
const index = tools.findIndex(t => t.name === '真不卡影视');
if (index !== -1) {
  console.log(`🔄 替换真不卡影视:`);
  console.log(`   旧：真不卡影视 - https://www.zbkk.net`);
  console.log(`   新：骚火电影 - https://saohuo.vip`);
  
  tools[index] = {
    ...tools[index],
    name: '骚火电影',
    url: 'https://saohuo.vip',
    shortDesc: '骚火电影 - 免费在线电影观看',
    description: '骚火电影 - 提供免费电影电视剧在线观看服务',
    slug: 'saohuo-dianying'
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
