require('dotenv').config({ path: require('path').resolve(__dirname, '../../../../.env') });
const mongoose = require('mongoose');

console.log('MONGODB_URI:', process.env.MONGODB_URI);
const Category = require('../models/Category.model');

const categoriesData = [
  {
    name: 'Fruits & Vegetables',
    description: 'Fresh fruits and vegetables',
    image: 'https://images.unsplash.com/photo-1626975039195-418593006595?w=400',
    gstRate: 5
  },
  {
    name: 'Dairy, Bread \u0026 Eggs',
    description: 'Fresh dairy products and bread',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    gstRate: 5
  },
  {
    name: 'Grains, Oil \u0026 Masala',
    description: 'Essential grains, oils and spices',
    image: 'https://images.unsplash.com/photo-1604578691393-b478f6627830?w=400',
    gstRate: 5
  },
  {
    name: 'Beverages',
    description: 'Soft drinks, juices and health drinks',
    image: 'https://images.unsplash.com/photo-1517486808906-6df55877943c?w=400',
    gstRate: 12
  },
  {
    name: 'Snacks \u0026 Branded Food',
    description: 'Chips, cookies, chocolates and more',
    image: 'https://images.unsplash.com/photo-1614099706767-854657586a46?w=400',
    gstRate: 12
  },
  {
    name: 'Home \u0026 Cleaning',
    description: 'Cleaning essentials and household items',
    image: 'https://images.unsplash.com/photo-1581578017041-38915a84d151?w=400',
    gstRate: 18
  },
  {
    name: 'Personal Care',
    description: 'Cosmetics, toiletries and personal hygiene',
    image: 'https://images.unsplash.com/photo-1593357613982-f689119a8b69?w=400',
    gstRate: 12
  }
];

const createCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log('Categories already exist. Skipping...');
      process.exit(0);
    }

    // Create categories
    const createdCategories = await Category.insertMany(categoriesData);

    console.log(`✓ Created ${createdCategories.length} categories`);

    createdCategories.forEach(cat => {
      console.log(`  - ${cat.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating categories:', error);
    process.exit(1);
  }
};

createCategories();
