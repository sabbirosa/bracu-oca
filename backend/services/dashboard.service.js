const clubCollection = require("../models/club.model");
const eventsCollection = require("../models/event.model");

const getDashboardInfo = async (email) => {
  return await clubCollection.findOne({ email });
};

const getUpcomingEvents = async () => {
  return await eventsCollection
    .find({ response: "Accepted" })
    .sort({ date: 1 })
    .toArray();
};

module.exports = {
  getDashboardInfo,
  getUpcomingEvents,
};
