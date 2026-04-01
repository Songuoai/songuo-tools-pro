const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 需要替换的失效网站
const needReplace = [
  '铜钟音乐',
  'YouTube Music',
  'SoundCloud',
  'Fly 音乐-Plus',
  '波点音乐'
];

// 备用音乐网站
const backupSites = [
  { name: '酷狗音乐', url: 'https://www.kugou.com', desc: '酷狗音乐 - 海量音乐在线试听' },
  { name: '酷我音乐', url: 'https://www.kuwo.cn', desc: '酷我音乐 - 在线音乐播放器' },
  { name: '咪咕音乐', url: 'https://music.migu.cn', desc: '咪咕音乐 - 中国移动音乐平台' },
  { name: '波点音乐', url: 'https://bodian.kugou.com', desc: '波点音乐 - 个性化推荐音乐' },
  { name: '猫耳 FM', url: 'https://www.missevan.com', desc: '猫耳 FM - 二次元音频平台' }
];

// 执行替换
let replacedCount = 0;
let backupIndex = 0;

tools = tools.map(tool => {
  if (tool.category !== '在线音乐') return tool;
  
  if (needReplace.includes(tool.name) && backupIndex < backupSites.length) {
    const backup = backupSites[backupIndex];
    console.log(`🔄 替换 ${tool.name}:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${backup.name} - ${backup.url}`);
    replacedCount++;
    backupIndex++;
    
    return {
      ...tool,
      name: backup.name,
      url: backup.url,
      shortDesc: backup.desc,
      description: backup.desc,
      slug: backup.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 替换了 ${replacedCount} 个失效网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
