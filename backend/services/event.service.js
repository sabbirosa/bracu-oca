const eventsCollection = require("../models/event.model");
const { ObjectId } = require("mongodb");

const createEvent = async (data) => {
  return await eventsCollection.insertOne(data);
};

const getPendingEvents = async (email) => {
  return await eventsCollection
    .find({ clubMail: email, status: "Pending" })
    .sort({ date: -1 })
    .toArray();
};

const deleteEvent = async (id) => {
  return await eventsCollection.deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createEvent,
  getPendingEvents,
  deleteEvent,
};