#!/bin/bash
# ========================================
# 松果工具箱 Pro - 一键启动脚本 (Mac/Linux)
# ========================================

echo ""
echo "🌰 松果工具箱 Pro"
echo "================================"
echo ""

# 检查 Node.js
echo "🔍 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js"
    echo "下载地址：https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js 已安装"

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚠️  .env.local 不存在，从模板复制..."
    cp .env.example .env.local
    echo "✅ 已创建 .env.local"
    echo ""
    echo "📝 请编辑 .env.local 文件，填入 Supabase 配置"
    echo "配置指南：docs/supabase-create-guide.md"
    echo ""
fi

echo ""
echo "🚀 启动开发服务器..."
echo "访问地址：http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
