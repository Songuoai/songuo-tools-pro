const fs = require('fs');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = './data/tools.json';
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

console.log(`📊 总工具数：${tools.length}\n`);

// 按分类统计
const categories = {};
tools.forEach(t => {
  if (!categories[t.category]) categories[t.category] = [];
  categories[t.category].push(t);
});

// 检测链接
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

// 主函数
async function main() {
  const results = { ok: [], fail: [] };
  
  for (const [category, categoryTools] of Object.entries(categories)) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📁 分类：${category} (${categoryTools.length}个)`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    for (let i = 0; i < categoryTools.length; i++) {
      const tool = categoryTools[i];
      const result = await checkUrl(tool.url, 8000);
      
      if (result.status === 'ok') {
        console.log(`✅ ${i + 1}. ${tool.name}`);
        results.ok.push({ ...tool, ...result });
      } else {
        console.log(`❌ ${i + 1}. ${tool.name} - ${tool.url} (${result.statusCode || result.status || result.error})`);
        results.fail.push({ ...tool, ...result });
      }
      
      // 延迟避免过快
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  // 保存结果
  console.log(`\n\n=== 检测结果汇总 ===`);
  console.log(`✅ 可用：${results.ok.length}`);
  console.log(`❌ 失效：${results.fail.length}`);
  console.log(`📊 可用率：${((results.ok.length / tools.length) * 100).toFixed(1)}%`);
  
  if (results.fail.length > 0) {
    console.log(`\n❌ 失效链接列表:`);
    results.fail.forEach(t => {
      console.log(`  - ${t.name} (${t.category}): ${t.url}`);
    });
    
    // 保存失效列表
    fs.writeFileSync('./data/failed-tools.json', JSON.stringify(results.fail, null, 2), 'utf-8');
    console.log(`\n💾 失效列表已保存到：./data/failed-tools.json`);
  }
}

main().catch(console.error);
