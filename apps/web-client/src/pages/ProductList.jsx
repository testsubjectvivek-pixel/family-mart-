import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearError } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  useEffect(() => {
    const params = {
      category,
      brand: search,
      minPrice,
      maxPrice,
      sort,
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 20,
    };
    dispatch(fetchProducts(params));
  }, [dispatch, category, search, sort, minPrice, maxPrice, searchParams]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddToCart = (productId, quantity = 1) => {
    dispatch(addToCart({ productId, quantity }));
    toast.success('Added to cart!');
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 animate-pulse">
                <div className="skeleton-image h-40 mb-4"></div>
                <div className="skeleton-text w-3/4 mb-2"></div>
                <div className="skeleton-text w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-6 md:py-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">All Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {products.length} products available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
                <button 
                  onClick={() => setSearchParams({})}
                  className="text-sm text-blinkit-green hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input"
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <select
                  value={sort || ''}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="input"
                >
                  <option value="">Relevance</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Popular</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
                <div className="space-y-2">
                  {['Fruits & Vegetables', 'Dairy & Eggs', 'Grains & Masala', 'Beverages', 'Snacks'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        checked={category === cat}
                        onChange={() => handleFilterChange('category', cat)}
                        className="w-4 h-4 text-blinkit-green focus:ring-blinkit-green"
                      />
                      <span className="text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button 
                  onClick={() => setSearchParams({})}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div 
                    key={product._id} 
                    className="product-card group"
                  >
                    <Link to={`/products/${product._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'}
                          alt={product.name}
                          className="product-image w-full h-36 md:h-44 object-cover"
                        />
                        {product.discountedPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {product.discountPercentage}% OFF
                          </div>
                        )}
                        {product.stock < 10 && product.stock > 0 && (
                          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            Only {product.stock} left
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-3 md:p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 text-sm md:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{product.brand} • {product.unit}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.discountedPrice || product.price}
                          </span>
                          {product.discountedPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {product.stock > 0 ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product._id);
                          }}
                          className="w-full py-2.5 bg-blinkit-green text-white font-medium rounded-xl hover:bg-blinkit-greenDark transition-colors flex items-center justify-center gap-2"
                        >
                          <span>🛒</span>
                          <span>Add</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-2.5 bg-gray-200 text-gray-500 font-medium rounded-xl cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                    ←
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button 
                      key={page}
                      className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                        page === 1 
                          ? 'bg-blinkit-green text-white' 
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
