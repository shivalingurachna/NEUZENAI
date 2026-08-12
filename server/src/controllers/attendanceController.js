const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Format date as YYYY-MM-DD
const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// POST /api/attendance/check-in
const checkIn = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'No associated employee record found for this account.',
      });
    }

    const todayStr = getTodayString();

    // Check if already checked in today
    const existing = await Attendance.findOne({
      employee: employee._id,
      date: todayStr,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Already checked in for today (${todayStr}) at ${new Date(existing.checkIn).toLocaleTimeString()}`,
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date: todayStr,
      checkIn: new Date(),
      status: 'present',
      remarks: req.body.remarks || 'Normal Check-In',
    });

    return res.status(201).json({
      success: true,
      message: 'Check-in recorded successfully',
      attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate check-in attempt detected for today.',
      });
    }
    next(error);
  }
};

// PUT /api/attendance/check-out
const checkOut = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found.',
      });
    }

    const todayStr = getTodayString();
    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: todayStr,
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: 'No check-in record found for today. Please check in first.',
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: `Already checked out today at ${new Date(attendance.checkOut).toLocaleTimeString()}`,
      });
    }

    attendance.checkOut = new Date();
    if (req.body.remarks) {
      attendance.remarks += ` | Checkout: ${req.body.remarks}`;
    }

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: 'Check-out recorded successfully',
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/attendance/my
const getMyAttendance = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee record not found.',
      });
    }

    const records = await Attendance.find({ employee: employee._id })
      .sort({ date: -1 })
      .limit(60);

    const todayRecord = await Attendance.findOne({
      employee: employee._id,
      date: getTodayString(),
    });

    return res.status(200).json({
      success: true,
      todayRecord,
      history: records,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/attendance (Admin & HR)
const getAllAttendance = async (req, res, next) => {
  try {
    const { date, employeeId, status } = req.query;
    let query = {};

    if (date) {
      query.date = date;
    }
    if (employeeId) {
      query.employee = employeeId;
    }
    if (status) {
      query.status = status;
    }

    const records = await Attendance.find(query)
      .populate('employee', 'firstName lastName employeeCode department designation')
      .sort({ date: -1, checkIn: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
};
