const clubCollection = require("../models/club.model");

const getClubList = async () => {
  return await clubCollection
    .find({}, { projection: { name: 1, email: 1, _id: 1, photo_url: 1 } })
    .toArray();
};

const getAllClubs = async () => {
  return await clubCollection.find({}).toArray();
};

module.exports = {
  getClubList,
  getAllClubs,
};