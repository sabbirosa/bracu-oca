const clubService = require("../services/club.service");

const getClubList = async (req, res) => {
  try {
    const clubs = await clubService.getClubList();
    res.send(clubs);
  } catch (error) {
    res.status(500).send("Error fetching club list");
  }
};

const getAllClubs = async (req, res) => {
  try {
    const clubs = await clubService.getAllClubs();
    res.send(clubs);
  } catch (error) {
    res.status(500).send("Error fetching club list");
  }
}

module.exports = {
  getClubList,
  getAllClubs,
};