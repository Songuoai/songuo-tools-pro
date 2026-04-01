const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 截图中的音乐网站（刘明叶搜索收录的）
const screenshotMusicSites = [
  { name: 'EchoMusic', url: 'https://tool.liumingye.cn/site/189/', desc: 'EchoMusic - 酷狗音乐概念版第三方 PC 客户端' },
  { name: '闪电音乐', url: 'https://tool.liumingye.cn/site/188/', desc: '闪电音乐 - TV 电视端的听歌 APP' },
  { name: 'MoBiMusic', url: 'https://tool.liumingye.cn/site/187/', desc: 'MoBiMusic - 支持多种音源，MV 观看' },
  { name: '洛雪音乐', url: 'https://tool.liumingye.cn/site/186/', desc: '洛雪音乐 - 跨平台音乐播放器' },
  { name: '音狐音乐', url: 'https://tool.liumingye.cn/site/184/', desc: '音狐音乐 - 支持五大平台曲库搜索' },
  { name: 'Fly 音乐-Plus', url: 'https://tool.liumingye.cn/site/183/', desc: 'Fly 音乐-Plus - 支持无损、MV 下载' },
  { name: '只音', url: 'https://tool.liumingye.cn/site/182/', desc: '只音 - 可听歌、看短剧/漫画/小说' },
  { name: '元力音乐', url: 'https://tool.liumingye.cn/site/177/', desc: '元力音乐 - 支持自定义音源' },
  { name: '铜钟', url: 'https://tonzhon.whamon.com', desc: '铜钟 - 一个纯粹的音乐网站' },
  { name: '青听音乐', url: 'https://tool.liumingye.cn/site/143/', desc: '青听音乐 - 免费的音乐 APP' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
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
      slug: `tool-${maxId}`
    });
    console.log(`✅ 添加：${site.name} - ${site.url}`);
    addedCount++;
  } else {
    console.log(`⏭️  已存在：${site.name}`);
    // 更新为刘明叶链接
    const index = tools.findIndex(t => t.name.toLowerCase() === site.name.toLowerCase());
    if (index !== -1 && tools[index].url !== site.url) {
      console.log(`   更新链接：${tools[index].url} → ${site.url}`);
      tools[index].url = site.url;
      tools[index].shortDesc = site.desc;
      tools[index].description = site.desc;
    }
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
