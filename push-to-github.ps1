# 推送代码到 GitHub 脚本
# 使用方法：在 PowerShell 中运行 .\push-to-github.ps1

Write-Host " 配置 Git 用户信息..." -ForegroundColor Cyan
git config user.email "1335979521@qq.com"
git config user.name "朱永松"

Write-Host "📦 切换到 main 分支..." -ForegroundColor Cyan
git branch -M main

Write-Host "🔗 请复制以下命令，替换 YOUR_USERNAME 为你的 GitHub 用户名：" -ForegroundColor Yellow
Write-Host ""
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/songguo-tools-pro.git" -ForegroundColor Green
Write-Host ""
Write-Host "然后执行：" -ForegroundColor Yellow
Write-Host "git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "💡 提示：如果已有 GitHub token，可以使用：" -ForegroundColor Cyan
Write-Host "git remote add origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/songguo-tools-pro.git" -ForegroundColor Green
Write-Host ""
