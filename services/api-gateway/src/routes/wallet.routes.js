const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', walletController.getWallet);
router.get('/balance', walletController.getBalance);
router.get('/transactions', walletController.getTransactions);
router.post('/add-money', walletController.addMoney);

module.exports = router;
