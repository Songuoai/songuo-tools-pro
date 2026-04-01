const fs = require('fs');
const path = require('path');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 截图中的音乐网站更新
const musicUpdates = [
  { name: 'Music CenGuiGui', newUrl: 'https://ovoeo.cn', desc: 'Music CenGuiGui - 在线音乐播放器' },
  { name: 'SPlayer', newUrl: 'https://tool.liumingye.cn/site/103/', desc: 'SPlayer - 网易云音乐第三方播放器' },
  { name: 'YesPlayMusic', newUrl: 'https://tool.liumingye.cn/site/102/', desc: 'YesPlayMusic - 高颜值网易云播放器' },
  { name: 'Alger Music', newUrl: 'https://tool.liumingye.cn/site/72/', desc: 'Alger Music - 高颜值网易云播放器' },
  { name: 'MusicFree', newUrl: 'https://tool.liumingye.cn/site/39/', desc: 'MusicFree - 免费音乐播放器' },
  { name: 'GD 音乐台', newUrl: 'https://music.gdstudio.org', desc: 'GD 音乐台 - 在线音乐工具' },
  { name: '米兔音乐', newUrl: 'https://www.qqmp3.vip', desc: '米兔音乐 - 在线音乐试听' },
  { name: '布谷音乐', newUrl: 'https://www.buguyy.top', desc: '布谷音乐 - 提供 MP3、WAV、Flac 等格式' },
  { name: 'mmPlayer', newUrl: 'https://netease-music.fe-mm.com', desc: 'mmPlayer - 网易云在线播放器' },
  { name: '昔枫音乐盒', newUrl: 'https://mu-jie.cc/musicBox/', desc: '昔枫音乐盒 - 以网易云为主的网页播放器' }
];

// 更新网站链接
let updatedCount = 0;
tools = tools.map(tool => {
  if (tool.category !== '在线音乐') return tool;
  
  const update = musicUpdates.find(u => u.name.toLowerCase() === tool.name.toLowerCase());
  if (update) {
    console.log(`🔄 更新 ${tool.name}:`);
    console.log(`   旧：${tool.url}`);
    console.log(`   新：${update.newUrl}`);
    updatedCount++;
    
    return {
      ...tool,
      url: update.newUrl,
      shortDesc: update.desc,
      description: update.desc
    };
  }
  return tool;
});

// 保存
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
const outputData = { tools };
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`\n✅ 更新了 ${updatedCount} 个音乐网站链接`);
console.log(`💾 已保存到：${outputPath}`);

// 显示在线音乐分类统计
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`\n🎵 在线音乐分类：${musicTools.length}个`);
