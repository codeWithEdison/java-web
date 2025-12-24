# MySQL Setup Guide

## Prerequisites

1. **Install MySQL**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL
   - Or use Docker: `docker run --name mysql-assignment4 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0`

2. **Start MySQL Server**
   - Windows: Start MySQL service from Services
   - Mac/Linux: `sudo service mysql start` or `brew services start mysql`
   - XAMPP: Start MySQL from XAMPP Control Panel

## Configuration

### 1. Create `.env` file in `assignment4-backend/` directory:

```env
PORT=3000
NODE_ENV=development

# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=assignment4_db
```

**Default values** (if `.env` not provided):
- `DB_HOST=localhost`
- `DB_USER=root`
- `DB_PASSWORD=` (empty)
- `DB_NAME=assignment4_db`

### 2. Install Dependencies

```bash
cd assignment4-backend
npm install
```

This will install `mysql2` package.

## Database Commands

### Create Database and Seed with Sample Data

```bash
npm run seed
```

or

```bash
npm run db:init
```

### Reset Database (Drop and Recreate)

```bash
npm run db:reset
```

**Note**: This will delete all existing data!

## Manual MySQL Setup (Optional)

If you prefer to set up MySQL manually:

```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE assignment4_db;

-- Use the database
USE assignment4_db;

-- The tables will be created automatically when you run the seed script or start the server
```

## Verify Setup

1. **Test Connection:**
   ```bash
   npm run seed
   ```
   Should output:
   ```
   Connected to MySQL server
   ✓ Database 'assignment4_db' created/verified
   Connected to database 'assignment4_db'
   ✓ Categories table created
   ✓ Products table created
   ...
   ✅ Database seeded successfully!
   ```

2. **Start Server:**
   ```bash
   npm run dev
   ```

3. **Test API:**
   ```bash
   curl http://localhost:3000/api/categories
   curl http://localhost:3000/api/products
   ```

## Troubleshooting

### Connection Refused
- Ensure MySQL server is running
- Check `DB_HOST` and port (default 3306)
- Verify MySQL is listening: `netstat -an | grep 3306`

### Access Denied
- Check `DB_USER` and `DB_PASSWORD` in `.env`
- Verify MySQL user has permissions:
  ```sql
  GRANT ALL PRIVILEGES ON assignment4_db.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

### Database Already Exists
- The script will use existing database
- To start fresh: `npm run db:reset`

### Foreign Key Constraints
- MySQL requires InnoDB engine for foreign keys
- Tables are created with proper foreign key constraints
- Products will be deleted if category is deleted (CASCADE)

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

## Sample Data

The seed script creates:
- **5 Categories**: Electronics, Clothing, Books, Food, Toys
- **15 Products**: 3 products per category

## Migration from SQLite

If you were using SQLite before:
1. Delete `database.sqlite` file
2. Install MySQL and configure `.env`
3. Run `npm run seed` to create MySQL database
4. All data will be fresh (seed data)


