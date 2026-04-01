const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 真正的音乐网站列表
const realMusicSites = [
  { name: '洛雪音乐助手', url: 'https://github.com/lyswhut/lx-music-desktop', desc: '洛雪音乐助手 - 开源音乐播放器' },
  { name: '铜钟音乐', url: 'https://tongzhong.top', desc: '铜钟音乐 - 在线音乐搜索' },
  { name: '音范丝', url: 'https://www.yinfans.me', desc: '音范丝 - 音乐资源搜索' },
  { name: '音乐磁场', url: 'https://www.hifini.com', desc: '音乐磁场 - HiFi 音乐分享' },
  { name: '耳聆网', url: 'https://www.soundsnap.com', desc: '耳聆网 - 声音素材分享' },
  { name: '爱给网', url: 'https://www.aigei.com', desc: '爱给网 - 音效素材下载' },
  { name: '淘声网', url: 'https://www.tosound.com', desc: '淘声网 - 声音素材搜索' },
  { name: '耳聆', url: 'https://www.soundsnap.com', desc: '耳聆 - 声音素材平台' },
  { name: '站长音乐', url: 'https://tool.chinaz.com', desc: '站长音乐 - 在线音乐工具' },
  { name: '音乐转换器', url: 'https://www.aconvert.com', desc: '音乐转换器 - 格式转换工具' },
  { name: '在线剪歌', url: 'https://www.mp3cut.net', desc: '在线剪歌 - 音乐剪辑工具' },
  { name: '音乐标签', url: 'https://www.musicbrainz.org', desc: '音乐标签 - 音乐信息管理' },
  { name: '歌词搜索', url: 'https://www.lrcfinder.com', desc: '歌词搜索 - 在线歌词查找' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加真正的音乐网站
realMusicSites.forEach(site => {
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
      tags: ['音乐', '工具', '在线'],
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

console.log(`\n✅ 添加了 ${addedCount} 个真正的音乐网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
