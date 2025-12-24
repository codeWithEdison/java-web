import { useState, useEffect } from 'react';
import { Category, CategoryFormData } from '../types';
import { categoryApi } from '../services/api';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import Modal from '../components/Modal';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setIsModalOpen(false);
      await fetchCategories();
    } catch (err: any) {
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
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
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Product Categories</h1>
              <p className="text-lg text-gray-600">Organize and manage your product categories</p>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Category
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wide">Total Categories</p>
                <p className="text-5xl font-bold mt-2">{categories.length}</p>
                <p className="text-indigo-100 text-sm mt-2">Keep your products well organized</p>
              </div>
              <div className="bg-white/20 p-6 rounded-2xl">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Categories <span className="text-blue-600">({categories.length})</span>
            </h2>
          </div>
          
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>

      {/* Category Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingCategory ? 'Edit Category' : 'Create New Category'}
        size="md"
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;


