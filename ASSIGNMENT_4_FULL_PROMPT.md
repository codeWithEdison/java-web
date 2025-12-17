# Assignment 4 - Full Development Prompt

## Project Overview

Create a full-stack application with React + TypeScript + Tailwind frontend, Node.js + Express + TypeScript backend, and an Android app that communicates with the backend using Volley. All communication happens via localhost/tethering.

---

## PART 1: BACKEND SETUP (Node.js + Express + TypeScript)

### 1.1 Initialize Backend Project

```
Create a new directory: assignment4-backend
Initialize npm project
Install dependencies:
- express
- typescript
- @types/express
- @types/node
- ts-node
- nodemon
- sqlite3 (or mysql2/pg for PostgreSQL)
- cors
- dotenv
```

### 1.2 Project Structure

```
assignment4-backend/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   ├── Category.ts
│   │   └── Product.ts
│   ├── routes/
│   │   ├── categories.ts
│   │   └── products.ts
│   ├── controllers/
│   │   ├── categoryController.ts
│   │   └── productController.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── .env
```

### 1.3 Database Schema

Create SQLite database with 2 linked tables:

**Categories Table:**

```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Products Table:**

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 1.4 Backend Requirements

**Database Configuration:**

- Setup SQLite database connection
- Initialize tables if they don't exist
- Handle database errors gracefully

**API Endpoints - Categories:**

- `GET /api/categories` - Get all categories (return JSON array)
- `GET /api/categories/:id` - Get category by ID (return JSON object)
- `POST /api/categories` - Create new category (accept JSON body)
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

**API Endpoints - Products:**

- `GET /api/products` - Get all products with category info (return JSON array)
- `GET /api/products/:id` - Get product by ID with category (return JSON object)
- `POST /api/products` - Create new product (accept JSON body with category_id)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Server Configuration:**

- Run on port 3000 (or from .env)
- Enable CORS for all origins (for local development)
- Bind to 0.0.0.0 to allow external connections
- Parse JSON request bodies
- Return consistent JSON responses: `{ success: boolean, data?: any, message?: string }`

**TypeScript Types:**

```typescript
interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category_id: number;
  created_at?: string;
}

interface ProductWithCategory extends Product {
  category?: Category;
}
```

### 1.5 Sample Data

Seed database with initial data:

- 3-5 categories (e.g., Electronics, Clothing, Books, Food, Toys)
- 10-15 products linked to categories

---

## PART 2: FRONTEND SETUP (React + TypeScript + Tailwind)

### 2.1 Initialize Frontend Project

```
Create new directory: assignment4-frontend
Use Vite or Create React App with TypeScript template
Install dependencies:
- react
- react-dom
- react-router-dom
- axios or fetch API
- tailwindcss
- @types/react
- @types/react-dom
```

### 2.2 Project Structure

```
assignment4-frontend/
├── src/
│   ├── components/
│   │   ├── CategoryList.tsx
│   │   ├── CategoryForm.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── CategoriesPage.tsx
│   │   ├── ProductsPage.tsx
│   │   └── HomePage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

### 2.3 Frontend Requirements

**API Service:**

- Create centralized API service using axios or fetch
- Base URL: `http://localhost:3000/api` (configurable)
- Functions for all CRUD operations (categories and products)
- Error handling for network failures

**Pages:**

1. **HomePage**: Welcome page with navigation links
2. **CategoriesPage**:
   - List all categories in a table/card grid
   - Form to create new category
   - Edit/Delete buttons for each category
   - Real-time updates after operations
3. **ProductsPage**:
   - List all products with category names
   - Form to create new product (with category dropdown)
   - Edit/Delete buttons for each product
   - Real-time updates after operations

**Styling:**

- Use Tailwind CSS for all styling
- Modern, clean, responsive design
- Mobile-friendly layout
- Use Tailwind components: buttons, forms, cards, tables
- Color scheme: Professional (e.g., blue/gray palette)

**TypeScript Types:**

- Match backend types exactly
- Define form input types
- Define API response types

**State Management:**

- Use React hooks (useState, useEffect)
- Fetch data on component mount
- Refresh list after create/update/delete operations
- Loading states during API calls
- Error messages for failed operations

---

## PART 3: ANDROID APP SETUP (Java/Kotlin + Volley)

### 3.1 Initialize Android Project

```
Create new Android Studio project
Minimum SDK: API 21 (Android 5.0)
Target SDK: Latest stable
Language: Java or Kotlin
```

### 3.2 Project Structure

```
app/
├── java/com/yourapp/
│   ├── MainActivity.java
│   ├── NetworkActivity.java
│   ├── adapters/
│   │   └── ProductAdapter.java
│   ├── fragments/
│   │   └── ProductFormFragment.java
│   ├── models/
│   │   ├── Category.java
│   │   └── Product.java
│   └── utils/
│       └── VolleySingleton.java
├── res/
│   ├── layout/
│   │   ├── activity_main.xml
│   │   ├── activity_network.xml
│   │   ├── fragment_product_form.xml
│   │   └── item_product.xml
│   └── values/
│       └── strings.xml
└── AndroidManifest.xml
```

### 3.3 Android Requirements

**Dependencies (build.gradle):**

```gradle
dependencies {
    implementation 'com.android.volley:volley:1.2.1'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.fragment:fragment:1.6.2'
    // ... other dependencies
}
```

**Permissions (AndroidManifest.xml):**

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

**Models:**

- `Category.java` - id, name, description, created_at
- `Product.java` - id, name, price, description, category_id, created_at

**MainActivity:**

- Simple layout with a button to open NetworkActivity
- Intent to launch NetworkActivity from anywhere in the app

**NetworkActivity:**

- Layout with:
  - RecyclerView (fill_parent/constraint layout)
  - Button to show/hide form fragment
- Fragment container for ProductFormFragment
- Volley GET request on activity start:
  - URL: `http://YOUR_COMPUTER_IP:3000/api/products`
  - Use JsonArrayRequest or JsonObjectRequest
  - Parse JSON response
  - Populate RecyclerView adapter
- RecyclerView item click:
  - Show product details (dialog or new activity)
  - Optional: Make GET request for single product

**ProductFormFragment:**

- Form fields:
  - Product name (EditText)
  - Price (EditText - number)
  - Description (EditText - multiline)
  - Category dropdown (Spinner - populated from GET /api/categories)
  - Submit button
- Volley POST request:
  - URL: `http://YOUR_COMPUTER_IP:3000/api/products`
  - Request body: JSON object with product data
  - Headers: Content-Type: application/json
  - On success:
    - Clear form
    - Show success message (Toast/Snackbar)
    - Trigger refresh: Make GET request again to update RecyclerView
    - Update RecyclerView adapter with new data
- Form validation:
  - Check required fields
  - Validate price is numeric

**VolleySingleton:**

- Singleton pattern for RequestQueue
- Single instance for entire app
- Initialize in Application class or static method

**ProductAdapter:**

- RecyclerView adapter for Product items
- Display: name, price, category name, description
- Use CardView or Material Design components
- Click listener for item selection

**Network Configuration:**

- Create config file with base URL
- Use computer's IP address (not localhost)
- For emulator: use `10.0.2.2:3000`
- For physical device: use `192.168.x.x:3000` (your computer's IP)
- Make it easy to switch between environments

**Error Handling:**

- Network error handling in Volley error callbacks
- Show user-friendly error messages
- Handle JSON parsing errors
- Handle server errors (404, 500, etc.)

---

## PART 4: INTEGRATION & TESTING

### 4.1 Backend Testing

1. Start backend server: `npm run dev`
2. Test all endpoints with Postman or curl:
   - GET /api/categories
   - POST /api/categories
   - GET /api/products
   - POST /api/products
   - GET /api/products/:id
3. Verify JSON responses are correct
4. Verify database operations work
5. Test CORS is enabled

### 4.2 Frontend Testing

1. Start frontend: `npm run dev`
2. Test all CRUD operations in browser
3. Verify data syncs with backend
4. Test responsive design
5. Verify error handling

### 4.3 Network Setup (Tethering)

1. **Find Computer IP:**

   - Windows: `ipconfig` → IPv4 Address
   - Mac/Linux: `ifconfig` or `ip addr show`
   - Example: `192.168.43.1` or `192.168.1.100`

2. **Connect Android Device:**

   - Option A: USB Tethering
     - Enable USB debugging
     - Enable USB tethering on phone
     - Computer shares internet via USB
   - Option B: Wi-Fi Hotspot
     - Enable mobile hotspot on phone
     - Connect computer to phone's hotspot
     - Find phone's IP, use it in backend (reverse connection)
   - Option C: Same Wi-Fi Network
     - Both on same Wi-Fi
     - Use computer's Wi-Fi IP

3. **Update Android App:**

   - Change base URL to: `http://YOUR_COMPUTER_IP:3000/api`
   - Rebuild and install APK

4. **Test Connection:**
   - Open browser on phone: `http://YOUR_COMPUTER_IP:3000/api/products`
   - Should see JSON response
   - If not, check firewall (allow port 3000)

### 4.4 End-to-End Testing

1. **Backend Running:** Server on port 3000, bound to 0.0.0.0
2. **Frontend Running:** Accessible in browser
3. **Android App Installed:** On device or emulator
4. **Network Connected:** Device can reach computer IP
5. **Test Flow:**
   - Open Android app
   - Click button to open NetworkActivity
   - Verify GET request loads products in RecyclerView
   - Open form fragment
   - Fill form and submit
   - Verify POST request succeeds
   - Verify RecyclerView updates with new product
   - Verify new product appears in web app (browser)
   - Test viewing product details
   - Test editing/deleting (if implemented)

---

## PART 5: APK GENERATION

### 5.1 Build Configuration

1. **Update build.gradle (app):**

```gradle
android {
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release // if signing configured
        }
    }
}
```

2. **Create Signing Config (Optional but Recommended):**
   - Generate keystore:
     ```
     keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
     ```
   - Add to build.gradle:
   ```gradle
   signingConfigs {
       release {
           storeFile file('my-release-key.jks')
           storePassword 'your-password'
           keyAlias 'my-key-alias'
           keyPassword 'your-password'
       }
   }
   ```

### 5.2 Generate APK

**Method 1: Android Studio GUI**

1. Build → Generate Signed Bundle / APK
2. Choose APK
3. Select release build variant
4. Select signing config (or create debug keystore)
5. Build → Build Bundle(s) / APK(s)
6. Locate APK: `app/build/outputs/apk/release/app-release.apk`

**Method 2: Command Line**

```bash
cd android-project-directory
./gradlew assembleRelease
# APK location: app/build/outputs/apk/release/app-release.apk
```

**Method 3: App Bundle (AAB)**

```bash
./gradlew bundleRelease
# Bundle location: app/build/outputs/bundle/release/app-release.aab
```

### 5.3 Final Checks

1. Test APK installation on device
2. Verify all features work in release build
3. Test network requests (update IP if needed)
4. Verify no debug code/logs in production
5. APK size optimization (if needed)

---

## PART 6: DELIVERABLES CHECKLIST

### Backend

- [ ] Express + TypeScript server running
- [ ] SQLite database with 2 linked tables
- [ ] All CRUD endpoints working
- [ ] JSON responses for all endpoints
- [ ] CORS enabled
- [ ] Server accessible on network IP

### Frontend

- [ ] React + TypeScript + Tailwind app
- [ ] All CRUD operations working
- [ ] Data syncs with backend
- [ ] Modern, responsive UI
- [ ] Error handling implemented

### Android App

- [ ] NetworkActivity created and accessible
- [ ] RecyclerView displaying product list
- [ ] ProductFormFragment with form
- [ ] Volley GET request for list
- [ ] Volley POST request for create
- [ ] RecyclerView updates after POST
- [ ] Data syncs with web app
- [ ] Error handling for network failures

### Integration

- [ ] Communication via tethering works
- [ ] Real-time sync between Android and web app
- [ ] All operations tested end-to-end

### APK

- [ ] Release APK generated
- [ ] APK installs and runs on device
- [ ] All features work in release build
- [ ] APK file ready for submission

---

## TECHNICAL NOTES

### IP Address Discovery

- **Windows:** `ipconfig | findstr IPv4`
- **Mac/Linux:** `ifconfig | grep inet` or `hostname -I`
- **Android Emulator:** Use `10.0.2.2` instead of `localhost`

### Common Issues & Solutions

1. **Connection Refused:** Check firewall, ensure server binds to 0.0.0.0
2. **CORS Errors:** Enable CORS middleware in Express
3. **Volley Timeout:** Increase timeout in Volley request
4. **JSON Parse Error:** Verify API returns valid JSON
5. **Database Locked:** Ensure proper connection handling

### Security Notes (For Assignment Only)

- This is for localhost/tethering only
- CORS allows all origins (OK for assignment)
- No authentication required (OK for assignment)
- For production, add authentication, HTTPS, input validation, etc.

---

## DEVELOPMENT ORDER RECOMMENDATION

1. **Backend First:** Get API working with Postman
2. **Frontend Second:** Verify API works with React app
3. **Android Third:** Implement Volley requests
4. **Integration Fourth:** Test tethering and real-time sync
5. **APK Last:** Generate and test final APK

This ensures each component is tested before moving to the next.
