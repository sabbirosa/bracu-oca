const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");

const eventsController = require("./controllers/event.controller"); 
const clubsController = require("./controllers/club.controller");
const messagesController = require("./controllers/message.controller");
const dashboardController = require("./controllers/dashboard.controller");
const announcementsController = require("./controllers/announcement.controller"); // Add announcements controller

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to BRACU OCA Backend");
});

app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

// Event Routes
app.post("/new-event", verifyToken, eventsController.createEvent);
app.get("/pending-events/:email", verifyToken, eventsController.getPendingEvents);
app.get("/all-pending-events", verifyToken, eventsController.getAllPendingEvents);
app.get("/responded-events/:email", verifyToken, eventsController.getRespondedEvents);
app.get("/accepted-events", verifyToken, eventsController.getAcceptedEvents);
app.get("/events/:id", verifyToken, eventsController.getEventById);
app.put("/events/:id", verifyToken, eventsController.updateEvent);
app.delete("/event-planner/:eventId", verifyToken, eventsController.deleteEvent);
app.get("/total-budget", verifyToken, eventsController.getTotalBudget);
app.get("/all-events", verifyToken, eventsController.getAllEvents); // New endpoint

// Club Routes
app.get("/club-list", clubsController.getClubList);
app.get("/all-clubs", clubsController.getAllClubs);
app.patch("/clubs-update/:id", verifyToken, clubsController.updateClub); // New endpoint
app.get("/current-user/:email", clubsController.getCurrentUser); // New endpoint

// Room Availability Route
app.post("/check-room-availability", verifyToken, eventsController.checkRoomAvailability); // New endpoint

// Message Routes
app.get("/messages/:email", verifyToken, messagesController.getMessages);
app.post("/send-message", verifyToken, messagesController.sendMessage);

// Announcement Routes
app.get("/announcements", verifyToken, announcementsController.getAnnouncements); // New endpoint
app.post("/add-announcement", verifyToken, announcementsController.addAnnouncement); // New endpoint
app.delete("/delete-announcement/:id", verifyToken, announcementsController.deleteAnnouncement); // New endpoint

// Dashboard Routes
app.get("/dashboard-info/:email", verifyToken, dashboardController.getDashboardInfo);
app.get("/dashboard-events", verifyToken, dashboardController.getUpcomingEvents);

module.exports = app;