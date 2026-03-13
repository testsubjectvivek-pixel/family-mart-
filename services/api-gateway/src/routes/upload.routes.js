const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/auth.middleware');
const cloudinary = require('../cloudinary');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

router.post('/single', protect, authorize('super-admin', 'product-manager'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'family-mart'
    });

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});

router.post('/multiple', protect, authorize('super-admin', 'product-manager'), upload.array('images', 5), async (req, res) => {
  try {
    const images = [];
    
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'family-mart'
      });
      images.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    res.json({
      success: true,
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});

module.exports = router;
