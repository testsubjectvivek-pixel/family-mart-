require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '15m',
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || '7d',
  cloudinaryUrl: process.env.CLOUDINARY_URL,
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'family-mart',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@familymart.com',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  serverUrl: process.env.SERVER_URL || 'http://localhost:5000',
  Delhipincodes: [
    '110001', '110002', '110003', '110004', '110005', '110006', '110007', '110008', '110009', '110010',
    '110011', '110012', '110013', '110014', '110015', '110016', '110017', '110018', '110019', '110020',
    '110021', '110022', '110023', '110024', '110025', '110026', '110027', '110028', '110029', '110030',
    '110031', '110032', '110033', '110034', '110035', '110036', '110037', '110038', '110039', '110040',
    '110041', '110042', '110043', '110044', '110045', '110046', '110047', '110048', '110049', '110050',
    '110051', '110052', '110053', '110054', '110055', '110056', '110057', '110058', '110059', '110060'
  ],
  deliveryCharges: {
    standard: 40,
    freeFrom: 499
  },
  stockAlertThreshold: 10,
  productsPerPage: 20
};
