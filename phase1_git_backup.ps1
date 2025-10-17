# ================================================
# NYDHI LOYALTY - GIT BACKUP AUTOMATION SCRIPT
# Created: (v1.0)
# Description: Auto-commit + push all changes to GitHub main branch
# ================================================

Write-Host "`n🚀 Starting NYDHI Loyalty Git Backup..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "C:\Users\ADMIN\nydhi-loyalty"

# Check for git repo
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not found. Initializing..." -ForegroundColor Yellow
    git init
    git branch -M main
    git remote set-url origin https://github.com/pradyservices99-coder/nydhi-loyalty.git
}

# Add all modified files
git add .

# Create a timestamped commit message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Automated backup - $timestamp"
git commit -m $commitMessage

# Push to GitHub main branch
Write-Host "`n📤 Pushing updates to GitHub..." -ForegroundColor Cyan
git push origin main

# Final message
Write-Host "`n✅ Backup Complete! Your project is safely stored on GitHub." -ForegroundColor Green
