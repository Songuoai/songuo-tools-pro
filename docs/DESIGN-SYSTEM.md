# 🎨 松果工具箱 Pro - 统一设计规范

**版本：** 1.0  
**更新时间：** 2026-03-25

---

## 🎯 设计原则

### 核心理念
- **简洁高效** - 3 秒内找到工具
- **统一一致** - 所有页面风格统一
- **流畅动效** - 自然过渡动画
- **橙色主题** - 品牌识别度

---

## 🎨 色彩系统

### 主色调
```css
--primary-50: #fff7ed
--primary-100: #ffedd5
--primary-200: #fed7aa
--primary-300: #fdba74
--primary-400: #fb923c
--primary-500: #f97316  /* 主色 */
--primary-600: #ea580c  /* hover */
--primary-700: #c2410c
--primary-800: #9a3412
--primary-900: #7c2d12
```

### 中性色
```css
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### 渐变方案
```css
/* 主渐变 */
from-orange-400 to-orange-600

/* 背景渐变 */
from-orange-50 via-white to-amber-50

/* 分类渐变 */
AI 工具：from-purple-500 to-purple-600
AI 设计：from-red-500 to-pink-600
AI 视频：from-blue-500 to-cyan-600
AI 音乐：from-green-500 to-emerald-600
效率办公：from-teal-500 to-cyan-600
影视资源：from-orange-500 to-red-600
在线音乐：from-pink-500 to-rose-600
实用工具：from-yellow-500 to-orange-600
小程序：from-indigo-500 to-purple-600
```

---

## 📐 布局规范

### 圆角规范
```css
rounded-lg    /* 8px */   - 小按钮
rounded-xl    /* 12px */  - 卡片
rounded-2xl   /* 16px */  - 大卡片、图标容器
rounded-3xl   /* 24px */  - Logo 容器
```

### 阴影规范
```css
shadow-sm     - 默认卡片
shadow-md     - hover 状态
shadow-lg     - 弹出层
shadow-xl     - 重要元素
```

### 间距规范
```css
gap-4  (16px) - 卡片间距
gap-6  (24px) - 区块间距
gap-8  (32px) - 大区块间距
```

---

## 🎭 组件规范

### 导航栏
```tsx
className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
```

**特点：**
- 白色半透明
- 模糊背景
- 固定在顶部
- 阴影效果

### 卡片
```tsx
className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
```

**特点：**
- 白色背景
- 圆角 2xl
- 内边距 6
- 默认阴影 sm
- hover 阴影 xl
- hover 上移 4px

### 按钮
```tsx
// 主按钮
className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"

// 次按钮
className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-all"

// 文字按钮
className="text-orange-600 hover:underline font-medium"
```

### 图标容器
```tsx
className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
```

**特点：**
- 固定尺寸 16x16
- 橙色渐变
- 圆角 2xl
- hover 放大 10%

---

## ✨ 动效规范

### 过渡时间
```css
duration-300  /* 300ms - 默认 */
duration-500  /* 500ms - 慢速 */
```

### Hover 效果
```tsx
// 卡片上移
hover:-translate-y-1

// 图标放大
group-hover:scale-110

// 箭头位移
group-hover:translate-x-1

// 颜色变化
hover:text-orange-600
hover:bg-orange-50
```

### 过渡属性
```tsx
transition-all  /* 所有属性 */
transition-colors  /* 仅颜色 */
transition-transform  /* 仅变换 */
```

---

## 📝 字体规范

### 字号
```tsx
text-xs    /* 12px */ - 辅助文字
text-sm    /* 14px */ - 次要文字
text-base  /* 16px */ - 正文
text-lg    /* 18px */ - 小标题
text-xl    /* 20px */ - 中标题
text-2xl   /* 24px */ - 大标题
text-3xl   /* 30px */ - 超大标题
text-5xl   /* 48px */ - 主标题
```

### 字重
```tsx
font-normal  /* 400 */ - 正文
font-medium  /* 500 */ - 强调
font-bold    /* 700 */ - 标题
```

---

## 🎯 页面模板

### 首页结构
```
1. 导航栏（固定）
2. Hero 区域（渐变背景）
3. 分类导航（九宫格）
4. 热门推荐（6 列）
5. 最新更新（3 列）
6. 特性展示（4 列）
7. 页脚
```

### 分类页结构
```
1. 导航栏（固定）
2. 分类头部（渐变背景 + 分类导航）
3. 工具栏（排序 + 筛选）
4. 工具列表（3 列）
5. 页脚
```

### 搜索页结构
```
1. 导航栏（固定）
2. 搜索头部（大搜索框）
3. 筛选栏（分类 + 价格 + 排序）
4. 工具列表（3 列）
5. 页脚
```

### 详情页结构
```
1. 导航栏（固定）
2. 工具头部（Logo + 信息 + 操作）
3. 主体内容（2 列布局）
   - 左侧：工具介绍
   - 右侧：信息卡片
4. 页脚
```

---

## 🔄 统一交互

### 链接点击
- 所有内部链接使用 `<Link>`
- hover 显示下划线或变色
- 外部链接添加 `target="_blank"`

### 按钮反馈
- 点击有颜色变化
- loading 状态显示
- disabled 状态变灰

### 加载状态
- 使用旋转 loading
- 骨架屏占位
- 进度提示

---

## 📱 响应式规范

### 断点
```tsx
sm: 640px   /* 手机横屏 */
md: 768px   /* 平板 */
lg: 1024px  /* 小屏电脑 */
xl: 1280px  /* 标准电脑 */
```

### 布局适配
```tsx
// 卡片列数
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// 导航菜单
hidden md:flex

// 侧边栏
lg:col-span-1
```

---

**设计规范版本：1.0**  
**所有页面必须遵循此规范！**
