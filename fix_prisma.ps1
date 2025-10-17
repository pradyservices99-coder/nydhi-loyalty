Write-Host "──────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host "🔧  NYDHI Prisma Auto-Repair Utility" -ForegroundColor Yellow
Write-Host "──────────────────────────────────────────────" -ForegroundColor Cyan

# Step 1 — Stop any running Node processes
Write-Host "`n🛑 Stopping all Node.js processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Step 2 — Remove Prisma client folder
$prismaPath = "C:\Users\ADMIN\nydhi-loyalty\node_modules\.prisma"
if (Test-Path $prismaPath) {
    Write-Host "🧹 Removing old Prisma client folder..."
    Remove-Item -Recurse -Force $prismaPath
} else {
    Write-Host "ℹ️  No old Prisma folder found."
}

# Step 3 — Regenerate Prisma client
Write-Host "`n⚙️  Regenerating Prisma client..."
Set-Location "C:\Users\ADMIN\nydhi-loyalty"
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Prisma client generated successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Prisma client generation failed." -ForegroundColor Red
    exit 1
}

# Step 4 — Restart the dev server
Write-Host "`n🚀 Starting development server..."
npm run dev
