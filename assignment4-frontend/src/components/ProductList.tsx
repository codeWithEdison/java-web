import { ProductWithCategory } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: ProductWithCategory[];
  onView: (product: ProductWithCategory) => void;
  onEdit: (product: ProductWithCategory) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const ProductList = ({ products, onView, onEdit, onDelete, loading }: ProductListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-gray-500 text-xl font-medium mb-2">No products yet</p>
        <p className="text-gray-400">Click "Add New Product" to create your first product!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;


