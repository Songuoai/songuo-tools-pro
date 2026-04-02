# 🚀 Railway 部署指南（支持 Next.js SSR）

## 📋 为什么选择 Railway？

- ✅ **免费套餐** - $5 免费额度/月（够用）
- ✅ **支持 Next.js** - 完整 SSR 支持
- ✅ **自动部署** - 连接 GitHub 自动更新
- ✅ **国内能访问** - Railway 全球 CDN
- ✅ **简单快捷** - 5 分钟部署

---

## 🎯 部署步骤

### 第 1 步：注册 Railway

1. 打开：https://railway.app/
2. 点击 "**Start a New Project**"
3. 选择 "**Login with GitHub**"
4. 授权 Railway 访问 GitHub

---

### 第 2 步：创建项目

1. 点击 "**New Project**"
2. 选择 "**Deploy from GitHub repo**"
3. 选择仓库：`Songuoai/songuo-tools-pro`
4. 点击 "**Deploy Now**"

---

### 第 3 步：配置环境变量

在 Railway 面板中，添加环境变量：
```
NODE_ENV = production
PORT = 3000
```

---

### 第 4 步：等待部署

等待 3-5 分钟，部署完成后会获得：
- 🌐 **访问地址**: `https://songuo-tools-pro.up.railway.app`
- ✅ **自动 HTTPS**
- ✅ **支持 SSR**
- ✅ **自动部署**

---

## 🎉 完成！

您的网站现在已经上线，支持所有功能（包括动态路由）！

---

## 💡 提示

Railway 提供 $5 免费额度/月，对于个人项目完全够用！
