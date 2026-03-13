import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct, clearError } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (quantity = 1) => {
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  const stockLeft = product.stock;
  const isLowStock = stockLeft <= 10;
  const isOutOfStock = stockLeft <= 0;
  const images = product.images?.length > 0 ? product.images : [{ url: 'https://placehold.co/800x800' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category?._id}`} className="hover:text-primary transition-colors">
          {product.category?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square">
            <img
              src={images[selectedImage]?.url}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-danger text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img.url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${product.ratingsAverage >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                <span className="font-medium text-gray-900">{product.ratingsAverage?.toFixed(1)}</span>
                <span className="mx-1">·</span>
                {product.ratingsQuantity} reviews
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium text-gray-900">{product.brand}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Unit</span>
              <span className="font-medium text-gray-900">{product.unit}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-500">Category</span>
              <Link to={`/products?category=${product.category?._id}`} className="font-medium text-primary hover:underline">
                {product.category?.name}
              </Link>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Availability</span>
              <span className={`font-medium ${isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : 'text-success'}`}>
                {isOutOfStock ? 'Out of Stock' : isLowStock ? `Only ${stockLeft} left!` : 'In Stock'}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleAddToCart(1)}
              disabled={isOutOfStock}
              className={`flex-1 btn-primary py-4 text-lg font-semibold ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="px-8 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
