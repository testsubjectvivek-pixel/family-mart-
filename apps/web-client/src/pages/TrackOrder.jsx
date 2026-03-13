import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../store/slices/orderSlice';
import OrderTimeline from '../components/OrderTimeline';
import SkeletonLoader from '../components/SkeletonLoader';

function TrackOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOrder?.deliveryAddress) {
      setDeliveryAddress(currentOrder.deliveryAddress);
    }
  }, [currentOrder]);

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
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find this order. Please check your order history.</p>
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
      <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
              order.status === 'out_for_delivery' ? 'bg-orange-100 text-orange-700' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {order.status?.replace('_', ' ').toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Progress</h3>
          <OrderTimeline status={order.status} />
        </div>

        {deliveryAddress && (
          <div className="p-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-medium text-gray-900">{deliveryAddress.fullName}</p>
              <p className="text-sm text-gray-600 mt-1">{deliveryAddress.street}</p>
              <p className="text-sm text-gray-600">{deliveryAddress.city} - {deliveryAddress.pincode}</p>
              <p className="text-sm text-gray-500 mt-2">Phone: {deliveryAddress.phone}</p>
            </div>
          </div>
        )}

        <div className="p-6 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={item.productImage || 'https://placehold.co/60x60'}
                  alt={item.productName}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (GST)</span>
              <span className="text-gray-900">₹{order.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span className="text-gray-900">
                {order.deliveryCharges === 0 ? 'FREE' : `₹${order.deliveryCharges?.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/orders/${order._id}`} className="btn-primary flex-1 text-center py-3">
              View Details
            </Link>
            <Link to={`/orders/${order._id}/reorder`} className="px-6 py-3 border-2 border-primary rounded-xl text-primary font-medium hover:bg-primary hover:text-white transition-colors text-center">
              Reorder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
