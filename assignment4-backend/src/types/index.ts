export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category_id: number;
  created_at?: string;
}

export interface ProductWithCategory extends Product {
  category?: Category;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

