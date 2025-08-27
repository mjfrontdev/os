# 🚀 OsMj - Windows 11 Style OS Simulator - Build Guide

## 📋 Version Information
- **Current Version**: 2.5.0
- **Description**: Windows 11 Style OS Simulator built with Electron
- **Icons**: Custom OS icons for each platform

## 🎯 Build for Windows

This project includes multiple build scripts to create installable packages for Windows from a single command.

## 📦 Prerequisites

Before building, make sure you have:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for cloning the repository)

## 🔧 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
cd osmj
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Build Commands

### Option 1: Using npm scripts (Recommended)

**Build for Windows:**
```bash
npm run build:all
```

**Build for specific platforms:**
```bash
npm run build:win    # Windows only
npm run build:cross  # Windows (direct electron-builder)
```

### Option 2: Using platform-specific scripts

#### Windows
```cmd
# Command Prompt
build-all.bat

# PowerShell
.\build-all.ps1
```

#### Linux (if using WSL)
```bash
# Make executable (first time only)
chmod +x build-all.sh

# Run the script
./build-all.sh
```

### Option 3: Using Node.js directly
```bash
node build-all.js
```

## 📁 Output Files

After successful build, you'll find the following files in the `dist/` folder:

### Windows
- `OsMj Setup 2.5.0.exe` - Windows installer
- `OsMj 2.5.0.exe` - Portable executable

## 🎨 Custom Icons

The application uses custom icons for Windows:
- **Windows**: `assets/os1 (1).png`

## 🔍 Search Functionality

The search feature is now fully functional and includes:

- **Real-time search** as you type
- **App search** through desktop and start menu
- **System action search** (settings, wallpaper, etc.)
- **Keyboard shortcuts** (Enter to execute)
- **Beautiful results display** with glassmorphism effects

## 🛠️ Troubleshooting

### Common Issues

1. **"electron-builder not found"**
   ```bash
   npm install --save-dev electron-builder
   ```

2. **Build fails on macOS**
   - Ensure you have Xcode Command Line Tools installed
   - Run: `xcode-select --install`

3. **Build fails on Linux**
   - Install required packages: `sudo apt-get install fakeroot dpkg-dev`
   - For AppImage: `sudo apt-get install libfuse2`

4. **Permission denied on shell scripts**
   ```bash
   chmod +x build-all.sh
   ```

### Platform-Specific Notes

- **Windows**: Builds both installer (.exe) and portable (.exe)
- **macOS**: Creates .dmg file (requires macOS for building)
- **Linux**: Generates AppImage (works on most distributions)

## 📱 Features in Version 2.5.0

- ✨ **Modern Windows 11-style UI**
- 🎨 **5 beautiful themes** (Dark, Light, Neon, Sunset, Ocean)
- 🔍 **Fully functional search system**
- 🌟 **Glassmorphism effects** and smooth animations
- 📱 **Responsive design** for all screen sizes
- 🎭 **Advanced animations** with AOS and Bootstrap
- 🔧 **Enhanced customization panel**
- 🌤️ **Improved weather widget**
- 🖥️ **Better window management**

## 🎉 Success!

After building, you'll have professional installable packages for all major platforms. The application maintains the same beautiful UI and functionality across all operating systems.

---

**Happy Building! 🚀**
