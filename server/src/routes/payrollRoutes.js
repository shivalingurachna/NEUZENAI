const express = require('express');
const router = express.Router();
const {
  getMyPayroll,
  getAllPayroll,
  processPayroll,
  getPayrollById,
} = require('../controllers/payrollController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.use(authenticateUser);

router.get('/my', getMyPayroll);
router.get('/', requireRole('admin', 'hr'), getAllPayroll);
router.post('/process', requireRole('admin', 'hr'), processPayroll);
router.get('/:id', getPayrollById);

module.exports = router;
