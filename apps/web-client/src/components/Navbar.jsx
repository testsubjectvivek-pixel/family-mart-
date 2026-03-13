import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { setDrawerOpen } from '../store/slices/cartSlice';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { currentUser, token } = useSelector((state) => state.auth);
  const { items, subtotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search for "curd", "chips", "milk"...');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const searchTerms = ['curd', 'chips', 'milk', 'bread', 'eggs', 'fruits', 'vegetables', 'soft drinks', 'ice cream'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchTerms.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    setSearchPlaceholder(`Search for "${searchTerms[placeholderIndex]}"...`);
  }, [placeholderIndex]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openCartDrawer = () => {
    dispatch(setDrawerOpen(true));
  };

  const getRoleClass = (role) => {
    const classes = {
      'super-admin': 'bg-red-500',
      'product-manager': 'bg-blue-500',
      'order-manager': 'bg-purple-500',
      'customer': 'bg-blinkit-green',
    };
    return classes[role] || 'bg-gray-500';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-soft">
      <div className="container-app">
        <div className="flex items-center justify-between h-16 md:h-20 py-2">
          {/* Left: Logo + Delivery */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blinkit-yellow rounded-xl flex items-center justify-center text-black text-xl font-bold shadow-md group-hover:scale-105 transition-transform">
                M
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Family<span className="text-blinkit-green">Mart</span>
              </span>
            </Link>
            
            {/* Delivery Address */}
            <button className="hidden lg:flex flex-col items-start px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 dark:text-gray-400 text-xs">Delivery in</span>
                <span className="delivery-badge">
                  ⚡ 10 MIN
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Delhi, India ▼
              </span>
            </button>
          </div>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="search-input text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login Button */}
            {!token ? (
              <Link 
                to="/login" 
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                Login
              </Link>
            ) : (
              <div className="relative hidden md:block">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`w-8 h-8 ${getRoleClass(currentUser?.role)} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser?.name?.split(' ')[0]}
                  </span>
                  <span className="text-gray-400">▼</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-hover border border-gray-100 dark:border-gray-800 overflow-hidden animate-slide-down">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                      <p className="font-medium text-gray-900 dark:text-white">{currentUser?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                    </div>
                    <div className="p-2">
                      {['super-admin', 'product-manager', 'order-manager'].includes(currentUser?.role) ? (
                        <Link 
                          to="/admin/dashboard" 
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span>⚙️</span>
                          <span className="text-sm font-medium">Admin Panel</span>
                        </Link>
                      ) : (
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span>👤</span>
                          <span className="text-sm font-medium">My Profile</span>
                        </Link>
                      )}
                      <Link 
                        to="/orders" 
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span>📦</span>
                        <span className="text-sm font-medium">My Orders</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <span>🚪</span>
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Button - Black with Price */}
            <button 
              onClick={openCartDrawer}
              className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-md"
            >
              <span className="text-lg">🛒</span>
              <span className="hidden sm:inline">My Cart</span>
              <span className="bg-blinkit-yellow text-black text-sm font-bold px-2 py-0.5 rounded-lg">
                ₹{subtotal?.toFixed(0) || 0}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl text-gray-700 dark:text-gray-300">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="search-input text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 animate-slide-down">
          <div className="container-app py-4 space-y-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>🏠</span>
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/products" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>🛍️</span>
              <span className="font-medium">Products</span>
            </Link>
            <Link 
              to="/cart" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>🛒</span>
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-blinkit-green text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>📦</span>
              <span className="font-medium">My Orders</span>
            </Link>
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full">
                <span>📍</span>
                <span className="font-medium">Deliver to Delhi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
