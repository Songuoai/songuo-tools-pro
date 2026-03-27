# 🌰 松果工具箱 Pro

> 精选 1000+ 优质工具，一站式解决工作生活需求

[![Status](https://img.shields.io/badge/status-development-yellow)](https://github.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 📖 项目简介

**松果工具箱**是一个精选工具导航聚合平台，致力于帮助用户发现优质工具，提升工作生活效率。

### ✨ 特性

- 🎯 **精选工具** - 人工精选 1000+ 优质工具，持续更新
- 🔍 **智能搜索** - 快速找到你需要的工具
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- 👤 **用户系统** - 收藏、评论、投稿功能
- 📊 **数据统计** - 实时访问统计、热门工具排行
- 🎨 **精美设计** - 现代化 UI，流畅交互体验

### 🔗 链接

- **网站：** https://tools.hefeiapp.top
- **反馈：** tools@hefeiapp.top
- **合作：** https://tools.hefeiapp.top/pages/advertise.html

---

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 pnpm
- Supabase 账号
- Vercel 账号（部署用）

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/songguo-tools/songguo-tools-pro.git
cd songguo-tools-pro

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 4. 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 环境变量

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📦 技术栈

### 前端
- **框架：** [Next.js 14](https://nextjs.org/) (App Router)
- **语言：** [TypeScript](https://www.typescriptlang.org/)
- **样式：** [Tailwind CSS](https://tailwindcss.com/)
- **组件：** [shadcn/ui](https://ui.shadcn.com/)
- **图标：** [Lucide React](https://lucide.dev/)
- **状态管理：** [Zustand](https://zustand-demo.pmnd.rs/)
- **表单：** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### 后端
- **BaaS：** [Supabase](https://supabase.com/)
  - PostgreSQL 数据库
  - 用户认证（Auth）
  - 文件存储（Storage）
  - 实时订阅（Realtime）

### 部署
- **前端：** [Vercel](https://vercel.com/)
- **后端：** Supabase Cloud
- **CDN：** Cloudflare
- **监控：** Vercel Analytics + Google Analytics

---

## 📁 项目结构

```
songguo-tools-pro/
├── docs/                    # 项目文档
│   ├── 01-项目概述.md
│   ├── 02-功能规划.md
│   ├── 03-技术架构.md
│   ├── 04-开发计划.md
│   ├── 05-数据库设计.md
│   └── 06-部署方案.md
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (home)/         # 首页组
│   │   ├── category/       # 分类页
│   │   ├── tool/           # 工具详情页
│   │   ├── topic/          # 专题页
│   │   ├── search/         # 搜索页
│   │   ├── user/           # 用户中心
│   │   ├── auth/           # 认证页面
│   │   ├── api/            # API 路由
│   │   └── admin/          # 管理后台
│   │
│   ├── components/         # 组件库
│   │   ├── ui/             # 基础 UI
│   │   ├── layout/         # 布局组件
│   │   ├── tool/           # 工具组件
│   │   └── search/         # 搜索组件
│   │
│   ├── lib/                # 工具函数
│   ├── hooks/              # 自定义 Hooks
│   ├── stores/             # Zustand Stores
│   ├── types/              # TypeScript 类型
│   └── styles/             # 样式文件
│
├── public/                 # 静态资源
├── tests/                  # 测试文件
└── deploy/                 # 部署配置
```

---

## 🗄️ 数据库

### 主要数据表

| 表名 | 说明 |
|------|------|
| `categories` | 分类表 |
| `tools` | 工具表 |
| `users` | 用户表 |
| `favorites` | 收藏表 |
| `comments` | 评论表 |
| `submissions` | 投稿表 |
| `topics` | 专题表 |
| `analytics` | 统计表 |

详细设计见：[docs/05-数据库设计.md](docs/05-数据库设计.md)

---

## 🛠️ 开发命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器
npm run lint             # 运行 ESLint

# 测试
npm run test             # 运行测试
npm run test:watch       # 监听模式
npm run test:e2e         # 端到端测试

# 数据库
npm run db:push          # 推送 Schema 到 Supabase
npm run db:pull          # 从 Supabase 拉取 Schema
npm run db:seed          # 种子数据

# 部署
npm run build            # 构建
vercel --prod           # 部署到 Vercel
```

---

## 📋 功能清单

### 前台功能
- [x] 首页（工具分类、热门推荐）
- [x] 工具列表页（筛选、排序）
- [x] 工具详情页（介绍、评价、推荐）
- [x] 搜索页（关键词搜索、筛选）
- [x] 专题页（工具合集）
- [ ] 用户中心（收藏、历史、投稿）
- [ ] 登录/注册
- [ ] 收藏功能
- [ ] 评论功能
- [ ] 工具投稿

### 后台功能
- [ ] 管理仪表盘
- [ ] 工具管理（CRUD）
- [ ] 分类管理
- [ ] 专题管理
- [ ] 用户管理
- [ ] 评论管理
- [ ] 投稿审核
- [ ] 系统设置

---

## 🚧 开发进度

| 阶段 | 状态 | 完成度 |
|------|------|--------|
| Phase 1: 项目启动 | ✅ 完成 | 100% |
| Phase 2: 前端开发 | 🚧 进行中 | 0% |
| Phase 3: 用户系统 | ⏳ 待开始 | 0% |
| Phase 4: 搜索统计 | ⏳ 待开始 | 0% |
| Phase 5: 管理后台 | ⏳ 待开始 | 0% |
| Phase 6: 测试优化 | ⏳ 待开始 | 0% |
| Phase 7: 上线部署 | ⏳ 待开始 | 0% |

详细计划见：[docs/04-开发计划.md](docs/04-开发计划.md)

---

## 📊 性能指标

### 目标
- Lighthouse 性能：> 90
- Lighthouse SEO: > 90
- 首屏加载：< 2 秒
- 移动端适配：100%

### 当前
- 待开发完成后测试

---

## 🤝 贡献指南

欢迎贡献代码、提交工具、反馈问题！

### 提交工具
访问：https://tools.hefeiapp.top/submit

### 反馈问题
- GitHub Issues
- 邮箱：tools@hefeiapp.top

### 开发贡献
```bash
# 1. Fork 项目
# 2. 创建特性分支
git checkout -b feature/amazing-feature

# 3. 提交更改
git commit -m 'Add amazing feature'

# 4. 推送到分支
git push origin feature/amazing-feature

# 5. 创建 Pull Request
```

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 👥 团队

- **市场经理：** SG:MKTMGR（松果市场经理）
- **开发：** AI Agent
- **运营：** 老大

---

## 📞 联系方式

- **网站：** https://tools.hefeiapp.top
- **邮箱：** tools@hefeiapp.top
- **电话：** 18611697817
- **地址：** 安徽合肥

---

## 🙏 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 开源 Firebase 替代
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS

---

_最后更新：2026-03-24_
