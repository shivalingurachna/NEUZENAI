const { body, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  };
};

const loginValidation = validate([
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').notEmpty().withMessage('Password is required'),
]);

const employeeValidation = validate([
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email address is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
]);

const leaveValidation = validate([
  body('leaveType').isIn(['casual', 'sick', 'earned', 'unpaid']).withMessage('Invalid leave type'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('reason').trim().notEmpty().withMessage('Reason is required'),
]);

const offerValidation = validate([
  body('candidateName').trim().notEmpty().withMessage('Candidate name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('salary.basicSalary').isNumeric().withMessage('Basic salary must be a number'),
]);

const payrollValidation = validate([
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('month').isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),
  body('year').isInt({ min: 2020 }).withMessage('Valid year is required'),
]);

module.exports = {
  loginValidation,
  employeeValidation,
  leaveValidation,
  offerValidation,
  payrollValidation,
};
