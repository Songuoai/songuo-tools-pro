const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 截图中的音乐网站（从老大提供的图片）
const screenshotMusicSites = [
  { name: 'EchoMusic', url: 'https://echomusic.cn', desc: 'EchoMusic - 酷狗音乐概念版第三方 PC 客户端' },
  { name: '闪电音乐', url: 'https://www.sdmusic.cn', desc: '闪电音乐 - TV 电视端的听歌 APP' },
  { name: 'MoBiMusic', url: 'https://mobimusic.cn', desc: 'MoBiMusic - 支持多种音源，MV 观看的音乐 APP' },
  { name: '洛雪音乐', url: 'https://lxmusic.toside.cn', desc: '洛雪音乐 - 支持 Windows、macOS、Android 的音乐播放器' },
  { name: '音狐音乐', url: 'https://www.yinhumusic.com', desc: '音狐音乐 - 支持五大平台曲库搜索的歌曲 APP' },
  { name: 'Fly 音乐-Plus', url: 'https://flymusic.plus', desc: 'Fly 音乐-Plus - 支持无损、MV 下载的音乐 APP' },
  { name: '只音', url: 'https://www.zhiyin.me', desc: '只音 - 可听歌、看短剧/漫画/小说、追星的音乐 APP' },
  { name: '元力音乐', url: 'https://www.yuanlimusic.com', desc: '元力音乐 - 支持自定义音源、各大主流歌单' },
  { name: '铜钟', url: 'https://www.tongzhong.me', desc: '铜钟 - 一个纯粹的音乐网站，专注在线听歌' },
  { name: '青听音乐', url: 'https://www.qingtingmusic.com', desc: '青听音乐 - 免费的音乐 APP，支持四大平台' },
  { name: 'SPlayer', url: 'https://splayer.uncley.cc', desc: 'SPlayer - 网易云音乐第三方播放器' },
  { name: 'Alger Music', url: 'https://algermusic.cn', desc: 'Alger Music - 高颜值的网易云音乐第三方播放器' },
  { name: '布谷音乐', url: 'https://www.buguyy.top', desc: '布谷音乐 - 提供 MP3、WAV、Flac 等格式的音乐' },
  { name: '昔枫音乐盒', url: 'https://xifengmusic.cn', desc: '昔枫音乐盒 - 以网易云为主的网页版免费音乐播放器' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加截图中的音乐网站
screenshotMusicSites.forEach(site => {
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

console.log(`\n✅ 添加了 ${addedCount} 个截图中的音乐网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
