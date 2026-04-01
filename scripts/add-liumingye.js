const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 添加刘明叶搜索
const searchSite = {
  name: '刘明叶搜索',
  url: 'https://tool.liumingye.cn',
  shortDesc: '刘明叶搜索 - 影视资源搜索工具',
  description: '刘明叶搜索 - 提供全网影视资源搜索服务',
  tags: ['搜索', '影视', '资源']
};

// 检查是否已存在
const existing = tools.find(t => t.name === searchSite.name);
if (!existing) {
  const maxId = Math.max(...tools.map(t => t.id), 0);
  tools.push({
    id: maxId + 1,
    name: searchSite.name,
    url: searchSite.url,
    logoUrl: '',
    category: '影视资源',
    priceType: 'free',
    shortDesc: searchSite.shortDesc,
    description: searchSite.description,
    tags: searchSite.tags,
    status: 'published',
    views: 0,
    rating: 0,
    slug: searchSite.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  });
  console.log(`✅ 添加：${searchSite.name}`);
  console.log(`   网址：${searchSite.url}`);
  console.log(`   分类：${'影视资源'}`);
} else {
  console.log(`⏭️  已存在：${searchSite.name}`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类统计
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
