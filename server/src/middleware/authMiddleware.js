const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.',
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'neuzenai_hrms_super_secret_jwt_key_2026'
    );

    const user = await User.findById(decoded.id).populate('employeeId');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user account is deactivated.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Invalid or expired token.',
    });
  }
};

module.exports = { authenticateUser };
