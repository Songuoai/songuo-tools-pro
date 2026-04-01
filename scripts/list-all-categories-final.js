const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 按分类统计
const categories = {};
tools.forEach(tool => {
  if (!categories[tool.category]) {
    categories[tool.category] = [];
  }
  categories[tool.category].push(tool);
});

console.log('========================================');
console.log('📊 工具箱分类统计（去重后）');
console.log('========================================\n');

// 显示每个分类
Object.entries(categories).forEach(([category, categoryTools], index) => {
  console.log(`${index + 1}. ${category} - ${categoryTools.length}个`);
  console.log('----------------------------------------');
  
  categoryTools.forEach((tool, i) => {
    console.log(`  ${i + 1}. ${tool.name}`);
    console.log(`     ${tool.url}`);
  });
  
  console.log('');
});

console.log('========================================');
console.log(`📦 总工具数：${tools.length}个`);
console.log(`📁 分类数量：${Object.keys(categories).length}个`);
console.log('========================================');
