# Android App Setup Guide

## Prerequisites

✅ **Backend is running** (you confirmed this)
- Backend server should be running on `http://localhost:3000`
- Server is bound to `0.0.0.0` (allows network connections)

## Step 1: Find Your Computer's IP Address

### Windows:
```bash
ipconfig
```
Look for **IPv4 Address** under your active network adapter:
- Example: `192.168.1.100` or `192.168.43.1`

### Mac/Linux:
```bash
ifconfig
# or
ip addr show
```

**Note down your IP address** - you'll need it in Step 3.

## Step 2: Choose Your Setup Method

### Option A: Android Emulator (Easiest)
- ✅ No tethering needed
- ✅ Use `10.0.2.2` (already configured)
- ✅ Works immediately

### Option B: Physical Device (Tethering)
- Connect via USB tethering or same Wi-Fi
- Need to update IP address in code

---

## Step 3: Configure Network in Android App

### For Android Emulator:
**Already configured!** The `NetworkConfig.java` file has:
```java
private static final String BASE_URL = "http://10.0.2.2:3000/api";
```
✅ No changes needed - `10.0.2.2` maps to `localhost` on your computer.

### For Physical Device:
1. Open `assignment4-android/app/src/main/java/com/assignment4/utils/NetworkConfig.java`
2. Replace the IP address with your computer's IP:

```java
// Change this line:
private static final String BASE_URL = "http://10.0.2.2:3000/api";

// To (replace with YOUR IP):
private static final String BASE_URL = "http://192.168.1.100:3000/api";
```

**Example:**
- If your IP is `192.168.43.1`, use: `http://192.168.43.1:3000/api`
- If your IP is `192.168.1.100`, use: `http://192.168.1.100:3000/api`

---

## Step 4: Open Project in Android Studio

1. **Open Android Studio**
2. **File → Open** (or "Open an Existing Project")
3. Navigate to: `assignment4-android` folder
4. Click **OK**

5. **Wait for Gradle Sync**
   - Android Studio will automatically sync Gradle files
   - This may take a few minutes on first open
   - Look for "Gradle sync finished" in the bottom status bar

---

## Step 5: Build and Run

### For Android Emulator:

1. **Create/Start Emulator:**
   - Click **Device Manager** (phone icon in toolbar)
   - Click **Create Device** (if no emulator exists)
   - Choose a device (e.g., Pixel 5)
   - Download a system image (API 30+ recommended)
   - Click **Finish**

2. **Run the App:**
   - Click the **green play button** (▶️) in toolbar
   - Or press **Shift + F10**
   - Select your emulator
   - Wait for app to install and launch

### For Physical Device:

1. **Enable Developer Options:**
   - Go to **Settings → About Phone**
   - Tap **Build Number** 7 times
   - Go back to **Settings → Developer Options**
   - Enable **USB Debugging**

2. **Connect Device:**
   - Connect phone via USB
   - Allow USB debugging when prompted on phone
   - Verify device appears in Android Studio (bottom status bar)

3. **Run the App:**
   - Click the **green play button** (▶️)
   - Select your physical device
   - Wait for app to install and launch

---

## Step 6: Test the Connection

### Test Flow:

1. **Open the App:**
   - You'll see MainActivity with "Open Network Activity" button

2. **Click "Open Network Activity"**
   - NetworkActivity should open
   - Products should load automatically (GET request)
   - You should see a list of products in RecyclerView

3. **Test Creating a Product:**
   - Click **"Add Product"** button (or FAB)
   - Fill in the form:
     - Product Name: "Test Product"
     - Price: "99.99"
     - Category: Select any category
     - Description: "Test description"
   - Click **Submit**
   - Product should appear in RecyclerView immediately
   - Check web app - product should also appear there!

4. **Test Product Details:**
   - Click on any product in the list
   - Product details dialog should appear

---

## Troubleshooting

### ❌ "Network error" or "Connection refused"

**Check:**
1. ✅ Backend server is running (`npm run dev` in backend folder)
2. ✅ IP address is correct in `NetworkConfig.java`
3. ✅ For physical device: Both on same network or tethering enabled
4. ✅ Windows Firewall allows port 3000

**Test connection:**
- Open browser on phone/emulator
- Go to: `http://YOUR_IP:3000/api/products`
- Should see JSON response
- If not, check firewall settings

### ❌ "App won't build"

**Solutions:**
1. **Sync Gradle:** File → Sync Project with Gradle Files
2. **Clean Project:** Build → Clean Project
3. **Rebuild:** Build → Rebuild Project
4. **Invalidate Caches:** File → Invalidate Caches → Invalidate and Restart

### ❌ "Products not loading"

**Check:**
1. Backend is running and accessible
2. Database has data: Run `npm run seed` in backend
3. NetworkConfig.java has correct URL
4. Check Logcat in Android Studio for error messages

### ❌ "Cannot connect to server"

**For Physical Device:**
1. Ensure USB tethering is enabled OR both on same Wi-Fi
2. Find correct IP address:
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address under your active adapter
   ```
3. Update `NetworkConfig.java` with correct IP
4. Rebuild and reinstall app

**For Emulator:**
- Use `10.0.2.2` (already configured)
- Ensure backend is running on localhost:3000

---

## Quick Test Commands

### Test Backend from Command Line:
```bash
# Test categories endpoint
curl http://localhost:3000/api/categories

# Test products endpoint
curl http://localhost:3000/api/products
```

### Test from Phone Browser:
1. Open browser on phone
2. Go to: `http://YOUR_COMPUTER_IP:3000/api/products`
3. Should see JSON response
4. If this works, Android app will work too!

---

## Summary Checklist

- [ ] Backend server running (`npm run dev`)
- [ ] Found computer's IP address
- [ ] Updated `NetworkConfig.java` (if using physical device)
- [ ] Opened project in Android Studio
- [ ] Gradle sync completed
- [ ] Emulator running OR physical device connected
- [ ] App installed and launched
- [ ] NetworkActivity opens successfully
- [ ] Products load in RecyclerView
- [ ] Can create new product via form
- [ ] New product appears in RecyclerView
- [ ] New product appears in web app

---

## Next Steps After Setup

1. ✅ Test all CRUD operations
2. ✅ Verify real-time sync between Android and web app
3. ✅ Test on different devices
4. ✅ Generate APK for submission

## Generate APK

When ready to create APK:
1. **Build → Generate Signed Bundle / APK**
2. Choose **APK**
3. Select **release** build variant
4. Follow signing wizard
5. APK location: `app/build/outputs/apk/release/app-release.apk`

---

## Need Help?

If you encounter issues:
1. Check Android Studio's **Logcat** for error messages
2. Verify backend is accessible from phone browser
3. Ensure IP address is correct
4. Check that backend is bound to `0.0.0.0` (it is by default)

Good luck! 🚀

