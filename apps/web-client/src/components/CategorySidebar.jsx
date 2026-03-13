import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/slices/productSlice';

const categoryIcons = {
  'Fruits & Vegetables': '🍎',
  'Dairy, Bread & Eggs': '🥛',
  'Grains, Oil & Masala': '🌾',
  'Beverages': '🧃',
  'Snacks & Branded Food': '🍿',
  'Home & Cleaning': '🧹',
  'Personal Care': '🧴',
  'default': '🛒'
};

function CategorySidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { categories } = useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    setActiveCategory(categoryParam);
  }, [location]);

  const getIcon = (name) => categoryIcons[name] || categoryIcons.default;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-4 px-2">Shop by Category</h3>
          
          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  activeCategory === category._id
                    ? 'bg-blinkit-yellow/20 text-blinkit-green font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{getIcon(category.name)}</span>
                <span className="text-sm">{category.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Horizontal Scroll Bar */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3 px-4 -mx-4 bg-white border-b border-gray-100">
          <Link
            to="/products"
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category._id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{getIcon(category.name)}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategorySidebar;
