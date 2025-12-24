import { ProductWithCategory } from '../types';

interface ProductDetailModalProps {
  product: ProductWithCategory;
}

const ProductDetailModal = ({ product }: ProductDetailModalProps) => {
  const getPlaceholderColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      {/* Product Image */}
      <div className="relative h-96 overflow-hidden rounded-t-lg -mt-6 -mx-6 mb-6">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = `w-full h-full ${getPlaceholderColor(product.name)} flex items-center justify-center`;
              fallbackDiv.innerHTML = `<div class="text-white text-8xl font-bold opacity-30">${product.name.charAt(0).toUpperCase()}</div>`;
              e.currentTarget.parentElement!.appendChild(fallbackDiv);
            }}
          />
        ) : (
          <div className={`w-full h-full ${getPlaceholderColor(product.name)} flex items-center justify-center`}>
            <div className="text-white text-8xl font-bold opacity-30">
              {product.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Category Badge on Image */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-sm font-bold text-gray-700 rounded-full shadow-lg">
            {product.category?.name || 'Uncategorized'}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Name and Price */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-green-600">
              RWF {product.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description || 'No description available for this product.'}
          </p>
        </div>

        {/* Product Information Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 font-medium mb-1">Product ID</p>
            <p className="text-lg font-semibold text-gray-900">#{product.id}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 font-medium mb-1">Category</p>
            <p className="text-lg font-semibold text-gray-900">
              {product.category?.name || 'Uncategorized'}
            </p>
          </div>

          {product.created_at && (
            <div className="bg-gray-50 p-4 rounded-lg col-span-2">
              <p className="text-sm text-gray-500 font-medium mb-1">Added On</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(product.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Category Description if available */}
        {product.category?.description && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-sm text-blue-900 font-medium mb-1">Category Info</p>
            <p className="text-sm text-blue-800">{product.category.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;

