-- =====================================================
-- 松果工具箱 Pro - Supabase 数据库初始化脚本
-- 执行时间：2026-03-26
-- =====================================================
-- 使用方法：
-- 1. 登录 Supabase 控制台：https://supabase.com/dashboard
-- 2. 选择项目：songguo-tools-pro
-- 3. 进入 SQL Editor
-- 4. 复制粘贴本脚本并执行
-- =====================================================

-- 启用扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. 分类表
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- 插入 9 大分类
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
  ('AI 工具', 'ai-gongju', '🤖', 'ChatGPT、Claude 等智能助手', 1),
  ('AI 设计', 'ai-sheji', '🎨', 'Midjourney、Canva 等设计工具', 2),
  ('AI 视频', 'ai-shipin', '🎬', 'Runway、Pika 等视频生成工具', 3),
  ('AI 音乐', 'ai-yinyue', '🎵', 'Suno、Udio 等音乐生成工具', 4),
  ('效率办公', 'xiaolv-bangong', '💼', 'Notion、飞书等办公利器', 5),
  ('影视资源', 'yingshi-ziyuan', '🎥', 'Netflix、YouTube 等影视平台', 6),
  ('在线音乐', 'zaixian-yinyue', '🎧', '网易云、QQ 音乐等音乐平台', 7),
  ('实用工具', 'shiyong-gongju', '🛠️', 'PDF 工具、图片处理等', 8),
  ('开发编程', 'kaifa-biancheng', '💻', 'GitHub、Stack Overflow 等', 9)
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 2. 工具表
-- =====================================================
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  url VARCHAR(500) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
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

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_views ON tools(views DESC);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON tools(created_at DESC);

-- =====================================================
-- 3. 用户表（扩展 Supabase Auth）
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- =====================================================
-- 4. 投稿表
-- =====================================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name VARCHAR(200) NOT NULL,
  tool_url VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  submitter_email VARCHAR(255) NOT NULL,
  submitter_name VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- =====================================================
-- 5. 访问量统计函数
-- =====================================================
CREATE OR REPLACE FUNCTION increment_tool_views(tool_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tools
  SET views = views + 1
  WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. 自动更新时间戳函数
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有表添加更新时间戳触发器
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. 行级安全策略（RLS）
-- =====================================================

-- 启用 RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- 分类：公开读取
CREATE POLICY "任何人都可以查看分类"
  ON categories FOR SELECT
  USING (true);

-- 工具：公开读取已发布的
CREATE POLICY "任何人都可以查看已发布工具"
  ON tools FOR SELECT
  USING (status = 'published');

-- 用户：只能查看自己的信息
CREATE POLICY "用户可以查看自己的信息"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- 投稿：任何人都可以提交
CREATE POLICY "任何人都可以提交投稿"
  ON submissions FOR INSERT
  WITH CHECK (true);

-- 投稿：提交者可以查看自己的
CREATE POLICY "提交者可以查看自己的投稿"
  ON submissions FOR SELECT
  USING (submitter_email = auth.email());

-- =====================================================
-- 8. 管理员角色（可选）
-- =====================================================

-- 创建管理员策略（需要手动分配角色）
CREATE POLICY "管理员可以管理所有工具"
  ON tools FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- =====================================================
-- 完成提示
-- =====================================================
-- ✅ 数据库初始化完成！
-- 
-- 下一步：
-- 1. 运行数据迁移脚本：node scripts/migrate-to-supabase.js
-- 2. 测试 API：http://localhost:3000/api/tools
-- =====================================================
