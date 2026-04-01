const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 移除所有在线音乐分类的工具
const removedCount = tools.filter(t => t.category === '在线音乐').length;
tools = tools.filter(t => t.category !== '在线音乐');

console.log(`❌ 移除 ${removedCount} 个旧的在线音乐工具`);

// 新的在线音乐工具列表
const newMusicTools = [
  {
    name: '放屁音乐',
    url: 'https://www.fangpi.net/',
    shortDesc: '免费在线音乐试听下载',
    description: '放屁音乐 - 免费在线音乐试听下载平台',
    tags: ['音乐', '在线', '下载']
  },
  {
    name: '糖果音乐',
    url: 'https://www.tgws.cc/',
    shortDesc: '糖果音乐 - 在线音乐平台',
    description: '糖果音乐 - 免费在线音乐试听',
    tags: ['音乐', '在线']
  },
  {
    name: '爱玩音乐',
    url: 'https://www.22a5.com/',
    shortDesc: '爱玩音乐 - 在线音乐试听',
    description: '爱玩音乐 - 免费在线音乐平台',
    tags: ['音乐', '在线']
  },
  {
    name: 'ACG 漫音社',
    url: 'https://www.acgjc.com/',
    shortDesc: 'ACG 动漫音乐社区',
    description: 'ACG 漫音社 - 专注动漫音乐分享',
    tags: ['音乐', 'ACG', '动漫']
  },
  {
    name: '我爱无损',
    url: 'http://www.52wusun.com/',
    shortDesc: '无损音乐下载',
    description: '我爱无损 - 高品质无损音乐下载',
    tags: ['音乐', '无损', '下载']
  },
  {
    name: '布谷音乐',
    url: 'https://www.buguyy.top/',
    shortDesc: '布谷音乐 - 在线音乐平台',
    description: '布谷音乐 - 免费在线音乐试听',
    tags: ['音乐', '在线']
  },
  {
    name: '凤梨音乐',
    url: 'https://www.flmp3.pro/',
    shortDesc: '凤梨音乐 - MP3 下载',
    description: '凤梨音乐 - 免费 MP3 音乐下载',
    tags: ['音乐', 'MP3', '下载']
  },
  {
    name: '魔石音乐',
    url: 'https://music.yym4.com/',
    shortDesc: '魔石音乐 - 在线试听',
    description: '魔石音乐 - 免费在线音乐试听平台',
    tags: ['音乐', '在线']
  },
  {
    name: '鲸鱼无损',
    url: 'https://www.jywav.com',
    shortDesc: '鲸鱼无损 - 高品质音乐',
    description: '鲸鱼无损 - 无损音乐下载平台',
    tags: ['音乐', '无损', '下载']
  },
  {
    name: 'SPlayer',
    url: 'https://splayer.uncley.cc/',
    shortDesc: 'SPlayer - 简约音乐播放器',
    description: 'SPlayer - 简约风格的在线音乐播放器',
    tags: ['音乐', '播放器', '在线']
  }
];

// 添加新工具
let idCounter = Math.max(...tools.map(t => t.id), 0) + 1;
newMusicTools.forEach(tool => {
  const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  tools.push({
    id: idCounter++,
    name: tool.name,
    url: tool.url,
    logoUrl: '',
    category: '在线音乐',
    priceType: 'free',
    shortDesc: tool.shortDesc,
    description: tool.description,
    tags: tool.tags,
    status: 'published',
    views: 0,
    rating: 0,
    slug: slug
  });
  console.log(`✅ 添加：${tool.name} - ${tool.url}`);
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
console.log(`\n🎵 在线音乐分类：${newMusicTools.length} 个工具`);
