const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 恢复原来的网站名称和域名
const restorations = [
  {
    oldName: 'NFM 影视',
    newName: '优酷视频',
    url: 'https://www.youku.com',
    desc: '优酷视频 - 综合视频平台'
  },
  {
    oldName: '达达龟',
    newName: '花子动漫',
    url: 'https://huazidm.com',
    desc: '花子动漫 - 在线动漫观看'
  },
  {
    oldName: '两个 BT',
    newName: '乐兔影视',
    url: 'https://letu.me',
    desc: '乐兔影视 - 免费在线观影'
  },
  {
    oldName: '影视工场',
    newName: '66 影视',
    url: 'https://www.66ys.cc',
    desc: '66 影视 - 免费在线电影观看'
  },
  {
    oldName: '厂长资源',
    newName: '电影天堂',
    url: 'https://www.dy2018.com',
    desc: '电影天堂 - 免费电影下载'
  },
  {
    oldName: '追剧啦',
    newName: '看片狂人',
    url: 'https://www.kpkuang.com',
    desc: '看片狂人 - 免费在线电影观看'
  },
  {
    oldName: '快看影视',
    newName: '茶杯狐',
    url: 'https://cupfox.app',
    desc: '茶杯狐 - 影视聚合搜索'
  }
];

// 执行恢复
let restoredCount = 0;
tools = tools.map(tool => {
  if (tool.category !== '影视资源') return tool;
  
  const restoration = restorations.find(r => r.oldName === tool.name);
  if (restoration) {
    console.log(`🔄 恢复 ${restoration.oldName} → ${restoration.newName}:`);
    console.log(`   网址：${restoration.url}`);
    restoredCount++;
    
    return {
      ...tool,
      name: restoration.newName,
      url: restoration.url,
      shortDesc: restoration.desc,
      description: restoration.desc,
      slug: restoration.newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 恢复了 ${restoredCount} 个原来的网站名称`);
console.log(`💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
