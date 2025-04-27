const User = require('../models/User');
const Event = require('../models/Event');

// @desc    Get saved events
// @route   GET /api/users/saved-events
// @access  Private
exports.getSavedEvents = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('savedEvents');
        res.status(200).json(user.savedEvents);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Save event
// @route   PUT /api/users/save-event/:eventId
// @access  Private
exports.saveEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if event is already saved
        if (user.savedEvents.includes(req.params.eventId)) {
            return res.status(400).json({ message: 'Event already saved' });
        }

        user.savedEvents.push(req.params.eventId);
        await user.save();

        res.status(200).json({ message: 'Event saved successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Unsave event
// @route   PUT /api/users/unsave-event/:eventId
// @access  Private
exports.unsaveEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Check if event is saved
        if (!user.savedEvents.includes(req.params.eventId)) {
            return res.status(400).json({ message: 'Event not saved' });
        }

        user.savedEvents = user.savedEvents.filter(
            eventId => eventId.toString() !== req.params.eventId
        );
        await user.save();

        res.status(200).json({ message: 'Event unsaved successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}; 