# 📊 松果工具箱 - Supabase 快速配置包

**包含内容：**
1. 数据库 Schema（完整表结构）
2. 初始数据（10 个分类）
3. 工具数据（61 个工具，JSON 格式）
4. RLS 配置脚本
5. 部署指南

---

## 📁 文件清单

```
supabase-quickstart/
├── 01-创建表结构.sql          # 数据库 Schema
├── 02-导入分类数据.sql         # 10 个分类
├── 03-导入工具数据.sql         # 工具数据（可选）
├── 04-禁用 RLS.sql            # 开发环境配置
├── 05-启用 RLS.sql            # 生产环境配置
├── tools-data.json            # 工具数据（JSON 格式）
└── README.md                  # 使用说明
```

---

## 🚀 快速开始（5 分钟）

### 步骤 1：创建 Supabase 项目

1. 访问 https://supabase.com
2. 注册/登录
3. 创建新项目
4. 等待项目创建完成

### 步骤 2：执行 SQL 脚本

**按顺序执行以下文件：**

1. **01-创建表结构.sql**
   ```
   SQL Editor → New Query → 粘贴内容 → Run
   ```

2. **02-导入分类数据.sql**
   ```
   同上
   ```

3. **04-禁用 RLS.sql**（开发环境）
   ```
   同上
   ```

### 步骤 3：复制配置

**获取 API 密钥：**
```
Settings → API
- Project URL
- anon public
- service_role
```

**填写到 .env.local：**
```env
NEXT_PUBLIC_SUPABASE_URL=你的 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key
SUPABASE_SERVICE_ROLE_KEY=你的 service role key
```

### 步骤 4：启动项目

```bash
npm install
npm run dev
```

**访问：** http://localhost:3005

---

## 📄 SQL 文件说明

### 01-创建表结构.sql

**创建内容：**
- categories 表（分类）
- tools 表（工具）
- users 表（用户）
- submissions 表（投稿）
- admins 表（管理员）
- 索引和触发器

### 02-导入分类数据.sql

**导入数据：**
- AI 工具
- AI 设计
- AI 视频
- AI 音乐
- 效率办公
- 影视资源
- 在线音乐
- 实用工具
- 开发编程
- 小程序

### 03-导入工具数据.sql

**导入数据：**
- 61 个工具（从 data/tools.json 转换）
- 包含分类、价格类型、描述等

### 04-禁用 RLS.sql

**用途：** 开发环境禁用行级安全

**内容：**
```sql
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
```

### 05-启用 RLS.sql

**用途：** 生产环境启用行级安全

**内容：** 完整的 RLS 策略定义

---

## 🎯 验证部署

**检查清单：**

- [ ] 5 个表已创建
- [ ] 10 个分类已导入
- [ ] 61 个工具已导入（可选）
- [ ] RLS 已禁用（开发环境）
- [ ] .env.local 已配置
- [ ] 首页能访问
- [ ] 工具列表显示正常
- [ ] 登录/注册功能正常

---

## 📞 联系信息

**邮箱：** 1335979521@qq.com  
**电话：** 18611697817  
**地址：** 安徽合肥  
**备案：** 皖 ICP 备 2021005484 号 -3  

---

**最后更新：** 2026-03-26  
**版本：** v1.0.0
