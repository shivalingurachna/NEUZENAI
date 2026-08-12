const CalendarEvent = require('../models/CalendarEvent');

// GET /api/calendar/events
const getEvents = async (req, res, next) => {
  try {
    const events = await CalendarEvent.find().sort({ startDate: 1 });
    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/calendar/events
const createEvent = async (req, res, next) => {
  try {
    const { title, type, startDate, endDate, description, visibility } = req.body;

    const event = await CalendarEvent.create({
      title,
      type: type || 'holiday',
      startDate,
      endDate: endDate || startDate,
      description: description || '',
      visibility: visibility || 'all',
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Calendar event created successfully',
      event,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/calendar/events/:id
const updateEvent = async (req, res, next) => {
  try {
    const event = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Calendar event updated',
      event,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/calendar/events/:id
const deleteEvent = async (req, res, next) => {
  try {
    const event = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Calendar event not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Calendar event deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
