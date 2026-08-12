const LeaveRequest = require('../models/LeaveRequest');
const Employee = require('../models/Employee');
const CalendarEvent = require('../models/CalendarEvent');

// POST /api/leaves
const applyLeave = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee record not found.',
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date cannot be prior to start date.',
      });
    }

    const leave = await LeaveRequest.create({
      employee: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      leave,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/leaves/my
const getMyLeaves = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found.',
      });
    }

    const leaves = await LeaveRequest.find({ employee: employee._id })
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/leaves (Admin & HR)
const getAllLeaves = async (req, res, next) => {
  try {
    const { status, leaveType } = req.query;
    let query = {};

    if (status) query.status = status;
    if (leaveType) query.leaveType = leaveType;

    const leaves = await LeaveRequest.find(query)
      .populate('employee', 'firstName lastName employeeCode department designation')
      .populate('reviewedBy', 'name role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/leaves/:id/approve
const approveLeave = async (req, res, next) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id).populate('employee');
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found.',
      });
    }

    leave.status = 'approved';
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    leave.reviewComment = req.body.comment || 'Approved';

    await leave.save();

    // Sync to Shared Calendar
    if (leave.employee) {
      await CalendarEvent.create({
        title: `Leave: ${leave.employee.firstName} ${leave.employee.lastName} (${leave.leaveType})`,
        type: 'leave',
        startDate: leave.startDate,
        endDate: leave.endDate,
        description: `Approved Leave: ${leave.reason}`,
        createdBy: req.user._id,
        visibility: 'all',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Leave approved and added to team calendar.',
      leave,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/leaves/:id/reject
const rejectLeave = async (req, res, next) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found.',
      });
    }

    leave.status = 'rejected';
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    leave.reviewComment = req.body.comment || 'Rejected by HR/Admin';

    await leave.save();

    return res.status(200).json({
      success: true,
      message: 'Leave request rejected.',
      leave,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};
