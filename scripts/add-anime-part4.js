const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 第四部分的动漫网站
const newAnimeSites = [
  { name: '酱紫社动漫', url: 'https://www.jzsdm1.com', desc: '酱紫社动漫 - 日番、美番、真人番剧为主的' },
  { name: 'Anime1.me', url: 'https://anime1.me', desc: 'Anime1.me - 日番神站，界面简洁、更新速' },
  { name: 'girigiri 爱动漫', url: 'https://anime.girigirilove.icu', desc: 'girigiri 爱动漫 - 日番、美番为主的番剧影视' },
  { name: 'D 站 - 第五弹', url: 'https://www.5dm.link', desc: 'D 站第五弹 - 专注提供日本动漫免费在线观' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
newAnimeSites.forEach(site => {
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
      tags: ['动漫', '在线', '免费'],
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

console.log(`\n✅ 添加了 ${addedCount} 个新动漫网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
