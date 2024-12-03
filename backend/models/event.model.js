const client = require("../config/dbConfig");

const eventsCollection = client.db("BRACU_OCA").collection("events");

module.exports = eventsCollection;
