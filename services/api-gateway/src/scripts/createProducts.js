require('dotenv').config({ path: require('path').resolve(__dirname, '../../../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');

const createProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('Products already exist. Skipping...');
      process.exit(0);
    }

    // Get category IDs
    const categories = await Category.find({}, '_id name');
    const categoryMap = new Map();
    categories.forEach(cat => {
      categoryMap.set(cat.name, cat._id);
    });

    // Sample products for Delhi market
    const products = [
      // Fruits & Vegetables
      {
        name: 'Aloo (Potato) - 1 kg',
        slug: 'aloo-potato-1kg',
        description: 'Fresh potatoes, perfect for home cooking',
        price: 45,
        discountedPrice: 39,
        category: categoryMap.get('Fruits & Vegetables'),
        images: [
          { url: 'https://images.unsplash.com/photo-1540338852428-2725a095761b?w=400', publicId: 'potato-1kg' }
        ],
        stock: 500,
        unit: 'kg',
        brand: 'Local Farm',
        GSTRate: 5,
        ratingsAverage: 4.5,
        ratingsQuantity: 10
      },
      {
        name: 'Gajar (Carrot) - 500 g',
        description: 'Fresh carrots, rich in vitamin A',
        price: 35,
        category: categoryMap.get('Fruits & Vegetables'),
        images: [
          { url: 'https://images.unsplash.com/photo-1518883546833-103435596314?w=400', publicId: 'carrot-500g' }
        ],
        stock: 300,
        unit: 'pack',
        brand: 'Local Farm',
        GSTRate: 5
      },
      {
        name: 'Aam (Mango) - 1 kg',
        description: 'Seasonal fresh mangoes',
        price: 180,
        discountedPrice: 150,
        category: categoryMap.get('Fruits & Vegetables'),
        images: [
          { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400', publicId: 'mango-1kg' }
        ],
        stock: 100,
        unit: 'kg',
        brand: 'Seasonal',
        GSTRate: 5
      },
      // Dairy, Bread & Eggs
      {
        name: 'Full Cream Milk - 500 ml',
        description: 'Fresh farm milk, rich in calcium',
        price: 32,
        category: categoryMap.get('Dairy, Bread & Eggs'),
        images: [
          { url: 'https://images.unsplash.com/photo-1563503736592-d37d08923390?w=400', publicId: 'milk-500ml' }
        ],
        stock: 200,
        unit: 'pack',
        brand: 'Fresh Dairy',
        GSTRate: 5
      },
      {
        name: 'Paneer - 200 g',
        description: 'Fresh cottage cheese',
        price: 120,
        category: categoryMap.get('Dairy, Bread & Eggs'),
        images: [
          { url: 'https://images.unsplash.com/photo-1563503736592-d37d08923390?w=400', publicId: 'paneer-200g' }
        ],
        stock: 50,
        unit: 'pack',
        brand: 'Fresh Dairy',
        GSTRate: 5
      },
      {
        name: 'Eggs (6 count)',
        description: 'Fresh farm eggs',
        price: 66,
        category: categoryMap.get('Dairy, Bread & Eggs'),
        images: [
          { url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', publicId: 'eggs-6count' }
        ],
        stock: 100,
        unit: 'pack',
        brand: 'Fresh Eggs',
        GSTRate: 5
      },
      // Grains, Oil & Masala
      {
        name: 'Atta (Wheat Flour) - 5 kg',
        description: 'Whole wheat flour for chapati',
        price: 240,
        discountedPrice: 210,
        category: categoryMap.get('Grains, Oil & Masala'),
        images: [
          { url: 'https://images.unsplash.com/photo-1604578691393-b478f6627830?w=400', publicId: 'atta-5kg' }
        ],
        stock: 150,
        unit: 'pack',
        brand: 'Whole Wheat',
        GSTRate: 5
      },
      {
        name: 'Turmeric Powder (Haldi) - 100 g',
        description: 'Pure turmeric powder',
        price: 45,
        category: categoryMap.get('Grains, Oil & Masala'),
        images: [
          { url: 'https://images.unsplash.com/photo-1586528446358-fd5076c0362f?w=400', publicId: 'haldi-100g' }
        ],
        stock: 80,
        unit: 'pack',
        brand: 'Natural',
        GSTRate: 5
      },
      {
        name: 'Groundnut Oil - 1 l',
        description: 'Pure groundnut cooking oil',
        price: 160,
        category: categoryMap.get('Grains, Oil & Masala'),
        images: [
          { url: 'https://images.unsplash.com/photo-1597843786013-114af202722c?w=400', publicId: 'groundnut-oil-1l' }
        ],
        stock: 60,
        unit: 'pack',
        brand: 'Pure Oil',
        GSTRate: 5
      },
      // Beverages
      {
        name: 'Cola - 750 ml',
        description: 'Refreshing cola drink',
        price: 45,
        category: categoryMap.get('Beverages'),
        images: [
          { url: 'https://images.unsplash.com/photo-1614850523459-c2f4c6c844b3?w=400', publicId: 'cola-750ml' }
        ],
        stock: 100,
        unit: 'pack',
        brand: 'Soft Drink',
        GSTRate: 12
      },
      {
        name: 'Lemon Juice - 1 l',
        description: 'Fresh lemon juice',
        price: 95,
        category: categoryMap.get('Beverages'),
        images: [
          { url: 'https://images.unsplash.com/photo-1591696205602-2f950c619c73?w=400', publicId: 'lemon-juice-1l' }
        ],
        stock: 50,
        unit: 'pack',
        brand: 'Fresh',
        GSTRate: 12
      },
      // Snacks & Branded Food
      {
        name: 'Salted Chips - 100 g',
        description: 'Crispy potato chips',
        price: 25,
        category: categoryMap.get('Snacks & Branded Food'),
        images: [
          { url: 'https://images.unsplash.com/photo-1566879848381-6f4bb9d6c987?w=400', publicId: 'chips-100g' }
        ],
        stock: 200,
        unit: 'pack',
        brand: 'Snack Brand',
        GSTRate: 12
      },
      {
        name: 'Dark Chocolate - 100 g',
        description: 'Premium dark chocolate',
        price: 150,
        category: categoryMap.get('Snacks & Branded Food'),
        images: [
          { url: 'https://images.unsplash.com/photo-1599488696987-3b3e54577888?w=400', publicId: 'chocolate-100g' }
        ],
        stock: 75,
        unit: 'pack',
        brand: 'Choco Delight',
        GSTRate: 12
      },
      // Home & Cleaning
      {
        name: 'Toilet Cleaner - 500 ml',
        description: 'Powerful toilet cleaner',
        price: 85,
        category: categoryMap.get('Home & Cleaning'),
        images: [
          { url: 'https://images.unsplash.com/photo-1583199350243-9b64f3803371?w=400', publicId: 'toilet-cleaner-500ml' }
        ],
        stock: 40,
        unit: 'pack',
        brand: 'Clean Home',
        GSTRate: 18
      },
      {
        name: 'Detergent Bars - Pack of 2',
        description: 'Heavy duty detergent bars',
        price: 110,
        category: categoryMap.get('Home & Cleaning'),
        images: [
          { url: 'https://images.unsplash.com/photo-1572334636690-48830995169a?w=400', publicId: 'detergent-2pack' }
        ],
        stock: 60,
        unit: 'pack',
        brand: 'White Shine',
        GSTRate: 18
      },
      // Personal Care
      {
        name: 'Toothpaste - 200 g',
        description: ' fluoride toothpaste',
        price: 95,
        category: categoryMap.get('Personal Care'),
        images: [
          { url: 'https://images.unsplash.com/photo-1606811827645-444f9698de47?w=400', publicId: 'toothpaste-200g' }
        ],
        stock: 80,
        unit: 'pack',
        brand: 'Fresh Smile',
        GSTRate: 12
      },
      {
        name: 'Shampoo - 200 ml',
        description: 'Hair nourishing shampoo',
        price: 180,
        category: categoryMap.get('Personal Care'),
        images: [
          { url: 'https://images.unsplash.com/photo-1582436785478-383293774698?w=400', publicId: 'shampoo-200ml' }
        ],
        stock: 50,
        unit: 'pack',
        brand: 'Silky Hair',
        GSTRate: 12
      }
    ];

    // Create products
    const createdProducts = await Product.insertMany(products);

    console.log(`✓ Created ${createdProducts.length} products`);

    createdProducts.forEach(prod => {
      console.log(`  - ${prod.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating products:', error);
    process.exit(1);
  }
};

createProducts();
