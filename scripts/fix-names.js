const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 名称与网址不匹配的替换
const replacements = [
  // Perplexity 实际是 Phind
  {
    oldName: 'Perplexity',
    newName: 'Phind',
    url: 'https://www.phind.com',
    newDesc: 'Phind - AI 驱动的开发者搜索引擎'
  },
  
  // Midjourney 实际是 LiblibAI
  {
    oldName: 'Midjourney',
    newName: 'LiblibAI',
    url: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - 国内 AI 绘画创作平台'
  },
  
  // Stable Diffusion 实际是 LiblibAI
  {
    oldName: 'Stable Diffusion',
    newName: 'LiblibAI',
    url: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - Stable Diffusion 在线版'
  },
  
  // Leonardo.ai 实际是国内镜像
  {
    oldName: 'Leonardo.ai',
    newName: 'Leonardo AI',
    url: 'https://www.novatools.cn/tools/leonardo-ai',
    newDesc: 'Leonardo AI - AI 艺术创作工具'
  },
  
  // TripoAI 实际是国内镜像
  {
    oldName: 'TripoAI',
    newName: 'Tripo AI',
    url: 'https://www.novatools.cn/tools/tripo-ai',
    newDesc: 'Tripo AI - 3D 模型生成工具'
  },
  
  // Kapwing 实际是剪映
  {
    oldName: 'Kapwing',
    newName: '剪映',
    url: 'https://www.jianying.com',
    newDesc: '剪映 - 视频编辑工具'
  },
  
  // Google Docs 实际是腾讯文档
  {
    oldName: 'Google Docs',
    newName: '腾讯文档',
    url: 'https://docs.qq.com',
    newDesc: '腾讯文档 - 在线协作文档'
  },
  
  // 证件照在线生成 实际是 Remove.bg
  {
    oldName: '证件照在线生成',
    newName: 'Remove.bg',
    url: 'https://www.remove.bg/zh/remove-background',
    newDesc: 'Remove.bg - 一键抠图去背景'
  }
];

// 执行替换
let replacedCount = 0;
tools = tools.map(tool => {
  const replacement = replacements.find(r => r.name === tool.name || r.oldName === tool.name);
  if (replacement) {
    console.log(`🔄 替换:`);
    console.log(`   旧名称：${tool.name}`);
    console.log(`   新名称：${replacement.newName}`);
    console.log(`   网址：${replacement.url}`);
    replacedCount++;
    
    return {
      ...tool,
      name: replacement.newName,
      url: replacement.url,
      shortDesc: replacement.newDesc,
      description: replacement.newDesc,
      slug: replacement.newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
  }
  return tool;
});

// 去重（移除完全重复的工具）
const seen = new Set();
tools = tools.filter(t => {
  const key = `${t.name}-${t.url}`;
  if (seen.has(key)) {
    console.log(`❌ 移除重复：${t.name}`);
    return false;
  }
  seen.add(key);
  return true;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 替换了 ${replacedCount} 个工具名称`);
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
