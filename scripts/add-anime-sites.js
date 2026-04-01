const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 第三部分的动漫网站
const newAnimeSites = [
  { name: '樱花动漫', url: 'http://www.yinghuajinju.com', desc: '樱花动漫 - 完全免费、无须注册、高速播放' },
  { name: '番茶屋', url: 'https://www.fanchawu.cc', desc: '番茶屋 - 日番、国番、美番在线观看' },
  { name: '花子动漫', url: 'https://www.huazidm.com', desc: '花子动漫 - 在线动漫观看' },
  { name: '动漫窝', url: 'https://www.dmwo.cc', desc: '动漫窝 - 提供国漫、日番、美漫的在线追' },
  { name: '西瓜卡通', url: 'https://cn.xgcartoon.com', desc: '西瓜卡通 - 4K 超清日番、国番、美番在线' },
  { name: '风铃动漫', url: 'https://www.mutedm.com', desc: '风铃动漫 - 日本动漫资源在线观看' },
  { name: 'E 站弹幕网', url: 'https://www.ezdmw.site', desc: 'E 站弹幕网 - 在线以弹幕为主的二次元分享' },
  { name: 'MuteFun 动漫', url: 'https://www.mutedm.com', desc: 'MuteFun 动漫 - 日本动漫为主的免费在线观' },
  { name: 'Animoe 动漫', url: 'https://animoe.org', desc: 'Animoe 动漫 - 提供日本动漫在线观看的追番' },
  { name: '佩可动漫', url: 'https://acg.pekolove.net', desc: '佩可动漫 - 以日本动漫在线观看为主' }
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
