-- 复制粘贴这个 SQL 到 Supabase 控制台执行

-- 1. 删除所有可能有问题的策略
DROP POLICY IF EXISTS "任何人都可以查看分类" ON categories;
DROP POLICY IF EXISTS "任何人都可以查看已发布工具" ON tools;
DROP POLICY IF EXISTS "管理员可以管理所有工具" ON tools;
DROP POLICY IF EXISTS "用户可以查看自己的信息" ON users;
DROP POLICY IF EXISTS "任何人都可以提交投稿" ON submissions;
DROP POLICY IF EXISTS "提交者可以查看自己的投稿" ON submissions;
DROP POLICY IF EXISTS "管理员可以管理所有" ON admins;
DROP POLICY IF EXISTS "Enable all access for admins" ON admins;
DROP POLICY IF EXISTS "Allow full access to admins" ON admins;

-- 2. 再次禁用 RLS
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- 3. 检查是否还有策略（应该返回空）
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
