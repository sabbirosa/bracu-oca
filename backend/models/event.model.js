const eventsController = require("./controllers/event.controller"); 
app.post("/new-event", verifyToken, eventsController.createEvent);

app.get("/get-pending-events/:email", verifyToken, eventsController.getPendingEvents);