const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 需要替换的失效网站
const needReplace = [
  'HD 茉莉',
  '电影天堂',
  '喵喵影视',
  '泰小圈',
  '番茶屋',
  '真狼影视',
  '樱花影视',
  '嘀嗒影视',
  '猴子影院',
  '凝视影视'
];

// 备用影视网站
const backupSites = [
  { name: 'LIBVIO', url: 'https://www.libvio.cc', desc: 'LIBVIO - 免费在线影视' },
  { name: '素白白', url: 'https://www.subaibaiys.com', desc: '素白白 - 免费在线观影' },
  { name: '达达龟', url: 'https://www.dadagui.me', desc: '达达龟 - 免费在线电影' },
  { name: '两个 BT', url: 'https://www.bttwo.net', desc: '两个 BT - 电影下载网站' },
  { name: '新片吧', url: 'https://www.xpb.cc', desc: '新片吧 - 最新电影下载' },
  { name: '快看影视', url: 'https://www.kuaikanys.cc', desc: '快看影视 - 免费在线观影' },
  { name: '追剧啦', url: 'https://www.zhuiju.la', desc: '追剧啦 - 免费在线追剧' },
  { name: '厂长资源', url: 'https://www.czzzyy.net', desc: '厂长资源 - 免费影视资源' },
  { name: '片吧', url: 'https://www.pianba.tv', desc: '片吧 - 高清电影下载' },
  { name: '80S 影视', url: 'https://www.80s.tw', desc: '80S 影视 - 免费电影下载' }
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

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
console.log('\n📋 当前影视资源列表:');
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
