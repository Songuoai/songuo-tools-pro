const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

// 国际服务平替方案
const replacements = [
  // AI 聊天类
  {
    name: 'Gemini',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/gemini',
    newDesc: 'Gemini AI - Google 多模态 AI 助手（国内镜像）',
    newTags: ['AI', 'Google', '多模态', '国内可用']
  },
  {
    name: 'Perplexity',
    category: 'AI 工具',
    newUrl: 'https://www.phind.com',
    newDesc: 'Phind - AI 驱动的开发者搜索引擎',
    newTags: ['AI', '搜索', '研究', '开发者']
  },
  {
    name: 'Character.ai',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/character-ai',
    newDesc: 'Character AI - AI 角色扮演对话（国内镜像）',
    newTags: ['AI', '娱乐', '对话', '角色扮演']
  },
  {
    name: 'Poe',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/poe',
    newDesc: 'Poe - 多合一 AI 聊天平台（国内镜像）',
    newTags: ['AI', '聚合', '对话', '多模型']
  },
  {
    name: 'You.com',
    category: 'AI 工具',
    newUrl: 'https://metaso.cn',
    newDesc: 'Metaso - AI 搜索引擎（国内可用）',
    newTags: ['AI', '搜索', '研究']
  },
  
  // AI 绘画类
  {
    name: 'Midjourney',
    category: 'AI 工具',
    newUrl: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - 国内 AI 绘画平台（平替 Midjourney）',
    newTags: ['AI', '绘画', '设计', '国内可用']
  },
  {
    name: 'Canva 可画',
    category: 'AI 设计',
    newUrl: 'https://www.chuangkit.com',
    newDesc: '创客贴 - 在线设计工具（Canva 平替）',
    newTags: ['设计', '作图', '模板', '国内可用']
  },
  {
    name: 'DALL-E 3',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/dall-e-3',
    newDesc: 'DALL-E 3 - OpenAI 绘画工具（国内镜像）',
    newTags: ['AI', '绘画', 'OpenAI']
  },
  {
    name: 'Stable Diffusion',
    category: 'AI 工具',
    newUrl: 'https://www.liblib.ai',
    newDesc: 'LiblibAI - Stable Diffusion 在线版（国内可用）',
    newTags: ['AI', '绘画', 'SD', '国内可用']
  },
  {
    name: 'Leonardo.ai',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/leonardo-ai',
    newDesc: 'Leonardo AI - AI 艺术创作（国内镜像）',
    newTags: ['AI', '绘画', '艺术']
  },
  
  // 视频工具类
  {
    name: 'Kapwing',
    category: 'AI 工具',
    newUrl: 'https://www.jianying.com',
    newDesc: '剪映 - 视频编辑工具（Kapwing 平替）',
    newTags: ['视频', '剪辑', '国内可用']
  },
  
  // Google 服务类
  {
    name: 'Google Docs',
    category: '效率办公',
    newUrl: 'https://docs.qq.com',
    newDesc: '腾讯文档 - 在线协作文档（Google Docs 平替）',
    newTags: ['办公', '文档', '协作', '国内可用']
  },
  
  // AI 聊天
  {
    name: 'ChatGPT',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/chatgpt',
    newDesc: 'ChatGPT - OpenAI 对话 AI（国内镜像）',
    newTags: ['AI', '对话', 'OpenAI', '国内可用']
  },
  
  // 开发者工具
  {
    name: 'GitHub',
    category: '开发编程',
    newUrl: 'https://gitee.com',
    newDesc: 'Gitee - 代码托管平台（GitHub 国内平替）',
    newTags: ['开发', 'Git', '代码', '国内可用']
  },
  {
    name: 'Stack Overflow',
    category: '开发编程',
    newUrl: 'https://juejin.cn',
    newDesc: '掘金 - 开发者社区（Stack Overflow 国内平替）',
    newTags: ['开发', '社区', '技术', '国内可用']
  },
  {
    name: 'V2EX',
    category: '开发编程',
    newUrl: 'https://www.v2ex.com',
    newDesc: 'V2EX - 创意工作者社区（保留原链接，使用 CDN）',
    newTags: ['社区', '讨论', '科技']
  },
  
  // AI 工具
  {
    name: 'Phind',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/phind',
    newDesc: 'Phind - AI 开发者搜索（国内镜像）',
    newTags: ['AI', '搜索', '开发者', '代码']
  },
  {
    name: 'Hugging Chat',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/hugging-chat',
    newDesc: 'Hugging Chat - 开源 AI 对话（国内镜像）',
    newTags: ['AI', '对话', '开源']
  },
  {
    name: 'TripoAI',
    category: 'AI 工具',
    newUrl: 'https://www.novatools.cn/tools/tripo-ai',
    newDesc: 'Tripo AI - 3D 模型生成（国内镜像）',
    newTags: ['AI', '3D', '建模']
  }
];

// 查找并更新工具
let updatedCount = 0;
const updatedTools = tools.map(tool => {
  const replacement = replacements.find(r => r.name === tool.name && r.category === tool.category);
  
  if (replacement) {
    console.log(`🔄 ${tool.name} (${tool.category}):`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${replacement.newUrl}`);
    console.log(`   说明：${replacement.newDesc}`);
    updatedCount++;
    
    return {
      ...tool,
      url: replacement.newUrl,
      shortDesc: replacement.newDesc,
      description: replacement.newDesc,
      tags: replacement.newTags || tool.tags,
      _replaced: true
    };
  }
  return tool;
});

console.log(`\n✅ 平替了 ${updatedCount} 个国际服务`);

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools: updatedTools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`💾 已保存到：${outputPath}`);

// 显示平替列表
console.log('\n📋 平替列表：');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
replacements.forEach(r => {
  console.log(`• ${r.name} → ${r.newUrl.split('/')[2]}`);
});
