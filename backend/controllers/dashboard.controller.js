const dashboardService = require("../services/dashboard.service");

const getDashboardInfo = async (req, res) => {
  const email = req.params.email;
  try {
    const info = await dashboardService.getDashboardInfo(email);
    if (info) {
      res.json(info);
    } else {
      res.status(404).send("Dashboard info not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching dashboard info");
  }
};

const getUpcomingEvents = async (req, res) => {
  try {
    const events = await dashboardService.getUpcomingEvents();
    res.json(events);
  } catch (error) {
    res.status(500).send("Error fetching upcoming events");
  }
};

module.exports = {
  getDashboardInfo,
  getUpcomingEvents,
};
