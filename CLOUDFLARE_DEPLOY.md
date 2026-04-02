# Cloudflare Pages 自动部署脚本

## 🎯 方案：Cloudflare Pages（完全免费 + 国内能访问）

### 优势：
- ✅ 完全免费
- ✅ 国内能访问（Cloudflare 有 CDN）
- ✅ 自动 HTTPS
- ✅ 不限流量
- ✅ 支持 Next.js

---

## 🚀 部署步骤（只需 3 步）

### 第 1 步：打开 Cloudflare Pages
访问：https://pages.cloudflare.com/

### 第 2 步：连接 GitHub
1. 点击"**Connect to Git**"
2. 授权 Cloudflare 访问 GitHub
3. 选择仓库：`Songuoai/songuo-tools-pro`

### 第 3 步：配置并部署
1. **Project name**: `songuo-tools-pro`
2. **Production branch**: `main`
3. **Build command**: `npm run build`
4. **Build output directory**: `.next`
5. 点击"**Save and Deploy**"

---

## 🎉 完成！

部署完成后会获得：
- **生产域名**: `https://songuo-tools-pro.pages.dev`
- **国内能访问**
- **自动 HTTPS**
- **完全免费**

---

## 📝 备注

如果 GitHub 连接有问题，也可以：
1. 直接上传 `out` 文件夹到 Cloudflare Pages
2. 或者用 Wrangler CLI 部署

老大，您现在打开 https://pages.cloudflare.com/ 按照上面的步骤操作，5 分钟搞定！
