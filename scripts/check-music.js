const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/tools.json', 'utf-8'));
const music = data.tools.filter(t => t.category === '在线音乐');

console.log('在线音乐工具数:', music.length);
console.log('\n工具列表:');
music.forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} - ${t.url}`);
});
