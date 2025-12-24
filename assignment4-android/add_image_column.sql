-- Add image_url column to products table
USE assignment4_db;

-- Add the column
ALTER TABLE products 
ADD COLUMN image_url VARCHAR(500) DEFAULT NULL 
AFTER description;

-- Show the updated table structure
DESCRIBE products;

-- Show success message
SELECT 'Image column added successfully!' AS message;

