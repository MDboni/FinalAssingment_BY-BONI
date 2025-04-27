const Event = require('../models/Event');


exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('user', 'name email');
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('user', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.createEvent = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this event' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this event' });
        }

        await event.remove();

        res.status(200).json({ message: 'Event removed' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}; 