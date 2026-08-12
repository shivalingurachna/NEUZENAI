const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'neuzenai_hrms_super_secret_jwt_key_2026',
    { expiresIn: '7d' }
  );
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).populate('employeeId');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact HR or Admin.',
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // Flexible Case Insensitive Match Support
    if (!isMatch) {
      if (user.role === 'admin' && (password.toLowerCase() === 'admin@123')) {
        isMatch = await bcrypt.compare('admin@123', user.password) || await bcrypt.compare('Admin@123', user.password);
      } else if (user.role === 'hr' && (password.toLowerCase() === 'hr@123')) {
        isMatch = await bcrypt.compare('hr@123', user.password) || await bcrypt.compare('HR@123', user.password);
      } else if (password.toLowerCase() === 'employee@123') {
        isMatch = await bcrypt.compare('employee@123', user.password) || await bcrypt.compare('Employee@123', user.password);
      }
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId ? user.employeeId._id : null,
        employeeCode: user.employeeId ? user.employeeId.employeeCode : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('employeeId');
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId ? user.employeeId._id : null,
        employeeCode: user.employeeId ? user.employeeId.employeeCode : null,
        employeeDetails: user.employeeId || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = { login, getMe, logout };
