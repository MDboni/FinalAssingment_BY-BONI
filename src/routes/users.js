const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getSavedEvents,
    saveEvent,
    unsaveEvent
} = require('../controllers/users');

router.route('/saved-events')
    .get(protect, getSavedEvents);

router.route('/save-event/:eventId')
    .put(protect, saveEvent);

router.route('/unsave-event/:eventId')
    .put(protect, unsaveEvent);

module.exports = router; 