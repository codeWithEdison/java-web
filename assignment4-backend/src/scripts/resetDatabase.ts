import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'assignment4_db'
};

async function resetDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database
    });

    console.log('Connected to MySQL database');
    console.log('Dropping existing tables...');
    
    // Drop tables in correct order (products first due to foreign key)
    await connection.query('DROP TABLE IF EXISTS products');
    console.log('✓ Products table dropped');
    
    await connection.query('DROP TABLE IF EXISTS categories');
    console.log('✓ Categories table dropped');
    
    await connection.end();
    console.log('\n✓ Existing database cleared\n');
    
    // Now run the seed script
    console.log('Creating new database...\n');
    require('./seedDatabase');
    
  } catch (err: any) {
    console.error('Error resetting database:', err.message);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

resetDatabase();
