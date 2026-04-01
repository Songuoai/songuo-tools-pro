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
function checkRedirect(url, timeout = 10000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout, maxRedirects: 10 }, (res) => {
      const finalUrl = res.responseUrl || url;
      
      // 检测是否跳转到影视网站
      if (finalUrl.includes('ddys')) {
        resolve({ url, status: 'ddys_redirect', redirectUrl: finalUrl });
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

// 主函数
async function main() {
  const ddysSites = [];
  
  console.log('=== 开始检测跳转到低端影视的网站 ===\n');
  
  for (let i = 0; i < musicTools.length; i++) {
    const tool = musicTools[i];
    console.log(`检测 ${i + 1}/${musicTools.length}: ${tool.name}`);
    console.log(`  网址：${tool.url}`);
    
    const result = await checkRedirect(tool.url);
    
    if (result.status === 'ddys_redirect') {
      console.log(`  ❌ 跳转到低端影视：${result.redirectUrl}\n`);
      ddysSites.push({ ...tool, redirectUrl: result.redirectUrl });
    } else if (result.status === 'ok') {
      console.log(`  ✅ 可用：${result.finalUrl}\n`);
    } else {
      console.log(`  ⚠️  无法访问：${result.statusCode || result.status || result.error}\n`);
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 显示结果
  if (ddysSites.length > 0) {
    console.log('\n========================================');
    console.log('❌ 跳转到低端影视的网站：');
    console.log('========================================');
    ddysSites.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name}`);
      console.log(`   原网址：${t.url}`);
      console.log(`   跳转到：${t.redirectUrl}\n`);
    });
  } else {
    console.log('\n✅ 没有发现跳转到低端影视的网站！');
  }
}

main().catch(console.error);
