const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

// const verifyToken = (req, res, next) => {
//   console.log(req.headers.authorization);
//   if (!req.headers.authorization) {
//     return res.status(401).send("Access Denied");
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }

//   jwt.verify(token, process.env.JWT_Secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send("Access Denied");
//     }

//     req.decoded = decoded;
//     next();
//   });
// };


app.get("/", (req, res) => {
  res.send("Welcome to BRACU OCA Backend");
});

app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

// Event Routes
app.post("/new-event", eventsController.createEvent);
app.get("/pending-events/:email", eventsController.getPendingEvents);
app.get("/all-pending-events", eventsController.getAllPendingEvents);
app.get("/responded-events/:email", eventsController.getRespondedEvents);
app.get("/accepted-events", eventsController.getAcceptedEvents);
app.get("/events/:id", eventsController.getEventById);
app.put("/events/:id", eventsController.updateEvent);
app.delete("/event-planner/:eventId", eventsController.deleteEvent);
app.get("/total-budget", eventsController.getTotalBudget);
app.get("/all-events", eventsController.getAllEvents); // New endpoint

// Club Routes
app.get("/club-list", clubsController.getClubList);
app.get("/all-clubs", clubsController.getAllClubs);
app.patch("/clubs-update/:id", clubsController.updateClub); // New endpoint
app.get("/current-user/:email", clubsController.getCurrentUser); // New endpoint

// Room Availability Route
app.get("/check-room-availability", eventsController.checkRoomAvailability); // New endpoint

// Message Routes
app.get("/messages/:email", messagesController.getMessages);
app.post("/send-message", messagesController.sendMessage);

// Announcement Routes
app.get("/announcements", announcementsController.getAnnouncements); // New endpoint
app.post("/add-announcement", announcementsController.addAnnouncement); // New endpoint
app.delete("/delete-announcement/:id", announcementsController.deleteAnnouncement); // New endpoint

// Dashboard Routes
app.get("/dashboard-info/:email", dashboardController.getDashboardInfo);
app.get("/dashboard-events", dashboardController.getUpcomingEvents);

module.exports = app;