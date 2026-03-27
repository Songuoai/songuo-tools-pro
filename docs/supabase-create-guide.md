# 🚀 Supabase 项目创建指南

**创建时间：** 2026-03-25  
**执行状态：** 待执行

---

## 📋 步骤清单

### 1. 注册/登录 Supabase

**网址：** https://supabase.com

**操作：**
1. 访问 https://supabase.com
2. 点击右上角 "Start your project" 或 "Sign In"
3. 使用 GitHub 账号登录（推荐）或邮箱注册
4. 完成登录

---

### 2. 创建新项目

**操作：**
1. 点击 "New Project"（新建项目）
2. 填写项目信息：
   - **Name:** `songguo-tools-pro`
   - **Database Password:** 设置一个强密码（保存好！）
   - **Region:** `Asia (Singapore)` 新加坡（离中国最近）
3. 点击 "Create new project"
4. 等待 2-3 分钟初始化

---

### 3. 获取配置信息

**操作：**
1. 进入项目后，点击左下角 "Settings"（设置图标⚙️）
2. 点击 "API"
3. 复制以下信息：
   - **Project URL:** `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（以 eyJ 开头）
   - **service_role key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（保密！）

---

### 4. 更新环境变量

**文件：** `D:\松果工具箱-Pro\.env.local`

**替换内容：**
```bash
# Supabase（替换为真实配置）
NEXT_PUBLIC_SUPABASE_URL=https://你的项目 ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key
SUPABASE_SERVICE_ROLE_KEY=你的 service_role key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

### 5. 执行数据库 Schema

**操作：**
1. 在 Supabase 项目页面，点击左侧 "SQL Editor"
2. 点击 "New query"
3. 打开 `D:\松果工具箱-Pro\docs\supabase-schema.sql`
4. 复制全部内容
5. 粘贴到 SQL Editor
6. 点击 "Run" 或按 Ctrl+Enter
7. 等待执行完成（约 10-20 秒）
8. 验证：点击左侧 "Table Editor"，应该看到 11 个表

---

### 6. 验证安装

**检查清单：**
- [ ] 11 个数据表已创建
- [ ] 索引已创建（可在 SQL Editor 执行 `\di` 查看）
- [ ] RLS 已启用（表旁边有小锁图标🔒）
- [ ] 初始分类数据已插入（9 个分类）

**验证 SQL：**
```sql
-- 检查表数量
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
-- 应该返回 11

-- 检查分类数据
SELECT * FROM categories ORDER BY sort_order;
-- 应该返回 9 个分类

-- 检查 RLS 状态
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- 所有表的 rowsecurity 应该是 true
```

---

## ⚠️ 注意事项

### 安全
1. **不要提交 `.env.local`** 到 Git
2. **`service_role` Key** 只能在服务端使用
3. **数据库密码** 要保存好（忘记密码很麻烦）
4. **定期备份** 数据（Supabase 有自动备份）

### 配额
- **免费计划：**
  - 数据库：500MB
  - 带宽：5GB/月
  - 认证用户：50,000/月
  - 足够初期使用

### 升级
- **Pro 计划：** $25/月
  - 数据库：8GB
  - 带宽：50GB/月
  - 邮箱：100,000/月
  - 无限制认证用户

---

## 🎯 预计时间

| 步骤 | 预计时间 |
|------|---------|
| 注册/登录 | 5 分钟 |
| 创建项目 | 5 分钟 |
| 获取配置 | 3 分钟 |
| 更新环境变量 | 2 分钟 |
| 执行 Schema | 5 分钟 |
| 验证安装 | 5 分钟 |
| **总计** | **25 分钟** |

---

## 🆘 常见问题

### Q: 项目创建失败？
A: 检查网络，或使用代理。Supabase 在中国大陆访问可能较慢。

### Q: SQL 执行报错？
A: 检查是否完整复制 SQL，确保没有遗漏。

### Q: RLS 策略不生效？
A: 确保执行了 `ALTER TABLE xxx ENABLE ROW LEVEL SECURITY;`

### Q: 找不到 service_role key？
A: 在 Settings → API 页面，滚动到最下方 "Service Role Key"。

---

## ✅ 完成标准

- [ ] Supabase 项目创建成功
- [ ] 11 个数据表创建完成
- [ ] RLS 策略启用
- [ ] 初始数据插入
- [ ] 环境变量配置完成
- [ ] 本地可以连接 Supabase

---

**准备人：** 松果小馒头 🥟  
**准备时间：** 2026-03-25  
**执行人：** 老大 或 松果小馒头
