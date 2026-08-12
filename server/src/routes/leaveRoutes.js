const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require('../controllers/leaveController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { leaveValidation } = require('../validators/hrmsValidators');

router.use(authenticateUser);

// Employee leave endpoints
router.post('/', leaveValidation, applyLeave);
router.get('/my', getMyLeaves);

// HR and Admin approval endpoints
router.get('/', requireRole('admin', 'hr'), getAllLeaves);
router.put('/:id/approve', requireRole('admin', 'hr'), approveLeave);
router.put('/:id/reject', requireRole('admin', 'hr'), rejectLeave);

module.exports = router;
