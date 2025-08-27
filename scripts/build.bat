@echo off
echo ========================================
echo    Advanced OS Simulator Builder
echo ========================================
echo.

echo [1/4] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Testing application...
npm start &
timeout /t 5 /nobreak >nul
taskkill /f /im electron.exe >nul 2>&1

echo.
echo [3/4] Building for Windows...
npm run build:win
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo [4/4] Build completed successfully!
echo.
echo Output files are in the 'dist' folder:
dir dist
echo.
echo Press any key to open the dist folder...
pause >nul
explorer dist

echo.
echo Build process completed!
pause
