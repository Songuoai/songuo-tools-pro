const fs = require('fs');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = './data/tools.json';
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log(`📊 总工具数：${tools.length}\n`);

// 检测链接是否跳转到优酷
function checkYouku(url, timeout = 8000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout, maxRedirects: 5 }, (res) => {
      const finalUrl = res.responseUrl || url;
      const isYouku = finalUrl.includes('youku.com') || finalUrl.includes('soku.com');
      
      if (isYouku) {
        resolve({ url, status: 'youku_redirect', redirectUrl: finalUrl });
      } else if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ url, status: 'ok', statusCode: res.statusCode });
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

// 备用影视网站库
const backupMovieSites = [
  { name: '低端影视', url: 'https://ddys.tv', desc: '低端影视 - 高清影视在线观看' },
  { name: 'LIBVIO', url: 'https://www.libvio.cc', desc: 'LIBVIO - 免费在线影视' },
  { name: '素白白', url: 'https://www.subaibaiys.com', desc: '素白白 - 免费在线观影' },
  { name: '达达龟', url: 'https://www.dadagui.me', desc: '达达龟 - 免费在线电影' },
  { name: '两个 BT', url: 'https://www.bttwo.net', desc: '两个 BT - 电影下载网站' },
  { name: '新片吧', url: 'https://www.xpb.cc', desc: '新片吧 - 最新电影下载' },
  { name: '快看影视', url: 'https://www.kuaikanys.cc', desc: '快看影视 - 免费在线观影' },
  { name: '追剧啦', url: 'https://www.zhuiju.la', desc: '追剧啦 - 免费在线追剧' },
  { name: '厂长资源', url: 'https://www.czzzyy.net', desc: '厂长资源 - 免费影视资源' },
  { name: '片吧', url: 'https://www.pianba.tv', desc: '片吧 - 高清电影下载' },
  { name: '80S 影视', url: 'https://www.80s.tw', desc: '80S 影视 - 免费电影下载' },
  { name: '飘花电影', url: 'https://www.piaohua.com', desc: '飘花电影 - 迅雷电影下载' },
  { name: '电影蜜蜂', url: 'https://www.dybee.tv', desc: '电影蜜蜂 - 高清电影下载' },
  { name: '美剧鸟', url: 'https://www.meijuniao.com', desc: '美剧鸟 - 美剧在线观看' },
  { name: '韩剧网', url: 'https://www.hanju.cc', desc: '韩剧网 - 韩剧在线观看' }
];

// 主函数
async function main() {
  const youkuSites = [];
  
  console.log('=== 开始检测优酷跳转网站 ===\n');
  
  // 只检测影视资源分类
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    if (tool.category !== '影视资源') continue;
    
    console.log(`检测 ${i + 1}/${tools.length}: ${tool.name}`);
    console.log(`  网址：${tool.url}`);
    
    const result = await checkYouku(tool.url);
    
    if (result.status === 'youku_redirect') {
      console.log(`  ❌ 跳转到优酷：${result.redirectUrl}\n`);
      youkuSites.push({ ...tool, redirectUrl: result.redirectUrl });
    } else if (result.status === 'ok') {
      console.log(`  ✅ 可用\n`);
    } else {
      console.log(`  ⚠️  无法访问：${result.statusCode || result.status || result.error}\n`);
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  // 显示并替换
  if (youkuSites.length > 0) {
    console.log('\n=== 跳转到优酷的网站 ===');
    youkuSites.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name} - ${t.url} → ${t.redirectUrl}`);
    });
    
    // 自动替换
    console.log('\n=== 开始替换 ===\n');
    let backupIndex = 0;
    
    tools = tools.map(tool => {
      const youkuSite = youkuSites.find(t => t.name === tool.name && t.category === '影视资源');
      if (youkuSite && backupIndex < backupMovieSites.length) {
        const backup = backupMovieSites[backupIndex];
        console.log(`🔄 替换 ${youkuSite.name}:`);
        console.log(`   旧：${youkuSite.url} (→ ${youkuSite.redirectUrl})`);
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
  } else {
    console.log('\n✅ 没有发现跳转到优酷的网站！');
  }
  
  // 显示统计
  const movieTools = tools.filter(t => t.category === '影视资源');
  console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
}

main().catch(console.error);
