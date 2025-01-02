const announcementsService = require("../services/announcement.service");

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementsService.getAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAnnouncement = async (req, res) => {
  try {
    const announcement = await announcementsService.addAnnouncement(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await announcementsService.deleteAnnouncement(id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
};