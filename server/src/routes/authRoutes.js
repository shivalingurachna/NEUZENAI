const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { loginValidation } = require('../validators/hrmsValidators');

router.post('/login', loginValidation, login);
router.get('/me', authenticateUser, getMe);
router.post('/logout', logout);

module.exports = router;
