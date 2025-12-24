# Assignment 4 - Android App

## Setup Instructions

1. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an Existing Project"
   - Navigate to the `assignment4-android` directory

2. **Update Network Configuration**
   - Open `app/src/main/java/com/assignment4/utils/NetworkConfig.java`
   - Update the `BASE_URL` constant:
     - For Android Emulator: `http://10.0.2.2:3000/api`
     - For Physical Device: `http://YOUR_COMPUTER_IP:3000/api`
     - Find your computer's IP:
       - Windows: `ipconfig` → IPv4 Address
       - Mac/Linux: `ifconfig` or `ip addr`

3. **Build and Run**
   - Sync Gradle files
   - Build the project
   - Run on emulator or physical device

## Features

- View list of products from backend API
- Create new products via form
- View product details on item click
- Real-time updates after creating products

## Network Setup

### For Physical Device (Tethering)
1. Connect Android device via USB
2. Enable USB tethering on device
3. Find computer's IP address
4. Update `NetworkConfig.java` with computer's IP
5. Ensure backend server is running and bound to `0.0.0.0`

### For Emulator
- Use `10.0.2.2` which maps to `localhost` on host machine
- No additional setup needed

## Dependencies

- Volley 1.2.1 - HTTP networking
- RecyclerView - Product list display
- Material Design Components - UI components
- Fragment - Form display


