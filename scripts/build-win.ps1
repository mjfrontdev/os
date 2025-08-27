# OsMj - Windows 11 Style OS Simulator - Build Script for Windows
# Run this script to build for Windows only

Write-Host "🚀 Starting Windows build process..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Build for Windows only
Write-Host "📦 Building for Windows..." -ForegroundColor Yellow
Write-Host ""

npm run build:win

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Windows build completed successfully!" -ForegroundColor Green
Write-Host "📁 Output files are in the 'dist' folder" -ForegroundColor Cyan

# List output files
if (Test-Path "dist") {
    $files = Get-ChildItem "dist"
    Write-Host ""
    Write-Host "📋 Generated files:" -ForegroundColor Cyan
    foreach ($file in $files) {
        $size = [math]::Round($file.Length / 1MB, 2)
        Write-Host "   • $($file.Name) ($size MB)" -ForegroundColor White
    }
}

Write-Host ""
Read-Host "Press Enter to exit"
