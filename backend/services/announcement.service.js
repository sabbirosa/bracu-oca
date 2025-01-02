const announcementCollection = require("../models/announcement.model");

const getAnnouncements = async () => {
  return await announcementCollection.find().toArray();
};

const addAnnouncement = async (data) => {
  return await announcementCollection.insertOne(data);
};

const deleteAnnouncement = async (id) => {
;

  return await announcementCollection.deleteOne({ _id: id });

};

module.exports = {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
};