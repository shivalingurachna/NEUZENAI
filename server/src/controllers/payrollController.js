const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

// GET /api/payroll/my
const getMyPayroll = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee record not found.',
      });
    }

    const payslips = await Payroll.find({ employee: employee._id })
      .populate('processedBy', 'name role')
      .sort({ year: -1, month: -1 });

    return res.status(200).json({
      success: true,
      count: payslips.length,
      payslips,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payroll (Admin & HR)
const getAllPayroll = async (req, res, next) => {
  try {
    const { month, year, employeeId } = req.query;
    let query = {};

    if (month) query.month = Number(month);
    if (year) query.year = Number(year);
    if (employeeId) query.employee = employeeId;

    const payslips = await Payroll.find(query)
      .populate('employee', 'firstName lastName employeeCode department designation bankDetails')
      .populate('processedBy', 'name role')
      .sort({ year: -1, month: -1 });

    return res.status(200).json({
      success: true,
      count: payslips.length,
      payslips,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/payroll/process (Admin & HR)
const processPayroll = async (req, res, next) => {
  try {
    const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

    let employeesToProcess = [];
    if (employeeId) {
      const emp = await Employee.findById(employeeId);
      if (!emp) {
        return res.status(404).json({
          success: false,
          message: 'Target employee not found',
        });
      }
      employeesToProcess.push(emp);
    } else {
      // Process for all active employees
      employeesToProcess = await Employee.find({ employmentStatus: 'active' });
    }

    const processedPayrolls = [];
    const errors = [];

    for (const emp of employeesToProcess) {
      try {
        const basic = basicSalary !== undefined ? Number(basicSalary) : (emp.salary?.basicSalary || 30000);
        const allow = allowances !== undefined ? Number(allowances) : (emp.salary?.allowances || 5000);
        const deduct = deductions !== undefined ? Number(deductions) : (emp.salary?.deductions || 2000);
        const net = basic + allow - deduct;

        // Upsert payroll record
        const payroll = await Payroll.findOneAndUpdate(
          { employee: emp._id, month: Number(month), year: Number(year) },
          {
            basicSalary: basic,
            allowances: allow,
            deductions: deduct,
            netSalary: net,
            paymentStatus: 'processed',
            processedBy: req.user._id,
          },
          { new: true, upsert: true }
        );

        processedPayrolls.push(payroll);
      } catch (err) {
        errors.push({ employee: emp.employeeCode, error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Processed payroll for ${processedPayrolls.length} employee(s)`,
      processedCount: processedPayrolls.length,
      processedPayrolls,
      errors,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payroll/:id
const getPayrollById = async (req, res, next) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('employee')
      .populate('processedBy', 'name role');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payslip record not found',
      });
    }

    return res.status(200).json({
      success: true,
      payroll,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyPayroll,
  getAllPayroll,
  processPayroll,
  getPayrollById,
};
