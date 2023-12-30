// middleware/isLoggedIn.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const isLoggedIn = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = isLoggedIn;
