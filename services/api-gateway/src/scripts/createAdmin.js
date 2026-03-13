require('dotenv').config({ path: require('path').resolve(__dirname, '../../../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB');

    const superAdminExists = await User.findOne({ role: 'super-admin' });

    if (superAdminExists) {
      console.log('Super-admin user already exists:', superAdminExists.email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('Admin@12345', salt);

    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'admin@store.com',
      phone: '9876543210',
      password: hashedPassword,
      role: 'super-admin',
      isActive: true
    });

    console.log('✓ Admin user created successfully');
    console.log('Email: admin@store.com');
    console.log('Password: Admin@12345');
    console.log('⚠️  Please change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating super-admin:', error);
    process.exit(1);
  }
};

createAdmin();
