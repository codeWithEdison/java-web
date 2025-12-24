import { useState, useEffect } from 'react';
import { ProductWithCategory, ProductFormData, Category } from '../types';

interface ProductFormProps {
  product?: ProductWithCategory | null;
  categories: Category[];
  onSubmit: (data: Omit<ProductFormData, 'price'> & { price: number }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm = ({ product, categories, onSubmit, onCancel, loading }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    image_url: '',
    category_id: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description || '',
        image_url: product.image_url || '',
        category_id: product.category_id.toString(),
      });
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        image_url: '',
        category_id: categories.length > 0 ? categories[0].id.toString() : '',
      });
    }
    setError('');
  }, [product, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      setError('Valid price is required');
      return;
    }

    if (!formData.category_id) {
      setError('Category is required');
      return;
    }

    try {
      await onSubmit({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image_url: formData.image_url,
        category_id: parseInt(formData.category_id),
      });
      setFormData({
        name: '',
        price: '',
        description: '',
        image_url: '',
        category_id: categories.length > 0 ? categories[0].id.toString() : '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category_id"
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
          Image URL <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <input
          type="url"
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        <p className="mt-1 text-xs text-gray-500">
          Paste a link to an image (e.g., from Unsplash, Imgur, etc.)
        </p>
        {formData.image_url && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-700 mb-2">Preview:</p>
            <img 
              src={formData.image_url} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.alt = 'Invalid image URL';
                e.currentTarget.className = 'w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-red-300 text-red-500 text-xs';
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter product description"
        />
      </div>

      <div className="flex space-x-4 mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;


