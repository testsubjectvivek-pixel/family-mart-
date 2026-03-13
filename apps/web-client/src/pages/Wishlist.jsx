import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ productId: item.productId, quantity: 1 }));
    dispatch(removeFromWishlist(item.productId));
    toast.success('Moved to cart');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonLoader key={i} type="product" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          type="wishlist"
          title="Your wishlist is empty"
          description="Save items you love by clicking the heart icon"
          actionText="Start Shopping"
          actionLink="/products"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard
              key={item.productId}
              product={item.product}
              showWishlistButton={true}
              onWishlistRemove={() => handleRemove(item.productId)}
              onMoveToCart={() => handleMoveToCart(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
