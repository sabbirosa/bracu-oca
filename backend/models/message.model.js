const client = require("../config/dbConfig");

const messageCollection = client.db("ClubSync").collection("messages");

module.exports = messageCollection;