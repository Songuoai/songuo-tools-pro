# 📊 后台数据同步说明

## 当前状态

### ✅ 已完成
1. 后台登录验证（需要账号密码）
2. 后台入口在页脚
3. 工具列表展示
4. 数据存储在 `src/data/tools-database.ts`

### ⏳ 待完成
1. 添加/编辑/删除工具功能
2. 数据库持久化（需要后端 API）

---

## 临时方案：手动修改数据库

### 1. 添加工具

**文件位置：** `src/data/tools-database.ts`

**添加格式：**
```typescript
createTool(
  86, // ID（递增）
  '工具名称',
  'https://工具网址.com',
  'https://cdn.worldvectorlogo.com/logos/logo.svg',
  '分类名称',
  'freemium', // free, freemium, paid
  '简短描述',
  '详细描述...',
  ['标签 1', '标签 2', '标签 3']
),
```

### 2. 修改工具

直接编辑 `src/data/tools-database.ts` 中对应的工具信息。

### 3. 删除工具

从 `src/data/tools-database.ts` 中删除对应的 `createTool(...)` 行。

### 4. 刷新网站

修改后刷新网页即可看到更新。

---

## 分类列表

可用分类：
- AI 工具
- AI 设计
- AI 视频
- AI 音乐
- 效率办公
- 影视资源
- 在线音乐
- 实用工具

---

## 价格类型

可用价格类型：
- `free` - 完全免费
- `freemium` - 免费额度
- `paid` - 付费

---

## 示例：添加新工具

```typescript
// 在 toolsDatabase 数组末尾添加
createTool(
  86,
  '新工具名称',
  'https://newtool.com',
  'https://cdn.worldvectorlogo.com/logos/newtool.svg',
  'AI 工具',
  'freemium',
  '这是一个新工具',
  '这是详细描述，介绍工具的功能和特点...',
  ['AI', '工具', '新']
),
```

---

## 后台登录信息

**默认管理员账号：**
- 邮箱：admin@songguo.com
- 密码：admin123456

**修改密码：**
编辑 `src/app/admin/login/page.tsx` 中的：
```typescript
const ADMIN_EMAIL = 'admin@songguo.com';
const ADMIN_PASSWORD = 'admin123456'; // 修改这里
```

---

## 后台入口

**访问方式：**
1. 打开网站首页
2. 滚动到页面最底部
3. 点击 "🔐 后台管理" 链接

**或直接访问：**
- http://localhost:3001/admin/login

---

## 注意事项

1. ⚠️ 修改数据库文件后需要刷新网页
2. ⚠️ ID 必须唯一且递增
3. ⚠️ 分类名称必须与现有分类一致
4. ⚠️ Logo URL 建议使用 https://cdn.worldvectorlogo.com/logos/xxx.svg

---

**最后更新：** 2026-03-25
