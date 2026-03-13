import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogBySlug, clearCurrentBlog } from '../store/slices/blogSlice';
import { Loader, ArrowLeft, Calendar, User, Eye, ArrowRight } from 'lucide-react';

function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentBlog, loading, error } = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(getBlogBySlug(slug));
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [slug, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-app">
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blinkit-green" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-app">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Blog not found</h2>
            <p className="text-gray-500 mb-4">The blog you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-blinkit-green font-medium hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blinkit-green mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          {currentBlog.featuredImage && (
            <img
              src={currentBlog.featuredImage}
              alt={currentBlog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm font-medium text-blinkit-green bg-blinkit-green/10 px-3 py-1 rounded-full capitalize">
                {currentBlog.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(currentBlog.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <User className="w-4 h-4" />
                {currentBlog.author}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                {currentBlog.views} views
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {currentBlog.title}
            </h1>

            <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: currentBlog.content }} />

            {currentBlog.tags && currentBlog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {currentBlog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogDetail;
