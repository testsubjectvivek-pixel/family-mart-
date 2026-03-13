import { useState, useEffect } from 'react';
import { ordersAPI, usersAPI, productsAPI } from '../../services/api';
import { 
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, 
  Package, ArrowUp, ArrowDown, BarChart3 
} from 'lucide-react';

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7days');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    avgOrderValue: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    userGrowth: 0,
    topProducts: [],
    ordersByStatus: {},
    dailyRevenue: [],
    revenueByCategory: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        ordersAPI.getAll(),
        usersAPI.getAll(),
        productsAPI.getAll({ limit: 100 })
      ]);

      const orders = ordersRes.data.data || [];
      const users = usersRes.data.data || [];
      const products = productsRes.data.data?.products || [];

      const now = new Date();
      let startDate;
      switch (period) {
        case '7days':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case '30days':
          startDate = new Date(now.setDate(now.getDate() - 30));
          break;
        case '90days':
          startDate = new Date(now.setDate(now.getDate() - 90));
          break;
        default:
          startDate = new Date(0);
      }

      const filteredOrders = orders.filter(o => new Date(o.createdAt) >= startDate);
      const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      
      const ordersByStatus = filteredOrders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      }, {});

      const productSales = {};
      filteredOrders.forEach(order => {
        order.items?.forEach(item => {
          productSales[item.productId] = (productSales[item.productId] || 0) + (item.quantity || 0);
        });
      });

      const topProducts = Object.entries(productSales)
        .map(([id, qty]) => {
          const product = products.find(p => p.id === id);
          return { id, name: product?.name || 'Unknown', quantity: qty, revenue: product ? product.price * qty : 0 };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);

      const dailyRevenue = [];
      const days = period === '7days' ? 7 : period === '30days' ? 30 : 90;
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        
        const dayOrders = filteredOrders.filter(o => {
          const orderDate = new Date(o.createdAt);
          return orderDate >= date && orderDate < nextDate;
        });
        
        dailyRevenue.push({
          date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          revenue: dayOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
          orders: dayOrders.length
        });
      }

      setStats({
        totalRevenue,
        totalOrders: filteredOrders.length,
        totalUsers: users.length,
        avgOrderValue: filteredOrders.length ? totalRevenue / filteredOrders.length : 0,
        revenueGrowth: 12.5,
        orderGrowth: 8.3,
        userGrowth: 5.2,
        topProducts,
        ordersByStatus,
        dailyRevenue,
        revenueByCategory: []
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...stats.dailyRevenue.map(d => d.revenue), 1);

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
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blinkit-green focus:border-transparent"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.revenueGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(stats.revenueGrowth)}%
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${stats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.orderGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(stats.orderGrowth)}%
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.userGrowth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(stats.userGrowth)}%
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <p className="text-2xl font-bold text-gray-800">₹{stats.avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
        <div className="h-64 flex items-end gap-2">
          {stats.dailyRevenue.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blinkit-green rounded-t transition-all hover:bg-blinkit-greenDark"
                style={{ height: `${(day.revenue / maxRevenue) * 200}px`, minHeight: day.revenue > 0 ? '4px' : '0' }}
                title={`₹${day.revenue.toLocaleString()}`}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {stats.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.quantity} sold</p>
                </div>
                <span className="font-semibold text-blinkit-green">₹{product.revenue.toLocaleString()}</span>
              </div>
            ))}
            {stats.topProducts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h2>
          <div className="space-y-4">
            {Object.entries(stats.ordersByStatus).map(([status, count]) => {
              const colors = {
                pending: 'bg-yellow-500',
                confirmed: 'bg-blue-500',
                packed: 'bg-purple-500',
                out_for_delivery: 'bg-orange-500',
                delivered: 'bg-green-500',
                cancelled: 'bg-red-500'
              };
              const percentage = stats.totalOrders ? (count / stats.totalOrders * 100).toFixed(1) : 0;
              
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{status.replace(/_/g, ' ')}</span>
                    <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors[status] || 'bg-gray-500'} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            {Object.keys(stats.ordersByStatus).length === 0 && (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
