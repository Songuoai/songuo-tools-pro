const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 截图中的效率办公工具
const newOfficeTools = [
  { name: 'Microsoft 激活脚本', url: 'https://massgrave.dev', desc: 'Microsoft 激活脚本（MAS）- Windows/Office 激活工具' },
  { name: 'MinerU', url: 'https://mineru.net/OpenSourceTools/Extractor', desc: 'MinerU - 开源数据提取工具' },
  { name: 'Smallpdf', url: 'https://smallpdf.com/cn', desc: 'Smallpdf - PDF 在线处理工具' },
  { name: 'Qwerty Learner', url: 'https://qwerty.liumingye.cn', desc: 'Qwerty Learner - 在线打字练习工具' },
  { name: 'Wormhole', url: 'https://wormhole.app', desc: 'Wormhole - 端到端加密文件传输' },
  { name: '图片拼接', url: 'https://kejiweixun.com/tools/merge-image', desc: '图片拼接 - 在线图片拼接工具' },
  { name: '文字转语音', url: 'https://easyvoice.ioplus.tech', desc: '文字转语音 - 在线 TTS 工具' },
  { name: '马克配音', url: 'https://ttsmaker.cn', desc: '马克配音 - 在线配音工具' },
  { name: '图改改', url: 'https://tugaigai.com', desc: '图改改 - 在线图片编辑工具' },
  { name: 'BigJpg', url: 'https://bigjpg.com', desc: 'BigJpg - AI 图片放大工具' }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
let addedCount = 0;
let maxId = Math.max(...tools.map(t => t.id), 0);

// 添加新网站
newOfficeTools.forEach(site => {
  if (!existingNames.includes(site.name.toLowerCase())) {
    maxId++;
    tools.push({
      id: maxId,
      name: site.name,
      url: site.url,
      logoUrl: '',
      category: '效率办公',
      priceType: 'free',
      shortDesc: site.desc,
      description: site.desc,
      tags: ['办公', '效率', '工具'],
      status: 'published',
      views: 0,
      rating: 0,
      slug: `tool-${maxId}`
    });
    console.log(`✅ 添加：${site.name} - ${site.url}`);
    addedCount++;
  } else {
    console.log(`⏭️  已存在：${site.name}`);
  }
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 添加了 ${addedCount} 个效率办公工具`);
console.log(`💾 已保存到：${outputPath}`);

// 显示效率办公分类统计
const officeTools = tools.filter(t => t.category === '效率办公');
console.log(`\n💼 效率办公分类：${officeTools.length}个`);
