const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

module.exports = app;
