# Assignment 4 - Backend API

Node.js + Express + TypeScript backend with SQLite database.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd assignment4-backend
   npm install
   ```

2. **Create .env file** (optional, defaults are set)
   ```
   PORT=3000
   NODE_ENV=development
   DB_PATH=./database.sqlite
   ```

3. **Run the Server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` and bind to `0.0.0.0` to allow external connections.

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products
- `GET /api/products` - Get all products with category info
- `GET /api/products/:id` - Get product by ID with category
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Response Format

All responses follow this format:
```json
{
  "success": true,
  "data": [...],
  "message": "Optional message"
}
```

## Database

- SQLite database is automatically created on first run
- Tables are initialized automatically
- Sample data is seeded on first run (5 categories, 15 products)

## Network Configuration

The server binds to `0.0.0.0` to allow connections from:
- Localhost: `http://localhost:3000`
- Network IP: `http://YOUR_IP:3000`
- Android Emulator: `http://10.0.2.2:3000`

## CORS

CORS is enabled for all origins (for development purposes).


