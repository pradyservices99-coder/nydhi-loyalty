# ==============================
# NYDHI Loyalty Phase-1 Auto Setup
# ==============================

# Step 1️⃣ – Move to project folder
Set-Location "C:\Users\ADMIN\nydhi-loyalty"

Write-Host "`n🚀 Starting NYDHI Loyalty Phase-1 Setup...`n" -ForegroundColor Cyan

# Step 2️⃣ – Start a new Cloudflare tunnel in background
Write-Host "🌀 Launching Cloudflare tunnel..." -ForegroundColor Yellow
$tunnelProcess = Start-Process -FilePath "cloudflared.exe" -ArgumentList "tunnel --url http://localhost:3000" -PassThru -RedirectStandardOutput ".\tunnel.log"

# Wait a few seconds for Cloudflare to output the URL
Start-Sleep -Seconds 5

# Step 3️⃣ – Extract the trycloudflare URL from the log
$tunnelUrl = Select-String -Path ".\tunnel.log" -Pattern "https://.*\.trycloudflare\.com" | Select-Object -Last 1 | ForEach-Object { $_.Matches.Value }

if (-not $tunnelUrl) {
    Write-Host "❌ Could not detect Cloudflare URL. Is cloudflared installed and running?" -ForegroundColor Red
    Stop-Process -Id $tunnelProcess.Id -Force
    exit
}

Write-Host "✅ Tunnel active: $tunnelUrl" -ForegroundColor Green

# Step 4️⃣ – Update shopify.app.nydhi-loyalty.toml with the new URL
$configPath = "C:\Users\ADMIN\nydhi-loyalty\shopify.app.nydhi-loyalty.toml"
$configText = Get-Content $configPath -Raw

# Replace old trycloudflare links dynamically
$updated = $configText -replace "https://[a-z0-9\-]+\.trycloudflare\.com", $tunnelUrl
Set-Content -Path $configPath -Value $updated -Encoding UTF8

Write-Host "🔧 Updated Cloudflare URL in Shopify config." -ForegroundColor Green

# Step 5️⃣ – Start the Shopify app dev server
Write-Host "🧩 Launching Shopify dev server..." -ForegroundColor Yellow
shopify app dev --store nydhi-loyalty-dev-3.myshopify.com
