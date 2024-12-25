const clubCollection = require("../models/club.model");

const getClubList = async () => {
  return await clubCollection
    .find({}, { projection: { name: 1, email: 1, _id: 1, photo_url: 1 } })
    .toArray();
};

const getAllClubs = async () => {
  return await clubCollection.find({}).toArray();
};

const updateClub = async (id, data) => {
  return await clubCollection.updateOne(
    { _id: id },
    {
      $set: {
        name: data.name,
        email: data.email,
        description: data.description,
        photo_url: data.photo_url,
      },
    }
  );
}

const getCurrentUser = async (email) => {
  return await clubCollection.findOne({ email: email });
};

module.exports = {
  getClubList,
  getAllClubs,
  updateClub,
  getCurrentUser,
};