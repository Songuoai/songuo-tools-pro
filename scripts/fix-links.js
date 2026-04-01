const fs = require('fs');
const path = require('path');

// 读取完整数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 失效链接替换映射（名称 -> 新 URL）
const linkReplacements = {
  // Gemini - 使用官方替代
  'Gemini': 'https://gemini.google.com',
  
  // Copilot - 使用新域名
  'Copilot': 'https://copilot.cloud.microsoft/',
  
  // Perplexity - 保持原链接（实际可用）
  'Perplexity': 'https://www.perplexity.ai',
  
  // Character.ai - 保持原链接
  'Character.ai': 'https://beta.character.ai',
  
  // Poe - 保持原链接
  'Poe': 'https://poe.com',
  
  // You.com - 保持原链接
  'You.com': 'https://you.com',
  
  // Midjourney - 使用 Discord 入口
  'Midjourney': 'https://www.midjourney.com',
  
  // DALL-E 3 - 通过 Bing 使用
  'DALL-E 3': 'https://www.bing.com/images/create',
  
  // Stable Diffusion - 官方网站
  'Stable Diffusion': 'https://stablediffusionweb.com',
  
  // Leonardo.ai - 保持原链接
  'Leonardo.ai': 'https://app.leonardo.ai',
  
  // Canva 可画 - 中国版
  'Canva 可画': 'https://www.canva.cn',
  
  // 证件照在线生成 - 替代
  '证件照在线生成': 'https://www.remove.bg/zh/remove-background',
  
  // Kapwing - 保持原链接
  'Kapwing': 'https://www.kapwing.com',
  
  // Google Docs - 替代
  'Google Docs': 'https://docs.google.com',
  
  // ChatGPT - 官方
  'ChatGPT': 'https://chatgpt.com',
  
  // GitHub - 保持（实际可用）
  'GitHub': 'https://github.com',
  
  // Stack Overflow - 保持
  'Stack Overflow': 'https://stackoverflow.com',
  
  // V2EX - 保持
  'V2EX': 'https://www.v2ex.com',
  
  // Phind - 保持
  'Phind': 'https://www.phind.com',
  
  // Hugging Chat - 新域名
  'Hugging Chat': 'https://huggingface.co/chat',
  
  // TripoAI - 保持
  'TripoAI': 'https://www.tripo3d.ai',
  
  // 影视类失效链接替换
  'HD 茉莉': 'https://www.hdmoli.cc',
  'NovoplN': 'https://novopln.site',
  '电影港': 'https://www.dygang.cc',
  '阳光电影网': 'https://www.ygydy.com',
  'MP4 电影': 'https://www.mp4pa.com',
  '看片狂人': 'https://www.kpkuang.top',
  '动漫岛': 'https://www.dmd85.com',
  '2333 动漫': 'https://www.233dm.cc',
  '蘑菇影视': 'https://www.mgslb.com',
  '高清拉': 'https://gaoqing.la',
};

// 更新工具链接
let updatedCount = 0;
const updatedTools = tools.map(tool => {
  if (linkReplacements[tool.name]) {
    console.log(`🔄 ${tool.name}: ${tool.url} → ${linkReplacements[tool.name]}`);
    updatedCount++;
    return { ...tool, url: linkReplacements[tool.name] };
  }
  return tool;
});

console.log(`\n✅ 更新了 ${updatedCount} 个工具链接`);

// 保存更新后的数据
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools: updatedTools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
