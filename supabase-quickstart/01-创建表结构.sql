-- Supabase 数据库 Schema
-- 执行时间：2026-03-25
-- 项目：松果工具箱 Pro

-- ========== 启用扩展 ==========
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== 1. 分类表 ==========
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

-- ========== 2. 工具表 ==========
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

-- 工具表索引
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_views ON tools(views DESC);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating DESC);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON tools(created_at DESC);

-- ========== 3. 用户表（扩展 Supabase Auth） ==========
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户表索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ========== 4. 收藏表 ==========
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tool_id)
);

-- 收藏表索引
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_tool ON favorites(tool_id);

-- ========== 5. 评论表 ==========
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 评论表索引
CREATE INDEX IF NOT EXISTS idx_comments_tool ON comments(tool_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

-- ========== 6. 投稿表 ==========
CREATE TABLE IF NOT EXISTS submissions (
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

-- 投稿表索引
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(submitter_email);

-- ========== 7. 专题表 ==========
CREATE TABLE IF NOT EXISTS topics (
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

-- ========== 8. 访问统计表 ==========
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  tool_id UUID REFERENCES tools(id),
  user_id UUID REFERENCES users(id),
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 访问统计索引
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_tool ON analytics(tool_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at DESC);

-- ========== 9. 管理员表 ==========
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  permissions VARCHAR(50)[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== 10. 工具访问记录 ==========
CREATE TABLE IF NOT EXISTS tool_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 工具访问索引
CREATE INDEX IF NOT EXISTS idx_tool_views_tool ON tool_views(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_views_created ON tool_views(created_at);

-- ========== 11. 工具评分表 ==========
CREATE TABLE IF NOT EXISTS tool_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);

-- 工具评分索引
CREATE INDEX IF NOT EXISTS idx_tool_ratings_tool ON tool_ratings(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_ratings_user ON tool_ratings(user_id);

-- ========== 函数：增加工具访问量 ==========
CREATE OR REPLACE FUNCTION increment_tool_views(p_tool_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tools
  SET views = views + 1,
      updated_at = NOW()
  WHERE id = p_tool_id;
END;
$$ LANGUAGE plpgsql;

-- ========== 函数：自动更新 updated_at ==========
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========== 触发器：自动更新 updated_at ==========
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

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON topics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tool_ratings_updated_at
  BEFORE UPDATE ON tool_ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========== Row Level Security (RLS) ==========

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

-- ========== 策略：分类和工具公开读取 ==========
CREATE POLICY "Public categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Public tools are viewable by everyone"
  ON tools FOR SELECT
  USING (status = 'published' OR true);

-- ========== 策略：仅管理员可以修改工具 ==========
CREATE POLICY "Admins can manage tools"
  ON tools FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- ========== 策略：用户可以管理自己的收藏 ==========
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- ========== 策略：评论 ==========
CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view approved comments"
  ON comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

-- ========== 策略：投稿 ==========
CREATE POLICY "Anyone can create submissions"
  ON submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage submissions"
  ON submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- ========== 策略：用户资料 ==========
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ========== 策略：专题公开读取 ==========
CREATE POLICY "Public topics are viewable by everyone"
  ON topics FOR SELECT
  USING (true);

-- ========== 策略：仅管理员可以修改专题 ==========
CREATE POLICY "Admins can manage topics"
  ON topics FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- ========== 策略：访问统计 ==========
CREATE POLICY "Admins can view analytics"
  ON analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);

-- ========== 策略：管理员表 ==========
CREATE POLICY "Admins can view admin table"
  ON admins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- ========== 策略：工具访问记录 ==========
CREATE POLICY "System can insert tool views"
  ON tool_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view tool views"
  ON tool_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
    )
  );

-- ========== 策略：工具评分 ==========
CREATE POLICY "Users can rate tools"
  ON tool_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON tool_ratings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view ratings"
  ON tool_ratings FOR SELECT
  USING (true);

-- ========== 初始数据 ==========

-- 插入分类
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('AI 工具', 'ai-tools', '人工智能助手和工具', '🤖', 1),
('AI 设计', 'ai-design', 'AI 图像和设计工具', '🎨', 2),
('AI 视频', 'ai-video', 'AI 视频生成和编辑', '🎬', 3),
('AI 音乐', 'ai-music', 'AI 音乐和音频工具', '🎵', 4),
('效率办公', 'productivity', '效率和办公工具', '💼', 5),
('影视资源', 'media', '影视和流媒体', '🎥', 6),
('在线音乐', 'music', '音乐流媒体平台', '🎧', 7),
('实用工具', 'utilities', '实用工具集合', '🛠️', 8),
('小程序', 'mini-programs', '小程序平台', '📱', 9)
ON CONFLICT (slug) DO NOTHING;

-- ========== 完成 ==========
