const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/categories', blogController.getCategories);
router.get('/:slug', blogController.getBlogBySlug);

module.exports = router;
