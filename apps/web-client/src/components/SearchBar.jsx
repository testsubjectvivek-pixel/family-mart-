import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, clearSearch } from '../store/slices/searchSlice';

function SearchBar({ 
  onSearch, 
  defaultValue = '', 
  placeholder = 'Search for products...',
  showSuggestions = true,
  className = ''
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState(defaultValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const { results: suggestions, loading } = useSelector((state) => state.search);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        dispatch(searchProducts({ query, limit: 5 }));
        setShowDropdown(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearch());
      setShowDropdown(false);
    }
  }, [query, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      onSearch ? onSearch(query) : navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowDropdown(false);
    setQuery('');
    navigate(`/products/${productId}`);
  };

  const handleSuggestionSearch = (e, sugQuery) => {
    e.stopPropagation();
    setShowDropdown(false);
    setQuery('');
    onSearch ? onSearch(sugQuery) : navigate(`/search?q=${encodeURIComponent(sugQuery)}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowDropdown(true)}
            placeholder={placeholder}
            className="w-full px-5 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all"
          />
          
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setShowDropdown(false);
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-secondary transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product) => (
                <li key={product._id}>
                  <button
                    onClick={() => handleSuggestionClick(product._id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={product.images?.[0]?.url || 'https://placehold.co/100x100'}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      ₹{product.discountedPrice || product.price}
                    </div>
                  </button>
                </li>
              ))}
              
              <li className="border-t border-gray-100">
                <button
                  onClick={(e) => handleSuggestionSearch(e, query)}
                  className="w-full flex items-center justify-between p-3 text-primary hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium">Search for "{query}"</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
