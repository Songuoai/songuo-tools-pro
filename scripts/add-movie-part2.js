const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 第二部分的影视网站
const newMovieSites = [
  { name: '注视影视', url: 'https://gaze.run', desc: '注视影视 - 免费在线观影' },
  { name: 'No 视频', url: 'https://www.novipnoad.cc', desc: 'No 视频 - 主打海外影视资源' },
  { name: '真狼影视', url: 'https://www.zhenlang.cc', desc: '真狼影视 - 免费观看全网影视剧资源' },
  { name: '西瓜影院', url: 'https://sszzyy.com', desc: '西瓜影院 - 可免费在线观看全网高清影视' },
  { name: '影视工厂', url: 'http://2.ysgc.top', desc: '影视工厂 - 免费观看全网影视剧的综合影视' },
  { name: '修罗影视', url: 'https://xl01.com.de', desc: '修罗影视 - 原哔嘀影视，内容丰富的综合型' },
  { name: '在线之家', url: 'https://www.zxzjys.com', desc: '在线之家 - 海外资源为主的老牌知名影视' },
  { name: '厂长资源', url: 'https://www.czzymovie.com', desc: '厂长资源 - 免费影视资源' },
  { name: '泰小圈', url: 'https://txquu.com', desc: '泰小圈 - 专注泰剧的在线追剧网站' },
  { name: 'LibreTV', url: 'https://libretv.liumingye.cn', desc: 'LibreTV - 免费在线视频搜索与观看' }
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
