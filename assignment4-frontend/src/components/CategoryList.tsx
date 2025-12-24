import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const CategoryList = ({ categories, onEdit, onDelete, loading }: CategoryListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No categories found. Create one to get started!</p>
      </div>
    );
  }

  const categoryColors = [
    'from-pink-400 to-pink-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-indigo-400 to-indigo-600',
    'from-red-400 to-red-600',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category, index) => {
        const colorClass = categoryColors[index % categoryColors.length];
        return (
          <div
            key={category.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Category Header with Gradient */}
            <div className={`bg-gradient-to-br ${colorClass} p-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-200"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
                      className="p-2 bg-white/20 hover:bg-red-500 backdrop-blur-sm text-white rounded-lg transition-all duration-200"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white truncate">
                  {category.name}
                </h3>
              </div>
            </div>

            {/* Category Body */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
                {category.description || 'No description available for this category'}
              </p>
              
              {category.created_at && (
                <div className="flex items-center text-gray-400 text-xs pt-4 border-t border-gray-100">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(category.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;


