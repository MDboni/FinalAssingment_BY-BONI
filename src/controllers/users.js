const User = require('../models/User');
const Event = require('../models/Event');


exports.getSavedEvents = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('savedEvents');
        res.status(200).json(user.savedEvents);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.saveEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }


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


exports.unsaveEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

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