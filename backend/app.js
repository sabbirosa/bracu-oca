const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");

const eventsController = require("./controllers/event.controller"); 
const clubsController = require("./controllers/club.controller");
const messagesController = require("./controllers/message.controller");


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

app.get('/health', (req, res) => {
  res.status(200).send('Ok');
});


// Event Routes
app.post("/new-event", verifyToken, eventsController.createEvent); 
app.get("/pending-events/:email", verifyToken, eventsController.getPendingEvents);

// Club Routes
app.get("/club-list", clubsController.getClubList);

// Message Routes
app.get("/messages/:clubMail", verifyToken, messagesController.getMessages);
app.post("/send-message", verifyToken, messagesController.sendMessage);

// Dashboard Routes
app.get("/dashboard-info/:email", verifyToken, dashboardController.getDashboardInfo);
app.get("/dashboard-events", verifyToken, dashboardController.getUpcomingEvents);

module.exports = app;
