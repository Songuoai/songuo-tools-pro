const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换 MP4 电影为 飘花电影网
const index = tools.findIndex(t => t.name === 'MP4 电影');
if (index !== -1) {
  console.log(`🔄 替换 MP4 电影:`);
  console.log(`   旧：MP4 电影 - https://www.mp4pa.com`);
  console.log(`   新：飘花电影网 - https://www.dy2018.com`);
  
  tools[index] = {
    ...tools[index],
    name: '飘花电影网',
    url: 'https://www.dy2018.com',
    shortDesc: '飘花电影网 - 免费电影下载',
    description: '飘花电影网 - 提供免费电影迅雷下载服务',
    slug: 'piaohua'
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
