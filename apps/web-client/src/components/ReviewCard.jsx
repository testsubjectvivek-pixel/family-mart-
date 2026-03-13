import { useState } from 'react';
import RatingStars from './RatingStars';

function ReviewCard({ review, onHelpful }) {
  const [helpfulCount, setHelpfulCount] = useState(review?.helpful || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
      onHelpful?.(review._id);
    }
  };

  if (!review) return null;

  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
              {review.user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {review.user?.name || 'Anonymous'}
              </p>
              <div className="flex items-center gap-2">
                <RatingStars rating={review.rating} size="sm" />
                <span className="text-xs text-gray-500">• {formattedDate}</span>
              </div>
            </div>
          </div>

          {review.title && (
            <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
          )}

          {review.comment && (
            <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
          )}

          {review.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Review image ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          )}

          {review.isVerifiedPurchase && (
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Purchase
            </div>
          )}
        </div>

        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            hasVoted 
              ? 'bg-primary/10 text-primary' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Helpful ({helpfulCount})
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
