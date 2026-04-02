# 🚀 Cloudflare Pages 部署指南

## 📋 部署步骤（只需 5 分钟）

### 第 1 步：注册 Cloudflare 账号

1. 打开：https://dash.cloudflare.com/sign-up
2. 输入邮箱：`18611697817@163.com`（或其他邮箱）
3. 设置密码
4. 验证邮箱（会收到验证码）
5. 完成注册

**完全免费！不需要信用卡！**

---

### 第 2 步：创建 Pages 项目

1. 登录后访问：https://pages.cloudflare.com/
2. 点击 "**Create a project**"
3. 选择 "**Connect to Git**"
4. 点击 "**Authorize Cloudflare**"（授权访问 GitHub）
5. 选择仓库：`Songuoai/songuo-tools-pro`
6. 点击 "**Begin setup**"

---

### 第 3 步：配置部署

**Project name**: `songuo-tools-pro`  
**Production branch**: `main`  

**Build settings**:
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`

**环境变量**（可选）:
```
NODE_VERSION = 18
```

---

### 第 4 步：开始部署

点击 "**Save and Deploy**"

等待 3-5 分钟，部署完成后会显示：
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
- ✅ **自动部署**（每次 Git push 自动更新）

---

## 📝 后续更新

每次推送代码到 GitHub 后：
1. Cloudflare Pages 会自动检测到变更
2. 自动开始构建和部署
3. 2-3 分钟后网站自动更新

无需任何手动操作！

---

## 💡 提示

如果遇到问题：
1. 检查 GitHub 仓库是否是公开的
2. 确保 `package.json` 中有正确的 build 命令
3. 查看 Cloudflare Pages 的部署日志

---

老大，您现在打开 https://pages.cloudflare.com/ 按照上面的步骤操作，5 分钟搞定！🥟
