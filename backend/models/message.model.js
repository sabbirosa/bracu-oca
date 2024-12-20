const client = require("../config/dbConfig");

const messageCollection = client.db("BRACU_OCA").collection("messages");

module.exports = messageCollection;