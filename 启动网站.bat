@echo off
chcp 65001 >nul
cls
echo ===================================
echo 松果工具箱 - 一键启动脚本
echo ===================================
echo.
echo [1/3] 清理缓存...
if exist .next (
    rmdir /s /q .next
    echo ✅ 缓存已清理
) else (
    echo ℹ️  无需清理
)
echo.
echo [2/3] 检查依赖...
if not exist node_modules (
    echo ⚠️  正在安装依赖（首次需要几分钟）...
    call npm install
) else (
    echo ✅ 依赖已安装
)
echo.
echo [3/3] 启动服务器...
echo.
echo ╔════════════════════════════════════╗
echo ║  服务器启动后，访问：              ║
echo ║  http://localhost:3000             ║
echo ║                                    ║
echo ║  按 Ctrl+C 停止服务器              ║
echo ╚════════════════════════════════════╝
echo.
call npm run dev

pause
