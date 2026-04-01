const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 修改耐看电影的三个域名为不同名称
const nkvlogTools = tools.filter(t => t.name === '耐看电影' && t.category === '影视资源');

if (nkvlogTools.length === 3) {
  console.log('🔄 修改耐看电影的三个域名:\n');
  
  // 第一个：耐看电影
  const index1 = tools.findIndex(t => t.url === 'https://www.nkvlog.com');
  if (index1 !== -1) {
    tools[index1].name = '耐看电影';
    tools[index1].shortDesc = '耐看电影 - 免费在线电影观看';
    tools[index1].slug = 'nkvlog';
    console.log(`✅ 耐看电影 - https://www.nkvlog.com`);
  }
  
  // 第二个：耐看影视
  const index2 = tools.findIndex(t => t.url === 'https://www.sdlhl.com');
  if (index2 !== -1) {
    tools[index2].name = '耐看影视';
    tools[index2].shortDesc = '耐看影视 - 免费在线电影观看';
    tools[index2].slug = 'nkvshiy';
    console.log(`✅ 耐看影视 - https://www.sdlhl.com`);
  }
  
  // 第三个：耐看影院
  const index3 = tools.findIndex(t => t.url === 'https://www.zhlchb.com');
  if (index3 !== -1) {
    tools[index3].name = '耐看影院';
    tools[index3].shortDesc = '耐看影院 - 免费在线电影观看';
    tools[index3].slug = 'nkvyingyuan';
    console.log(`✅ 耐看影院 - https://www.zhlchb.com`);
  }
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
