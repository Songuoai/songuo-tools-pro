const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 更新音乐网站的链接为刘明叶子页面
const musicUpdates = [
  { name: 'EchoMusic', newUrl: 'https://tool.liumingye.cn/site/189/', desc: 'EchoMusic - 酷狗音乐概念版第三方 PC 客户端' },
  { name: '闪电音乐', newUrl: 'https://tool.liumingye.cn/site/188/', desc: '闪电音乐 - TV 电视端的听歌 APP' },
  { name: 'MoBiMusic', newUrl: 'https://tool.liumingye.cn/site/187/', desc: 'MoBiMusic - 支持多种音源，MV 观看的音乐 APP' },
  { name: '洛雪音乐', newUrl: 'https://tool.liumingye.cn/site/186/', desc: '洛雪音乐 - 跨平台音乐播放器' },
  { name: '音狐音乐', newUrl: 'https://tool.liumingye.cn/site/184/', desc: '音狐音乐 - 支持五大平台曲库搜索' },
  { name: 'Fly 音乐-Plus', newUrl: 'https://tool.liumingye.cn/site/183/', desc: 'Fly 音乐-Plus - 支持无损、MV 下载' },
  { name: '只音', newUrl: 'https://tool.liumingye.cn/site/182/', desc: '只音 - 可听歌、看短剧/漫画/小说' },
  { name: '元力音乐', newUrl: 'https://tool.liumingye.cn/site/177/', desc: '元力音乐 - 支持自定义音源' },
  { name: '铜钟', newUrl: 'https://tonzhon.whamon.com', desc: '铜钟 - 一个纯粹的音乐网站' },
  { name: '青听音乐', newUrl: 'https://tool.liumingye.cn/site/143/', desc: '青听音乐 - 免费的音乐 APP' }
];

// 更新网站链接
let updatedCount = 0;
tools = tools.map(tool => {
  if (tool.category !== '在线音乐') return tool;
  
  const update = musicUpdates.find(u => u.name === tool.name);
  if (update) {
    console.log(`🔄 更新 ${tool.name}:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${update.newUrl}`);
    updatedCount++;
    
    return {
      ...tool,
      url: update.newUrl,
      shortDesc: update.desc,
      description: update.desc
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
