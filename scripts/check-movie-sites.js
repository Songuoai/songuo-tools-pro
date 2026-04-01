const fs = require('fs');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = './data/tools.json';
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 筛选影视资源分类
const movieTools = tools.filter(t => t.category === '影视资源');
console.log(`🎬 影视资源分类 (${movieTools.length}个)\n`);

// 检测链接并验证内容
function checkMovieSite(url, timeout = 8000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        // 验证是否是影视网站（检查 HTML 中是否包含影视相关关键词）
        const movieKeywords = ['电影', '影视', '视频', '动漫', '电视剧', '在线观看', '免费观看', 'movie', 'film', 'video', 'anime'];
        const isMovieSite = movieKeywords.some(keyword => html.toLowerCase().includes(keyword.toLowerCase()));
        
        if (res.statusCode >= 200 && res.statusCode < 400 && isMovieSite) {
          resolve({ url, status: 'ok', isMovie: true });
        } else if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve({ url, status: 'wrong_content', isMovie: false, statusCode: res.statusCode });
        } else {
          resolve({ url, status: 'fail', statusCode: res.statusCode });
        }
      });
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

// 备用影视网站列表
const backupSites = [
  { name: 'NFM 影视', url: 'https://www.nfmovies.com', desc: 'NFM 影视 - 免费在线电影观看' },
  { name: '达达龟', url: 'https://www.dadagui.com', desc: '达达龟 - 免费在线电影观看' },
  { name: '两个BT', url: 'https://www.bttwo.com', desc: '两个 BT - 电影下载网站' },
  { name: '新片吧', url: 'https://www.xinpin8.com', desc: '新片吧 - 最新电影下载' },
  { name: '影视工场', url: 'https://www.ysgc.cc', desc: '影视工场 - 免费在线观影' },
  { name: '厂长资源', url: 'https://www.czzzyy.net', desc: '厂长资源 - 免费影视资源' },
  { name: '追剧啦', url: 'https://www.zhuiju.la', desc: '追剧啦 - 免费在线追剧' },
  { name: '快看影视', url: 'https://www.kuaikanys.cc', desc: '快看影视 - 免费在线观影' }
];

// 主函数
async function main() {
  const results = { ok: [], needReplace: [] };
  
  console.log('=== 开始检测影视网站 ===\n');
  
  for (let i = 0; i < movieTools.length; i++) {
    const tool = movieTools[i];
    console.log(`检测 ${i + 1}/${movieTools.length}: ${tool.name}`);
    console.log(`  网址：${tool.url}`);
    
    const result = await checkMovieSite(tool.url);
    
    if (result.status === 'ok') {
      console.log(`  ✅ 可用 - 是影视网站\n`);
      results.ok.push(tool);
    } else if (result.status === 'wrong_content') {
      console.log(`  ❌ 内容不符 - 不是影视网站\n`);
      results.needReplace.push({ ...tool, reason: 'wrong_content' });
    } else {
      console.log(`  ❌ 无法访问 - ${result.statusCode || result.status || result.error}\n`);
      results.needReplace.push({ ...tool, reason: 'unreachable' });
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 显示需要替换的列表
  if (results.needReplace.length > 0) {
    console.log('\n=== 需要替换的网站 ===');
    results.needReplace.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name} - ${t.url} (${t.reason})`);
    });
    
    // 保存需要替换的列表
    fs.writeFileSync('./data/movie-need-replace.json', JSON.stringify(results.needReplace, null, 2), 'utf-8');
    console.log(`\n💾 需要替换的列表已保存到：./data/movie-need-replace.json`);
  }
  
  console.log(`\n=== 检测结果汇总 ===`);
  console.log(`✅ 可用：${results.ok.length}`);
  console.log(`❌ 需要替换：${results.needReplace.length}`);
  
  return results;
}

main().then(results => {
  // 自动替换
  if (results.needReplace.length > 0) {
    console.log('\n\n=== 开始自动替换 ===\n');
    
    let backupIndex = 0;
    tools = tools.map(tool => {
      if (tool.category !== '影视资源') return tool;
      
      const needReplace = results.needReplace.find(t => t.name === tool.name);
      if (needReplace && backupIndex < backupSites.length) {
        const backup = backupSites[backupIndex];
        console.log(`🔄 替换 ${tool.name}:`);
        console.log(`   旧：${tool.url}`);
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
}).catch(console.error);
