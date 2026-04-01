const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 新的影视网站列表（从截图整理）
const newMovieSites = [
  { name: '剧 OK', url: 'https://www.juok.cc', desc: '剧 OK - 可观看全网影视剧的在线追剧网站' },
  { name: '青禾影视', url: 'https://www.qinghetv.com', desc: '青禾影视 - 海量高清视频在线观看' },
  { name: '菜小影', url: 'https://www.caixiaoying.com', desc: '菜小影 - 海量高清视频在线观看' },
  { name: '努努影院', url: 'https://www.nnyy.in', desc: '努努影院 - 免费在线影院' },
  { name: '猴影工坊', url: 'https://www.houying.tv', desc: '猴影工坊 - 免费在线电影大全' },
  { name: '喵喵影视', url: 'https://www.miaomiaotv.com', desc: '喵喵影视 - 超清秒播体验' },
  { name: '影猫的仓库', url: 'https://www.yingmao.net', desc: '影猫的仓库 - 免费实用的影视资源搜索神器' },
  { name: '3Q 影视', url: 'https://www.3qys.com', desc: '3Q 影视 - 高清、无广、更新快' },
  { name: '注视影视', url: 'https://www.zsmp8.com', desc: '注视影视 - 海外影视剧、国内口碑影视' },
  { name: 'No 视频', url: 'https://www.novideo.cc', desc: 'No 视频 - 主打海外影视资源' },
  { name: '真狼影视', url: 'https://www.zhenlang.tv', desc: '真狼影视 - 免费观看全网影视剧资源' },
  { name: '西瓜影院', url: 'https://www.xiguatv.cc', desc: '西瓜影院 - 可免费在线观看全网高清影视' },
  { name: '影视工厂', url: 'https://www.ysgc.cc', desc: '影视工厂 - 免费观看全网影视剧的综合影视' },
  { name: '修罗影视', url: 'https://www.xiuluotv.com', desc: '修罗影视 - 原哔嘀影视，内容丰富的综合型' },
  { name: '在线之家', url: 'https://www.zxzjtv.com', desc: '在线之家 - 海外资源为主的老牌知名影视' },
  { name: '泰小圈', url: 'https://www.taixiaoquan.com', desc: '泰小圈 - 专注泰剧的在线追剧网站' },
  { name: 'LibreTV', url: 'https://libretv.me', desc: 'LibreTV - 免费在线视频搜索与观看' }
];

// 新的动漫网站列表
const newAnimeSites = [
  { name: '樱花动漫', url: 'https://www.yhdmba.com', desc: '樱花动漫 - 完全免费、无须注册、高速播放' },
  { name: '番茶屋', url: 'https://www.fanchawu.com', desc: '番茶屋 - 日番、国番、美番在线观看' },
  { name: '动漫窝', url: 'https://www.dmwwo.com', desc: '动漫窝 - 提供国漫、日番、美漫的在线追' },
  { name: '西瓜卡通', url: 'https://www.xiguakt.com', desc: '西瓜卡通 - 4K 超清日番、国番、美番在线' },
  { name: '风铃动漫', url: 'https://www.fenglingdm.com', desc: '风铃动漫 - 日本动漫资源在线观看' },
  { name: 'E 站弹幕网', url: 'https://www.edmudm.com', desc: 'E 站弹幕网 - 在线以弹幕为主的二次元分享' },
  { name: 'MuteFun 动漫', url: 'https://www.mutedm.com', desc: 'MuteFun 动漫 - 日本动漫为主的免费在线观' },
  { name: 'Animoe 动漫', url: 'https://www.animoe.tv', desc: 'Animoe 动漫 - 提供日本动漫在线观看的追番' },
  { name: '佩可动漫', url: 'https://www.pekomoe.com', desc: '佩可动漫 - 以日本动漫在线观看为主' },
  { name: '酱紫社动漫', url: 'https://www.jiangzishe.com', desc: '酱紫社动漫 - 日番、美番、真人番剧为主的' },
  { name: 'Anime1.me', url: 'https://www.anime1.me', desc: 'Anime1.me - 日番神站，界面简洁、更新速' },
  { name: 'girigiri 爱动漫', url: 'https://www.girigiri.me', desc: 'girigiri 爱动漫 - 日番、美番为主的番剧影视' },
  { name: 'D 站 - 第五弹', url: 'https://www.dilidili5.com', desc: 'D 站第五弹 - 专注提供日本动漫免费在线观' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加影视网站
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
      slug: site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    console.log(`✅ 添加影视：${site.name}`);
    addedCount++;
  } else {
    console.log(`⏭️  已存在：${site.name}`);
  }
});

// 添加动漫网站
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
      slug: site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    console.log(`✅ 添加动漫：${site.name}`);
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
