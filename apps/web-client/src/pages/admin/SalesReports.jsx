import { useState, useEffect } from 'react';
import { ordersAPI } from '../../services/api';
import { 
  FileText, Download, Calendar, Filter, 
  TrendingUp, Users, ShoppingBag, DollarSign 
} from 'lucide-react';

function SalesReports() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('30days');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, dateRange]);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    const now = new Date();
    let startDate;
    
    switch (dateRange) {
      case '7days':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case '30days':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case '90days':
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0);
    }

    setFilteredOrders(orders.filter(o => new Date(o.createdAt) >= startDate));
  };

  const generateReport = () => {
    const reportData = filteredOrders.map(order => ({
      'Order ID': order.orderId || order._id,
      'Date': new Date(order.createdAt).toLocaleDateString('en-IN'),
      'Customer': order.shippingAddress?.fullName || 'N/A',
      'Items': order.items?.length || 0,
      'Subtotal': order.subtotal || 0,
      'Delivery Fee': order.deliveryFee || 0,
      'Discount': order.discount || 0,
      'Total': order.totalAmount || 0,
      'Payment Method': order.paymentMethod || 'N/A',
      'Status': order.status || 'N/A'
    }));
    return reportData;
  };

  const downloadCSV = () => {
    const reportData = generateReport();
    if (reportData.length === 0) return;

    const headers = Object.keys(reportData[0]);
    const csvContent = [
      headers.join(','),
      ...reportData.map(row => headers.map(h => row[h]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const summaryStats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    totalDiscount: filteredOrders.reduce((sum, o) => sum + (o.discount || 0), 0),
    totalDeliveryFee: filteredOrders.reduce((sum, o) => sum + (o.deliveryFee || 0), 0),
    avgOrderValue: filteredOrders.length ? filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / filteredOrders.length : 0,
    cancelledOrders: filteredOrders.filter(o => o.status === 'cancelled').length,
    completedOrders: filteredOrders.filter(o => o.status === 'delivered').length
  };

  const ordersByDay = filteredOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'short' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const paymentMethods = filteredOrders.reduce((acc, order) => {
    const method = order.paymentMethod || 'Unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blinkit-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blinkit-green focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blinkit-green text-white rounded-lg hover:bg-blinkit-greenDark transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2">
        {[
          { value: 'summary', label: 'Summary', icon: FileText },
          { value: 'detailed', label: 'Detailed', icon: Filter }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setReportType(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              reportType === tab.value
                ? 'bg-blinkit-green text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{summaryStats.totalOrders}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">₹{summaryStats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <p className="text-2xl font-bold text-gray-800">₹{summaryStats.avgOrderValue.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Completed Orders</p>
          <p className="text-2xl font-bold text-gray-800">{summaryStats.completedOrders}</p>
        </div>
      </div>

      {reportType === 'summary' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h2>
            <div className="space-y-3">
              {Object.entries(
                filteredOrders.reduce((acc, o) => {
                  acc[o.status] = (acc[o.status] || 0) + 1;
                  return acc;
                }, {})
              ).map(([status, count]) => {
                const percentage = ((count / filteredOrders.length) * 100).toFixed(1);
                const colors = {
                  pending: 'bg-yellow-500',
                  confirmed: 'bg-blue-500',
                  packed: 'bg-purple-500',
                  out_for_delivery: 'bg-orange-500',
                  delivered: 'bg-green-500',
                  cancelled: 'bg-red-500'
                };
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize text-gray-700">{status.replace(/_/g, ' ')}</span>
                      <span className="text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className={`h-full ${colors[status] || 'bg-gray-500'} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {Object.entries(paymentMethods).map(([method, count]) => {
                const percentage = ((count / filteredOrders.length) * 100).toFixed(1);
                return (
                  <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 capitalize">{method}</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">{count}</span>
                      <span className="text-gray-500 text-sm ml-2">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Report Table */
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.slice(0, 50).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-blinkit-green">
                      {order.orderId || order._id?.slice(-8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.shippingAddress?.fullName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ₹{(order.totalAmount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length > 50 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              Showing 50 of {filteredOrders.length} orders
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SalesReports;
