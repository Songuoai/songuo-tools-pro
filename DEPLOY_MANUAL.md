# 🚀 Cloudflare Pages 手动部署指南

## 📋 为什么选择 Cloudflare Pages？

- ✅ **完全免费** - 不需要信用卡
- ✅ **国内能访问** - Cloudflare 有 CDN
- ✅ **自动 HTTPS** - 免费 SSL 证书
- ✅ **不限流量** - 免费套餐够用
- ✅ **快速部署** - 5 分钟搞定

---

## 🎯 部署步骤（手动上传，5 分钟）

### 第 1 步：注册 Cloudflare 账号

1. 打开：https://dash.cloudflare.com/sign-up
2. 输入邮箱（您的邮箱：`18611697817@163.com`）
3. 设置密码
4. 验证邮箱（会收到验证码）
5. 完成注册

**完全免费！不需要信用卡！**

---

### 第 2 步：创建 Pages 项目

1. 登录后访问：https://pages.cloudflare.com/
2. 点击 "**Create a project**"
3. 选择 "**Direct Upload**"（直接上传，不连 GitHub）
4. 输入项目名称：`songuo-tools-pro`
5. 点击 "**Create project**"

---

### 第 3 步：上传网站文件

1. 点击 "**Create deployment**"
2. 打开文件管理器，进入：`D:\松果工具箱-Pro\out`
3. **全选所有文件**（Ctrl + A）
4. **拖拽到** Cloudflare Pages 的上传区域
5. 等待上传完成（约 1-2 分钟）

---

### 第 4 步：完成部署

上传完成后：
1. 点击 "**Save and Deploy**"
2. 等待 1-2 分钟
3. 部署完成后会显示：
   - ✅ **Deployment complete**
   - 🌐 **Preview**: `https://songuo-tools-pro.pages.dev`

---

## 🎉 完成！

您的网站现在已经上线：
- **访问地址**: `https://songuo-tools-pro.pages.dev`
- ✅ **国内能访问**（Cloudflare 有 CDN）
- ✅ **自动 HTTPS**
- ✅ **完全免费**
- ✅ **不限流量**

---

## 📝 后续更新

每次更新网站后：
1. 在本地重新构建：`npm run build`
2. 在 Cloudflare Pages 点击 "**Create deployment**"
3. 再次拖拽 `out` 文件夹的所有文件
4. 等待部署完成

---

## 💡 提示

1. **out 文件夹位置**: `D:\松果工具箱-Pro\out`
2. **文件数量**: 约 50-100 个文件
3. **上传大小**: 约 5-10 MB
4. **上传时间**: 1-2 分钟（取决于网速）

---

## 🔗 重要链接

- **Cloudflare Pages**: https://pages.cloudflare.com/
- **注册页面**: https://dash.cloudflare.com/sign-up
- **管理后台**: https://dash.cloudflare.com/

---

老大，您现在按照上面的步骤操作，5 分钟搞定！🥟
