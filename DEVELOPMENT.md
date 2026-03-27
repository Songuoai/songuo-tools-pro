# 🚀 开发启动指南

## 前置要求

- Node.js 20+ 
- pnpm（推荐）或 npm
- Supabase 账号
- Vercel 账号（部署用）

## 本地开发

### 1. 安装依赖

```bash
pnpm install
# 或
npm install
```

### 2. 配置环境变量

```bash
# 复制环境变量示例
cp .env.example .env.local

# 编辑 .env.local，填入你的配置
# NEXT_PUBLIC_SUPABASE_URL=你的 Supabase 项目 URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥
```

### 3. 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

访问 http://localhost:3000

### 4. 数据库设置

```bash
# 登录 Supabase Dashboard
# 创建新项目
# 运行 SQL 迁移脚本（docs/sql/001_init_schema.sql）
# 复制 URL 和密钥到 .env.local
```

## 项目结构

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # 根布局
│   ├── page.tsx      # 首页
│   ├── globals.css   # 全局样式
│   ├── category/     # 分类页
│   ├── tool/         # 工具详情页
│   └── ...
├── components/       # React 组件
├── lib/              # 工具函数
│   └── supabase.ts   # Supabase 客户端
└── types/            # TypeScript 类型
    └── index.ts      # 类型定义
```

## 学习任务清单

### Week 1（今天开始）

- [ ] 学习 HTML5 基础（MDN）
- [ ] 学习 CSS3 基础（MDN）
- [ ] 学习 JavaScript ES6+（freeCodeCamp）
- [ ] 学习 TypeScript 基础（官方文档）
- [ ] 完成本项目初始化

### Week 2

- [ ] 学习 React 基础（官方文档）
- [ ] 学习 Next.js App Router（官方文档）
- [ ] 学习 Tailwind CSS（官方文档）
- [ ] 开发首页
- [ ] 开发工具卡片组件

## 遇到问题怎么办？

1. **查官方文档**
   - Next.js: https://nextjs.org/docs
   - React: https://react.dev
   - Tailwind: https://tailwindcss.com/docs
   - Supabase: https://supabase.com/docs

2. **搜索解决方案**
   - Google: "nextjs how to [问题]"
   - Stack Overflow
   - GitHub Issues

3. **记录解决过程**
   - 更新学习日志
   - 记录到 docs/learning-logs/

## 下一步

1. ✅ 项目初始化完成
2. ⏳ 学习 HTML/CSS/JS基础
3. ⏳ 学习 React/Next.js
4. ⏳ 开发首页
5. ⏳ 开发功能模块

---

**加油！12 周后你就是全栈工程师了！** 💪
