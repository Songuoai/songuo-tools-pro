@echo off
echo ===================================
echo 松果工具箱 - 生产环境启动脚本
echo ===================================
echo.
echo [1/3] 清理缓存...
if exist .next rmdir /s /q .next
echo.
echo [2/3] 构建项目...
call npm run build
echo.
echo [3/3] 启动生产服务器...
call npm start
echo.
echo ===================================
echo 启动完成！访问：http://localhost:3000
echo ===================================
pause
