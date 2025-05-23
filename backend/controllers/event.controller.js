const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  const data = req.body;
  if (data.budget) data.budget = parseInt(data.budget);
  if (data.guestPassesCount) data.guestPassesCount = parseInt(data.guestPassesCount);

  try {
    const newEvent = await eventService.createEvent(data);
    if (newEvent.acknowledged) {
      res.status(201).send("Event created successfully");
    } else {
      res.status(400).send("Event creation failed");
    }
  } catch (error) {
    res.status(500).send("Error creating event");
  }
};

const getPendingEvents = async (req, res) => {
  const email = req.params.email;
  try {
    const events = await eventService.getPendingEvents(email);
    res.json(events);
  } catch (error) {
    res.status(500).send("Error fetching pending events");
  }
};

const getAllPendingEvents = async (req, res) => {
  try {
    const events = await eventService.getAllPendingEvents();
    res.json(events);
  } catch (error) {
    res.status(500).send("Error fetching all pending events");
  }
};

const getRespondedEvents = async (req, res) => {
  const email = req.params.email;
  try {
    const events = await eventService.getRespondedEvents(email);
    res.json(events);
  } catch (error) {
    res.status(500).send("Error fetching responded events");
  }
};

const getAcceptedEvents = async (req, res) => {
  try {
    const events = await eventService.getAcceptedEvents();
    console.log('Events from service:', events);

    if (!Array.isArray(events)) {
      console.error('Events is not an array:', events);
      return res.status(500).json({ error: 'Invalid events data' });
    }

    if (events.length === 0) {
      console.log('No accepted events found');
    }

    res.json(events);
  } catch (error) {
    console.error('Error in getAcceptedEvents:', error);
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await eventService.getEventById(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching event");
  }
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await eventService.updateEvent(id, data);
    if (result.modifiedCount === 1) {
      res.status(200).send("Event updated successfully");
    } else {
      res.status(400).send("Failed to update event");
    }
  } catch (error) {
    res.status(500).send("Error updating event");
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.eventId;
  try {
    const result = await eventService.deleteEvent(id);
    if (result.deletedCount === 1) {
      res.status(200).send("Event deleted successfully");
    } else {
      res.status(400).send("Failed to delete event");
    }
  } catch (error) {
    res.status(500).send("Error deleting event");
  }
};

const getTotalBudget = async (req, res) => {
  try {
    const totalBudget = await eventService.getTotalBudget();
    res.json({ totalBudget });
  } catch (error) {
    res.status(500).send("Error calculating total budget");
  }
};

const checkRoomAvailability = async (req, res) => {
  try {
    const { date, roomNumber } = req.body;
    const isAvailable = await eventService.checkRoomAvailability(date, roomNumber);
    res.status(200).json({ available: isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createEvent,
  getPendingEvents,
  getAllPendingEvents,
  getRespondedEvents,
  getAcceptedEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getTotalBudget,
  checkRoomAvailability,
  getAllEvents
};