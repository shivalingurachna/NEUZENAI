const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { employeeValidation } = require('../validators/hrmsValidators');

// All employee routes require authentication and HR/Admin permissions
router.use(authenticateUser);
router.use(requireRole('admin', 'hr'));

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', employeeValidation, createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
