# Assignment 4 - Full Stack Application

A complete full-stack application with Node.js backend, React frontend, and Android app, all communicating via localhost/tethering.

## Project Structure

```
.
├── assignment4-backend/     # Node.js + Express + TypeScript API
├── assignment4-frontend/    # React + TypeScript + Tailwind Web App
└── assignment4-android/     # Android App with Volley
```

## Quick Start

### 1. Backend Setup

```bash
cd assignment4-backend
npm install
npm run dev
```

Server runs on `http://localhost:3000` (bound to `0.0.0.0` for network access)

### 2. Frontend Setup

```bash
cd assignment4-frontend
npm install
npm run dev
```

Web app runs on `http://localhost:5173`

### 3. Android Setup

1. Open `assignment4-android` in Android Studio
2. Update `NetworkConfig.java` with your computer's IP:
   - Emulator: `http://10.0.2.2:3000/api`
   - Physical device: `http://YOUR_COMPUTER_IP:3000/api`
3. Build and run on device/emulator

## Network Configuration

### Finding Your Computer's IP

- **Windows**: `ipconfig` → Look for IPv4 Address
- **Mac/Linux**: `ifconfig` or `ip addr show`

### Android Connection

- **Emulator**: Use `10.0.2.2` (maps to host localhost)
- **Physical Device**: 
  1. Connect via USB tethering or same Wi-Fi
  2. Use your computer's IP address
  3. Ensure backend is bound to `0.0.0.0`

## Features

### Backend
- ✅ RESTful API with CRUD operations
- ✅ SQLite database with relationships
- ✅ Automatic database initialization
- ✅ Sample data seeding
- ✅ CORS enabled
- ✅ JSON responses

### Frontend
- ✅ Modern responsive UI
- ✅ Category management
- ✅ Product management
- ✅ Real-time updates
- ✅ Error handling
- ✅ Loading states

### Android
- ✅ Product list display
- ✅ Create products via form
- ✅ View product details
- ✅ Volley networking
- ✅ RecyclerView with Material Design

## API Endpoints

### Categories
- `GET /api/categories` - List all
- `GET /api/categories/:id` - Get one
- `POST /api/categories` - Create
- `PUT /api/categories/:id` - Update
- `DELETE /api/categories/:id` - Delete

### Products
- `GET /api/products` - List all (with categories)
- `GET /api/products/:id` - Get one (with category)
- `POST /api/products` - Create
- `PUT /api/products/:id` - Update
- `DELETE /api/products/:id` - Delete

## Testing

1. **Backend**: Test with Postman or curl
2. **Frontend**: Open browser and test all operations
3. **Android**: Install APK and test network connectivity
4. **Integration**: Create product in Android, verify in web app

## Troubleshooting

### Connection Issues
- Ensure backend is running and bound to `0.0.0.0`
- Check firewall allows port 3000
- Verify IP address is correct in Android app
- For emulator, use `10.0.2.2` instead of localhost

### CORS Errors
- Backend has CORS enabled for all origins
- If issues persist, check browser console

### Database Issues
- Database is created automatically
- Delete `database.sqlite` to reset with fresh seed data

## Development Order

1. Start backend server
2. Test API with Postman
3. Start frontend and verify web app
4. Build Android app and test connectivity
5. Test end-to-end flow

## License

This is an academic assignment project.

