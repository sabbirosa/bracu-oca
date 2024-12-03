const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");

const eventsController = require("./controllers/event.controller"); 
const clubsController = require("./controllers/club.controller");

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

// Event Routes Starts -- Hanif

app.post("/new-event", verifyToken, eventsController.createEvent); 
app.get("/get-pending-events/:email", verifyToken, eventsController.getPendingEvents);

// Event Routes Ends -- Hanif

// Club Routes Starts -- Yeamin

app.get("/get-club-list", clubsController.getClubList);

// Club Routes Ends -- Yeamin

module.exports = app;
