#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build process for all platforms...\n');

// Check if electron-builder is installed
try {
    require('electron-builder');
} catch (error) {
    console.error('❌ electron-builder is not installed. Please run: npm install --save-dev electron-builder');
    process.exit(1);
}

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, 'dist');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Build for Windows only
console.log('📦 Building for Windows...\n');

try {
    // Build for Windows only
    execSync('npx electron-builder --win', { 
        stdio: 'inherit',
        cwd: __dirname 
    });
    
    console.log('\n✅ Build completed successfully for Windows!');
    console.log('📁 Output files are in the "dist" folder');
    
    // List the output files
    if (fs.existsSync(buildDir)) {
        const files = fs.readdirSync(buildDir);
        console.log('\n📋 Generated files:');
        files.forEach(file => {
            const filePath = path.join(buildDir, file);
            const stats = fs.statSync(filePath);
            const size = (stats.size / 1024 / 1024).toFixed(2);
            console.log(`   • ${file} (${size} MB)`);
        });
    }
    
} catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
}
