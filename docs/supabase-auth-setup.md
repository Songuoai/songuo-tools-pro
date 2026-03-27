# Supabase Auth 快速配置指南

**目标：** 5 分钟完成配置，立即能注册登录

---

## 📋 配置步骤

### 步骤 1：进入 Supabase 控制台

**访问：**
```
https://supabase.com/dashboard
```

**登录 → 选择项目：** `songguo-tools-pro`

---

### 步骤 2：配置认证设置

**路径：** Authentication → Settings

**配置项：**

1. **关闭邮箱验证（开发环境）**
   ```
   ❌ Disable email confirmations
   ```
   - 取消勾选 "Enable email confirmations"
   - 这样注册后无需验证邮箱即可登录

2. **添加网站 URL**
   ```
   Site URL: http://localhost:3005
   ```

3. **添加重定向 URL**
   ```
   Redirect URLs:
   - http://localhost:3005/*
   - http://localhost:3005/auth/callback
   ```

4. **保存设置**
   ```
   点击 "Save" 按钮
   ```

---

### 步骤 3：启用 Email Provider

**路径：** Authentication → Providers

**确保 Email 已启用：**
- ✅ Email 应该是 Enabled 状态
- 如果是 Disabled，点击 Enable

---

### 步骤 4：测试注册

**访问：** `http://localhost:3005/register`

**填写信息：**
```
姓名：测试用户
邮箱：test@example.com
密码：test123456
确认密码：test123456
✅ 同意用户协议和隐私政策
```

**点击注册** → 应该提示 "注册成功！请登录"

---

### 步骤 5：测试登录

**访问：** `http://localhost:3005/login`

**输入：**
```
邮箱：test@example.com
密码：test123456
```

**点击登录** → 应该成功进入用户中心 ✅

---

## ⚠️ 常见问题

### 问题 1：注册后提示 "Please confirm your email"
**原因：** 邮箱验证未关闭
**解决：** 
- 回到 Authentication → Settings
- 确保 "Enable email confirmations" 已取消勾选

### 问题 2：登录提示 "Invalid login credentials"
**原因：** 账号不存在
**解决：** 先注册再登录

### 问题 3：CORS 错误
**原因：** URL 未添加到白名单
**解决：**
- Authentication → Settings
- 添加 Site URL 和 Redirect URLs

---

## 🎯 生产环境配置（上线前）

**完成后记得：**

1. **修改 .env.local**
   ```
   NEXT_PUBLIC_DEV_MODE=false
   ```

2. **更新 Supabase 配置**
   ```
   Site URL: https://tools.hefeiapp.top
   Redirect URLs: https://tools.hefeiapp.top/*
   ```

3. **开启邮箱验证（可选）**
   - 生产环境建议开启
   - 配置自定义邮件模板

---

## 📞 配置完成后

**告诉我：**
- ✅ 配置完成
- 我帮你测试注册登录功能

---

**预计时间：** 5 分钟
**难度：** ⭐⭐☆☆☆（简单）
