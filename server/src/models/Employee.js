const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      required: true,
      default: 'General',
    },
    designation: {
      type: String,
      required: true,
      default: 'Staff',
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    employmentStatus: {
      type: String,
      enum: ['active', 'onboarding', 'terminated', 'resigned'],
      default: 'active',
    },
    salary: {
      basicSalary: { type: Number, default: 0 },
      allowances: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
    },
    bankDetails: {
      accountNumber: { type: String, default: '' },
      bankName: { type: String, default: '' },
      ifscCode: { type: String, default: '' },
    },
    address: {
      type: String,
      default: '',
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
