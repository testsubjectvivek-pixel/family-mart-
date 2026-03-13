const Blog = require('../models/Blog.model');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const { page = 1, limit = 10, category } = req.query;
      
      const query = { isPublished: true };
      if (category) {
        query.category = category;
      }
      
      const blogs = await Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      
      const total = await Blog.countDocuments(query);
      
      res.json({
        success: true,
        data: blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getBlogBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      
      const blog = await Blog.findOne({ slug, isPublished: true });
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      
      blog.views += 1;
      await blog.save();
      
      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getFeaturedBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({ isPublished: true })
        .sort({ views: -1, publishedAt: -1 })
        .limit(5);
      
      res.json({
        success: true,
        data: blogs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Blog.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = blogController;
