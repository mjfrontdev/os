@echo off
echo Testing build process...
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Test the build process
echo Testing build...
npm run build:win

echo.
echo Test completed!
pause
