# 🚀 松果工具箱 Pro - Vercel 部署详细指南

**最后更新：** 2026-03-27  
**预计时间：** 10 分钟  
**难度：** ⭐⭐（简单）

---

## 📋 部署前准备

### 已完成 ✅
- [x] Git 仓库初始化
- [x] 代码提交（147 个文件，44748 行代码）
- [x] Supabase 数据库配置
- [x] 114 个工具数据导入

### 需要做的 ⏳
- [ ] 创建 GitHub 账号（如果还没有）
- [ ] 创建 Vercel 账号
- [ ] 推送代码到 GitHub
- [ ] 部署到 Vercel

---

## 📝 步骤 1：创建 GitHub 账号（2 分钟）

### 如果没有 GitHub 账号

**访问：** https://github.com/signup

**填写信息：**
- 邮箱：`1335979521@qq.com`
- 密码：设置一个强密码
- 用户名：例如 `songguo-tools` 或 `zhuyongsong`
- 验证：完成邮箱验证

### 如果已有 GitHub 账号

直接登录：https://github.com/login

---

## 📝 步骤 2：创建 GitHub 仓库（2 分钟）

### 方式 A：使用 GitHub Desktop（推荐新手）

1. **下载 GitHub Desktop：**
   - 访问：https://desktop.github.com
   - 下载安装

2. **登录 GitHub Desktop：**
   - 使用 GitHub 账号登录

3. **添加现有项目：**
   - 点击 "File" → "Add local repository"
   - 选择文件夹：`D:\松果工具箱-Pro`
   - 点击 "Add repository"

4. **发布到 GitHub：**
   - 点击右上角 "Publish repository"
   - 填写仓库名称：`songguo-tools-pro`
   - 勾选 "Keep this code private"（可选）
   - 点击 "Publish repository"

### 方式 B：使用命令行（推荐）

**打开 PowerShell，执行以下命令：**

```powershell
# 1. 创建 GitHub 个人访问令牌
# 访问：https://github.com/settings/tokens/new
# 勾选：repo, workflow
# 复制生成的 token（以 ghp_ 开头）

# 2. 添加远程仓库（替换 YOUR_TOKEN 和 YOUR_USERNAME）
cd "D:\松果工具箱-Pro"
git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/songguo-tools-pro.git

# 3. 推送代码
git branch -M main
git push -u origin main
```

**或者使用 SSH（如果配置了 SSH key）：**

```powershell
cd "D:\松果工具箱-Pro"
git remote add origin git@github.com:YOUR_USERNAME/songguo-tools-pro.git
git branch -M main
git push -u origin main
```

---

## 📝 步骤 3：创建 Vercel 账号（1 分钟）

**访问：** https://vercel.com

**点击：** "Sign Up"

**选择登录方式：**
- 推荐：使用 GitHub 登录（最方便）
- 或者：使用邮箱注册

---

## 📝 步骤 4：部署到 Vercel（3 分钟）

### 4.1 导入项目

1. **点击：** "Add New Project"

2. **选择 Git 仓库：**
   - 选择 "GitHub"
   - 找到 `songguo-tools-pro` 仓库
   - 点击 "Import"

### 4.2 配置环境变量

**在 Vercel 项目页面：**

1. 点击 "Settings" → "Environment Variables"

2. 添加以下环境变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://oxcxwwxkqtprddqwxvvx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3h3d3hrcXRwcmRkcXd4dnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MDIzNzcsImV4cCI6MjA4OTk3ODM3N30.BrnuMg7JhaNxQIMt2ZXy20umV21FTK7rK63y-wM7kLA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y3h3d3hrcXRwcmRkcXd4dnZ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQwMjM3NywiZXhwIjoyMDg5OTc4Mzc3fQ.D6-tWosUi2LWmKe3WTs1AlpO8iOOAajZ9-Szusrinwk
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

3. 点击 "Save"

### 4.3 开始部署

1. 点击 "Deploy"
2. 等待 2-3 分钟
3. 部署成功后会获得一个 URL：`https://songguo-tools-pro.vercel.app`

---

## 📝 步骤 5：配置自定义域名（可选）

### 使用现有域名

**如果已有域名：** `tools.hefeiapp.top`

1. 在 Vercel 项目页面，点击 "Settings" → "Domains"
2. 添加域名：`tools.hefeiapp.top`
3. 按照提示配置 DNS：
   - 类型：CNAME
   - 名称：tools
   - 值：cname.vercel-dns.com

### 使用 Vercel 免费域名

- 默认域名：`songguo-tools-pro.vercel.app`
- 无需额外配置

---

## ✅ 部署验证清单

### 网站功能测试

- [ ] 首页正常加载
- [ ] 搜索功能可用
- [ ] 分类页面正常
- [ ] 工具详情页正常
- [ ] 登录/注册页面
- [ ] 后台管理（/admin/dashboard）
- [ ] 移动端适配

### 数据库连接测试

- [ ] 工具列表加载成功
- [ ] 分类数据显示
- [ ] 搜索返回结果

---

## 🔧 常见问题

### Q1: 部署失败怎么办？

**检查：**
1. 环境变量是否正确
2. Supabase 项目是否可访问
3. 查看 Vercel 部署日志

### Q2: 网站加载慢？

**解决：**
1. Vercel 自动全球 CDN，通常很快
2. 国内访问可能需要代理
3. 考虑使用国内 CDN

### Q3: 如何更新代码？

**推送更新：**
```powershell
cd "D:\松果工具箱-Pro"
git add .
git commit -m "更新说明"
git push
```
Vercel 会自动重新部署（约 1-2 分钟）

### Q4: 如何查看部署日志？

**访问：**
- Vercel 项目页面 → "Deployments"
- 点击任意部署 → "View Logs"

---

## 📊 部署后状态

**预期结果：**

| 项目 | 状态 |
|------|------|
| 网站 URL | https://songguo-tools-pro.vercel.app |
| 数据库 | Supabase（新加坡节点） |
| 工具数量 | 114 个 |
| 分类数量 | 10 个 |
| 自动部署 | ✅ Git 推送后自动更新 |
| SSL 证书 | ✅ 自动配置 |
| CDN | ✅ 全球加速 |

---

## 🎉 完成！

**恭喜！你的网站已经上线了！**

**下一步：**
1. 分享给朋友测试
2. 继续添加工具数据
3. 优化 SEO
4. 提交到搜索引擎

---

## 📞 需要帮助？

**文档：**
- Vercel 文档：https://vercel.com/docs
- Next.js 文档：https://nextjs.org/docs
- Supabase 文档：https://supabase.com/docs

**联系方式：**
- 邮箱：1335979521@qq.com

---

**部署人：** 松果小馒头 🤖  
**部署时间：** 2026-03-27  
**版本：** v1.0.0

🚀 **松果工具箱 Pro，正式上线！**
