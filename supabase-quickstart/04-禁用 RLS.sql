-- =====================================================
-- 松果工具箱 Pro - 禁用 RLS（用于测试/开发）
-- =====================================================
-- 警告：不要在 production 环境执行！
-- 这会允许任何人读写所有数据
-- =====================================================

-- 禁用所有表的 RLS
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- 删除有问题的策略（如果有）
DROP POLICY IF EXISTS "任何人都可以查看分类" ON categories;
DROP POLICY IF EXISTS "任何人都可以查看已发布工具" ON tools;
DROP POLICY IF EXISTS "管理员可以管理所有工具" ON tools;
DROP POLICY IF EXISTS "用户可以查看自己的信息" ON users;
DROP POLICY IF EXISTS "任何人都可以提交投稿" ON submissions;
DROP POLICY IF EXISTS "提交者可以查看自己的投稿" ON submissions;
DROP POLICY IF EXISTS "管理员可以管理所有" ON admins;

-- 确认 RLS 已禁用
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('categories', 'tools', 'users', 'submissions', 'admins');

-- =====================================================
-- ✅ RLS 已禁用
-- 现在 API 应该可以正常访问了
-- =====================================================
