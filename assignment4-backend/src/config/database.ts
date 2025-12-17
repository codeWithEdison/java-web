import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "assignment4_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
    initializeTables();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err.message);
    console.error(
      "Please ensure MySQL is running and database credentials are correct"
    );
  });

async function initializeTables() {
  try {
    // Create database if it doesn't exist
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
    const tempPool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    });
    await tempPool.query(createDbQuery);
    await tempPool.end();
    console.log(`✓ Database '${dbConfig.database}' ready`);

    // Create Categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✓ Categories table ready");

    // Create Products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        category_id INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log("✓ Products table ready");

    // Seed database if empty
    await seedDatabase();
  } catch (err: any) {
    console.error("Error initializing tables:", err.message);
  }
}

async function seedDatabase() {
  try {
    // Check if data already exists
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) as count FROM categories"
    );
    const count = rows[0].count;

    if (count === 0) {
      console.log("Seeding database with initial data...");

      const categories = [
        { name: "Electronics", description: "Electronic devices and gadgets" },
        { name: "Clothing", description: "Apparel and fashion items" },
        { name: "Books", description: "Books and literature" },
        { name: "Food", description: "Food and beverages" },
        { name: "Toys", description: "Toys and games" },
      ];

      for (const cat of categories) {
        const [result]: any = await pool.query(
          "INSERT INTO categories (name, description) VALUES (?, ?)",
          [cat.name, cat.description]
        );
        const categoryId = result.insertId;
        console.log(`✓ Category "${cat.name}" created (ID: ${categoryId})`);

        // Add products for this category
        const products = getProductsForCategory(cat.name, categoryId);
        for (const product of products) {
          await pool.query(
            "INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)",
            [product.name, product.price, product.description, categoryId]
          );
        }
        console.log(`  ✓ ${products.length} products added to "${cat.name}"`);
      }

      console.log("✅ Database seeded successfully");
    } else {
      console.log("Database already contains data. Skipping seed.");
    }
  } catch (err: any) {
    console.error("Error seeding database:", err.message);
  }
}

function getProductsForCategory(
  categoryName: string,
  categoryId: number
): Array<{ name: string; price: number; description: string }> {
  const productsByCategory: Record<
    string,
    Array<{ name: string; price: number; description: string }>
  > = {
    Electronics: [
      { name: "Laptop", price: 999.99, description: "High-performance laptop" },
      {
        name: "Smartphone",
        price: 699.99,
        description: "Latest smartphone model",
      },
      {
        name: "Headphones",
        price: 149.99,
        description: "Wireless noise-cancelling headphones",
      },
    ],
    Clothing: [
      { name: "T-Shirt", price: 19.99, description: "Cotton t-shirt" },
      { name: "Jeans", price: 49.99, description: "Classic blue jeans" },
      {
        name: "Sneakers",
        price: 79.99,
        description: "Comfortable running shoes",
      },
    ],
    Books: [
      {
        name: "Programming Guide",
        price: 29.99,
        description: "Complete programming reference",
      },
      { name: "Novel", price: 14.99, description: "Bestselling fiction novel" },
      {
        name: "Cookbook",
        price: 24.99,
        description: "Recipes from around the world",
      },
    ],
    Food: [
      { name: "Pizza", price: 12.99, description: "Large pepperoni pizza" },
      { name: "Burger", price: 8.99, description: "Classic cheeseburger" },
      { name: "Salad", price: 6.99, description: "Fresh garden salad" },
    ],
    Toys: [
      {
        name: "Action Figure",
        price: 15.99,
        description: "Collectible action figure",
      },
      { name: "Board Game", price: 34.99, description: "Family board game" },
      { name: "Puzzle", price: 9.99, description: "1000-piece jigsaw puzzle" },
    ],
  };

  return productsByCategory[categoryName] || [];
}

export default pool;
