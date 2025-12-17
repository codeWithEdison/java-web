# Database Commands - MySQL

## Quick Commands

### Create Database and Seed with Sample Data

```bash
npm run seed
```

or

```bash
npm run db:init
```

### Reset Database (Drop Tables and Recreate)

```bash
npm run db:reset
```

**Warning**: This will delete all existing data!

## Prerequisites

1. **MySQL Server must be running**
2. **Configure `.env` file** with MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=assignment4_db
   ```

## Manual Commands

### Using ts-node directly:

```bash
npx ts-node src/scripts/seedDatabase.ts
```

### Using Node after building:

```bash
npm run build
node dist/scripts/seedDatabase.js
```

## What the Seed Script Does

1. **Connects to MySQL Server**
2. **Creates Database**: `assignment4_db` (or name from DB_NAME in .env)
3. **Creates Tables**:
   - `categories` table with columns: id, name, description, created_at
   - `products` table with columns: id, name, price, description, category_id, created_at
4. **Seeds Sample Data**:
   - 5 Categories: Electronics, Clothing, Books, Food, Toys
   - 15 Products (3 per category)

## Database Configuration

Default values (if `.env` not provided):

- `DB_HOST=localhost`
- `DB_USER=root`
- `DB_PASSWORD=` (empty)
- `DB_NAME=assignment4_db`

To change, update `.env` file in the backend root directory.

## Notes

- The script will **not** overwrite existing data
- If data exists, it will show a warning and exit
- To reseed, use `npm run db:reset` first
- The database is also automatically created when you start the server (`npm run dev`)

## Verification

After seeding, verify the data:

```bash
# Start the server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/products
```

Or open in browser:

- http://localhost:3000/api/categories
- http://localhost:3000/api/products

## Troubleshooting

### Connection Error

- Ensure MySQL server is running
- Check credentials in `.env` file
- Verify MySQL is listening on port 3306

### Access Denied

- Verify MySQL user and password
- Check user permissions:
  ```sql
  GRANT ALL PRIVILEGES ON assignment4_db.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

See `MYSQL_SETUP.md` for detailed setup instructions.
