# 🤖 Zero Token 替代方案

**问题：** zero-token 未全局安装（npm 上找不到）

**解决方案：** 使用 agent-browser 直接完成浏览器自动化

---

## ✅ 已安装工具

- ✅ **agent-browser** - 浏览器自动化工具
- ✅ **浏览器** - 系统默认浏览器

---

## 🎯 使用 agent-browser 生成图片

### 方案 1：手动生成（推荐）

**步骤：**
1. 打开通义万相：https://wanxiang.aliyun.com/
2. 登录账号（使用 1335979521@qq.com）
3. 点击"文生图"
4. 复制《第 1 集 AI 绘画描述词清单.md》中的描述词
5. 粘贴到输入框
6. 点击"生成"
7. 下载满意图片

**预计时间：** 1-2 小时（45 张图片）

---

### 方案 2：半自动化（推荐）

**使用 agent-browser 脚本：**

```bash
# 1. 打开通义万相
agent-browser open https://wanxiang.aliyun.com/

# 2. 截图查看
agent-browser snapshot

# 3. 手动登录后，继续自动化
# 4. 输入描述词
agent-browser fill @e1 "描述词内容"

# 5. 点击生成
agent-browser click @e2

# 6. 等待生成
agent-browser wait 5000

# 7. 下载图片
agent-browser screenshot output.png
```

---

### 方案 3：完全自动化（需要登录状态）

**创建自动化脚本：**

```javascript
// generate-images.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // 1. 打开通义万相
  await page.goto('https://wanxiang.aliyun.com/');
  
  // 2. 等待手动登录
  console.log('请登录账号...');
  await page.waitForSelector('.user-avatar', { timeout: 300000 });
  
  // 3. 进入文生图
  await page.click('text=文生图');
  
  // 4. 读取描述词
  const prompts = [
    '25 岁中国男性，黑色短发略显凌乱...',
    '28 岁中国女性，黑色长直发...',
    // ... 更多描述词
  ];
  
  // 5. 批量生成
  for (const prompt of prompts) {
    await page.fill('textarea', prompt);
    await page.click('button:has-text("生成")');
    await page.waitForTimeout(30000); // 等待生成
    
    // 下载图片
    // ...
  }
  
  await browser.close();
})();
```

---

## 📝 推荐流程

### 最快方案（手动）

**时间：** 1-2 小时
**步骤：**
1. 打开通义万相
2. 登录账号
3. 批量输入描述词
4. 下载图片

**优点：**
- ✅ 立即可开始
- ✅ 无需配置
- ✅ 可以选择最佳效果

**缺点：**
- ⏳ 需要手动操作

---

### 半自动方案

**时间：** 30 分钟配置 + 1 小时生成
**步骤：**
1. 安装 agent-browser（已完成）
2. 创建自动化脚本
3. 手动登录一次
4. 运行脚本批量生成

**优点：**
- ✅ 减少重复操作
- ✅ 可以后台运行

**缺点：**
- ⏳ 需要配置脚本

---

## 🚀 立即开始

### 方案 1：手动生成（现在就开始）

1. **打开通义万相：** https://wanxiang.aliyun.com/
2. **登录账号：** 1335979521@qq.com
3. **打开描述词文件：** `Desktop\松果小馒头工作区\末日：我的系统太不正经了\第 1 集 AI 绘画描述词清单.md`
4. **开始生成：** 复制描述词 → 粘贴 → 生成 → 下载

---

## 📊 图片生成清单

### 第 1 集（45 张）

**角色类（10 张）：**
- [ ] 1. 林默 - 正面
- [ ] 2. 林默 - 侧面
- [ ] 3. 林默 - 战斗姿势
- [ ] 4. 苏冷霜 - 正面
- [ ] 5. 苏冷霜 - 惊恐
- [ ] 6. 苏冷霜 - 警惕
- [ ] 7. 女丧尸 - 正面
- [ ] 8. 女丧尸 - 背面
- [ ] 9. 系统光屏
- [ ] 10. 系统属性面板

**场景类（15 张）：**
- [ ] 11-25. 场景图片

**动作类（10 张）：**
- [ ] 26-35. 动作图片

**特效类（5 张）：**
- [ ] 36-40. 特效图片

**封面类（5 张）：**
- [ ] 41-45. 封面图片

---

## 💡 提示

### 保持角色一致性
使用通义万相的"添加角色"功能：
1. 创建角色库（林默、苏冷霜、女丧尸）
2. 选择角色后生成
3. 保持角色特征一致

### 批量生成技巧
1. 一次输入 3-5 个描述词
2. 同时生成多个版本
3. 选择最好的下载
4. 按编号保存

### 图片命名
- `01_林默正面.png`
- `02_林默侧面.png`
- 按分类文件夹保存

---

**准备人：** 松果小馒头 🥟  
**准备时间：** 2026-03-25 21:20  
**状态：** ✅ agent-browser 已安装，可以开始生成

🫡 推荐手动生成，1-2 小时完成第 1 集！
