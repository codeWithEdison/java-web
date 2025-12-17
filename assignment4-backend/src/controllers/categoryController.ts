import { Request, Response } from 'express';
import db from '../config/database';
import { Category, ApiResponse } from '../types';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM categories ORDER BY created_at DESC');
    const response: ApiResponse<Category[]> = {
      success: true,
      data: rows as Category[]
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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const [rows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Category not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse<Category> = {
      success: true,
      data: rows[0] as Category
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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      const response: ApiResponse = {
        success: false,
        message: 'Name is required'
      };
      return res.status(400).json(response);
    }
    
    const [result]: any = await db.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    
    const [rows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    
    const response: ApiResponse<Category> = {
      success: true,
      data: rows[0] as Category,
      message: 'Category created successfully'
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    
    if (!name) {
      const response: ApiResponse = {
        success: false,
        message: 'Name is required'
      };
      return res.status(400).json(response);
    }
    
    const [result]: any = await db.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description || null, id]
    );
    
    if (result.affectedRows === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Category not found'
      };
      return res.status(404).json(response);
    }
    
    const [rows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    
    const response: ApiResponse<Category> = {
      success: true,
      data: rows[0] as Category,
      message: 'Category updated successfully'
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    // Check if category has products
    const [productRows]: any = await db.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    
    if (productRows[0].count > 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Cannot delete category with existing products'
      };
      return res.status(400).json(response);
    }
    
    const [result]: any = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      const response: ApiResponse = {
        success: false,
        message: 'Category not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'Category deleted successfully'
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

