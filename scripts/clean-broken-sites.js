const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 读取数据
const dataPath = path.join(__dirname, '..', 'data', 'tools.json');
let fileData = fs.readFileSync(dataPath, 'utf-8');
let jsonData = JSON.parse(fileData);
let tools = jsonData.tools || [];

// 删除刘明叶搜索
const liumingyeIndex = tools.findIndex(t => t.name === '刘明叶搜索');
if (liumingyeIndex !== -1) {
  console.log(`❌ 删除：刘明叶搜索`);
  tools.splice(liumingyeIndex, 1);
}

// 检测链接是否可用
function checkUrl(url, timeout = 8000) {
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
  console.log('\n=== 开始检测影视网站 ===\n');
  
  const needDelete = [];
  
  // 只检测影视资源分类
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    if (tool.category !== '影视资源') continue;
    
    console.log(`检测 ${i + 1}/${tools.length}: ${tool.name}`);
    const result = await checkUrl(tool.url);
    
    if (result.status === 'ok') {
      console.log(`  ✅ 可用\n`);
    } else {
      console.log(`  ❌ 失效 - ${result.statusCode || result.status || result.error}\n`);
      needDelete.push({ name: tool.name, url: tool.url, reason: result.statusCode || result.status || result.error });
    }
    
    // 延迟避免过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  // 删除失效的网站
  if (needDelete.length > 0) {
    console.log('\n=== 需要删除的网站 ===');
    needDelete.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name} - ${t.url} (${t.reason})`);
    });
    
    // 执行删除
    const beforeCount = tools.length;
    tools = tools.filter(tool => {
      const shouldDelete = needDelete.find(t => t.name === tool.name && t.url === tool.url);
      return !shouldDelete;
    });
    
    console.log(`\n✅ 删除了 ${needDelete.length} 个失效网站`);
    console.log(`   删除前：${beforeCount}个，删除后：${tools.length}个`);
  } else {
    console.log('\n✅ 所有网站都可用！');
  }
  
  // 保存
  const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
  const outputData = { tools };
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
  
  console.log(`\n💾 已保存到：${outputPath}`);
  
  // 显示影视资源分类统计
  const movieTools = tools.filter(t => t.category === '影视资源');
  console.log(`\n🎬 影视资源分类：${movieTools.length}个`);
  
  return needDelete;
}

main().catch(console.error);
