import axios from 'axios';
import { Category, Product, ProductWithCategory, ApiResponse, CategoryFormData, ProductFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories API
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    if (!response.data.data) {
      throw new Error('Category not found');
    }
    return response.data.data;
  },

  create: async (data: CategoryFormData): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', data);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to create category');
    }
    return response.data.data;
  },

  update: async (id: number, data: CategoryFormData): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, data);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to update category');
    }
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse>(`/categories/${id}`);
  },
};

// Products API
export const productApi = {
  getAll: async (): Promise<ProductWithCategory[]> => {
    const response = await api.get<ApiResponse<ProductWithCategory[]>>('/products');
    return response.data.data || [];
  },

  getById: async (id: number): Promise<ProductWithCategory> => {
    const response = await api.get<ApiResponse<ProductWithCategory>>(`/products/${id}`);
    if (!response.data.data) {
      throw new Error('Product not found');
    }
    return response.data.data;
  },

  create: async (data: Omit<ProductFormData, 'price'> & { price: number }): Promise<ProductWithCategory> => {
    const response = await api.post<ApiResponse<ProductWithCategory>>('/products', data);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to create product');
    }
    return response.data.data;
  },

  update: async (id: number, data: Omit<ProductFormData, 'price'> & { price: number }): Promise<ProductWithCategory> => {
    const response = await api.put<ApiResponse<ProductWithCategory>>(`/products/${id}`, data);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to update product');
    }
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<ApiResponse>(`/products/${id}`);
  },
};

export default api;


