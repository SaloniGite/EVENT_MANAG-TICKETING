const Event = require('../models/Event.model');
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      location,
      status,
      capacity,
      isPublic
    } = req.body;

    const image = req.file ? req.file.path : undefined;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      image,
      location: location ? JSON.parse(location) : undefined,
      status,
      capacity,
      isPublic,
      organizer: req.user._id 
    });

    res.status(201).json({
      message: 'Event created successfully',
      event
    });

  } catch (err) {
    console.error('Create Event Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
