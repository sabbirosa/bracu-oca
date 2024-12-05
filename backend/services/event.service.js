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

const getAllPendingEvents = async () => {
  return await eventsCollection
    .find({ status: "Pending" })
    .sort({ date: -1 })
    .toArray();
};

const getRespondedEvents = async (email) => {
  return await eventsCollection
    .find({ clubMail: email, status: "Responded" })
    .sort({ date: -1 })
    .toArray();
};

const getAcceptedEvents = async () => {
  return await eventsCollection
    .find({ response: "Accepted" })
    .project({ clubMail: 1, date: 1, _id: 0 })
    .toArray();
};

const getEventById = async (id) => {
  return await eventsCollection.findOne({ _id: new ObjectId(id) });
};

const updateEvent = async (id, data) => {
  return await eventsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
};

const deleteEvent = async (id) => {
  return await eventsCollection.deleteOne({ _id: new ObjectId(id) });
};

const getTotalBudget = async () => {
  const result = await eventsCollection.aggregate([
    { $match: { status: "Accepted" } }, 
    { $group: { _id: null, total: { $sum: "$budget" } } },
  ]).toArray();

  return result[0]?.total || 0; 
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
};