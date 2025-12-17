# Complete Setup Guide - Assignment 4

This guide will help you set up and run all three components of the application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android app)
- Java JDK 8 or higher

## Step 1: Backend Setup

1. Navigate to backend directory:
   ```bash
   cd assignment4-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create `.env` file:
   ```
   PORT=3000
   NODE_ENV=development
   DB_PATH=./database.sqlite
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` and will be accessible on your network.

5. Verify it's working:
   - Open browser: `http://localhost:3000/api/categories`
   - You should see JSON response with categories

## Step 2: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd assignment4-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create `.env` file:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open browser to `http://localhost:5173`

6. Test the application:
   - Navigate to Categories page
   - Create a new category
   - Navigate to Products page
   - Create a new product

## Step 3: Android Setup

### Option A: Using Android Studio

1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to `assignment4-android` folder
4. Wait for Gradle sync to complete

### Option B: Command Line (if you have Android SDK)

```bash
cd assignment4-android
./gradlew build
```

### Configure Network

1. Find your computer's IP address:
   - **Windows**: Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
   - **Mac/Linux**: Open Terminal, type `ifconfig` or `ip addr show`

2. Open `app/src/main/java/com/assignment4/utils/NetworkConfig.java`

3. Update the `BASE_URL`:
   ```java
   // For Android Emulator:
   private static final String BASE_URL = "http://10.0.2.2:3000/api";
   
   // For Physical Device (replace with your IP):
   private static final String BASE_URL = "http://192.168.1.100:3000/api";
   ```

### Build and Run

1. Connect Android device or start emulator
2. Click "Run" in Android Studio (or press Shift+F10)
3. The app will install and launch

## Step 4: Network Configuration for Android

### For Android Emulator

- Use: `http://10.0.2.2:3000/api`
- `10.0.2.2` is a special IP that maps to `localhost` on your computer
- No additional setup needed

### For Physical Device

#### Option 1: USB Tethering

1. Connect Android device via USB
2. Enable USB tethering on your phone
3. Your computer will share internet via USB
4. Find your computer's IP (usually `192.168.42.1` or similar)
5. Update `NetworkConfig.java` with this IP

#### Option 2: Same Wi-Fi Network

1. Connect both computer and Android device to same Wi-Fi
2. Find your computer's Wi-Fi IP address
3. Update `NetworkConfig.java` with this IP
4. Ensure backend server is bound to `0.0.0.0` (it is by default)

#### Option 3: Mobile Hotspot

1. Enable mobile hotspot on your phone
2. Connect your computer to the hotspot
3. Find your computer's IP on the hotspot network
4. Update `NetworkConfig.java` with this IP

## Step 5: Testing

### Test Backend

```bash
# Test categories endpoint
curl http://localhost:3000/api/categories

# Test products endpoint
curl http://localhost:3000/api/products

# Create a category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Category","description":"Test"}'
```

### Test Frontend

1. Open `http://localhost:5173`
2. Create a category
3. Create a product
4. Verify data appears correctly

### Test Android App

1. Open the app on device/emulator
2. Click "Open Network Activity"
3. Products should load automatically
4. Click "Add Product" button
5. Fill the form and submit
6. Verify product appears in the list
7. Click on a product to see details

### Test Integration

1. Create a product in Android app
2. Refresh the web app
3. Verify the product appears in web app
4. Create a product in web app
5. Refresh Android app (pull down or restart)
6. Verify the product appears in Android app

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000
# Mac/Linux:
lsof -i :3000

# Kill the process or change PORT in .env
```

**Database locked:**
- Close any other connections to the database
- Delete `database.sqlite` and restart server (will recreate with seed data)

### Frontend Issues

**Cannot connect to API:**
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Android Issues

**Cannot connect to server:**
- Verify backend is running
- Check IP address in `NetworkConfig.java`
- For emulator, use `10.0.2.2`
- For physical device, use computer's IP
- Test connection: Open browser on device to `http://YOUR_IP:3000/api/products`

**Build errors:**
- Sync Gradle files: File → Sync Project with Gradle Files
- Clean project: Build → Clean Project
- Rebuild: Build → Rebuild Project

**App crashes:**
- Check Logcat for error messages
- Verify all dependencies are installed
- Ensure `INTERNET` permission is in `AndroidManifest.xml`

### Network Issues

**Connection refused:**
- Ensure backend binds to `0.0.0.0` (check `src/index.ts`)
- Check Windows Firewall allows port 3000
- Verify IP address is correct

**Timeout errors:**
- Increase Volley timeout (in `VolleySingleton.java`)
- Check network connectivity
- Verify server is accessible from device

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd assignment4-backend && npm install && npm run dev

# Terminal 2 - Frontend
cd assignment4-frontend && npm install && npm run dev

# Terminal 3 - Android (if using command line)
cd assignment4-android && ./gradlew installDebug
```

## Verification Checklist

- [ ] Backend server running on port 3000
- [ ] Backend accessible at `http://localhost:3000/api/categories`
- [ ] Frontend running on port 5173
- [ ] Frontend can create/view categories and products
- [ ] Android app builds successfully
- [ ] NetworkConfig.java has correct IP
- [ ] Android app can load products
- [ ] Android app can create products
- [ ] Data syncs between Android and web app

## Next Steps

1. Test all CRUD operations
2. Test on different devices
3. Generate release APK (see Android README)
4. Document any customizations

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Check console/logcat for error messages
4. Ensure all services are running

