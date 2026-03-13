const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dt88zbwdt',
  api_key: process.env.CLOUDINARY_API_KEY || '937254738876683',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'aUWweDSeCwpINyCbGAyR8G8UMC4'
});

module.exports = cloudinary;
