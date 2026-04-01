const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// AI 音乐工具关键词
const aiMusicKeywords = ['AI', 'Suno', 'Music', 'Generator', 'Mastering', 'Rap', 'TryMusic', 'UBERDUCK'];

// 找出在线音乐分类中的 AI 工具
const musicTools = tools.filter(t => t.category === '在线音乐');
const aiMusicTools = musicTools.filter(t => 
  aiMusicKeywords.some(keyword => t.name.toLowerCase().includes(keyword.toLowerCase()))
);

console.log('🎵 在线音乐分类中的 AI 工具：');
aiMusicTools.forEach(t => {
  console.log(`  - ${t.name}`);
});

// 更新分类
let movedCount = 0;
tools = tools.map(tool => {
  if (tool.category === '在线音乐' && 
      aiMusicKeywords.some(keyword => tool.name.toLowerCase().includes(keyword.toLowerCase()))) {
    movedCount++;
    console.log(`\n🔄 移动：${tool.name} 从 在线音乐 → AI 工具`);
    return { ...tool, category: 'AI 工具' };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
console.log(`\n✅ 移动了 ${movedCount} 个 AI 音乐工具到 AI 工具分类`);

// 统计
const musicCount = tools.filter(t => t.category === '在线音乐').length;
const aiCount = tools.filter(t => t.category === 'AI 工具').length;
console.log(`\n📊 当前分类统计:`);
console.log(`  在线音乐：${musicCount} 个`);
console.log(`  AI 工具：${aiCount} 个`);
