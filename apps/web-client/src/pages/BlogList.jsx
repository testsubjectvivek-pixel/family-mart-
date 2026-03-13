import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogs, getFeaturedBlogs } from '../store/slices/blogSlice';
import { Loader, ArrowRight } from 'lucide-react';

function BlogList() {
  const dispatch = useDispatch();
  const { blogs, featuredBlogs, loading, pagination } = useSelector(state => state.blog);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(getFeaturedBlogs());
    dispatch(getBlogs({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBlogs({ page: 1, limit: 10, category: category || undefined }));
  }, [category, dispatch]);

  const categories = [
    { value: '', label: 'All' },
    { value: 'tips', label: 'Tips' },
    { value: 'recipes', label: 'Recipes' },
    { value: 'health', label: 'Health' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'offers', label: 'Offers' }
  ];

  const loadMore = () => {
    dispatch(getBlogs({ page: pagination.page + 1, limit: 10, category: category || undefined }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">FamilyMart Blog</h1>
          <p className="text-white/90">Tips, recipes, and latest updates from FamilyMart</p>
        </div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredBlogs.slice(0, 3).map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <span className="text-xs font-medium text-blinkit-green bg-blinkit-green/10 px-2 py-1 rounded-full capitalize">
                      {blog.category}
                    </span>
                    <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{blog.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat.value
                  ? 'bg-blinkit-green text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blinkit-green" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blogs found</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-blinkit-green bg-blinkit-green/10 px-2 py-1 rounded-full capitalize">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-1 text-blinkit-green text-sm font-medium mt-4">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pagination.page < pagination.pages && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 border border-blinkit-green text-blinkit-green font-medium rounded-lg hover:bg-blinkit-green hover:text-white transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BlogList;
