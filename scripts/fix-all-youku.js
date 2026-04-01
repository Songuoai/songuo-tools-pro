const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log('🔧 彻底更换失效网站:\n');

// 需要更换的网站列表（打开是优酷的）
const needFix = [
  {
    oldName: '低端影视',
    oldUrl: 'https://ddys.run',
    newName: '低端影视',
    newUrl: 'https://ddys.tv',
    desc: '低端影视 - 高清影视在线观看'
  },
  {
    oldName: 'HD 茉莉',
    oldUrl: 'https://www.hdmoli.cc',
    newName: 'HD 茉莉',
    newUrl: 'https://www.hdmoli.com',
    desc: 'HD 茉莉 - 高清电影下载'
  },
  {
    oldName: '乐兔影视',
    oldUrl: 'https://www.letu.me',
    newName: '乐兔影视',
    newUrl: 'https://www.letv.com',
    desc: '乐兔影视 - 免费在线观影'
  },
  {
    oldName: '真狼影视',
    oldUrl: 'https://www.zhenlang.cc',
    newName: '真狼影视',
    newUrl: 'https://www.zhenlang.tv',
    desc: '真狼影视 - 免费观看全网影视剧资源'
  },
  {
    oldName: '樱花影视',
    oldUrl: 'https://www.ymck.pro',
    newName: '樱花影视',
    newUrl: 'https://www.yhdmba.com',
    desc: '樱花影视 - 免费在线电影观看'
  },
  {
    oldName: '嘀嗒影视',
    oldUrl: 'https://www.didahd.pro',
    newName: '嘀嗒影视',
    newUrl: 'https://www.didadm.com',
    desc: '嘀嗒影视 - 高清影视在线观看'
  },
  {
    oldName: '猴子影院',
    oldUrl: 'https://monkey-flix.com',
    newName: '猴子影院',
    newUrl: 'https://www.houying.tv',
    desc: '猴子影院 - 免费在线电影大全'
  },
  {
    oldName: '凝视影视',
    oldUrl: 'https://gaze.run',
    newName: '凝视影视',
    newUrl: 'https://www.zsmp8.com',
    desc: '凝视影视 - 免费在线观影'
  },
  {
    oldName: '腾讯趣',
    oldUrl: 'https://txquu.com',
    newName: '腾讯趣',
    newUrl: 'https://v.qq.com',
    desc: '腾讯趣 - 腾讯视频导航'
  },
  {
    oldName: '三石影视',
    oldUrl: 'https://sszzyy.com',
    newName: '三石影视',
    newUrl: 'https://www.360kan.com',
    desc: '三石影视 - 360 影视导航'
  }
];

// 执行替换
let fixedCount = 0;
tools = tools.map(tool => {
  if (tool.category !== '影视资源') return tool;
  
  const fix = needFix.find(f => f.oldName === tool.name);
  if (fix) {
    console.log(`🔄 修改：${fix.oldName}`);
    console.log(`   旧网址：${fix.oldUrl}`);
    console.log(`   新网址：${fix.newUrl}`);
    fixedCount++;
    
    return {
      ...tool,
      url: fix.newUrl,
      shortDesc: fix.desc,
      description: fix.desc,
      slug: fix.newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 修改了 ${fixedCount} 个网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
