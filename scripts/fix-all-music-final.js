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
                          finalUrl.includes('80s.tw') ||
                          finalUrl.includes('tgws') ||
                          finalUrl.includes('22a5') ||
                          finalUrl.includes('acgjc') ||
                          finalUrl.includes('52wusun') ||
                          finalUrl.includes('buguyy') ||
                          finalUrl.includes('flmp3') ||
                          finalUrl.includes('yym4') ||
                          finalUrl.includes('jywav') ||
                          finalUrl.includes('uncley') ||
                          finalUrl.includes('qingtingmusic') ||
                          finalUrl.includes('algermusic') ||
                          finalUrl.includes('xifengmusic');
      
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

// 真正可用的音乐网站（主流平台）
const realMusicSites = [
  { name: 'QQ 音乐', url: 'https://y.qq.com', desc: 'QQ 音乐 - 海量正版音乐' },
  { name: '网易云音乐', url: 'https://music.163.com', desc: '网易云音乐 - 音乐社交平台' },
  { name: '酷狗音乐', url: 'https://www.kugou.com', desc: '酷狗音乐 - 海量音乐在线试听' },
  { name: '酷我音乐', url: 'https://www.kuwo.cn', desc: '酷我音乐 - 在线音乐播放器' },
  { name: '咪咕音乐', url: 'https://music.migu.cn', desc: '咪咕音乐 - 中国移动音乐平台' },
  { name: '波点音乐', url: 'https://bodian.kugou.com', desc: '波点音乐 - 个性化推荐音乐' },
  { name: '猫耳 FM', url: 'https://www.missevan.com', desc: '猫耳 FM - 二次元音频平台' },
  { name: '荔枝 FM', url: 'https://www.lizhi.fm', desc: '荔枝 FM - 人人都是主播' },
  { name: '喜马拉雅', url: 'https://www.ximalaya.com', desc: '喜马拉雅 - 音频分享平台' },
  { name: '蜻蜓 FM', url: 'https://www.qingting.fm', desc: '蜻蜓 FM - 在线收音机' },
  { name: '懒人听书', url: 'https://www.lrts.me', desc: '懒人听书 - 有声小说平台' },
  { name: '5sing 音乐', url: 'https://5sing.kugou.com', desc: '5sing 音乐 - 原创音乐基地' },
  { name: '音悦台', url: 'https://www.yinyuetai.com', desc: '音悦台 - 高清 MV 平台' },
  { name: 'Bilibili 音乐', url: 'https://www.bilibili.com', desc: 'B 站音乐区 - 二次元音乐' },
  { name: 'YouTube Music', url: 'https://music.youtube.com', desc: 'YouTube Music - 谷歌音乐服务' },
  { name: 'SoundCloud', url: 'https://soundcloud.com', desc: 'SoundCloud - 音乐分享平台' },
  { name: '刘明叶搜索', url: 'https://tool.liumingye.cn', desc: '刘明叶搜索 - 音乐资源搜索工具' },
  { name: 'MusicFree', url: 'https://musicfree.uncley.cc', desc: 'MusicFree - 免费音乐播放器' },
  { name: 'YesPlayMusic', url: 'https://yesplaymusic.uncley.cc', desc: 'YesPlayMusic - 网易云第三方播放器' },
  { name: 'SPlayer', url: 'https://splayer.uncley.cc', desc: 'SPlayer - 简约音乐播放器' },
  { name: '米兔音乐', url: 'https://www.mitumusic.com', desc: '米兔音乐 - 在线音乐试听' },
  { name: 'mmPlayer', url: 'https://mmplayer.uncley.cc', desc: 'mmPlayer - 网易云在线播放器' },
  { name: '种子音乐', url: 'https://www.zz123.com', desc: '种子音乐 - 在线听歌下载' },
  { name: '洛雪音乐', url: 'https://lxmusic.toside.cn', desc: '洛雪音乐 - 跨平台音乐播放器' },
  { name: '铜钟音乐', url: 'https://tongzhong.top', desc: '铜钟音乐 - 在线音乐搜索' },
  { name: 'Music CenGuiGui', url: 'https://www.cenguigui.com', desc: 'Music CenGuiGui - 网页音乐播放器' },
  { name: '淘声网', url: 'https://www.tosound.com', desc: '淘声网 - 声音素材搜索' },
  { name: '站长音乐', url: 'https://tool.chinaz.com', desc: '站长音乐 - 在线音乐工具' },
  { name: '音乐转换器', url: 'https://www.aconvert.com', desc: '音乐转换器 - 格式转换工具' },
  { name: '在线剪歌', url: 'https://www.mp3cut.net', desc: '在线剪歌 - 音乐剪辑工具' },
  { name: '音乐标签', url: 'https://www.musicbrainz.org', desc: '音乐标签 - 音乐信息管理' }
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
    await new Promise(resolve => setTimeout(resolve, 200));
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
    
    // 使用真正的音乐网站替换
    console.log('\n=== 开始替换 ===\n');
    
    // 找出需要替换的网站名称
    const needReplaceNames = needReplace.map(t => t.name);
    
    // 找出可用的备用网站（不在线的）
    const existingNames = tools.map(t => t.name.toLowerCase());
    const availableBackups = realMusicSites.filter(site => 
      !existingNames.includes(site.name.toLowerCase())
    );
    
    let backupIndex = 0;
    
    tools = tools.map(tool => {
      if (tool.category !== '在线音乐') return tool;
      
      const broken = needReplace.find(t => t.name === tool.name && t.category === '在线音乐');
      if (broken && backupIndex < availableBackups.length) {
        const backup = availableBackups[backupIndex];
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
  
  // 显示最终列表
  console.log('\n📋 当前在线音乐列表:');
  finalMusicTools.forEach((t, i) => {
    console.log(`${i + 1}. ${t.name} - ${t.url}`);
  });
}

main().catch(console.error);
