# Advanced OS Simulator Builder - PowerShell Script
# Run this script as Administrator if needed

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Advanced OS Simulator Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Check if Node.js is installed
    Write-Host "[1/5] Checking Node.js..." -ForegroundColor Yellow
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
    
    # Check if npm is installed
    Write-Host "[2/5] Checking npm..." -ForegroundColor Yellow
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
    
    # Install dependencies
    Write-Host "[3/5] Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to install dependencies"
    }
    
    # Test application briefly
    Write-Host "[4/5] Testing application..." -ForegroundColor Yellow
    $process = Start-Process npm -ArgumentList "start" -PassThru
    Start-Sleep -Seconds 3
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    
    # Build for Windows
    Write-Host "[5/5] Building for Windows..." -ForegroundColor Yellow
    npm run build:win
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    
    Write-Host ""
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Show output files
    if (Test-Path "dist") {
        Write-Host "Output files in 'dist' folder:" -ForegroundColor Cyan
        Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime
        
        # Ask if user wants to open dist folder
        $openFolder = Read-Host "Do you want to open the dist folder? (y/n)"
        if ($openFolder -eq "y" -or $openFolder -eq "Y") {
            Invoke-Item "dist"
        }
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting tips:" -ForegroundColor Yellow
    Write-Host "1. Make sure Node.js and npm are installed" -ForegroundColor White
    Write-Host "2. Run 'npm cache clean --force'" -ForegroundColor White
    Write-Host "3. Delete node_modules and run 'npm install' again" -ForegroundColor White
    Write-Host "4. Check if you have write permissions in this directory" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
