const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 修改飘花电影网为电影天堂
let replacedCount = 0;
tools = tools.map(tool => {
  if (tool.name === '飘花电影网' || tool.name === '飘花雪电影网') {
    console.log(`🔄 修改:`);
    console.log(`   旧名称：${tool.name}`);
    console.log(`   新名称：电影天堂`);
    console.log(`   网址：${tool.url}`);
    replacedCount++;
    
    return {
      ...tool,
      name: '电影天堂',
      shortDesc: '电影天堂 - 免费电影下载',
      description: '电影天堂（飘花电影网）- 提供免费电影迅雷下载服务',
      slug: 'dianying-tiantang'
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 修改了 ${replacedCount} 个工具名称`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
