const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 更新种子音乐的链接
let updatedCount = 0;
tools = tools.map(tool => {
  if (tool.name === '种子音乐' && tool.category === '在线音乐') {
    console.log(`🔄 更新 种子音乐:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：https://zz123.com`);
    updatedCount++;
    
    return {
      ...tool,
      url: 'https://zz123.com',
      shortDesc: '种子音乐 - 在线听歌下载',
      description: '种子音乐 - 提供在线听歌、MP3 歌曲下载'
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 更新了 ${updatedCount} 个音乐网站链接`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
