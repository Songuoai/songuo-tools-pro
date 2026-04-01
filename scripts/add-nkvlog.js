const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 需要替换的影视网站
const needReplace = [
  '骚火电影',
  'LIBVIO',
  '动漫岛',
  '2333 动漫',
  '蘑菇影视',
  '80S 影视'
];

// 备用影视网站（包含耐看电影）
const backupSites = [
  { name: '耐看电影', url: 'https://www.nkvlog.com', desc: '耐看电影 - 免费在线电影观看' },
  { name: '耐看电影', url: 'https://www.sdlhl.com', desc: '耐看电影 - 免费在线电影观看' },
  { name: '耐看电影', url: 'https://www.zhlchb.com', desc: '耐看电影 - 免费在线电影观看' },
  { name: '素白白影视', url: 'https://www.subaibai.com', desc: '素白白影视 - 免费在线观影' },
  { name: '腐剧 TV', url: 'https://www.fujutv.cc', desc: '腐剧 TV - 免费在线追剧' },
  { name: '哔嘀影视', url: 'https://www.yjys02.com', desc: '哔嘀影视 - 免费电影下载' }
];

// 执行替换
let replacedCount = 0;
let backupIndex = 0;

tools = tools.map(tool => {
  if (tool.category !== '影视资源') return tool;
  
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
      slug: backup.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + (backupIndex > 1 ? `-${backupIndex}` : '')
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 替换了 ${replacedCount} 个影视网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
