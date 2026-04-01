const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 需要删除的错误音乐网站（实际是影视网站）
const needDelete = [
  '糖果音乐',
  '爱玩音乐',
  'ACG 漫音社',
  '我爱无损',
  '布谷音乐',
  '凤梨音乐',
  '魔石音乐',
  '鲸鱼无损',
  'SPlayer',
  '青听音乐',
  'Alger Music',
  'GD 音乐台',
  '昔枫音乐盒'
];

console.log('❌ 删除错误的音乐网站（实际是影视）:\n');

let deletedCount = 0;
tools = tools.filter(tool => {
  if (tool.category === '在线音乐' && needDelete.includes(tool.name)) {
    console.log(`   ${tool.name} - ${tool.url}`);
    deletedCount++;
    return false;
  }
  return true;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 删除了 ${deletedCount} 个错误网站`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
console.log('\n📋 当前在线音乐列表:');
musicTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
