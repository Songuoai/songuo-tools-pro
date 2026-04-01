const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 新的影视网站列表
const newSites = [
  { name: '低端影视', url: 'https://ddys.la', desc: '低端影视 - 高清影视在线观看' },
  { name: '剧 OK', url: 'https://juok.cc', desc: '剧 OK - 免费在线影视剧' },
  { name: '轻虎导航', url: 'https://tv.qhdaohang.cn', desc: '轻虎导航 - 影视聚合导航' },
  { name: '乐兔影视', url: 'https://www.letu.me', desc: '乐兔影视 - 免费在线观影' },
  { name: '真狼影视', url: 'https://www.zhenlang.cc', desc: '真狼影视 - 免费观看全网影视剧资源' },
  { name: '樱花影视', url: 'https://www.ymck.pro', desc: '樱花影视 - 免费在线电影观看' },
  { name: '嘀嗒影视', url: 'https://www.didahd.pro', desc: '嘀嗒影视 - 高清影视在线观看' },
  { name: '猴子影院', url: 'https://monkey-flix.com', desc: '猴子影院 - 免费在线电影大全' },
  { name: '凝视影视', url: 'https://gaze.run', desc: '凝视影视 - 免费在线观影' },
  { name: '在线之家', url: 'https://www.zxzjys.com', desc: '在线之家 - 海外资源为主的影视网站' },
  { name: '腾讯趣', url: 'https://txquu.com', desc: '腾讯趣 - 免费在线影视' },
  { name: '三石影视', url: 'https://sszzyy.com', desc: '三石影视 - 高清影视在线观看' },
  { name: '努努影院', url: 'https://nnyy.la', desc: '努努影院 - 免费在线影院' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
newSites.forEach(site => {
  // 检查是否已存在同名或同网址的工具
  const exists = tools.find(t => 
    t.name.toLowerCase() === site.name.toLowerCase() || 
    t.url === site.url
  );
  
  if (!exists) {
    maxId++;
    tools.push({
      id: maxId,
      name: site.name,
      url: site.url,
      logoUrl: '',
      category: '影视资源',
      priceType: 'free',
      shortDesc: site.desc,
      description: site.desc,
      tags: ['影视', '在线', '免费'],
      status: 'published',
      views: 0,
      rating: 0,
      slug: site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    console.log(`✅ 添加：${site.name} - ${site.url}`);
    addedCount++;
  } else {
    console.log(`⏭️  已存在：${site.name}`);
  }
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 添加了 ${addedCount} 个新网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
