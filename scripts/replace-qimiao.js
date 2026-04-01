const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换奇妙影视为真不卡影视
const index = tools.findIndex(t => t.name === '奇妙影视');
if (index !== -1) {
  console.log(`🔄 替换奇妙影视:`);
  console.log(`   旧：奇妙影视 - https://qimiao.com`);
  console.log(`   新：真不卡影视 - https://www.zbkk.net`);
  
  tools[index] = {
    ...tools[index],
    name: '真不卡影视',
    url: 'https://www.zbkk.net',
    shortDesc: '真不卡影视 - 免费在线电影观看',
    description: '真不卡影视 - 提供免费电影电视剧在线观看服务',
    slug: 'zhenbuka'
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
