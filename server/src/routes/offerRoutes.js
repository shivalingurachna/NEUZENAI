const express = require('express');
const router = express.Router();
const {
  getOfferLetters,
  createOfferLetter,
  getOfferLetterById,
  updateOfferLetter,
} = require('../controllers/offerController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { offerValidation } = require('../validators/hrmsValidators');

router.use(authenticateUser);
router.use(requireRole('admin', 'hr'));

router.get('/', getOfferLetters);
router.post('/offer-letter', offerValidation, createOfferLetter);
router.get('/offer-letter/:id', getOfferLetterById);
router.put('/offer-letter/:id', updateOfferLetter);

module.exports = router;
