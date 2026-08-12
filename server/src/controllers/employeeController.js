const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const User = require('../models/User');

// GET /api/employees
const getEmployees = async (req, res, next) => {
  try {
    const { department, search, status } = req.query;
    let query = {};

    if (department) {
      query.department = department;
    }
    if (status) {
      query.employmentStatus = status;
    }
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { employeeCode: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
      ];
    }

    const employees = await Employee.find(query)
      .populate('user', 'email name role isActive')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/employees/:id
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('user', 'email name role isActive');
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/employees
const createEmployee = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = 'employee',
      phone,
      department,
      designation,
      joiningDate,
      salary,
      bankDetails,
      address,
    } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Generate Employee Code
    const count = await Employee.countDocuments();
    const employeeCode = `NZ-${String(count + 101).padStart(4, '0')}`;

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || 'Employee@123', salt);

    // Create User
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'employee',
    });

    // Create Employee record
    const employee = await Employee.create({
      user: user._id,
      employeeCode,
      firstName,
      lastName,
      phone: phone || '',
      department: department || 'General',
      designation: designation || 'Staff',
      joiningDate: joiningDate || Date.now(),
      employmentStatus: 'active',
      salary: salary || { basicSalary: 30000, allowances: 5000, deductions: 2000 },
      bankDetails: bankDetails || {},
      address: address || '',
    });

    // Link user to employeeId
    user.employeeId = employee._id;
    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/employees/:id
const updateEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, department, designation, employmentStatus, salary, bankDetails, address } = req.body;

    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (phone !== undefined) employee.phone = phone;
    if (department) employee.department = department;
    if (designation) employee.designation = designation;
    if (employmentStatus) employee.employmentStatus = employmentStatus;
    if (salary) employee.salary = { ...employee.salary, ...salary };
    if (bankDetails) employee.bankDetails = { ...employee.bankDetails, ...bankDetails };
    if (address !== undefined) employee.address = address;

    await employee.save();

    // Sync user name
    if (firstName || lastName) {
      await User.findByIdAndUpdate(employee.user, {
        name: `${employee.firstName} ${employee.lastName}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/employees/:id
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Soft delete / deactivate user
    employee.employmentStatus = 'terminated';
    await employee.save();

    if (employee.user) {
      await User.findByIdAndUpdate(employee.user, { isActive: false });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee account deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
