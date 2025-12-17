import { Request, Response } from 'express';
import db from '../config/database';
import { Product, ProductWithCategory, Category, ApiResponse } from '../types';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        p.*,
        c.id as category_id,
        c.name as category_name,
        c.description as category_description,
        c.created_at as category_created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
    
    const [rows]: any = await db.query(query);
    
    const products: ProductWithCategory[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      description: row.description,
      category_id: row.category_id,
      created_at: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        created_at: row.category_created_at
      } : undefined
    }));
    
    const response: ApiResponse<ProductWithCategory[]> = {
      success: true,
      data: products
    };
    res.json(response);
  } catch (err: any) {
    const response: ApiResponse = {
      success: false,
      message: err.message
    };
    res.status(500).json(response);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    const query = `
      SELECT 
        p.*,
        c.id as category_id,
        c.name as category_name,
        c.description as category_description,
        c.created_at as category_created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    
    const [rows]: any = await db.query(query, [id]);
    
    if (rows.length === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    
    const row = rows[0];
    const product: ProductWithCategory = {
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      description: row.description,
      category_id: row.category_id,
      created_at: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        created_at: row.category_created_at
      } : undefined
    };
    
    const response: ApiResponse<ProductWithCategory> = {
      success: true,
      data: product
    };
    res.json(response);
  } catch (err: any) {
    const response: ApiResponse = {
      success: false,
      message: err.message
    };
    res.status(500).json(response);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category_id } = req.body;
    
    if (!name || price === undefined || !category_id) {
      const response: ApiResponse = {
        success: false,
        message: 'Name, price, and category_id are required'
      };
      return res.status(400).json(response);
    }
    
    if (isNaN(price) || price < 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Price must be a valid positive number'
      };
      return res.status(400).json(response);
    }
    
    // Verify category exists
    const [categoryRows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [category_id]);
    
    if (categoryRows.length === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Category not found'
      };
      return res.status(404).json(response);
    }
    
    const [result]: any = await db.query(
      'INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)',
      [name, price, description || null, category_id]
    );
    
    const query = `
      SELECT 
        p.*,
        c.id as category_id,
        c.name as category_name,
        c.description as category_description,
        c.created_at as category_created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    
    const [rows]: any = await db.query(query, [result.insertId]);
    const row = rows[0];
    
    const product: ProductWithCategory = {
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      description: row.description,
      category_id: row.category_id,
      created_at: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        created_at: row.category_created_at
      } : undefined
    };
    
    const response: ApiResponse<ProductWithCategory> = {
      success: true,
      data: product,
      message: 'Product created successfully'
    };
    res.status(201).json(response);
  } catch (err: any) {
    const response: ApiResponse = {
      success: false,
      message: err.message
    };
    res.status(500).json(response);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, description, category_id } = req.body;
    
    if (!name || price === undefined || !category_id) {
      const response: ApiResponse = {
        success: false,
        message: 'Name, price, and category_id are required'
      };
      return res.status(400).json(response);
    }
    
    if (isNaN(price) || price < 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Price must be a valid positive number'
      };
      return res.status(400).json(response);
    }
    
    // Verify category exists
    const [categoryRows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [category_id]);
    
    if (categoryRows.length === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Category not found'
      };
      return res.status(404).json(response);
    }
    
    const [result]: any = await db.query(
      'UPDATE products SET name = ?, price = ?, description = ?, category_id = ? WHERE id = ?',
      [name, price, description || null, category_id, id]
    );
    
    if (result.affectedRows === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    
    const query = `
      SELECT 
        p.*,
        c.id as category_id,
        c.name as category_name,
        c.description as category_description,
        c.created_at as category_created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    
    const [rows]: any = await db.query(query, [id]);
    const row = rows[0];
    
    const product: ProductWithCategory = {
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      description: row.description,
      category_id: row.category_id,
      created_at: row.created_at,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        created_at: row.category_created_at
      } : undefined
    };
    
    const response: ApiResponse<ProductWithCategory> = {
      success: true,
      data: product,
      message: 'Product updated successfully'
    };
    res.json(response);
  } catch (err: any) {
    const response: ApiResponse = {
      success: false,
      message: err.message
    };
    res.status(500).json(response);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    const [result]: any = await db.query('DELETE FROM products WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'Product deleted successfully'
    };
    res.json(response);
  } catch (err: any) {
    const response: ApiResponse = {
      success: false,
      message: err.message
    };
    res.status(500).json(response);
  }
};
