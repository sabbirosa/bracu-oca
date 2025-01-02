const { ObjectId } = require("mongodb");
const announcementCollection = require("../models/announcement.model");

const getAnnouncements = async () => {
  return await announcementCollection.find().toArray();
};

const addAnnouncement = async (data) => {
  return await announcementCollection.insertOne(data);
};

const deleteAnnouncement = async (id) => {
  try {
    const objectId = new ObjectId(id);

    const result = await announcementCollection.findOneAndDelete({ _id: objectId });
    return result;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
};

module.exports = {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
};