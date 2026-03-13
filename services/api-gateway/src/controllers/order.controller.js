const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const { sendOrderConfirmationEmail } = require('../utils/email.utils');
const config = require('../config');

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { addressId, deliverySlot, deliveryDate, paymentMethod, cartItems } = req.body;

    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find address
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Calculate totals
    let subtotal = 0;
    let tax = 0;
    let totalAmount = 0;

    // Process cart items
    const items = await Promise.all(cartItems.map(async (item) => {
      // Find product
      const product = await Product.findById(item.productId);
      
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      // Check if user has a specific GST rate or use category's
      const gstRate = product.GSTRate || (product.category && product.category.GSTRate) || 5;

      const itemPrice = (product.discountedPrice || product.price) * item.quantity;
      const itemTax = (itemPrice * gstRate) / 100;

      subtotal += itemPrice;
      tax += itemTax;

      return {
        product: product._id,
        productName: product.name,
        productImage: product.images[0]?.url || '',
        quantity: item.quantity,
        price: itemPrice + itemTax // Include tax in per item price
      };
    }));

    // Calculate total
    totalAmount = subtotal + tax + (config.deliveryCharges?.standard || 40);

    // Create order
    const order = await Order.create({
      user: req.user.id,
      orderNumber: Order.generateOrderNumber(),
      items,
      subtotal,
      tax,
      deliveryCharges: config.deliveryCharges?.standard || 40,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'completed' : 'pending',
      status: 'pending',
      deliveryAddress: {
        fullName: address.fullName,
        street: address.street,
        city: address.city,
        pincode: address.pincode,
        phone: address.phone,
        landmark: address.landmark
      },
      deliverySlot,
      deliveryDate
    });

    // Update product stock
    await Promise.all(cartItems.map(async (item) => {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }));

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(user.email, order);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the order if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/me
// @access  Private
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images price');

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'super-admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Super Admin, Order Manager)
const getOrders = async (req, res) => {
  try {
    const { status, page, limit } = req.query;

    const filter = status ? { status } : {};

    const currentPage = Number(page) || 1;
    const ordersPerPage = Number(limit) || 20;
    const skip = (currentPage - 1) * ordersPerPage;

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(ordersPerPage);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage,
          ordersPerPage,
          total,
          totalPages: Math.ceil(total / ordersPerPage)
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

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Super Admin, Order Manager)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Validate status transition
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['packed', 'cancelled'],
      packed: ['out_for_delivery'],
      out_for_delivery: ['delivered'],
      delivered: []
    };

    if (!validTransitions[order.status]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${order.status} to ${status}`
      });
    }

    order.status = status;
    await order.save();

    // Send email notification
    try {
      await sendOrderStatusUpdateEmail(order.user.email, order, status);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrder,
  getOrders,
  updateOrderStatus
};
