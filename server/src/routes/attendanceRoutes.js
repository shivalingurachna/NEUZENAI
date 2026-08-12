const express = require('express');
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require('../controllers/attendanceController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.use(authenticateUser);

// Employee specific routes
router.post('/check-in', checkIn);
router.put('/check-out', checkOut);
router.get('/my', getMyAttendance);

// HR and Admin view for company-wide attendance
router.get('/', requireRole('admin', 'hr'), getAllAttendance);

module.exports = router;
