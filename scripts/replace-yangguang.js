const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 替换阳光电影网为其他可用电影网站
const index = tools.findIndex(t => t.name === '阳光电影网');
if (index !== -1) {
  console.log(`🔄 替换阳光电影网:`);
  console.log(`   旧：阳光电影网 - https://www.ygydy.cc`);
  console.log(`   新：片源网 - https://www.pianyuan.org`);
  
  tools[index] = {
    ...tools[index],
    name: '片源网',
    url: 'https://www.pianyuan.org',
    shortDesc: '片源网 - 高清电影下载',
    description: '片源网 - 提供免费高清电影下载服务',
    slug: 'pianyuan'
  };
}

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
