const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 检查重复的 slug
const slugMap = new Map();
const duplicateSlugs = [];

tools.forEach(tool => {
  const slug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (slugMap.has(slug)) {
    duplicateSlugs.push({
      slug,
      tool1: slugMap.get(slug),
      tool2: tool
    });
  } else {
    slugMap.set(slug, tool);
  }
});

console.log('=== 检查重复的 slug ===\n');

if (duplicateSlugs.length > 0) {
  console.log(`❌ 发现 ${duplicateSlugs.length} 个重复的 slug:\n`);
  
  duplicateSlugs.forEach((dup, i) => {
    console.log(`${i + 1}. slug: "${dup.slug}"`);
    console.log(`   工具 1: ${dup.tool1.name} (${dup.tool1.category})`);
    console.log(`   工具 2: ${dup.tool2.name} (${dup.tool2.category})\n`);
  });
  
  // 修复：为重复的 slug 添加分类前缀
  let fixedCount = 0;
  tools = tools.map(tool => {
    const slug = tool.slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // 检查这个 slug 是否重复
    const duplicates = duplicateSlugs.filter(d => d.slug === slug);
    if (duplicates.length > 0) {
      // 为在线音乐分类添加工具前缀
      if (tool.category === '在线音乐') {
        const newSlug = `music-${slug}`;
        console.log(`🔄 修复：${tool.name}`);
        console.log(`   旧 slug: ${slug}`);
        console.log(`   新 slug: ${newSlug}\n`);
        fixedCount++;
        return { ...tool, slug: newSlug };
      }
    }
    return tool;
  });
  
  // 保存
  const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
  const outputData = { tools };
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
  
  console.log(`\n✅ 修复了 ${fixedCount} 个重复的 slug`);
  console.log(`💾 已保存到：${outputPath}`);
} else {
  console.log('✅ 没有发现重复的 slug！');
}
