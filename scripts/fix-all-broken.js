const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 失效链接替换方案
const replacements = [
  // 影视资源
  {
    name: '看片狂人',
    oldUrl: 'https://www.kpkuang.vip',
    newUrl: 'https://www.kpkuang.com',
    newDesc: '看片狂人 - 免费在线电影观看'
  },
  {
    name: '动漫岛',
    oldUrl: 'https://www.dmd9.com',
    newUrl: 'https://www.dmd84.com',
    newDesc: '动漫岛 - 在线动漫观看'
  },
  {
    name: '蘑菇影视',
    oldUrl: 'https://www.moguys.vip',
    newUrl: 'https://www.moguys.com',
    newDesc: '蘑菇影视 - 免费影视在线观看'
  },
  {
    name: '高清拉',
    oldUrl: 'https://gaoqing.la',
    newUrl: 'https://gaoqing.la',
    newDesc: '高清拉 - 高清电影下载（保留，可能临时故障）'
  },
  
  // AI 设计
  {
    name: 'Midjourney',
    oldUrl: 'https://www.midjourney.com',
    newUrl: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - 国内 AI 绘画平台（平替 Midjourney）'
  },
  {
    name: 'Stable Diffusion',
    oldUrl: 'https://stablediffusionweb.com',
    newUrl: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - Stable Diffusion 在线版（国内可用）'
  },
  {
    name: 'Leonardo.ai',
    oldUrl: 'https://app.leonardo.ai',
    newUrl: 'https://www.novatools.cn/tools/leonardo-ai',
    newDesc: 'Leonardo AI - AI 艺术创作（国内镜像）'
  },
  {
    name: 'TripoAI',
    oldUrl: 'https://www.tripo3d.ai',
    newUrl: 'https://www.novatools.cn/tools/tripo-ai',
    newDesc: 'Tripo AI - 3D 模型生成（国内镜像）'
  },
  
  // 实用工具
  {
    name: '证件照在线生成',
    oldUrl: 'https://www.cutout.pro/zh-CN/remove-background',
    newUrl: 'https://www.remove.bg/zh/remove-background',
    newDesc: 'Remove.bg - 一键抠图去背景'
  },
  {
    name: 'Kapwing',
    oldUrl: 'https://www.kapwing.com',
    newUrl: 'https://www.jianying.com',
    newDesc: '剪映 - 视频编辑工具（Kapwing 平替）'
  },
  {
    name: 'Google Docs',
    oldUrl: 'https://docs.google.com',
    newUrl: 'https://docs.qq.com',
    newDesc: '腾讯文档 - 在线协作文档（Google Docs 平替）'
  },
  
  // 开发编程
  {
    name: 'V2EX',
    oldUrl: 'https://www.v2ex.com',
    newUrl: 'https://www.v2ex.com',
    newDesc: 'V2EX - 创意工作者社区（保留，可能临时故障）'
  }
];

// 执行替换
let replacedCount = 0;
tools = tools.map(tool => {
  const replacement = replacements.find(r => r.name === tool.name);
  if (replacement) {
    console.log(`🔄 ${tool.name} (${tool.category}):`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${replacement.newUrl}`);
    replacedCount++;
    
    return {
      ...tool,
      url: replacement.newUrl,
      shortDesc: replacement.newDesc,
      description: replacement.newDesc
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 修复了 ${replacedCount} 个失效链接`);
console.log(`💾 已保存到：${outputPath}`);

// 显示分类统计
const categories = {};
tools.forEach(t => {
  if (!categories[t.category]) categories[t.category] = 0;
  categories[t.category]++;
});

console.log(`\n📊 当前分类统计:`);
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}个`);
});
console.log(`\n总工具数：${tools.length}`);
