const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire, refreshTokenExpire } = require('../config');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: refreshTokenExpire });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken
};
