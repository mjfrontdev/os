# 🚀 راهنمای بیلد پروژه Advanced OS Simulator

## 📋 **پیش‌نیازها**

قبل از بیلد، مطمئن شوید که موارد زیر نصب شده‌اند:

```bash
# Node.js (نسخه 16 یا بالاتر)
node --version

# npm
npm --version

# Electron Builder
npm install --save-dev electron-builder
```

## 🛠️ **مراحل بیلد**

### **1. نصب وابستگی‌ها**
```bash
npm install
```

### **2. تست اپلیکیشن**
```bash
npm start
```

### **3. بیلد برای ویندوز**
```bash
# بیلد کامل با installer
npm run build:win

# یا بیلد ساده
npm run build
```

### **4. بیلد برای سایر پلتفرم‌ها**
```bash
# macOS
npm run build:mac

# Linux
npm run build:linux

# همه پلتفرم‌ها
npm run build:all
```

## 📁 **فایل‌های خروجی**

بعد از بیلد، فایل‌های زیر در پوشه `dist` ایجاد می‌شوند:

### **ویندوز:**
- `Advanced OS Simulator Setup.exe` - نصب‌کننده
- `Advanced OS Simulator.exe` - نسخه portable

### **macOS:**
- `Advanced OS Simulator.dmg` - فایل نصب

### **Linux:**
- `Advanced OS Simulator.AppImage` - اپلیکیشن قابل اجرا

## ⚙️ **تنظیمات بیلد**

### **فایل package.json:**
```json
{
  "build": {
    "appId": "com.example.os-simulator",
    "productName": "Advanced OS Simulator",
    "directories": {
      "output": "dist"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        },
        {
          "target": "portable",
          "arch": ["x64"]
        }
      ]
    }
  }
}
```

## 🔧 **تنظیمات پیشرفته**

### **تنظیم آیکون:**
- **ویندوز:** `assets/icon.ico`
- **macOS:** `assets/icon.icns`
- **Linux:** `assets/icon.png`

### **تنظیم NSIS (ویندوز):**
```json
"nsis": {
  "oneClick": false,
  "allowToChangeInstallationDirectory": true,
  "createDesktopShortcut": true,
  "createStartMenuShortcut": true
}
```

## 🚨 **مشکلات رایج و راه‌حل‌ها**

### **خطای Electron Builder:**
```bash
# پاک کردن cache
npm cache clean --force

# نصب مجدد وابستگی‌ها
rm -rf node_modules package-lock.json
npm install
```

### **خطای آیکون:**
- مطمئن شوید که فایل‌های آیکون در پوشه `assets` وجود دارند
- فرمت آیکون‌ها صحیح باشد

### **خطای فایل‌های اضافی:**
- فایل‌های غیرضروری را از `files` در `package.json` حذف کنید
- از `!` برای حذف فایل‌ها استفاده کنید

## 📦 **توزیع اپلیکیشن**

### **ویندوز:**
- فایل `.exe` را برای کاربران ارسال کنید
- یا فایل portable را برای اجرا بدون نصب

### **macOS:**
- فایل `.dmg` را برای کاربران ارسال کنید
- کاربران باید آن را در Applications نصب کنند

### **Linux:**
- فایل `.AppImage` را برای کاربران ارسال کنید
- کاربران باید آن را قابل اجرا کنند: `chmod +x filename.AppImage`

## 🔍 **تست بیلد**

### **1. تست نصب‌کننده:**
- فایل نصب را در سیستم تمیز تست کنید
- مطمئن شوید که همه قابلیت‌ها کار می‌کنند

### **2. تست عملکرد:**
- اپلیکیشن را باز کنید
- همه قابلیت‌ها را تست کنید
- مطمئن شوید که شخصی‌سازی‌ها ذخیره می‌شوند

### **3. تست حذف:**
- اپلیکیشن را حذف کنید
- مطمئن شوید که همه فایل‌ها حذف می‌شوند

## 📚 **منابع مفید**

- [Electron Builder Documentation](https://www.electron.build/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [NSIS Documentation](https://nsis.sourceforge.io/)

## 🎯 **نکات مهم**

1. **همیشه قبل از بیلد تست کنید**
2. **فایل‌های آیکون را درست تنظیم کنید**
3. **تنظیمات NSIS را برای تجربه بهتر کاربر تنظیم کنید**
4. **فایل‌های غیرضروری را حذف کنید**
5. **بعد از بیلد، اپلیکیشن را در سیستم تمیز تست کنید**

---

**🎉 موفق باشید! اپلیکیشن شما آماده توزیع است!**
