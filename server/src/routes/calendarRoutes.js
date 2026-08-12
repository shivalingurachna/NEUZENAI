const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/calendarController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.use(authenticateUser);

// All roles (Admin, HR, Employee) can view calendar events
router.get('/events', getEvents);

// Only Admin and HR can create, update, or delete calendar events
router.post('/events', requireRole('admin', 'hr'), createEvent);
router.put('/events/:id', requireRole('admin', 'hr'), updateEvent);
router.delete('/events/:id', requireRole('admin', 'hr'), deleteEvent);

module.exports = router;
