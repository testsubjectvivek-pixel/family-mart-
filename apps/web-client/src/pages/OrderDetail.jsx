import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../store/slices/orderSlice';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      packed: 'bg-purple-100 text-purple-700',
      out_for_delivery: 'bg-orange-100 text-orange-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusSteps = () => {
    const steps = ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered'];
    const currentIndex = steps.indexOf(currentOrder?.status);
    
    return steps.map((step, index) => ({
      name: step.replace('_', ' '),
      completed: index < currentIndex,
      current: index === currentIndex
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Order not found</h2>
        <Link to="/orders" className="text-primary hover:underline font-medium">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link to="/orders" className="text-sm text-gray-500 hover:text-primary mb-4 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order #{currentOrder.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(currentOrder.status)}`}>
            {currentOrder.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {getStatusSteps().map((step, index) => (
              <div key={step.name} className="flex flex-col items-center flex-1 relative">
                {index < getStatusSteps().length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-0.5 ${step.completed ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                  step.completed ? 'bg-primary text-white' :
                  step.current ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.completed ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : index + 1}
                </div>
                <span className={`text-xs mt-2 text-center ${step.current ? 'font-semibold text-primary' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery Address</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-medium text-gray-900">{currentOrder.deliveryAddress.fullName}</p>
            <p className="text-sm text-gray-600">{currentOrder.deliveryAddress.street}</p>
            <p className="text-sm text-gray-600">{currentOrder.deliveryAddress.city} - {currentOrder.deliveryAddress.pincode}</p>
            <p className="text-sm text-gray-600">Phone: {currentOrder.deliveryAddress.phone}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {currentOrder.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={item.productImage || 'https://placehold.co/80x80'}
                  alt={item.productName}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                />
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{currentOrder.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (GST)</span>
              <span className="text-gray-900">₹{currentOrder.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="text-gray-900">₹{currentOrder.deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-gray-900">₹{currentOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="flex gap-6 text-sm">
            <p className="text-gray-600">
              Payment: <span className="font-medium text-gray-900">{currentOrder.paymentMethod.toUpperCase()}</span>
            </p>
            <p className="text-gray-600">
              Delivery Slot: <span className="font-medium text-gray-900">{currentOrder.deliverySlot}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
