import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../store/slices/productSlice';
import SkeletonLoader from '../components/SkeletonLoader';

function Home() {
  const dispatch = useDispatch();
  const { categories, products, isLoading } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  const categoryEmojis = {
    'Fruits & Vegetables': '🍎',
    'Dairy, Bread & Eggs': '🥛',
    'Grains, Oil & Masala': '🌾',
    'Beverages': '🧃',
    'Snacks & Branded Food': '🍿',
    'Home & Cleaning': '🧹',
    'Personal Care': '🧴',
  };

  const banners = [
    { id: 1, title: 'Fresh Vegetables', subtitle: 'Up to 40% Off', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800', bg: 'from-green-400 to-green-600' },
    { id: 2, title: 'Daily Essentials', subtitle: 'Starting ₹29', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', bg: 'from-orange-400 to-orange-600' },
  ];

  const getCategoryEmoji = (name) => categoryEmojis[name] || '🛒';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blinkit-green to-blinkit-greenDark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-app py-8 md:py-12 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Fresh Groceries<br />
                <span className="text-yellow-300">Delivered Fast</span>
              </h1>
              <p className="text-white/90 text-lg mb-6 max-w-lg">
                Get fresh fruits, vegetables, dairy & daily essentials delivered to your doorstep in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link 
                  to="/products" 
                  className="px-8 py-4 bg-white text-blinkit-green font-bold rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Shop Now →
                </Link>
                <button className="px-8 py-4 bg-white/20 text-white font-bold rounded-2xl hover:bg-white/30 transition-all">
                  Download App
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-8 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-white/70 text-sm">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-white/70 text-sm">Orders Daily</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">15min</p>
                  <p className="text-white/70 text-sm">Delivery</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600" 
                alt="Fresh groceries" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Promise Banner */}
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container-app py-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blinkit-green/10 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Fast Delivery</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Within 15-30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-2xl">✅</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Fresh Quality</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quality checked</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center text-2xl">💰</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Best Prices</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Great discounts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl">🔄</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-app">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <Link to="/products" className="text-blinkit-green font-medium hover:underline">
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <SkeletonLoader key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {(categories || []).map((category) => (
                <Link 
                  key={category._id} 
                  to={`/products?category=${category._id}`}
                  className="group"
                >
                  <div className="category-card aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={category.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(category.name)}&background=random`}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                      <span className="text-2xl mb-1">{getCategoryEmoji(category.name)}</span>
                      <span className="text-white text-xs font-medium text-center line-clamp-1 px-1">
                        {category.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Flash Sales Banner */}
      <section className="container-app -mt-4">
        <div className="grid md:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <Link 
              key={banner.id}
              to="/products"
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${banner.bg} p-6 md:p-8`}
            >
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <img src={banner.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <p className="text-white/80 text-sm font-medium mb-1">{banner.subtitle}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{banner.title}</h3>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-xl font-medium text-sm">
                  Shop Now <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-app">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Products</h2>
            <Link to="/products" className="text-blinkit-green font-medium hover:underline">
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <SkeletonLoader key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : (products || []).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {(products || []).map((product) => {
                const discount = product.discountedPrice 
                  ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
                  : 0;
                const displayPrice = product.discountedPrice || product.price;
                
                return (
                  <Link 
                    key={product._id} 
                    to={`/products/${product._id}`}
                    className="product-card group"
                  >
                    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <img
                        src={product.images?.[0]?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=random`}
                        alt={product.name}
                        className="product-image w-full h-40 md:h-48 object-cover"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          {discount}% OFF
                        </div>
                      )}
                      <button className="absolute bottom-2 right-2 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-blinkit-green text-xl">+</span>
                      </button>
                    </div>
                    
                    <div className="p-3 md:p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{product.ratingsAverage?.toFixed(1) || '4.5'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{displayPrice}</span>
                          {product.discountedPrice && (
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-500 line-through">₹{product.price}</span>
                          )}
                        </div>
                      </div>
                      
                      <button className="w-full mt-3 py-2 bg-blinkit-green/10 text-blinkit-green font-medium rounded-xl hover:bg-blinkit-green hover:text-white transition-colors text-sm dark:bg-blinkit-green/20">
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No products available</p>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white dark:bg-gray-900 py-12 md:py-16">
        <div className="container-app">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Why Choose Family Mart?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Lightning Fast Delivery</h3>
              <p className="text-gray-500 dark:text-gray-400">Get your groceries delivered within 15-30 minutes. No more waiting for hours!</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🌿</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Fresh & Quality Assured</h3>
              <p className="text-gray-500 dark:text-gray-400">Handpicked fresh produce, dairy, and groceries directly from farms.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Easy Payments</h3>
              <p className="text-gray-500 dark:text-gray-400">Pay online via UPI, Cards or choose Cash on Delivery. It's that simple!</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="section-padding">
        <div className="container-app">
          <div className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Download Family Mart App
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get exclusive offers, faster checkout, and order tracking on the go!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-900 transition-colors">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="font-medium">App Store</p>
                  </div>
                </button>
                <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-900 transition-colors">
                  <span className="text-2xl">▶️</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="font-medium">Google Play</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
