import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Plus, Check, Star, ShoppingCart } from 'lucide-react';

function Compare() {
  const products = useSelector(state => state.products.products || []);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductPicker, setShowProductPicker] = useState(false);

  const maxCompare = 4;

  const addToCompare = (product) => {
    if (selectedProducts.length < maxCompare) {
      setSelectedProducts([...selectedProducts, product]);
      setShowProductPicker(false);
    }
  };

  const removeFromCompare = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const availableProducts = products.filter(
    p => !selectedProducts.find(sp => sp.id === p.id)
  );

  const comparisonFields = [
    { key: 'price', label: 'Price', format: (v) => `₹${v}` },
    { key: 'originalPrice', label: 'Original Price', format: (v) => v ? `₹${v}` : '-' },
    { key: 'discount', label: 'Discount', format: (v) => v ? `${v}%` : '-' },
    { key: 'rating', label: 'Rating', format: (v) => v ? `${v} ⭐` : '-' },
    { key: 'stock', label: 'Stock', format: (v) => v > 0 ? 'In Stock' : 'Out of Stock' },
    { key: 'brand', label: 'Brand', format: (v) => v || '-' },
    { key: 'category', label: 'Category', format: (v) => v || '-' },
    { key: 'description', label: 'Description', format: (v) => v ? v.substring(0, 100) + '...' : '-' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Compare Products</h1>
          <span className="text-gray-500">
            {selectedProducts.length}/{maxCompare} products selected
          </span>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No products to compare</h3>
            <p className="text-gray-500 mb-4">Add products to compare their features</p>
            <button
              onClick={() => setShowProductPicker(true)}
              className="px-6 py-3 bg-blinkit-green text-white font-medium rounded-lg hover:bg-blinkit-greenDark"
            >
              Add Products to Compare
            </button>
          </div>
        ) : (
          <>
            {/* Product Cards */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                <div className="p-4 border-b border-r border-gray-100 bg-gray-50"></div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4 border-b border-gray-100 relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
                    />
                    <h3 className="font-medium text-gray-800 text-center line-clamp-2">{product.name}</h3>
                  </div>
                ))}
              </div>

              {/* Comparison Rows */}
              {comparisonFields.map((field) => (
                <div
                  key={field.key}
                  className="grid"
                  style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                >
                  <div className="p-4 border-b border-r border-gray-100 bg-gray-50 font-medium text-gray-700">
                    {field.label}
                  </div>
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="p-4 border-b border-gray-100 text-gray-600 text-center">
                      {field.format(product[field.key])}
                    </div>
                  ))}
                </div>
              ))}

              {/* Action Row */}
              <div
                className="grid"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 border-r border-gray-100 bg-gray-50"></div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blinkit-green text-white rounded-lg hover:bg-blinkit-greenDark transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Add More Button */}
            {selectedProducts.length < maxCompare && (
              <button
                onClick={() => setShowProductPicker(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blinkit-green hover:text-blinkit-green transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add More Products
              </button>
            )}
          </>
        )}

        {/* Product Picker Modal */}
        {showProductPicker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Select Products</h3>
                <button
                  onClick={() => setShowProductPicker(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {availableProducts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No more products available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {availableProducts.slice(0, 8).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => addToCompare(product)}
                        className="p-3 border border-gray-200 rounded-xl hover:border-blinkit-green hover:bg-blinkit-green/5 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image || 'https://via.placeholder.com/100'}
                          alt={product.name}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <p className="font-medium text-gray-800 text-sm line-clamp-2">{product.name}</p>
                        <p className="text-blinkit-green font-semibold mt-1">₹{product.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
