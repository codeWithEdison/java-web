import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Product Manager
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Manage your products and categories with ease. Create, update, and organize your inventory
            in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Link
              to="/categories"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1"
            >
              <div className="text-primary-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Categories</h2>
              <p className="text-gray-600">
                Organize your products into categories. Create, edit, and manage your product categories.
              </p>
            </Link>

            <Link
              to="/products"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1"
            >
              <div className="text-primary-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Products</h2>
              <p className="text-gray-600">
                Manage your product inventory. Add new products, update details, and track your items.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


