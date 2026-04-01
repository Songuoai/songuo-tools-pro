const fs = require('fs');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = './data/tools.json';
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 筛选在线音乐分类
const musicTools = tools.filter(t => t.category === '在线音乐');
console.log(`🎵 在线音乐分类：${musicTools.length}个\n`);

// 检测链接是否跳转到影视网站
function checkRedirect(url, timeout = 8000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout, maxRedirects: 5 }, (res) => {
      const finalUrl = res.responseUrl || url;
      const isMovieSite = finalUrl.includes('ddys') || 
                          finalUrl.includes('libvio') || 
                          finalUrl.includes('subaibai') ||
                          finalUrl.includes('dadagui') ||
                          finalUrl.includes('bttwo') ||
                          finalUrl.includes('kuaikanys') ||
                          finalUrl.includes('zhuiju') ||
                          finalUrl.includes('czzzyy') ||
                          finalUrl.includes('pianba') ||
                          finalUrl.includes('80s.tw');
      
      if (isMovieSite && finalUrl !== url) {
        resolve({ url, status: 'movie_redirect', redirectUrl: finalUrl });
      } else if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ url, status: 'ok', finalUrl });
      } else {
        resolve({ url, status: 'fail', statusCode: res.statusCode });
      }
    });
    
    req.on('error', (err) => {
      resolve({ url, status: 'fail', error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'timeout' });
    });
  });
}

// 备用音乐网站
const backupMusicSites = [
  { name: '放屁音乐', url: 'https://www.fangpi.net', desc: '放屁音乐 - 免费在线音乐试听下载' },
  { name: '糖果音乐', url: 'https://www.tgws.cc', desc: '糖果音乐 - 在线音乐平台' },
  { name: '爱玩音乐', url: 'https://www.22a5.com', desc: '爱玩音乐 - 在线音乐试听' },
  { name: 'ACG 漫音社', url: 'https://www.acgjc.com', desc: 'ACG 漫音社 - 专注动漫音乐分享' },
  { name: '我爱无损', url: 'http://www.52wusun.com', desc: '我爱无损 - 无损音乐下载' },
  { name: '布谷音乐', url: 'https://www.buguyy.top', desc: '布谷音乐 - 在线音乐平台' },
  { name: '凤梨音乐', url: 'https://www.flmp3.pro', desc: '凤梨音乐 - MP3 下载' },
  { name: '魔石音乐', url: 'https://music.yym4.com', desc: '魔石音乐 - 在线试听' },
  { name: '鲸鱼无损', url: 'https://www.jywav.com', desc: '鲸鱼无损 - 高品质音乐' },
  { name: 'SPlayer', url: 'https://splayer.uncley.cc', desc: 'SPlayer - 简约音乐播放器' }
];

// 主函数
async function main() {
  const needReplace = [];
  
  console.log('=== 开始检测在线音乐链接 ===\n');
  
  for (let i = 0; i < musicTools.length; i++) {
    const tool = musicTools[i];
    console.log(`检测 ${i + 1}/${musicTools.length}: ${tool.name}`);
    console.log(`  网址：${tool.url}`);
    
    const result = await checkRedirect(tool.url);
    
    if (result.status === 'movie_redirect') {
      console.log(`  ❌ 跳转到影视：${result.redirectUrl}\n`);
      needReplace.push({ ...tool, redirectUrl: result.redirectUrl });
    } else if (result.status === 'ok') {
      console.log(`  ✅ 可用\n`);
    } else {
      console.log(`  ⚠️  无法访问：${result.statusCode || result.status || result.error}\n`);
      needReplace.push({ ...tool, reason: result.statusCode || result.status || result.error });
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  // 替换失效链接
  if (needReplace.length > 0) {
    console.log('\n=== 需要替换的网站 ===');
    needReplace.forEach((t, i) => {
      if (t.redirectUrl) {
        console.log(`${i + 1}. ${t.name} - ${t.url} → ${t.redirectUrl}`);
      } else {
        console.log(`${i + 1}. ${t.name} - ${t.url} (${t.reason})`);
      }
    });
    
    // 自动替换
    console.log('\n=== 开始替换 ===\n');
    let backupIndex = 0;
    
    tools = tools.map(tool => {
      if (tool.category !== '在线音乐') return tool;
      
      const broken = needReplace.find(t => t.name === tool.name && t.category === '在线音乐');
      if (broken && backupIndex < backupMusicSites.length) {
        const backup = backupMusicSites[backupIndex];
        console.log(`🔄 替换 ${tool.name}:`);
        console.log(`   旧：${tool.url}${broken.redirectUrl ? ' (→ ' + broken.redirectUrl + ')' : ''}`);
        console.log(`   新：${backup.name} - ${backup.url}`);
        backupIndex++;
        
        return {
          ...tool,
          name: backup.name,
          url: backup.url,
          shortDesc: backup.desc,
          description: backup.desc,
          slug: backup.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        };
      }
      return tool;
    });
    
    // 保存
    fs.writeFileSync(dataPath, JSON.stringify({ tools }, null, 2), 'utf-8');
    console.log(`\n💾 已更新工具数据`);
  }
  
  // 显示统计
  const finalMusicTools = tools.filter(t => t.category === '在线音乐');
  console.log(`\n🎵 在线音乐分类：${finalMusicTools.length}个`);
}

main().catch(console.error);
