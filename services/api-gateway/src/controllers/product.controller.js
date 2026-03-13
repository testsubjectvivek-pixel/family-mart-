const Product = require('../models/Product.model');
const Category = require('../models/Category.model');
const config = require('../config');

// @desc    Create product
// @route   POST /api/products
// @access  Private (Super Admin, Product Manager)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountedPrice, category, images, stock, unit, brand, weight, tags, GSTRate } = req.body;

    // Check if category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Create slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this name already exists'
      });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      discountedPrice,
      category,
      images,
      stock,
      unit,
      brand,
      weight,
      tags,
      GSTRate
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, sort, page, limit } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (brand) {
      filter.brand = brand;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    const sortOptions = {
      price: { price: 1 },
      '-price': { price: -1 },
      newest: { createdAt: -1 },
      popular: { ratingsAverage: -1 }
    };

    const sortOption = sortOptions[sort] || { createdAt: -1 };

    // Pagination
    const currentPage = Number(page) || 1;
    const productsPerPage = Number(limit) || config.productsPerPage;
    const skip = (currentPage - 1) * productsPerPage;

    // Execute query
    const products = await Product.find(filter)
      .populate('category')
      .sort(sortOption)
      .skip(skip)
      .limit(productsPerPage);

    // Get total count
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage,
          productsPerPage,
          total,
          totalPages: Math.ceil(total / productsPerPage)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Super Admin, Product Manager)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, discountedPrice, category, images, stock, unit, brand, weight, tags, GSTRate, isActive } = req.body;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update fields
    if (name) {
      product.name = name;
      product.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (description) product.description = description;
    if (price) product.price = price;
    if (discountedPrice) product.discountedPrice = discountedPrice;
    if (category) product.category = category;
    if (images) product.images = images;
    if (stock !== undefined) product.stock = stock;
    if (unit) product.unit = unit;
    if (brand) product.brand = brand;
    if (weight) product.weight = weight;
    if (tags) product.tags = tags;
    if (GSTRate !== undefined) product.GSTRate = GSTRate;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Super Admin, Product Manager)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q, category, brand, minPrice, maxPrice } = req.query;

    // Build search query
    const searchQuery = { isActive: true };

    if (q) {
      searchQuery.$text = { $search: q };
    }

    if (category) {
      searchQuery.category = category;
    }

    if (brand) {
      searchQuery.brand = brand;
    }

    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(searchQuery)
      .populate('category')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get popular products
// @route   GET /api/products/popular
// @access  Public
const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      isActive: true,
      ratingsAverage: { $gte: 4 }
    })
      .populate('category')
      .sort({ ratingsAverage: -1 })
      .limit(8);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get recent products
// @route   GET /api/products/recent
// @access  Public
const getRecentProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getPopularProducts,
  getRecentProducts
};
