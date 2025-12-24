import { useState, useEffect } from 'react';
import { ProductWithCategory, Category, ProductFormData } from '../types';
import { productApi, categoryApi } from '../services/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import ProductDetailModal from '../components/ProductDetailModal';
import Modal from '../components/Modal';

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null);
  const [viewingProduct, setViewingProduct] = useState<ProductWithCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAll();
      setProducts(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err: any) {
      console.error('Failed to load categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSubmit = async (data: Omit<ProductFormData, 'price'> & { price: number }) => {
    try {
      setFormLoading(true);
      if (editingProduct) {
        await productApi.update(editingProduct.id, data);
      } else {
        await productApi.create(data);
      }
      setEditingProduct(null);
      setIsModalOpen(false);
      await fetchProducts();
    } catch (err: any) {
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleView = (product: ProductWithCategory) => {
    setViewingProduct(product);
    setIsViewModalOpen(true);
  };

  const handleEdit = (product: ProductWithCategory) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productApi.delete(id);
      await fetchProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Product Catalog</h1>
              <p className="text-lg text-gray-600">Manage your inventory and showcase your products</p>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Products</p>
                  <p className="text-4xl font-bold mt-2">{totalProducts}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Total Value</p>
                  <p className="text-3xl font-bold mt-2">RWF {totalValue.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">Average Price</p>
                  <p className="text-3xl font-bold mt-2">RWF {Math.round(avgPrice).toLocaleString()}</p>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
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

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Products <span className="text-primary-600">({totalProducts})</span>
            </h2>
          </div>
          
          <ProductList
            products={products}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={formLoading}
        />
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Product Details"
        size="xl"
      >
        {viewingProduct && <ProductDetailModal product={viewingProduct} />}
      </Modal>
    </div>
  );
};

export default ProductsPage;


