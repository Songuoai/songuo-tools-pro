const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 真正失效的链接替换（域名不存在/已关闭）
const brokenReplacements = [
  {
    name: 'NovoplN',
    oldUrl: 'https://novopln.site',
    newUrl: 'https://www.novatools.cn',
    newDesc: 'NOVATOOLS - AI 工具导航平台'
  },
  {
    name: '阳光电影网',
    oldUrl: 'https://www.ygydy.com',
    newUrl: 'https://www.ygdy8.com',
    newDesc: '阳光电影网 - 最新电影下载'
  },
  {
    name: 'MP4 电影',
    oldUrl: 'https://www.mp4pa.com',
    newUrl: 'https://www.mp4kan.com',
    newDesc: 'MP4 电影网 - 高清电影下载'
  },
  {
    name: '看片狂人',
    oldUrl: 'https://www.kpkuang.top',
    newUrl: 'https://www.kpkuang.com',
    newDesc: '看片狂人 - 免费在线观影'
  },
  {
    name: '动漫岛',
    oldUrl: 'https://www.dmd85.com',
    newUrl: 'https://www.dmd84.com',
    newDesc: '动漫岛 - 在线动漫观看'
  },
  {
    name: '2333 动漫',
    oldUrl: 'https://www.233dm.cc',
    newUrl: 'https://www.233dm.net',
    newDesc: '2333 动漫 - 免费在线动漫'
  },
  {
    name: '蘑菇影视',
    oldUrl: 'https://www.mgslb.com',
    newUrl: 'https://www.moguys.com',
    newDesc: '蘑菇影视 - 免费影视观看'
  },
  {
    name: '高清拉',
    oldUrl: 'https://gaoqing.la',
    newUrl: 'https://gaoqing.la',
    newDesc: '高清拉 - 高清电影下载'
  },
  {
    name: '证件照在线生成',
    oldUrl: 'https://www.remove.bg/zh/remove-background',
    newUrl: 'https://www.cutout.pro/zh-CN/remove-background',
    newDesc: 'Cutout.pro - 在线证件照制作'
  },
  {
    name: 'TripoAI',
    oldUrl: 'https://www.tripo3d.ai',
    newUrl: 'https://www.tripo3d.ai',
    newDesc: 'Tripo AI - 3D 模型生成'
  }
];

// 更新工具
let updatedCount = 0;
const updatedTools = tools.map(tool => {
  const replacement = brokenReplacements.find(r => r.name === tool.name);
  if (replacement) {
    console.log(`🔄 ${tool.name}:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${replacement.newUrl}`);
    updatedCount++;
    
    return {
      ...tool,
      url: replacement.newUrl,
      description: replacement.newDesc || tool.description,
      _fixed: true
    };
  }
  return tool;
});

console.log(`\n✅ 修复了 ${updatedCount} 个失效链接`);

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools: updatedTools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`💾 已保存到：${outputPath}`);

// 显示仍可能失效的（国际服务）
console.log('\n⚠️  以下国际服务链接有效，但国内访问可能超时（无需修改）：');
const internationalServices = [
  'Gemini', 'Perplexity', 'Character.ai', 'Poe', 'You.com',
  'Midjourney', 'Canva 可画', 'Kapwing', 'Google Docs', 'ChatGPT',
  'Stable Diffusion', 'Leonardo.ai', 'GitHub', 'Stack Overflow',
  'V2EX', 'Phind', 'Hugging Chat', 'TripoAI'
];
internationalServices.forEach(name => console.log(`  - ${name}`));
