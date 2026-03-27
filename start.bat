@echo off
REM ========================================
REM 松果工具箱 Pro - 一键启动脚本
REM ========================================

echo.
echo 🌰 松果工具箱 Pro
echo ================================
echo.

REM 检查 Node.js
echo 🔍 检查环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

REM 检查依赖
if not exist "node_modules" (
    echo.
    echo 📦 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)

REM 检查环境变量
if not exist ".env.local" (
    echo.
    echo ⚠️  .env.local 不存在，从模板复制...
    copy .env.example .env.local
    echo ✅ 已创建 .env.local
    echo.
    echo 📝 请编辑 .env.local 文件，填入 Supabase 配置
    echo 配置指南：docs/supabase-create-guide.md
    echo.
)

echo.
echo 🚀 启动开发服务器...
echo 访问地址：http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev

pause
