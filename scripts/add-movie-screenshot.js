const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 老大提供的影视网站
const newMovieSites = [
  { name: '低端影视', url: 'https://ddys.la', desc: '低端影视 - 高清影视在线观看' },
  { name: '剧 OK', url: 'https://juok.cc', desc: '剧 OK - 免费在线影视剧' },
  { name: '青禾影视', url: 'https://tv.qhdaohang.cn', desc: '青禾影视 - 影视聚合导航' },
  { name: '茉小影', url: 'https://www.moxy.top', desc: '茉小影 - 免费在线观影' },
  { name: '努努影院', url: 'https://nnyy.la', desc: '努努影院 - 免费在线影院' },
  { name: '猴影工坊', url: 'https://monkey-flix.com', desc: '猴影工坊 - 免费在线电影大全' },
  { name: '嘀嗒影视', url: 'https://www.didahd.pro', desc: '嘀嗒影视 - 高清影视在线观看' },
  { name: '影猫の仓库', url: 'https://www.ymck.pro', desc: '影猫の仓库 - 免费实用的影视资源搜索神器' },
  { name: '3Q 影视', url: 'https://qqqys.com', desc: '3Q 影视 - 高清、无广、更新快' },
  { name: 'HDmoli', url: 'https://hdmoli.org', desc: 'HDmoli - 高清电影下载' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
newMovieSites.forEach(site => {
  if (!existingNames.includes(site.name.toLowerCase())) {
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
      slug: `tool-${maxId}`
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

console.log(`\n✅ 添加了 ${addedCount} 个新影视网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
