# 🌐 Dynamic IP Address Configuration

## ✅ New Feature Added!

You can now **change the network IP address directly from the app** without rebuilding the APK!

---

## 🎯 What's New

### Before:
- ❌ IP address was hardcoded in `NetworkConfig.java`
- ❌ Had to rebuild APK every time network changed
- ❌ Couldn't use app on different networks easily

### Now:
- ✅ IP address configurable from the app
- ✅ Settings saved permanently (SharedPreferences)
- ✅ Default IP: `172.20.10.5` (your current PC IP)
- ✅ No need to rebuild APK when network changes
- ✅ Easy to switch between networks

---

## 📱 How to Use

### 1. Open Network Settings
Tap the **Settings icon (⚙️)** in the top-right corner of the app

### 2. Configure Your Network
A dialog will appear with:
- **IP Address field** - Enter your PC's IP address
- **Port field** - Enter backend port (default: 3000)
- **Current URL** - Shows the full API URL

### 3. Enter Your PC's IP
```
Examples:
- 172.20.10.5 (current default)
- 192.168.1.100
- 10.0.0.50
- Your PC's actual IP
```

### 4. Save Settings
- Tap **"Save"** to apply changes
- Settings are saved permanently
- App will now connect to the new IP

### 5. Reset to Default (Optional)
- Tap **"Reset"** to restore default IP (172.20.10.5)

---

## 🖼️ Network Settings Dialog

```
┌─────────────────────────────────────────┐
│  Network Settings                       │
├─────────────────────────────────────────┤
│  Configure your PC's IP address to     │
│  connect to the backend server.        │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ IP Address                        │ │
│  │ 172.20.10.5                       │ │
│  └───────────────────────────────────┘ │
│  e.g., 192.168.1.100 or 172.20.10.5   │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Port                              │ │
│  │ 3000                              │ │
│  └───────────────────────────────────┘ │
│  Default: 3000                          │
│                                         │
│  [Reset]    [Cancel]    [Save]         │
│                                         │
│  Current URL:                           │
│  http://172.20.10.5:3000/api           │
└─────────────────────────────────────────┘
```

---

## 🔧 Technical Details

### Files Created:
1. **PreferenceManager.java** - Manages IP/Port storage
   - Uses SharedPreferences for persistence
   - Provides default values
   - Methods: setIpAddress(), getIpAddress(), getBaseUrl()

2. **dialog_network_settings.xml** - Settings dialog UI
   - Material Design inputs
   - IP Address field
   - Port field
   - Save/Cancel/Reset buttons

3. **main_menu.xml** - Settings menu item
   - Settings icon in action bar
   - Always visible

### Files Modified:
- **NetworkConfig.java** - Now uses dynamic IP from PreferenceManager
- **MainActivity.java** - Added settings menu and dialog
- **ProductFragment.java** - Uses context-aware NetworkConfig
- **ProductFormFragment.java** - Uses context-aware NetworkConfig
- **CategoryFragment.java** - Uses context-aware NetworkConfig
- **CategoryFormFragment.java** - Uses context-aware NetworkConfig

### How It Works:
1. **SharedPreferences** stores IP and Port
2. **PreferenceManager** reads/writes preferences
3. **NetworkConfig** fetches IP from PreferenceManager
4. All API calls use the configured IP
5. Settings persist across app restarts

---

## 📋 Usage Scenarios

### Scenario 1: Home Network
```
1. Connect phone to home Wi-Fi
2. Find PC IP: 192.168.1.100
3. Open app → Settings
4. Enter: 192.168.1.100
5. Save → Done!
```

### Scenario 2: Mobile Hotspot
```
1. Create hotspot on phone
2. Connect PC to hotspot
3. Find PC IP: 172.20.10.5
4. Open app → Settings
5. Enter: 172.20.10.5
6. Save → Done!
```

### Scenario 3: Office Network
```
1. Connect to office Wi-Fi
2. Find PC IP: 10.0.0.50
3. Open app → Settings
4. Enter: 10.0.0.50
5. Save → Done!
```

### Scenario 4: Back to Default
```
1. Open app → Settings
2. Tap "Reset"
3. Default IP restored: 172.20.10.5
```

---

## 🎯 Benefits

### For Users:
- ✅ **No technical knowledge needed** - Simple UI
- ✅ **Change network anytime** - No app reinstall
- ✅ **Works on any network** - Home, office, hotspot
- ✅ **Saved permanently** - Set once, use forever
- ✅ **Easy to reset** - One tap to restore defaults

### For Developers:
- ✅ **No rebuild needed** - Save development time
- ✅ **Easy testing** - Switch between networks quickly
- ✅ **User-friendly** - Non-technical users can configure
- ✅ **Persistent storage** - SharedPreferences
- ✅ **Clean architecture** - Separated concerns

---

## 🔍 Finding Your PC's IP Address

### Windows:
```bash
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

### Mac/Linux:
```bash
ifconfig
# or
ip addr
```

### Common IP Ranges:
- **192.168.x.x** - Most home routers
- **10.x.x.x** - Large networks, VPNs
- **172.16.x.x to 172.31.x.x** - Private networks

---

## ⚙️ Default Configuration

```java
Default IP Address: 172.20.10.5
Default Port: 3000
Default URL: http://172.20.10.5:3000/api
```

These defaults match your current PC configuration!

---

## 🚀 Quick Start

### First Time Setup:
1. Install APK on phone
2. Open app
3. Tap Settings icon (⚙️)
4. Verify IP is correct (or change it)
5. Tap Save
6. Start using the app!

### When Network Changes:
1. Find new PC IP (`ipconfig`)
2. Open app → Settings
3. Enter new IP
4. Save
5. Continue using!

---

## 💡 Tips

### Tip 1: Save Your IP
Write down your common IPs:
- Home: `________________`
- Office: `________________`
- Hotspot: `________________`

### Tip 2: Check Connection
After changing IP:
1. Verify backend is running
2. Try loading products/categories
3. Check for "Network error" messages

### Tip 3: Backend Must Be Accessible
Ensure:
- Backend bound to `0.0.0.0:3000` (not localhost)
- Firewall allows port 3000
- Phone and PC on same network

### Tip 4: Use Current URL Display
The dialog shows your current URL at the bottom - use this to verify settings before saving!

---

## 🎊 Summary

**What Changed:**
- ✅ Added Settings button (⚙️) in top-right
- ✅ Added Network Settings dialog
- ✅ IP and Port now configurable
- ✅ Settings saved permanently
- ✅ Default: 172.20.10.5:3000

**APK Location:**
```
app/build/outputs/apk/debug/app-debug.apk
Size: 5.6 MB
Features: Dynamic IP + All previous features
```

**No More Rebuilding!**
Change your network IP anytime directly from the app! 🎉

