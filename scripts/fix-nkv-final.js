const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 修改耐看系列的名称
console.log('🔄 修改耐看系列的名称:\n');

// 第一个：耐看影视
const index1 = tools.findIndex(t => t.url === 'https://www.nkvlog.com');
if (index1 !== -1) {
  tools[index1].name = '耐看影视';
  tools[index1].shortDesc = '耐看影视 - 免费在线电影观看';
  tools[index1].slug = 'naikan-ys';
  console.log(`✅ 耐看影视 - https://www.nkvlog.com`);
}

// 第二个：1080 影视
const index2 = tools.findIndex(t => t.url === 'https://www.sdlhl.com');
if (index2 !== -1) {
  tools[index2].name = '1080 影视';
  tools[index2].shortDesc = '1080 影视 - 免费在线电影观看';
  tools[index2].slug = '1080-ys';
  console.log(`✅ 1080 影视 - https://www.sdlhl.com`);
}

// 第三个：VS 影视
const index3 = tools.findIndex(t => t.url === 'https://www.zhlchb.com');
if (index3 !== -1) {
  tools[index3].name = 'VS 影视';
  tools[index3].shortDesc = 'VS 影视 - 免费在线电影观看';
  tools[index3].slug = 'vs-ys';
  console.log(`✅ VS 影视 - https://www.zhlchb.com`);
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);

// 显示影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`\n🎬 影视资源分类 (${movieTools.length}个):`);
movieTools.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
