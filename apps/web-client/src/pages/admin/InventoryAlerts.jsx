import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { AlertTriangle, Package, TrendingDown, CheckCircle, X } from 'lucide-react';

function InventoryAlerts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll({ limit: 100 });
      setProducts(response.data.data?.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (product) => {
    const stock = product.stock || 0;
    const minStock = product.minStockAlert || 10;
    
    if (stock === 0) return { status: 'out_of_stock', label: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (stock <= minStock * 0.3) return { status: 'critical', label: 'Critical', color: 'text-red-500', bg: 'bg-red-50' };
    if (stock <= minStock) return { status: 'low', label: 'Low Stock', color: 'text-orange-500', bg: 'bg-orange-50' };
    return { status: 'ok', label: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const filteredProducts = products.filter(p => {
    const status = getStockStatus(p);
    const matchesFilter = filter === 'all' || status.status === filter;
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stockSummary = {
    outOfStock: products.filter(p => (p.stock || 0) === 0).length,
    critical: products.filter(p => {
      const stock = p.stock || 0;
      const minStock = p.minStockAlert || 10;
      return stock > 0 && stock <= minStock * 0.3;
    }).length,
    lowStock: products.filter(p => {
      const stock = p.stock || 0;
      const minStock = p.minStockAlert || 10;
      return stock > minStock * 0.3 && stock <= minStock;
    }).length,
    inStock: products.filter(p => {
      const stock = p.stock || 0;
      const minStock = p.minStockAlert || 10;
      return stock > minStock;
    }).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blinkit-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Alerts</h1>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-blinkit-green text-white rounded-lg hover:bg-blinkit-greenDark transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stockSummary.outOfStock}</p>
              <p className="text-sm text-gray-500">Out of Stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stockSummary.critical}</p>
              <p className="text-sm text-gray-500">Critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stockSummary.lowStock}</p>
              <p className="text-sm text-gray-500">Low Stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stockSummary.inStock}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blinkit-green focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'out_of_stock', label: 'Out of Stock' },
              { value: 'critical', label: 'Critical' },
              { value: 'low', label: 'Low Stock' },
              { value: 'ok', label: 'In Stock' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? 'bg-blinkit-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Alert</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || 'https://via.placeholder.com/40'}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.sku || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.category || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${stockStatus.color}`}>{product.stock || 0}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.minStockAlert || 10}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="text-blinkit-green hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No products found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryAlerts;
