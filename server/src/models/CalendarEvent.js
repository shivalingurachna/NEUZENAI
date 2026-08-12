const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['holiday', 'leave', 'onboarding', 'meeting'],
      default: 'holiday',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    visibility: {
      type: String,
      enum: ['all', 'hr_admin', 'department'],
      default: 'all',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
