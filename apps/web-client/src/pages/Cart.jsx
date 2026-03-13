import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartItem, clearCart } from '../store/slices/cartSlice';
import { promoCodesAPI } from '../services/api';
import toast from 'react-hot-toast';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const deliveryCharges = subtotal >= 499 ? 0 : 40;
  const total = subtotal + tax + deliveryCharges - discount;

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem({ itemId: productId, quantity }));
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    setPromoLoading(true);
    try {
      const response = await promoCodesAPI.getAll();
      const promo = response.data.data?.find(p => p.code === promoCode.toUpperCase());
      
      if (promo) {
        let discountAmount = 0;
        if (promo.discountType === 'percentage') {
          discountAmount = Math.round(subtotal * (promo.discountValue / 100));
          if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
            discountAmount = promo.maxDiscount;
          }
        } else {
          discountAmount = promo.discountValue;
        }
        
        if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
          toast.error(`Minimum order amount is ₹${promo.minOrderAmount}`);
          return;
        }
        
        setDiscount(discountAmount);
        setAppliedPromo(promo);
        toast.success(`Promo code applied! ${promo.discountType === 'percentage' ? promo.discountValue + '%' : '₹' + promo.discountValue} off`);
      } else {
        toast.error('Invalid promo code');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid promo code';
      toast.error(errorMessage);
      setDiscount(0);
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </p>
        <Link to="/products" className="btn-primary inline-block px-8 py-3">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex gap-4">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                <img
                  src={item.product?.images?.[0]?.url || 'https://placehold.co/200x200'}
                  alt={item.product?.name || 'Product'}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/products/${item.productId}`} className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2">
                      {item.product?.name || 'Product'}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.product?.brand} · {item.product?.unit}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 whitespace-nowrap">
                    ₹{((item.product?.discountedPrice || item.product?.price || item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center bg-gray-50 rounded-xl">
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-white rounded-l-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-sm font-medium border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-white rounded-r-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-sm text-gray-500 hover:text-danger font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleClearCart}
            className="text-sm text-gray-500 hover:text-danger font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Order Summary</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apply Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={promoLoading || !promoCode.trim()}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
              {appliedPromo && (
                <p className="text-sm text-success mt-2 font-medium">
                  ✓ {appliedPromo.code} applied - You save ₹{appliedPromo.discount}!
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">Try: FAMILY20 or FIRST50</p>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
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
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              {deliveryCharges > 0 && (
                <p className="text-xs text-gray-400">Add ₹{499 - subtotal} more for free delivery</p>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 btn-primary py-3.5 text-base font-semibold"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center mt-4 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
