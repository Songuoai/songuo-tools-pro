const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 读取工具数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const allTools = jsonData.tools || [];

// 筛选影视资源分类
const movieTools = allTools.filter(t => t.category === '影视资源');
console.log(`影视资源分类工具数：${movieTools.length}`);
console.log('\n=== 开始检测影视资源链接 ===\n');

// 检测链接是否可用
function checkUrl(url, timeout = 5000) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
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

// 批量检测
async function batchCheck(toolsToCheck, batchSize = 5) {
  const results = [];
  
  for (let i = 0; i < toolsToCheck.length; i += batchSize) {
    const batch = toolsToCheck.slice(i, i + batchSize);
    console.log(`\n检测 ${i + 1}-${Math.min(i + batchSize, toolsToCheck.length)} / ${toolsToCheck.length}`);
    
    const batchResults = await Promise.all(
      batch.map(tool => checkUrl(tool.url, 8000).then(result => ({ ...tool, ...result })))
    );
    
    results.push(...batchResults);
    
    batchResults.forEach(r => {
      if (r.status === 'ok') {
        console.log(`✅ ${r.name}: ${r.url}`);
      } else {
        console.log(`❌ ${r.name}: ${r.url} - ${r.statusCode || r.status || r.error}`);
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  return results;
}

// 主函数
async function main() {
  const results = await batchCheck(movieTools);
  
  const ok = results.filter(r => r.status === 'ok');
  const fail = results.filter(r => r.status !== 'ok');
  
  console.log('\n=== 影视资源检测结果 ===');
  console.log(`✅ 可用：${ok.length}`);
  console.log(`❌ 失效：${fail.length}`);
  console.log(`📊 可用率：${((ok.length / movieTools.length) * 100).toFixed(1)}%`);
  
  if (fail.length > 0) {
    console.log('\n=== 失效链接列表 ===');
    fail.forEach(f => {
      console.log(`- ${f.name}: ${f.url} (${f.status || f.error})`);
    });
    
    // 保存失效列表
    const failPath = path.join(__dirname, '..', 'data', 'movie-failed.json');
    fs.writeFileSync(failPath, JSON.stringify(fail, null, 2), 'utf-8');
    console.log(`\n💾 失效列表已保存到：${failPath}`);
  }
}

main().catch(console.error);
