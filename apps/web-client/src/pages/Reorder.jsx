import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../store/slices/orderSlice';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import SkeletonLoader from '../components/SkeletonLoader';

function Reorder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOrder?.items) {
      const allSelected = currentOrder.items.map(item => item.productId);
      setSelectedItems(allSelected);
      
      const qtyMap = {};
      currentOrder.items.forEach(item => {
        qtyMap[item.productId] = item.quantity;
      });
      setQuantities(qtyMap);
    }
  }, [currentOrder]);

  const toggleItem = (productId) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item');
      return;
    }

    for (const productId of selectedItems) {
      const item = currentOrder.items.find(i => i.productId === productId);
      await dispatch(addToCart({ 
        productId, 
        quantity: quantities[productId] || 1 
      }));
    }

    toast.success('Items added to cart!');
    navigate('/cart');
  };

  const getTotal = () => {
    if (!currentOrder?.items) return 0;
    return selectedItems.reduce((sum, productId) => {
      const item = currentOrder.items.find(i => i.productId === productId);
      return sum + (item?.price || 0) * (quantities[productId] || 1);
    }, 0);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SkeletonLoader type="card" />
      </div>
    );
  }

  if (error || !currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">{error || 'Unable to load order'}</p>
          <Link to="/orders" className="btn-primary inline-block px-6 py-3">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const order = currentOrder;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link to={`/orders/${id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Order
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reorder</h1>
              <p className="text-sm text-gray-500 mt-1">
                From order #{order.orderNumber} • {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Original Total</p>
              <p className="text-lg font-semibold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Select Items to Reorder</h2>
            <button
              onClick={() => setSelectedItems(
                selectedItems.length === order.items.length 
                  ? [] 
                  : order.items.map(i => i.productId)
              )}
              className="text-sm text-primary hover:underline"
            >
              {selectedItems.length === order.items.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div 
                key={item.productId} 
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  selectedItems.includes(item.productId) 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId)}
                  onChange={() => toggleItem(item.productId)}
                  className="w-5 h-5 text-primary rounded focus:ring-primary"
                />
                
                <img
                  src={item.productImage || 'https://placehold.co/80x80'}
                  alt={item.productName}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                  <p className="text-sm text-gray-500">₹{item.price?.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, (quantities[item.productId] || 1) - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium">
                    {quantities[item.productId] || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, (quantities[item.productId] || 1) + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-gray-900 w-20 text-right">
                  ₹{((quantities[item.productId] || 1) * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Selected {selectedItems.length} items</span>
            <span className="text-xl font-bold text-gray-900">₹{getTotal().toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={selectedItems.length === 0}
            className="w-full btn-primary py-3.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add {selectedItems.length} Items to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reorder;
