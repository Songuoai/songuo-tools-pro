const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 读取工具数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
const fileData = fs.readFileSync(dataPath, 'utf-8');
const jsonData = JSON.parse(fileData);
const tools = jsonData.tools || [];

console.log(`总工具数：${tools.length}`);

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

// 批量检测（每次 10 个，避免过快）
async function batchCheck(toolsToCheck, batchSize = 10) {
  const results = [];
  
  for (let i = 0; i < toolsToCheck.length; i += batchSize) {
    const batch = toolsToCheck.slice(i, i + batchSize);
    console.log(`\n检测 ${i + 1}-${Math.min(i + batchSize, toolsToCheck.length)} / ${toolsToCheck.length}`);
    
    const batchResults = await Promise.all(
      batch.map(tool => checkUrl(tool.url).then(result => ({ ...tool, ...result })))
    );
    
    results.push(...batchResults);
    
    // 显示进度
    batchResults.forEach(r => {
      if (r.status === 'ok') {
        console.log(`✅ ${r.name}: ${r.url}`);
      } else {
        console.log(`❌ ${r.name}: ${r.url} - ${r.statusCode || r.status || r.error}`);
      }
    });
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
}

// 主函数
async function main() {
  console.log('\n=== 开始检测工具链接 ===\n');
  
  const results = await batchCheck(tools);
  
  // 统计结果
  const ok = results.filter(r => r.status === 'ok');
  const fail = results.filter(r => r.status !== 'ok');
  
  console.log('\n=== 检测结果 ===');
  console.log(`✅ 可用：${ok.length}`);
  console.log(`❌ 失效：${fail.length}`);
  console.log(`📊 可用率：${((ok.length / tools.length) * 100).toFixed(1)}%`);
  
  // 保存失效链接列表
  if (fail.length > 0) {
    const failPath = path.join(__dirname, '..', 'data', 'failed-links-2.json');
    fs.writeFileSync(failPath, JSON.stringify(fail, null, 2), 'utf-8');
    console.log(`\n失效链接已保存到：${failPath}`);
  }
  
  // 保存更新后的数据（标记失效的）
  const updatedTools = tools.map(tool => {
    const result = results.find(r => r.id === tool.id);
    return result && result.status === 'ok' ? tool : { ...tool, _broken: true, _status: result?.status };
  });
  
  const updatePath = path.join(__dirname, '..', 'data', 'tools-final.json');
  fs.writeFileSync(updatePath, JSON.stringify({ tools: updatedTools }, null, 2), 'utf-8');
  console.log(`完整结果已保存到：${updatePath}`);
  
  // 显示失效列表
  if (fail.length > 0) {
    console.log('\n=== 失效链接列表 ===');
    fail.forEach(f => {
      console.log(`- ${f.name}: ${f.url} (${f.status || f.error})`);
    });
  }
}

main().catch(console.error);
