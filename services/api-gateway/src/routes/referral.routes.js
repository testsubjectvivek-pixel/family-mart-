const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/code', referralController.getReferralCode);
router.post('/apply', referralController.applyReferralCode);
router.get('/stats', referralController.getReferralStats);

module.exports = router;
