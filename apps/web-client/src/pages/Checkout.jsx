import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);
  
  const [selectedAddress, setSelectedAddress] = useState(
    currentUser?.addresses?.find(a => a.isDefault)?._id || ''
  );
  const [deliverySlot, setDeliverySlot] = useState('9-12');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '', street: '', city: 'New Delhi', pincode: '', phone: '', isDefault: true
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const deliveryCharges = subtotal >= 499 ? 0 : 40;
  const total = subtotal + tax + deliveryCharges;

  const handleAddAddress = (e) => {
    e.preventDefault();
    setShowAddressForm(false);
    setNewAddress({ fullName: '', street: '', city: 'New Delhi', pincode: '', phone: '', isDefault: true });
    toast.success('Address added successfully!');
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    const orderData = {
      addressId: selectedAddress,
      deliverySlot,
      paymentMethod,
      cartItems: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Add some products to checkout</p>
        <Link to="/products" className="btn-primary inline-block px-6 py-3">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Address</h2>
              <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-sm text-primary font-medium hover:underline">
                {showAddressForm ? 'Cancel' : '+ Add New'}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name" value={newAddress.fullName}
                    onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
                    className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white" required />
                  <input type="tel" placeholder="Phone" value={newAddress.phone}
                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white" required />
                  <input type="text" placeholder="Street Address" value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    className="md:col-span-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white" required />
                  <input type="text" placeholder="City" value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white" required />
                  <input type="text" placeholder="Pincode" value={newAddress.pincode}
                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white" required />
                </div>
                <button type="submit" className="mt-4 btn-primary px-5 py-2.5">
                  Save Address
                </button>
              </form>
            )}

            <div className="space-y-3">
              {currentUser?.addresses?.length > 0 ? currentUser.addresses.map((address) => (
                <label key={address._id} className={`block border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddress === address._id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex items-start">
                    <input type="radio" name="address" value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="mt-1 mr-3 w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">{address.fullName} {address.isDefault && <span className="text-primary text-sm">(Default)</span>}</p>
                      <p className="text-gray-600">{address.street}, {address.city} - {address.pincode}</p>
                      <p className="text-gray-500 text-sm">Phone: {address.phone}</p>
                    </div>
                  </div>
                </label>
              )) : (
                <p className="text-gray-500 text-center py-4">No addresses saved. Please add one.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Slot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['9-12', '12-3', '3-6', '6-9'].map((slot) => (
                <button key={slot} onClick={() => setDeliverySlot(slot)}
                  className={`py-3 px-4 rounded-xl border text-center font-medium transition-all ${
                    deliverySlot === slot ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${
                paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center">
                  <input type="radio" name="payment" value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 w-4 h-4 text-primary" />
                  <span className="font-medium">Pay Online (Razorpay)</span>
                </div>
              </label>
              <label className={`block border rounded-xl p-4 cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center">
                  <input type="radio" name="payment" value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 w-4 h-4 text-primary" />
                  <span className="font-medium">Cash on Delivery</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name || 'Product'} x {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={deliveryCharges === 0 ? 'text-success font-medium' : ''}>
                  {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                </span>
              </div>
              {deliveryCharges > 0 && (
                <p className="text-xs text-gray-400">Add ₹{499 - subtotal} more for free delivery</p>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} disabled={loading || !selectedAddress}
              className="w-full mt-6 btn-primary py-3.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
