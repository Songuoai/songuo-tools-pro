const fs = require('fs');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = './data/tools.json';
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

console.log(`📊 总工具数：${tools.length}\n`);

// 检测链接是否跳转到影视网站
function checkRedirect(url, timeout = 8000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout, maxRedirects: 5 }, (res) => {
      const finalUrl = res.responseUrl || url;
      // 检测是否跳转到影视网站
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

// 主函数
async function main() {
  const needFix = [];
  
  console.log('=== 开始检测所有工具链接 ===\n');
  
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    console.log(`检测 ${i + 1}/${tools.length}: ${tool.name} (${tool.category})`);
    console.log(`  网址：${tool.url}`);
    
    const result = await checkRedirect(tool.url);
    
    if (result.status === 'movie_redirect') {
      console.log(`  ❌ 跳转到影视：${result.redirectUrl}\n`);
      needFix.push({ ...tool, redirectUrl: result.redirectUrl });
    } else if (result.status === 'ok') {
      console.log(`  ✅ 可用\n`);
    } else {
      console.log(`  ⚠️  无法访问：${result.statusCode || result.status || result.error}\n`);
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // 显示需要修复的
  if (needFix.length > 0) {
    console.log('\n========================================');
    console.log('❌ 需要修复的网站（跳转到影视）：');
    console.log('========================================');
    needFix.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name} (${t.category})`);
      console.log(`   原网址：${t.url}`);
      console.log(`   跳转到：${t.redirectUrl}\n`);
    });
  } else {
    console.log('\n✅ 所有网站都正常，没有跳转到影视的！');
  }
}

main().catch(console.error);
