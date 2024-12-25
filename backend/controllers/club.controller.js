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

const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedClub = await clubService.updateClub(id, updatedData);
    res.status(200).json(updatedClub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await clubService.getCurrentUser(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClubList,
  getAllClubs,
  updateClub,
  getCurrentUser
};