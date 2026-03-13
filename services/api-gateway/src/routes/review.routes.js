const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

router.route('/:id')
  .get(reviewController.getReviewById)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

router.put('/:id/helpful', reviewController.markHelpful);

module.exports = router;
