function SkeletonLoader({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'product':
        return (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="flex justify-between items-center mt-2">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-200 rounded-lg w-16" />
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
            <div className="flex items-center gap-4 py-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="border-b border-gray-100">
              <div className="flex gap-4 p-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-4 bg-gray-200 rounded flex-1" />
                ))}
              </div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border-b border-gray-50">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        );

      case 'avatar':
        return (
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
          </div>
        );

      case 'image':
        return (
          <div className="animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-xl" />
          </div>
        );

      default:
        return (
          <div className="bg-gray-200 rounded animate-pulse h-4 w-full" />
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="grid gap-4" style={{ 
      gridTemplateColumns: type === 'product' 
        ? 'repeat(auto-fill, minmax(200px, 1fr))' 
        : 'repeat(auto-fill, minmax(300px, 1fr))' 
    }}>
      {[...Array(count)].map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
