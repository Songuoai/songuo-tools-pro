# 🗄️ Supabase 数据库集成方案

**创建时间：** 2026-03-25  
**执行时间：** 2026-03-26  
**预计耗时：** 2-3 小时

---

## 📋 任务清单

### 1. Supabase 项目创建（15 分钟）
- [ ] 注册/登录 Supabase（https://supabase.com）
- [ ] 创建新项目 `songguo-tools-pro`
- [ ] 选择区域（推荐 Asia Singapore 新加坡）
- [ ] 设置数据库密码
- [ ] 等待项目初始化（2-3 分钟）

### 2. 获取配置信息（5 分钟）
- [ ] 进入 Settings → API
- [ ] 复制 `Project URL`
- [ ] 复制 `anon/public` Key
- [ ] 复制 `service_role` Key（保密！）
- [ ] 更新 `.env.local`

### 3. 数据库 Schema 设计（30 分钟）

#### 数据表清单（11 个）

```sql
-- 1. 分类表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 工具表
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  url VARCHAR(500) NOT NULL,
  category_id UUID REFERENCES categories(id),
  price_type VARCHAR(50) NOT NULL DEFAULT 'freemium',
  price_url VARCHAR(500),
  short_desc VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[],
  logo_url VARCHAR(500),
  screenshots VARCHAR(500)[],
  tags VARCHAR(100)[],
  status VARCHAR(50) DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 用户表（扩展 Supabase Auth）
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 收藏表
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tool_id)
);

-- 5. 评论表
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 投稿表
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name VARCHAR(200) NOT NULL,
  tool_url VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  submitter_name VARCHAR(100),
  submitter_email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 专题表
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  cover_image VARCHAR(500),
  tool_ids UUID[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 访问统计表
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  tool_id UUID REFERENCES tools(id),
  user_id UUID REFERENCES users(id),
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. 管理员表
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permissions VARCHAR(50)[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. 工具访问记录
CREATE TABLE tool_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. 工具评分表
CREATE TABLE tool_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);
```

### 4. 创建数据表（20 分钟）
- [ ] 进入 SQL Editor
- [ ] 执行上述 SQL 创建所有表
- [ ] 验证表结构

### 5. 设置 Row Level Security（30 分钟）

```sql
-- 启用 RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_ratings ENABLE ROW LEVEL SECURITY;

-- 策略：公开读取分类和工具
CREATE POLICY "Public categories are viewable by everyone"
  ON categories FOR SELECT
  USING (status = 'published' OR true);

CREATE POLICY "Public tools are viewable by everyone"
  ON tools FOR SELECT
  USING (status = 'published' OR true);

-- 策略：仅管理员可以修改工具
CREATE POLICY "Admins can manage tools"
  ON tools FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- 策略：用户可以管理自己的收藏
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- 策略：用户可以创建评论
CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 策略：公开读取已审核评论
CREATE POLICY "Public can view approved comments"
  ON comments FOR SELECT
  USING (status = 'approved');
```

### 6. 插入初始数据（15 分钟）

```sql
-- 插入分类数据
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('AI 工具', 'ai-tools', '人工智能助手和工具', '🤖', 1),
('AI 设计', 'ai-design', 'AI 图像和设计工具', '🎨', 2),
('AI 视频', 'ai-video', 'AI 视频生成和编辑', '🎬', 3),
('AI 音乐', 'ai-music', 'AI 音乐和音频工具', '🎵', 4),
('效率办公', 'productivity', '效率和办公工具', '💼', 5),
('影视资源', 'media', '影视和流媒体', '🎥', 6),
('在线音乐', 'music', '音乐流媒体平台', '🎧', 7),
('实用工具', 'utilities', '实用工具集合', '🛠️', 8),
('小程序', 'mini-programs', '小程序平台', '📱', 9);
```

### 7. 项目集成（30 分钟）

#### 安装依赖
```bash
cd D:\松果工具箱-Pro
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

#### 创建 Supabase 客户端
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 创建类型定义
```typescript
// src/types/database.ts
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
};

export type Tool = {
  id: string;
  name: string;
  slug: string;
  url: string;
  category_id: string;
  price_type: string;
  short_desc: string;
  // ... 其他字段
};
```

### 8. 替换模拟数据（30 分钟）
- [ ] 修改首页数据获取（使用 Supabase）
- [ ] 修改工具列表页
- [ ] 修改工具详情页
- [ ] 修改搜索页
- [ ] 测试所有页面

---

## 🔧 环境变量配置

更新 `.env.local`：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## ⚠️ 注意事项

### 安全
1. **不要提交 `.env.local`** 到 Git
2. **`service_role` Key** 只能在服务端使用
3. **启用 RLS** 保护数据安全
4. **定期备份** 数据库

### 性能
1. 使用**索引**优化查询
2. 启用**缓存**（React Query/SWR）
3. 分页加载大数据
4. 监控查询性能

### 扩展
1. 预留**扩展字段**
2. 使用**JSONB**存储灵活数据
3. 考虑**读写分离**（未来）
4. 监控**配额使用**

---

## 📊 预计时间

| 任务 | 预计时间 |
|------|---------|
| Supabase 项目创建 | 15 分钟 |
| 获取配置信息 | 5 分钟 |
| 数据库 Schema 设计 | 30 分钟 |
| 创建数据表 | 20 分钟 |
| 设置 RLS | 30 分钟 |
| 插入初始数据 | 15 分钟 |
| 项目集成 | 30 分钟 |
| 替换模拟数据 | 30 分钟 |
| **总计** | **2 小时 55 分钟** |

---

## ✅ 验收标准

- [ ] Supabase 项目正常运行
- [ ] 11 个数据表创建完成
- [ ] RLS 策略正确配置
- [ ] 初始数据导入成功
- [ ] 前端可以正常读写数据
- [ ] 所有页面功能正常
- [ ] 无安全漏洞

---

**准备人：** 松果小馒头 🥟  
**准备时间：** 2026-03-25  
**执行时间：** 2026-03-26
