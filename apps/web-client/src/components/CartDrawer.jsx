import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerOpen, updateCartItem, removeFromCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, subtotal, gst, discount, total, isDrawerOpen, deliveryEstimate } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const deliveryFee = subtotal >= 99 ? 0 : 19;
  const handlingFee = 9;
  const finalTotal = subtotal + deliveryFee + handlingFee - discount;

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleIncrement = async (itemId, currentQty) => {
    try {
      await dispatch(updateCartItem({ itemId, quantity: currentQty + 1 })).unwrap();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDecrement = async (itemId, currentQty) => {
    if (currentQty <= 1) {
      try {
        await dispatch(removeFromCart(itemId)).unwrap();
      } catch (error) {
        toast.error('Failed to remove');
      }
    } else {
      try {
        await dispatch(updateCartItem({ itemId, quantity: currentQty - 1 })).unwrap();
      } catch (error) {
        toast.error('Failed to update');
      }
    }
  };

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-drawer-overlay transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
      />
      
      {/* Drawer */}
      <div className={`cart-drawer ${isDrawerOpen ? 'open' : ''} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
          <button 
            onClick={closeDrawer}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Delivery Estimate */}
        <div className="px-4 py-3 bg-blinkit-yellow/10 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-blinkit-green font-bold">⚡</span>
            <span className="text-sm font-medium text-gray-700">
              Delivery in <span className="text-blinkit-green font-bold">{deliveryEstimate} minutes</span>
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 mb-4 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
            </div>
          ) : (
            items.map((item) => {
              const product = item.product || item;
              const itemPrice = product.discountedPrice || product.price;
              const itemTotal = itemPrice * item.quantity;
              
              return (
                <div key={item._id || item.productId} className="flex gap-3 bg-white rounded-xl p-2 border border-gray-100">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || 'https://placehold.co/100x100'}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-gray-900">₹{itemTotal.toFixed(2)}</span>
                      
                      <div className="quantity-selector">
                        <button 
                          onClick={() => handleDecrement(item._id, item.quantity)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          onClick={() => handleIncrement(item._id, item.quantity)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bill Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3">Bill Summary</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST</span>
                <span>₹{gst?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-blinkit-green' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Handling Fee</span>
                <span>₹{handlingFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{(subtotal + deliveryFee + handlingFee - discount).toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Add items worth ₹{(99 - subtotal).toFixed(0)} more for free delivery
                </p>
              )}
            </div>
            
            {/* Proceed to Pay Button */}
            <button 
              onClick={handleCheckout}
              className="w-full mt-4 py-4 bg-black text-white font-bold text-lg rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
            >
              Proceed to Pay ₹{(subtotal + deliveryFee + handlingFee - discount).toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
