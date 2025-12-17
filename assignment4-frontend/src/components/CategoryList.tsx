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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(category)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(category.id)}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          {category.description && (
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
          )}
          {category.created_at && (
            <p className="text-gray-400 text-xs">
              Created: {new Date(category.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

