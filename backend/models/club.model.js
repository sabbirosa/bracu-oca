const dbConnect = require("../config/dbConfig");

const clubCollection = dbConnect.db("BRACU_OCA").collection("clubs");

module.exports = clubCollection;