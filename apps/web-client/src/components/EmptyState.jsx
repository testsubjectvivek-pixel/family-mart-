import { Link } from 'react-router-dom';

function EmptyState({ 
  type = 'default',
  title,
  description,
  actionText,
  actionLink,
  action,
  icon
}) {
  const getContent = () => {
    switch (type) {
      case 'cart':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          title: title || "Your cart is empty",
          description: description || "Looks like you haven't added anything to your cart yet."
        };
      
      case 'wishlist':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
          title: title || "Your wishlist is empty",
          description: description || "Save items you love by clicking the heart icon"
        };
      
      case 'orders':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          ),
          title: title || "No orders yet",
          description: description || "Start shopping to see your orders here"
        };
      
      case 'search':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
          title: title || "No results found",
          description: description || "Try adjusting your search or filters"
        };
      
      case 'address':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          title: title || "No addresses saved",
          description: description || "Add an address to get started"
        };
      
      case 'reviews':
        return {
          icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ),
          title: title || "No reviews yet",
          description: description || "Be the first to review this product"
        };
      
      default:
        return {
          icon: icon || (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          title: title || "Nothing here yet",
          description: description || "Start by adding some content"
        };
    }
  };

  const { icon: Icon, title: Title, description: Description } = getContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
        {Icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {Title}
      </h3>
      
      <p className="text-gray-500 text-center max-w-sm mb-6">
        {Description}
      </p>
      
      {(actionText && actionLink) || action ? (
        action ? (
          <button onClick={action} className="btn-primary px-6 py-3">
            {actionText}
          </button>
        ) : (
          <Link to={actionLink || '/'} className="btn-primary px-6 py-3">
            {actionText}
          </Link>
        )
      ) : null}
    </div>
  );
}

export default EmptyState;
