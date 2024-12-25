const Announcement = require("../models/announcement.model");

const getAnnouncements = async () => {
  return await Announcement.find();
};

const addAnnouncement = async (data) => {
  const announcement = new Announcement(data);
  return await announcement.save();
};

const deleteAnnouncement = async (id) => {
  return await Announcement.findByIdAndDelete(id);
};

module.exports = {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
};