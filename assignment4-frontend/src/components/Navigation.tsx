import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center px-3 py-2 group"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <span className="text-white text-2xl font-extrabold tracking-tight">
                  ShopManager
                </span>
                <p className="text-primary-100 text-xs font-medium">Your E-Commerce Solution</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              to="/categories"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/categories')
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categories
            </Link>
            <Link
              to="/products"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive('/products')
                  ? 'bg-white text-primary-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


