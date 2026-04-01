const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 新增的音乐网站
const newMusicSites = [
  { name: '酷我音乐', url: 'https://www.kuwo.cn', desc: '酷我音乐 - 在线音乐播放器' },
  { name: 'QQ 音乐', url: 'https://y.qq.com', desc: 'QQ 音乐 - 海量正版音乐' },
  { name: '网易云音乐', url: 'https://music.163.com', desc: '网易云音乐 - 音乐社交平台' },
  { name: '咪咕音乐', url: 'https://music.migu.cn', desc: '咪咕音乐 - 中国移动音乐平台' },
  { name: '波点音乐', url: 'https://bodian.kugou.com', desc: '波点音乐 - 个性化推荐音乐' },
  { name: '猫耳 FM', url: 'https://www.missevan.com', desc: '猫耳 FM - 二次元音频平台' },
  { name: '荔枝 FM', url: 'https://www.lizhi.fm', desc: '荔枝 FM - 人人都是主播' },
  { name: '喜马拉雅', url: 'https://www.ximalaya.com', desc: '喜马拉雅 - 音频分享平台' },
  { name: '蜻蜓 FM', url: 'https://www.qingting.fm', desc: '蜻蜓 FM - 在线收音机' },
  { name: '懒人听书', url: 'https://www.lrts.me', desc: '懒人听书 - 有声小说平台' },
  { name: '5sing 音乐', url: 'https://5sing.kugou.com', desc: '5sing 音乐 - 原创音乐基地' },
  { name: '音悦台', url: 'https://www.yinyuetai.com', desc: '音悦台 - 高清 MV 平台' },
  { name: 'Bilibili 音乐', url: 'https://www.bilibili.com', desc: 'B 站音乐区 - 二次元音乐' },
  { name: 'YouTube Music', url: 'https://music.youtube.com', desc: 'YouTube Music - 谷歌音乐服务' },
  { name: 'SoundCloud', url: 'https://soundcloud.com', desc: 'SoundCloud - 音乐分享平台' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
newMusicSites.forEach(site => {
  if (!existingNames.includes(site.name.toLowerCase())) {
    maxId++;
    tools.push({
      id: maxId,
      name: site.name,
      url: site.url,
      logoUrl: '',
      category: '在线音乐',
      priceType: 'free',
      shortDesc: site.desc,
      description: site.desc,
      tags: ['音乐', '播放器', '在线'],
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

console.log(`\n✅ 添加了 ${addedCount} 个新音乐网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
