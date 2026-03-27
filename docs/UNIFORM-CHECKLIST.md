# 🎨 全站页面统一规范检查清单

**检查时间：** 2026-03-25  
**目标：** 确保所有页面风格完全统一

---

## ✅ 导航栏统一规范

### 标准导航栏代码
```tsx
<nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-white font-bold text-sm">🌰</span>
        </div>
        <span className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">松果工具箱</span>
      </Link>
      
      {/* 右侧导航 */}
      <div className="flex items-center space-x-4">
        <Link href="/search" className="text-gray-600 hover:text-orange-600 transition-colors">搜索</Link>
        <Link href="/login" className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-all font-medium">登录</Link>
        <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-medium shadow-md hover:shadow-lg">注册</Link>
      </div>
    </div>
  </div>
</nav>
```

### 统一要点
- ✅ 背景：`bg-white/80 backdrop-blur-md`
- ✅ 阴影：`shadow-sm`
- ✅ 固定：`sticky top-0 z-50`
- ✅ 高度：`h-16`
- ✅ Logo：橙色渐变 8x8
- ✅ 右侧：搜索 | 登录 | 注册

---

## ✅ 页脚统一规范

### 标准页脚代码
```tsx
<footer className="bg-gray-900 text-gray-300 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">🌰</span>
        </div>
        <span className="text-lg font-bold text-white">松果工具箱</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
        <Link href="/terms" className="hover:text-orange-400 transition-colors">用户协议</Link>
        <Link href="/privacy" className="hover:text-orange-400 transition-colors">隐私政策</Link>
        <Link href="/disclaimer" className="hover:text-orange-400 transition-colors">免责声明</Link>
        <Link href="/copyright" className="hover:text-orange-400 transition-colors">版权声明</Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-4">
        <span>📧 tools@hefeiapp.top</span>
        <span>📞 18611697817</span>
        <span>📍 安徽合肥</span>
      </div>
      <p className="text-sm text-gray-400">
        © 2026 松果工具箱。All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

### 统一要点
- ✅ 背景：`bg-gray-900`
- ✅ 文字：`text-gray-300`
- ✅ 内边距：`py-12`
- ✅ Logo：橙色渐变
- ✅ 法律链接：4 个
- ✅ 联系方式：邮箱 + 电话 + 地址

---

## ✅ 卡片统一规范

### 标准工具卡片
```tsx
<Link
  href={`/tool/${tool.slug}`}
  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
>
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="text-white font-bold text-xl">{tool.name.charAt(0)}</span>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
          {tool.name}
        </h3>
      </div>
    </div>
  </div>
  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.short_desc}</p>
  <div className="flex items-center justify-between text-sm text-gray-500">
    <div className="flex items-center space-x-3">
      <span className="flex items-center">
        <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
        {tool.rating}
      </span>
      <span className="flex items-center">
        <TrendingUp size={14} className="mr-1" />
        {tool.views.toLocaleString()}
      </span>
    </div>
    <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
  </div>
</Link>
```

### 统一要点
- ✅ 背景：`bg-white`
- ✅ 圆角：`rounded-2xl`
- ✅ 内边距：`p-6`
- ✅ 阴影：`shadow-sm` → `hover:shadow-xl`
- ✅ 位移：`hover:-translate-y-1`
- ✅ 图标：橙色渐变 12x12
- ✅ 动效：`transition-all duration-300`

---

## ✅ 按钮统一规范

### 主按钮
```tsx
className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
```

### 次按钮
```tsx
className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-all font-medium"
```

### 文字按钮
```tsx
className="text-orange-600 hover:underline font-medium"
```

---

## ✅ 背景色统一

### Hero 区域
```tsx
className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20"
```

### Section 交替
- 奇数：`bg-white`
- 偶数：`bg-gradient-to-br from-orange-50 to-amber-50`

---

## ✅ 检查清单

### 首页 (/)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 卡片风格统一
- [ ] 背景色统一
- [ ] 按钮风格统一

### 分类页 (/category/[slug])
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 卡片风格统一
- [ ] 背景色统一

### 搜索页 (/search)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 卡片风格统一
- [ ] 背景色统一
- [ ] 筛选栏风格

### 详情页 (/tool/[slug])
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 卡片风格统一
- [ ] 选项卡风格
- [ ] 侧边栏风格

### 登录页 (/login)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 表单风格
- [ ] 按钮风格

### 注册页 (/register)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 表单风格
- [ ] 按钮风格

### 用户中心 (/profile)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 选项卡风格
- [ ] 列表风格

### 投稿页 (/submit)
- [ ] 导航栏统一
- [ ] 页脚统一
- [ ] 表单风格
- [ ] 按钮风格

---

## 🎯 统一标准

**所有页面必须遵循：**
1. 导航栏完全一致
2. 页脚完全一致
3. 卡片风格一致
4. 按钮风格一致
5. 背景色方案一致
6. 动效规范一致

---

**检查人：** 松果小馒头 🤖  
**检查时间：** 2026-03-25  
**状态：** ⏳ 检查中

🫡 确保整站完全统一！
