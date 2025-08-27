# 🚀 OsMj - Windows 11 Style OS Simulator - Windows Build Guide

## 📋 Version Information
- **Current Version**: 2.5.0
- **Description**: Windows 11 Style OS Simulator built with Electron
- **Platform**: Windows Only

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

**Build for Windows only:**
```bash
npm run build:win    # Windows only
npm run build:cross  # Windows (direct electron-builder)
```

### Option 2: Using Windows-specific scripts

#### Windows Command Prompt
```cmd
# Simple Windows build
build-win.bat

# Full build process
build-all.bat
```

#### Windows PowerShell
```powershell
# Simple Windows build
.\build-win.ps1

# Full build process
.\build-all.ps1
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
- **Fuzzy matching** for better results
- **Search across all apps** and system features
- **Keyboard shortcuts** for quick access

## 🎤 Voice Assistant Features

The enhanced voice assistant now includes:

- **Automatic welcome messages** when entering desktop
- **Multiple personality modes** (friendly, professional, enthusiastic, calm)
- **40+ diverse messages** for app launches
- **Voice feedback** for all major operations
- **Bilingual support** (English and Persian)

## 📁 File System Features

The file explorer now includes:

- **Real file system** with persistent storage
- **Working folder creation** with voice feedback
- **File management** capabilities
- **Proper navigation** between directories

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for Windows:**
   ```bash
   npm run build:win
   ```

3. **Or use the batch file:**
   ```cmd
   build-win.bat
   ```

## 🔧 Troubleshooting

### Common Issues

1. **Node.js not found:**
   - Install Node.js from https://nodejs.org/
   - Make sure it's added to PATH

2. **npm not found:**
   - Install npm with Node.js
   - Or run: `npm install -g npm`

3. **Build fails:**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`
   - Try again: `npm run build:win`

4. **Permission denied:**
   - Run PowerShell as Administrator
   - Or use Command Prompt as Administrator

## 📞 Support

If you encounter any issues:

1. Check the console output for error messages
2. Verify Node.js and npm versions
3. Try clearing and reinstalling dependencies
4. Check file permissions

## 🎉 Success!

After successful build, you'll have a fully functional Windows application with:
- ✅ Working voice assistant
- ✅ Functional file system
- ✅ Enhanced user experience
- ✅ Professional appearance
- ✅ Smooth animations
