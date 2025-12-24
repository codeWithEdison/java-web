-- Add image_url column to products table
ALTER TABLE products 
ADD COLUMN image_url VARCHAR(500) DEFAULT NULL 
AFTER description;

-- Update some existing products with sample image URLs (optional)
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' WHERE name = 'Laptop';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' WHERE name = 'Smartphone';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' WHERE name = 'Headphones';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' WHERE name = 'T-Shirt';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' WHERE name = 'Jeans';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' WHERE name = 'Sneakers';

SELECT 'Image column added successfully!' as message;

