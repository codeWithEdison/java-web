# Quick Start - MySQL Database Setup

## Prerequisites

1. **Install MySQL** (if not already installed)
2. **Start MySQL Server**
3. **Configure `.env` file** (see MYSQL_SETUP.md for details)

## Create Database and Seed with Sample Data

### Simple Command:
```bash
npm run seed
```

or

```bash
npm run db:init
```

## Reset Database (Drop and Recreate)

```bash
npm run db:reset
```

**Warning**: This will delete all existing data!

## What Gets Created

### Database:
- **assignment4_db** (or name from DB_NAME in .env)

### Tables:
- **categories** - id, name, description, created_at
- **products** - id, name, price, description, category_id, created_at

### Sample Data:
- **5 Categories**: Electronics, Clothing, Books, Food, Toys
- **15 Products**: 3 products per category

## Verify It Worked

After running the seed command, start the server and test:

```bash
# Start server
npm run dev

# In another terminal or browser:
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/products
```

Or visit in browser:
- http://localhost:3000/api/categories
- http://localhost:3000/api/products

## Configuration

Create `.env` file in `assignment4-backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=assignment4_db
```

## Notes

- Script won't overwrite existing data (will skip if data exists)
- To reseed, use `npm run db:reset` first
- Database is also auto-created when you start the server
- See `MYSQL_SETUP.md` for detailed setup instructions

