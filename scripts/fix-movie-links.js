const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 影视资源失效链接替换
const movieReplacements = [
  {
    name: '阳光电影网',
    oldUrl: 'https://www.ygdy8.com',
    newUrl: 'https://www.ygydy.cc',
    newDesc: '阳光电影网 - 最新电影电视剧在线观看'
  },
  {
    name: 'MP4 电影',
    oldUrl: 'https://www.mp4kan.com',
    newUrl: 'https://www.mp4dy.com',
    newDesc: 'MP4 电影网 - 高清 MP4 电影下载'
  },
  {
    name: '看片狂人',
    oldUrl: 'https://www.kpkuang.com',
    newUrl: 'https://www.kpkuang.vip',
    newDesc: '看片狂人 - 免费在线电影观看'
  },
  {
    name: '动漫岛',
    oldUrl: 'https://www.dmd84.com',
    newUrl: 'https://www.dmd9.com',
    newDesc: '动漫岛 - 在线动漫观看'
  },
  {
    name: '蘑菇影视',
    oldUrl: 'https://www.moguys.com',
    newUrl: 'https://www.moguys.vip',
    newDesc: '蘑菇影视 - 免费电影电视剧在线观看'
  },
  {
    name: '高清拉',
    oldUrl: 'https://gaoqing.la',
    newUrl: 'https://gaoqing.la',
    newDesc: '高清拉 - 高清电影下载（保留，可能临时故障）'
  }
];

// 更新工具
let updatedCount = 0;
const updatedTools = tools.map(tool => {
  if (tool.category !== '影视资源') {
    return tool;
  }
  
  const replacement = movieReplacements.find(r => r.name === tool.name);
  if (replacement) {
    console.log(`🔄 ${tool.name}:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${replacement.newUrl}`);
    updatedCount++;
    
    return {
      ...tool,
      url: replacement.newUrl,
      shortDesc: replacement.newDesc,
      description: replacement.newDesc,
      _fixed: true
    };
  }
  return tool;
});

console.log(`\n✅ 修复了 ${updatedCount} 个影视资源链接`);

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools: updatedTools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`💾 已保存到：${outputPath}`);

// 显示当前影视资源列表
console.log('\n📋 影视资源分类工具列表：');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const movieTools = updatedTools.filter(t => t.category === '影视资源');
movieTools.forEach((t, i) => {
  const status = t._fixed ? '🆕' : '✅';
  console.log(`${status} ${i + 1}. ${t.name} - ${t.url.split('/')[2]}`);
});
