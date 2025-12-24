# Physical Device Setup Guide

## ✅ Step 1: Network Configuration (COMPLETED)
Your Android app is now configured to connect to: **http://172.20.10.5:3000/api**

## 📱 Step 2: Prepare Your Backend Server

Your backend server (Node.js/Express) needs to be accessible on the network:

### For Node.js/Express Backend:
```bash
# Make sure your server binds to 0.0.0.0 instead of localhost
# In your server.js or app.js:
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
```

### For Other Backends:
- MySQL: Configure `bind-address = 0.0.0.0` in my.cnf
- PostgreSQL: Update `listen_addresses = '*'` in postgresql.conf
- Make sure to update firewall rules to allow incoming connections on port 3000

### Windows Firewall:
```powershell
# Run PowerShell as Administrator:
New-NetFirewallRule -DisplayName "Node.js Server" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

## 📲 Step 3: Connect Your Physical Device

### Option A: Same Wi-Fi Network (Recommended)
1. Connect your phone to the **same Wi-Fi network** as your PC
2. Your phone will be able to access 172.20.10.5:3000

### Option B: USB Tethering
1. Connect phone via USB cable
2. Enable USB tethering on your phone:
   - Settings → Network & Internet → Hotspot & Tethering → USB Tethering
3. Your PC will get an IP from your phone's network

### Option C: Mobile Hotspot
1. Create a hotspot on your phone
2. Connect your PC to the phone's hotspot
3. Find your PC's new IP with `ipconfig`
4. Update NetworkConfig.java with the new IP

## 🔨 Step 4: Build APK

The APK is being built automatically. You'll find it at:
`app/build/outputs/apk/debug/app-debug.apk`

## 📦 Step 5: Install APK on Your Phone

### Method 1: USB (ADB)
```bash
# Make sure USB debugging is enabled on your phone
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: File Transfer
1. Copy `app-debug.apk` to your phone via:
   - USB cable (file transfer mode)
   - Google Drive / Cloud storage
   - Email attachment
2. Open the APK file on your phone
3. Enable "Install from Unknown Sources" if prompted
4. Install the app

## 🧪 Step 6: Test Connection

1. Start your backend server on your PC
2. Verify it's accessible: Open browser and go to http://172.20.10.5:3000/api
3. Open the app on your phone
4. The app should fetch data from your PC's database

## ⚠️ Troubleshooting

### "Unable to resolve host" or "Connection failed"
- ✓ Verify both devices are on the same network
- ✓ Check firewall settings on PC
- ✓ Verify backend server is running
- ✓ Test connectivity: ping 172.20.10.5 from phone's terminal app

### "Connection refused"
- ✓ Backend server must bind to 0.0.0.0, not localhost
- ✓ Correct port (3000) is being used
- ✓ Server is actually running

### "Network error" or timeout
- ✓ Check antivirus/firewall blocking connections
- ✓ Ensure Wi-Fi isolation is disabled on router
- ✓ Try disabling Windows Firewall temporarily to test

## 📝 Notes

- **Current IP**: 172.20.10.5 (Wi-Fi adapter)
- **Backend Port**: 3000
- **API Base URL**: http://172.20.10.5:3000/api

If your IP address changes (reconnect to Wi-Fi, different network), you'll need to:
1. Run `ipconfig` to get new IP
2. Update `NetworkConfig.java` with new IP
3. Rebuild the APK

