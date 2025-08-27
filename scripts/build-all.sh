#!/bin/bash

# OsMj - Windows 11 Style OS Simulator - Build Script for Windows
# Run this script to build for Windows

echo "🚀 Starting build process for Windows..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
fi

# Build for Windows only
echo "📦 Building for Windows..."
echo ""

npm run build:cross

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✅ Build completed successfully for Windows!"
echo "📁 Output files are in the 'dist' folder"

# List output files
if [ -d "dist" ]; then
    echo ""
    echo "📋 Generated files:"
    for file in dist/*; do
        if [ -f "$file" ]; then
            size=$(du -h "$file" | cut -f1)
            filename=$(basename "$file")
            echo "   • $filename ($size)"
        fi
    done
fi

echo ""
echo "🎉 Build process completed!"
