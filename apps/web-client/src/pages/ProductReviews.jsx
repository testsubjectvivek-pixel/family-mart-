import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, markHelpful } from '../store/slices/reviewSlice';
import ReviewCard from '../components/ReviewCard';
import RatingStars from '../components/RatingStars';
import SkeletonLoader from '../components/SkeletonLoader';

function ProductReviews() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { reviews, loading, error, pagination, stats } = useSelector((state) => state.reviews);
  
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchReviews({ productId }));
  }, [dispatch, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await dispatch(addReview({
        productId,
        ...newReview
      })).unwrap();
      
      setNewReview({ rating: 5, title: '', comment: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = (reviewId) => {
    dispatch(markHelpful(reviewId));
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews
          </h3>
          {stats?.averageRating && (
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={stats.averageRating} showValue size="md" />
              <span className="text-sm text-gray-500">
                ({stats.totalReviews} reviews)
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-4 py-2"
        >
          Write a Review
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h4 className="font-medium text-gray-900 mb-4">Write Your Review</h4>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <RatingStars
                rating={newReview.rating}
                onRatingChange={(value) => setNewReview(prev => ({ ...prev, rating: value }))}
                size="lg"
                interactive
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Summarize your review"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={100}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Share your experience with this product"
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                maxLength={1000}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {newReview.comment.length}/1000 characters
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-6 py-2.5"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonLoader key={i} type="list" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">No reviews yet</h4>
          <p className="text-sm text-gray-500 mb-4">Be the first to review this product</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary px-6 py-2.5"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onHelpful={handleHelpful}
            />
          ))}
        </div>
      )}

      {pagination?.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(pagination.pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => dispatch(fetchReviews({ productId, page: i + 1 }))}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${
                pagination.page === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
