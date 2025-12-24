import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'assignment4_db'
};

async function initializeDatabase() {
  let connection;
  
  try {
    // First, connect without database to create it
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    console.log('Connected to MySQL server');
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✓ Database '${dbConfig.database}' created/verified`);
    
    await connection.end();
    
    // Now connect to the specific database
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database
    });

    console.log(`Connected to database '${dbConfig.database}'`);

    // Create Categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Categories table created');

    // Create Products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        category_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Products table created');

    // Seed database
    await seedDatabase(connection);
    
    await connection.end();
    console.log('\n✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error('Error initializing database:', err.message);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

async function seedDatabase(connection: mysql.Connection) {
  try {
    // Check if data already exists
    const [rows]: any = await connection.query('SELECT COUNT(*) as count FROM categories');
    const count = rows[0].count;

    if (count > 0) {
      console.log('\n⚠ Database already contains data.');
      console.log('To reseed, drop the tables or database first, then run this script again.');
      return;
    }

    console.log('\nSeeding database with initial data...');
    
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Apparel and fashion items' },
      { name: 'Books', description: 'Books and literature' },
      { name: 'Food', description: 'Food and beverages' },
      { name: 'Toys', description: 'Toys and games' }
    ];

    for (const cat of categories) {
      const [result]: any = await connection.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [cat.name, cat.description]
      );
      const categoryId = result.insertId;
      console.log(`✓ Category "${cat.name}" created (ID: ${categoryId})`);
      
      // Add products for this category
      const products = getProductsForCategory(cat.name, categoryId);
      for (const product of products) {
        await connection.query(
          'INSERT INTO products (name, price, description, image_url, category_id) VALUES (?, ?, ?, ?, ?)',
          [product.name, product.price, product.description, product.image_url || null, categoryId]
        );
      }
      console.log(`  ✓ ${products.length} products added to "${cat.name}"`);
    }
    
    console.log('\n✅ Database seeded successfully!');
    console.log(`   - ${categories.length} categories created`);
    console.log(`   - ${getTotalProductsCount()} products created`);
  } catch (err: any) {
    console.error('Error seeding database:', err.message);
    throw err;
  }
}

function getProductsForCategory(categoryName: string, categoryId: number): Array<{name: string, price: number, description: string, image_url?: string}> {
  const productsByCategory: Record<string, Array<{name: string, price: number, description: string, image_url?: string}>> = {
    'Electronics': [
      { name: 'Laptop', price: 999.99, description: 'High-performance laptop', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
      { name: 'Smartphone', price: 699.99, description: 'Latest smartphone model', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
      { name: 'Headphones', price: 149.99, description: 'Wireless noise-cancelling headphones', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }
    ],
    'Clothing': [
      { name: 'T-Shirt', price: 19.99, description: 'Cotton t-shirt', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
      { name: 'Jeans', price: 49.99, description: 'Classic blue jeans', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
      { name: 'Sneakers', price: 79.99, description: 'Comfortable running shoes', image_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' }
    ],
    'Books': [
      { name: 'Programming Guide', price: 29.99, description: 'Complete programming reference', image_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400' },
      { name: 'Novel', price: 14.99, description: 'Bestselling fiction novel', image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
      { name: 'Cookbook', price: 24.99, description: 'Recipes from around the world', image_url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400' }
    ],
    'Food': [
      { name: 'Pizza', price: 12.99, description: 'Large pepperoni pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
      { name: 'Burger', price: 8.99, description: 'Classic cheeseburger', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
      { name: 'Salad', price: 6.99, description: 'Fresh garden salad', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' }
    ],
    'Toys': [
      { name: 'Action Figure', price: 15.99, description: 'Collectible action figure', image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400' },
      { name: 'Board Game', price: 34.99, description: 'Family board game', image_url: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400' },
      { name: 'Puzzle', price: 9.99, description: '1000-piece jigsaw puzzle', image_url: 'https://images.unsplash.com/photo-1593652340828-7e12f1e5f4ae?w=400' }
    ]
  };

  return productsByCategory[categoryName] || [];
}

function getTotalProductsCount(): number {
  return 15; // 3 products per category × 5 categories
}

// Run initialization
initializeDatabase();
