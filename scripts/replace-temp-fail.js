const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换高清拉和 V2EX
const replacements = [
  {
    oldName: '高清拉',
    newName: '片吧',
    url: 'https://www.pianba.cc',
    category: '影视资源',
    desc: '片吧 - 高清电影下载'
  },
  {
    oldName: 'V2EX',
    newName: 'SegmentFault',
    url: 'https://segmentfault.com',
    category: '开发编程',
    desc: 'SegmentFault 思否 - 开发者技术社区'
  }
];

// 执行替换
let replacedCount = 0;
tools = tools.map(tool => {
  const replacement = replacements.find(r => r.oldName === tool.name);
  if (replacement && tool.category === replacement.category) {
    console.log(`🔄 替换:`);
    console.log(`   旧名称：${tool.name}`);
    console.log(`   新名称：${replacement.newName}`);
    console.log(`   网址：${replacement.url}`);
    replacedCount++;
    
    return {
      ...tool,
      name: replacement.newName,
      url: replacement.url,
      shortDesc: replacement.desc,
      description: replacement.desc,
      slug: replacement.newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 替换了 ${replacedCount} 个工具`);
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
