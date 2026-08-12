const mongoose = require('mongoose');

const offerLetterSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    salary: {
      basicSalary: { type: Number, required: true },
      allowances: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      netSalary: { type: Number, required: true },
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'accepted'],
      default: 'draft',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    letterContent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OfferLetter', offerLetterSchema);
