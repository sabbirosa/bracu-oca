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

module.exports = {
  createEvent,
  getPendingEvents,
};