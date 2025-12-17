import { useState, useEffect } from 'react';
import { Category, CategoryFormData } from '../types';
import { categoryApi } from '../services/api';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string>('');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getAll();
      setCategories(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      setFormLoading(true);
      if (editingCategory) {
        await categoryApi.update(editingCategory.id, data);
      } else {
        await categoryApi.create(data);
      }
      setEditingCategory(null);
      await fetchCategories();
    } catch (err: any) {
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await categoryApi.delete(id);
      await fetchCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to delete category');
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-gray-600">Manage your product categories</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={formLoading}
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Categories</h2>
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

