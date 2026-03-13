require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');

const createOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB');

    // Check if orders already exist
    const existingOrders = await Order.countDocuments();
    if (existingOrders > 0) {
      console.log('Sample orders already exist. Skipping...');
      process.exit(0);
    }

    // Get sample users
    const users = await User.find({ role: 'user' }).limit(3);
    if (users.length === 0) {
      console.error('No users found. Please run seed:users first.');
      process.exit(1);
    }

    // Get sample products
    const products = await Product.find().limit(5);
    if (products.length === 0) {
      console.error('No products found. Please run seed:products first.');
      process.exit(1);
    }

    // Sample orders data
    const ordersData = [
      {
        user: users[0]._id,
        items: [
          {
            product: products[0]._id,
            productName: products[0].name,
            productImage: products[0].images[0]?.url || '',
            quantity: 2,
            price: products[0].price
          },
          {
            product: products[1]._id,
            productName: products[1].name,
            productImage: products[1].images[0]?.url || '',
            quantity: 1,
            price: products[1].price
          }
        ],
        subtotal: (products[0].price * 2) + products[1].price,
        tax: Math.round(((products[0].price * 2) + products[1].price) * 0.05),
        deliveryCharges: 40,
        paymentMethod: 'razorpay',
        paymentStatus: 'completed',
        status: 'delivered',
        deliveryAddress: {
          fullName: users[0].name,
          street: users[0].addresses?.[0]?.addressLine || '123 Test Street',
          city: 'New Delhi',
          pincode: users[0].addresses?.[0]?.pincode || '110001',
          phone: users[0].phone,
          landmark: 'Near Metro Station'
        },
        deliverySlot: '9-12',
        deliveryDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        razorpayOrderId: 'order_test_001',
        razorpayPaymentId: 'pay_test_001',
        razorpaySignature: 'signature_001'
      },
      {
        user: users[1]._id,
        items: [
          {
            product: products[2]._id,
            productName: products[2].name,
            productImage: products[2].images[0]?.url || '',
            quantity: 1,
            price: products[2].price
          }
        ],
        subtotal: products[2].price,
        tax: Math.round(products[2].price * 0.05),
        deliveryCharges: 40,
        paymentMethod: 'cod',
        paymentStatus: 'completed',
        status: 'out_for_delivery',
        deliveryAddress: {
          fullName: users[1].name,
          street: users[1].addresses?.[0]?.addressLine || '456 Test Avenue',
          city: 'New Delhi',
          pincode: users[1].addresses?.[0]?.pincode || '110048',
          phone: users[1].phone,
          landmark: 'Opposite Park'
        },
        deliverySlot: '12-3',
        deliveryDate: new Date(),
        razorpayOrderId: null,
        razorpayPaymentId: null,
        razorpaySignature: null
      },
      {
        user: users[2]?._id || users[0]._id,
        items: [
          {
            product: products[3]._id,
            productName: products[3].name,
            productImage: products[3].images[0]?.url || '',
            quantity: 3,
            price: products[3].price
          },
          {
            product: products[4]._id,
            productName: products[4].name,
            productImage: products[4].images[0]?.url || '',
            quantity: 1,
            price: products[4].price
          }
        ],
        subtotal: (products[3].price * 3) + products[4].price,
        tax: Math.round(((products[3].price * 3) + products[4].price) * 0.12),
        deliveryCharges: 40,
        paymentMethod: 'razorpay',
        paymentStatus: 'completed',
        status: 'confirmed',
        deliveryAddress: {
          fullName: users[2]?.name || users[0].name,
          street: users[2]?.addresses?.[0]?.addressLine || '789 Test Road',
          city: 'New Delhi',
          pincode: users[2]?.addresses?.[0]?.pincode || '110001',
          phone: users[2]?.phone || users[0].phone,
          landmark: 'Near Mall'
        },
        deliverySlot: '3-6',
        deliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        razorpayOrderId: 'order_test_003',
        razorpayPaymentId: 'pay_test_003',
        razorpaySignature: 'signature_003'
      }
    ];

    // Calculate totalAmount for each order
    ordersData.forEach(order => {
      order.totalAmount = order.subtotal + order.tax + order.deliveryCharges;
      order.orderNumber = Order.generateOrderNumber();
    });

    // Create orders
    const createdOrders = await Order.insertMany(ordersData);

    console.log(`\n✓ Created ${createdOrders.length} sample orders`);
    console.log('\nSample Orders:');
    createdOrders.forEach(order => {
      console.log(`  - ${order.orderNumber}: ${order.status} - ₹${order.totalAmount}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating sample orders:', error);
    process.exit(1);
  }
};

createOrders();
