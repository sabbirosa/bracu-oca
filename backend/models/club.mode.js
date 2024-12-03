const client = require("../config/dbConfig");

const clubCollection = client.db("ClubSync").collection("clubs");

module.exports = clubCollection;