import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItem, removeFromCart, setDrawerOpen } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

function ProductCard({ product, layout = 'vertical' }) {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  
  const [isAdding, setIsAdding] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);

  if (!product) return null;

  // Find item in cart
  const cartItem = cartItems.find(item => 
    item.product?._id === product._id || item.productId === product._id
  );
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  const price = product.discountedPrice || product.price;
  const originalPrice = product.discountedPrice ? product.price : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    setIsAdding(true);
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      setShowQuantity(true);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleIncrement = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await dispatch(updateCartItem({ 
        itemId: cartItem._id, 
        quantity: quantityInCart + 1 
      })).unwrap();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleDecrement = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (quantityInCart <= 1) {
      try {
        await dispatch(removeFromCart(cartItem._id)).unwrap();
        setShowQuantity(false);
        toast.success(`${product.name} removed from cart`);
      } catch (error) {
        toast.error('Failed to remove item');
      }
    } else {
      try {
        await dispatch(updateCartItem({ 
          itemId: cartItem._id, 
          quantity: quantityInCart - 1 
        })).unwrap();
      } catch (error) {
        toast.error('Failed to update quantity');
      }
    }
  };

  const productLink = `/products/${product._id}`;

  if (layout === 'horizontal') {
    return (
      <Link 
        to={productLink}
        className="flex gap-4 bg-white dark:bg-gray-900 rounded-card shadow-card border border-gray-100 dark:border-gray-800 p-4 hover:shadow-card-hover transition-all"
      >
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
          <img
            src={product.images?.[0]?.url || 'https://placehold.co/200x200'}
            alt={product.name}
            className="w-full h-full object-contain p-2"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.brand} • {product.unit}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{price?.toFixed(2)}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">₹{originalPrice?.toFixed(2)}</span>
                <span className="text-xs font-semibold text-green-600">{discount}% OFF</span>
              </>
            )}
          </div>
          
          {product.stock > 0 ? (
            <div className="mt-2">
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="px-4 py-1.5 border-2 border-blinkit-green text-blinkit-green text-sm font-semibold rounded-lg hover:bg-blinkit-green hover:text-white transition-colors disabled:opacity-50"
                >
                  {isAdding ? 'Adding...' : 'ADD'}
                </button>
              ) : (
                <div className="quantity-selector w-24">
                  <button onClick={handleDecrement} className="quantity-btn">-</button>
                  <span className="quantity-value">{quantityInCart}</span>
                  <button onClick={handleIncrement} className="quantity-btn">+</button>
                </div>
              )}
            </div>
          ) : (
            <span className="mt-2 inline-block text-xs font-medium text-red-600">Out of Stock</span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={productLink}
      className="product-card group"
    >
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden p-4">
        <img
          src={product.images?.[0]?.url || 'https://placehold.co/400x400'}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
            {discount}% OFF
          </div>
        )}
        
        {product.stock <= 10 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded text-xs font-medium">
            Only {product.stock} left
          </div>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm min-h-[2.5rem]">{product.name}</h3>
        
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className={`w-3 h-3 ${star <= (product.ratingsAverage || 4) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">({product.ratingsQuantity || 0})</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{price?.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 dark:text-gray-500 line-through">₹{originalPrice?.toFixed(2)}</span>
            )}
          </div>
          
          {product.stock > 0 ? (
            <div className="magic-add-btn" className={showQuantity || isInCart ? 'active' : ''}>
              {/* ADD State */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="add-state w-16 h-8 text-sm font-semibold"
              >
                {isAdding ? '...' : 'ADD'}
              </button>
              
              {/* Quantity State */}
              <div className="quantity-state w-20 h-8">
                <button 
                  onClick={handleDecrement} 
                  className="w-7 h-7 flex items-center justify-center bg-white/20 rounded hover:bg-white/30 transition-colors font-bold"
                >
                  -
                </button>
                <span className="font-semibold text-sm min-w-[24px] text-center">
                  {quantityInCart}
                </span>
                <button 
                  onClick={handleIncrement}
                  className="w-7 h-7 flex items-center justify-center bg-white/20 rounded hover:bg-white/30 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <span className="text-xs font-medium text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
