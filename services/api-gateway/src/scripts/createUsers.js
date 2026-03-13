require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const usersData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543211',
    password: 'User@12345',
    role: 'user',
    isActive: true,
    addresses: [
      {
        name: 'Rahul Sharma',
        phone: '9876543211',
        addressLine: '123, Sector 15',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true
      }
    ]
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '9876543212',
    password: 'User@12345',
    role: 'user',
    isActive: true,
    addresses: [
      {
        name: 'Priya Patel',
        phone: '9876543212',
        addressLine: '45, Greater Kailash',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110048',
        isDefault: true
      }
    ]
  },
  {
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    phone: '9876543213',
    password: 'User@12345',
    role: 'user',
    isActive: true,
    addresses: [
      {
        name: 'Amit Kumar',
        phone: '9876543213',
        addressLine: '78, Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true
      }
    ]
  }
];

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB');

    // Check if users already exist
    const existingUsers = await User.countDocuments({ role: 'user' });
    if (existingUsers > 0) {
      console.log('Sample users already exist. Skipping...');
      process.exit(0);
    }

    // Hash passwords and create users
    const salt = await bcrypt.genSalt(12);
    
    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
      
      await User.create(userData);
      console.log(`✓ Created user: ${userData.email}`);
    }

    console.log(`\n✓ Created ${usersData.length} sample users`);
    console.log('\nSample Login Credentials:');
    console.log('Email: rahul.sharma@example.com | Password: User@12345');
    console.log('Email: priya.patel@example.com | Password: User@12345');
    console.log('Email: amit.kumar@example.com | Password: User@12345');

    process.exit(0);
  } catch (error) {
    console.error('Error creating sample users:', error);
    process.exit(1);
  }
};

createUsers();
