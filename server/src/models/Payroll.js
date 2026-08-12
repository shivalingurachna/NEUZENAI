const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Number, // 1 to 12
      required: true,
    },
    year: {
      type: Number, // e.g. 2026
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processed', 'paid'],
      default: 'processed',
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent processing duplicate payrolls for the same employee, month, and year
payrollSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Payroll', payrollSchema);
