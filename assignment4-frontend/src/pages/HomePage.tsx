import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg">
                ✨ E-Commerce Management Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                ShopManager
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your all-in-one solution for managing products, categories, and inventory.
              Streamline your e-commerce operations with our powerful tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                to="/products"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-bold rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Browse Products →
              </Link>
              <Link
                to="/categories"
                className="px-8 py-4 bg-white text-gray-800 text-lg font-bold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl border-2 border-gray-200"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage your e-commerce business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Product Management</h3>
            <p className="text-blue-100">
              Create, edit, and organize your products with ease. Track prices, descriptions, and more.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Category System</h3>
            <p className="text-purple-100">
              Organize products into categories for better navigation and inventory control.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Analytics & Stats</h3>
            <p className="text-pink-100">
              Track your inventory value, product count, and other key metrics at a glance.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start managing your products and categories now. It's easy, fast, and efficient!
          </p>
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-white text-primary-600 text-lg font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


