# 📊 Supabase 数据库部署指南

**适用对象：** 收到项目包后需要配置 Supabase 数据库的人员  
**预计时间：** 10 分钟  
**难度等级：** ⭐⭐☆☆☆（简单）

---

## 📋 第一步：创建 Supabase 项目（5 分钟）

### 1.1 注册 Supabase 账号

**访问：** https://supabase.com

**步骤：**
1. 点击右上角 "Start your project" 或 "Sign Up"
2. 使用 GitHub 账号登录（推荐）或邮箱注册
3. 完成邮箱验证

### 1.2 创建新项目

**步骤：**
1. 登录后点击 "New Project"
2. 填写项目信息：
   ```
   Name: 松果工具箱
   Database Password: 设置一个强密码（请保存好！）
   Region: 选择最近的地区（推荐 Asia (Singapore)）
   ```
3. 点击 "Create new project"
4. 等待 2-3 分钟，项目创建完成

### 1.3 获取项目配置

**步骤：**
1. 进入项目后，点击左下角 "Settings"（齿轮图标）
2. 点击 "API"
3. 复制以下三个值（稍后配置到 .env.local）：
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 📋 第二步：导入数据库结构（3 分钟）

### 2.1 打开 SQL Editor

**步骤：**
1. 在 Supabase 项目左侧菜单，点击 "SQL Editor"
2. 点击 "New query"

### 2.2 执行数据库 Schema

**方法 1：复制粘贴（推荐）**

1. 打开项目中的 `docs/supabase-schema.sql` 文件
2. 全选复制所有内容
3. 粘贴到 Supabase SQL Editor
4. 点击 "Run" 或按 `Ctrl+Enter`

**方法 2：上传文件**

1. 点击 SQL Editor 右上角 "Upload"
2. 选择 `docs/supabase-schema.sql` 文件
3. 点击 "Run"

### 2.3 验证表已创建

**步骤：**
1. 左侧菜单点击 "Table Editor"
2. 应该看到以下 5 个表：
   - ✅ categories（分类表）
   - ✅ tools（工具表）
   - ✅ users（用户表）
   - ✅ submissions（投稿表）
   - ✅ admins（管理员表）

---

## 📋 第三步：导入初始数据（2 分钟）

### 3.1 导入分类数据

**步骤：**
1. 在 SQL Editor 中新建查询
2. 复制以下内容并执行：

```sql
-- 导入 10 个分类
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
  ('AI 工具', 'ai-gongju', '🤖', 'ChatGPT、Claude 等智能助手', 1),
  ('AI 设计', 'ai-sheji', '🎨', 'Midjourney、Canva 等设计工具', 2),
  ('AI 视频', 'ai-shipin', '🎬', 'Runway、Pika 等视频生成工具', 3),
  ('AI 音乐', 'ai-yinyue', '🎵', 'Suno、Udio 等音乐生成工具', 4),
  ('效率办公', 'xiaolv-bangong', '💼', 'Notion、飞书等办公利器', 5),
  ('影视资源', 'yingshi-ziyuan', '🎥', 'Netflix、YouTube 等影视平台', 6),
  ('在线音乐', 'zaixian-yinyue', '🎧', '网易云、QQ 音乐等音乐平台', 7),
  ('实用工具', 'shiyong-gongju', '🛠️', 'PDF 工具、图片处理等', 8),
  ('开发编程', 'kaifa-biancheng', '💻', 'GitHub、Stack Overflow 等', 9),
  ('小程序', 'xiao-cheng-xu', '📱', '微信小程序、支付宝小程序', 10)
ON CONFLICT (name) DO NOTHING;
```

3. 点击 "Run" 执行

### 3.2 验证数据

**步骤：**
1. 点击 "Table Editor"
2. 点击 `categories` 表
3. 应该看到 10 条分类数据

---

## 📋 第四步：导入工具数据（可选）

### 4.1 方式 1：使用迁移脚本（推荐）

**步骤：**
1. 打开项目根目录的 `scripts/migrate-to-supabase.js`
2. 在项目根目录创建 `.env.local` 文件
3. 填写 Supabase 配置：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=你的 Supabase URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Anon Key
   SUPABASE_SERVICE_ROLE_KEY=你的 Service Role Key
   ```
4. 在命令行执行：
   ```bash
   node scripts/migrate-to-supabase.js
   ```
5. 等待迁移完成（约 30 秒）

### 4.2 方式 2：手动导入 JSON 数据

**步骤：**
1. 打开 `data/tools.json` 文件
2. 复制 `tools` 数组内容
3. 在 SQL Editor 中执行批量插入（需要转换格式）

**或使用 Table Editor：**
1. 点击 "Table Editor" → "tools" 表
2. 点击 "Insert" → "Import JSON"
3. 粘贴工具数据
4. 点击 "Import"

---

## 📋 第五步：配置认证（2 分钟）

### 5.1 启用邮箱认证

**步骤：**
1. 左侧菜单点击 "Authentication"
2. 点击 "Providers"
3. 确保 "Email" 已启用（应该是默认启用的）

### 5.2 配置邮箱验证（开发环境）

**步骤：**
1. 点击 "Authentication" → "Policies"
2. 找到 "User Signups" 区域
3. **关闭** "Confirm email" 开关（开发环境无需验证）
4. 点击 "Save changes"

### 5.3 添加网站 URL

**步骤：**
1. 点击 "Authentication" → "URL Configuration"
2. 添加 Site URL：
   ```
   http://localhost:3005
   ```
3. 添加 Redirect URLs：
   ```
   http://localhost:3005/*
   http://localhost:3005/auth/callback
   ```
4. 点击 "Save"

---

## 📋 第六步：配置项目（1 分钟）

### 6.1 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://你的项目 ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon public 密钥
SUPABASE_SERVICE_ROLE_KEY=你的 service_role 密钥

# 网站配置
NEXT_PUBLIC_SITE_URL=http://localhost:3005

# 开发模式（生产环境改为 false）
NEXT_PUBLIC_DEV_MODE=true

# 功能开关
NEXT_PUBLIC_ENABLE_MOCK_DATA=false
```

### 6.2 验证配置

**步骤：**
1. 在项目根目录运行：
   ```bash
   npm run dev
   ```
2. 访问：`http://localhost:3005`
3. 检查首页是否显示工具列表
4. 尝试注册/登录功能

---

## 📋 第七步：禁用 RLS（开发环境）

**⚠️ 重要：** 开发环境需要禁用 RLS（行级安全），否则 API 无法访问数据！

**步骤：**
1. 打开 SQL Editor
2. 复制并执行以下 SQL：

```sql
-- 禁用所有表的 RLS（仅开发环境）
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- 删除可能有问题的策略
DROP POLICY IF EXISTS "任何人都可以查看分类" ON categories;
DROP POLICY IF EXISTS "任何人都可以查看已发布工具" ON tools;
DROP POLICY IF EXISTS "管理员可以管理所有工具" ON tools;
DROP POLICY IF EXISTS "用户可以查看自己的信息" ON users;
DROP POLICY IF EXISTS "任何人都可以提交投稿" ON submissions;
DROP POLICY IF EXISTS "提交者可以查看自己的投稿" ON submissions;
DROP POLICY IF EXISTS "管理员可以管理所有" ON admins;
```

3. 点击 "Run" 执行

---

## ✅ 验证清单

**检查 Supabase 配置是否成功：**

- [ ] Supabase 项目已创建
- [ ] 5 个表已创建（categories/tools/users/submissions/admins）
- [ ] 分类数据已导入（10 条）
- [ ] 工具数据已导入（61 条，可选）
- [ ] Email 认证已启用
- [ ] 邮箱验证已关闭（开发环境）
- [ ] Site URL 已配置
- [ ] RLS 已禁用
- [ ] `.env.local` 已配置
- [ ] 首页能正常显示工具
- [ ] 注册/登录功能正常

**全部打勾 = Supabase 配置成功！** 🎉

---

## 🔧 常用 SQL 命令

### 查看工具数量
```sql
SELECT COUNT(*) FROM tools;
```

### 查看分类数量
```sql
SELECT COUNT(*) FROM categories;
```

### 查看已发布工具
```sql
SELECT COUNT(*) FROM tools WHERE status = 'published';
```

### 清空所有工具数据
```sql
TRUNCATE TABLE tools RESTART IDENTITY CASCADE;
```

### 重置数据库（谨慎使用！）
```sql
-- 删除所有表
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 重新执行 supabase-schema.sql 创建表
```

---

## 🐛 常见问题

### 问题 1：API 返回 500 错误

**错误信息：** `infinite recursion detected in policy for relation`

**原因：** RLS 策略冲突

**解决方案：**
```sql
-- 禁用所有表的 RLS
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
```

---

### 问题 2：注册后无法登录

**错误信息：** `Please confirm your email`

**原因：** 邮箱验证未关闭

**解决方案：**
1. Authentication → Policies
2. 关闭 "Confirm email"
3. 保存

---

### 问题 3：工具数据未显示

**可能原因：**
- 工具状态为 draft（草稿）
- 分类 ID 不匹配

**解决方案：**
```sql
-- 查看所有工具状态
SELECT id, name, status FROM tools;

-- 将所有工具设为已发布
UPDATE tools SET status = 'published';

-- 查看分类 ID
SELECT id, name FROM categories;
```

---

### 问题 4：表创建失败

**错误信息：** `relation already exists`

**原因：** 表已存在

**解决方案：**
```sql
-- 删除所有表重新创建
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tools CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 重新执行 supabase-schema.sql
```

---

## 📞 获取帮助

**如果遇到问题：**

1. **查看 Supabase 日志**
   - 左侧菜单 → Database → Logs
   - 查看错误信息

2. **检查 SQL 语法**
   - 确保 SQL 语句完整
   - 注意分号结尾

3. **重启项目**
   ```bash
   # 停止开发服务器（Ctrl+C）
   # 删除缓存
   rm -rf .next
   # 重新启动
   npm run dev
   ```

---

## 📊 Supabase 免费额度

**免费计划包含：**
- ✅ 500MB 数据库
- ✅ 1GB 文件存储
- ✅ 50,000 月活跃用户
- ✅ 无限 API 请求
- ✅ 自动备份

**对于小型项目完全够用！**

---

## 🎯 生产环境配置

**上线前需要：**

1. **开启 RLS**
   ```sql
   ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
   ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
   -- ... 其他表
   ```

2. **配置安全策略**
   - 参考 `docs/supabase-schema.sql` 中的策略定义

3. **开启邮箱验证**
   - Authentication → Policies → Enable "Confirm email"

4. **更新环境变量**
   ```env
   NEXT_PUBLIC_DEV_MODE=false
   NEXT_PUBLIC_SITE_URL=https://你的域名.com
   ```

---

**最后更新：** 2026-03-26  
**版本：** v1.0.0  
**联系邮箱：** 1335979521@qq.com

---

**祝你部署顺利！🚀**
