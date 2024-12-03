const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");

const eventsController = require("./controllers/event.controller"); 

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Event Routes -- Hanif
app.post("/new-event", verifyToken, eventsController.createEvent); 
app.get("/get-pending-events/:email", verifyToken, eventsController.getPendingEvents);
// Event Routes end -- Hanif

module.exports = app;
