const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 要添加的 AI 音乐工具（从之前在线音乐分类中移除的）
const aiMusicTools = [
  {
    name: 'Suno-Top',
    url: 'https://suno-top.com/',
    shortDesc: 'Suno AI 音乐生成工具导航',
    description: 'Suno-Top - Suno AI 音乐生成工具导航站',
    tags: ['AI', '音乐生成', 'Suno']
  },
  {
    name: 'MusicHero.ai',
    url: 'https://musichero.ai/zh-CN',
    shortDesc: 'AI 音乐生成器',
    description: 'MusicHero.ai - 在线 AI 音乐生成工具',
    tags: ['AI', '音乐生成']
  },
  {
    name: 'Brev AI',
    url: 'https://www.novatools.cn/tools/brev-ai-ai-music-generator-free-online',
    shortDesc: 'AI 音乐生成器',
    description: 'Brev AI - 免费在线 AI 音乐生成器',
    tags: ['AI', '音乐生成']
  },
  {
    name: 'Music FX',
    url: 'https://musicfx.net/',
    shortDesc: 'AI 音乐效果工具',
    description: 'Music FX - AI 音乐效果处理工具',
    tags: ['AI', '音乐', '效果']
  },
  {
    name: 'TryMusicAI',
    url: 'https://trymusic.ai/zh',
    shortDesc: 'AI 音乐创作平台',
    description: 'TryMusicAI - AI 驱动的音乐创作平台',
    tags: ['AI', '音乐创作']
  },
  {
    name: 'UBERDUCK',
    url: 'https://www.uberduck.ai/',
    shortDesc: 'AI 语音合成平台',
    description: 'UBERDUCK - AI 语音合成和音乐生成平台',
    tags: ['AI', '语音合成', '音乐']
  },
  {
    name: 'AI Mastering',
    url: 'https://www.novatools.cn/tools/ai-mastering',
    shortDesc: 'AI 母带处理工具',
    description: 'AI Mastering - 在线 AI 音频母带处理工具',
    tags: ['AI', '音频处理', '母带']
  },
  {
    name: 'Rap Generator',
    url: 'https://www.novatools.cn/tools/rap-generator',
    shortDesc: 'AI 说唱生成器',
    description: 'Rap Generator - AI 驱动的说唱音乐生成器',
    tags: ['AI', '说唱', '音乐生成']
  },
  {
    name: 'YouMusic.AI',
    url: 'https://youmusic.ai/zh',
    shortDesc: 'AI 音乐生成平台',
    description: 'YouMusic.AI - AI 音乐创作和生成平台',
    tags: ['AI', '音乐生成']
  },
  {
    name: 'MusicStar.AI',
    url: 'https://www.novatools.cn/tools/musicstar-ai',
    shortDesc: 'AI 音乐制作工具',
    description: 'MusicStar.AI - AI 驱动的音乐制作工具',
    tags: ['AI', '音乐制作']
  }
];

// 检查是否已存在
const existingNames = tools.map(t => t.name.toLowerCase());
const newTools = [];

let idCounter = Math.max(...tools.map(t => t.id), 0) + 1;
aiMusicTools.forEach(tool => {
  if (!existingNames.includes(tool.name.toLowerCase())) {
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    newTools.push({
      id: idCounter++,
      name: tool.name,
      url: tool.url,
      logoUrl: '',
      category: 'AI 工具',
      priceType: 'freemium',
      shortDesc: tool.shortDesc,
      description: tool.description,
      tags: tool.tags,
      status: 'published',
      views: 0,
      rating: 0,
      slug: slug
    });
    console.log(`✅ 添加：${tool.name} 到 AI 工具分类`);
  } else {
    console.log(`⏭️  已存在：${tool.name}`);
  }
});

// 添加新工具
tools = [...tools, ...newTools];

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n💾 已保存到：${outputPath}`);
console.log(`\n✅ 添加了 ${newTools.length} 个 AI 音乐工具到 AI 工具分类`);

// 统计
const musicCount = tools.filter(t => t.category === '在线音乐').length;
const aiCount = tools.filter(t => t.category === 'AI 工具').length;
console.log(`\n📊 当前分类统计:`);
console.log(`  在线音乐：${musicCount} 个`);
console.log(`  AI 工具：${aiCount} 个`);
